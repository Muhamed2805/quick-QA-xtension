import { CategoryNav } from '@/components/CategoryNav';
import { CheckList } from '@/components/CheckList';
import { ImageTable } from '@/components/ImageTable';
import { StatCard } from '@/components/StatCard';
import { downloadJson } from '@/export/toJson';
import { copyMarkdownIssues } from '@/export/toMarkdown';
import { copyTextSummary } from '@/export/toSummary';
import { clearHighlights, highlightCurrentTab } from '@/extension/highlight';
import {
  checkLinkStatuses,
  httpLinksFrom,
  LINK_CHECK_LIMIT,
  requestLinkCheckPermission,
} from '@/extension/linkStatus';
import { CATEGORY_NAV } from '@/features/popup/constants';
import type { LinkStatusResult, QACategory, ScanResult } from '@/types';
import { shouldExplainFormsVsAccessibility } from '@/utils/categoryNotes';
import { filterChecks, topIssues, type CheckFilterMode } from '@/utils/checks';
import { useState } from 'react';

type ResultsShellProps = {
  result: ScanResult;
  tabId: number | null;
  onRescan: () => void;
  onIgnoreCheck: (id: string) => void;
};

function scoreTone(score: number): 'pass' | 'warn' | 'fail' {
  if (score >= 85) return 'pass';
  if (score >= 60) return 'warn';
  return 'fail';
}

export function ResultsShell({ result, tabId, onRescan, onIgnoreCheck }: ResultsShellProps) {
  const [section, setSection] = useState<QACategory | 'overview'>('overview');
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'copied-md' | 'failed'>('idle');
  const [checkFilter, setCheckFilter] = useState<CheckFilterMode>('issues');
  const [checkQuery, setCheckQuery] = useState('');
  const [highlightState, setHighlightState] = useState<string | null>(null);
  const [linkBusy, setLinkBusy] = useState(false);
  const [linkResults, setLinkResults] = useState<LinkStatusResult[] | null>(null);
  const [linkError, setLinkError] = useState<string | null>(null);
  const sectionLabel = CATEGORY_NAV.find((item) => item.id === section)?.label ?? 'Overview';
  const { page, checks, summary } = result;
  const issues = topIssues(checks, 8);
  const sectionChecks =
    section === 'overview'
      ? []
      : filterChecks(
          checks.filter((item) => item.category === section),
          checkFilter,
          checkQuery,
        );
  const overviewIssues = filterChecks(issues, 'issues', checkQuery);

  const handleCopy = async () => {
    try {
      await copyTextSummary(result);
      setCopyState('copied');
      window.setTimeout(() => setCopyState('idle'), 1800);
    } catch {
      setCopyState('failed');
    }
  };

  const handleCopyMarkdown = async () => {
    try {
      await copyMarkdownIssues(result);
      setCopyState('copied-md');
      window.setTimeout(() => setCopyState('idle'), 1800);
    } catch {
      setCopyState('failed');
    }
  };

  const handlePrint = () => {
    void chrome.tabs.create({ url: chrome.runtime.getURL('report.html') });
  };

  const handleHighlight = async () => {
    if (tabId == null) {
      setHighlightState('No tab to highlight.');
      return;
    }
    try {
      const marked = await highlightCurrentTab(tabId);
      setHighlightState(`Outlined ${marked} element(s). Use Remove on the page banner to clear.`);
    } catch {
      setHighlightState('Could not highlight this page.');
    }
  };

  const handleClearHighlight = async () => {
    if (tabId == null) return;
    try {
      await clearHighlights(tabId);
      setHighlightState('Highlights removed.');
    } catch {
      setHighlightState('Could not remove highlights.');
    }
  };

  const handleLinkCheck = async () => {
    setLinkBusy(true);
    setLinkError(null);
    try {
      const allowed = await requestLinkCheckPermission();
      if (!allowed) {
        setLinkError('Permission to request link URLs was declined.');
        return;
      }
      const hrefs = httpLinksFrom(
        result.links.map((item) => item.href),
        result.page.url,
      );
      setLinkResults(await checkLinkStatuses(hrefs));
    } catch (error) {
      setLinkError(error instanceof Error ? error.message : 'Link check failed.');
    } finally {
      setLinkBusy(false);
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
          <button
            type="button"
            onClick={() => void handleCopyMarkdown()}
            className="rounded-md border border-surface-border bg-white px-2.5 py-1 text-xs font-medium hover:bg-surface-muted"
          >
            {copyState === 'copied-md' ? 'Copied Markdown' : 'Copy Markdown'}
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="rounded-md border border-surface-border bg-white px-2.5 py-1 text-xs font-medium hover:bg-surface-muted"
          >
            Print / PDF
          </button>
          <button
            type="button"
            onClick={() => void handleHighlight()}
            className="rounded-md border border-surface-border bg-white px-2.5 py-1 text-xs font-medium hover:bg-surface-muted"
          >
            Highlight on page
          </button>
          <button
            type="button"
            onClick={() => void handleClearHighlight()}
            className="rounded-md border border-surface-border bg-white px-2.5 py-1 text-xs font-medium hover:bg-surface-muted"
          >
            Clear highlights
          </button>
        </div>
        {highlightState ? <p className="mt-2 text-[11px] text-ink-muted">{highlightState}</p> : null}
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
            {shouldExplainFormsVsAccessibility(result) ? (
              <div className="rounded-md border border-info/20 bg-info-soft px-3 py-2.5">
                <p className="text-xs font-medium text-info">Forms vs accessibility</p>
                <p className="mt-1 text-xs leading-5 text-ink-secondary">
                  A high Forms score only means the actual <code className="text-[11px]">&lt;form&gt;</code>{' '}
                  elements look all right. Accessibility also scores search boxes, icon buttons, and
                  links that sit outside those forms — so those two numbers can disagree on a shop
                  homepage.
                </p>
              </div>
            ) : null}
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
              <CheckSearch value={checkQuery} onChange={setCheckQuery} />
              <CheckList checks={overviewIssues} emptyLabel="No errors or warnings on this scan." onIgnore={onIgnoreCheck} />
            </div>
          </div>
        ) : null}

        {section === 'accessibility' ? (
          <p className="mt-1 text-xs leading-5 text-ink-muted">
            These checks catch common problems. They do not prove WCAG conformance.
          </p>
        ) : null}

        {section === 'forms' ? (
          <p className="mt-1 text-xs leading-5 text-ink-muted">
            This category inspects <code className="text-[11px]">&lt;form&gt;</code> markup only.
            Search and filter fields outside a form are scored under Accessibility.
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

        {section === 'links' ? (
          <div className="mt-3 rounded-md border border-surface-border bg-white px-3 py-3">
            <p className="text-xs leading-5 text-ink-secondary">
              Optional HTTP checks (max {LINK_CHECK_LIMIT} unique http(s) links). Chrome will ask for extra
              site access. This is not a full crawler.
            </p>
            <button
              type="button"
              onClick={() => void handleLinkCheck()}
              disabled={linkBusy}
              className="mt-2 rounded-md border border-surface-border px-2.5 py-1 text-xs font-medium hover:bg-surface-muted disabled:opacity-50"
            >
              {linkBusy ? 'Checking links…' : 'Check link statuses'}
            </button>
            {linkError ? <p className="mt-2 text-xs text-fail">{linkError}</p> : null}
            {linkResults ? (
              <p className="mt-2 text-xs text-ink-secondary">
                {linkResults.filter((item) => !item.ok).length} failed / {linkResults.length} checked
              </p>
            ) : null}
          </div>
        ) : null}

        {section !== 'overview' ? (
          <div className="mt-3">
            <div className="mb-3 flex flex-col gap-2">
              <CheckSearch value={checkQuery} onChange={setCheckQuery} />
              <div className="flex flex-wrap gap-1">
                {(
                  [
                    ['issues', 'Issues'],
                    ['errors', 'Errors'],
                    ['warnings', 'Warnings'],
                    ['all', 'All'],
                  ] as const
                ).map(([mode, label]) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setCheckFilter(mode)}
                    className={`rounded-md px-2 py-1 text-[11px] font-medium ${
                      checkFilter === mode
                        ? 'bg-ink text-white'
                        : 'border border-surface-border bg-white text-ink-secondary hover:bg-surface-muted'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <CheckList
              checks={sectionChecks}
              emptyLabel={
                checkQuery.trim()
                  ? 'No checks match this search.'
                  : checkFilter === 'all'
                    ? 'No findings in this category.'
                    : 'No matching issues in this category.'
              }
              onIgnore={onIgnoreCheck}
            />
          </div>
        ) : null}
      </section>
    </div>
  );
}

function CheckSearch({ value, onChange }: { value: string; onChange: (next: string) => void }) {
  return (
    <label className="mb-2 block">
      <span className="sr-only">Search checks</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search checks…"
        className="w-full rounded-md border border-surface-border bg-white px-2.5 py-1.5 text-xs text-ink placeholder:text-ink-muted"
      />
    </label>
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
