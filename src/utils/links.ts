import type { LinkInfo } from '@/types';

export function linkAccessibleName(link: LinkInfo): string {
  return (link.accessibleName || link.text).trim();
}

export function isNamelessLink(link: LinkInfo): boolean {
  return !linkAccessibleName(link);
}

export function isVisibleLink(link: LinkInfo): boolean {
  return link.visible !== false;
}

export function crawlableLinks(links: LinkInfo[]): LinkInfo[] {
  return links.filter((link) => link.kind !== 'empty' && link.kind !== 'javascript');
}

export function visibleCrawlableLinks(links: LinkInfo[]): LinkInfo[] {
  return crawlableLinks(links).filter(isVisibleLink);
}
