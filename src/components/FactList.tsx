type Fact = {
  label: string;
  value: string;
};

type FactListProps = {
  items: Fact[];
};

export function FactList({ items }: FactListProps) {
  return (
    <dl className="divide-y divide-surface-border rounded-md border border-surface-border bg-white">
      {items.map((item) => (
        <div key={item.label} className="grid grid-cols-[118px_1fr] gap-2 px-3 py-2">
          <dt className="text-[11px] font-medium uppercase tracking-wide text-ink-muted">{item.label}</dt>
          <dd className="truncate text-xs text-ink" title={item.value}>
            {item.value || '—'}
          </dd>
        </div>
      ))}
    </dl>
  );
}
