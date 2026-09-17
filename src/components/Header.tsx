import { Logo } from '@/components/Logo';

type HeaderProps = {
  subtitle?: string;
};

export function Header({ subtitle = 'Page audit' }: HeaderProps) {
  return (
    <header className="flex items-center gap-3 border-b border-surface-border bg-surface-raised px-4 py-3">
      <Logo />
      <div className="min-w-0">
        <h1 className="text-[15px] font-semibold leading-tight tracking-tight">Quick QA</h1>
        <p className="text-xs text-ink-muted">{subtitle}</p>
      </div>
    </header>
  );
}
