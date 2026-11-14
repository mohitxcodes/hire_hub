import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, MapPin, Briefcase, DollarSign, Clock, Building2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSaveJob } from '../../store/slices/jobSlice';
import toast from 'react-hot-toast';

const JobCard = ({ job, onSaveToggle }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { savedJobs } = useSelector((state) => state.jobs);

  const isSaved = savedJobs?.some((s) => (s._id || s) === job._id);

  const handleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      toast.error('Please login to bookmark jobs');
      return;
    }
    dispatch(toggleSaveJob(job._id))
      .unwrap()
      .then((res) => {
        toast.success(res.isSaved ? 'Job saved to bookmarks' : 'Job removed from bookmarks');
        if (onSaveToggle) onSaveToggle();
      })
      .catch((err) => toast.error(err));
  };

  const formatSalary = (min, max, currency = 'USD') => {
    const symbol = currency === 'USD' ? '$' : currency === 'INR' ? '₹' : '€';
    return `${symbol}${(min / 1000).toFixed(0)}k - ${symbol}${(max / 1000).toFixed(0)}k`;
  };

  const getRelativeTime = (dateString) => {
    const diff = Math.floor((new Date() - new Date(dateString)) / (1000 * 60 * 60 * 24));
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Yesterday';
    return `${diff}d ago`;
  };

  return (
    <div className="card p-6 flex flex-col justify-between hover:border-primary-400 hover:shadow-lg transition-all duration-300 relative group">
      {/* Top section: Company logo, name, bookmark */}
      <div>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-secondary-50 border border-secondary-200 p-1 flex items-center justify-center flex-shrink-0 overflow-hidden shadow-sm">
              {job.company?.logo ? (
                <img
                  src={job.company.logo}
                  alt={job.company.name}
                  className="w-full h-full object-contain"
                />
              ) : (
                <Building2 className="w-6 h-6 text-secondary-400" />
              )}
            </div>
            <div>
              <Link
                to={`/companies/${job.company?._id || ''}`}
                className="text-xs font-semibold uppercase tracking-wider text-secondary-500 hover:text-primary-600 transition-colors"
              >
                {job.company?.name || 'Company'}
              </Link>
              <h3 className="text-base font-bold text-secondary-900 group-hover:text-primary-600 transition-colors line-clamp-1">
                <Link to={`/jobs/${job._id}`}>{job.title}</Link>
              </h3>
            </div>
          </div>

          <button
            onClick={handleBookmark}
            className={`p-2 rounded-lg border transition-all ${
              isSaved
                ? 'bg-primary-50 text-primary-600 border-primary-200'
                : 'text-secondary-400 hover:text-secondary-700 hover:bg-secondary-50 border-secondary-200'
            }`}
            title={isSaved ? 'Remove Bookmark' : 'Save Job'}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-primary-600' : ''}`} />
          </button>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="badge bg-primary-50 text-primary-700 border border-primary-100">
            {job.jobType}
          </span>
          <span className="badge bg-slate-100 text-slate-700 capitalize">
            {job.workplaceType}
          </span>
          <span className="badge bg-indigo-50 text-indigo-700 capitalize">
            {job.experienceLevel} level
          </span>
          {job.featured && (
            <span className="badge bg-amber-50 text-amber-700 border border-amber-200">
              Featured
            </span>
          )}
        </div>

        {/* Description snippet */}
        <p className="text-xs text-secondary-500 mt-3 line-clamp-2 leading-relaxed">
          {job.description}
        </p>

        {/* Skills preview */}
        {job.skills && job.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3.5">
            {job.skills.slice(0, 4).map((skill, index) => (
              <span
                key={index}
                className="text-[11px] font-medium text-secondary-600 bg-secondary-100/70 px-2 py-0.5 rounded-md"
              >
                {skill}
              </span>
            ))}
            {job.skills.length > 4 && (
              <span className="text-[11px] text-secondary-400 self-center">
                +{job.skills.length - 4} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Footer: Details & Apply */}
      <div className="mt-5 pt-4 border-t border-secondary-100 flex items-center justify-between text-xs text-secondary-500">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 font-semibold text-secondary-900 text-sm">
            <DollarSign className="w-3.5 h-3.5 text-emerald-600 -mr-1" />
            {formatSalary(job.salaryMin, job.salaryMax, job.salaryCurrency)}
          </div>
          <div className="flex items-center gap-1 text-secondary-400">
            <MapPin className="w-3 h-3" />
            <span className="line-clamp-1">{job.location}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-1 text-secondary-400">
            <Clock className="w-3 h-3" />
            {getRelativeTime(job.createdAt)}
          </span>
          <Link
            to={`/jobs/${job._id}`}
            className="btn-primary py-1.5 px-4 text-xs font-semibold"
          >
            Apply Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobCard;

