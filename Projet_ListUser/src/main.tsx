import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { FavoritesProvider } from './context/FavoritesContext';
import { BrowserRouter } from 'react-router-dom';
import './index.css';


createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </BrowserRouter>
  </React.StrictMode>
);
