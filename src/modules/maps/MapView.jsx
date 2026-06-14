import { useEffect } from 'react';
import {Container,Typography,Box,Paper,CircularProgress,Chip,Alert} from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useGetDashboardQuery } from '../../api/petsApi';
import { fixLeafletIcon, pawIcon } from '../../utils/mapUtils';
import { formatImageBytes } from '../../utils/imageUtils';
import 'leaflet/dist/leaflet.css';
import '../../assets/styles/MapView.css';

export const MapView = () => {
  const { data: mascotas = [], isLoading, error} = useGetDashboardQuery();

  useEffect(() => {
    fixLeafletIcon();
  }, []);

  const defaultPosition = [-33.4489, -70.6693];

  const mascotasConCoordenadas = mascotas.filter((m) => {
    const geo = m.geolocalizacion;
    if (!geo) return false;

    const lat = geo.latitud ?? geo.lat;
    const lng = geo.longitud ?? geo.lon ?? geo.lng;

    return lat != null && lng != null;
  });

  const firstValidPet = mascotasConCoordenadas[0];

  const centerPosition = firstValidPet
    ? [
        firstValidPet.geolocalizacion.latitud ?? firstValidPet.geolocalizacion.lat,
        firstValidPet.geolocalizacion.longitud ??
          firstValidPet.geolocalizacion.lon ??
          firstValidPet.geolocalizacion.lng
      ]
    : defaultPosition;

  if (isLoading) {
    return (
      <Box className="mapview-loading">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" className="mapview-container">
      <Box className="mapview-header">
        <Typography variant="h5" color="primary" fontWeight="bold" className="mapview-title">
          Radar de Huellas
        </Typography>
        <Typography variant="caption" color="text.secondary" className="mapview-subtitle">
          Mascotas reportadas cerca de tu ubicación.
        </Typography>
      </Box>

      {error && (
        <Box className="mapview-error-box">
          <Alert severity="warning" className="mapview-alert">
            No pudimos conectarnos con el servidor para cargar los reportes.
          </Alert>
        </Box>
      )}

      {!error && mascotasConCoordenadas.length === 0 && (
        <Alert severity="info" className="mapview-alert">
          No hay reportes con ubicación disponible para mostrar en el mapa por ahora.
        </Alert>
      )}

      <Paper elevation={2} className="mapview-paper">
        <MapContainer
          center={centerPosition}
          zoom={13}
          className="mapview-map"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {!error &&
            mascotasConCoordenadas.map((item) => {
              const geo = item.geolocalizacion;
              const lat = geo.latitud ?? geo.lat;
              const lng = geo.longitud ?? geo.lon ?? geo.lng;

              return (
                <Marker key={item.id} position={[lat, lng]} icon={pawIcon}>
                  <Popup>
                    <Box className="mapview-popup">
                      <img
                        src={formatImageBytes(item.mascota?.fotoBytes)}
                        alt={item.mascota?.nombre}
                        className="mapview-popup-image"
                      />

                      <Typography variant="subtitle2" fontWeight="bold">
                        {item.mascota?.nombre}
                      </Typography>

                      <Chip
                        label={item.mascota?.estado}
                        size="small"
                        color={item.mascota?.estado === 'PERDIDA' ? 'error' : 'success'}
                        className="mapview-popup-chip"
                      />

                      <Typography variant="caption" display="block">
                        {item.direccion}
                      </Typography>
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