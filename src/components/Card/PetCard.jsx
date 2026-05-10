import { Card, CardContent, CardMedia, Typography, Chip, Box, Button } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import { formatImageBytes } from '../../utils/imageUtils';
import { Link } from 'react-router-dom';

export const PetCard = ({ pet }) => {
    const isLost = pet.estado === 'PERDIDA';

    return (
        <Card sx={{ maxWidth: 345, borderRadius: 2, boxShadow: 3 }}>
            <CardMedia
                component="img"
                height="200"
                image={formatImageBytes(pet.fotoBytes)}
                alt={pet.nombre}
            />
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="h6" fontWeight="bold">{pet.nombre}</Typography>
                    <Chip
                        label={pet.estado}
                        color={isLost ? 'error' : 'success'}
                        size="small"
                    />
                </Box>

                <Typography variant="body2" color="text.secondary" mb={1}>
                    <strong>Raza:</strong> {pet.raza}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'flex-start', color: 'text.secondary', mb: 1 }}>
                    <LocationOnIcon fontSize="small" color="primary" sx={{ mr: 0.5, mt: 0.3 }} />
                    <Box>
                        <Typography variant="body2">
                            {pet.direccion ?? 'Dirección no disponible'}
                        </Typography>
                        {pet.latitud && pet.longitud && (
                            <Typography variant="caption" color="text.disabled">
                                {pet.latitud.toFixed(5)}, {pet.longitud.toFixed(5)}
                            </Typography>
                        )}
                    </Box>
                </Box>

                {pet.contactoInfo && (
                    <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', mb: 2 }}>
                        <PhoneIcon fontSize="small" color="primary" sx={{ mr: 0.5 }} />
                        <Typography variant="body2">{pet.contactoInfo}</Typography>
                    </Box>
                )}

                <Button
                    component={Link}
                    to={`/mascotas/${pet.idMascota}`}
                    state={{ petData: pet }}
                    variant="outlined"
                    color="primary"
                    fullWidth
                >
                    Ver Detalles
                </Button>
            </CardContent>
        </Card>
    );
};