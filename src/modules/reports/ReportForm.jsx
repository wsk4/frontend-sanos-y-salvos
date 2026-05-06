import { useState } from 'react';
import {
  Box, Button, Container, TextField, Typography, MenuItem, Select, InputLabel, FormControl, Alert, CircularProgress, Grid
} from '@mui/material';
import { useReportPetMutation } from '../../api/petsApi';
import { useNavigate } from 'react-router-dom';

export const ReportForm = () => {
  const [reportPet, { isLoading, isSuccess, isError }] = useReportPetMutation();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [raza, setRaza] = useState('');
  const [color, setColor] = useState('');
  const [tamano, setTamano] = useState('');
  const [contactoInfo, setContactoInfo] = useState('');
  const [estado, setEstado] = useState('PERDIDA');
  const [foto, setFoto] = useState(null);

  const handleFileChange = (e) => {
    setFoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    const mascotaData = {
      nombre,
      raza,
      color,
      tamano,
      estado,
      contactoInfo
    };
    formData.append(
      'mascota',
      new Blob([JSON.stringify(mascotaData)], { type: 'application/json' })
    );
    if (foto) {
      formData.append('archivo', foto);
    }
    try {
      await reportPet(formData).unwrap();
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      console.error('Error al registrar la mascota:', error);
    }
  };
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, p: 4, boxShadow: 3, borderRadius: 2, bgcolor: 'white' }}>
        <Typography variant="h4" color="primary" fontWeight="bold" gutterBottom>
          Reportar Mascota
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          Completa los datos para emitir una alerta en la red de Sanos y Salvos.
        </Typography>

        {isSuccess && (
          <Alert severity="success" sx={{ mb: 2 }}>
            ¡Mascota reportada con éxito! Redirigiendo...
          </Alert>
        )}
        {isError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Ocurrió un error al registrar la mascota. Verifica la conexión.
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Nombre de la Mascota"
                fullWidth
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Raza"
                fullWidth
                value={raza}
                onChange={(e) => setRaza(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Color"
                fullWidth
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Tamaño (Ej. Pequeño, Grande)"
                fullWidth
                value={tamano}
                onChange={(e) => setTamano(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Estado</InputLabel>
                <Select
                  value={estado}
                  label="Estado"
                  onChange={(e) => setEstado(e.target.value)}
                >
                  <MenuItem value="PERDIDA">Perdida</MenuItem>
                  <MenuItem value="ENCONTRADA">Encontrada</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Teléfono/Info de Contacto"
                fullWidth
                value={contactoInfo}
                onChange={(e) => setContactoInfo(e.target.value)}
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: 3, mb: 3, p: 2, border: '1px dashed #ccc', borderRadius: 1 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Sube una foto clara de la mascota:
            </Typography>
            <input
              type="file"
              accept="image/jpeg, image/png"
              onChange={handleFileChange}
              required
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            disabled={isLoading}
            sx={{ mt: 1, py: 1.5, fontWeight: 'bold' }}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Emitir Alerta'}
          </Button>
        </form>
      </Box>
    </Container>
  );
};