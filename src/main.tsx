import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/';
import './app/styles/global.scss';
import LocalizationContextProvider from './app/context/localizationContext/LocalizationContextProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LocalizationContextProvider>
      <App />
    </LocalizationContextProvider>
  </React.StrictMode>,
);
