import { CategoryNav } from '@/components/CategoryNav';
import { StatCard } from '@/components/StatCard';
import { CATEGORY_NAV } from '@/features/popup/constants';
import type { ActiveTabInfo, QACategory } from '@/types';
import { useState } from 'react';

type ResultsShellProps = {
  tab: ActiveTabInfo;
  onRescan: () => void;
};

export function ResultsShell({ tab, onRescan }: ResultsShellProps) {
  const [section, setSection] = useState<QACategory | 'overview'>('overview');
  const sectionLabel = CATEGORY_NAV.find((item) => item.id === section)?.label ?? 'Overview';

  return (
    <div className="flex min-h-[540px] flex-col">
      <div className="border-b border-surface-border bg-surface-raised px-4 py-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] font-medium uppercase tracking-wide text-ink-muted">
              Connected page
            </p>
            <p className="truncate text-sm font-semibold" title={tab.hostname}>
              {tab.hostname}
            </p>
          </div>
          <button
            type="button"
            onClick={onRescan}
            className="shrink-0 rounded-md border border-surface-border bg-white px-2.5 py-1 text-xs font-medium text-ink-secondary hover:bg-surface-muted"
          >
            New scan
          </button>
        </div>
        <div className="mt-3 grid grid-cols-4 gap-2">
          <StatCard label="Score" value="—" />
          <StatCard label="Errors" value="—" tone="fail" />
          <StatCard label="Warnings" value="—" tone="warn" />
          <StatCard label="Passed" value="—" tone="pass" />
        </div>
      </div>

      <CategoryNav active={section} onChange={setSection} />

      <section className="flex-1 px-4 py-4">
        <h2 className="text-sm font-semibold">{sectionLabel}</h2>
        <p className="mt-1 text-xs leading-5 text-ink-muted">
          The page is reachable. Findings will appear here after analysis runs.
        </p>
        <div className="mt-4 rounded-md border border-dashed border-surface-border bg-white px-3 py-6 text-center">
          <p className="text-sm font-medium">No checks yet</p>
          <p className="mt-1 text-xs text-ink-muted">
            Category results for SEO, accessibility, links, images, forms, content, and technical
            quality will show in this panel.
          </p>
        </div>
      </section>
    </div>
  );
}
