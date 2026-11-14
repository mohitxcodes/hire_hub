import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Briefcase,
  Users,
  Eye,
  Edit,
  Trash2,
  PlusCircle,
  Clock,
  Play,
  Pause,
} from 'lucide-react';
import { fetchRecruiterJobs, deleteJob, updateJob } from '../../store/slices/jobSlice';
import DashboardLayout from '../../components/layout/DashboardLayout';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import toast from 'react-hot-toast';

const ManageJobs = () => {
  const dispatch = useDispatch();
  const { recruiterJobs, loading } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(fetchRecruiterJobs());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this job posting? All applications will also be deleted.')) {
      dispatch(deleteJob(id))
        .unwrap()
        .then(() => toast.success('Job removed successfully'))
        .catch((err) => toast.error(err));
    }
  };

  const handleToggleStatus = (job) => {
    const newStatus = job.status === 'active' ? 'paused' : 'active';
    dispatch(updateJob({ id: job._id, jobData: { status: newStatus } }))
      .unwrap()
      .then(() => {
        toast.success(`Job status changed to ${newStatus}`);
        dispatch(fetchRecruiterJobs());
      })
      .catch((err) => toast.error(err));
  };

  return (
    <DashboardLayout title="Manage Posted Vacancies">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-xs text-secondary-500">
            Total of <strong className="text-secondary-900">{recruiterJobs?.length || 0}</strong> job postings
          </p>
          <Link
            to="/recruiter/post-job"
            className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Post New Vacancy</span>
          </Link>
        </div>

        {loading ? (
          <LoadingSpinner size="lg" text="Loading posted vacancies..." />
        ) : recruiterJobs && recruiterJobs.length > 0 ? (
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-secondary-50 border-b border-secondary-200 text-secondary-600 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4">Role Title</th>
                    <th className="py-3.5 px-4">Workplace</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Views</th>
                    <th className="py-3.5 px-4">Applicants</th>
                    <th className="py-3.5 px-4">Date Posted</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-secondary-100">
                  {recruiterJobs.map((job) => (
                    <tr key={job._id} className="hover:bg-secondary-50/50 transition-colors">
                      <td className="py-3.5 px-4">
                        <Link
                          to={`/jobs/${job._id}`}
                          className="font-bold text-secondary-900 hover:text-primary-600 block text-sm"
                        >
                          {job.title}
                        </Link>
                        <span className="text-[11px] text-secondary-400">
                          {job.experienceLevel} level • {job.industry}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 capitalize font-medium text-secondary-700">
                        {job.workplaceType}
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`badge ${
                            job.status === 'active'
                              ? 'badge-success'
                              : job.status === 'paused'
                              ? 'badge-warning'
                              : 'badge-danger'
                          }`}
                        >
                          {job.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-secondary-600 font-semibold">
                        <div className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5 text-secondary-400" />
                          <span>{job.views || 0}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <Link
                          to={`/recruiter/applicants?jobId=${job._id}`}
                          className="inline-flex items-center gap-1 font-bold text-primary-600 hover:underline bg-primary-50 px-2 py-0.5 rounded-md"
                        >
                          <Users className="w-3.5 h-3.5" />
                          <span>{job.applicantsCount || 0} Applicants</span>
                        </Link>
                      </td>

                      <td className="py-3.5 px-4 text-secondary-400">
                        {new Date(job.createdAt).toLocaleDateString()}
                      </td>

                      <td className="py-3.5 px-4 text-right space-x-2">
                        <button
                          onClick={() => handleToggleStatus(job)}
                          className="p-1.5 rounded-lg text-secondary-500 hover:text-secondary-800 hover:bg-secondary-100"
                          title={job.status === 'active' ? 'Pause job' : 'Activate job'}
                        >
                          {job.status === 'active' ? (
                            <Pause className="w-4 h-4 text-amber-500" />
                          ) : (
                            <Play className="w-4 h-4 text-emerald-500" />
                          )}
                        </button>

                        <Link
                          to={`/recruiter/edit-job/${job._id}`}
                          className="p-1.5 inline-block rounded-lg text-secondary-500 hover:text-primary-600 hover:bg-secondary-100"
                          title="Edit Job"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>

                        <button
                          onClick={() => handleDelete(job._id)}
                          className="p-1.5 rounded-lg text-secondary-500 hover:text-rose-600 hover:bg-rose-50"
                          title="Delete Job"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <EmptyState
            icon={Briefcase}
            title="No job postings yet"
            description="Publish your first vacancy to start receiving high-fit candidates."
            action={
              <Link to="/recruiter/post-job" className="btn-primary text-xs py-2 px-5">
                Post Vacancy
              </Link>
            }
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default ManageJobs;

