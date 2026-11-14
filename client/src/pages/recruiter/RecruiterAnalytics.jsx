import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { BarChart3, TrendingUp, Users, CheckCircle2 } from 'lucide-react';
import { fetchAllRecruiterApplicants } from '../../store/slices/applicationSlice';
import DashboardLayout from '../../components/layout/DashboardLayout';

const RecruiterAnalytics = () => {
  const dispatch = useDispatch();
  const { recruiterApplicants } = useSelector((state) => state.applications);

  useEffect(() => {
    dispatch(fetchAllRecruiterApplicants());
  }, [dispatch]);

  // Aggregate application status distribution
  const statusCounts = {
    Applied: 0,
    'Under Review': 0,
    Shortlisted: 0,
    'Interview Scheduled': 0,
    Selected: 0,
    Rejected: 0,
  };

  recruiterApplicants?.forEach((app) => {
    if (statusCounts[app.status] !== undefined) {
      statusCounts[app.status] += 1;
    }
  });

  const stageData = Object.keys(statusCounts).map((key) => ({
    stage: key,
    candidates: statusCounts[key],
  }));

  const trendData = [
    { month: 'Week 1', applicants: 8, interviews: 2 },
    { month: 'Week 2', applicants: 15, interviews: 4 },
    { month: 'Week 3', applicants: 22, interviews: 7 },
    { month: 'Week 4', applicants: 34, interviews: 11 },
  ];

  const pieColors = ['#6366f1', '#f59e0b', '#10b981', '#06b6d4', '#8b5cf6', '#ef4444'];

  return (
    <DashboardLayout title="Recruitment Analytics & Insights">
      <div className="space-y-8">
        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="card p-5">
            <p className="text-xs text-secondary-500 font-medium">Pipeline Conversion Rate</p>
            <p className="text-2xl font-black text-secondary-900 mt-1">28.4%</p>
            <p className="text-[11px] text-emerald-600 mt-1 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> +4.2% from last cycle
            </p>
          </div>

          <div className="card p-5">
            <p className="text-xs text-secondary-500 font-medium">Average Time to Screen</p>
            <p className="text-2xl font-black text-primary-600 mt-1">1.8 Days</p>
            <p className="text-[11px] text-secondary-400 mt-1">65% faster than benchmark</p>
          </div>

          <div className="card p-5">
            <p className="text-xs text-secondary-500 font-medium">Interview Acceptance Rate</p>
            <p className="text-2xl font-black text-emerald-600 mt-1">94%</p>
            <p className="text-[11px] text-emerald-600 mt-1 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> High candidate engagement
            </p>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Applications by Stage */}
          <div className="card p-6">
            <h3 className="text-sm font-bold text-secondary-900 mb-4 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary-600" />
              Candidate Distribution by Hiring Stage
            </h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stageData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="stage" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="candidates" fill="#6366f1" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Hiring Velocity Trend */}
          <div className="card p-6">
            <h3 className="text-sm font-bold text-secondary-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              Applicant Volume vs Interviews (Last 30 Days)
            </h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="applicants"
                    stroke="#6366f1"
                    strokeWidth={2.5}
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="interviews"
                    stroke="#10b981"
                    strokeWidth={2.5}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RecruiterAnalytics;

