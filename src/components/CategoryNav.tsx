import { CATEGORY_NAV } from '@/features/popup/constants';
import type { QACategory } from '@/types';

type CategoryNavProps = {
  active: QACategory | 'overview';
  onChange: (id: QACategory | 'overview') => void;
};

export function CategoryNav({ active, onChange }: CategoryNavProps) {
  return (
    <nav
      className="flex gap-1 overflow-x-auto border-b border-surface-border bg-surface-raised px-3 py-2"
      aria-label="Report sections"
    >
      {CATEGORY_NAV.map((item) => {
        const isActive = item.id === active;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item.id)}
            className={`whitespace-nowrap rounded px-2.5 py-1 text-xs font-medium transition-colors ${
              isActive
                ? 'bg-ink text-white'
                : 'text-ink-secondary hover:bg-surface-muted hover:text-ink'
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </nav>
  );
}
