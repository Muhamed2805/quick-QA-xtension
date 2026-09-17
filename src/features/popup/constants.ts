import type { QACategory } from '@/types';

export const CATEGORY_NAV: { id: QACategory | 'overview'; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'seo', label: 'SEO' },
  { id: 'accessibility', label: 'Accessibility' },
  { id: 'links', label: 'Links' },
  { id: 'images', label: 'Images' },
  { id: 'forms', label: 'Forms' },
  { id: 'content', label: 'Content' },
  { id: 'technical', label: 'Technical' },
];
