import { dedupeGroupedChecks } from '@/scoring/dedupeChecks';
import type { QACheckResult } from '@/types';
import { describe, expect, it } from 'vitest';

function check(
  partial: Pick<QACheckResult, 'id' | 'category' | 'title' | 'status'> & Partial<QACheckResult>,
): QACheckResult {
  return {
    description: partial.title,
    severity: partial.status === 'fail' ? 'error' : partial.status === 'warning' ? 'warning' : 'info',
    weight: 5,
    ...partial,
  };
}

describe('dedupeGroupedChecks', () => {
  it('keeps one missing-alt issue and demotes the rest', () => {
    const result = dedupeGroupedChecks([
      check({ id: 'img-missing-alt', category: 'images', title: 'Images missing alt', status: 'fail' }),
      check({ id: 'a11y-missing-alt', category: 'accessibility', title: 'Images missing alt attributes', status: 'fail' }),
      check({ id: 'seo-missing-alt', category: 'seo', title: 'Missing alt attributes', status: 'warning' }),
    ]);

    const fail = result.filter((item) => item.status === 'fail');
    const info = result.filter((item) => item.status === 'info');
    expect(fail).toHaveLength(1);
    expect(fail[0]?.id).toBe('img-missing-alt');
    expect(info).toHaveLength(2);
    expect(info.every((item) => item.weight === 0)).toBe(true);
  });
});
