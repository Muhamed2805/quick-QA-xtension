import { a11yCheck } from '@/checks/accessibility/helpers';
import type { CheckFn } from '@/checks/runChecks';

const SKIP_LINK_LINK_THRESHOLD = 12;

export const checkA11ySkipLink: CheckFn = (snapshot) => {
  const { hasSkipLink, visibleLinkCount } = snapshot.documentHints;

  if (hasSkipLink) {
    return a11yCheck({
      id: 'a11y-skip-link',
      title: 'Skip link',
      description: 'The page has a skip/jump link, which helps keyboard users bypass repeated navigation.',
      status: 'pass',
      severity: 'info',
      currentValue: 'present',
      weight: 2,
    });
  }

  if (visibleLinkCount < SKIP_LINK_LINK_THRESHOLD) {
    return a11yCheck({
      id: 'a11y-skip-link',
      title: 'Skip link',
      description:
        'No skip link was found. That is usually fine on short pages with little repeated navigation.',
      status: 'info',
      severity: 'info',
      currentValue: `${visibleLinkCount} visible links`,
      weight: 0,
    });
  }

  return a11yCheck({
    id: 'a11y-skip-link',
    title: 'Skip link',
    description:
      'This page has a lot of links and no skip/jump-to-content control. Keyboard users may have to tab through the header on every page.',
    status: 'warning',
    severity: 'warning',
    recommendation: 'Add an early “Skip to content” link that points to the main landmark (for example href="#main").',
    currentValue: `${visibleLinkCount} visible links`,
    weight: 2,
  });
};
