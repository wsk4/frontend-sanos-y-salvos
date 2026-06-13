export const petCardStyles = {
  card: {
    width: '100%',
    borderRadius: '14px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    transition: 'transform 200ms ease, box-shadow 200ms ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
    },
  },

  media: {
    objectFit: 'cover',
    maxWidth: '100%',
  },

  content: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    p: 2.5,
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 1.5,
    gap: 1,
  },

  title: {
    fontSize: 'clamp(1.1rem, 2vw, 1.25rem)',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  chip: {
    fontWeight: 'bold',
  },

  breed: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  locationBox: {
    display: 'flex',
    alignItems: 'flex-start',
    color: 'text.secondary',
    mb: 2.5,
    flexGrow: 1,
  },

  locationIcon: {
    mr: 0.5,
    mt: 0.3,
  },

  addressContainer: {
    width: '100%',
    overflow: 'hidden',
  },

  address: {
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    lineHeight: 1.4,
  },

  coordinates: {
    display: 'block',
    mt: 0.5,
  },

  button: {
    mt: 'auto',
    minHeight: '44px',
    height: '44px',
    borderRadius: '8px',
    fontWeight: 'bold',
    textTransform: 'none',
  },
};