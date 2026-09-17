type ErrorPanelProps = {
  title: string;
  message: string;
};

export function ErrorPanel({ title, message }: ErrorPanelProps) {
  return (
    <div className="rounded-md border border-fail/20 bg-fail-soft px-3 py-3">
      <p className="text-sm font-medium text-fail">{title}</p>
      <p className="mt-1 text-xs leading-5 text-ink-secondary">{message}</p>
    </div>
  );
}
