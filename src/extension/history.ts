import type { ScanHistoryEntry, ScanResult } from '@/types';

const STORAGE_KEY = 'quick-qa.history';
const MAX_ENTRIES = 15;

function canUseStorage(): boolean {
  return Boolean(chrome?.storage?.local);
}

export async function loadHistory(): Promise<ScanHistoryEntry[]> {
  if (!canUseStorage()) return [];
  const stored = await chrome.storage.local.get(STORAGE_KEY);
  const value = stored[STORAGE_KEY];
  return Array.isArray(value) ? (value as ScanHistoryEntry[]) : [];
}

export async function saveHistoryEntry(result: ScanResult): Promise<ScanHistoryEntry[]> {
  const entry: ScanHistoryEntry = {
    id: `${result.scannedAt}-${result.page.hostname}`,
    domain: result.page.hostname,
    url: result.page.url,
    timestamp: result.scannedAt,
    overallScore: result.summary.overallScore,
    errorCount: result.summary.errors,
    warningCount: result.summary.warnings,
  };

  const current = await loadHistory();
  const next = [entry, ...current.filter((item) => item.id !== entry.id)].slice(0, MAX_ENTRIES);
  if (canUseStorage()) {
    await chrome.storage.local.set({ [STORAGE_KEY]: next });
  }
  return next;
}

export async function clearHistory(): Promise<void> {
  if (!canUseStorage()) return;
  await chrome.storage.local.remove(STORAGE_KEY);
}
