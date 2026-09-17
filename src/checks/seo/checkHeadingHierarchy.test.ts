import { findHeadingSkips } from '@/checks/seo/checkHeadingHierarchy';
import { describe, expect, it } from 'vitest';

describe('heading hierarchy', () => {
  it('detects skipped levels', () => {
    const skips = findHeadingSkips([
      { level: 2, text: 'A' },
      { level: 4, text: 'B' },
    ]);
    expect(skips).toEqual(['H2 → H4']);
  });

  it('allows sequential levels', () => {
    expect(
      findHeadingSkips([
        { level: 1, text: 'A' },
        { level: 2, text: 'B' },
        { level: 3, text: 'C' },
      ]),
    ).toEqual([]);
  });
});
