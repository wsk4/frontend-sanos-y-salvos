import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Container, Typography, Box, CircularProgress, Alert, Paper, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; 
import { useAuth } from '@clerk/clerk-react';
import { formatImageBytes } from '../../utils/imageUtils';

export const PetDetail = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { getToken } = useAuth();
    
    const [pet, setPet] = useState(location.state?.petData || null);
    const [isLoading, setIsLoading] = useState(!location.state?.petData);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!pet) {
            const fetchPetDetail = async () => {
                try {
                    const token = await getToken();
                    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/bff/v1/mascotas/${id}`, {
                        headers: { 
                            "Authorization": `Bearer ${token}`,
                            "X-Tunnel-Skip-Anti-Phish-Prevention": "true" 
                        }
                    });
                    if (!res.ok) throw new Error("No se pudo obtener el detalle de la mascota.");
                    const data = await res.json();
                    setPet(data);
                } catch (e) {
                    setError(e.message);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchPetDetail();
        }
    }, [id, getToken, pet]);

    if (isLoading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><CircularProgress /></Box>;
    if (error && !pet) return <Container sx={{ mt: 4 }}><Alert severity="error">{error}</Alert></Container>;

    const data = pet?.mascota ? pet.mascota : pet;

    return (
        <Container sx={{ py: 4 }}>
            <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/dashboard')} sx={{ mb: 3 }}>
                Volver al Dashboard
            </Button>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
                <Typography variant="h3" color="primary" fontWeight="bold" textAlign="center" gutterBottom>
                    {data?.nombre}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                    <Box component="img" src={formatImageBytes(data?.fotoBytes)} alt={data?.nombre}
                         sx={{ width: '100%', maxWidth: 500, borderRadius: 4, boxShadow: 2 }} />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 500, mx: 'auto' }}>
                    <Typography variant="h5"><strong>Raza:</strong> {data?.raza}</Typography>
                    <Typography variant="h5"><strong>Estado:</strong> {data?.estado}</Typography>
                    <Typography variant="h5"><strong>Tamaño:</strong> {data?.tamano || 'No especificado'}</Typography>
                    <Typography variant="h5"><strong>Color:</strong> {data?.color || 'No especificado'}</Typography>
                    {pet?.contactoInfo && <Typography variant="h5"><strong>Contacto:</strong> {pet.contactoInfo}</Typography>}
                    {pet?.geolocalizacion && (
                        <Box sx={{ mt: 2, p: 2, bgcolor: '#e3f2fd', borderRadius: 2 }}>
                            <Typography variant="subtitle1" color="primary">Ubicación del reporte:</Typography>
                            <Typography variant="body2">Lat: {pet.geolocalizacion.latitud} | Lon: {pet.geolocalizacion.longitud}</Typography>
                        </Box>
                    )}
                </Box>
            </Paper>
        </Container>
    );
};