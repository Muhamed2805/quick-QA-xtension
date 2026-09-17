import { ComparePanel } from '@/components/ComparePanel';
import { DomainCard } from '@/components/DomainCard';
import { ErrorPanel } from '@/components/ErrorPanel';
import { Header } from '@/components/Header';
import { HistoryList } from '@/components/HistoryList';
import { ScanButton } from '@/components/ScanButton';
import { captureSnapshot } from '@/extension/captureSnapshot';
import { clearHistory, loadHistory, saveHistoryEntry } from '@/extension/history';
import { ignoreCheck, loadIgnoredChecks, restoreIgnoredChecks } from '@/extension/ignores';
import { runScan } from '@/engine/runScan';
import { ResultsShell } from '@/features/popup/ResultsShell';
import { useActiveTab } from '@/hooks/useActiveTab';
import { applyIgnoredChecks } from '@/scoring/applyIgnoredChecks';
import type { ScanHistoryEntry, ScanResult } from '@/types';
import { useEffect, useMemo, useState } from 'react';

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
  const [history, setHistory] = useState<ScanHistoryEntry[]>([]);
  const [ignoredIds, setIgnoredIds] = useState<string[]>([]);

  useEffect(() => {
    void loadHistory()
      .then(setHistory)
      .catch(() => setHistory([]));
    void loadIgnoredChecks()
      .then(setIgnoredIds)
      .catch(() => setIgnoredIds([]));
  }, []);

  const presented = useMemo(
    () => (result ? applyIgnoredChecks(result, ignoredIds) : null),
    [result, ignoredIds],
  );

  const handleScan = async () => {
    setScanBusy(true);
    setScanError(null);

    try {
      const active = await refresh();
      const snapshot = await captureSnapshot(active.tabId);
      const next = runScan(snapshot);
      setResult(next);
      setView('results');
      try {
        const entries = await saveHistoryEntry(applyIgnoredChecks(next, ignoredIds));
        setHistory(entries);
      } catch {
        /* history is optional */
      }
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

  const handleClearHistory = () => {
    void clearHistory()
      .then(() => setHistory([]))
      .catch(() => setHistory([]));
  };

  const handleIgnore = (id: string) => {
    void ignoreCheck(id)
      .then(setIgnoredIds)
      .catch(() => setIgnoredIds((current) => [...new Set([...current, id])]));
  };

  const handleRestoreIgnored = () => {
    void restoreIgnoredChecks()
      .then(() => setIgnoredIds([]))
      .catch(() => setIgnoredIds([]));
  };

  if (view === 'results' && presented) {
    return (
      <>
        <Header subtitle="Report" />
        <ResultsShell
          result={presented}
          tabId={tab?.tabId ?? null}
          onRescan={handleNewScan}
          onIgnoreCheck={handleIgnore}
        />
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

        <button
          type="button"
          onClick={() => {
            void chrome.windows.getCurrent().then((windowInfo) => {
              if (windowInfo.id != null) {
                void chrome.sidePanel.open({ windowId: windowInfo.id });
              }
            });
          }}
          className="rounded-md border border-surface-border bg-white px-3 py-2 text-xs font-medium hover:bg-surface-muted"
        >
          Open side panel
        </button>

        {ignoredIds.length > 0 ? (
          <div className="rounded-md border border-surface-border bg-white px-3 py-2">
            <p className="text-xs text-ink-secondary">{ignoredIds.length} hidden check(s) stay local.</p>
            <button
              type="button"
              onClick={handleRestoreIgnored}
              className="mt-1 text-[11px] font-medium text-ink-secondary hover:text-ink"
            >
              Restore hidden checks
            </button>
          </div>
        ) : null}

        <ComparePanel entries={history} />

        <HistoryList entries={history} onClear={handleClearHistory} />
      </main>
    </div>
  );
}
