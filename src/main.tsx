import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/';
import LocalizationProvider from './app/context/localizationContext/LocalizationProvider';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './shared/ui/ErrorFallback';
import './app/styles/global.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <LocalizationProvider>
        <App />
      </LocalizationProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
