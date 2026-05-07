import { useEffect } from 'react';
import { Container, Typography, Box, Paper, CircularProgress, Chip } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useGetDashboardQuery } from '../../api/petsApi';
import { fixLeafletIcon, pawIcon } from '../../utils/mapUtils';
import { formatImageBytes } from '../../utils/imageUtils';
import 'leaflet/dist/leaflet.css';

export const MapView = () => {
  const { data: mascotasConsolidadas, isLoading, error } = useGetDashboardQuery();

  useEffect(() => {
    fixLeafletIcon(); 
  }, []);

  
  const position = [-33.4489, -70.6693];

  return (
    <Container maxWidth="xl">
      <Box py={4}>
        <Typography variant="h4" color="primary" fontWeight="bold" gutterBottom>
          📍 Radar de Huellas
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={3}>
          Visualiza en tiempo real las zonas con reportes activos de mascotas.
        </Typography>

        {isLoading ? (
          <Box display="flex" justifyContent="center" py={10}><CircularProgress /></Box>
        ) : error ? (
          <Typography color="error">Error al cargar los puntos geográficos.</Typography>
        ) : (
          <Paper elevation={4} sx={{ height: '70vh', borderRadius: 4, overflow: 'hidden', border: '4px solid white' }}>
            <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {mascotasConsolidadas?.map((item) => {
                if (!item.geolocalizacion) return null;

                return (
                  <Marker 
                    key={item.mascota.id} 
                    position={[item.geolocalizacion.latitud, item.geolocalizacion.longitud]}
                    icon={pawIcon}
                  >
                    <Popup>
                      <Box sx={{ textAlign: 'center', p: 1 }}>
                        <img 
                          src={formatImageBytes(item.mascota.fotoBytes)} 
                          alt={item.mascota.nombre} 
                          style={{ width: '100px', borderRadius: '8px', marginBottom: '8px' }} 
                        />
                        <Typography variant="subtitle1" fontWeight="bold">
                          {item.mascota.nombre}
                        </Typography>
                        <Chip 
                          label={item.mascota.estado} 
                          size="small" 
                          color={item.mascota.estado === 'PERDIDA' ? 'error' : 'success'} 
                          sx={{ mb: 1 }}
                        />
                        <Typography variant="body2">
                          {item.mascota.raza}
                        </Typography>
                        <Typography variant="caption" display="block" sx={{ mt: 1, color: 'gray' }}>
                          Reportado en: {item.geolocalizacion.direccionDesc}
                        </Typography>
                      </Box>
                    </Popup>
                  </Marker>
                );
              })}
            </MapContainer>
          </Paper>
        )}
      </Box>
    </Container>
  );
};