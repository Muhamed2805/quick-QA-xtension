import type { PageSnapshot } from '@/types';

/**
 * Injected into the page via chrome.scripting.executeScript.
 * Must stay self-contained: Chrome serializes this function's source only.
 * Read-only. Never writes to the DOM. Never reads input values.
 */
export function collectPageSnapshot(): PageSnapshot {
  const MAX_LINKS = 2000;
  const MAX_IMAGES = 1000;
  const MAX_HEADINGS = 500;
  const MAX_FORMS = 100;
  const MAX_FIELDS = 80;
  const MAX_BUTTONS = 400;
  const MAX_INPUTS = 400;
  const MAX_TABINDEX = 80;
  const MAX_ARIA = 80;
  const MAX_TEXT = 30_000;

  const attr = (el: Element, name: string): string | null => {
    const value = el.getAttribute(name);
    return value === null ? null : value.trim() || null;
  };

  const textOf = (el: Element | null): string => (el?.textContent ?? '').replace(/\s+/g, ' ').trim();

  const metaContent = (selector: string): string | null => {
    try {
      const node = document.querySelector(selector);
      return node ? attr(node, 'content') : null;
    } catch {
      return null;
    }
  };

  const sanitizeSrc = (raw: string): string => {
    const value = raw.trim();
    if (!value) return '';
    if (value.startsWith('data:')) {
      const kind = value.slice(5, value.indexOf(';') === -1 ? 25 : value.indexOf(';'));
      return `data:${kind};(omitted)`;
    }
    return value.length > 500 ? `${value.slice(0, 500)}…` : value;
  };

  const labeled = (el: Element): boolean => {
    const id = el.getAttribute('id');
    if (id) {
      try {
        if (document.querySelector(`label[for="${CSS.escape(id)}"]`)) {
          return true;
        }
      } catch {
        /* ignore invalid selectors */
      }
    }
    return Boolean(el.closest('label'));
  };

  const accessibleName = (el: Element): string => {
    const labelledBy = el.getAttribute('aria-labelledby');
    if (labelledBy) {
      const fromIds = labelledBy
        .split(/\s+/)
        .map((id) => document.getElementById(id))
        .filter((node): node is HTMLElement => Boolean(node))
        .map((node) => textOf(node))
        .join(' ')
        .trim();
      if (fromIds) return fromIds;
    }
    const aria = el.getAttribute('aria-label');
    if (aria?.trim()) return aria.trim();
    const title = el.getAttribute('title');
    if (title?.trim()) return title.trim();
    const img = el.querySelector('img[alt]');
    const imgAlt = img?.getAttribute('alt');
    if (imgAlt?.trim()) return imgAlt.trim();
    return textOf(el);
  };

  const classifyHref = (href: string | null, hostname: string): PageSnapshot['links'][number]['kind'] => {
    const raw = (href ?? '').trim();
    if (!raw) return 'empty';
    const lower = raw.toLowerCase();
    if (lower.startsWith('javascript:')) return 'javascript';
    if (lower.startsWith('mailto:')) return 'mailto';
    if (lower.startsWith('tel:')) return 'tel';
    if (raw.startsWith('#')) return 'anchor';
    try {
      const url = new URL(raw, location.href);
      if (url.hash && url.origin === location.origin && url.pathname === location.pathname && !url.search) {
        return 'anchor';
      }
      if (url.hostname === hostname) return 'internal';
      return 'external';
    } catch {
      return 'other';
    }
  };

  const imageStatus = (
    alt: string | null,
    broken: boolean,
    naturalWidth: number | null,
    naturalHeight: number | null,
  ): PageSnapshot['images'][number]['status'] => {
    if (broken) return 'broken';
    if (alt === null) return 'missing-alt';
    if (alt === '') return 'empty-alt';
    if ((naturalWidth ?? 0) >= 3000 || (naturalHeight ?? 0) >= 3000) return 'oversized';
    return 'ok';
  };

  const headingNodes = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
  const headings = headingNodes.slice(0, MAX_HEADINGS).map((node) => ({
    level: Number(node.tagName[1]) as 1 | 2 | 3 | 4 | 5 | 6,
    text: textOf(node),
  }));

  const anchorNodes = Array.from(document.querySelectorAll('a'));
  const links = anchorNodes.slice(0, MAX_LINKS).map((node) => {
    const rel = attr(node, 'rel');
    const relTokens = new Set((rel ?? '').toLowerCase().split(/\s+/).filter(Boolean));
    return {
      href: node.getAttribute('href') ?? '',
      text: textOf(node),
      kind: classifyHref(node.getAttribute('href'), location.hostname),
      targetBlank: node.getAttribute('target') === '_blank',
      rel,
      hasNoopener: relTokens.has('noopener'),
      hasNoreferrer: relTokens.has('noreferrer'),
    };
  });

  const imageNodes = Array.from(document.querySelectorAll('img'));
  const images = imageNodes.slice(0, MAX_IMAGES).map((node) => {
    const img = node as HTMLImageElement;
    const altPresent = img.hasAttribute('alt');
    const alt = altPresent ? img.getAttribute('alt') : null;
    const broken = img.complete && img.naturalWidth === 0 && Boolean(img.getAttribute('src') || img.currentSrc);
    const naturalWidth = img.naturalWidth || null;
    const naturalHeight = img.naturalHeight || null;
    return {
      src: sanitizeSrc(img.currentSrc || img.src || img.getAttribute('src') || ''),
      alt,
      width: img.width || Number(img.getAttribute('width')) || null,
      height: img.height || Number(img.getAttribute('height')) || null,
      naturalWidth,
      naturalHeight,
      loading: attr(img, 'loading'),
      broken,
      status: imageStatus(alt, broken, naturalWidth, naturalHeight),
    };
  });

  const controlSelector = 'input, select, textarea, button';
  const formNodes = Array.from(document.forms);
  const forms = formNodes.slice(0, MAX_FORMS).map((form) => {
    const controls = Array.from(form.querySelectorAll(controlSelector));
    const fields = controls.slice(0, MAX_FIELDS).map((el) => {
      const type = el.getAttribute('type');
      return {
        tag: el.tagName.toLowerCase(),
        type: type ? type.toLowerCase() : el.tagName.toLowerCase() === 'button' ? 'button' : null,
        hasName: Boolean(el.getAttribute('name')),
        hasId: Boolean(el.id),
        hasLabel: labeled(el),
        hasPlaceholder: Boolean(el.getAttribute('placeholder')),
        required: el.hasAttribute('required'),
      };
    });
    const hasSubmitControl = controls.some((el) => {
      const tag = el.tagName.toLowerCase();
      const type = (el.getAttribute('type') ?? '').toLowerCase();
      if (tag === 'button' && (type === '' || type === 'submit')) return true;
      if (tag === 'input' && (type === 'submit' || type === 'image')) return true;
      return false;
    });
    return {
      action: form.getAttribute('action'),
      method: (form.getAttribute('method') || 'get').toLowerCase(),
      fieldCount: controls.length,
      hasSubmitControl,
      passwordFieldCount: controls.filter((el) => (el.getAttribute('type') ?? '').toLowerCase() === 'password').length,
      buttonsWithoutType: controls.filter(
        (el) => el.tagName.toLowerCase() === 'button' && !el.hasAttribute('type'),
      ).length,
      fields,
    };
  });

  const buttonNodes = Array.from(document.querySelectorAll('button, [role="button"], input[type="button"], input[type="submit"]'));
  const buttons = buttonNodes.slice(0, MAX_BUTTONS).map((el) => ({
    tag: el.tagName.toLowerCase(),
    type: el.getAttribute('type'),
    hasAccessibleName: Boolean(accessibleName(el)),
  }));

  const inputNodes = Array.from(
    document.querySelectorAll('input:not([type="hidden"]):not([type="submit"]):not([type="button"]):not([type="image"]), select, textarea'),
  );
  const inputs = inputNodes.slice(0, MAX_INPUTS).map((el) => ({
    tag: el.tagName.toLowerCase(),
    type: el.getAttribute('type'),
    hasName: Boolean(el.getAttribute('name')),
    hasId: Boolean(el.id),
    hasLabel: labeled(el),
    hasAriaName: Boolean(el.getAttribute('aria-label')?.trim() || el.getAttribute('aria-labelledby')?.trim()),
    hasPlaceholder: Boolean(el.getAttribute('placeholder')),
    required: el.hasAttribute('required'),
  }));

  const tabIndexes = Array.from(document.querySelectorAll('[tabindex]'))
    .map((el) => ({ tag: el.tagName.toLowerCase(), tabIndex: Number(el.getAttribute('tabindex')) }))
    .filter((item) => Number.isFinite(item.tabIndex) && item.tabIndex > 0)
    .slice(0, MAX_TABINDEX);

  const ariaHints: PageSnapshot['ariaHints'] = [];
  for (const el of Array.from(document.querySelectorAll('[aria-labelledby]'))) {
    if (ariaHints.length >= MAX_ARIA) break;
    const missing = (el.getAttribute('aria-labelledby') ?? '')
      .split(/\s+/)
      .filter(Boolean)
      .some((id) => !document.getElementById(id));
    if (missing) {
      ariaHints.push({ tag: el.tagName.toLowerCase(), issue: 'aria-labelledby points to a missing id' });
    }
  }
  for (const el of Array.from(document.querySelectorAll('[aria-hidden="true"]'))) {
    if (ariaHints.length >= MAX_ARIA) break;
    const focusable = el.matches('a, button, input, select, textarea, [tabindex]') || el.querySelector('a, button, input, select, textarea, [tabindex]');
    if (focusable) {
      ariaHints.push({ tag: el.tagName.toLowerCase(), issue: 'aria-hidden on or around a focusable element' });
    }
  }

  const visibleText = (document.body?.innerText ?? '').replace(/\s+/g, ' ').trim().slice(0, MAX_TEXT);
  const wordCount = visibleText ? visibleText.split(' ').filter(Boolean).length : 0;

  const icon = document.querySelector('link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]');
  const favicon = icon ? new URL((icon as HTMLLinkElement).href, location.href).href : null;

  const canonicalEl = document.querySelector('link[rel="canonical"]');
  const canonical = canonicalEl ? (canonicalEl as HTMLLinkElement).href : null;

  let domContentLoadedMs: number | null = null;
  let loadEventMs: number | null = null;
  let navProtocol: string | null = null;
  const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
  if (nav) {
    domContentLoadedMs = Math.round(nav.domContentLoadedEventEnd);
    loadEventMs = Math.round(nav.loadEventEnd);
    navProtocol = nav.nextHopProtocol || null;
  }

  return {
    collectedAt: new Date().toISOString(),
    url: location.href,
    protocol: location.protocol.replace(':', ''),
    hostname: location.hostname,
    title: document.title ?? '',
    lang: document.documentElement.getAttribute('lang'),
    charset: document.characterSet || null,
    canonical,
    favicon,
    meta: {
      description: metaContent('meta[name="description" i]'),
      robots: metaContent('meta[name="robots" i]'),
      viewport: metaContent('meta[name="viewport" i]'),
      ogTitle: metaContent('meta[property="og:title"]'),
      ogDescription: metaContent('meta[property="og:description"]'),
      ogImage: metaContent('meta[property="og:image"]'),
      twitterCard: metaContent('meta[name="twitter:card" i]'),
      twitterTitle: metaContent('meta[name="twitter:title" i]'),
      twitterDescription: metaContent('meta[name="twitter:description" i]'),
      twitterImage: metaContent('meta[name="twitter:image" i]'),
    },
    headings,
    links,
    images,
    forms,
    buttons,
    inputs,
    tabIndexes,
    ariaHints,
    content: {
      wordCount,
      paragraphCount: document.querySelectorAll('p').length,
      visibleText,
    },
    technical: {
      scriptCount: document.scripts.length,
      stylesheetCount: document.querySelectorAll('link[rel="stylesheet"], style').length,
      inlineStyleCount: document.querySelectorAll('[style]').length,
      inlineScriptCount: document.querySelectorAll('script:not([src])').length,
      domElementCount: document.getElementsByTagName('*').length,
      viewport: metaContent('meta[name="viewport" i]'),
      favicon,
      performance: {
        protocol: navProtocol,
        domContentLoadedMs,
        loadEventMs,
        resourceCount: performance.getEntriesByType('resource').length,
      },
    },
    limits: {
      maxLinks: MAX_LINKS,
      maxImages: MAX_IMAGES,
      maxHeadings: MAX_HEADINGS,
      maxForms: MAX_FORMS,
      linksTruncated: anchorNodes.length > MAX_LINKS,
      imagesTruncated: imageNodes.length > MAX_IMAGES,
      headingsTruncated: headingNodes.length > MAX_HEADINGS,
      formsTruncated: formNodes.length > MAX_FORMS,
    },
  };
}
