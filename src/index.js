import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import "aos/dist/aos.css";
import { GoogleOAuthProvider } from '@react-oauth/google';


const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

if (!clientId) {
  throw new Error('REACT_APP_GOOGLE_CLIENT_ID environment variable must be set');
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);