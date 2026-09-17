import type { PageSnapshot } from '@/types';

type SnapshotOverrides = Partial<Omit<PageSnapshot, 'meta' | 'content' | 'technical' | 'limits'>> & {
  meta?: Partial<PageSnapshot['meta']>;
  content?: Partial<PageSnapshot['content']>;
  technical?: Partial<PageSnapshot['technical']> & {
    performance?: Partial<PageSnapshot['technical']['performance']>;
  };
  limits?: Partial<PageSnapshot['limits']>;
};

export function makeSnapshot(overrides: SnapshotOverrides = {}): PageSnapshot {
  const base: PageSnapshot = {
    collectedAt: '2026-01-01T00:00:00.000Z',
    url: 'https://example.com/page',
    protocol: 'https',
    hostname: 'example.com',
    title: 'Example Domain homepage',
    lang: 'en',
    charset: 'UTF-8',
    canonical: 'https://example.com/page',
    favicon: 'https://example.com/favicon.ico',
    meta: {
      description: 'This is a valid meta description that should sit around the recommended length for snippets.',
      robots: 'index,follow',
      viewport: 'width=device-width, initial-scale=1',
      ogTitle: 'Example Domain homepage',
      ogDescription: 'Open graph description for sharing.',
      ogImage: 'https://example.com/og.png',
      twitterCard: 'summary_large_image',
      twitterTitle: 'Example Domain homepage',
      twitterDescription: 'Twitter description',
      twitterImage: 'https://example.com/og.png',
    },
    headings: [{ level: 1, text: 'Example Domain' }],
    links: [
      {
        href: '/',
        text: 'Home',
        accessibleName: 'Home',
        kind: 'internal',
        targetBlank: false,
        rel: null,
        hasNoopener: false,
        hasNoreferrer: false,
      },
    ],
    images: [
      {
        src: 'https://example.com/hero.jpg',
        alt: 'Hero',
        width: 800,
        height: 400,
        naturalWidth: 800,
        naturalHeight: 400,
        loading: 'lazy',
        hasWidthAttr: true,
        hasHeightAttr: true,
        broken: false,
        status: 'ok',
      },
    ],
    forms: [],
    buttons: [{ tag: 'button', type: 'button', hasAccessibleName: true }],
    inputs: [],
    tabIndexes: [],
    ariaHints: [],
    content: {
      wordCount: 40,
      paragraphCount: 2,
      visibleText: 'Example Domain This domain is for use in illustrative examples.',
    },
    technical: {
      scriptCount: 1,
      stylesheetCount: 1,
      inlineStyleCount: 0,
      inlineScriptCount: 0,
      domElementCount: 80,
      viewport: 'width=device-width, initial-scale=1',
      favicon: 'https://example.com/favicon.ico',
      performance: {
        protocol: 'h2',
        domContentLoadedMs: 120,
        loadEventMs: 240,
        resourceCount: 8,
      },
    },
    limits: {
      maxLinks: 2000,
      maxImages: 1000,
      maxHeadings: 500,
      maxForms: 100,
      linksTruncated: false,
      imagesTruncated: false,
      headingsTruncated: false,
      formsTruncated: false,
    },
  };

  return {
    ...base,
    ...overrides,
    meta: { ...base.meta, ...overrides.meta },
    content: { ...base.content, ...overrides.content },
    technical: {
      ...base.technical,
      ...overrides.technical,
      performance: {
        ...base.technical.performance,
        ...overrides.technical?.performance,
      },
    },
    limits: { ...base.limits, ...overrides.limits },
  };
}
