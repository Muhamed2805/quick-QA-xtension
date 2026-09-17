import { contentCheck, LONG_HEADING_CHARS } from '@/checks/content/helpers';
import type { CheckFn } from '@/checks/runChecks';

export const checkLongHeadings: CheckFn = (snapshot) => {
  if (snapshot.headings.length === 0) {
    return contentCheck({
      id: 'content-long-headings',
      title: 'Very long headings',
      description: 'No headings were found.',
      status: 'info',
      severity: 'info',
      currentValue: 0,
      weight: 0,
    });
  }

  const long = snapshot.headings.filter((item) => item.text.length > LONG_HEADING_CHARS);

  if (long.length === 0) {
    return contentCheck({
      id: 'content-long-headings',
      title: 'Very long headings',
      description: `No headings exceed ${LONG_HEADING_CHARS} characters.`,
      status: 'pass',
      severity: 'info',
      currentValue: 0,
      weight: 2,
    });
  }

  return contentCheck({
    id: 'content-long-headings',
    title: 'Very long headings',
    description: `${long.length} heading(s) are longer than ${LONG_HEADING_CHARS} characters.`,
    status: 'warning',
    severity: 'warning',
    recommendation: 'Keep headings short enough to scan; move detail into the following paragraph.',
    currentValue: long.length,
    weight: 2,
  });
};
