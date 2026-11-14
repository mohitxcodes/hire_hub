import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Briefcase,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Award,
  AlertCircle,
} from 'lucide-react';
import { fetchMyApplications } from '../../store/slices/applicationSlice';
import { fetchRecommendedJobs } from '../../store/slices/jobSlice';
import DashboardLayout from '../../components/layout/DashboardLayout';
import JobCard from '../../components/common/JobCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const SeekerDashboard = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { myApplications, loading: appLoading } = useSelector((state) => state.applications);
  const { recommendedJobs, loading: jobLoading } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(fetchMyApplications());
    dispatch(fetchRecommendedJobs());
  }, [dispatch]);

  // Calculate statistics
  const totalApplied = myApplications?.length || 0;
  const underReview = myApplications?.filter((a) => a.status === 'Under Review' || a.status === 'Applied').length || 0;
  const shortlisted = myApplications?.filter((a) => a.status === 'Shortlisted' || a.status === 'Interview Scheduled' || a.status === 'Selected').length || 0;
  const rejected = myApplications?.filter((a) => a.status === 'Rejected').length || 0;

  // Profile completion percentage calculation
  let profileScore = 30;
  if (user?.title) profileScore += 15;
  if (user?.skills?.length > 0) profileScore += 20;
  if (user?.experience?.length > 0) profileScore += 15;
  if (user?.education?.length > 0) profileScore += 10;
  if (user?.resume?.url) profileScore += 10;
  profileScore = Math.min(100, profileScore);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Shortlisted':
      case 'Interview Scheduled':
      case 'Selected':
        return 'badge-success';
      case 'Under Review':
        return 'badge-warning';
      case 'Rejected':
        return 'badge-danger';
      default:
        return 'badge-primary';
    }
  };

  return (
    <DashboardLayout title="Job Seeker Overview">
      <div className="space-y-8">
        {/* Welcome Banner */}
        <div className="card p-6 sm:p-8 bg-gradient-to-r from-primary-900 via-primary-800 to-indigo-900 text-white relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-primary-300">
              Welcome back
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mt-1 mb-2">
              Hello, {user?.name || 'Engineer'}!
            </h2>
            <p className="text-xs sm:text-sm text-primary-100 leading-relaxed mb-6">
              Track your interview progress, discover newly matched high-paying roles, and keep your
              profile optimized for recruiters.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link to="/jobs" className="btn-primary bg-white text-primary-800 hover:bg-primary-50 text-xs py-2 px-5 font-bold">
                Discover Jobs
              </Link>
              <Link to="/seeker/profile" className="btn-secondary bg-primary-800/80 text-white border-primary-600 hover:bg-primary-700 text-xs py-2 px-5">
                Update Resume & Skills
              </Link>
            </div>
          </div>
          <div className="absolute right-0 bottom-0 top-0 w-80 bg-gradient-to-l from-white/10 to-transparent pointer-events-none" />
        </div>

        {/* Profile Strength & Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {/* Stats Cards */}
          <div className="card p-5 flex items-center justify-between">
            <div>
              <p className="text-xs text-secondary-500 font-medium">Total Applied</p>
              <p className="text-2xl font-black text-secondary-900 mt-1">{totalApplied}</p>
            </div>
            <div className="w-11 h-11 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
          </div>

          <div className="card p-5 flex items-center justify-between">
            <div>
              <p className="text-xs text-secondary-500 font-medium">Under Review</p>
              <p className="text-2xl font-black text-amber-600 mt-1">{underReview}</p>
            </div>
            <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>

          <div className="card p-5 flex items-center justify-between">
            <div>
              <p className="text-xs text-secondary-500 font-medium">Shortlisted</p>
              <p className="text-2xl font-black text-emerald-600 mt-1">{shortlisted}</p>
            </div>
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>

          <div className="card p-5 flex items-center justify-between">
            <div>
              <p className="text-xs text-secondary-500 font-medium">Rejected</p>
              <p className="text-2xl font-black text-rose-600 mt-1">{rejected}</p>
            </div>
            <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <XCircle className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Profile Completion Bar */}
        <div className="card p-5 bg-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex-1 w-full">
            <div className="flex items-center justify-between text-xs font-bold mb-2">
              <span className="text-secondary-800 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-primary-600" />
                Profile Strength: {profileScore}% Completed
              </span>
              <span className="text-primary-600">{profileScore < 100 ? 'Needs Attention' : 'Excellent'}</span>
            </div>
            <div className="w-full h-2.5 bg-secondary-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary-500 to-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${profileScore}%` }}
              />
            </div>
          </div>
          {profileScore < 100 && (
            <Link to="/seeker/edit-profile" className="btn-outline text-xs py-2 px-4 whitespace-nowrap">
              Complete Profile
            </Link>
          )}
        </div>

        {/* Recent Applications Table */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-bold text-secondary-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary-600" />
              Recent Applications
            </h3>
            <Link
              to="/seeker/applications"
              className="text-xs font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {appLoading ? (
            <LoadingSpinner size="md" text="Loading applications..." />
          ) : myApplications && myApplications.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-secondary-100 text-secondary-400 font-semibold uppercase tracking-wider">
                    <th className="pb-3">Job Role</th>
                    <th className="pb-3">Company</th>
                    <th className="pb-3">Applied Date</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-secondary-100">
                  {myApplications.slice(0, 5).map((app) => (
                    <tr key={app._id} className="hover:bg-secondary-50/60 transition-colors">
                      <td className="py-3.5 font-bold text-secondary-900">
                        {app.job?.title || 'Position'}
                      </td>
                      <td className="py-3.5 text-secondary-600">
                        {app.job?.company?.name || 'Company'}
                      </td>
                      <td className="py-3.5 text-secondary-400">
                        {new Date(app.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3.5">
                        <span className={`badge ${getStatusBadge(app.status)}`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="py-3.5 text-right">
                        <Link
                          to="/seeker/applications"
                          className="font-semibold text-primary-600 hover:underline"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-xs text-secondary-400">
              You haven't submitted any job applications yet.{' '}
              <Link to="/jobs" className="text-primary-600 font-bold underline">
                Browse positions now
              </Link>
            </div>
          )}
        </div>

        {/* AI Recommended Jobs */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-secondary-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary-600" />
                AI Skill-Recommended Positions
              </h3>
              <p className="text-xs text-secondary-500 mt-0.5">
                Roles tailored to your technical skills: {user?.skills?.slice(0, 4).join(', ') || 'Software Development'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {recommendedJobs && recommendedJobs.length > 0 ? (
              recommendedJobs.slice(0, 3).map((job) => <JobCard key={job._id} job={job} />)
            ) : (
              <div className="col-span-full card p-6 text-center text-xs text-secondary-400">
                Add more skills to your profile to get personalized recommendations!
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SeekerDashboard;

