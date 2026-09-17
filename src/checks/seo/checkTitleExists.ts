import { seoCheck } from '@/checks/seo/helpers';
import type { CheckFn } from '@/checks/runChecks';

export const checkTitleExists: CheckFn = (snapshot) => {
  const title = snapshot.title.trim();

  if (!title) {
    return seoCheck({
      id: 'seo-title-exists',
      title: 'Page title exists',
      description: 'This page does not have a document title. Search engines and browser tabs use the title to identify the page.',
      status: 'fail',
      severity: 'error',
      recommendation: 'Add a unique, descriptive <title> that names the page topic.',
      currentValue: '(missing)',
      weight: 8,
    });
  }

  return seoCheck({
    id: 'seo-title-exists',
    title: 'Page title exists',
    description: 'The page includes a document title.',
    status: 'pass',
    severity: 'info',
    currentValue: title,
    weight: 8,
  });
};
