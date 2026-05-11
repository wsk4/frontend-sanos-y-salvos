import { useState, useEffect } from 'react';
import {
  Box, Button, Container, TextField, Typography, MenuItem, Select,
  InputLabel, FormControl, Alert, CircularProgress, Grid
} from '@mui/material';
import { useReportPetMutation } from '../../api/petsApi';
import { useNavigate } from 'react-router-dom';

export const ReportForm = () => {
  const [reportPet, { isLoading, isSuccess, isError }] = useReportPetMutation();
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, foto: e.target.files[0] }));
  };

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => navigate('/dashboard'), 2000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    const mascotaData = {
      nombre: formData.nombre,
      raza: formData.raza,
      color: formData.color,
      tamano: formData.tamano,
      estado: formData.estado,
      contactoInfo: formData.contactoInfo
    };

    data.append('mascota', JSON.stringify(mascotaData));
    data.append('direccion', formData.direccion);

    if (formData.foto) {
      data.append('archivo', formData.foto);
    }

    try {
      await reportPet(data).unwrap();
    } catch (error) {
      console.error('Error en el reporte:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, p: 4, boxShadow: 3, borderRadius: 2, bgcolor: 'white' }}>
        <Typography variant="h4" color="primary" fontWeight="bold" gutterBottom>
          Reportar Mascota
        </Typography>

        {isSuccess && <Alert severity="success" sx={{ mb: 2 }}>¡Reporte creado! Redirigiendo...</Alert>}
        {isError && <Alert severity="error" sx={{ mb: 2 }}>Error al enviar. Revisa los datos e intenta nuevamente.</Alert>}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField label="Nombre" fullWidth name="nombre" value={formData.nombre} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Raza" fullWidth name="raza" value={formData.raza} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Estado</InputLabel>
                <Select name="estado" value={formData.estado} label="Estado" onChange={handleChange}>
                  <MenuItem value="PERDIDA">Perdida</MenuItem>
                  <MenuItem value="ENCONTRADA">Encontrada</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Contacto (Teléfono / Email)"
                fullWidth
                name="contactoInfo"
                value={formData.contactoInfo}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Dirección donde fue visto" fullWidth name="direccion" value={formData.direccion} onChange={handleChange} required />
            </Grid>
          </Grid>

          <Box sx={{ mt: 3, mb: 3, p: 2, border: '1px dashed #ccc', borderRadius: 1 }}>
            <Typography variant="body2" mb={1}>Foto de la mascota:</Typography>
            <input type="file" accept="image/*" onChange={handleFileChange} required />
          </Box>

          <Button type="submit" variant="contained" fullWidth size="large" disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} /> : 'Emitir Alerta'}
          </Button>
        </form>
      </Box>
    </Container>
  );
};