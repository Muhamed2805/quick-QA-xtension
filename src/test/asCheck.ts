import type { QACheckResult } from '@/types';

export function asCheck(
  value: QACheckResult | QACheckResult[] | null | undefined,
): QACheckResult {
  if (!value) {
    throw new Error('Expected a check result');
  }
  if (Array.isArray(value)) {
    const first = value[0];
    if (!first) throw new Error('Expected a check result');
    return first;
  }
  return value;
}
