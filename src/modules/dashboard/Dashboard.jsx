import { Container, Typography, Box, Grid, CircularProgress, Alert } from '@mui/material';
import { PetCard } from '../../components/Card/PetCard';
import { useGetDashboardQuery } from '../../api/petsApi';

export const Dashboard = () => {
  const { data: mascotas = [], isLoading, error } = useGetDashboardQuery();

  return (
    <Container>
      <Box py={4}>
        <Typography variant="h4" color="primary" fontWeight="bold" gutterBottom>
          Reencuentrate con tu mascota
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={4}>
          Mascotas Perdidas y/o Encontradas en la zona.
        </Typography>

        {isLoading && (
          <Box display="flex" justifyContent="center" mt={4} py={10}>
            <CircularProgress color="primary" />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            Hubo un problema al cargar el dashboard. Por favor, verifica tu conexión.
          </Alert>
        )}

        {!isLoading && !error && (
          <Grid container spacing={3}>
            {mascotas.length > 0 ? (
              mascotas.map((pet) => (
                <Grid item xs={12} sm={6} md={4} key={pet.id}>
                  <PetCard pet={pet} />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography variant="body1" textAlign="center" py={5}>
                  No hay reportes de mascotas en este momento.
                </Typography>
              </Grid>
            )}
          </Grid>
        )}
      </Box>
    </Container>
  );
};