import type { ScanHistoryEntry } from '@/types';
import { compareEntries, formatDelta, pickComparePair } from '@/utils/compare';

type ComparePanelProps = {
  entries: ScanHistoryEntry[];
};

export function ComparePanel({ entries }: ComparePanelProps) {
  const pair = pickComparePair(entries);
  if (!pair) {
    return null;
  }

  const [newer, older] = pair;
  const diff = compareEntries(newer, older);

  return (
    <section className="rounded-md border border-surface-border bg-white px-3 py-3">
      <h2 className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Compare</h2>
      <p className="mt-1 text-xs text-ink-secondary">
        {newer.domain}: {older.overallScore} → {newer.overallScore} ({formatDelta(diff.overallDelta)})
      </p>
      <p className="text-[11px] text-ink-muted">
        Errors {formatDelta(diff.errorDelta)} · Warnings {formatDelta(diff.warningDelta)}
      </p>
      {diff.categories.length > 0 ? (
        <ul className="mt-2 space-y-1 text-[11px] text-ink-secondary">
          {diff.categories.map((item) => (
            <li key={item.label}>
              {item.label}: {item.before} → {item.after} ({formatDelta(item.delta)})
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-[11px] text-ink-muted">
          Scan twice on the same site to see category deltas. Older history entries may lack category scores.
        </p>
      )}
    </section>
  );
}
