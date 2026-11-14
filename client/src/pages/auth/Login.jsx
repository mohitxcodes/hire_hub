import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Briefcase, Mail, Lock, LogIn, ArrowRight, Sparkles } from 'lucide-react';
import { loginUser, clearError } from '../../store/slices/authSlice';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated, user, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (isAuthenticated && user) {
      const from = location.state?.from?.pathname;
      if (from) {
        navigate(from, { replace: true });
      } else if (user.role === 'admin') {
        navigate('/admin/dashboard', { replace: true });
      } else if (user.role === 'recruiter') {
        navigate('/recruiter/dashboard', { replace: true });
      } else {
        navigate('/seeker/dashboard', { replace: true });
      }
    }
  }, [isAuthenticated, user, navigate, location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => toast.success('Welcome back to HireHub!'))
      .catch((err) => toast.error(err));
  };

  // Quick 1-click demo login helpers
  const handleQuickLogin = (demoEmail) => {
    setEmail(demoEmail);
    setPassword('password123');
    dispatch(loginUser({ email: demoEmail, password: 'password123' }))
      .unwrap()
      .then(() => toast.success(`Logged in as demo user!`))
      .catch((err) => toast.error(err));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-600 to-violet-600 flex items-center justify-center text-white shadow-md">
            <Briefcase className="w-5 h-5" />
          </div>
          <span className="text-2xl font-black text-secondary-900 tracking-tight">
            Hire<span className="text-primary-600">Hub</span>
          </span>
        </Link>
        <h2 className="text-2xl font-extrabold text-secondary-900">Sign in to your account</h2>
        <p className="mt-1 text-xs text-secondary-500">
          Or{' '}
          <Link to="/register" className="font-semibold text-primary-600 hover:text-primary-500">
            create a new HireHub account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="card p-6 sm:p-8 space-y-6">
          {/* Quick Demo Logins Box */}
          <div className="p-3.5 bg-primary-50/70 rounded-xl border border-primary-100 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-primary-800">
              <Sparkles className="w-3.5 h-3.5 text-primary-600" />
              <span>One-Click Demo Accounts</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin('seeker@hirehub.com')}
                className="py-1.5 px-2 bg-white rounded-lg border border-primary-200 text-[11px] font-semibold text-secondary-800 hover:bg-primary-100 transition-colors"
              >
                Job Seeker
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('recruiter@hirehub.com')}
                className="py-1.5 px-2 bg-white rounded-lg border border-primary-200 text-[11px] font-semibold text-secondary-800 hover:bg-primary-100 transition-colors"
              >
                Recruiter
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('admin@hirehub.com')}
                className="py-1.5 px-2 bg-white rounded-lg border border-primary-200 text-[11px] font-semibold text-secondary-800 hover:bg-primary-100 transition-colors"
              >
                Admin
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-secondary-800 mb-1.5">
                Email address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-secondary-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.com"
                  className="input-field text-xs pl-9 py-2.5"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-secondary-800">Password</label>
                <Link
                  to="/forgot-password"
                  className="text-[11px] font-semibold text-primary-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-secondary-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field text-xs pl-9 py-2.5"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-2.5 text-xs font-bold flex items-center justify-center gap-2 mt-2"
            >
              <LogIn className="w-4 h-4" />
              <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

