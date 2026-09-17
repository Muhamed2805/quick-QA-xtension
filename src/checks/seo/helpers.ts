import type { QACheckResult } from '@/types';

export function seoCheck(
  result: Omit<QACheckResult, 'category'>,
): QACheckResult {
  return { ...result, category: 'seo' };
}

export const TITLE_LENGTH = { min: 30, max: 60 } as const;
export const META_DESCRIPTION_LENGTH = { min: 120, max: 160 } as const;
