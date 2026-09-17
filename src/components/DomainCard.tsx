import type { ActiveTabInfo } from '@/types';

type DomainCardProps = {
  tab: ActiveTabInfo | null;
  loading: boolean;
};

export function DomainCard({ tab, loading }: DomainCardProps) {
  if (loading) {
    return (
      <div className="rounded-md border border-surface-border bg-surface-raised px-3 py-3">
        <p className="text-[11px] font-medium uppercase tracking-wide text-ink-muted">Current page</p>
        <p className="mt-1 text-sm text-ink-muted">Detecting tab…</p>
      </div>
    );
  }

  if (!tab) {
    return (
      <div className="rounded-md border border-surface-border bg-surface-raised px-3 py-3">
        <p className="text-[11px] font-medium uppercase tracking-wide text-ink-muted">Current page</p>
        <p className="mt-1 text-sm text-ink">Unavailable</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border border-surface-border bg-surface-raised px-3 py-3">
      <p className="text-[11px] font-medium uppercase tracking-wide text-ink-muted">Current page</p>
      <p className="mt-1 truncate text-sm font-medium" title={tab.hostname}>
        {tab.hostname}
      </p>
      <p className="mt-0.5 truncate text-xs text-ink-muted" title={tab.url}>
        {tab.url}
      </p>
    </div>
  );
}
