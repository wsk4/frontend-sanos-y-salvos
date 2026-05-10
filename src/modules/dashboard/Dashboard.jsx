import { useEffect, useState } from 'react';
import { Container, Typography, Box, Grid, CircularProgress, Alert } from '@mui/material';
import { PetCard } from '../../components/Card/PetCard';
import { useAuth } from '@clerk/clerk-react';

export const Dashboard = () => {
  const { getToken } = useAuth();
  const [mascotas, setMascotas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = await getToken();
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/bff/v1/dashboard`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const data = await res.json();
        setMascotas(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboard();
  }, [getToken]);

  const adaptarPet = (dto) => ({
    id: dto.idMascota, 
    direccion: dto.direccion,
    contactoInfo: dto.contactoInfo,
    mascota: {
      nombre: dto.nombre,
      raza: dto.raza,
      estado: dto.estado,
      fotoBytes: dto.fotoBytes ?? null,
      color: dto.color,
      tamano: dto.tamano
    },
    geolocalizacion: dto.latitud != null
      ? { latitud: dto.latitud, longitud: dto.longitud }
      : null,
  });

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
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress color="primary" />
          </Box>
        )}
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        {!isLoading && !error && (
          <Grid container spacing={3}>
            {mascotas.map((dto) => (
              <Grid item xs={12} sm={6} md={4} key={dto.idMascota}>
                <PetCard pet={adaptarPet(dto)} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};