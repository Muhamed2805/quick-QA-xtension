import type { ActiveTabInfo, TabAccessError } from '@/types';
import { classifyUrl } from '@/utils/url';

const ERROR_COPY: Record<TabAccessError['code'], string> = {
  'no-active-tab': 'No active tab was found. Open a webpage and try again.',
  'missing-url': 'This tab does not expose a URL. Quick QA can only scan regular web pages.',
  'chrome-internal': 'Chrome internal pages cannot be scanned.',
  'new-tab': 'The New Tab page cannot be scanned. Open a website first.',
  'extension-page': 'Extension pages cannot be scanned.',
  'cannot-inspect': 'This page cannot be inspected. Open a standard http or https website.',
};

export function getTabAccessError(code: TabAccessError['code']): TabAccessError {
  return { code, message: ERROR_COPY[code] };
}

export async function getActiveTab(): Promise<ActiveTabInfo> {
  if (!chrome?.tabs?.query) {
    throw getTabAccessError('cannot-inspect');
  }

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (!tab?.id) {
    throw getTabAccessError('no-active-tab');
  }

  const restricted = classifyUrl(tab.url);
  if (restricted) {
    throw getTabAccessError(restricted);
  }

  if (!tab.url) {
    throw getTabAccessError('missing-url');
  }

  const parsed = new URL(tab.url);

  return {
    tabId: tab.id,
    url: tab.url,
    title: tab.title ?? parsed.hostname,
    hostname: parsed.hostname,
    protocol: parsed.protocol.replace(':', ''),
  };
}
