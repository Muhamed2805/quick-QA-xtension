import { a11yCheck } from '@/checks/accessibility/helpers';
import type { CheckFn } from '@/checks/runChecks';

export const checkA11yDocumentTitle: CheckFn = (snapshot) => {
  const title = snapshot.title.trim();

  if (!title) {
    return a11yCheck({
      id: 'a11y-document-title',
      title: 'Missing document title',
      description: 'The document has no title. Screen-reader users hear an empty or generic tab name.',
      status: 'fail',
      severity: 'error',
      recommendation: 'Set a descriptive <title> for the page.',
      currentValue: '(missing)',
      weight: 5,
    });
  }

  return a11yCheck({
    id: 'a11y-document-title',
    title: 'Document title',
    description: 'The document has a title.',
    status: 'pass',
    severity: 'info',
    currentValue: title,
    weight: 5,
  });
};
