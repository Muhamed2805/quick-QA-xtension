import { DomainCard } from '@/components/DomainCard';
import { ErrorPanel } from '@/components/ErrorPanel';
import { Header } from '@/components/Header';
import { ScanButton } from '@/components/ScanButton';
import { captureSnapshot } from '@/extension/captureSnapshot';
import { ResultsShell } from '@/features/popup/ResultsShell';
import { runScan } from '@/engine/runScan';
import { useActiveTab } from '@/hooks/useActiveTab';
import type { ScanResult } from '@/types';
import { useState } from 'react';

type View = 'home' | 'results';

function errorMessage(error: unknown): string {
  if (error && typeof error === 'object' && 'message' in error) {
    return String(error.message);
  }
  return 'This page cannot be scanned.';
}

export function App() {
  const { tab, error, loading, refresh } = useActiveTab();
  const [view, setView] = useState<View>('home');
  const [scanBusy, setScanBusy] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);
  const [result, setResult] = useState<ScanResult | null>(null);

  const handleScan = async () => {
    setScanBusy(true);
    setScanError(null);

    try {
      const active = await refresh();
      const snapshot = await captureSnapshot(active.tabId);
      setResult(runScan(snapshot));
      setView('results');
    } catch (caught) {
      setResult(null);
      setScanError(errorMessage(caught));
    } finally {
      setScanBusy(false);
    }
  };

  const handleNewScan = () => {
    setView('home');
    setResult(null);
    setScanError(null);
    void refresh().catch(() => {
      /* home view already shows tab access errors */
    });
  };

  if (view === 'results' && result) {
    return (
      <>
        <Header subtitle="Report" />
        <ResultsShell result={result} onRescan={handleNewScan} />
      </>
    );
  }

  return (
    <div className="flex min-h-[540px] flex-col">
      <Header />
      <main className="flex flex-1 flex-col gap-4 px-4 py-4">
        <DomainCard tab={tab} loading={loading} />

        {error ? <ErrorPanel title="Cannot scan this page" message={error.message} /> : null}
        {scanError && !error ? <ErrorPanel title="Scan did not start" message={scanError} /> : null}

        <ScanButton onClick={() => void handleScan()} loading={scanBusy} disabled={loading} />

        <p className="text-xs leading-5 text-ink-muted">
          Quick QA inspects the current tab locally. Page content is never uploaded.
        </p>

        <section className="mt-auto rounded-md border border-surface-border bg-surface-raised px-3 py-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-ink-muted">History</h2>
            <span className="text-[11px] text-ink-muted">Local only</span>
          </div>
          <p className="mt-2 text-xs text-ink-secondary">No scans yet.</p>
        </section>
      </main>
    </div>
  );
}
