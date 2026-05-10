import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from '../modules/dashboard/Dashboard';
import { MapView } from '../modules/maps/MapView';
import { ReportForm } from '../modules/reports/ReportForm';
import { PetDetail } from '../modules/dashboard/PetDetail';
import { Navbar } from '../components/Navbar/Navbar';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <SignedIn>
        <Navbar />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/mascotas/:id" element={<PetDetail />} />
          <Route path="/mapa" element={<MapView />} />
          <Route path="/reportar" element={<ReportForm />} />
          <Route path="/*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </BrowserRouter>
  );
};