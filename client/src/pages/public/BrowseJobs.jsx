import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Search,
  MapPin,
  Filter,
  DollarSign,
  Briefcase,
  RotateCcw,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { fetchJobs, fetchSavedJobs } from '../../store/slices/jobSlice';
import JobCard from '../../components/common/JobCard';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';

const BrowseJobs = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const { jobs, totalJobs, totalPages, currentPage, loading } = useSelector((state) => state.jobs);
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Filter States
  const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [jobTypes, setJobTypes] = useState(searchParams.get('jobType')?.split(',') || []);
  const [workplaces, setWorkplaces] = useState(searchParams.get('workplaceType')?.split(',') || []);
  const [experienceLevels, setExperienceLevels] = useState(
    searchParams.get('experienceLevel')?.split(',') || []
  );
  const [minSalary, setMinSalary] = useState(searchParams.get('minSalary') || '');
  const [datePosted, setDatePosted] = useState(searchParams.get('datePosted') || '');
  const [sort, setSort] = useState(searchParams.get('sort') || 'newest');
  const [page, setPage] = useState(parseInt(searchParams.get('page') || '1', 10));

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchSavedJobs());
    }
  }, [isAuthenticated, dispatch]);

  // Sync state to API query
  useEffect(() => {
    const params = {
      page,
      sort,
    };
    if (keyword) params.keyword = keyword;
    if (location) params.location = location;
    if (jobTypes.length > 0) params.jobType = jobTypes.join(',');
    if (workplaces.length > 0) params.workplaceType = workplaces.join(',');
    if (experienceLevels.length > 0) params.experienceLevel = experienceLevels.join(',');
    if (minSalary) params.minSalary = minSalary;
    if (datePosted) params.datePosted = datePosted;

    dispatch(fetchJobs(params));
  }, [dispatch, page, sort, keyword, location, jobTypes, workplaces, experienceLevels, minSalary, datePosted]);

  const toggleArrayItem = (list, setList, item) => {
    if (list.includes(item)) {
      setList(list.filter((x) => x !== item));
    } else {
      setList([...list, item]);
    }
    setPage(1);
  };

  const handleClearFilters = () => {
    setKeyword('');
    setLocation('');
    setJobTypes([]);
    setWorkplaces([]);
    setExperienceLevels([]);
    setMinSalary('');
    setDatePosted('');
    setSort('newest');
    setPage(1);
    setSearchParams({});
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      {/* Top Search Hero */}
      <div className="bg-white border-b border-secondary-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-secondary-900 mb-2">
            Explore Open Vacancies
          </h1>
          <p className="text-xs sm:text-sm text-secondary-500 mb-6">
            Showing verified opportunities matching your skills and criteria.
          </p>

          <form
            onSubmit={handleSearchSubmit}
            className="flex flex-col sm:flex-row items-center gap-3 bg-secondary-50 p-2 rounded-2xl border border-secondary-200"
          >
            <div className="flex-1 flex items-center gap-2.5 w-full px-3 py-1.5 bg-white rounded-xl border border-secondary-200">
              <Search className="w-4 h-4 text-secondary-400" />
              <input
                type="text"
                value={keyword}
                onChange={(e) => {
                  setKeyword(e.target.value);
                  setPage(1);
                }}
                placeholder="Search job title, skills, or keywords"
                className="w-full text-xs sm:text-sm text-secondary-900 focus:outline-none bg-transparent"
              />
            </div>

            <div className="flex-1 flex items-center gap-2.5 w-full px-3 py-1.5 bg-white rounded-xl border border-secondary-200">
              <MapPin className="w-4 h-4 text-secondary-400" />
              <input
                type="text"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  setPage(1);
                }}
                placeholder="City, country or 'Remote'"
                className="w-full text-xs sm:text-sm text-secondary-900 focus:outline-none bg-transparent"
              />
            </div>

            <button type="submit" className="btn-primary w-full sm:w-auto text-xs py-2.5 px-6 font-semibold">
              Filter
            </button>
          </form>
        </div>
      </div>

      {/* Main Browse Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0 space-y-6 hidden lg:block">
            <div className="card p-5 space-y-6">
              <div className="flex items-center justify-between border-b border-secondary-100 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-secondary-900 flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5 text-primary-600" />
                  Filters
                </span>
                <button
                  onClick={handleClearFilters}
                  className="text-[11px] font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              </div>

              {/* Workplace Type */}
              <div>
                <h4 className="text-xs font-bold text-secondary-800 mb-2.5">Workplace Type</h4>
                <div className="space-y-2 text-xs">
                  {['remote', 'on-site', 'hybrid'].map((type) => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer capitalize">
                      <input
                        type="checkbox"
                        checked={workplaces.includes(type)}
                        onChange={() => toggleArrayItem(workplaces, setWorkplaces, type)}
                        className="rounded text-primary-600 focus:ring-primary-500"
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Job Type */}
              <div>
                <h4 className="text-xs font-bold text-secondary-800 mb-2.5">Job Type</h4>
                <div className="space-y-2 text-xs">
                  {['full-time', 'part-time', 'contract', 'internship'].map((type) => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer capitalize">
                      <input
                        type="checkbox"
                        checked={jobTypes.includes(type)}
                        onChange={() => toggleArrayItem(jobTypes, setJobTypes, type)}
                        className="rounded text-primary-600 focus:ring-primary-500"
                      />
                      <span>{type.replace('-', ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Experience Level */}
              <div>
                <h4 className="text-xs font-bold text-secondary-800 mb-2.5">Experience Level</h4>
                <div className="space-y-2 text-xs">
                  {['entry', 'mid', 'senior', 'lead'].map((level) => (
                    <label key={level} className="flex items-center gap-2 cursor-pointer capitalize">
                      <input
                        type="checkbox"
                        checked={experienceLevels.includes(level)}
                        onChange={() => toggleArrayItem(experienceLevels, setExperienceLevels, level)}
                        className="rounded text-primary-600 focus:ring-primary-500"
                      />
                      <span>{level} Level</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Min Salary */}
              <div>
                <h4 className="text-xs font-bold text-secondary-800 mb-2.5">Min Annual Salary</h4>
                <select
                  value={minSalary}
                  onChange={(e) => {
                    setMinSalary(e.target.value);
                    setPage(1);
                  }}
                  className="input-field text-xs py-2"
                >
                  <option value="">Any Salary</option>
                  <option value="50000">$50,000+</option>
                  <option value="80000">$80,000+</option>
                  <option value="100000">$100,000+</option>
                  <option value="130000">$130,000+</option>
                  <option value="160000">$160,000+</option>
                </select>
              </div>

              {/* Date Posted */}
              <div>
                <h4 className="text-xs font-bold text-secondary-800 mb-2.5">Date Posted</h4>
                <div className="space-y-2 text-xs">
                  {[
                    { label: 'Anytime', val: '' },
                    { label: 'Past 24 hours', val: '24h' },
                    { label: 'Past week', val: '7d' },
                    { label: 'Past month', val: '30d' },
                  ].map((option) => (
                    <label key={option.val} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="datePosted"
                        checked={datePosted === option.val}
                        onChange={() => {
                          setDatePosted(option.val);
                          setPage(1);
                        }}
                        className="text-primary-600 focus:ring-primary-500"
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Jobs Listing Column */}
          <div className="flex-1">
            {/* Sort & Count Header */}
            <div className="flex items-center justify-between mb-4 bg-white p-4 rounded-xl border border-secondary-200 text-xs">
              <span className="font-semibold text-secondary-700">
                Found <span className="text-primary-600 font-bold">{totalJobs}</span> available jobs
              </span>

              <div className="flex items-center gap-2">
                <span className="text-secondary-400 hidden sm:inline">Sort by:</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="bg-secondary-50 border border-secondary-200 rounded-lg px-2.5 py-1 text-xs text-secondary-800 focus:outline-none"
                >
                  <option value="newest">Newest First</option>
                  <option value="salary-high">Salary: High to Low</option>
                  <option value="salary-low">Salary: Low to High</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
            </div>

            {/* List */}
            {loading ? (
              <LoadingSpinner size="lg" text="Searching matching positions..." />
            ) : jobs && jobs.length > 0 ? (
              <div className="space-y-4">
                {jobs.map((job) => (
                  <JobCard key={job._id} job={job} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No jobs found matching your criteria"
                description="Try clearing some filters or searching for alternative tech keywords."
                action={
                  <button onClick={handleClearFilters} className="btn-primary text-xs py-2 px-4">
                    Clear Filters
                  </button>
                }
              />
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 mt-8">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage(page - 1)}
                  className="btn-secondary text-xs p-2 disabled:opacity-40"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-semibold text-secondary-700">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage(page + 1)}
                  className="btn-secondary text-xs p-2 disabled:opacity-40"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BrowseJobs;

