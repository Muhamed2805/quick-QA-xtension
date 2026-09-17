import { seoCheck } from '@/checks/seo/helpers';
import type { CheckFn } from '@/checks/runChecks';

export const checkMetaDescriptionExists: CheckFn = (snapshot) => {
  const description = snapshot.meta.description?.trim() ?? '';

  if (!description) {
    return seoCheck({
      id: 'seo-meta-description-exists',
      title: 'Meta description exists',
      description: 'This page does not contain a meta description.',
      status: 'fail',
      severity: 'error',
      recommendation: 'Add a concise meta description summarizing the page content.',
      currentValue: '(missing)',
      weight: 8,
    });
  }

  return seoCheck({
    id: 'seo-meta-description-exists',
    title: 'Meta description exists',
    description: 'A meta description is present.',
    status: 'pass',
    severity: 'info',
    currentValue: description,
    weight: 8,
  });
};
