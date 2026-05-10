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
                    if (!res.ok) throw new Error("No se pudo conectar con el servidor.");
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

    if (isLoading) return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <CircularProgress />
        </Box>
    );

    
    const BackButton = () => (
        <Button 
            startIcon={<ArrowBackIcon />} 
            onClick={() => navigate('/dashboard')} 
            sx={{ mb: 3, fontWeight: 'bold' }}
        >
            Volver al Dashboard
        </Button>
    );

    if (error && !pet) return (
        <Container sx={{ mt: 4 }}>
            <BackButton />
            <Alert severity="error">{error}</Alert>
        </Container>
    );

    if (!pet) return (
        <Container sx={{ mt: 4 }}>
            <BackButton />
            <Alert severity="warning">No se encontraron detalles para esta mascota.</Alert>
        </Container>
    );

    
    const data = pet.mascota ? pet.mascota : pet;

    return (
        <Container sx={{ py: 4 }}>
            
            <BackButton />

            <Paper elevation={4} sx={{ p: 4, borderRadius: 3, backgroundColor: '#fdfdfd' }}>
                <Typography variant="h3" color="primary" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                    {data.nombre}
                </Typography>
                
                <Box sx={{ my: 4, display: 'flex', justifyContent: 'center' }}>
                    <img 
                        src={formatImageBytes(data.fotoBytes)} 
                        alt={data.nombre} 
                        style={{ 
                            width: '100%', 
                            maxWidth: '600px', 
                            maxHeight: '450px', 
                            objectFit: 'cover', 
                            borderRadius: '16px',
                            boxShadow: '0px 4px 20px rgba(0,0,0,0.1)'
                        }} 
                    />
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: '600px', mx: 'auto' }}>
                    <Typography variant="h5"><strong>Raza:</strong> {data.raza}</Typography>
                    <Typography variant="h5"><strong>Estado actual:</strong> {data.estado}</Typography>
                    
                    {pet.geolocalizacion && (
                        <Box sx={{ mt: 2, p: 2, bgcolor: '#e3f2fd', borderRadius: 2 }}>
                            <Typography variant="h6" color="primary">Ubicación del reporte:</Typography>
                            <Typography variant="body1">
                                Latitud: {pet.geolocalizacion.latitud} | Longitud: {pet.geolocalizacion.longitud}
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Paper>
        </Container>
    );
};