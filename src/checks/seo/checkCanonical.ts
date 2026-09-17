import { seoCheck } from '@/checks/seo/helpers';
import type { CheckFn } from '@/checks/runChecks';

export const checkCanonical: CheckFn = (snapshot) => {
  const canonical = snapshot.canonical?.trim() ?? '';

  if (!canonical) {
    return seoCheck({
      id: 'seo-canonical',
      title: 'Canonical URL exists',
      description: 'No canonical URL was found. Duplicate or parameterized URLs may be indexed as separate pages.',
      status: 'warning',
      severity: 'warning',
      recommendation: 'Add <link rel="canonical"> pointing to the preferred URL for this content.',
      currentValue: '(missing)',
      weight: 3,
    });
  }

  return seoCheck({
    id: 'seo-canonical',
    title: 'Canonical URL exists',
    description: 'A canonical URL is present.',
    status: 'pass',
    severity: 'info',
    currentValue: canonical,
    weight: 3,
  });
};
