import { Container, Typography, Button, Box } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';

function App() {
  // Función directa, sin useCallback
  const handleClickTest = () => {
    console.log("¡El entorno base está funcionando, Matias!");
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        gap={3}
      >
        <PetsIcon color="primary" sx={{ fontSize: 60 }} />
        <Typography variant="h3" component="h1" color="primary" fontWeight="bold">
          Sanos y Salvos
        </Typography>
        <Typography variant="body1" color="text.secondary" textAlign="center">
          La Fase 1 está configurada correctamente. El tema de Material UI está activo y RTK Query está esperando los endpoints.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleClickTest}
        >
          Comenzar Desarrollo
        </Button>
      </Box>
    </Container>
  );
}

export default App;