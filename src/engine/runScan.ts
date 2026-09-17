import { checkRegistry } from '@/checks/registry';
import { runChecks } from '@/checks/runChecks';
import { buildCategorySummaries, buildScanSummary } from '@/scoring/scoreChecks';
import type { PageSnapshot, ScanResult } from '@/types';

export function runScan(snapshot: PageSnapshot): ScanResult {
  const checks = runChecks(snapshot, checkRegistry);

  return {
    scannedAt: snapshot.collectedAt,
    page: {
      url: snapshot.url,
      protocol: snapshot.protocol,
      hostname: snapshot.hostname,
      title: snapshot.title,
      lang: snapshot.lang,
      charset: snapshot.charset,
    },
    summary: buildScanSummary(checks),
    categories: buildCategorySummaries(checks),
    checks,
    links: snapshot.links,
    images: snapshot.images,
    forms: snapshot.forms,
    snapshot,
  };
}
