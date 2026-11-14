import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Briefcase, Search, Trash2, Eye, ExternalLink } from 'lucide-react';
import { fetchAdminJobs, deleteAdminJob } from '../../store/slices/adminSlice';
import DashboardLayout from '../../components/layout/DashboardLayout';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import toast from 'react-hot-toast';

const AdminJobs = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const { jobs, totalJobs, loading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAdminJobs({ search, status: statusFilter }));
  }, [dispatch, search, statusFilter]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this job posting as an administrator?')) {
      dispatch(deleteAdminJob(id))
        .unwrap()
        .then(() => toast.success('Job removed by admin'))
        .catch((err) => toast.error(err));
    }
  };

  return (
    <DashboardLayout title="Job Moderation & Verification">
      <div className="space-y-6">
        <div className="card p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex-1 flex items-center gap-2.5 w-full bg-secondary-50 px-3 py-2 rounded-xl border border-secondary-200">
            <Search className="w-4 h-4 text-secondary-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by job title or keyword..."
              className="w-full text-xs text-secondary-900 bg-transparent focus:outline-none"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-field text-xs py-2 w-full sm:w-48 bg-white"
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        {loading ? (
          <LoadingSpinner size="lg" text="Loading jobs database..." />
        ) : (
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-secondary-50 border-b border-secondary-200 text-secondary-600 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4">Job Title</th>
                    <th className="py-3.5 px-4">Company</th>
                    <th className="py-3.5 px-4">Recruiter</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Applicants</th>
                    <th className="py-3.5 px-4">Date</th>
                    <th className="py-3.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-secondary-100">
                  {jobs?.map((j) => (
                    <tr key={j._id} className="hover:bg-secondary-50/50 transition-colors">
                      <td className="py-3.5 px-4">
                        <Link
                          to={`/jobs/${j._id}`}
                          className="font-bold text-secondary-900 hover:text-primary-600 block"
                        >
                          {j.title}
                        </Link>
                        <span className="text-[11px] text-secondary-400 capitalize">
                          {j.jobType} • {j.workplaceType}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-semibold text-secondary-800">
                        {j.company?.name || 'Company'}
                      </td>

                      <td className="py-3.5 px-4 text-secondary-600">
                        {j.recruiter?.name || 'Recruiter'}
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`badge ${
                            j.status === 'active' ? 'badge-success' : 'badge-danger'
                          }`}
                        >
                          {j.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-bold text-secondary-900">
                        {j.applicantsCount || 0}
                      </td>

                      <td className="py-3.5 px-4 text-secondary-400">
                        {new Date(j.createdAt).toLocaleDateString()}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => handleDelete(j._id)}
                          className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Remove Job"
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
        )}
      </div>
    </DashboardLayout>
  );
};

export default AdminJobs;

