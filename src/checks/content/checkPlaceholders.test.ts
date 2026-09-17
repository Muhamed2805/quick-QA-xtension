import { findPlaceholderHits } from '@/checks/content/checkPlaceholders';
import { isNamelessLink } from '@/utils/links';
import { describe, expect, it } from 'vitest';

describe('placeholder detection', () => {
  it('finds lorem ipsum and TODO', () => {
    expect(findPlaceholderHits('Hello lorem ipsum TODO later', [])).toEqual(
      expect.arrayContaining(['lorem ipsum', 'TODO']),
    );
  });

  it('only treats test as a heading hit', () => {
    expect(findPlaceholderHits('this is a test page', [])).toEqual([]);
    expect(findPlaceholderHits('body', ['Test homepage'])).toContain('test');
  });
});

describe('nameless links', () => {
  it('accepts icon links with alt as a name', () => {
    expect(
      isNamelessLink({
        href: '/cart',
        text: '',
        accessibleName: 'Cart',
        kind: 'internal',
        targetBlank: false,
        rel: null,
        hasNoopener: false,
        hasNoreferrer: false,
        visible: true,
      }),
    ).toBe(false);
  });
});
