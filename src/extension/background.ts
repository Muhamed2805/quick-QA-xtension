import type { LinkStatusResult } from '@/types';

const TIMEOUT_MS = 8000;

async function probe(href: string): Promise<LinkStatusResult> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const head = await fetch(href, { method: 'HEAD', redirect: 'follow', signal: controller.signal });
    if (head.status !== 405 && head.status !== 501) {
      return { href, ok: head.ok, status: head.status };
    }
    const get = await fetch(href, { method: 'GET', redirect: 'follow', signal: controller.signal });
    return { href, ok: get.ok, status: get.status };
  } catch (error) {
    return {
      href,
      ok: false,
      status: null,
      error: error instanceof Error ? error.message : 'Request failed',
    };
  } finally {
    clearTimeout(timer);
  }
}

export async function probeLinks(urls: string[]): Promise<LinkStatusResult[]> {
  const results: LinkStatusResult[] = new Array(urls.length);
  let cursor = 0;
  const workers = Array.from({ length: Math.min(6, urls.length) }, async () => {
    while (cursor < urls.length) {
      const index = cursor;
      cursor += 1;
      const href = urls[index];
      if (href) {
        results[index] = await probe(href);
      }
    }
  });
  await Promise.all(workers);
  return results.filter((item): item is LinkStatusResult => Boolean(item));
}

chrome.runtime.onInstalled.addListener(() => {
  void chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: false });
});

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message && message.type === 'CHECK_LINKS' && Array.isArray(message.urls)) {
    void probeLinks(message.urls as string[]).then(sendResponse);
    return true;
  }
  return false;
});
