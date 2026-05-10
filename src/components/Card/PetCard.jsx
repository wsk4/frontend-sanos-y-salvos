import { Card, CardContent, CardMedia, Typography, Chip, Box, Button } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { formatImageBytes } from '../../utils/imageUtils';
import { Link } from 'react-router-dom';

export const PetCard = ({ pet }) => {
    const { id, mascota, geolocalizacion, direccion } = pet;
    const isLost = mascota?.estado === 'PERDIDA';

    return (
        <Card sx={{ maxWidth: 345, borderRadius: 2, boxShadow: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardMedia
                component="img"
                height="200"
                image={formatImageBytes(mascota?.fotoBytes)}
                alt={mascota?.nombre || 'Mascota'}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="h6" fontWeight="bold">
                        {mascota?.nombre || 'Sin nombre'}
                    </Typography>
                    <Chip
                        label={mascota?.estado || 'DESCONOCIDO'}
                        color={isLost ? 'error' : 'success'}
                        size="small"
                    />
                </Box>

                <Typography variant="body2" color="text.secondary" mb={1}>
                    <strong>Raza:</strong> {mascota?.raza || 'No especificada'}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'flex-start', color: 'text.secondary', mb: 2 }}>
                    <LocationOnIcon fontSize="small" color="primary" sx={{ mr: 0.5, mt: 0.3 }} />
                    <Box>
                        <Typography variant="body2">
                            {direccion || 'Dirección '} 
                        </Typography>
                        {geolocalizacion && (
                            <Typography variant="caption" color="text.disabled" sx={{ display: 'block' }}>
                                {geolocalizacion.latitud.toFixed(5)}, {geolocalizacion.longitud.toFixed(5)} 
                            </Typography>
                        )}
                    </Box>
                </Box>

                <Button 
                    component={Link} 
                    to={`/mascotas/${id}`} 
                    state={{ petData: pet }} 
                    variant="outlined" 
                    color="primary" 
                    fullWidth
                    sx={{ mt: 'auto' }}
                >
                    Ver Detalles
                </Button>
            </CardContent>
        </Card>
    );
};