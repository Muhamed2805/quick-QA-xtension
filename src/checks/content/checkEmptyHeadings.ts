import { contentCheck } from '@/checks/content/helpers';
import type { CheckFn } from '@/checks/runChecks';

export const checkEmptyHeadings: CheckFn = (snapshot) => {
  const empty = snapshot.headings.filter((item) => !item.text.trim()).length;

  if (snapshot.headings.length === 0) {
    return contentCheck({
      id: 'content-empty-headings',
      title: 'Empty headings',
      description: 'No headings were found.',
      status: 'info',
      severity: 'info',
      currentValue: 0,
      weight: 0,
    });
  }

  if (empty === 0) {
    return contentCheck({
      id: 'content-empty-headings',
      title: 'Empty headings',
      description: 'All headings contain text.',
      status: 'pass',
      severity: 'info',
      currentValue: 0,
      weight: 3,
    });
  }

  return contentCheck({
    id: 'content-empty-headings',
    title: 'Empty headings',
    description: `${empty} heading(s) have no text.`,
    status: 'warning',
    severity: 'warning',
    recommendation: 'Remove empty headings or give them a real section title.',
    currentValue: empty,
    weight: 3,
  });
};
