import { seoCheck } from '@/checks/seo/helpers';
import type { CheckFn } from '@/checks/runChecks';

export const checkOgImage: CheckFn = (snapshot) => {
  const value = snapshot.meta.ogImage?.trim() ?? '';

  if (!value) {
    return seoCheck({
      id: 'seo-og-image',
      title: 'Open Graph image',
      description: 'og:image is missing. Link previews often look incomplete without a share image.',
      status: 'warning',
      severity: 'warning',
      recommendation: 'Add a meta property="og:image" pointing to a representative image URL.',
      currentValue: '(missing)',
      weight: 3,
    });
  }

  return seoCheck({
    id: 'seo-og-image',
    title: 'Open Graph image',
    description: 'An Open Graph image URL is present.',
    status: 'pass',
    severity: 'info',
    currentValue: value,
    weight: 3,
  });
};
