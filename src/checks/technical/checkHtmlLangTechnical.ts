import { technicalCheck } from '@/checks/technical/helpers';
import type { CheckFn } from '@/checks/runChecks';

export const checkHtmlLangTechnical: CheckFn = (snapshot) => {
  const lang = snapshot.lang?.trim() ?? '';

  return technicalCheck({
    id: 'tech-html-lang',
    title: 'HTML lang',
    description: lang ? `html lang is "${lang}".` : 'html lang is missing.',
    status: lang ? 'pass' : 'warning',
    severity: lang ? 'info' : 'warning',
    recommendation: lang ? undefined : 'Set lang on the html element.',
    currentValue: lang || '(missing)',
    weight: lang ? 2 : 2,
  });
};
