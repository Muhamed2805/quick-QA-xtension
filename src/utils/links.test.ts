import { isNamelessLink, visibleCrawlableLinks } from '@/utils/links';
import { describe, expect, it } from 'vitest';
import type { LinkInfo } from '@/types';

function link(partial: Partial<LinkInfo> & Pick<LinkInfo, 'href' | 'accessibleName'>): LinkInfo {
  return {
    text: '',
    kind: 'internal',
    targetBlank: false,
    rel: null,
    hasNoopener: false,
    hasNoreferrer: false,
    visible: true,
    ...partial,
  };
}

describe('visible nameless links', () => {
  it('ignores hidden icon links', () => {
    const links = [
      link({ href: '/cart', accessibleName: '', visible: false }),
      link({ href: '/about', accessibleName: '', visible: true }),
    ];
    const visible = visibleCrawlableLinks(links);
    expect(visible).toHaveLength(1);
    expect(visible.filter(isNamelessLink)).toHaveLength(1);
  });
});
