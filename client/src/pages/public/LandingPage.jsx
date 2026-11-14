import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Search,
  MapPin,
  Briefcase,
  Building2,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Shield,
  Zap,
  Users,
  Award,
  Sparkles,
  Star,
} from 'lucide-react';
import { fetchFeaturedJobs, fetchJobStats } from '../../store/slices/jobSlice';
import JobCard from '../../components/common/JobCard';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

const LandingPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');

  const { featuredJobs, stats, categories, loading } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(fetchFeaturedJobs());
    dispatch(fetchJobStats());
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword) params.append('keyword', keyword);
    if (location) params.append('location', location);
    navigate(`/jobs?${params.toString()}`);
  };

  const defaultCategories = [
    { name: 'Technology', count: '1,420+ jobs', icon: Zap },
    { name: 'Fintech', count: '850+ jobs', icon: TrendingUp },
    { name: 'UI/UX Design', count: '520+ jobs', icon: Sparkles },
    { name: 'Marketing & Sales', count: '640+ jobs', icon: Users },
    { name: 'Data & AI', count: '910+ jobs', icon: Award },
    { name: 'Entertainment', count: '310+ jobs', icon: Shield },
  ];

  const hiringCompanies = [
    {
      name: 'Google',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
      jobs: '24 Open Roles',
      rating: 4.9,
    },
    {
      name: 'Stripe',
      logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80',
      jobs: '18 Open Roles',
      rating: 4.8,
    },
    {
      name: 'Netflix',
      logo: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=120&q=80',
      jobs: '12 Open Roles',
      rating: 4.7,
    },
    {
      name: 'Airbnb',
      logo: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=120&q=80',
      jobs: '15 Open Roles',
      rating: 4.8,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-primary-50/50 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-semibold mb-6 animate-fade-in shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Over 10,000+ Verified Tech & Enterprise Careers</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl font-black text-secondary-900 tracking-tight leading-[1.1] mb-6">
              Find Your Dream Job.{' '}
              <span className="bg-gradient-to-r from-primary-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Build Your Future.
              </span>
            </h1>

            <p className="text-lg text-secondary-600 max-w-2xl mx-auto leading-relaxed mb-10">
              Discover verified high-impact opportunities at top global tech firms, fintech pioneers,
              and startups. Apply seamlessly with AI skill matching.
            </p>

            {/* Search Bar */}
            <form
              onSubmit={handleSearch}
              className="bg-white p-3 rounded-2xl shadow-xl shadow-secondary-200/50 border border-secondary-200/80 flex flex-col md:flex-row items-center gap-3 max-w-4xl mx-auto"
            >
              <div className="flex-1 flex items-center gap-3 w-full px-3 py-2 border-b md:border-b-0 md:border-r border-secondary-200">
                <Search className="w-5 h-5 text-secondary-400 flex-shrink-0" />
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Job title, keywords, or skills (e.g. React, Node, Designer)"
                  className="w-full text-sm text-secondary-900 placeholder-secondary-400 focus:outline-none bg-transparent"
                />
              </div>

              <div className="flex-1 flex items-center gap-3 w-full px-3 py-2">
                <MapPin className="w-5 h-5 text-secondary-400 flex-shrink-0" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Location or 'Remote'"
                  className="w-full text-sm text-secondary-900 placeholder-secondary-400 focus:outline-none bg-transparent"
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full md:w-auto px-8 py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-bold flex-shrink-0"
              >
                <Search className="w-4 h-4" />
                <span>Search Jobs</span>
              </button>
            </form>

            {/* Popular Quick Searches */}
            <div className="flex items-center justify-center flex-wrap gap-2 mt-5 text-xs text-secondary-500">
              <span className="font-semibold text-secondary-700">Trending:</span>
              {['Frontend', 'Remote', 'Full Stack MERN', 'UI/UX Designer', 'DevOps', 'Data Engineer'].map(
                (term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setKeyword(term);
                      navigate(`/jobs?keyword=${encodeURIComponent(term)}`);
                    }}
                    className="hover:text-primary-600 hover:bg-primary-50 px-2.5 py-1 rounded-md transition-colors border border-secondary-200/70"
                  >
                    {term}
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {/* Decorative background blurs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-primary-200/30 to-violet-300/30 rounded-full blur-3xl -z-10 pointer-events-none" />
      </section>

      {/* Platform Statistics Bar */}
      <section className="border-y border-secondary-200 bg-secondary-50/60 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-secondary-900">
                {stats?.totalJobs ? `${stats.totalJobs}+` : '15+'}
              </p>
              <p className="text-xs sm:text-sm font-medium text-secondary-500 mt-1">
                Active Job Openings
              </p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-secondary-900">
                {stats?.totalCompanies ? `${stats.totalCompanies}+` : '6+'}
              </p>
              <p className="text-xs sm:text-sm font-medium text-secondary-500 mt-1">
                Verified Tech Companies
              </p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-secondary-900">95%</p>
              <p className="text-xs sm:text-sm font-medium text-secondary-500 mt-1">
                AI Skill Match Rate
              </p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-primary-600">24h</p>
              <p className="text-xs sm:text-sm font-medium text-secondary-500 mt-1">
                Average Recruiter Response
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary-900">
                Explore by Category
              </h2>
              <p className="text-sm text-secondary-500 mt-1">
                Find roles curated by your specialized industry and domain.
              </p>
            </div>
            <Link
              to="/jobs"
              className="text-xs font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1 mt-4 md:mt-0"
            >
              <span>View All Vacancies</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {defaultCategories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <div
                  key={i}
                  onClick={() => navigate(`/jobs?industry=${encodeURIComponent(cat.name)}`)}
                  className="card p-5 cursor-pointer hover:border-primary-500 hover:shadow-md transition-all group flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 group-hover:bg-primary-600 group-hover:text-white flex items-center justify-center transition-all flex-shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-secondary-900 group-hover:text-primary-600 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-secondary-500 mt-0.5">{cat.count}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-20 bg-secondary-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary-100 text-primary-700 text-xs font-semibold mb-2">
                <Sparkles className="w-3 h-3" /> Featured Roles
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary-900">
                Top Hiring Opportunities
              </h2>
              <p className="text-sm text-secondary-500 mt-1">
                Hand-picked roles from industry leaders actively recruiting right now.
              </p>
            </div>
            <Link
              to="/jobs"
              className="text-xs font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1 mt-4 md:mt-0"
            >
              <span>Browse All ({stats?.totalJobs || 'All'}) Jobs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredJobs && featuredJobs.length > 0 ? (
              featuredJobs.map((job) => <JobCard key={job._id} job={job} />)
            ) : (
              <div className="col-span-full text-center py-12 text-sm text-secondary-400">
                Loading featured jobs...
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Top Hiring Companies */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold text-secondary-900">
              Work for the Best Companies
            </h2>
            <p className="text-sm text-secondary-500 mt-2">
              Leading enterprises and high-growth innovators trust HireHub to scale their teams.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {hiringCompanies.map((comp, idx) => (
              <div
                key={idx}
                onClick={() => navigate('/companies')}
                className="card p-6 text-center cursor-pointer hover:border-primary-400 hover:shadow-lg transition-all group"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-secondary-50 border border-secondary-200 p-2 flex items-center justify-center">
                  <img
                    src={comp.logo}
                    alt={comp.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <h3 className="text-base font-bold text-secondary-900 group-hover:text-primary-600 transition-colors">
                  {comp.name}
                </h3>
                <div className="flex items-center justify-center gap-1 text-xs text-amber-500 font-semibold my-1.5">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{comp.rating} Rating</span>
                </div>
                <span className="inline-block text-xs font-semibold text-primary-700 bg-primary-50 px-3 py-1 rounded-full mt-2">
                  {comp.jobs}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-primary-400">
              Simple 3-Step Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-2 text-white">
              How HireHub Elevates Your Career
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-slate-800/60 p-8 rounded-2xl border border-slate-700">
              <div className="w-14 h-14 rounded-2xl bg-primary-600 text-white mx-auto flex items-center justify-center text-xl font-bold mb-6 shadow-lg shadow-primary-600/30">
                1
              </div>
              <h3 className="text-lg font-bold mb-2">Build Your Smart Profile</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Upload your resume, add your tech skills, and let our ATS score scanner optimize your
                candidacy for automated filters.
              </p>
            </div>

            <div className="bg-slate-800/60 p-8 rounded-2xl border border-slate-700">
              <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white mx-auto flex items-center justify-center text-xl font-bold mb-6 shadow-lg shadow-indigo-600/30">
                2
              </div>
              <h3 className="text-lg font-bold mb-2">Discover Matching Roles</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Use advanced filters for salary, remote/on-site, seniority, and skills with real-time
                percentage match indicators.
              </p>
            </div>

            <div className="bg-slate-800/60 p-8 rounded-2xl border border-slate-700">
              <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white mx-auto flex items-center justify-center text-xl font-bold mb-6 shadow-lg shadow-emerald-600/30">
                3
              </div>
              <h3 className="text-lg font-bold mb-2">Apply & Track Status</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Submit 1-click applications directly to verified hiring managers and track every interview
                stage in real time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-tr from-primary-700 to-indigo-800 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Ready to Take the Next Step in Your Career?
          </h2>
          <p className="text-base text-primary-100 max-w-2xl mx-auto mb-8 leading-relaxed">
            Join thousands of professionals already thriving at world-class companies. Create your free
            profile today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white text-primary-700 hover:bg-primary-50 font-bold text-sm shadow-lg transition-all"
            >
              Sign Up as Job Seeker
            </Link>
            <Link
              to="/register?role=recruiter"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-primary-600 text-white border border-primary-400 hover:bg-primary-500 font-bold text-sm transition-all"
            >
              Hire Candidates for Your Company
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;

