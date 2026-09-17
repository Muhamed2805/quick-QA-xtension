import { technicalCheck } from '@/checks/technical/helpers';
import type { CheckFn } from '@/checks/runChecks';

export const checkTimings: CheckFn = (snapshot) => {
  const { domContentLoadedMs, loadEventMs, resourceCount, protocol } = snapshot.technical.performance;

  return technicalCheck({
    id: 'tech-timings',
    title: 'Load timing (browser APIs)',
    description: `DOMContentLoaded ${domContentLoadedMs ?? '—'} ms · load ${loadEventMs ?? '—'} ms · ${resourceCount ?? '—'} resource entries · protocol ${protocol ?? '—'}. These are Navigation Timing values, not Lighthouse.`,
    status: 'info',
    severity: 'info',
    currentValue: domContentLoadedMs ?? '—',
    weight: 0,
  });
};
