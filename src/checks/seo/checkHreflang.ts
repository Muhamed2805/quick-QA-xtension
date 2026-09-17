import { seoCheck } from '@/checks/seo/helpers';
import type { CheckFn } from '@/checks/runChecks';

export const checkHreflang: CheckFn = (snapshot) => {
  const count = snapshot.documentHints.hreflangCount;

  if (count > 0) {
    return seoCheck({
      id: 'seo-hreflang',
      title: 'Hreflang',
      description: 'Alternate language/region URLs are declared. This check only counts tags, it does not verify pairs.',
      status: 'info',
      severity: 'info',
      currentValue: count,
      weight: 0,
    });
  }

  return seoCheck({
    id: 'seo-hreflang',
    title: 'Hreflang',
    description: 'No hreflang links. Expected on single-language sites.',
    status: 'info',
    severity: 'info',
    currentValue: 0,
    weight: 0,
  });
};
