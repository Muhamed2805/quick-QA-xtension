import { a11yCheck } from '@/checks/accessibility/helpers';
import type { CheckFn } from '@/checks/runChecks';

export const checkA11yIframes: CheckFn = (snapshot) => {
  const { iframeCount, iframesMissingTitle } = snapshot.documentHints;

  if (iframeCount === 0) {
    return a11yCheck({
      id: 'a11y-iframes',
      title: 'Iframe titles',
      description: 'No iframes on this page.',
      status: 'pass',
      severity: 'info',
      currentValue: 0,
      weight: 2,
    });
  }

  if (iframesMissingTitle > 0) {
    return a11yCheck({
      id: 'a11y-iframes',
      title: 'Iframe titles',
      description: 'One or more iframes have no title, aria-label, or aria-labelledby.',
      status: 'warning',
      severity: 'warning',
      recommendation: 'Give each iframe a short title that describes its purpose (map, video, checkout, …).',
      currentValue: `${iframesMissingTitle} untitled / ${iframeCount} iframes`,
      weight: 2,
    });
  }

  return a11yCheck({
    id: 'a11y-iframes',
    title: 'Iframe titles',
    description: 'Embedded frames expose an accessible name.',
    status: 'pass',
    severity: 'info',
    currentValue: iframeCount,
    weight: 2,
  });
};
