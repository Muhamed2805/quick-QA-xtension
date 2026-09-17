type ScanButtonProps = {
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
};

export function ScanButton({ onClick, loading = false, disabled = false }: ScanButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className="w-full rounded-md bg-ink px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-400"
    >
      {loading ? 'Connecting to page…' : 'Scan Current Page'}
    </button>
  );
}
