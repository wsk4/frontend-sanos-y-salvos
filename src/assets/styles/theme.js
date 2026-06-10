import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#2D6A4F',
            light: '#52B788',
            dark: '#1B4332',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#1B4332',
        },
        background: {
            default: '#F8F9FA',
            paper: '#FFFFFF',
        },
    },

    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: { fontWeight: 800 },
        h2: { fontWeight: 700 },
        h3: { fontWeight: 700 },
        button: {
            textTransform: 'none',
            fontWeight: 600,
        }
    },

    shape: {
        borderRadius: 12,
    },

    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                margin: 0,
                padding: 0,
                backgroundColor: '#F8F9FA',
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cg fill='%2352B788' fill-opacity='0.3' transform='rotate(-12 60 60) translate(20 18)'%3E%3Ccircle cx='18' cy='24' r='6'/%3E%3Ccircle cx='32' cy='15' r='5'/%3E%3Ccircle cx='46' cy='15' r='5'/%3E%3Ccircle cx='60' cy='24' r='6'/%3E%3Cellipse cx='39' cy='46' rx='15' ry='12'/%3E%3C/g%3E%3C/svg%3E")`,
                backgroundRepeat: 'repeat',
                backgroundSize: '120px 120px',
                width: '100%',
                maxWidth: '100vw',
                overflowX: 'hidden',
                },
                '#root': {
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                },
            },
        },

        MuiContainer: {
            defaultProps: {
                maxWidth: 'lg',
            },
            styleOverrides: {
                root: {
                    paddingLeft: '16px',
                    paddingRight: '16px',
                    '@media (min-width: 600px)': {
                        paddingLeft: '24px',
                        paddingRight: '24px',
                    },
                },
            },
        },

        MuiPaper: {
            styleOverrides: {
                elevation1: {
                    boxShadow: '0px 2px 8px rgba(0,0,0,0.05)',
                },
                rounded: {
                    borderRadius: 12,
                }
            }
        }
    },
});