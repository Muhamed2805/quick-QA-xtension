import { collectPageSnapshot } from '@/extension/collectPageSnapshot';
import { getTabAccessError } from '@/extension/tabs';
import type { PageSnapshot, TabAccessError } from '@/types';

function asScriptingError(error: unknown): TabAccessError {
  const text = error instanceof Error ? error.message : String(error ?? '');
  const lower = text.toLowerCase();

  if (lower.includes('no tab with id') || lower.includes('tab not found')) {
    return getTabAccessError('tab-changed');
  }
  if (lower.includes('cannot access') || lower.includes('cannot be scripted')) {
    return getTabAccessError('injection-failed');
  }
  return {
    code: 'injection-failed',
    message: text
      ? `The page could not be scanned. ${text}`
      : 'The page could not be scanned. It may have reloaded or blocked inspection.',
  };
}

export async function captureSnapshot(tabId: number): Promise<PageSnapshot> {
  if (!chrome.scripting?.executeScript) {
    throw getTabAccessError('scripting-unavailable');
  }

  let results: chrome.scripting.InjectionResult<PageSnapshot>[];
  try {
    results = await chrome.scripting.executeScript({
      target: { tabId },
      func: collectPageSnapshot,
    });
  } catch (error) {
    throw asScriptingError(error);
  }

  const snapshot = results[0]?.result;
  if (!snapshot) {
    throw getTabAccessError('empty-snapshot');
  }

  return snapshot;
}
