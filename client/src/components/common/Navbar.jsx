import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Briefcase,
  Bell,
  User,
  LogOut,
  LayoutDashboard,
  Menu,
  X,
  Bookmark,
  Building,
  ShieldCheck,
  ChevronDown,
  Check,
} from 'lucide-react';
import { logoutUser } from '../../store/slices/authSlice';
import {
  fetchNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from '../../store/slices/notificationSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { notifications, unreadCount } = useSelector((state) => state.notifications);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotifDropdownOpen, setIsNotifDropdownOpen] = useState(false);

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchNotifications());
    }
  }, [isAuthenticated, dispatch]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setIsNotifDropdownOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
    setIsProfileDropdownOpen(false);
    navigate('/');
  };

  const getDashboardLink = () => {
    if (!user) return '/login';
    if (user.role === 'admin') return '/admin/dashboard';
    if (user.role === 'recruiter') return '/recruiter/dashboard';
    return '/seeker/dashboard';
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-secondary-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-primary-500/20">
              <Briefcase className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-secondary-900 leading-none">
                Hire<span className="text-primary-600">Hub</span>
              </span>
              <span className="text-[10px] text-secondary-400 font-medium tracking-widest uppercase">
                Careers Platform
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/jobs"
              className={`text-sm font-medium transition-colors ${
                location.pathname.startsWith('/jobs')
                  ? 'text-primary-600 font-semibold'
                  : 'text-secondary-600 hover:text-secondary-900'
              }`}
            >
              Find Jobs
            </Link>
            <Link
              to="/companies"
              className={`text-sm font-medium transition-colors ${
                location.pathname.startsWith('/companies')
                  ? 'text-primary-600 font-semibold'
                  : 'text-secondary-600 hover:text-secondary-900'
              }`}
            >
              Companies
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/about'
                  ? 'text-primary-600 font-semibold'
                  : 'text-secondary-600 hover:text-secondary-900'
              }`}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/contact'
                  ? 'text-primary-600 font-semibold'
                  : 'text-secondary-600 hover:text-secondary-900'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Action Section */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-3">
                {/* Notification Dropdown */}
                <div className="relative" ref={notifRef}>
                  <button
                    onClick={() => setIsNotifDropdownOpen(!isNotifDropdownOpen)}
                    className="p-2 text-secondary-600 hover:text-secondary-900 hover:bg-secondary-100 rounded-full relative transition-colors"
                  >
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  {/* Dropdown menu */}
                  {isNotifDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-secondary-200 py-3 z-50">
                      <div className="px-4 py-2 border-b border-secondary-100 flex items-center justify-between">
                        <span className="text-sm font-bold text-secondary-900">Notifications</span>
                        {unreadCount > 0 && (
                          <button
                            onClick={() => dispatch(markAllNotificationsAsRead())}
                            className="text-xs text-primary-600 hover:underline flex items-center gap-1"
                          >
                            <Check className="w-3 h-3" /> Mark all read
                          </button>
                        )}
                      </div>
                      <div className="max-h-80 overflow-y-auto divide-y divide-secondary-100">
                        {notifications && notifications.length > 0 ? (
                          notifications.map((notif) => (
                            <div
                              key={notif._id}
                              onClick={() => {
                                dispatch(markNotificationAsRead(notif._id));
                                if (notif.link) navigate(notif.link);
                                setIsNotifDropdownOpen(false);
                              }}
                              className={`p-3.5 hover:bg-secondary-50 cursor-pointer transition-colors ${
                                !notif.isRead ? 'bg-primary-50/40' : ''
                              }`}
                            >
                              <div className="flex items-start justify-between gap-2">
                                <h4 className="text-xs font-semibold text-secondary-900">
                                  {notif.title}
                                </h4>
                                {!notif.isRead && (
                                  <span className="w-2 h-2 rounded-full bg-primary-600 flex-shrink-0 mt-1" />
                                )}
                              </div>
                              <p className="text-xs text-secondary-600 mt-0.5">{notif.message}</p>
                            </div>
                          ))
                        ) : (
                          <div className="p-6 text-center text-xs text-secondary-400">
                            No notifications yet
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Profile Dropdown */}
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-full hover:bg-secondary-100 transition-colors"
                  >
                    <img
                      src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover border border-secondary-300"
                    />
                    <div className="text-left hidden lg:block">
                      <p className="text-xs font-semibold text-secondary-800 line-clamp-1">
                        {user.name}
                      </p>
                      <p className="text-[10px] text-secondary-500 capitalize">{user.role}</p>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-secondary-400" />
                  </button>

                  {/* Dropdown Options */}
                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-secondary-200 py-2 z-50">
                      <div className="px-4 py-2 border-b border-secondary-100">
                        <p className="text-xs font-semibold text-secondary-900">{user.name}</p>
                        <p className="text-[11px] text-secondary-500 truncate">{user.email}</p>
                        <span className="inline-block mt-1 text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md bg-primary-50 text-primary-700">
                          {user.role}
                        </span>
                      </div>

                      <div className="py-1">
                        <Link
                          to={getDashboardLink()}
                          onClick={() => setIsProfileDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs text-secondary-700 hover:bg-secondary-50"
                        >
                          <LayoutDashboard className="w-4 h-4 text-secondary-500" />
                          Dashboard
                        </Link>

                        {user.role === 'jobseeker' && (
                          <>
                            <Link
                              to="/seeker/profile"
                              onClick={() => setIsProfileDropdownOpen(false)}
                              className="flex items-center gap-2.5 px-4 py-2 text-xs text-secondary-700 hover:bg-secondary-50"
                            >
                              <User className="w-4 h-4 text-secondary-500" />
                              My Profile
                            </Link>
                            <Link
                              to="/seeker/saved-jobs"
                              onClick={() => setIsProfileDropdownOpen(false)}
                              className="flex items-center gap-2.5 px-4 py-2 text-xs text-secondary-700 hover:bg-secondary-50"
                            >
                              <Bookmark className="w-4 h-4 text-secondary-500" />
                              Saved Jobs
                            </Link>
                          </>
                        )}

                        {user.role === 'recruiter' && (
                          <>
                            <Link
                              to="/recruiter/company"
                              onClick={() => setIsProfileDropdownOpen(false)}
                              className="flex items-center gap-2.5 px-4 py-2 text-xs text-secondary-700 hover:bg-secondary-50"
                            >
                              <Building className="w-4 h-4 text-secondary-500" />
                              Company Profile
                            </Link>
                            <Link
                              to="/recruiter/post-job"
                              onClick={() => setIsProfileDropdownOpen(false)}
                              className="flex items-center gap-2.5 px-4 py-2 text-xs text-secondary-700 hover:bg-secondary-50"
                            >
                              <Briefcase className="w-4 h-4 text-secondary-500" />
                              Post a Job
                            </Link>
                          </>
                        )}

                        {user.role === 'admin' && (
                          <Link
                            to="/admin/users"
                            onClick={() => setIsProfileDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-xs text-secondary-700 hover:bg-secondary-50"
                          >
                            <ShieldCheck className="w-4 h-4 text-secondary-500" />
                            Manage Users
                          </Link>
                        )}
                      </div>

                      <div className="border-t border-secondary-100 pt-1">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 font-medium"
                        >
                          <LogOut className="w-4 h-4 text-rose-500" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <Link to={getDashboardLink()} className="btn-primary py-2 px-4 text-xs font-semibold">
                  Dashboard
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-sm font-semibold text-secondary-700 hover:text-primary-600 px-3 py-2 transition-colors"
                >
                  Log In
                </Link>
                <Link to="/register" className="btn-primary text-xs font-semibold py-2 px-4">
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-secondary-600 hover:text-secondary-900 rounded-lg hover:bg-secondary-100"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-secondary-200 bg-white px-4 pt-2 pb-6 space-y-3">
          <Link
            to="/jobs"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-secondary-700 hover:text-primary-600"
          >
            Find Jobs
          </Link>
          <Link
            to="/companies"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-secondary-700 hover:text-primary-600"
          >
            Companies
          </Link>
          <Link
            to="/about"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-secondary-700 hover:text-primary-600"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-secondary-700 hover:text-primary-600"
          >
            Contact
          </Link>

          <div className="pt-3 border-t border-secondary-200 flex flex-col gap-2">
            {isAuthenticated && user ? (
              <>
                <Link
                  to={getDashboardLink()}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="btn-primary text-center text-xs py-2.5"
                >
                  Go to {user.role === 'admin' ? 'Admin' : user.role === 'recruiter' ? 'Recruiter' : 'Seeker'} Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="btn-secondary text-center text-xs text-rose-600 border-rose-200 hover:bg-rose-50"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="btn-secondary text-center text-xs py-2.5"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="btn-primary text-center text-xs py-2.5"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

