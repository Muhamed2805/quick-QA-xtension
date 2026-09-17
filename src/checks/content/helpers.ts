import { makeCheck } from '@/checks/createCheck';

export const contentCheck = makeCheck('content');

export const PLACEHOLDER_PATTERNS: { id: string; pattern: RegExp }[] = [
  { id: 'lorem ipsum', pattern: /lorem ipsum/i },
  { id: 'TODO', pattern: /\bTODO\b/ },
  { id: 'dummy', pattern: /\bdummy\b/i },
  { id: 'placeholder', pattern: /\bplaceholder\b/i },
];

export const HEADING_TEST_PATTERN = /\btest\b/i;
export const LONG_HEADING_CHARS = 120;
