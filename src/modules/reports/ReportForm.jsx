import { Container, Typography, Box } from '@mui/material';

export const ReportForm = () => {
  return (
    <Container>
      <Box py={4}>
        <Typography variant="h4" color="primary" gutterBottom>
          Reportar Mascota
        </Typography>
        <Typography variant="body1">
          Aquí irá el formulario con subida de imágenes.
        </Typography>
      </Box>
    </Container>
  );
};