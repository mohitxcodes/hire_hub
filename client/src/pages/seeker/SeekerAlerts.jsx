import React, { useState, useEffect } from 'react';
import { Bell, Plus, Trash2, Mail } from 'lucide-react';
import API from '../../services/api';
import DashboardLayout from '../../components/layout/DashboardLayout';
import toast from 'react-hot-toast';

const SeekerAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    location: 'Remote',
    jobType: 'full-time',
    minSalary: 100000,
    frequency: 'daily',
  });

  const fetchAlerts = async () => {
    try {
      const res = await API.get('/users/job-alerts');
      setAlerts(res.data.alerts);
    } catch (e) {
      // ignore
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  const handleCreateAlert = async (e) => {
    e.preventDefault();
    try {
      await API.post('/users/job-alerts', formData);
      toast.success('Job alert created successfully!');
      setIsCreating(false);
      setFormData({ title: '', location: 'Remote', jobType: 'full-time', minSalary: 100000, frequency: 'daily' });
      fetchAlerts();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDeleteAlert = async (id) => {
    try {
      await API.delete(`/users/job-alerts/${id}`);
      toast.success('Alert removed');
      fetchAlerts();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <DashboardLayout title="Job Alerts & Email Notifications">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-xs text-secondary-500">
            Receive automated email alerts whenever roles matching your criteria are posted.
          </p>
          <button
            onClick={() => setIsCreating(!isCreating)}
            className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Alert</span>
          </button>
        </div>

        {/* Create Alert Form */}
        {isCreating && (
          <div className="card p-6 bg-primary-50/50 border-primary-200 space-y-4">
            <h3 className="text-sm font-bold text-secondary-900">New Career Alert</h3>
            <form onSubmit={handleCreateAlert} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-secondary-700 mb-1">
                    Job Title / Keyword
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Senior MERN Engineer"
                    className="input-field text-xs py-2 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-secondary-700 mb-1">
                    Target Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Remote or City"
                    className="input-field text-xs py-2 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-secondary-700 mb-1">
                    Employment Type
                  </label>
                  <select
                    value={formData.jobType}
                    onChange={(e) => setFormData({ ...formData, jobType: e.target.value })}
                    className="input-field text-xs py-2 bg-white"
                  >
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-secondary-700 mb-1">
                    Alert Frequency
                  </label>
                  <select
                    value={formData.frequency}
                    onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                    className="input-field text-xs py-2 bg-white"
                  >
                    <option value="daily">Daily Digest</option>
                    <option value="weekly">Weekly Summary</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="btn-secondary text-xs py-1.5 px-3"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary text-xs py-1.5 px-5">
                  Save Alert
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Existing Alerts List */}
        <div className="space-y-3">
          {alerts && alerts.length > 0 ? (
            alerts.map((al) => (
              <div
                key={al._id}
                className="card p-4 flex items-center justify-between hover:border-primary-300 transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
                    <Bell className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-secondary-900">{al.title}</h4>
                    <p className="text-xs text-secondary-500 mt-0.5">
                      {al.location || 'Anywhere'} • {al.jobType} • {al.frequency}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleDeleteAlert(al._id)}
                  className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg"
                  title="Delete alert"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          ) : (
            <div className="card p-8 text-center text-xs text-secondary-400">
              No job alerts active. Create an alert to receive email notifications when matching jobs are posted.
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SeekerAlerts;

