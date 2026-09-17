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

export function formatCurrentValue(value: QACheckResult['currentValue']): string | null {
  if (value === undefined) return null;
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  return String(value);
}
