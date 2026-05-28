import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { AppRouter } from './routes/AppRouter';
import { TokenSync } from './components/Auth/TokenSync';
import { Navbar } from './components/Navbar/Navbar';
import { theme } from './assets/styles/theme';
import './index.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <BrowserRouter>
        {/* Nos aseguramos de que el Box base ocupe siempre el 100% del ancho de la pantalla */}
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          width: '100%',
          bgcolor: 'background.default'
        }}>

          <TokenSync />
          <Navbar />
          
          {/* CAMBIO CRUCIAL:
              Eliminamos la clase "responsive-container" que bloqueaba la grilla.
              Usamos estilos en línea para que este contenedor herede el 100% del ancho 
              y permita a los componentes internos (Dashboard) ser responsivos.
          */}
          <main style={{ flexGrow: 1, width: '100%', display: 'flex', flexDirection: 'column' }}>
            <AppRouter />
          </main>

        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;