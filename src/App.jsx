import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { AppRouter } from './routes/AppRouter';
import { TokenSync } from './components/Auth/TokenSync';
import { Navbar } from './components/Navbar/Navbar';
import { theme } from './assets/styles/theme';
import './index.css'; r

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <BrowserRouter>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          bgcolor: 'background.default'
        }}>

          <TokenSync />
          <Navbar />
          <main className="responsive-container">
            <AppRouter />
          </main>

        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;