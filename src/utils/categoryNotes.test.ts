import { shouldExplainFormsVsAccessibility } from '@/utils/categoryNotes';
import { describe, expect, it } from 'vitest';
import type { CategorySummary, QACheckResult, ScanResult } from '@/types';

function category(partial: Pick<CategorySummary, 'category' | 'score'>): CategorySummary {
  return {
    label: partial.category,
    passed: 0,
    warnings: 0,
    errors: 0,
    info: 0,
    total: 0,
    ...partial,
  };
}

function check(partial: Pick<QACheckResult, 'id' | 'status'>): QACheckResult {
  return {
    category: 'accessibility',
    title: partial.id,
    description: '',
    severity: partial.status === 'fail' ? 'error' : 'warning',
    weight: 1,
    ...partial,
  };
}

describe('forms vs accessibility note', () => {
  it('explains a high forms score with unlabeled controls outside forms', () => {
    const result = {
      categories: [category({ category: 'forms', score: 100 }), category({ category: 'accessibility', score: 48 })],
      checks: [check({ id: 'a11y-input-labels', status: 'fail' })],
    } as ScanResult;

    expect(shouldExplainFormsVsAccessibility(result)).toBe(true);
  });

  it('stays quiet when both categories are healthy', () => {
    const result = {
      categories: [category({ category: 'forms', score: 100 }), category({ category: 'accessibility', score: 92 })],
      checks: [check({ id: 'a11y-input-labels', status: 'pass' })],
    } as ScanResult;

    expect(shouldExplainFormsVsAccessibility(result)).toBe(false);
  });
});
