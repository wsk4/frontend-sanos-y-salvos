import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './routes/AppRouter';
import { TokenSync } from './components/Auth/TokenSync';
import { Navbar } from './components/Navbar/Navbar';
import { Box } from '@mui/material';

function App() {
  return (
    <BrowserRouter>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <TokenSync />
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <AppRouter />
        </Box>
      </Box>
    </BrowserRouter>
  );
}

export default App;