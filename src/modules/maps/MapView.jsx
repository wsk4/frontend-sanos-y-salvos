import { Container, Typography, Box } from '@mui/material';

export const MapView = () => {
  return (
    <Container>
      <Box py={4}>
        <Typography variant="h4" color="primary" gutterBottom>
          Radar de Huellas
        </Typography>
        <Typography variant="body1">
          Aquí integraremos Leaflet para mostrar el mapa interactivo.
        </Typography>
      </Box>
    </Container>
  );
};