import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Building, Save, Globe, MapPin, UploadCloud } from 'lucide-react';
import { fetchMyCompany, updateCompany } from '../../store/slices/companySlice';
import DashboardLayout from '../../components/layout/DashboardLayout';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import toast from 'react-hot-toast';

const CompanyProfile = () => {
  const dispatch = useDispatch();
  const { recruiterCompany, loading } = useSelector((state) => state.companies);

  const [formData, setFormData] = useState({
    name: '',
    website: '',
    location: '',
    industry: 'Technology',
    companySize: '11-50',
    description: '',
    logo: '',
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    dispatch(fetchMyCompany());
  }, [dispatch]);

  useEffect(() => {
    if (recruiterCompany) {
      setFormData({
        name: recruiterCompany.name || '',
        website: recruiterCompany.website || '',
        location: recruiterCompany.location || '',
        industry: recruiterCompany.industry || 'Technology',
        companySize: recruiterCompany.companySize || '11-50',
        description: recruiterCompany.description || '',
        logo: recruiterCompany.logo || '',
      });
    }
  }, [recruiterCompany]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    dispatch(updateCompany(formData))
      .unwrap()
      .then(() => toast.success('Company profile updated successfully!'))
      .catch((err) => toast.error(err))
      .finally(() => setSaving(false));
  };

  return (
    <DashboardLayout title="Company Profile & Branding">
      <div className="max-w-4xl mx-auto space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="card p-6 sm:p-8 space-y-4">
            <h3 className="text-base font-bold text-secondary-900 border-b border-secondary-100 pb-3 flex items-center gap-2">
              <Building className="w-5 h-5 text-primary-600" />
              Employer Identity
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-secondary-800 mb-1.5">
                  Company Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-field text-xs py-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-secondary-800 mb-1.5">
                  Company Website URL
                </label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://company.com"
                  className="input-field text-xs py-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-secondary-800 mb-1.5">
                  Headquarters Location
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. San Francisco, CA"
                  className="input-field text-xs py-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-secondary-800 mb-1.5">
                  Industry Sector
                </label>
                <select
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="input-field text-xs py-2.5"
                >
                  <option value="Technology">Technology</option>
                  <option value="Fintech">Fintech</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Travel & Hospitality">Travel & Hospitality</option>
                  <option value="Healthcare">Healthcare</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-secondary-800 mb-1.5">
                  Company Size
                </label>
                <select
                  value={formData.companySize}
                  onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                  className="input-field text-xs py-2.5"
                >
                  <option value="1-10">1-10 Employees</option>
                  <option value="11-50">11-50 Employees</option>
                  <option value="51-200">51-200 Employees</option>
                  <option value="201-500">201-500 Employees</option>
                  <option value="501-1000">501-1000 Employees</option>
                  <option value="1000+">1000+ Employees</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-secondary-800 mb-1.5">
                  Logo Image URL
                </label>
                <input
                  type="url"
                  value={formData.logo}
                  onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                  placeholder="https://.../logo.png"
                  className="input-field text-xs py-2.5"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-secondary-800 mb-1.5">
                About the Company & Culture
              </label>
              <textarea
                rows={4}
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Share your mission, core tech stack, and benefits..."
                className="input-field text-xs resize-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="submit"
              disabled={saving}
              className="btn-primary text-xs py-2.5 px-8 font-bold flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save Profile'}</span>
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default CompanyProfile;

