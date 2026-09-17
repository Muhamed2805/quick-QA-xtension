import { CategoryNav } from '@/components/CategoryNav';
import { CheckList } from '@/components/CheckList';
import { ImageTable } from '@/components/ImageTable';
import { StatCard } from '@/components/StatCard';
import { downloadJson } from '@/export/toJson';
import { copyTextSummary } from '@/export/toSummary';
import { CATEGORY_NAV } from '@/features/popup/constants';
import type { QACategory, ScanResult } from '@/types';
import { topIssues } from '@/utils/checks';
import { useState } from 'react';

type ResultsShellProps = {
  result: ScanResult;
  onRescan: () => void;
};

function scoreTone(score: number): 'pass' | 'warn' | 'fail' {
  if (score >= 85) return 'pass';
  if (score >= 60) return 'warn';
  return 'fail';
}

export function ResultsShell({ result, onRescan }: ResultsShellProps) {
  const [section, setSection] = useState<QACategory | 'overview'>('overview');
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const sectionLabel = CATEGORY_NAV.find((item) => item.id === section)?.label ?? 'Overview';
  const { page, checks, summary } = result;
  const issues = topIssues(checks, 6);
  const sectionChecks =
    section === 'overview' ? [] : checks.filter((item) => item.category === section);

  const handleCopy = async () => {
    try {
      await copyTextSummary(result);
      setCopyState('copied');
      window.setTimeout(() => setCopyState('idle'), 1800);
    } catch {
      setCopyState('failed');
    }
  };

  return (
    <div className="flex min-h-[540px] flex-col">
      <div className="border-b border-surface-border bg-surface-raised px-4 py-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] font-medium uppercase tracking-wide text-ink-muted">Scanned page</p>
            <p className="truncate text-sm font-semibold" title={page.hostname}>
              {page.hostname}
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
          <StatCard label="Score" value={String(summary.overallScore)} tone={scoreTone(summary.overallScore)} />
          <StatCard label="Errors" value={String(summary.errors)} tone="fail" />
          <StatCard label="Warnings" value={String(summary.warnings)} tone="warn" />
          <StatCard label="Passed" value={String(summary.passed)} tone="pass" />
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => downloadJson(result)}
            className="rounded-md border border-surface-border bg-white px-2.5 py-1 text-xs font-medium hover:bg-surface-muted"
          >
            Export JSON
          </button>
          <button
            type="button"
            onClick={() => void handleCopy()}
            className="rounded-md border border-surface-border bg-white px-2.5 py-1 text-xs font-medium hover:bg-surface-muted"
          >
            {copyState === 'copied' ? 'Copied' : copyState === 'failed' ? 'Copy failed' : 'Copy Summary'}
          </button>
        </div>
      </div>

      <CategoryNav active={section} onChange={setSection} />

      <section className="flex-1 overflow-y-auto px-4 py-4">
        <h2 className="text-sm font-semibold">{sectionLabel}</h2>

        {section === 'overview' ? (
          <div className="mt-3 flex flex-col gap-4">
            <p className="text-xs leading-5 text-ink-muted">
              Weighted score from pass / warning / fail checks. Informational findings do not reduce
              the score. This is not Lighthouse or a WCAG certification.
            </p>
            <div className="grid grid-cols-2 gap-2">
              {result.categories.map((item) => (
                <button
                  key={item.category}
                  type="button"
                  onClick={() => setSection(item.category)}
                  className="rounded-md border border-surface-border bg-white px-3 py-2 text-left shadow-card hover:bg-surface-muted"
                >
                  <p className="text-[11px] font-medium uppercase tracking-wide text-ink-muted">
                    {item.label}
                  </p>
                  <p className="mt-0.5 text-lg font-semibold tabular-nums">{item.score}</p>
                  <p className="text-[11px] text-ink-muted">
                    {item.errors} err · {item.warnings} warn · {item.passed} pass
                  </p>
                </button>
              ))}
            </div>
            <FactCounts result={result} />
            <div>
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-muted">
                Top issues
              </h3>
              <CheckList checks={issues} emptyLabel="No errors or warnings on this scan." />
            </div>
          </div>
        ) : null}

        {section === 'accessibility' ? (
          <p className="mt-1 text-xs leading-5 text-ink-muted">
            These checks catch common problems. They do not prove WCAG conformance.
          </p>
        ) : null}

        {section === 'technical' ? (
          <p className="mt-1 text-xs leading-5 text-ink-muted">
            Timings come from the browser Performance API and are not a Lighthouse score.
          </p>
        ) : null}

        {section === 'images' ? (
          <div className="mt-3">
            <ImageTable images={result.images} />
          </div>
        ) : null}

        {section !== 'overview' ? (
          <div className="mt-3">
            <CheckList checks={sectionChecks} />
          </div>
        ) : null}
      </section>
    </div>
  );
}

function FactCounts({ result }: { result: ScanResult }) {
  return (
    <p className="text-xs text-ink-muted">
      {result.summary.totalChecks} checks · {result.links.length} links · {result.images.length} images
      · {result.forms.length} forms
    </p>
  );
}
