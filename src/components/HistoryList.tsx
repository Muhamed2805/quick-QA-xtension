import type { ScanHistoryEntry } from '@/types';

type HistoryListProps = {
  entries: ScanHistoryEntry[];
  onClear: () => void;
};

function formatTime(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
}

export function HistoryList({ entries, onClear }: HistoryListProps) {
  return (
    <section className="mt-auto rounded-md border border-surface-border bg-surface-raised px-3 py-3">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-ink-muted">History</h2>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-ink-muted">Local only</span>
          {entries.length > 0 ? (
            <button
              type="button"
              onClick={onClear}
              className="text-[11px] font-medium text-ink-secondary hover:text-ink"
            >
              Clear
            </button>
          ) : null}
        </div>
      </div>
      {entries.length === 0 ? (
        <p className="mt-2 text-xs text-ink-secondary">No scans yet.</p>
      ) : (
        <ul className="mt-2 flex flex-col gap-2">
          {entries.slice(0, 8).map((entry) => (
            <li key={entry.id} className="text-xs">
              <p className="truncate font-medium" title={entry.url}>
                {entry.domain}
              </p>
              <p className="text-[11px] text-ink-muted">
                {entry.overallScore}/100 · {entry.errorCount} err · {entry.warningCount} warn ·{' '}
                {formatTime(entry.timestamp)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
