import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Building, Search, CheckCircle, XCircle, ShieldCheck } from 'lucide-react';
import { fetchAdminCompanies, updateCompanyStatus } from '../../store/slices/adminSlice';
import DashboardLayout from '../../components/layout/DashboardLayout';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import toast from 'react-hot-toast';

const AdminCompanies = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');

  const { companies, loading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAdminCompanies({ search }));
  }, [dispatch, search]);

  const handleStatusChange = (id, status) => {
    dispatch(updateCompanyStatus({ id, status }))
      .unwrap()
      .then(() => toast.success(`Company marked as ${status}`))
      .catch((err) => toast.error(err));
  };

  const handleToggleVerified = (company) => {
    const newVerified = !company.verified;
    dispatch(updateCompanyStatus({ id: company._id, verified: newVerified }))
      .unwrap()
      .then(() => toast.success(newVerified ? 'Company verified' : 'Verification removed'))
      .catch((err) => toast.error(err));
  };

  return (
    <DashboardLayout title="Company Accounts & Verification">
      <div className="space-y-6">
        <div className="card p-4 flex items-center justify-between gap-4">
          <div className="flex-1 flex items-center gap-2.5 w-full bg-secondary-50 px-3 py-2 rounded-xl border border-secondary-200">
            <Search className="w-4 h-4 text-secondary-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search companies by name..."
              className="w-full text-xs text-secondary-900 bg-transparent focus:outline-none"
            />
          </div>
        </div>

        {loading ? (
          <LoadingSpinner size="lg" text="Loading company profiles..." />
        ) : (
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-secondary-50 border-b border-secondary-200 text-secondary-600 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4">Company</th>
                    <th className="py-3.5 px-4">Recruiter Account</th>
                    <th className="py-3.5 px-4">Industry</th>
                    <th className="py-3.5 px-4">Verified Badge</th>
                    <th className="py-3.5 px-4">Account Status</th>
                    <th className="py-3.5 px-4 text-right">Approval Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-secondary-100">
                  {companies?.map((c) => (
                    <tr key={c._id} className="hover:bg-secondary-50/50 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              c.logo ||
                              'https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=100&q=80'
                            }
                            alt=""
                            className="w-9 h-9 rounded-xl object-contain border border-secondary-200 p-1"
                          />
                          <div>
                            <span className="font-bold text-secondary-900 block">{c.name}</span>
                            <span className="text-[11px] text-secondary-400">{c.location}</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-secondary-700">
                        {c.user?.name || 'Recruiter'}
                        <span className="block text-[11px] text-secondary-400">{c.user?.email}</span>
                      </td>

                      <td className="py-3.5 px-4 font-medium text-secondary-700">{c.industry}</td>

                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => handleToggleVerified(c)}
                          className={`badge cursor-pointer ${
                            c.verified ? 'badge-success' : 'badge-neutral'
                          }`}
                        >
                          {c.verified ? '✓ Verified' : 'Unverified'}
                        </button>
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`badge ${
                            c.status === 'approved'
                              ? 'badge-success'
                              : c.status === 'pending'
                              ? 'badge-warning'
                              : 'badge-danger'
                          }`}
                        >
                          {c.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right space-x-2">
                        {c.status !== 'approved' && (
                          <button
                            onClick={() => handleStatusChange(c._id, 'approved')}
                            className="btn-success text-xs py-1 px-3"
                          >
                            Approve
                          </button>
                        )}
                        {c.status !== 'rejected' && (
                          <button
                            onClick={() => handleStatusChange(c._id, 'rejected')}
                            className="btn-danger text-xs py-1 px-3"
                          >
                            Reject
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

export default AdminCompanies;

