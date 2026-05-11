import { useEffect } from 'react';
import { Container, Typography, Box, Paper, CircularProgress, Chip } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useGetDashboardQuery } from '../../api/petsApi';
import { fixLeafletIcon, pawIcon } from '../../utils/mapUtils';
import { formatImageBytes } from '../../utils/imageUtils';
import 'leaflet/dist/leaflet.css';

export const MapView = () => {
  const { data: mascotas = [], isLoading, error } = useGetDashboardQuery();

  useEffect(() => {
    fixLeafletIcon();
  }, []);

  const defaultPosition = [-33.4489, -70.6693];

  const firstValidPet = mascotas.find(m => m.geolocalizacion?.latitud || m.geolocalizacion?.lat);
  const centerPosition = firstValidPet
    ? [firstValidPet.geolocalizacion.latitud || firstValidPet.geolocalizacion.lat,
    firstValidPet.geolocalizacion.longitud || firstValidPet.geolocalizacion.lon]
    : defaultPosition;

  if (isLoading) return <Box display="flex" justifyContent="center" py={10}><CircularProgress /></Box>;

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Box mb={2}>
        <Typography variant="h5" color="primary" fontWeight="bold">📍 Radar de Huellas</Typography>
        <Typography variant="caption" color="text.secondary">Mascotas reportadas cerca de tu ubicación.</Typography>
      </Box>

      <Paper elevation={2} sx={{ height: '60vh', borderRadius: 4, overflow: 'hidden', border: '1px solid #eee' }}>
        <MapContainer
          center={centerPosition}
          zoom={13}
          style={{ height: '100%', width: '100%', zIndex: 1 }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {mascotas.map((item) => {
            const geo = item.geolocalizacion;
            if (!geo) return null;

            const lat = geo.latitud || geo.lat;
            const lng = geo.longitud || geo.lon || geo.lng;

            if (!lat || !lng) return null;

            return (
              <Marker key={item.id} position={[lat, lng]} icon={pawIcon}>
                <Popup>
                  <Box sx={{ textAlign: 'center', width: 140 }}>
                    <img
                      src={formatImageBytes(item.mascota?.fotoBytes)}
                      alt={item.mascota?.nombre}
                      style={{ width: '100%', borderRadius: '8px', marginBottom: '8px' }}
                    />
                    <Typography variant="subtitle2" fontWeight="bold">{item.mascota?.nombre}</Typography>
                    <Chip
                      label={item.mascota?.estado}
                      size="small"
                      color={item.mascota?.estado === 'PERDIDA' ? 'error' : 'success'}
                      sx={{ height: 20, fontSize: '10px', my: 1 }}
                    />
                    <Typography variant="caption" display="block">{item.direccion}</Typography>
                  </Box>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </Paper>
    </Container>
  );
};