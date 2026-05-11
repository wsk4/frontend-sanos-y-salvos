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

  const position = [-33.4489, -70.6693];

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Box mb={2}>
        <Typography variant="h5" color="primary" fontWeight="bold">
          📍 Radar de Huellas
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Zonas con reportes activos de mascotas.
        </Typography>
      </Box>

      {isLoading ? (
        <Box display="flex" justifyContent="center" py={5}><CircularProgress /></Box>
      ) : error ? (
        <Typography color="error" variant="body2">Error al cargar los puntos geográficos.</Typography>
      ) : (
        <Paper
          elevation={2}
          sx={{
            height: '70vh',
            borderRadius: 3,
            overflow: 'hidden',
            border: '2px solid white'
          }}
        >
          <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='&copy; OpenStreetMap'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {mascotas.map((item) => {
              if (!item.geolocalizacion) return null;

              const { mascota, geolocalizacion, direccion, id } = item;

              return (
                <Marker
                  key={id}
                  position={[geolocalizacion.latitud, geolocalizacion.longitud]}
                  icon={pawIcon}
                >
                  <Popup>
                    <Box sx={{ textAlign: 'center', width: 120 }}> {/* Ancho de popup controlado */}
                      <img
                        src={formatImageBytes(mascota.fotoBytes)}
                        alt={mascota.nombre}
                        style={{ width: '100%', borderRadius: '4px', marginBottom: '4px' }}
                      />
                      <Typography variant="subtitle2" fontWeight="bold" lineHeight={1.2}>
                        {mascota.nombre}
                      </Typography>
                      <Chip
                        label={mascota.estado}
                        size="small"
                        color={mascota.estado === 'PERDIDA' ? 'error' : 'success'}
                        sx={{ height: 16, fontSize: '10px', my: 0.5 }}
                      />
                      <Typography variant="caption" display="block" sx={{ color: 'gray', fontSize: '10px' }}>
                        {direccion}
                      </Typography>
                    </Box>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </Paper>
      )}
    </Container>
  );
};