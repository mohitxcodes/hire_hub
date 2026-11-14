import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingSpinner from './LoadingSpinner';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Verifying session..." />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // If logged in but wrong role, redirect to appropriate role dashboard
    const target =
      user.role === 'admin'
        ? '/admin/dashboard'
        : user.role === 'recruiter'
        ? '/recruiter/dashboard'
        : '/seeker/dashboard';
    return <Navigate to={target} replace />;
  }

  return children;
};

export default ProtectedRoute;

