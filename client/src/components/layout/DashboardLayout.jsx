import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  LayoutDashboard,
  User,
  Edit3,
  Search,
  Bookmark,
  FileText,
  FileCheck2,
  Bell,
  Settings,
  PlusCircle,
  Briefcase,
  Users,
  BarChart3,
  Building,
  ShieldCheck,
  AlertTriangle,
  LogOut,
  Menu,
  X,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { logoutUser } from '../../store/slices/authSlice';

const DashboardLayout = ({ children, title = 'Dashboard' }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { unreadCount } = useSelector((state) => state.notifications);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  // Nav items per role
  const seekerNav = [
    { name: 'Overview', href: '/seeker/dashboard', icon: LayoutDashboard },
    { name: 'My Profile', href: '/seeker/profile', icon: User },
    { name: 'Edit Profile', href: '/seeker/edit-profile', icon: Edit3 },
    { name: 'Find Jobs', href: '/jobs', icon: Search },
    { name: 'Saved Jobs', href: '/seeker/saved-jobs', icon: Bookmark },
    { name: 'My Applications', href: '/seeker/applications', icon: FileText },
    { name: 'Resume & ATS Scanner', href: '/seeker/resume', icon: FileCheck2 },
    { name: 'Job Alerts', href: '/seeker/alerts', icon: Bell },
    { name: 'Account Settings', href: '/seeker/settings', icon: Settings },
  ];

  const recruiterNav = [
    { name: 'Overview', href: '/recruiter/dashboard', icon: LayoutDashboard },
    { name: 'Post a Job', href: '/recruiter/post-job', icon: PlusCircle },
    { name: 'Manage Jobs', href: '/recruiter/jobs', icon: Briefcase },
    { name: 'All Applicants', href: '/recruiter/applicants', icon: Users },
    { name: 'Recruitment Analytics', href: '/recruiter/analytics', icon: BarChart3 },
    { name: 'Company Profile', href: '/recruiter/company', icon: Building },
    { name: 'Account Settings', href: '/recruiter/settings', icon: Settings },
  ];

  const adminNav = [
    { name: 'Platform Overview', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Manage Users', href: '/admin/users', icon: Users },
    { name: 'Manage Jobs', href: '/admin/jobs', icon: Briefcase },
    { name: 'Manage Companies', href: '/admin/companies', icon: Building },
    { name: 'Reports & Moderation', href: '/admin/reports', icon: AlertTriangle },
    { name: 'System Settings', href: '/admin/settings', icon: Settings },
  ];

  const currentNav =
    user?.role === 'admin'
      ? adminNav
      : user?.role === 'recruiter'
      ? recruiterNav
      : seekerNav;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-secondary-900/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-secondary-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto flex flex-col justify-between ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div>
          <div className="h-16 px-6 flex items-center justify-between border-b border-secondary-200">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary-600 to-violet-600 flex items-center justify-center text-white shadow-sm">
                <Briefcase className="w-4 h-4" />
              </div>
              <span className="text-lg font-black tracking-tight text-secondary-900">
                Hire<span className="text-primary-600">Hub</span>
              </span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 text-secondary-500 hover:text-secondary-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User quick pill */}
          <div className="p-4 mx-3 my-3 bg-secondary-50 rounded-xl border border-secondary-200/80 flex items-center gap-3">
            <img
              src={
                user?.avatar ||
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'
              }
              alt={user?.name}
              className="w-10 h-10 rounded-full object-cover border border-secondary-300 flex-shrink-0"
            />
            <div className="overflow-hidden">
              <h4 className="text-xs font-bold text-secondary-900 truncate">{user?.name}</h4>
              <span className="inline-block text-[10px] uppercase font-semibold text-primary-600 tracking-wider">
                {user?.role}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 space-y-1 mt-2">
            {currentNav.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-primary-50 text-primary-700 shadow-xs'
                      : 'text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? 'text-primary-600' : 'text-secondary-400'
                    }`}
                  />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-secondary-200 space-y-2">
          <Link
            to="/"
            className="flex items-center justify-between px-3 py-2 text-xs font-medium text-secondary-600 hover:text-primary-600 transition-colors"
          >
            <span>Back to Main Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-secondary-200 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-secondary-600 hover:text-secondary-900 hover:bg-secondary-100 rounded-lg"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-lg sm:text-xl font-bold text-secondary-900">{title}</h1>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/jobs"
              className="hidden sm:flex items-center gap-2 text-xs font-medium text-secondary-500 hover:text-primary-600 bg-secondary-50 hover:bg-primary-50 px-3 py-1.5 rounded-lg border border-secondary-200 transition-colors"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Browse All Vacancies</span>
            </Link>

            {/* Notifications quick pill */}
            <Link
              to="/seeker/dashboard"
              className="relative p-2 text-secondary-600 hover:text-secondary-900 hover:bg-secondary-100 rounded-full transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Link>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;

