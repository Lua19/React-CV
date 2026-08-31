import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { apiClient } from '../services/apiService';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    let isMounted = true;

    const verifyAuth = async () => {
      const token = sessionStorage.getItem('token');
      if (!token) {
        if (isMounted) setIsAuthenticated(false);
        return;
      }

      try {
        const data = await apiClient.verifyToken(token);
        const isValid = data?.valid === true || data?.Valid === true;
        const hasAdminRights = data?.adminRights === true || data?.AdminRights === true;

        if (isMounted) {
          if (isValid && hasAdminRights) {
            setIsAuthenticated(true);
          } else {
            sessionStorage.removeItem('token');
            setIsAuthenticated(false);
          }
        }
      } catch (error) {
        console.error('Route authentication check failed:', error);
        if (isMounted) {
          sessionStorage.removeItem('token');
          setIsAuthenticated(false);
        }
      }
    };

    verifyAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  // While verification is in progress
  if (isAuthenticated === null) {
    return (
      <section className="section dashboard-section" style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontSize: '1.2rem', color: '#ffffff' }}>Verifying authorization...</p>
      </section>
    );
  }

  // If not authenticated or not an admin, redirect to home
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

