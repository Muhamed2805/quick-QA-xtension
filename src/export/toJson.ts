import type { ScanResult } from '@/types';

export function toExportDocument(result: ScanResult) {
  const { snapshot, ...rest } = result;

  return {
    generator: 'Quick QA',
    version: '0.1.0',
    ...rest,
    snapshot: {
      ...snapshot,
      content: {
        wordCount: snapshot.content.wordCount,
        paragraphCount: snapshot.content.paragraphCount,
        visibleTextChars: snapshot.content.visibleText.length,
      },
    },
  };
}

export function downloadJson(result: ScanResult) {
  const payload = toExportDocument(result);
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  const host = result.page.hostname.replace(/[^\w.-]+/g, '_') || 'page';
  anchor.href = url;
  anchor.download = `quick-qa-${host}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}
