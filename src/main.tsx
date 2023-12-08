import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/';
import './app/styles/global.scss';
import AppContextProvider from './app/context/AppContextProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </React.StrictMode>,
);
