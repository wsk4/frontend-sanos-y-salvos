import { Container, Typography, Box, Grid } from '@mui/material';
import { PetCard } from '../../components/Card/PetCard';

const mockPets = [
  { id: 1, nombre: 'Max', raza: 'Golden Retriever', estado: 'PERDIDA', ubicacionDesc: 'Plaza de Armas' },
  { id: 2, nombre: 'Luna', raza: 'Gato Siam茅s', estado: 'ENCONTRADA', ubicacionDesc: 'Av. Providencia' },
  { id: 3, nombre: 'Rocky', raza: 'Bulldog', estado: 'PERDIDA', ubicacionDesc: 'Parque Bicentenario' },
];

export const Dashboard = () => {
  return (
    <Container>
      <Box py={4}>
        <Typography variant="h4" color="primary" fontWeight="bold" gutterBottom>
          Dashboard de Esperanza
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={4}>
          Aqui se listaran las mascotas perdidas y encontradas.
        </Typography>

        <Grid container spacing={3}>
          {mockPets.map((pet) => (
            <Grid item xs={12} sm={6} md={4} key={pet.id}>
              <PetCard pet={pet} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};