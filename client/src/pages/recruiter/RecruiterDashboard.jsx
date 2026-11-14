import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Briefcase,
  Users,
  CheckCircle2,
  Award,
  PlusCircle,
  Clock,
  ArrowRight,
  TrendingUp,
  Building,
} from 'lucide-react';
import { fetchRecruiterJobs } from '../../store/slices/jobSlice';
import { fetchAllRecruiterApplicants } from '../../store/slices/applicationSlice';
import DashboardLayout from '../../components/layout/DashboardLayout';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const RecruiterDashboard = () => {
  const dispatch = useDispatch();

  const { recruiterJobs, loading: jobsLoading } = useSelector((state) => state.jobs);
  const { recruiterApplicants, loading: appsLoading } = useSelector((state) => state.applications);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchRecruiterJobs());
    dispatch(fetchAllRecruiterApplicants());
  }, [dispatch]);

  const activeJobs = recruiterJobs?.filter((j) => j.status === 'active')?.length || 0;
  const totalApplicants = recruiterApplicants?.length || 0;
  const shortlistedCount = recruiterApplicants?.filter(
    (a) => a.status === 'Shortlisted' || a.status === 'Interview Scheduled'
  )?.length || 0;
  const selectedCount = recruiterApplicants?.filter((a) => a.status === 'Selected')?.length || 0;

  return (
    <DashboardLayout title="Recruiter Talent Command">
      <div className="space-y-8">
        {/* Header Greeting & Post Job CTA */}
        <div className="card p-6 sm:p-8 bg-gradient-to-r from-secondary-900 to-indigo-950 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-primary-400">
              Employer Hiring Dashboard
            </span>
            <h2 className="text-2xl sm:text-3xl font-black">
              Welcome, {user?.name || 'Talent Lead'}
            </h2>
            <p className="text-xs sm:text-sm text-secondary-300 leading-relaxed">
              Manage candidate pipelines, review AI skill match scores, and coordinate interviews across your active vacancies.
            </p>
          </div>

          <Link
            to="/recruiter/post-job"
            className="btn-primary py-3 px-6 text-xs font-bold flex items-center gap-2 shadow-lg shadow-primary-600/30 whitespace-nowrap self-start md:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post New Vacancy</span>
          </Link>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="card p-5 flex items-center justify-between">
            <div>
              <p className="text-xs text-secondary-500 font-medium">Active Jobs</p>
              <p className="text-2xl font-black text-secondary-900 mt-1">{activeJobs}</p>
            </div>
            <div className="w-11 h-11 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
          </div>

          <div className="card p-5 flex items-center justify-between">
            <div>
              <p className="text-xs text-secondary-500 font-medium">Total Applicants</p>
              <p className="text-2xl font-black text-secondary-900 mt-1">{totalApplicants}</p>
            </div>
            <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>

          <div className="card p-5 flex items-center justify-between">
            <div>
              <p className="text-xs text-secondary-500 font-medium">Shortlisted Candidates</p>
              <p className="text-2xl font-black text-amber-600 mt-1">{shortlistedCount}</p>
            </div>
            <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>

          <div className="card p-5 flex items-center justify-between">
            <div>
              <p className="text-xs text-secondary-500 font-medium">Selected / Hired</p>
              <p className="text-2xl font-black text-emerald-600 mt-1">{selectedCount}</p>
            </div>
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Recent Applicants Section */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-bold text-secondary-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-primary-600" />
              Latest Candidate Submissions
            </h3>
            <Link
              to="/recruiter/applicants"
              className="text-xs font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1"
            >
              <span>View Full Pipeline</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {appsLoading ? (
            <LoadingSpinner size="md" text="Loading candidate pipeline..." />
          ) : recruiterApplicants && recruiterApplicants.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-secondary-100 text-secondary-400 font-semibold uppercase tracking-wider">
                    <th className="pb-3">Candidate</th>
                    <th className="pb-3">Target Role</th>
                    <th className="pb-3">Match Score</th>
                    <th className="pb-3">Applied</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-secondary-100">
                  {recruiterApplicants.slice(0, 5).map((app) => (
                    <tr key={app._id} className="hover:bg-secondary-50/60 transition-colors">
                      <td className="py-3.5">
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              app.candidate?.avatar ||
                              'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'
                            }
                            alt="Candidate"
                            className="w-8 h-8 rounded-full object-cover border border-secondary-200"
                          />
                          <div>
                            <span className="font-bold text-secondary-900 block">
                              {app.candidate?.name || 'Applicant'}
                            </span>
                            <span className="text-[11px] text-secondary-400">
                              {app.candidate?.location || 'Remote'}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 font-semibold text-secondary-800">
                        {app.job?.title || 'Open Vacancy'}
                      </td>

                      <td className="py-3.5">
                        <span className="inline-block text-xs font-bold text-primary-700 bg-primary-50 px-2 py-0.5 rounded-md border border-primary-200">
                          {app.matchScore || 85}% Match
                        </span>
                      </td>

                      <td className="py-3.5 text-secondary-400">
                        {new Date(app.createdAt).toLocaleDateString()}
                      </td>

                      <td className="py-3.5">
                        <span className="badge badge-primary">{app.status}</span>
                      </td>

                      <td className="py-3.5 text-right">
                        <Link
                          to="/recruiter/applicants"
                          className="font-bold text-primary-600 hover:underline"
                        >
                          Review & Update
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-xs text-secondary-400">
              No applicants received yet for your active postings.
            </div>
          )}
        </div>

        {/* Quick Links Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <Link
            to="/recruiter/jobs"
            className="card p-5 hover:border-primary-400 hover:shadow-md transition-all flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-secondary-900">Manage Job Vacancies</h4>
              <p className="text-xs text-secondary-500 mt-0.5">Edit, pause or close postings</p>
            </div>
          </Link>

          <Link
            to="/recruiter/analytics"
            className="card p-5 hover:border-primary-400 hover:shadow-md transition-all flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-secondary-900">Recruitment Analytics</h4>
              <p className="text-xs text-secondary-500 mt-0.5">View candidate conversion rates</p>
            </div>
          </Link>

          <Link
            to="/recruiter/company"
            className="card p-5 hover:border-primary-400 hover:shadow-md transition-all flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center flex-shrink-0">
              <Building className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-secondary-900">Company Profile</h4>
              <p className="text-xs text-secondary-500 mt-0.5">Edit branding, logo, and links</p>
            </div>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RecruiterDashboard;

