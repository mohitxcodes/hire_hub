import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Users,
  Briefcase,
  Building,
  FileText,
  ShieldCheck,
  AlertTriangle,
  TrendingUp,
  BarChart3,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { fetchAdminDashboard } from '../../store/slices/adminSlice';
import DashboardLayout from '../../components/layout/DashboardLayout';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { stats, monthlyStats, applicationStatusCounts, loading } = useSelector(
    (state) => state.admin
  );

  useEffect(() => {
    dispatch(fetchAdminDashboard());
  }, [dispatch]);

  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#06b6d4', '#ef4444'];

  const pieData =
    applicationStatusCounts && applicationStatusCounts.length > 0
      ? applicationStatusCounts.map((item) => ({ name: item._id, value: item.count }))
      : [
          { name: 'Applied', value: 12 },
          { name: 'Shortlisted', value: 8 },
          { name: 'Interview Scheduled', value: 5 },
          { name: 'Selected', value: 3 },
        ];

  return (
    <DashboardLayout title="System Administration Command">
      <div className="space-y-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="card p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-secondary-500">Total Users</span>
              <div className="w-8 h-8 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-black text-secondary-900 mt-2">
              {stats?.totalUsers || 0}
            </p>
            <p className="text-[11px] text-secondary-400 mt-0.5">
              {stats?.totalJobSeekers || 0} Seekers • {stats?.totalRecruiters || 0} Recruiters
            </p>
          </div>

          <div className="card p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-secondary-500">Active Jobs</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Briefcase className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-black text-emerald-600 mt-2">
              {stats?.activeJobs || 0}
            </p>
            <p className="text-[11px] text-secondary-400 mt-0.5">
              Out of {stats?.totalJobs || 0} total listings
            </p>
          </div>

          <div className="card p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-secondary-500">Companies</span>
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Building className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-black text-secondary-900 mt-2">
              {stats?.totalCompanies || 0}
            </p>
            <p className="text-[11px] text-amber-600 font-semibold mt-0.5">
              {stats?.pendingCompanies || 0} pending approvals
            </p>
          </div>

          <div className="card p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-secondary-500">Applications</span>
              <div className="w-8 h-8 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-black text-secondary-900 mt-2">
              {stats?.totalApplications || 0}
            </p>
            <p className="text-[11px] text-secondary-400 mt-0.5">Transacted on platform</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Monthly Growth Line/Bar Chart */}
          <div className="card p-6 lg:col-span-2">
            <h3 className="text-sm font-bold text-secondary-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary-600" />
              Platform Monthly Growth (Users vs Jobs)
            </h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyStats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="users" fill="#6366f1" name="Signups" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="jobs" fill="#10b981" name="Jobs" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Application Status Pie Chart */}
          <div className="card p-6">
            <h3 className="text-sm font-bold text-secondary-900 mb-4 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-indigo-600" />
              Application Status Mix
            </h3>
            <div className="h-72 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                  >
                    {pieData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;

