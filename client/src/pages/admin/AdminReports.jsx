import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AlertTriangle, CheckCircle, ShieldAlert } from 'lucide-react';
import { fetchAdminReports } from '../../store/slices/adminSlice';
import DashboardLayout from '../../components/layout/DashboardLayout';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import API from '../../services/api';
import toast from 'react-hot-toast';

const AdminReports = () => {
  const dispatch = useDispatch();
  const { reports, loading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAdminReports());
  }, [dispatch]);

  const handleUpdateReport = async (id, status) => {
    try {
      await API.put(`/admin/reports/${id}`, { status });
      toast.success(`Report marked as ${status}`);
      dispatch(fetchAdminReports());
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <DashboardLayout title="Platform Reports & Content Moderation">
      <div className="space-y-6">
        <p className="text-xs text-secondary-500">
          Review community reports regarding suspicious job postings, unverified companies, or behavior.
        </p>

        {loading ? (
          <LoadingSpinner size="lg" text="Loading moderation tickets..." />
        ) : reports && reports.length > 0 ? (
          <div className="space-y-4">
            {reports.map((rep) => (
              <div key={rep._id} className="card p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="badge badge-warning uppercase font-bold text-[10px]">
                      {rep.targetType} Report
                    </span>
                    <h3 className="text-sm font-bold text-secondary-900">{rep.reason}</h3>
                  </div>

                  <span
                    className={`badge ${
                      rep.status === 'pending'
                        ? 'badge-warning'
                        : rep.status === 'resolved'
                        ? 'badge-success'
                        : 'badge-neutral'
                    }`}
                  >
                    {rep.status}
                  </span>
                </div>

                <p className="text-xs text-secondary-600 bg-secondary-50 p-3 rounded-xl">
                  {rep.description}
                </p>

                <div className="flex items-center justify-between pt-2 text-xs">
                  <span className="text-secondary-400">
                    Reported by {rep.reporter?.name || 'User'} on{' '}
                    {new Date(rep.createdAt).toLocaleDateString()}
                  </span>

                  {rep.status === 'pending' && (
                    <div className="space-x-2">
                      <button
                        onClick={() => handleUpdateReport(rep._id, 'dismissed')}
                        className="btn-secondary text-xs py-1 px-3"
                      >
                        Dismiss
                      </button>
                      <button
                        onClick={() => handleUpdateReport(rep._id, 'resolved')}
                        className="btn-success text-xs py-1 px-4"
                      >
                        Resolve & Close
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={ShieldAlert}
            title="All clear! No pending reports"
            description="There are currently zero open violation or fake job tickets."
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default AdminReports;

