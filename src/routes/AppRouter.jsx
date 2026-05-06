import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from '../modules/dashboard/Dashboard';
import { MapView } from '../modules/maps/MapView';
import { ReportForm } from '../modules/reports/ReportForm';
import { Navbar } from '../components/Navbar/Navbar';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navbar />
      
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/mapa" element={<MapView />} />
        <Route path="/reportar" element={<ReportForm />} />
        
        <Route path="/*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};