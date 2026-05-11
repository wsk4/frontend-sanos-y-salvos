import { Container, Box, Paper, CircularProgress } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useGetDashboardQuery } from '../../api/petsApi';
import 'leaflet/dist/leaflet.css';

export const MapView = () => {
  const { data: mascotas = [], isLoading } = useGetDashboardQuery();
  const position = [-33.4489, -70.6693];

  return (
    <Container maxWidth={false} disableGutters sx={{ height: 'calc(100vh - 64px)' }}>
      {isLoading ? (
        <Box display="flex" justifyContent="center" py={10}><CircularProgress /></Box>
      ) : (
        <Box sx={{ height: '100%', width: '100%' }}>
          <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </MapContainer>
        </Box>
      )}
    </Container>
  );
};