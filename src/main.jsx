import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider, CssBaseline } from '@mui/material';

// Importaciones de nuestra arquitectura
import { store } from './app/store';
import { theme } from './assets/styles/theme';
import App from './App.jsx';
import './assets/styles/index.css'; // Nuestro reset

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* Aplica el fondo de theme.js y resetea estilos extra */}
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);