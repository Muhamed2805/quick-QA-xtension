/**
 * Injected via executeScript. Each function must be self-contained.
 */
export function applyPageHighlights(): { marked: number } {
  const STYLE_ID = 'quick-qa-highlight-style';
  const BANNER_ID = 'quick-qa-highlight-banner';

  const cleanup = () => {
    document.getElementById(STYLE_ID)?.remove();
    document.getElementById(BANNER_ID)?.remove();
    document.querySelectorAll('[data-quick-qa]').forEach((el) => el.removeAttribute('data-quick-qa'));
  };

  cleanup();

  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    [data-quick-qa="alt"] { outline: 2px solid #b91c1c !important; outline-offset: 2px; }
    [data-quick-qa="link"] { outline: 2px solid #b45309 !important; outline-offset: 2px; }
    [data-quick-qa="label"] { outline: 2px solid #1d4ed8 !important; outline-offset: 2px; }
    #${BANNER_ID} {
      position: fixed; z-index: 2147483647; left: 12px; right: 12px; bottom: 12px;
      font: 12px/1.4 system-ui, sans-serif; background: #18181b; color: #fafafa;
      padding: 10px 12px; border-radius: 6px; display: flex; gap: 8px; align-items: center;
      justify-content: space-between;
    }
    #${BANNER_ID} button {
      background: #fafafa; color: #18181b; border: 0; border-radius: 4px; padding: 4px 8px; cursor: pointer;
    }
  `;
  document.documentElement.appendChild(style);

  let marked = 0;
  document.querySelectorAll('img').forEach((img) => {
    if (!img.hasAttribute('alt')) {
      img.setAttribute('data-quick-qa', 'alt');
      marked += 1;
    }
  });

  document.querySelectorAll('a[href]').forEach((anchor) => {
    const named = Boolean(
      anchor.textContent?.trim() ||
        anchor.getAttribute('aria-label')?.trim() ||
        anchor.querySelector('img[alt]')?.getAttribute('alt')?.trim() ||
        anchor.querySelector('svg title')?.textContent?.trim() ||
        anchor.querySelector('svg[aria-label]')?.getAttribute('aria-label')?.trim(),
    );
    if (!named) {
      anchor.setAttribute('data-quick-qa', 'link');
      marked += 1;
    }
  });

  document.querySelectorAll('input:not([type="hidden"]):not([type="submit"]):not([type="button"]), select, textarea').forEach((el) => {
    const id = el.getAttribute('id');
    let labelled = Boolean(el.getAttribute('aria-label') || el.getAttribute('aria-labelledby') || el.closest('label'));
    if (!labelled && id) {
      try {
        labelled = Boolean(document.querySelector(`label[for="${CSS.escape(id)}"]`));
      } catch {
        labelled = false;
      }
    }
    if (!labelled) {
      el.setAttribute('data-quick-qa', 'label');
      marked += 1;
    }
  });

  const banner = document.createElement('div');
  banner.id = BANNER_ID;
  const label = document.createElement('span');
  label.textContent = `Quick QA outlines: red = missing alt, amber = unnamed link, blue = unlabeled field (${marked}).`;
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = 'Remove';
  button.addEventListener('click', () => cleanup());
  banner.append(label, button);
  document.body.appendChild(banner);
  return { marked };
}

export function removePageHighlights(): void {
  document.getElementById('quick-qa-highlight-style')?.remove();
  document.getElementById('quick-qa-highlight-banner')?.remove();
  document.querySelectorAll('[data-quick-qa]').forEach((el) => el.removeAttribute('data-quick-qa'));
}
