import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { AppLayout } from './layouts/AppLayout';

// Lazy loading pages
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const PatientsInfo = React.lazy(() => import('./pages/Patients'));
const LoginPage = React.lazy(() => import('./pages/Login'));

// Loading component
const PageLoader = () => (
  <div className="flex h-[80vh] w-full flex-col items-center justify-center space-y-4">
    <div className="size-16 animate-spin rounded-full border-4 border-blue-600 border-t-transparent shadow-lg" />
    <span className="text-sm font-bold tracking-widest text-blue-600 uppercase">Healios is loading...</span>
  </div>
);

// Protected Route Guard
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <AppLayout>{children}</AppLayout>;
};

const App: React.FC = () => {
  const { setAuthenticated, setLoading } = useAuthStore();

  useEffect(() => {
    // Simulated auth check
    const checkAuth = async () => {
      setLoading(true);
      const user = localStorage.getItem('user');
      if (user) {
        setAuthenticated(true);
      }
      setLoading(false);
    };
    checkAuth();
  }, [setAuthenticated, setLoading]);

  return (
    <BrowserRouter>
      <React.Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/patients" 
            element={
              <ProtectedRoute>
                <PatientsInfo />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/analytics" 
            element={
              <ProtectedRoute>
                <Dashboard /> {/* Placeholder */}
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/settings" 
            element={
              <ProtectedRoute>
                <div className="flex flex-col items-center justify-center p-20 bg-white rounded-3xl border border-dashed border-slate-300">
                  <h3 className="text-lg font-bold">Settings Module</h3>
                  <p className="text-slate-500">Configure your hospital preferences here.</p>
                </div>
              </ProtectedRoute>
            } 
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
};

export default App;
