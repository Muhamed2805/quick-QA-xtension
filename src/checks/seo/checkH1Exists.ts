import { seoCheck } from '@/checks/seo/helpers';
import type { CheckFn } from '@/checks/runChecks';
import { countH1 } from '@/utils/headings';

export const checkH1Exists: CheckFn = (snapshot) => {
  const count = countH1(snapshot.headings);

  if (count === 0) {
    return seoCheck({
      id: 'seo-h1-exists',
      title: 'H1 exists',
      description:
        'No H1 was found in the document (including open shadow roots and role="heading" aria-level="1"). Many sites use a logo instead of an H1; that is common, but a real H1 still helps outline the page.',
      status: 'warning',
      severity: 'warning',
      recommendation:
        'Add one H1 for the page topic, or mark the main title with role="heading" aria-level="1". Closed shadow DOM cannot be read.',
      currentValue: 0,
      weight: 4,
    });
  }

  return seoCheck({
    id: 'seo-h1-exists',
    title: 'H1 exists',
    description: 'The page includes at least one H1 (tag or ARIA heading level 1).',
    status: 'pass',
    severity: 'info',
    currentValue: count,
    weight: 4,
  });
};
