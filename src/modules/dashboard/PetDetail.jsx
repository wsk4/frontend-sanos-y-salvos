import { Container, Typography, Box, Paper, Grid, Chip, Button, Divider, CircularProgress, Alert, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useGetPetByIdQuery } from '../../api/petsApi';
import { useAuth } from '@clerk/clerk-react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PetsIcon from '@mui/icons-material/Pets';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import StraightenIcon from '@mui/icons-material/Straighten';
import { formatImageBytes } from '../../utils/imageUtils';

export const PetDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { isSignedIn } = useAuth();

    const petFromState = location.state?.petData;
    const { data: petFromApi, isLoading, error } = useGetPetByIdQuery(id, { skip: !!petFromState });
    const pet = petFromState || petFromApi;

    if (isLoading) return <Box display="flex" justifyContent="center" py={10}><CircularProgress /></Box>;

    if (error || !pet) {
        return (
            <Container maxWidth="xl" sx={{ py: 8 }}>
                <Alert severity="error">No pudimos encontrar la información detallada.</Alert>
                <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/dashboard')} sx={{ mt: 2 }}>Volver</Button>
            </Container>
        );
    }

    const { mascota, direccion, contactoInfo } = pet;

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate(-1)}
                sx={{ mb: 2, textTransform: 'none' }}
            >
                Volver atrás
            </Button>

            <Paper elevation={2} sx={{ borderRadius: 4, overflow: 'hidden', border: '1px solid #e0e0e0' }}>
                <Grid container alignItems="stretch">

                    <Grid item xs={12} md={6}>
                        <Box
                            component="img"
                            src={formatImageBytes(mascota.fotoBytes)}
                            alt={mascota.nombre}
                            sx={{
                                width: '100%',
                                height: '100%',
                                minHeight: { xs: 350, md: 500 },
                                objectFit: 'cover',
                                display: 'block'
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Box p={{ xs: 3, md: 5 }} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>

                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                <Typography variant="h3" fontWeight="bold" color="primary">
                                    {mascota.nombre || 'Sin nombre'}
                                </Typography>
                                <Chip
                                    label={mascota.estado}
                                    color={mascota.estado === 'PERDIDA' ? 'error' : 'success'}
                                    sx={{ fontWeight: 'bold' }}
                                />
                            </Box>

                            <Divider sx={{ mb: 3 }} />

                            <Typography variant="h6" fontWeight="bold" gutterBottom>Características</Typography>
                            <List sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, mb: 3 }}>
                                <ListItem disableGutters>
                                    <ListItemIcon><PetsIcon color="primary" /></ListItemIcon>
                                    <ListItemText primary="Raza" secondary={mascota.raza || 'No especificada'} />
                                </ListItem>
                                <ListItem disableGutters>
                                    <ListItemIcon><ColorLensIcon color="primary" /></ListItemIcon>
                                    <ListItemText primary="Color" secondary={mascota.color || 'No especificado'} />
                                </ListItem>
                                <ListItem disableGutters>
                                    <ListItemIcon><StraightenIcon color="primary" /></ListItemIcon>
                                    <ListItemText primary="Tamaño" secondary={mascota.tamano || 'No especificado'} />
                                </ListItem>
                            </List>

                            <Box mt="auto">
                                <Typography variant="subtitle1" fontWeight="bold" display="flex" alignItems="center" mb={1}>
                                    <LocationOnIcon sx={{ mr: 1 }} color="primary" /> Ubicación del reporte
                                </Typography>
                                <Typography variant="body1" color="text.secondary" mb={3}>
                                    {direccion || 'Dirección no disponible'}
                                </Typography>

                                <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 2, border: '1px solid', borderColor: 'grey.300' }}>
                                    <Typography variant="subtitle2" fontWeight="bold" display="flex" alignItems="center" mb={0.5}>
                                        <ContactPhoneIcon sx={{ mr: 1 }} color="primary" fontSize="small" /> Datos de Contacto
                                    </Typography>

                                    {isSignedIn ? (
                                        <Typography variant="h5" color="secondary" fontWeight="bold">
                                            {contactoInfo || 'Información no proporcionada'}
                                        </Typography>
                                    ) : (
                                        <Alert severity="info" sx={{ mt: 1, py: 0 }}>
                                            Inicia sesión para ver el contacto.
                                        </Alert>
                                    )}
                                </Box>
                            </Box>

                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};