import { useState } from 'react';
import {Button,Container,TextField,Typography,MenuItem,Alert,CircularProgress,Stack,Paper,InputAdornment,Box} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { useReportPetMutation } from '../../api/petsApi';

import PetsIcon from '@mui/icons-material/Pets';
import PaletteIcon from '@mui/icons-material/Palette';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CampaignIcon from '@mui/icons-material/Campaign';
import BadgeIcon from '@mui/icons-material/Badge';

import { reportFormStyles as styles } from './ReportForm.styles';

export const ReportForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    raza: '',
    color: '',
    tamano: '',
    contactoInfo: '',
    estado: 'PERDIDA',
    direccion: '',
    foto: null
  });

  const [errorValidacion, setErrorValidacion] = useState(null);
  const [guardadoExitoso, setGuardadoExitoso] = useState(false);

  const navigate = useNavigate();
  const { getToken } = useAuth();
  const [reportPet, { isLoading }] = useReportPetMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, foto: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorValidacion(null);

    const data = new FormData();

    const mascotaData = {
      nombre: formData.nombre,
      raza: formData.raza,
      color: formData.color,
      tamano: formData.tamano,
      estado: formData.estado,
      contactoInfo: formData.contactoInfo,
      direccion: formData.direccion,
    };

    data.append('mascota', JSON.stringify(mascotaData));
    data.append('direccion', formData.direccion);

    if (formData.foto) {
      data.append('archivo', formData.foto);
    }

    try {
      await reportPet(data).unwrap();
      setGuardadoExitoso(true);
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (error) {
      const mensaje =
        error?.data?.mensaje ??
        error?.data?.message ??
        'Error al enviar el reporte.';
      setErrorValidacion(mensaje);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={4} sx={styles.paper}>
        <Typography
          variant="h4"
          align="center"
          color="primary"
          fontWeight="800"
          gutterBottom
          sx={styles.title}
        >
          Reporte de Mascotas
        </Typography>

        {guardadoExitoso && (
          <Alert severity="success" sx={styles.alert}>
            ¡Reporte creado exitosamente! Redirigiendo al inicio...
          </Alert>
        )}

        {errorValidacion && (
          <Alert severity="error" sx={styles.alert}>
            {errorValidacion}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Stack spacing={1}>
            <TextField
              label="Nombre de la Mascota"
              fullWidth
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <BadgeIcon color="action" />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              label="Raza"
              fullWidth
              name="raza"
              value={formData.raza}
              onChange={handleChange}
              required
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PetsIcon color="action" />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              label="Color"
              fullWidth
              name="color"
              value={formData.color}
              onChange={handleChange}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PaletteIcon color="action" />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              select
              label="Tamaño"
              fullWidth
              name="tamano"
              value={formData.tamano}
              onChange={handleChange}
              required
            >
              <MenuItem value="PEQUEÑO">Pequeño</MenuItem>
              <MenuItem value="MEDIANO">Mediano</MenuItem>
              <MenuItem value="GRANDE">Grande</MenuItem>
            </TextField>

            <TextField
              select
              label="Estado"
              fullWidth
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              required
            >
              <MenuItem value="PERDIDA">Perdida</MenuItem>
              <MenuItem value="ENCONTRADA">Encontrada</MenuItem>
            </TextField>

            <TextField
              label="Contacto (Teléfono / Email)"
              fullWidth
              name="contactoInfo"
              value={formData.contactoInfo}
              onChange={handleChange}
              required
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <ContactPhoneIcon color="action" />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              label="Dirección donde fue visto"
              fullWidth
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              required
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnIcon color="error" />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Box sx={styles.photoBox}>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                Sube una foto clara de la mascota
              </Typography>

              <Button
                component="label"
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                sx={styles.photoButton}
                fullWidth
              >
                {formData.foto ? formData.foto.name : 'Seleccionar Imagen'}
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleFileChange}
                  required={!formData.foto}
                />
              </Button>
            </Box>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              disabled={isLoading}
              startIcon={!isLoading && <CampaignIcon />}
              sx={styles.submitButton}
            >
              {isLoading ? (
                <CircularProgress size={28} color="inherit" />
              ) : (
                'Emitir Alerta'
              )}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};