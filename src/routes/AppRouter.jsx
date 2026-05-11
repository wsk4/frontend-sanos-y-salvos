import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from '../modules/dashboard/Dashboard';
import { MapView } from '../modules/maps/MapView';
import { ReportForm } from '../modules/reports/ReportForm';
import { PetDetail } from '../modules/dashboard/PetDetail';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/mascotas/:id" element={<PetDetail />} />
      <Route
        path="/mapa"
        element={
          <>
            <SignedIn> <MapView /> </SignedIn>
            <SignedOut> <RedirectToSignIn /> </SignedOut>
          </>
        }
      />
      <Route
        path="/reportar"
        element={
          <>
            <SignedIn> <ReportForm /> </SignedIn>
            <SignedOut> <RedirectToSignIn /> </SignedOut>
          </>
        }
      />
      <Route path="/*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};