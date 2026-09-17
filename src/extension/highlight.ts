import { applyPageHighlights, removePageHighlights } from '@/extension/highlightPage';

export async function highlightCurrentTab(tabId: number): Promise<number> {
  const results = await chrome.scripting.executeScript({
    target: { tabId },
    func: applyPageHighlights,
  });
  return results[0]?.result?.marked ?? 0;
}

export async function clearHighlights(tabId: number): Promise<void> {
  await chrome.scripting.executeScript({
    target: { tabId },
    func: removePageHighlights,
  });
}
