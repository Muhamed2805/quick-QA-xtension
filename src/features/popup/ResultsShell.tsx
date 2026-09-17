import { CategoryNav } from '@/components/CategoryNav';
import { CheckList } from '@/components/CheckList';
import { FactList } from '@/components/FactList';
import { StatCard } from '@/components/StatCard';
import { CATEGORY_NAV } from '@/features/popup/constants';
import type { QACategory, ScanResult } from '@/types';
import { topIssues } from '@/utils/checks';
import { useState } from 'react';

type ResultsShellProps = {
  result: ScanResult;
  onRescan: () => void;
};

function countLinks(result: ScanResult, kind: ScanResult['links'][number]['kind']) {
  return result.links.filter((link) => link.kind === kind).length;
}

export function ResultsShell({ result, onRescan }: ResultsShellProps) {
  const [section, setSection] = useState<QACategory | 'overview'>('overview');
  const sectionLabel = CATEGORY_NAV.find((item) => item.id === section)?.label ?? 'Overview';
  const { snapshot, page, checks } = result;
  const headingCounts = [1, 2, 3, 4, 5, 6]
    .map((level) => `H${level}:${snapshot.headings.filter((item) => item.level === level).length}`)
    .join('  ');
  const seoChecks = checks.filter((item) => item.category === 'seo');
  const issues = topIssues(checks);

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
          <StatCard label="Score" value="—" />
          <StatCard label="Errors" value={String(result.summary.errors)} tone="fail" />
          <StatCard label="Warnings" value={String(result.summary.warnings)} tone="warn" />
          <StatCard label="Passed" value={String(result.summary.passed)} tone="pass" />
        </div>
      </div>

      <CategoryNav active={section} onChange={setSection} />

      <section className="flex-1 overflow-y-auto px-4 py-4">
        <h2 className="text-sm font-semibold">{sectionLabel}</h2>

        {section === 'overview' ? (
          <div className="mt-3 flex flex-col gap-4">
            <p className="text-xs leading-5 text-ink-muted">
              SEO rules are active. Other categories still show collected page facts until their
              checks land.
            </p>
            <FactList
              items={[
                { label: 'Title', value: snapshot.title || '(missing)' },
                { label: 'URL', value: snapshot.url },
                { label: 'SEO checks', value: String(seoChecks.length) },
                { label: 'Links', value: String(snapshot.links.length) },
                { label: 'Images', value: String(snapshot.images.length) },
                { label: 'Forms', value: String(snapshot.forms.length) },
              ]}
            />
            <div>
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-muted">
                Top issues
              </h3>
              <CheckList checks={issues} emptyLabel="No SEO errors or warnings on this page." />
            </div>
          </div>
        ) : null}

        {section === 'seo' ? (
          <div className="mt-3">
            <p className="mb-3 text-xs leading-5 text-ink-muted">
              Title and meta length ranges are recommendations for typical search snippets, not
              ranking requirements.
            </p>
            <CheckList checks={seoChecks} />
          </div>
        ) : null}

        {section === 'accessibility' ? (
          <div className="mt-3">
            <FactList
              items={[
                { label: 'Language', value: snapshot.lang || '(missing)' },
                {
                  label: 'No-name buttons',
                  value: String(snapshot.buttons.filter((item) => !item.hasAccessibleName).length),
                },
                {
                  label: 'Unlabeled inputs',
                  value: String(
                    snapshot.inputs.filter((item) => !item.hasLabel && !item.hasAriaName).length,
                  ),
                },
                { label: 'tabindex > 0', value: String(snapshot.tabIndexes.length) },
                { label: 'ARIA hints', value: String(snapshot.ariaHints.length) },
                {
                  label: 'Missing alt',
                  value: String(snapshot.images.filter((item) => item.status === 'missing-alt').length),
                },
              ]}
            />
          </div>
        ) : null}

        {section === 'links' ? (
          <div className="mt-3">
            <FactList
              items={[
                { label: 'Total', value: String(snapshot.links.length) },
                { label: 'Internal', value: String(countLinks(result, 'internal')) },
                { label: 'External', value: String(countLinks(result, 'external')) },
                { label: 'Anchor', value: String(countLinks(result, 'anchor')) },
                { label: 'Empty href', value: String(countLinks(result, 'empty')) },
                { label: 'javascript:', value: String(countLinks(result, 'javascript')) },
                {
                  label: 'New tab',
                  value: String(snapshot.links.filter((item) => item.targetBlank).length),
                },
              ]}
            />
          </div>
        ) : null}

        {section === 'images' ? (
          <div className="mt-3">
            <FactList
              items={[
                { label: 'Total', value: String(snapshot.images.length) },
                {
                  label: 'Missing alt',
                  value: String(snapshot.images.filter((item) => item.status === 'missing-alt').length),
                },
                {
                  label: 'Empty alt',
                  value: String(snapshot.images.filter((item) => item.status === 'empty-alt').length),
                },
                { label: 'Broken', value: String(snapshot.images.filter((item) => item.broken).length) },
                {
                  label: 'Lazy',
                  value: String(snapshot.images.filter((item) => item.loading === 'lazy').length),
                },
              ]}
            />
          </div>
        ) : null}

        {section === 'forms' ? (
          <div className="mt-3">
            <FactList
              items={[
                { label: 'Forms', value: String(snapshot.forms.length) },
                {
                  label: 'Fields',
                  value: String(snapshot.forms.reduce((sum, form) => sum + form.fieldCount, 0)),
                },
                {
                  label: 'No submit',
                  value: String(snapshot.forms.filter((form) => !form.hasSubmitControl).length),
                },
                {
                  label: 'Password',
                  value: String(snapshot.forms.reduce((sum, form) => sum + form.passwordFieldCount, 0)),
                },
              ]}
            />
          </div>
        ) : null}

        {section === 'content' ? (
          <div className="mt-3">
            <FactList
              items={[
                { label: 'Words', value: String(snapshot.content.wordCount) },
                { label: 'Paragraphs', value: String(snapshot.content.paragraphCount) },
                { label: 'Headings', value: headingCounts },
                {
                  label: 'Empty H',
                  value: String(snapshot.headings.filter((item) => !item.text).length),
                },
              ]}
            />
          </div>
        ) : null}

        {section === 'technical' ? (
          <div className="mt-3">
            <FactList
              items={[
                { label: 'Protocol', value: snapshot.protocol.toUpperCase() },
                { label: 'Charset', value: snapshot.charset || '(unknown)' },
                { label: 'Viewport', value: snapshot.technical.viewport || '(missing)' },
                { label: 'Scripts', value: String(snapshot.technical.scriptCount) },
                { label: 'Styles', value: String(snapshot.technical.stylesheetCount) },
                {
                  label: 'DCL ms',
                  value:
                    snapshot.technical.performance.domContentLoadedMs != null
                      ? String(snapshot.technical.performance.domContentLoadedMs)
                      : '—',
                },
                {
                  label: 'Resources',
                  value:
                    snapshot.technical.performance.resourceCount != null
                      ? String(snapshot.technical.performance.resourceCount)
                      : '—',
                },
              ]}
            />
          </div>
        ) : null}
      </section>
    </div>
  );
}
