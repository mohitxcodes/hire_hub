import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Users,
  Search,
  Filter,
  FileText,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Sparkles,
  ExternalLink,
  X,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import {
  fetchAllRecruiterApplicants,
  fetchJobApplicants,
  updateApplicationStatus,
} from '../../store/slices/applicationSlice';
import DashboardLayout from '../../components/layout/DashboardLayout';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import toast from 'react-hot-toast';

const Applicants = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const jobId = searchParams.get('jobId');
  const [statusFilter, setStatusFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const { recruiterApplicants, jobApplicants, loading } = useSelector(
    (state) => state.applications
  );

  const [selectedApp, setSelectedApp] = useState(null);
  const [newStatus, setNewStatus] = useState('Shortlisted');
  const [statusNote, setStatusNote] = useState('');
  const [interviewDate, setInterviewDate] = useState('');
  const [interviewLink, setInterviewLink] = useState('https://meet.google.com/hirehub-room');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (jobId) {
      dispatch(fetchJobApplicants({ jobId, params: { status: statusFilter } }));
    } else {
      dispatch(fetchAllRecruiterApplicants({ status: statusFilter, search: searchQuery }));
    }
  }, [dispatch, jobId, statusFilter, searchQuery]);

  const applicationsList = jobId ? jobApplicants : recruiterApplicants;

  const handleOpenStatusModal = (app) => {
    setSelectedApp(app);
    setNewStatus(app.status);
    setStatusNote('');
  };

  const handleUpdateStatusSubmit = (e) => {
    e.preventDefault();
    if (!selectedApp) return;

    setUpdating(true);
    dispatch(
      updateApplicationStatus({
        id: selectedApp._id,
        statusData: {
          status: newStatus,
          note: statusNote,
          interviewDate: newStatus === 'Interview Scheduled' ? interviewDate : undefined,
          interviewMeetingLink: newStatus === 'Interview Scheduled' ? interviewLink : undefined,
        },
      })
    )
      .unwrap()
      .then(() => {
        toast.success(`Candidate marked as ${newStatus}`);
        setSelectedApp(null);
        if (jobId) {
          dispatch(fetchJobApplicants({ jobId }));
        } else {
          dispatch(fetchAllRecruiterApplicants());
        }
      })
      .catch((err) => toast.error(err))
      .finally(() => setUpdating(false));
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
    <DashboardLayout title="Candidate Pipeline & Applicants">
      <div className="space-y-6">
        {/* Filter & Search Header */}
        <div className="card p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex-1 flex items-center gap-2.5 w-full bg-secondary-50 px-3 py-2 rounded-xl border border-secondary-200">
            <Search className="w-4 h-4 text-secondary-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search candidate by name or skill..."
              className="w-full text-xs text-secondary-900 bg-transparent focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input-field text-xs py-2 w-full sm:w-48 bg-white"
            >
              <option value="">All Application Stages</option>
              <option value="Applied">Applied</option>
              <option value="Under Review">Under Review</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Interview Scheduled">Interview Scheduled</option>
              <option value="Selected">Selected / Hired</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Pipeline List */}
        {loading ? (
          <LoadingSpinner size="lg" text="Filtering candidate submissions..." />
        ) : applicationsList && applicationsList.length > 0 ? (
          <div className="space-y-4">
            {applicationsList.map((app) => (
              <div
                key={app._id}
                className="card p-6 hover:border-primary-300 transition-all space-y-4"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Candidate Info */}
                  <div className="flex items-start gap-4">
                    <img
                      src={
                        app.candidate?.avatar ||
                        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
                      }
                      alt={app.candidate?.name}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-secondary-200 flex-shrink-0"
                    />

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-secondary-900">
                          {app.candidate?.name || 'Applicant'}
                        </h3>
                        <span className="text-[11px] font-bold text-primary-700 bg-primary-50 px-2 py-0.5 rounded-md border border-primary-200 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-primary-600" />
                          {app.matchScore || 85}% Skill Fit
                        </span>
                      </div>

                      <p className="text-xs font-semibold text-secondary-600 mt-0.5">
                        Applied for: <span className="text-secondary-900">{app.job?.title}</span>
                      </p>

                      <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-secondary-500">
                        {app.candidate?.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-secondary-400" />
                            {app.candidate.location}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3 text-secondary-400" />
                          {app.candidate?.email}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions & Status */}
                  <div className="flex items-center gap-3 self-end lg:self-auto">
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full border ${getStatusColor(
                        app.status
                      )}`}
                    >
                      {app.status}
                    </span>

                    {app.resumeUrl && (
                      <a
                        href={app.resumeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-outline text-xs py-1.5 px-3 flex items-center gap-1"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Resume</span>
                      </a>
                    )}

                    <button
                      onClick={() => handleOpenStatusModal(app)}
                      className="btn-primary text-xs py-1.5 px-4 font-bold"
                    >
                      Update Status
                    </button>
                  </div>
                </div>

                {/* Candidate Skills tags */}
                {app.candidate?.skills && app.candidate.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-secondary-100">
                    <span className="text-[11px] font-semibold text-secondary-500 self-center mr-1">
                      Candidate Skills:
                    </span>
                    {app.candidate.skills.slice(0, 6).map((sk, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-secondary-100 text-secondary-700"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                )}

                {/* Cover letter snippet */}
                {app.coverLetter && (
                  <p className="text-xs text-secondary-600 bg-secondary-50 p-3 rounded-lg italic">
                    "{app.coverLetter}"
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Users}
            title="No applicants found"
            description="No candidate applications match your current filters."
          />
        )}
      </div>

      {/* Status Update Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-secondary-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative animate-scale-in">
            <button
              onClick={() => setSelectedApp(null)}
              className="absolute top-4 right-4 p-1 text-secondary-400 hover:text-secondary-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-secondary-900 mb-1">
              Update Candidate Status
            </h3>
            <p className="text-xs text-secondary-500 mb-4">
              Candidate: <strong>{selectedApp.candidate?.name}</strong> for{' '}
              <strong>{selectedApp.job?.title}</strong>
            </p>

            <form onSubmit={handleUpdateStatusSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-secondary-800 mb-1.5">
                  Select New Status
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="input-field text-xs py-2 bg-white"
                >
                  <option value="Applied">Applied</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Interview Scheduled">Interview Scheduled</option>
                  <option value="Selected">Selected / Hired</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              {newStatus === 'Interview Scheduled' && (
                <div className="space-y-3 p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                  <div>
                    <label className="block text-[11px] font-bold text-emerald-900 mb-1">
                      Interview Date & Time
                    </label>
                    <input
                      type="datetime-local"
                      required
                      value={interviewDate}
                      onChange={(e) => setInterviewDate(e.target.value)}
                      className="input-field text-xs py-1.5 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-emerald-900 mb-1">
                      Meeting Link (Google Meet / Zoom)
                    </label>
                    <input
                      type="url"
                      required
                      value={interviewLink}
                      onChange={(e) => setInterviewLink(e.target.value)}
                      placeholder="https://meet.google.com/..."
                      className="input-field text-xs py-1.5 bg-white"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-secondary-800 mb-1.5">
                  Feedback Note for Candidate
                </label>
                <textarea
                  rows={3}
                  value={statusNote}
                  onChange={(e) => setStatusNote(e.target.value)}
                  placeholder="e.g. Profile screened and shortlisted for Round 1 technical interview."
                  className="input-field text-xs resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedApp(null)}
                  className="btn-secondary text-xs py-2 px-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="btn-primary text-xs py-2 px-6 font-bold"
                >
                  {updating ? 'Saving...' : 'Update Status'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Applicants;

