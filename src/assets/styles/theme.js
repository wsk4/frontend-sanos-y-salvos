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
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Ctext x='10' y='55' font-size='38' opacity='0.09' transform='rotate(-15 50 50)'%3E%F0%9F%90%BE%3C/text%3E%3C/svg%3E"), url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Ctext x='55' y='100' font-size='28' opacity='0.07' transform='rotate(20 75 80)'%3E%F0%9F%90%BE%3C/text%3E%3C/svg%3E")`,
                    backgroundRepeat: 'repeat',
                    backgroundSize: '100px 100px',
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