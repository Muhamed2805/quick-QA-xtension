import { headingLevelFrom, countH1 } from '@/utils/headings';
import { checkH1Exists } from '@/checks/seo/checkH1Exists';
import { asCheck } from '@/test/asCheck';
import { makeSnapshot } from '@/test/makeSnapshot';
import { describe, expect, it } from 'vitest';

describe('headingLevelFrom', () => {
  it('reads native heading tags', () => {
    expect(headingLevelFrom('H1', null, null)).toBe(1);
    expect(headingLevelFrom('h3', null, null)).toBe(3);
  });

  it('reads role=heading with aria-level', () => {
    expect(headingLevelFrom('DIV', 'heading', '1')).toBe(1);
    expect(headingLevelFrom('SPAN', 'heading', '2')).toBe(2);
  });

  it('ignores role=heading without a valid level', () => {
    expect(headingLevelFrom('DIV', 'heading', null)).toBeNull();
    expect(headingLevelFrom('DIV', 'button', '1')).toBeNull();
  });
});

describe('checkH1Exists', () => {
  it('passes when an H1 is present', () => {
    const result = asCheck(checkH1Exists(makeSnapshot()));
    expect(result.status).toBe('pass');
    expect(result.currentValue).toBe(1);
  });

  it('warns when there is no H1, and does not treat it as a hard error', () => {
    const result = asCheck(checkH1Exists(makeSnapshot({ headings: [{ level: 2, text: 'Section' }] })));
    expect(result.status).toBe('warning');
    expect(result.severity).toBe('warning');
    expect(result.currentValue).toBe(0);
  });

  it('counts role-based H1 entries in the snapshot', () => {
    const result = asCheck(
      checkH1Exists(
        makeSnapshot({
          headings: [{ level: 1, text: 'Shop' }],
        }),
      ),
    );
    expect(countH1([{ level: 1 }])).toBe(1);
    expect(result.status).toBe('pass');
  });
});
