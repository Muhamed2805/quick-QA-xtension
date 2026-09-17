import { contentCheck } from '@/checks/content/helpers';
import type { CheckFn } from '@/checks/runChecks';

export const checkHeadingOutline: CheckFn = (snapshot) => {
  const counts = [1, 2, 3, 4, 5, 6].map(
    (level) => `H${level}:${snapshot.headings.filter((item) => item.level === level).length}`,
  );

  return contentCheck({
    id: 'content-heading-outline',
    title: 'H1–H6 structure',
    description: `Heading counts: ${counts.join(' · ')}.`,
    status: 'info',
    severity: 'info',
    currentValue: snapshot.headings.length,
    weight: 0,
  });
};
