import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);
// This code is the entry point for a React application using Vite.
// It imports necessary modules, including React, ReactDOM, the main App component, and CSS
