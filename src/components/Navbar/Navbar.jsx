import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

import logoSanosYSalvos from '../../assets/SANOS_Y_SALVOS.webp'; 

export const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const buttonStyle = (path) => ({
    });

    return (
        <AppBar position="sticky" color="primary" elevation={3}>
            <Toolbar>
                <Typography
                    variant="h5"
                    component="div"
                    sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', cursor: 'pointer', flexShrink: 0, gap: 1 }}
                    onClick={() => navigate('/dashboard')}
                >
                    <Box 
                        component="img"
                        src={logoSanosYSalvos}
                        alt="Logo de Sanos y Salvos"
                        sx={{ height: 100, width: 'auto' }} 
                    />
                    Sanos y Salvos
                </Typography>
            </Toolbar>
        </AppBar>
    );
};