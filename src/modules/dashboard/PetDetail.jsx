import {Container,Typography,Box,Paper,Grid,Chip,Button,Divider,CircularProgress,Alert,List,ListItem,ListItemText,ListItemIcon} from '@mui/material';
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
import '../../assets/styles/PetDetail.css';

export const PetDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { isSignedIn } = useAuth();

    const petFromState = location.state?.petData;
    const { data: petFromApi, isLoading, error } = useGetPetByIdQuery(id, {
        skip: !!petFromState
    });

    const pet = petFromState || petFromApi;

    if (isLoading) {
        return (
        <Box className="pet-detail-loading">
            <CircularProgress />
        </Box>
        );
    }

    if (error || !pet) {
        return (
        <Container maxWidth="xl" className="pet-detail-error-container">
            <Alert severity="error" className="pet-detail-alert">
            No pudimos conectarnos con el servidor para obtener la información de la mascota.
            Verifica tu conexión o inténtalo nuevamente en unos minutos.
            </Alert>

            <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/dashboard')}
            className="pet-detail-back-button"
            >
            Volver
            </Button>
        </Container>
        );
    }

    const { mascota, direccion, contactoInfo } = pet;

    return (
        <Container maxWidth="lg" className="pet-detail-container">
        <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            className="pet-detail-back-button"
        >
            Volver atrás
        </Button>

        <Paper elevation={2} className="pet-detail-paper">
            <Grid container alignItems="stretch">
            <Grid item xs={12} md={6}>
                <Box
                component="img"
                src={formatImageBytes(mascota.fotoBytes)}
                alt={mascota.nombre}
                className="pet-detail-image"
                />
            </Grid>

            <Grid item xs={12} md={6}>
                <Box className="pet-detail-content">
                <Box className="pet-detail-header-row">
                    <Typography
                    variant="h3"
                    fontWeight="bold"
                    color="primary"
                    className="pet-detail-title"
                    >
                    {mascota.nombre || 'Sin nombre'}
                    </Typography>

                    <Chip
                    label={mascota.estado}
                    color={mascota.estado === 'PERDIDA' ? 'error' : 'success'}
                    className="pet-detail-chip"
                    />
                </Box>

                <Divider className="pet-detail-divider" />

                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Características
                </Typography>

                <List className="pet-detail-list">
                    <ListItem disableGutters>
                    <ListItemIcon>
                        <PetsIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                        primary="Raza"
                        secondary={mascota.raza || 'No especificada'}
                    />
                    </ListItem>

                    <ListItem disableGutters>
                    <ListItemIcon>
                        <ColorLensIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                        primary="Color"
                        secondary={mascota.color || 'No especificado'}
                    />
                    </ListItem>

                    <ListItem disableGutters>
                    <ListItemIcon>
                        <StraightenIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                        primary="Tamaño"
                        secondary={mascota.tamano || 'No especificado'}
                    />
                    </ListItem>
                </List>

                <Box className="pet-detail-footer">
                    <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    className="pet-detail-section-title"
                    >
                    <LocationOnIcon className="pet-detail-inline-icon" color="primary" />
                    Ubicación del reporte
                    </Typography>

                    <Typography variant="body1" color="text.secondary" className="pet-detail-address">
                    {direccion || 'Dirección no disponible'}
                    </Typography>

                    <Box className="pet-detail-contact-box">
                    <Typography
                        variant="subtitle2"
                        fontWeight="bold"
                        className="pet-detail-section-title"
                    >
                        <ContactPhoneIcon
                        className="pet-detail-inline-icon"
                        color="primary"
                        fontSize="small"
                        />
                        Datos de contacto
                    </Typography>

                    {isSignedIn ? (
                        <Typography
                        variant="h5"
                        color="secondary"
                        fontWeight="bold"
                        className="pet-detail-contact-info"
                        >
                        {contactoInfo || 'Información no proporcionada'}
                        </Typography>
                    ) : (
                        <Alert severity="info" className="pet-detail-info-alert">
                        Inicia sesión para ver la información de contacto.
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