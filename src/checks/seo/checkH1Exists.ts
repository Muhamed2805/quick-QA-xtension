import { seoCheck } from '@/checks/seo/helpers';
import type { CheckFn } from '@/checks/runChecks';

export const checkH1Exists: CheckFn = (snapshot) => {
  const count = snapshot.headings.filter((item) => item.level === 1).length;

  if (count === 0) {
    return seoCheck({
      id: 'seo-h1-exists',
      title: 'H1 exists',
      description: 'The page has no H1 heading. An H1 helps people and crawlers understand the main topic.',
      status: 'fail',
      severity: 'error',
      recommendation: 'Add one H1 that describes the primary subject of the page.',
      currentValue: 0,
      weight: 7,
    });
  }

  return seoCheck({
    id: 'seo-h1-exists',
    title: 'H1 exists',
    description: 'The page includes at least one H1 heading.',
    status: 'pass',
    severity: 'info',
    currentValue: count,
    weight: 7,
  });
};
