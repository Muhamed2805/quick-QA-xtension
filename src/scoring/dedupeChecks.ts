import type { QACheckResult, QAStatus } from '@/types';

const ISSUE_GROUPS: string[][] = [
  ['img-missing-alt', 'a11y-missing-alt', 'seo-missing-alt'],
  ['a11y-empty-links', 'seo-empty-link-text'],
  ['seo-title-exists', 'a11y-document-title'],
];

const STATUS_RANK: Record<QAStatus, number> = {
  fail: 0,
  warning: 1,
  info: 2,
  pass: 3,
};

function isIssue(status: QAStatus): boolean {
  return status === 'fail' || status === 'warning';
}

function pickPrimary(issues: QACheckResult[], group: string[]): QACheckResult {
  return [...issues].sort((a, b) => {
    const rank = STATUS_RANK[a.status] - STATUS_RANK[b.status];
    if (rank !== 0) return rank;
    return group.indexOf(a.id) - group.indexOf(b.id);
  })[0]!;
}

export function dedupeGroupedChecks(checks: QACheckResult[]): QACheckResult[] {
  const byId = new Map(checks.map((check) => [check.id, check]));
  const demoteTo = new Map<string, string>();

  for (const group of ISSUE_GROUPS) {
    const members = group.map((id) => byId.get(id)).filter((item): item is QACheckResult => Boolean(item));
    const issues = members.filter((item) => isIssue(item.status));
    if (issues.length < 2) continue;

    const primary = pickPrimary(issues, group);
    for (const item of issues) {
      if (item.id !== primary.id) {
        demoteTo.set(item.id, primary.title);
      }
    }
  }

  return checks.map((check) => {
    const primaryTitle = demoteTo.get(check.id);
    if (!primaryTitle) return check;
    return {
      ...check,
      status: 'info',
      severity: 'info',
      weight: 0,
      description: `${check.description} Counted once under “${primaryTitle}” so the score is not punished twice.`,
    };
  });
}
