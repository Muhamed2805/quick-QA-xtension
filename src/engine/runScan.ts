import { checkRegistry } from '@/checks/registry';
import { runChecks } from '@/checks/runChecks';
import type { PageSnapshot, ScanResult, ScanSummary } from '@/types';

const EMPTY_SUMMARY: ScanSummary = {
  overallScore: 0,
  passed: 0,
  warnings: 0,
  errors: 0,
  info: 0,
  totalChecks: 0,
};

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
    summary: {
      ...EMPTY_SUMMARY,
      totalChecks: checks.length,
      info: checks.filter((item) => item.status === 'info').length,
      passed: checks.filter((item) => item.status === 'pass').length,
      warnings: checks.filter((item) => item.status === 'warning').length,
      errors: checks.filter((item) => item.status === 'fail').length,
    },
    categories: [],
    checks,
    links: snapshot.links,
    images: snapshot.images,
    forms: snapshot.forms,
    snapshot,
  };
}
