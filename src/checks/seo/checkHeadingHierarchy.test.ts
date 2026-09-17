import { checkA11yHeadings } from '@/checks/accessibility/checkA11yHeadings';
import { findHeadingSkips } from '@/checks/seo/checkHeadingHierarchy';
import { asCheck } from '@/test/asCheck';
import { makeSnapshot } from '@/test/makeSnapshot';
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

  it('does not double-count heading skips in accessibility', () => {
    const result = asCheck(
      checkA11yHeadings(
        makeSnapshot({
          headings: [
            { level: 2, text: 'A' },
            { level: 4, text: 'B' },
          ],
        }),
      ),
    );
    expect(result.status).toBe('info');
    expect(result.weight).toBe(0);
  });
});


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
