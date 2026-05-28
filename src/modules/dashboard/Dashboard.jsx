import { Typography, Box, Grid, CircularProgress, Alert } from '@mui/material';
import { PetCard } from '../../components/Card/PetCard';
import { useGetDashboardQuery } from '../../api/petsApi';

export const Dashboard = () => {
  const { data: mascotas = [], isLoading, error } = useGetDashboardQuery();

  return (

    <Box sx={{ width: '100%', py: 4, px: { xs: 2, sm: 4, md: 6, lg: 8 } }}>
      <Box mb={4}>
        <Typography variant="h4" color="primary" fontWeight="bold">
          Reencuentrate con tu mascota
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Mascotas Perdidas y/o Encontradas en la zona.
        </Typography>
      </Box>

      {isLoading && <Box display="flex" justifyContent="center" py={10}><CircularProgress /></Box>}
      {error && <Alert severity="error">Error de conexión.</Alert>}

      {!isLoading && !error && (
        <Grid container spacing={3}>
          {mascotas.map((pet) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={pet.id}>
              <PetCard pet={pet} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};
