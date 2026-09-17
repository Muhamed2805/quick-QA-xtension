import { a11yCheck } from '@/checks/accessibility/helpers';
import type { CheckFn } from '@/checks/runChecks';

export const checkA11yLang: CheckFn = (snapshot) => {
  const lang = snapshot.lang?.trim() ?? '';

  if (!lang) {
    return a11yCheck({
      id: 'a11y-html-lang',
      title: 'Page language',
      description: 'The root element has no lang attribute. Assistive technology may use the wrong pronunciation.',
      status: 'fail',
      severity: 'error',
      recommendation: 'Set <html lang="…"> to the primary language, for example lang="en" or lang="bs".',
      currentValue: '(missing)',
      weight: 5,
    });
  }

  return a11yCheck({
    id: 'a11y-html-lang',
    title: 'Page language',
    description: 'The document declares a language.',
    status: 'pass',
    severity: 'info',
    currentValue: lang,
    weight: 5,
  });
};
