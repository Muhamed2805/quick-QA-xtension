import { computeScore } from '@/scoring/scoreChecks';
import type { QACheckResult } from '@/types';
import { describe, expect, it } from 'vitest';

function check(partial: Partial<QACheckResult> & Pick<QACheckResult, 'status' | 'weight'>): QACheckResult {
  return {
    id: 'x',
    category: 'seo',
    title: 't',
    description: 'd',
    severity: partial.status === 'fail' ? 'error' : partial.status === 'warning' ? 'warning' : 'info',
    ...partial,
  };
}

describe('scoring', () => {
  it('returns 100 when there are no weighted checks', () => {
    expect(computeScore([check({ status: 'info', weight: 0 })])).toBe(100);
  });

  it('ignores informational checks even with a weight', () => {
    expect(
      computeScore([
        check({ status: 'pass', weight: 10 }),
        check({ status: 'info', weight: 50 }),
      ]),
    ).toBe(100);
  });

  it('applies warning and fail factors', () => {
    expect(
      computeScore([
        check({ status: 'pass', weight: 10 }),
        check({ status: 'warning', weight: 10 }),
        check({ status: 'fail', weight: 10 }),
      ]),
    ).toBe(50);
  });
});
