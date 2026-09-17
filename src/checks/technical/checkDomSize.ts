import { technicalCheck } from '@/checks/technical/helpers';
import type { CheckFn } from '@/checks/runChecks';

export const checkDomSize: CheckFn = (snapshot) => {
  const count = snapshot.technical.domElementCount;
  const large = count >= 1500;

  return technicalCheck({
    id: 'tech-dom-size',
    title: 'DOM element count',
    description: large
      ? `The document has ${count} elements, which can make rendering and scripting heavier.`
      : `The document has ${count} elements.`,
    status: large ? 'warning' : 'info',
    severity: large ? 'warning' : 'info',
    recommendation: large ? 'Look for unnecessary wrappers, repeated cards, or unused markup.' : undefined,
    currentValue: count,
    weight: large ? 2 : 0,
  });
};
