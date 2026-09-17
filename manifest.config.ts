import { defineManifest } from '@crxjs/vite-plugin';

export default defineManifest({
  manifest_version: 3,
  name: 'Quick QA',
  version: '0.1.0',
  description:
    'Scan the current page for SEO, accessibility, content, and technical QA issues. Analysis stays on your device.',
  action: {
    default_title: 'Quick QA',
    default_popup: 'index.html',
    default_icon: {
      '16': 'icons/icon-16.png',
      '32': 'icons/icon-32.png',
      '48': 'icons/icon-48.png',
      '128': 'icons/icon-128.png',
    },
  },
  icons: {
    '16': 'icons/icon-16.png',
    '32': 'icons/icon-32.png',
    '48': 'icons/icon-48.png',
    '128': 'icons/icon-128.png',
  },
  background: {
    service_worker: 'src/extension/background.ts',
    type: 'module',
  },
  permissions: ['activeTab'],
});
