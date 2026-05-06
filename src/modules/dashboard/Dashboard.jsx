import { Container, Typography, Box, Grid, CircularProgress, Alert } from '@mui/material';
import { PetCard } from '../../components/Card/PetCard';
import { useGetDashboardQuery } from '../../api/petsApi';

export const Dashboard = () => {
  const { data: mascotasConsolidadas, error, isLoading } = useGetDashboardQuery();

  return (
    <Container>
      <Box py={4}>
        <Typography variant="h4" color="primary" fontWeight="bold" gutterBottom>
          Dashboard de Esperanza
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={4}>
          Mascotas registradas en tiempo real a través del sistema.
        </Typography>
        {isLoading && (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress color="primary" />
          </Box>
        )}        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            Ocurrió un error al cargar los datos.
          </Alert>
        )}
        {!isLoading && !error && mascotasConsolidadas && (
          <Grid container spacing={3}>
            {mascotasConsolidadas.map((pet, index) => (
              <Grid item xs={12} sm={6} md={4} key={pet.mascota.id || index}>
                <PetCard pet={pet} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};