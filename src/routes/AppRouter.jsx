import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from '../modules/dashboard/Dashboard';
import { MapView } from '../modules/maps/MapView';
import { ReportForm } from '../modules/reports/ReportForm';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      {/* Aquí irá el Navbar genérico más adelante (Fase 3) */}
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/mapa" element={<MapView />} />
        <Route path="/reportar" element={<ReportForm />} />
        
        {/* Ruta por defecto: Redirige al dashboard si entran a la raíz '/' */}
        <Route path="/*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};