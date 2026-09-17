import { useCallback, useEffect, useState } from 'react';
import { getActiveTab } from '@/extension/tabs';
import type { ActiveTabInfo, TabAccessError } from '@/types';

function isTabAccessError(error: unknown): error is TabAccessError {
  return Boolean(error && typeof error === 'object' && 'code' in error && 'message' in error);
}

export function useActiveTab() {
  const [tab, setTab] = useState<ActiveTabInfo | null>(null);
  const [error, setError] = useState<TabAccessError | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const next = await getActiveTab();
      setTab(next);
      return next;
    } catch (caught) {
      setTab(null);
      const nextError = isTabAccessError(caught)
        ? caught
        : { code: 'cannot-inspect' as const, message: 'Unable to read the active tab.' };
      setError(nextError);
      throw nextError;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh().catch(() => {
      /* restricted pages are represented in error state */
    });
  }, [refresh]);

  return { tab, error, loading, refresh };
}
