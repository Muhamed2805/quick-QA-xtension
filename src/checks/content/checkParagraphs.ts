import { contentCheck } from '@/checks/content/helpers';
import type { CheckFn } from '@/checks/runChecks';

export const checkParagraphs: CheckFn = (snapshot) => {
  return contentCheck({
    id: 'content-paragraphs',
    title: 'Paragraphs',
    description: `The page has ${snapshot.content.paragraphCount} <p> element(s).`,
    status: 'info',
    severity: 'info',
    currentValue: snapshot.content.paragraphCount,
    weight: 0,
  });
};
