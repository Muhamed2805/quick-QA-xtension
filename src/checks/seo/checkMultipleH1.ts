import { seoCheck } from '@/checks/seo/helpers';
import type { CheckFn } from '@/checks/runChecks';

export const checkMultipleH1: CheckFn = (snapshot) => {
  const count = snapshot.headings.filter((item) => item.level === 1).length;

  if (count <= 1) {
    return seoCheck({
      id: 'seo-multiple-h1',
      title: 'Single H1',
      description:
        count === 1
          ? 'The page has one H1, which is the usual pattern.'
          : 'No H1 was found, so multiple-H1 is not applicable.',
      status: count === 1 ? 'pass' : 'info',
      severity: 'info',
      currentValue: count,
      weight: count === 1 ? 4 : 0,
    });
  }

  return seoCheck({
    id: 'seo-multiple-h1',
    title: 'More than one H1',
    description: `The page has ${count} H1 headings. HTML allows this, but a single H1 is easier to interpret as the page topic.`,
    status: 'warning',
    severity: 'warning',
    recommendation: 'Keep one H1 for the page topic and use H2–H6 for sections.',
    currentValue: count,
    weight: 4,
  });
};
