import { Logo } from '@/components/Logo';
import { APP_VERSION } from '@/version';

type HeaderProps = {
  subtitle?: string;
};

export function Header({ subtitle = 'Page audit' }: HeaderProps) {
  return (
    <header className="flex items-center gap-3 border-b border-surface-border bg-surface-raised px-4 py-3">
      <Logo />
      <div className="min-w-0 flex-1">
        <h1 className="text-[15px] font-semibold leading-tight tracking-tight">Quick QA</h1>
        <p className="text-xs text-ink-muted">{subtitle}</p>
      </div>
      <span className="shrink-0 text-[10px] tabular-nums text-ink-muted">{APP_VERSION}</span>
    </header>
  );
}
