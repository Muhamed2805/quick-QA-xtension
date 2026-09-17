import { loadLastReport } from '@/extension/history';
import { toTextSummary } from '@/export/toSummary';
import { APP_VERSION } from '@/version';
import { useEffect, useState } from 'react';
import type { ScanResult } from '@/types';

export function ReportApp() {
  const [result, setResult] = useState<ScanResult | null>(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    void loadLastReport()
      .then((value) => {
        setResult(value);
        setMissing(!value);
      })
      .catch(() => setMissing(true));
  }, []);

  if (missing) {
    return <p className="p-6 text-sm">No saved scan. Run Quick QA on a page first.</p>;
  }

  if (!result) {
    return <p className="p-6 text-sm text-ink-muted">Loading report…</p>;
  }

  return (
    <main className="mx-auto max-w-3xl bg-white p-8 text-ink">
      <div className="mb-6 flex items-start justify-between gap-4 print:hidden">
        <div>
          <h1 className="text-xl font-semibold">Quick QA report</h1>
          <p className="text-xs text-ink-muted">
            {APP_VERSION} · local only · use Print to save a PDF
          </p>
        </div>
        <button
          type="button"
          onClick={() => window.print()}
          className="rounded-md bg-ink px-3 py-2 text-sm font-medium text-white"
        >
          Print / Save PDF
        </button>
      </div>
      <h2 className="text-lg font-semibold">{result.page.hostname}</h2>
      <p className="text-sm text-ink-secondary">{result.page.url}</p>
      <p className="mt-2 text-sm">
        Score {result.summary.overallScore}/100 · {result.summary.errors} errors · {result.summary.warnings}{' '}
        warnings · {result.summary.passed} passed
      </p>
      <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
        {result.categories.map((item) => (
          <li key={item.category} className="border border-surface-border px-3 py-2">
            {item.label}: {item.score}
          </li>
        ))}
      </ul>
      <pre className="mt-6 whitespace-pre-wrap text-xs leading-5 text-ink-secondary">{toTextSummary(result)}</pre>
    </main>
  );
}
