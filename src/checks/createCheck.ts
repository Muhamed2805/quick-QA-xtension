import type { QACategory, QACheckResult } from '@/types';

export function makeCheck(category: QACategory) {
  return (result: Omit<QACheckResult, 'category'>): QACheckResult => ({
    category,
    ...result,
  });
}
