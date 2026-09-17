export type LinkKind =
  | 'internal'
  | 'external'
  | 'anchor'
  | 'mailto'
  | 'tel'
  | 'javascript'
  | 'empty'
  | 'other';

export interface PageInfo {
  url: string;
  protocol: string;
  hostname: string;
  title?: string;
  lang?: string | null;
  charset?: string | null;
}

export interface LinkInfo {
  href: string;
  text: string;
  accessibleName: string;
  kind: LinkKind;
  targetBlank: boolean;
  rel: string | null;
  hasNoopener: boolean;
  hasNoreferrer: boolean;
  visible: boolean;
}

export interface ImageInfo {
  src: string;
  alt: string | null;
  width: number | null;
  height: number | null;
  naturalWidth?: number | null;
  naturalHeight?: number | null;
  loading?: string | null;
  hasWidthAttr: boolean;
  hasHeightAttr: boolean;
  broken: boolean;
  status: 'ok' | 'missing-alt' | 'empty-alt' | 'broken' | 'oversized' | 'unknown';
}

export interface FormFieldInfo {
  tag: string;
  type: string | null;
  hasName: boolean;
  hasId: boolean;
  hasLabel: boolean;
  hasPlaceholder: boolean;
  required: boolean;
}

export interface FormInfo {
  action: string | null;
  method: string;
  fieldCount: number;
  hasSubmitControl: boolean;
  passwordFieldCount: number;
  buttonsWithoutType: number;
  fields: FormFieldInfo[];
}

export interface HeadingInfo {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  text: string;
}

export interface ButtonSnapshot {
  tag: string;
  type: string | null;
  hasAccessibleName: boolean;
  visible: boolean;
}

export interface InputSnapshot {
  tag: string;
  type: string | null;
  hasName: boolean;
  hasId: boolean;
  hasLabel: boolean;
  hasAriaName: boolean;
  hasPlaceholder: boolean;
  required: boolean;
}

export interface TabIndexSnapshot {
  tag: string;
  tabIndex: number;
}

export interface AriaHintSnapshot {
  issue: string;
  tag: string;
}

export interface PerformanceSnapshot {
  protocol: string | null;
  domContentLoadedMs: number | null;
  loadEventMs: number | null;
  resourceCount: number | null;
}

export interface ContentSnapshot {
  wordCount: number;
  paragraphCount: number;
  visibleText: string;
}

export interface TechnicalSnapshot {
  scriptCount: number;
  stylesheetCount: number;
  inlineStyleCount: number;
  inlineScriptCount: number;
  domElementCount: number;
  viewport: string | null;
  favicon: string | null;
  performance: PerformanceSnapshot;
}

export interface SnapshotMeta {
  description: string | null;
  robots: string | null;
  viewport: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImage: string | null;
  twitterCard: string | null;
  twitterTitle: string | null;
  twitterDescription: string | null;
  twitterImage: string | null;
}

export interface SnapshotLimits {
  maxLinks: number;
  maxImages: number;
  maxHeadings: number;
  maxForms: number;
  linksTruncated: boolean;
  imagesTruncated: boolean;
  headingsTruncated: boolean;
  formsTruncated: boolean;
}

export interface PageSnapshot {
  collectedAt: string;
  url: string;
  protocol: string;
  hostname: string;
  title: string;
  lang: string | null;
  charset: string | null;
  canonical: string | null;
  favicon: string | null;
  meta: SnapshotMeta;
  headings: HeadingInfo[];
  links: LinkInfo[];
  images: ImageInfo[];
  forms: FormInfo[];
  buttons: ButtonSnapshot[];
  inputs: InputSnapshot[];
  tabIndexes: TabIndexSnapshot[];
  ariaHints: AriaHintSnapshot[];
  content: ContentSnapshot;
  technical: TechnicalSnapshot;
  limits: SnapshotLimits;
}
