import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  FileText,
  Calendar,
  Video,
  CheckCircle2,
  Clock,
  Building2,
  ExternalLink,
  Trash2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { fetchMyApplications, withdrawApplication } from '../../store/slices/applicationSlice';
import DashboardLayout from '../../components/layout/DashboardLayout';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import toast from 'react-hot-toast';

const SeekerApplications = () => {
  const dispatch = useDispatch();
  const { myApplications, loading } = useSelector((state) => state.applications);
  const [expandedApp, setExpandedApp] = useState(null);

  useEffect(() => {
    dispatch(fetchMyApplications());
  }, [dispatch]);

  const handleWithdraw = (id) => {
    if (window.confirm('Are you sure you want to withdraw this application?')) {
      dispatch(withdrawApplication(id))
        .unwrap()
        .then(() => toast.success('Application withdrawn'))
        .catch((err) => toast.error(err));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Selected':
      case 'Shortlisted':
      case 'Interview Scheduled':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Under Review':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Rejected':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-primary-50 text-primary-700 border-primary-200';
    }
  };

  return (
    <DashboardLayout title="My Applications Tracker">
      <div className="space-y-6">
        <p className="text-xs text-secondary-500">
          Showing <strong className="text-secondary-900">{myApplications?.length || 0}</strong> job applications
        </p>

        {loading ? (
          <LoadingSpinner size="lg" text="Loading applications pipeline..." />
        ) : myApplications && myApplications.length > 0 ? (
          <div className="space-y-4">
            {myApplications.map((app) => {
              const isExpanded = expandedApp === app._id;
              return (
                <div
                  key={app._id}
                  className="card p-6 hover:border-primary-300 transition-all space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-secondary-50 border border-secondary-200 p-1 flex items-center justify-center flex-shrink-0">
                        {app.job?.company?.logo ? (
                          <img
                            src={app.job.company.logo}
                            alt="logo"
                            className="max-h-full max-w-full object-contain"
                          />
                        ) : (
                          <Building2 className="w-6 h-6 text-secondary-400" />
                        )}
                      </div>

                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-secondary-400">
                          {app.job?.company?.name || 'Company'}
                        </span>
                        <h3 className="text-base font-bold text-secondary-900">
                          {app.job?.title || 'Position'}
                        </h3>
                        <p className="text-xs text-secondary-500 mt-0.5">
                          Applied on {new Date(app.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-auto">
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full border ${getStatusColor(
                          app.status
                        )}`}
                      >
                        {app.status}
                      </span>

                      <button
                        onClick={() => setExpandedApp(isExpanded ? null : app._id)}
                        className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1"
                      >
                        <span>{isExpanded ? 'Less' : 'Timeline'}</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>

                      {app.status !== 'Selected' && app.status !== 'Rejected' && (
                        <button
                          onClick={() => handleWithdraw(app._id)}
                          className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Withdraw Application"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Interview Information Banner */}
                  {app.interviewDate && (
                    <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-emerald-800">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>
                          <strong>Interview Scheduled:</strong>{' '}
                          {new Date(app.interviewDate).toLocaleString()}
                        </span>
                      </div>
                      {app.interviewMeetingLink && (
                        <a
                          href={app.interviewMeetingLink}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 font-bold text-emerald-700 hover:text-emerald-900 bg-white px-3 py-1.5 rounded-lg border border-emerald-300"
                        >
                          <Video className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Join Meeting</span>
                        </a>
                      )}
                    </div>
                  )}

                  {/* Expanded Status History */}
                  {isExpanded && (
                    <div className="pt-4 border-t border-secondary-100 space-y-4">
                      <h4 className="text-xs font-bold text-secondary-800 uppercase tracking-wider">
                        Application Status History
                      </h4>

                      <div className="space-y-3 pl-4 border-l-2 border-primary-200">
                        {app.statusHistory && app.statusHistory.length > 0 ? (
                          app.statusHistory.map((hist, i) => (
                            <div key={i} className="text-xs space-y-0.5 relative">
                              <span className="font-bold text-secondary-900">{hist.status}</span>
                              <span className="text-secondary-400 text-[11px] ml-2">
                                {new Date(hist.updatedAt).toLocaleString()}
                              </span>
                              {hist.note && (
                                <p className="text-secondary-600 text-xs italic">"{hist.note}"</p>
                              )}
                            </div>
                          ))
                        ) : (
                          <p className="text-xs text-secondary-400">Application submitted.</p>
                        )}
                      </div>

                      {app.coverLetter && (
                        <div className="p-3 bg-secondary-50 rounded-lg text-xs">
                          <span className="font-semibold text-secondary-700 block mb-1">
                            Your Cover Letter:
                          </span>
                          <p className="text-secondary-600 italic whitespace-pre-line">
                            {app.coverLetter}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <EmptyState
            icon={FileText}
            title="No applications tracked yet"
            description="Apply for verified tech positions and track your interview stages here."
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default SeekerApplications;

