import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

export const Navbar = () => {
    const navigate = useNavigate();

    return (
        <AppBar position="static" color="primary" elevation={1}>
            <Toolbar>
                <Typography
                    variant="h5"
                    component="div"
                    sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                    onClick={() => navigate('/dashboard')}
                >
                    🐾 Sanos y Salvos
                </Typography>

                <Box sx={{ flexGrow: 1 }} />

                <Button color="inherit" onClick={() => navigate('/dashboard')}>Dashboard</Button>
                <Button color="inherit" onClick={() => navigate('/mapa')}>Radar de Huellas</Button>

                <SignedIn>
                    <Button
                        variant="contained"
                        sx={{ ml: 2, mr: 2, bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: 'grey.100' } }}
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

            </Toolbar>
        </AppBar>
    );
};