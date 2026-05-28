import React, { Component } from 'react';
import {
  Box, Button, Container, TextField, Typography, MenuItem, Select,
  InputLabel, FormControl, Alert, CircularProgress, Grid
} from '@mui/material';
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
    this.setState({ errorValidacion: null })
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
      await petsApi.endpoints.registrarUbicacion.initiate(data).unwrap();
      this.setState({ guardadoExitoso: true });
    } catch (error) {
      if (error.data && error.data.mensaje) {
        this.setState({ errorValidacion: error.data.mensaje });
      } else {
        this.setState({ errorValidacion: 'Error al enviar el reporte.' });
      }
    }
  };
  render() {
    const { formData, errorValidacion, guardadoExitoso } = this.state;
    return (
      <Container maxWidth="sm">
        <Box sx={{ mt: 5, p: 4, boxShadow: 3, borderRadius: 2, bgcolor: 'white' }}>
          <Typography variant="h4" color="primary" fontWeight="bold" gutterBottom>
            Reportar Mascota
          </Typography>
          {guardadoExitoso && <Alert severity="success" sx={{ mb: 2 }}>¡Reporte creado! Redirigiendo...</Alert>}
          {errorValidacion && <Alert severity="error" sx={{ mb: 2 }}>{errorValidacion}</Alert>}
          <form onSubmit={this.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField label="Nombre" fullWidth name="nombre" value={formData.nombre} onChange={this.handleChange} required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Raza" fullWidth name="raza" value={formData.raza} onChange={this.handleChange} required />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" fullWidth size="large">
                  Emitir Alerta
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    );
  }
}