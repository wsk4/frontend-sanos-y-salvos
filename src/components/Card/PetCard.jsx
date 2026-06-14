import { Card, CardContent, CardMedia, Typography, Chip, Box, Button } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { formatImageBytes } from '../../utils/imageUtils';
import { Link } from 'react-router-dom';
import { petCardStyles as styles } from './PetCard.styles';

export const PetCard = ({ pet }) => {
    const { id, mascota, geolocalizacion, direccion } = pet;
    const isLost = mascota?.estado === 'PERDIDA';

    return (
        <Card sx={styles.card}>
            <CardMedia
                component="img"
                height="200"
                image={formatImageBytes(mascota?.fotoBytes)}
                alt={mascota?.nombre || 'Mascota'}
                sx={styles.media}
            />

            <CardContent sx={styles.content}>
                <Box sx={styles.header}>
                    <Typography variant="h6" fontWeight="bold" sx={styles.title}>
                        {mascota?.nombre || 'Sin nombre'}
                    </Typography>
                    <Chip
                        label={mascota?.estado || 'DESCONOCIDO'}
                        color={isLost ? 'error' : 'success'}
                        size="small"
                        sx={styles.chip}
                    />
                </Box>

                <Typography variant="body2" color="text.secondary" mb={1.5} sx={styles.breed}>
                    <strong>Raza:</strong> {mascota?.raza || 'No especificada'}
                </Typography>

                <Box sx={styles.locationBox}>
                    <LocationOnIcon fontSize="small" color="primary" sx={styles.locationIcon} />
                    <Box sx={styles.addressContainer}>
                        <Typography variant="body2" sx={styles.address}>
                            {direccion || 'Dirección'}
                        </Typography>
                        {geolocalizacion && (
                            <Typography variant="caption" color="text.disabled" sx={styles.coordinates}>
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
                    sx={styles.button}
                >
                    Ver Detalles
                </Button>
            </CardContent>
        </Card>
    );
};