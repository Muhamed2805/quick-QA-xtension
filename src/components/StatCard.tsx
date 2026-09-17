type StatCardProps = {
  label: string;
  value: string;
  tone?: 'default' | 'pass' | 'warn' | 'fail';
};

const TONE_CLASS = {
  default: 'text-ink',
  pass: 'text-pass',
  warn: 'text-warn',
  fail: 'text-fail',
};

export function StatCard({ label, value, tone = 'default' }: StatCardProps) {
  return (
    <div className="rounded-md border border-surface-border bg-surface-raised px-3 py-2.5 shadow-card">
      <p className="text-[11px] font-medium uppercase tracking-wide text-ink-muted">{label}</p>
      <p className={`mt-1 text-lg font-semibold tabular-nums ${TONE_CLASS[tone]}`}>{value}</p>
    </div>
  );
}
