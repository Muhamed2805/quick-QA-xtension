import { seoCheck } from '@/checks/seo/helpers';
import type { CheckFn } from '@/checks/runChecks';

export const checkPageUrl: CheckFn = (snapshot) => {
  return seoCheck({
    id: 'seo-page-url',
    title: 'Current page URL',
    description: 'The scanned address of this tab.',
    status: 'info',
    severity: 'info',
    currentValue: snapshot.url,
    weight: 0,
  });
};
