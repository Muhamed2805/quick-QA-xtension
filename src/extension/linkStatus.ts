import type { LinkStatusResult } from '@/types';

export const LINK_CHECK_LIMIT = 40;

export async function requestLinkCheckPermission(): Promise<boolean> {
  return chrome.permissions.request({ origins: ['http://*/*', 'https://*/*'] });
}

export async function checkLinkStatuses(urls: string[]): Promise<LinkStatusResult[]> {
  const unique = [...new Set(urls)].slice(0, LINK_CHECK_LIMIT);
  return chrome.runtime.sendMessage({ type: 'CHECK_LINKS', urls: unique }) as Promise<LinkStatusResult[]>;
}

export function httpLinksFrom(hrefs: string[], pageUrl: string): string[] {
  const resolved: string[] = [];
  for (const href of hrefs) {
    try {
      const url = new URL(href, pageUrl);
      if (url.protocol === 'http:' || url.protocol === 'https:') {
        resolved.push(url.href);
      }
    } catch {
      /* skip */
    }
  }
  return resolved;
}
