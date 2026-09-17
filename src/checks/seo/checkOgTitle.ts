import { seoCheck } from '@/checks/seo/helpers';
import type { CheckFn } from '@/checks/runChecks';

export const checkOgTitle: CheckFn = (snapshot) => {
  const value = snapshot.meta.ogTitle?.trim() ?? '';

  if (!value) {
    return seoCheck({
      id: 'seo-og-title',
      title: 'Open Graph title',
      description: 'og:title is missing. Social and chat previews may fall back to the document title or show a weak snippet.',
      status: 'warning',
      severity: 'warning',
      recommendation: 'Add a meta property="og:title" that matches how you want the page named when shared.',
      currentValue: '(missing)',
      weight: 3,
    });
  }

  return seoCheck({
    id: 'seo-og-title',
    title: 'Open Graph title',
    description: 'An Open Graph title is present.',
    status: 'pass',
    severity: 'info',
    currentValue: value,
    weight: 3,
  });
};
