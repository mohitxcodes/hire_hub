import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadUser } from './store/slices/authSlice';

// Protected Route Component
import ProtectedRoute from './components/common/ProtectedRoute';

// Public Pages
import LandingPage from './pages/public/LandingPage';
import BrowseJobs from './pages/public/BrowseJobs';
import JobDetails from './pages/public/JobDetails';
import Companies from './pages/public/Companies';
import CompanyDetails from './pages/public/CompanyDetails';
import AboutUs from './pages/public/AboutUs';
import ContactUs from './pages/public/ContactUs';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';

// Job Seeker Dashboard Pages
import SeekerDashboard from './pages/seeker/SeekerDashboard';
import SeekerProfile from './pages/seeker/SeekerProfile';
import SeekerEditProfile from './pages/seeker/SeekerEditProfile';
import SeekerSavedJobs from './pages/seeker/SeekerSavedJobs';
import SeekerApplications from './pages/seeker/SeekerApplications';
import SeekerResume from './pages/seeker/SeekerResume';
import SeekerAlerts from './pages/seeker/SeekerAlerts';
import SeekerSettings from './pages/seeker/SeekerSettings';

// Recruiter Dashboard Pages
import RecruiterDashboard from './pages/recruiter/RecruiterDashboard';
import PostJob from './pages/recruiter/PostJob';
import ManageJobs from './pages/recruiter/ManageJobs';
import EditJob from './pages/recruiter/EditJob';
import Applicants from './pages/recruiter/Applicants';
import RecruiterAnalytics from './pages/recruiter/RecruiterAnalytics';
import CompanyProfile from './pages/recruiter/CompanyProfile';

// Admin Dashboard Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminJobs from './pages/admin/AdminJobs';
import AdminCompanies from './pages/admin/AdminCompanies';
import AdminReports from './pages/admin/AdminReports';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('hirehub_token')) {
      dispatch(loadUser());
    }
  }, [dispatch]);

  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/jobs" element={<BrowseJobs />} />
      <Route path="/jobs/:id" element={<JobDetails />} />
      <Route path="/companies" element={<Companies />} />
      <Route path="/companies/:id" element={<CompanyDetails />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<ContactUs />} />

      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      {/* Job Seeker Protected Routes */}
      <Route
        path="/seeker/dashboard"
        element={
          <ProtectedRoute allowedRoles={['jobseeker']}>
            <SeekerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/seeker/profile"
        element={
          <ProtectedRoute allowedRoles={['jobseeker']}>
            <SeekerProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/seeker/edit-profile"
        element={
          <ProtectedRoute allowedRoles={['jobseeker']}>
            <SeekerEditProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/seeker/saved-jobs"
        element={
          <ProtectedRoute allowedRoles={['jobseeker']}>
            <SeekerSavedJobs />
          </ProtectedRoute>
        }
      />
      <Route
        path="/seeker/applications"
        element={
          <ProtectedRoute allowedRoles={['jobseeker']}>
            <SeekerApplications />
          </ProtectedRoute>
        }
      />
      <Route
        path="/seeker/resume"
        element={
          <ProtectedRoute allowedRoles={['jobseeker']}>
            <SeekerResume />
          </ProtectedRoute>
        }
      />
      <Route
        path="/seeker/alerts"
        element={
          <ProtectedRoute allowedRoles={['jobseeker']}>
            <SeekerAlerts />
          </ProtectedRoute>
        }
      />
      <Route
        path="/seeker/settings"
        element={
          <ProtectedRoute allowedRoles={['jobseeker']}>
            <SeekerSettings />
          </ProtectedRoute>
        }
      />

      {/* Recruiter Protected Routes */}
      <Route
        path="/recruiter/dashboard"
        element={
          <ProtectedRoute allowedRoles={['recruiter', 'admin']}>
            <RecruiterDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/recruiter/post-job"
        element={
          <ProtectedRoute allowedRoles={['recruiter', 'admin']}>
            <PostJob />
          </ProtectedRoute>
        }
      />
      <Route
        path="/recruiter/jobs"
        element={
          <ProtectedRoute allowedRoles={['recruiter', 'admin']}>
            <ManageJobs />
          </ProtectedRoute>
        }
      />
      <Route
        path="/recruiter/edit-job/:id"
        element={
          <ProtectedRoute allowedRoles={['recruiter', 'admin']}>
            <EditJob />
          </ProtectedRoute>
        }
      />
      <Route
        path="/recruiter/applicants"
        element={
          <ProtectedRoute allowedRoles={['recruiter', 'admin']}>
            <Applicants />
          </ProtectedRoute>
        }
      />
      <Route
        path="/recruiter/analytics"
        element={
          <ProtectedRoute allowedRoles={['recruiter', 'admin']}>
            <RecruiterAnalytics />
          </ProtectedRoute>
        }
      />
      <Route
        path="/recruiter/company"
        element={
          <ProtectedRoute allowedRoles={['recruiter', 'admin']}>
            <CompanyProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/recruiter/settings"
        element={
          <ProtectedRoute allowedRoles={['recruiter', 'admin']}>
            <SeekerSettings />
          </ProtectedRoute>
        }
      />

      {/* Admin Protected Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminUsers />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/jobs"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminJobs />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/companies"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminCompanies />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/reports"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminReports />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/settings"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <SeekerSettings />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;

