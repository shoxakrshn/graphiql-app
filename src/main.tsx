import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/';
import './app/styles/global.scss';
import LocalizationProvider from './app/context/LocalizationContext/LocalizationProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LocalizationProvider>
      <App />
    </LocalizationProvider>
  </React.StrictMode>,
);
