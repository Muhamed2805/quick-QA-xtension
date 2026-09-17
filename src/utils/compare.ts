import type { ScanHistoryEntry } from '@/types';

export type ScoreDelta = {
  label: string;
  before: number;
  after: number;
  delta: number;
};

export function compareEntries(newer: ScanHistoryEntry, older: ScanHistoryEntry): {
  overallDelta: number;
  errorDelta: number;
  warningDelta: number;
  categories: ScoreDelta[];
} {
  const olderMap = new Map((older.categoryScores ?? []).map((item) => [item.category, item]));
  const categories = (newer.categoryScores ?? []).map((item) => {
    const previous = olderMap.get(item.category)?.score ?? item.score;
    return {
      label: item.label,
      before: previous,
      after: item.score,
      delta: item.score - previous,
    };
  });

  return {
    overallDelta: newer.overallScore - older.overallScore,
    errorDelta: newer.errorCount - older.errorCount,
    warningDelta: newer.warningCount - older.warningCount,
    categories,
  };
}

export function pickComparePair(entries: ScanHistoryEntry[]): [ScanHistoryEntry, ScanHistoryEntry] | null {
  if (entries.length < 2) return null;
  const newest = entries[0];
  if (!newest) return null;
  const previousSameHost = entries.find((item) => item.id !== newest.id && item.domain === newest.domain);
  const older = previousSameHost ?? entries[1];
  if (!older) return null;
  return [newest, older];
}

export function formatDelta(value: number): string {
  if (value > 0) return `+${value}`;
  return String(value);
}
