import { Card, CardContent, CardMedia, Typography, Chip, Box, Button } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export const PetCard = ({ pet }) => {
    const isLost = pet.estado === 'PERDIDA';

    return (
        <Card sx={{ maxWidth: 345, borderRadius: 2, boxShadow: 3 }}>
        <CardMedia
            component="img"
            height="200"
            image={pet.fotoUrl || 'https://via.placeholder.com/300x200?text=Foto+Mascota'}
            alt={pet.nombre}
        />
        <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="h6" component="div" fontWeight="bold">
                {pet.nombre}
            </Typography>
            <Chip 
                label={pet.estado} 
                color={isLost ? 'error' : 'success'} 
                size="small" 
                sx={{ fontWeight: 'bold' }} 
            />
            </Box>
            
            <Typography variant="body2" color="text.secondary" mb={1}>
            <strong>Raza:</strong> {pet.raza}
            </Typography>

            <Box display="flex" alignItems="center" color="text.secondary" mb={2}>
            <LocationOnIcon fontSize="small" color="primary" sx={{ mr: 0.5 }} />
            <Typography variant="body2">
                {pet.ubicacionDesc || 'Ubicaci贸n procesada por BFF'}
            </Typography>
            </Box>

            <Button variant="outlined" color="primary" fullWidth>
            Ver Detalles
            </Button>
        </CardContent>
        </Card>
    );
};