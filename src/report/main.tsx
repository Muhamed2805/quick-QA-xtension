import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ReportApp } from './ReportApp';
import '../popup/index.css';

const root = document.getElementById('root');
if (!root) {
  throw new Error('Report root was not found.');
}

createRoot(root).render(
  <StrictMode>
    <ReportApp />
  </StrictMode>,
);
