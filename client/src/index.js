import '@styles/index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { AppProvider } from '@providers/app';

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <AppProvider />
  </StrictMode>
);
