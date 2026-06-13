export const reportFormStyles = {
  paper: {
    mt: 6,
    mb: 6,
    p: { xs: 3, md: 5 },
    borderRadius: 4,
    bgcolor: 'white',
  },

  title: {
    mb: 4,
  },

  alert: {
    mb: 3,
    borderRadius: 2,
  },

  photoBox: {
    p: 3,
    border: '2px dashed #ccc',
    borderRadius: 2,
    textAlign: 'center',
    bgcolor: '#fafafa',
    transition: '0.3s',
    '&:hover': {
      borderColor: 'primary.main',
      bgcolor: '#f0f7ff',
    },
  },

  photoButton: {
    mt: 1,
    textTransform: 'none',
    borderRadius: 2,
  },

  selectAdornmentIcon: {
    ml: 1,
  },

  submitButton: {
    py: 1.5,
    fontSize: '1.1rem',
    fontWeight: 'bold',
    borderRadius: 2,
    boxShadow: 3,
  },
};