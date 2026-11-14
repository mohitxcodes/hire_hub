import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Users, Search, ShieldCheck, UserX, UserCheck } from 'lucide-react';
import { fetchAdminUsers, updateUserStatus } from '../../store/slices/adminSlice';
import DashboardLayout from '../../components/layout/DashboardLayout';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import toast from 'react-hot-toast';

const AdminUsers = () => {
  const dispatch = useDispatch();
  const [roleFilter, setRoleFilter] = useState('');
  const [search, setSearch] = useState('');

  const { users, totalUsers, loading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAdminUsers({ role: roleFilter, search }));
  }, [dispatch, roleFilter, search]);

  const handleToggleStatus = (u) => {
    const newStatus = u.status === 'active' ? 'suspended' : 'active';
    dispatch(updateUserStatus({ id: u._id, status: newStatus }))
      .unwrap()
      .then(() => toast.success(`User marked as ${newStatus}`))
      .catch((err) => toast.error(err));
  };

  return (
    <DashboardLayout title="User Accounts Moderation">
      <div className="space-y-6">
        {/* Filters */}
        <div className="card p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex-1 flex items-center gap-2.5 w-full bg-secondary-50 px-3 py-2 rounded-xl border border-secondary-200">
            <Search className="w-4 h-4 text-secondary-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search user by name or email..."
              className="w-full text-xs text-secondary-900 bg-transparent focus:outline-none"
            />
          </div>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="input-field text-xs py-2 w-full sm:w-48 bg-white"
          >
            <option value="">All Roles</option>
            <option value="jobseeker">Job Seekers</option>
            <option value="recruiter">Recruiters</option>
            <option value="admin">Administrators</option>
          </select>
        </div>

        {/* Users Table */}
        {loading ? (
          <LoadingSpinner size="lg" text="Loading user directory..." />
        ) : (
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-secondary-50 border-b border-secondary-200 text-secondary-600 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4">User</th>
                    <th className="py-3.5 px-4">Role</th>
                    <th className="py-3.5 px-4">Location</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Joined</th>
                    <th className="py-3.5 px-4 text-right">Moderation Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-secondary-100">
                  {users?.map((u) => (
                    <tr key={u._id} className="hover:bg-secondary-50/50 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              u.avatar ||
                              'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'
                            }
                            alt=""
                            className="w-8 h-8 rounded-full object-cover border border-secondary-200"
                          />
                          <div>
                            <span className="font-bold text-secondary-900 block">{u.name}</span>
                            <span className="text-[11px] text-secondary-400">{u.email}</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="badge badge-primary uppercase font-bold text-[10px]">
                          {u.role}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-secondary-600">{u.location || 'N/A'}</td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`badge ${
                            u.status === 'active' ? 'badge-success' : 'badge-danger'
                          }`}
                        >
                          {u.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-secondary-400">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        {u.role !== 'admin' && (
                          <button
                            onClick={() => handleToggleStatus(u)}
                            className={`btn-secondary text-xs py-1 px-3 ${
                              u.status === 'active'
                                ? 'text-rose-600 border-rose-200 hover:bg-rose-50'
                                : 'text-emerald-600 border-emerald-200 hover:bg-emerald-50'
                            }`}
                          >
                            {u.status === 'active' ? 'Suspend' : 'Activate'}
                          </button>
                        )}
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

export default AdminUsers;

