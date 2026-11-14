import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Save, ArrowLeft } from 'lucide-react';
import { updateJob } from '../../store/slices/jobSlice';
import API from '../../services/api';
import DashboardLayout from '../../components/layout/DashboardLayout';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import toast from 'react-hot-toast';

const EditJob = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    API.get(`/jobs/${id}`)
      .then((res) => {
        setFormData(res.data.job);
        setLoading(false);
      })
      .catch((err) => {
        toast.error('Failed to load job details');
        navigate('/recruiter/jobs');
      });
  }, [id, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    dispatch(updateJob({ id, jobData: formData }))
      .unwrap()
      .then(() => {
        toast.success('Job posting updated successfully!');
        navigate('/recruiter/jobs');
      })
      .catch((err) => toast.error(err))
      .finally(() => setSaving(false));
  };

  if (loading || !formData) {
    return (
      <DashboardLayout title="Edit Job">
        <LoadingSpinner size="lg" text="Loading vacancy specs..." />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title={`Edit: ${formData.title}`}>
      <div className="max-w-4xl mx-auto space-y-6">
        <button
          onClick={() => navigate('/recruiter/jobs')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary-500 hover:text-primary-600 mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Manage Jobs</span>
        </button>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="card p-6 sm:p-8 space-y-4">
            <h3 className="text-base font-bold text-secondary-900 border-b border-secondary-100 pb-3">
              Job Details
            </h3>

            <div>
              <label className="block text-xs font-bold text-secondary-800 mb-1.5">
                Role Title
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="input-field text-xs py-2.5"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-secondary-800 mb-1.5">
                  Industry
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
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-secondary-800 mb-1.5">
                  Employment Type
                </label>
                <select
                  value={formData.jobType}
                  onChange={(e) => setFormData({ ...formData, jobType: e.target.value })}
                  className="input-field text-xs py-2.5"
                >
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-secondary-800 mb-1.5">
                  Workplace
                </label>
                <select
                  value={formData.workplaceType}
                  onChange={(e) => setFormData({ ...formData, workplaceType: e.target.value })}
                  className="input-field text-xs py-2.5"
                >
                  <option value="remote">Remote</option>
                  <option value="on-site">On-site</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-secondary-800 mb-1.5">
                  Minimum Annual Salary ($)
                </label>
                <input
                  type="number"
                  value={formData.salaryMin}
                  onChange={(e) => setFormData({ ...formData, salaryMin: Number(e.target.value) })}
                  className="input-field text-xs py-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-secondary-800 mb-1.5">
                  Maximum Annual Salary ($)
                </label>
                <input
                  type="number"
                  value={formData.salaryMax}
                  onChange={(e) => setFormData({ ...formData, salaryMax: Number(e.target.value) })}
                  className="input-field text-xs py-2.5"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-secondary-800 mb-1.5">
                Job Description
              </label>
              <textarea
                rows={6}
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="input-field text-xs resize-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate('/recruiter/jobs')}
              className="btn-secondary text-xs py-2.5 px-6"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="btn-primary text-xs py-2.5 px-8 font-bold flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Updating...' : 'Save Changes'}</span>
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default EditJob;

