import type { PageSnapshot, QACheckResult } from '@/types';

export type CheckFn = (snapshot: PageSnapshot) => QACheckResult | QACheckResult[] | null | undefined;

export function runChecks(snapshot: PageSnapshot, checks: CheckFn[]): QACheckResult[] {
  const results: QACheckResult[] = [];

  for (const check of checks) {
    const output = check(snapshot);
    if (!output) continue;
    if (Array.isArray(output)) {
      results.push(...output);
    } else {
      results.push(output);
    }
  }

  return results;
}
