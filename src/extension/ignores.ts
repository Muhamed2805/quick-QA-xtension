const STORAGE_KEY = 'quick-qa.ignored-checks';

function canUseStorage(): boolean {
  return Boolean(chrome?.storage?.local);
}

export async function loadIgnoredChecks(): Promise<string[]> {
  if (!canUseStorage()) return [];
  const stored = await chrome.storage.local.get(STORAGE_KEY);
  const value = stored[STORAGE_KEY];
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];
}

export async function saveIgnoredChecks(ids: string[]): Promise<string[]> {
  const unique = [...new Set(ids)];
  if (canUseStorage()) {
    await chrome.storage.local.set({ [STORAGE_KEY]: unique });
  }
  return unique;
}

export async function ignoreCheck(id: string): Promise<string[]> {
  const current = await loadIgnoredChecks();
  return saveIgnoredChecks([...current, id]);
}

export async function restoreIgnoredChecks(): Promise<void> {
  if (!canUseStorage()) return;
  await chrome.storage.local.remove(STORAGE_KEY);
}
