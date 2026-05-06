import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#2D6A4F', // Verde Esmeralda principal
            light: '#52B788',
            dark: '#1B4332',
            contrastText: '#ffffff', // Texto blanco sobre botones verdes
        },
        background: {
            default: '#F8F9FA', // Gris casi blanco para el fondo general
            paper: '#FFFFFF', // Blanco puro para las tarjetas (PetCard)
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        button: {
            textTransform: 'none', // Evita que los botones estén en mayúsculas
            fontWeight: 600,
        }
    },
    shape: {
        borderRadius: 8, // Bordes ligeramente redondeados para un look moderno
    }
});