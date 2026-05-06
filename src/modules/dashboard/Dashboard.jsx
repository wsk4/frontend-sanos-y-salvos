import { Container, Typography, Box } from '@mui/material';

export const Dashboard = () => {
  return (
    <Container>
      <Box py={4}>
        <Typography variant="h4" color="primary" gutterBottom>
          Dashboard de Esperanza
        </Typography>
        <Typography variant="body1">
          Aquí se listarán las mascotas perdidas y encontradas.
        </Typography>
      </Box>
    </Container>
  );
};