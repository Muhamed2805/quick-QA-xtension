import { contentCheck } from '@/checks/content/helpers';
import type { CheckFn } from '@/checks/runChecks';

export const checkWordCount: CheckFn = (snapshot) => {
  return contentCheck({
    id: 'content-word-count',
    title: 'Visible word count',
    description: `Approximately ${snapshot.content.wordCount} visible words (from innerText, truncated for analysis).`,
    status: 'info',
    severity: 'info',
    currentValue: snapshot.content.wordCount,
    weight: 0,
  });
};
