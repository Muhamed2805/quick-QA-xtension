import { seoCheck } from '@/checks/seo/helpers';
import type { CheckFn } from '@/checks/runChecks';

export const checkOgDescription: CheckFn = (snapshot) => {
  const value = snapshot.meta.ogDescription?.trim() ?? '';

  if (!value) {
    return seoCheck({
      id: 'seo-og-description',
      title: 'Open Graph description',
      description: 'og:description is missing. Shared links may show a generic or truncated preview.',
      status: 'warning',
      severity: 'warning',
      recommendation: 'Add a meta property="og:description" with a short summary of the page.',
      currentValue: '(missing)',
      weight: 2,
    });
  }

  return seoCheck({
    id: 'seo-og-description',
    title: 'Open Graph description',
    description: 'An Open Graph description is present.',
    status: 'pass',
    severity: 'info',
    currentValue: value,
    weight: 2,
  });
};
