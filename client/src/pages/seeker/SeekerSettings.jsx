import React, { useState } from 'react';
import { Lock, Bell, Shield, Key } from 'lucide-react';
import API from '../../services/api';
import DashboardLayout from '../../components/layout/DashboardLayout';
import toast from 'react-hot-toast';

const SeekerSettings = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [emailNotifs, setEmailNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(false);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      toast.error('New password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await API.put('/users/change-password', {
        currentPassword,
        newPassword,
      });
      toast.success('Password changed successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout title="Account Settings">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Security & Password */}
        <div className="card p-6 sm:p-8 space-y-4">
          <h3 className="text-base font-bold text-secondary-900 border-b border-secondary-100 pb-3 flex items-center gap-2">
            <Key className="w-5 h-5 text-primary-600" />
            Security & Authentication
          </h3>

          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-secondary-800 mb-1">
                Current Password
              </label>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
                className="input-field text-xs py-2.5"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-secondary-800 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field text-xs py-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-secondary-800 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field text-xs py-2.5"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary text-xs py-2.5 px-6 font-bold"
            >
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </div>

        {/* Notification Preferences */}
        <div className="card p-6 sm:p-8 space-y-4">
          <h3 className="text-base font-bold text-secondary-900 border-b border-secondary-100 pb-3 flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary-600" />
            Notification Preferences
          </h3>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3 bg-secondary-50 rounded-xl cursor-pointer">
              <div>
                <span className="font-bold text-secondary-900 block">Email Notifications</span>
                <span className="text-secondary-500">
                  Receive application status alerts, interview invites, and system notices
                </span>
              </div>
              <input
                type="checkbox"
                checked={emailNotifs}
                onChange={() => setEmailNotifs(!emailNotifs)}
                className="rounded text-primary-600 focus:ring-primary-500 w-4 h-4"
              />
            </label>

            <label className="flex items-center justify-between p-3 bg-secondary-50 rounded-xl cursor-pointer">
              <div>
                <span className="font-bold text-secondary-900 block">SMS Updates</span>
                <span className="text-secondary-500">
                  Urgent interview time slot notifications delivered to your phone
                </span>
              </div>
              <input
                type="checkbox"
                checked={smsNotifs}
                onChange={() => setSmsNotifs(!smsNotifs)}
                className="rounded text-primary-600 focus:ring-primary-500 w-4 h-4"
              />
            </label>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SeekerSettings;

