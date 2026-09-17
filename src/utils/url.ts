import type { RestrictedPageReason } from '@/types';

const RESTRICTED_PROTOCOLS = new Set([
  'chrome:',
  'chrome-extension:',
  'edge:',
  'about:',
  'devtools:',
  'view-source:',
]);

const NEW_TAB_HOSTS = new Set(['newtab', 'ntp']);

export function classifyUrl(url: string | undefined): RestrictedPageReason | null {
  if (!url) {
    return 'missing-url';
  }

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return 'cannot-inspect';
  }

  if (RESTRICTED_PROTOCOLS.has(parsed.protocol)) {
    if (parsed.protocol === 'chrome:' && NEW_TAB_HOSTS.has(parsed.hostname)) {
      return 'new-tab';
    }
    if (parsed.protocol === 'chrome-extension:') {
      return 'extension-page';
    }
    return 'chrome-internal';
  }

  if (url.startsWith('https://chrome.google.com/webstore') || url.startsWith('https://chromewebstore.google.com')) {
    return 'cannot-inspect';
  }

  return null;
}

export function isHttpPage(url: string): boolean {
  try {
    const protocol = new URL(url).protocol;
    return protocol === 'http:' || protocol === 'https:';
  } catch {
    return false;
  }
}
