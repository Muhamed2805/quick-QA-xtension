import type { ScanResult } from '@/types';
import { buildCategorySummaries, buildScanSummary } from '@/scoring/scoreChecks';

export function applyIgnoredChecks(result: ScanResult, ignoredIds: string[]): ScanResult {
  if (ignoredIds.length === 0) return result;
  const ignored = new Set(ignoredIds);
  const checks = result.checks.filter((check) => !ignored.has(check.id));
  return {
    ...result,
    checks,
    summary: buildScanSummary(checks),
    categories: buildCategorySummaries(checks),
  };
}
