import { CheckCard } from '@/components/CheckCard';
import type { QACheckResult } from '@/types';
import { sortChecks } from '@/utils/checks';

type CheckListProps = {
  checks: QACheckResult[];
  emptyLabel?: string;
};

export function CheckList({ checks, emptyLabel = 'No findings in this category.' }: CheckListProps) {
  const ordered = sortChecks(checks);

  if (ordered.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-surface-border bg-white px-3 py-6 text-center">
        <p className="text-sm font-medium">{emptyLabel}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {ordered.map((check) => (
        <CheckCard key={check.id} check={check} />
      ))}
    </div>
  );
}
