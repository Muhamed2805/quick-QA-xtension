import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './index.css';

if (location.pathname.includes('sidepanel')) {
  document.documentElement.dataset.surface = 'side';
}

const root = document.getElementById('root');

if (!root) {
  throw new Error('Quick QA popup root element was not found.');
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
