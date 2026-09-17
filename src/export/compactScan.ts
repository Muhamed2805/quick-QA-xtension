import type { ScanResult } from '@/types';

export function compactScanResult(result: ScanResult): ScanResult {
  return {
    ...result,
    links: result.links.slice(0, 250),
    images: result.images.slice(0, 120),
    snapshot: {
      ...result.snapshot,
      links: result.snapshot.links.slice(0, 250),
      images: result.snapshot.images.slice(0, 120),
      content: {
        ...result.snapshot.content,
        visibleText: '',
      },
    },
  };
}
