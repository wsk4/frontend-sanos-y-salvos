// src/components/Navbar/Navbar.jsx
import { AppBar, Toolbar, Typography, Button, Box, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

import logoSanosYSalvos from '../../assets/SANOS_Y_SALVOS.webp';
import '../../assets/styles/Navbar.css';

export const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    // Hooks para detectar si la pantalla es tamaño 'sm' (móvil, menor a 600px)
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const isActive = (path) => location.pathname === path;

    return (
        <AppBar position="sticky" color="primary" elevation={3}>
            <Toolbar className="navbar-toolbar">
                <Typography
                    variant="h6"
                    component="div"
                    className="navbar-logo-container"
                    onClick={() => navigate('/dashboard')}
                >
                    <Box 
                        component="img"
                        src={logoSanosYSalvos}
                        alt="Logo de Sanos y Salvos"
                        className="navbar-logo-img"
                    />
                    {/* Ocultamos el texto del título en pantallas pequeñas para ahorrar espacio */}
                    {!isMobile && <span className="navbar-title">Sanos y Salvos</span>}
                </Typography>

                <Box className="navbar-links-container">
                    <Button 
                        className={`navbar-link-button ${isActive('/dashboard') ? 'active' : ''}`}
                        onClick={() => navigate('/dashboard')}
                    >
                        Inicio
                    </Button>
                    <Button 
                        className={`navbar-link-button ${isActive('/mapa') ? 'active' : ''}`}
                        onClick={() => navigate('/mapa')}
                    >
                        {/* Texto dinámico dependiendo del tamaño de pantalla */}
                        {isMobile ? 'Radar' : 'Radar de Huellas'}
                    </Button>
                </Box>

                <Box className="navbar-actions-container">
                    <SignedIn>
                        <Button
                            variant="contained"
                            className="navbar-report-button"
                            onClick={() => navigate('/reportar')}
                        >
                            {/* Texto dinámico */}
                            {isMobile ? 'Reportar' : 'Reportar Mascota'}
                        </Button>
                        <UserButton afterSignOutUrl="/dashboard" />
                    </SignedIn>

                    <SignedOut>
                        <SignInButton mode="modal">
                            <Button variant="outlined" className="navbar-login-button">
                                {isMobile ? 'Ingresar' : 'Iniciar Sesión'}
                            </Button>
                        </SignInButton>
                    </SignedOut>
                </Box>
            </Toolbar>
        </AppBar>
    );
};