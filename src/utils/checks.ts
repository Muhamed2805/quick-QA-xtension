import type { QACheckResult, QAStatus } from '@/types';

const STATUS_RANK: Record<QAStatus, number> = {
  fail: 0,
  warning: 1,
  info: 2,
  pass: 3,
};

export function sortChecks(checks: QACheckResult[]): QACheckResult[] {
  return [...checks].sort((a, b) => {
    const rank = STATUS_RANK[a.status] - STATUS_RANK[b.status];
    if (rank !== 0) return rank;
    return a.title.localeCompare(b.title);
  });
}

export function topIssues(checks: QACheckResult[], limit = 5): QACheckResult[] {
  return sortChecks(checks.filter((item) => item.status === 'fail' || item.status === 'warning')).slice(
    0,
    limit,
  );
}

export type CheckFilterMode = 'issues' | 'errors' | 'warnings' | 'all';

export function matchesCheckQuery(check: QACheckResult, query: string): boolean {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  return [check.title, check.description, check.recommendation ?? '', check.id]
    .join(' ')
    .toLowerCase()
    .includes(needle);
}

export function filterChecks(
  checks: QACheckResult[],
  mode: CheckFilterMode,
  query = '',
): QACheckResult[] {
  return checks.filter((item) => {
    if (mode === 'issues' && item.status !== 'fail' && item.status !== 'warning') return false;
    if (mode === 'errors' && item.status !== 'fail') return false;
    if (mode === 'warnings' && item.status !== 'warning') return false;
    return matchesCheckQuery(item, query);
  });
}

export function formatCurrentValue(value: QACheckResult['currentValue']): string | null {
  if (value === undefined) return null;
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  return String(value);
}
