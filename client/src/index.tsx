import React from 'react';
import ReactDOM from 'react-dom/client';

import { AuthContextProvider } from 'contexts/authContext';
import 'styles/globals.scss';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);
