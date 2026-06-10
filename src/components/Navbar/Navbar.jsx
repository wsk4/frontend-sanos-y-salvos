import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

// Se importa la imagen respetando las minúsculas de la extensión
import logoSanosYSalvos from '../../assets/SANOS_Y_SALVOS.webp';

export const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const buttonStyle = (path) => ({
        color: 'white',
        fontWeight: isActive(path) ? 'bold' : 'normal',
        borderBottom: isActive(path) ? '2px solid white' : 'none',
        borderRadius: 0,
        mx: 1,
        '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' }
    });

    return (
        <AppBar position="sticky" color="primary" elevation={3}>
            {/* El Toolbar se mantiene tal cual estaba originalmente para no perder responsividad */}
            <Toolbar>
                <Typography
                    variant="h5"
                    component="div"
                    // Se agregó 'gap: 1' al final del sx para separar un poco la imagen del texto
                    sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', cursor: 'pointer', flexShrink: 0, gap: 1 }}
                    onClick={() => navigate('/dashboard')}
                >
                    {/* Aquí se inserta el logo reemplazando el emoji */}
                    <Box 
                        component="img"
                        src={logoSanosYSalvos}
                        alt="Logo de Masca"
                        sx={{ height: 60, width: 'auto' }} 
                    />
                    Sanos y Salvos
                </Typography>

                <Box sx={{ ml: 4, display: 'flex', flexGrow: 1 }}>
                    <Button sx={buttonStyle('/dashboard')} onClick={() => navigate('/dashboard')}>
                        Inicio
                    </Button>
                    <Button sx={buttonStyle('/mapa')} onClick={() => navigate('/mapa')}>
                        Radar de Huellas
                    </Button>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <SignedIn>
                        <Button
                            variant="contained"
                            sx={{
                                ml: 2, mr: 2,
                                bgcolor: 'white',
                                color: 'primary.main',
                                fontWeight: 'bold',
                                '&:hover': { bgcolor: 'grey.100' }
                            }}
                            onClick={() => navigate('/reportar')}
                        >
                            Reportar Mascota
                        </Button>
                        <UserButton afterSignOutUrl="/dashboard" />
                    </SignedIn>

                    <SignedOut>
                        <SignInButton mode="modal">
                            <Button variant="outlined" sx={{ ml: 2, color: 'white', borderColor: 'white' }}>
                                Iniciar Sesión
                            </Button>
                        </SignInButton>
                    </SignedOut>
                </Box>
            </Toolbar>
        </AppBar>
    );
};