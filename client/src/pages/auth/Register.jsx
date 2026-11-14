import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Briefcase, Mail, Lock, User, Building, MapPin, Phone, UserCheck } from 'lucide-react';
import { registerUser } from '../../store/slices/authSlice';
import toast from 'react-hot-toast';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [role, setRole] = useState(searchParams.get('role') === 'recruiter' ? 'recruiter' : 'jobseeker');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    location: '',
    companyName: '',
    industry: 'Technology',
  });

  const { loading } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      toast.error('Please fill in all required fields');
      return;
    }
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    dispatch(
      registerUser({
        ...formData,
        role,
      })
    )
      .unwrap()
      .then((res) => {
        toast.success('Registration successful! Welcome to HireHub.');
        if (role === 'recruiter') {
          navigate('/recruiter/dashboard');
        } else {
          navigate('/seeker/dashboard');
        }
      })
      .catch((err) => toast.error(err));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg text-center">
        <Link to="/" className="inline-flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-600 to-violet-600 flex items-center justify-center text-white shadow-md">
            <Briefcase className="w-5 h-5" />
          </div>
          <span className="text-2xl font-black text-secondary-900 tracking-tight">
            Hire<span className="text-primary-600">Hub</span>
          </span>
        </Link>
        <h2 className="text-2xl font-extrabold text-secondary-900">Create your HireHub account</h2>
        <p className="mt-1 text-xs text-secondary-500">
          Already registered?{' '}
          <Link to="/login" className="font-semibold text-primary-600 hover:text-primary-500">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg px-4">
        <div className="card p-6 sm:p-8 space-y-6">
          {/* Role Switcher Tabs */}
          <div>
            <label className="block text-xs font-bold text-secondary-800 mb-2">I am registering as:</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('jobseeker')}
                className={`py-3 px-4 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                  role === 'jobseeker'
                    ? 'bg-primary-50 text-primary-700 border-primary-500 shadow-xs'
                    : 'bg-white text-secondary-600 border-secondary-200 hover:bg-secondary-50'
                }`}
              >
                <UserCheck className="w-4 h-4 text-primary-600" />
                <span>Job Seeker</span>
              </button>

              <button
                type="button"
                onClick={() => setRole('recruiter')}
                className={`py-3 px-4 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                  role === 'recruiter'
                    ? 'bg-primary-50 text-primary-700 border-primary-500 shadow-xs'
                    : 'bg-white text-secondary-600 border-secondary-200 hover:bg-secondary-50'
                }`}
              >
                <Building className="w-4 h-4 text-primary-600" />
                <span>Employer / Recruiter</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-secondary-800 mb-1.5">
                Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-secondary-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Mohit Kumar"
                  className="input-field text-xs pl-9 py-2.5"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-secondary-800 mb-1.5">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-secondary-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@example.com"
                  className="input-field text-xs pl-9 py-2.5"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-secondary-800 mb-1.5">
                Password (min 6 characters) *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-secondary-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="input-field text-xs pl-9 py-2.5"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-secondary-800 mb-1.5">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-secondary-400 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 9876543210"
                    className="input-field text-xs pl-9 py-2.5"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-secondary-800 mb-1.5">
                  Location (City, Country)
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-secondary-400 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Chandigarh, India"
                    className="input-field text-xs pl-9 py-2.5"
                  />
                </div>
              </div>
            </div>

            {/* Recruiter-Specific Fields */}
            {role === 'recruiter' && (
              <div className="p-4 bg-secondary-50 rounded-xl border border-secondary-200 space-y-4">
                <h4 className="text-xs font-bold text-secondary-900 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-primary-600" />
                  Company Details
                </h4>

                <div>
                  <label className="block text-xs font-bold text-secondary-800 mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required={role === 'recruiter'}
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="e.g. Acme Tech Innovations"
                    className="input-field text-xs py-2 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-secondary-800 mb-1">
                    Industry Sector
                  </label>
                  <select
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="input-field text-xs py-2 bg-white"
                  >
                    <option value="Technology">Technology & Software</option>
                    <option value="Fintech">Financial Technology (Fintech)</option>
                    <option value="Entertainment">Entertainment & Streaming</option>
                    <option value="Travel & Hospitality">Travel & Hospitality</option>
                    <option value="Healthcare">Healthcare & Biotech</option>
                    <option value="E-Commerce">E-Commerce & Retail</option>
                  </select>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-2.5 text-xs font-bold mt-4"
            >
              {loading ? 'Creating Account...' : 'Complete Registration'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

