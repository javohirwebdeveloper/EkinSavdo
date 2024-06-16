// index.js or App.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';
import './index.css';
import store from './store';

const clientId = '442003946220-dcctf3sdjc50n0pmthh3ud5u7ic0ovvb.apps.googleusercontent.com';

const root = createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId={clientId}>
    <Provider store={store}>
      <App />
    </Provider>
  </GoogleOAuthProvider>
);
