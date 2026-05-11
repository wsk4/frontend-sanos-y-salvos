import { Container, Typography, Box, Paper, Grid, Chip, Button, Divider, CircularProgress, Alert } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useGetPetByIdQuery } from '../../api/petsApi';
import { useAuth } from '@clerk/clerk-react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { formatImageBytes } from '../../utils/imageUtils';

export const PetDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { isSignedIn } = useAuth();

    const petFromState = location.state?.petData;
    const { data: petFromApi, isLoading, error } = useGetPetByIdQuery(id, {
        skip: !!petFromState,
    });

    const pet = petFromState || petFromApi;

    if (isLoading) return <Box display="flex" justifyContent="center" py={10}><CircularProgress /></Box>;
    if (error || !pet) return (
        <Container maxWidth="md" sx={{ py: 8 }}>
            <Alert severity="error">No se encontró la mascota.</Alert>
            <Button onClick={() => navigate('/dashboard')}>Volver</Button>
        </Container>
    );

    const { mascota, direccion, contactoInfo } = pet;

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 3 }}>Volver</Button>
            <Paper elevation={3} sx={{ borderRadius: 4, overflow: 'hidden' }}>
                <Grid container>
                    <Grid item xs={12} md={6}>
                        <Box component="img" src={formatImageBytes(mascota.fotoBytes)} alt={mascota.nombre} sx={{ width: '100%', height: '100%', minHeight: 400, objectFit: 'cover' }} />
                    </Grid>
                    <Grid item xs={12} md={6} p={4}>
                        <Typography variant="h3" fontWeight="bold" color="primary">{mascota.nombre}</Typography>
                        <Chip label={mascota.estado} color={mascota.estado === 'PERDIDA' ? 'error' : 'success'} sx={{ mt: 1 }} />
                        <Divider sx={{ my: 3 }} />
                        <Box mb={3}>
                            <Typography variant="subtitle1" fontWeight="bold"><LocationOnIcon sx={{ mr: 1, verticalAlign: 'middle' }} /> Ubicación</Typography>
                            <Typography variant="body1" color="text.secondary">{direccion}</Typography>
                        </Box>
                        <Box mb={4}>
                            <Typography variant="subtitle1" fontWeight="bold"><PhoneIcon sx={{ mr: 1, verticalAlign: 'middle' }} /> Contacto</Typography>
                            {isSignedIn ? (
                                <>
                                    <Typography variant="h5" color="secondary" fontWeight="bold">{contactoInfo || 'No disponible'}</Typography>
                                    <Button variant="contained" fullWidth href={`tel:${contactoInfo}`} disabled={!contactoInfo} sx={{ mt: 2 }}>Llamar</Button>
                                </>
                            ) : (
                                <Alert severity="info" sx={{ mt: 1 }}>Inicia sesión para ver el contacto.</Alert>
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};