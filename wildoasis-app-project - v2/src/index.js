import React from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from "react-error-boundary";
import './index.css';
import App from './App';
import ErrorFallback from './ui/ErrorFallback';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary
      fallbackComponent={<ErrorFallback/>}
      onReset={(details) => {
        window.location.replace('/');
      }}
    >

      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
