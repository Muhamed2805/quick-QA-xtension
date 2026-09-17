import type { CategorySummary, QACategory, QACheckResult, QAStatus, ScanSummary } from '@/types';

const FACTOR: Record<QAStatus, number | null> = {
  pass: 1,
  warning: 0.5,
  fail: 0,
  info: null,
};

const CATEGORY_LABEL: Record<QACategory, string> = {
  seo: 'SEO',
  accessibility: 'Accessibility',
  links: 'Links',
  images: 'Images',
  forms: 'Forms',
  content: 'Content',
  technical: 'Technical',
};

const CATEGORY_ORDER: QACategory[] = [
  'seo',
  'accessibility',
  'links',
  'images',
  'forms',
  'content',
  'technical',
];

export function isScoredCheck(check: QACheckResult): boolean {
  return check.weight > 0 && FACTOR[check.status] !== null;
}

export function computeScore(checks: QACheckResult[]): number {
  const scored = checks.filter(isScoredCheck);
  const max = scored.reduce((sum, check) => sum + check.weight, 0);
  if (max === 0) return 100;

  const earned = scored.reduce((sum, check) => {
    const factor = FACTOR[check.status] ?? 0;
    return sum + check.weight * factor;
  }, 0);

  return Math.round((earned / max) * 100);
}

export function countByStatus(checks: QACheckResult[]) {
  return {
    passed: checks.filter((item) => item.status === 'pass').length,
    warnings: checks.filter((item) => item.status === 'warning').length,
    errors: checks.filter((item) => item.status === 'fail').length,
    info: checks.filter((item) => item.status === 'info').length,
  };
}

export function buildScanSummary(checks: QACheckResult[]): ScanSummary {
  const counts = countByStatus(checks);
  return {
    overallScore: computeScore(checks),
    totalChecks: checks.length,
    ...counts,
  };
}

export function buildCategorySummaries(checks: QACheckResult[]): CategorySummary[] {
  return CATEGORY_ORDER.map((category) => {
    const items = checks.filter((check) => check.category === category);
    const counts = countByStatus(items);
    return {
      category,
      label: CATEGORY_LABEL[category],
      score: computeScore(items),
      total: items.length,
      ...counts,
    };
  });
}
