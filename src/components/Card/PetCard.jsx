import { Card, CardContent, CardMedia, Typography, Chip, Box, Button } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { formatImageBytes } from '../../utils/imageUtils';

export const PetCard = ({ pet }) => {
    const isLost = pet.estado === 'PERDIDA';

    const { mascota, geolocalizacion } = pet;

    return (
        <Card sx={{ maxWidth: 345, borderRadius: 2, boxShadow: 3 }}>
            <CardMedia
                component="img"
                height="200"
                image={formatImageBytes(mascota.fotoBytes)}
                alt={mascota.nombre}
            />
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="h6" component="div" fontWeight="bold">
                        {mascota.nombre}
                    </Typography>
                    <Chip
                        label={mascota.estado}
                        color={isLost ? 'error' : 'success'}
                        size="small"
                        sx={{ fontWeight: 'bold' }}
                    />
                </Box>

                <Typography variant="body2" color="text.secondary" mb={1}>
                    <strong>Raza:</strong> {mascota.raza}
                </Typography>

                <Box display="flex" alignItems="center" color="text.secondary" mb={2}>
                    <LocationOnIcon fontSize="small" color="primary" sx={{ mr: 0.5 }} />
                    <Typography variant="body2">
                        {/* Si hay datos de geolocalización los mostramos, sino mostramos un texto por defecto */}
                        {geolocalizacion ? `Lat: ${geolocalizacion.latitud}, Lng: ${geolocalizacion.longitud}` : 'Ubicación pendiente'}
                    </Typography>
                </Box>

                <Button variant="outlined" color="primary" fullWidth>
                    Ver Detalles
                </Button>
            </CardContent>
        </Card>
    );
};