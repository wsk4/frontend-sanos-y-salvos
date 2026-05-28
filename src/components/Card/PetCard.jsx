import { Card, CardContent, CardMedia, Typography, Chip, Box, Button } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { formatImageBytes } from '../../utils/imageUtils';
import { Link } from 'react-router-dom';

export const PetCard = ({ pet }) => {
    const { id, mascota, geolocalizacion, direccion } = pet;
    const isLost = mascota?.estado === 'PERDIDA';

    return (
        
        <Card 
            sx={{ 
                width: '100%',
                borderRadius: '14px', 
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)', 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                overflow: 'hidden',
                transition: 'transform 200ms ease, box-shadow 200ms ease',
                '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 16px rgba(0,0,0,0.12)'
                }
            }}
        >
            
            <CardMedia
                component="img"
                height="200"
                image={formatImageBytes(mascota?.fotoBytes)}
                alt={mascota?.nombre || 'Mascota'}
                sx={{ objectFit: 'cover', maxWidth: '100%' }}
            />
            
            
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5, gap: 1 }}>
                    
                    <Typography 
                        variant="h6" 
                        fontWeight="bold"
                        sx={{
                            fontSize: 'clamp(1.1rem, 2vw, 1.25rem)', 
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}
                    >
                        {mascota?.nombre || 'Sin nombre'}
                    </Typography>
                    <Chip
                        label={mascota?.estado || 'DESCONOCIDO'}
                        color={isLost ? 'error' : 'success'}
                        size="small"
                        sx={{ fontWeight: 'bold' }}
                    />
                </Box>

                
                <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    mb={1.5}
                    sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}
                >
                    <strong>Raza:</strong> {mascota?.raza || 'No especificada'}
                </Typography>

                
                <Box sx={{ display: 'flex', alignItems: 'flex-start', color: 'text.secondary', mb: 2.5, flexGrow: 1 }}>
                    <LocationOnIcon fontSize="small" color="primary" sx={{ mr: 0.5, mt: 0.3 }} />
                    <Box sx={{ width: '100%', overflow: 'hidden' }}>
                        <Typography 
                            variant="body2"
                            sx={{
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                lineHeight: 1.4
                            }}
                        >
                            {direccion || 'Dirección '} 
                        </Typography>
                        {geolocalizacion && (
                            <Typography variant="caption" color="text.disabled" sx={{ display: 'block', mt: 0.5 }}>
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
                    sx={{ 
                        mt: 'auto',
                        minHeight: '44px',
                        height: '44px',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        textTransform: 'none'
                    }}
                >
                    Ver Detalles
                </Button>
            </CardContent>
        </Card>
    );
};
