import { Typography, Box, Grid, CircularProgress, Alert } from '@mui/material';
import { useSelector } from 'react-redux';
import { PetCard } from '../../components/Card/PetCard';
import { useGetDashboardQuery } from '../../api/petsApi';
import '../../assets/styles/Dashboard.css';

export const Dashboard = () => {
  const isAuthReady = useSelector((state) => state.auth.isReady);

  const { data: mascotas = [], isLoading, error } = useGetDashboardQuery(
    undefined,
    { skip: !isAuthReady }
  );

  return (
    <Box className="dashboard-container">
      <Box className="dashboard-header">
        <Typography
          variant="h4"
          color="primary"
          fontWeight="bold"
          className="dashboard-title"
        >
          Reencuentrate con tu mascota
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          className="dashboard-subtitle"
        >
          Mascotas Perdidas y/o Encontradas en la zona.
        </Typography>
      </Box>

      {(!isAuthReady || isLoading) && (
        <Box className="dashboard-loading">
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" className="dashboard-alert">
          No pudimos conectarnos con el servidor en este momento. Verifica tu conexión o inténtalo nuevamente en unos minutos.
        </Alert>
      )}

      {isAuthReady && !isLoading && !error && (
        <Grid container spacing={3} className="dashboard-grid">
          {mascotas.map((pet) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={pet.id}>
              <PetCard pet={pet} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};