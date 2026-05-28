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
       
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          width: '100%',
          bgcolor: 'background.default'
        }}>

          <TokenSync />
          <Navbar />
          
          
          <main style={{ flexGrow: 1, width: '100%', display: 'flex', flexDirection: 'column' }}>
            <AppRouter />
          </main>

        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
