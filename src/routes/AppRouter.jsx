import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from '../modules/dashboard/Dashboard';
import { MapView } from '../modules/maps/MapView';
import { ReportForm } from '../modules/reports/ReportForm';
import { Navbar } from '../components/Navbar/Navbar';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/mapa" element={<MapView />} />
        <Route
          path="/reportar"
          element={
            <>
              <SignedIn>
                <ReportForm />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route path="/*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};