import type { QACheckResult, QAStatus } from '@/types';
import { formatCurrentValue } from '@/utils/checks';

const STATUS_STYLES: Record<QAStatus, string> = {
  fail: 'bg-fail-soft text-fail',
  warning: 'bg-warn-soft text-warn',
  pass: 'bg-pass-soft text-pass',
  info: 'bg-info-soft text-info',
};

const STATUS_LABEL: Record<QAStatus, string> = {
  fail: 'Error',
  warning: 'Warning',
  pass: 'Passed',
  info: 'Info',
};

type CheckCardProps = {
  check: QACheckResult;
};

export function CheckCard({ check }: CheckCardProps) {
  const current = formatCurrentValue(check.currentValue);

  return (
    <article className="rounded-md border border-surface-border bg-white px-3 py-3 shadow-card">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold leading-5">{check.title}</h3>
        <span
          className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${STATUS_STYLES[check.status]}`}
        >
          {STATUS_LABEL[check.status]}
        </span>
      </div>
      <p className="mt-2 text-xs leading-5 text-ink-secondary">{check.description}</p>
      {current ? (
        <p className="mt-2 truncate text-[11px] text-ink-muted" title={current}>
          Current: {current}
        </p>
      ) : null}
      {check.recommendation && check.status !== 'pass' ? (
        <p className="mt-2 text-xs leading-5 text-ink">
          <span className="font-medium">Recommendation: </span>
          {check.recommendation}
        </p>
      ) : null}
    </article>
  );
}
