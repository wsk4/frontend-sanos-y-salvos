import React, { Component } from 'react';
import {
  Box, Button, Container, TextField, Typography, MenuItem, Select,
  InputLabel, FormControl, Alert, CircularProgress, Grid
} from '@mui/material';
import { store } from '../../app/store';
import { petsApi } from '../../api/petsApi';

export class ReportForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        nombre: '',
        raza: '',
        color: '',
        tamano: '',
        contactoInfo: '',
        estado: 'PERDIDA',
        direccion: '',
        foto: null
      },
      isLoading: false,
      errorValidacion: null,
      guardadoExitoso: false
    };
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      formData: { ...prevState.formData, [name]: value }
    }));
  };
  handleFileChange = (e) => {
    this.setState(prevState => ({
      formData: { ...prevState.formData, foto: e.target.files[0] }
    }));
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.state.guardadoExitoso && !prevState.guardadoExitoso) {
      setTimeout(() => window.location.href = '/dashboard', 2000);
    }
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ errorValidacion: null, isLoading: true });
    const { formData } = this.state;
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
      // Así se dispara un endpoint de RTK Query desde un Class Component:
      // se usa store.dispatch con el thunk que genera initiate()
      await store.dispatch(
        petsApi.endpoints.reportPet.initiate(data)
      ).unwrap();
      this.setState({ guardadoExitoso: true });
    } catch (error) {
      const mensaje = error?.data?.mensaje
        ?? error?.data?.message
        ?? 'Error al enviar el reporte.';
      this.setState({ errorValidacion: mensaje });
    } finally {
      this.setState({ isLoading: false });
    }
  };
  render() {
    const { formData, errorValidacion, guardadoExitoso, isLoading } = this.state;
    return (
      <Container maxWidth="sm">
        <Box sx={{ mt: 5, p: 4, boxShadow: 3, borderRadius: 2, bgcolor: 'white' }}>
          <Typography variant="h4" color="primary" fontWeight="bold" gutterBottom>
            Reportar Mascota
          </Typography>
          {guardadoExitoso && (
            <Alert severity="success" sx={{ mb: 2 }}>¡Reporte creado! Redirigiendo...</Alert>
          )}
          {errorValidacion && (
            <Alert severity="error" sx={{ mb: 2 }}>{errorValidacion}</Alert>
          )}
          <form onSubmit={this.handleSubmit}>
            <Grid container spacing={2}>
              {/* Nombre */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Nombre"
                  fullWidth
                  name="nombre"
                  value={formData.nombre}
                  onChange={this.handleChange}
                  required
                />
              </Grid>
              {/* Raza */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Raza"
                  fullWidth
                  name="raza"
                  value={formData.raza}
                  onChange={this.handleChange}
                  required
                />
              </Grid>
              {/* Color */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Color"
                  fullWidth
                  name="color"
                  value={formData.color}
                  onChange={this.handleChange}
                />
              </Grid>
              {/* Tamaño */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Tamaño</InputLabel>
                  <Select
                    name="tamano"
                    value={formData.tamano}
                    label="Tamaño"
                    onChange={this.handleChange}
                  >
                    <MenuItem value="PEQUEÑO">Pequeño</MenuItem>
                    <MenuItem value="MEDIANO">Mediano</MenuItem>
                    <MenuItem value="GRANDE">Grande</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {/* Estado */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Estado</InputLabel>
                  <Select
                    name="estado"
                    value={formData.estado}
                    label="Estado"
                    onChange={this.handleChange}
                  >
                    <MenuItem value="PERDIDA">Perdida</MenuItem>
                    <MenuItem value="ENCONTRADA">Encontrada</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {/* Contacto */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Contacto (Teléfono / Email)"
                  fullWidth
                  name="contactoInfo"
                  value={formData.contactoInfo}
                  onChange={this.handleChange}
                  required
                />
              </Grid>
              {/* Dirección */}
              <Grid item xs={12}>
                <TextField
                  label="Dirección donde fue visto"
                  fullWidth
                  name="direccion"
                  value={formData.direccion}
                  onChange={this.handleChange}
                  required
                />
              </Grid>
              {/* Foto */}
              <Grid item xs={12}>
                <Box sx={{ p: 2, border: '1px dashed #ccc', borderRadius: 1 }}>
                  <Typography variant="body2" mb={1}>Foto de la mascota:</Typography>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={this.handleFileChange}
                    required
                  />
                </Box>
              </Grid>
              {/* Botón */}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  disabled={isLoading}
                >
                  {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Emitir Alerta'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    );
  }
}