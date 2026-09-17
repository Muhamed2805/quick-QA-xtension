import type { ImageInfo } from '@/types';

type ImageTableProps = {
  images: ImageInfo[];
};

const MAX_ROWS = 40;

export function ImageTable({ images }: ImageTableProps) {
  const rows = images.slice(0, MAX_ROWS);

  if (images.length === 0) {
    return <p className="text-xs text-ink-muted">No images on this page.</p>;
  }

  return (
    <div className="mb-3 overflow-x-auto rounded-md border border-surface-border bg-white">
      <table className="w-full min-w-[360px] border-collapse text-left text-[11px]">
        <thead className="bg-surface-muted text-ink-muted">
          <tr>
            <th className="px-2 py-1.5 font-medium">Source</th>
            <th className="px-2 py-1.5 font-medium">Alt</th>
            <th className="px-2 py-1.5 font-medium">W</th>
            <th className="px-2 py-1.5 font-medium">H</th>
            <th className="px-2 py-1.5 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((image, index) => (
            <tr key={`${image.src}-${index}`} className="border-t border-surface-border">
              <td className="max-w-[140px] truncate px-2 py-1.5" title={image.src}>
                {image.src || '(empty src)'}
              </td>
              <td className="max-w-[100px] truncate px-2 py-1.5" title={image.alt ?? '(missing)'}>
                {image.alt === null ? '(missing)' : image.alt === '' ? '(empty)' : image.alt}
              </td>
              <td className="px-2 py-1.5 tabular-nums">{image.width ?? '—'}</td>
              <td className="px-2 py-1.5 tabular-nums">{image.height ?? '—'}</td>
              <td className="px-2 py-1.5">{image.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {images.length > MAX_ROWS ? (
        <p className="border-t border-surface-border px-2 py-1.5 text-[11px] text-ink-muted">
          Showing {MAX_ROWS} of {images.length} images.
        </p>
      ) : null}
    </div>
  );
}
