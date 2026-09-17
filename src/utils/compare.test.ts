import { compareEntries, formatDelta } from '@/utils/compare';
import { describe, expect, it } from 'vitest';
import type { ScanHistoryEntry } from '@/types';

function entry(partial: Partial<ScanHistoryEntry> & Pick<ScanHistoryEntry, 'id' | 'overallScore'>): ScanHistoryEntry {
  return {
    domain: 'example.com',
    url: 'https://example.com',
    timestamp: '2026-01-01T00:00:00.000Z',
    errorCount: 1,
    warningCount: 2,
    ...partial,
  };
}

describe('compareEntries', () => {
  it('computes overall and category deltas', () => {
    const newer = entry({
      id: 'b',
      overallScore: 80,
      errorCount: 1,
      categoryScores: [{ category: 'seo', label: 'SEO', score: 90 }],
    });
    const older = entry({
      id: 'a',
      overallScore: 70,
      errorCount: 3,
      categoryScores: [{ category: 'seo', label: 'SEO', score: 75 }],
    });
    const diff = compareEntries(newer, older);
    expect(diff.overallDelta).toBe(10);
    expect(diff.errorDelta).toBe(-2);
    expect(diff.categories[0]?.delta).toBe(15);
    expect(formatDelta(10)).toBe('+10');
  });
});
