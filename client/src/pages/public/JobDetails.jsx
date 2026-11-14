import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  MapPin,
  Briefcase,
  DollarSign,
  Building2,
  Calendar,
  Eye,
  Users,
  Bookmark,
  Share2,
  CheckCircle,
  Clock,
  Sparkles,
  ArrowLeft,
  X,
  FileText,
} from 'lucide-react';
import { fetchJobById, toggleSaveJob } from '../../store/slices/jobSlice';
import { applyForJob } from '../../store/slices/applicationSlice';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import JobCard from '../../components/common/JobCard';
import toast from 'react-hot-toast';

const JobDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentJob, relatedJobs, savedJobs, loading } = useSelector((state) => state.jobs);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // Apply Modal state
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [selectedResumeUrl, setSelectedResumeUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchJobById(id));
      window.scrollTo(0, 0);
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (user?.resume?.url) {
      setSelectedResumeUrl(user.resume.url);
    }
  }, [user]);

  const isSaved = savedJobs?.some((s) => (s._id || s) === id);

  const handleBookmark = () => {
    if (!isAuthenticated) {
      toast.error('Please login to bookmark jobs');
      return;
    }
    dispatch(toggleSaveJob(id))
      .unwrap()
      .then((res) => toast.success(res.isSaved ? 'Job bookmarked!' : 'Job removed from bookmarks!'))
      .catch((err) => toast.error(err));
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: currentJob?.title,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Job link copied to clipboard!');
    }
  };

  const handleApplyClick = () => {
    if (!isAuthenticated) {
      toast.error('Please login as a job seeker to apply');
      navigate('/login', { state: { from: `/jobs/${id}` } });
      return;
    }
    if (user.role !== 'jobseeker') {
      toast.error('Only job seekers can apply for positions');
      return;
    }
    setIsApplyModalOpen(true);
  };

  const handleSubmitApplication = (e) => {
    e.preventDefault();
    if (!selectedResumeUrl) {
      toast.error('Please attach or provide a resume URL');
      return;
    }
    setSubmitting(true);
    dispatch(
      applyForJob({
        jobId: id,
        data: {
          coverLetter,
          resumeUrl: selectedResumeUrl,
        },
      })
    )
      .unwrap()
      .then(() => {
        toast.success('Application submitted successfully!');
        setIsApplyModalOpen(false);
        setHasApplied(true);
      })
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  if (loading || !currentJob) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <LoadingSpinner size="lg" text="Loading job specifications..." />
        </div>
        <Footer />
      </div>
    );
  }

  const formatSalary = (min, max, currency = 'USD') => {
    const symbol = currency === 'USD' ? '$' : currency === 'INR' ? '₹' : '€';
    return `${symbol}${(min / 1000).toFixed(0)}k - ${symbol}${(max / 1000).toFixed(0)}k / year`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      {/* Header Banner */}
      <div className="bg-white border-b border-secondary-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/jobs"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary-500 hover:text-primary-600 mb-6 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Jobs</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-secondary-50 border border-secondary-200 p-2 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-sm">
                {currentJob.company?.logo ? (
                  <img
                    src={currentJob.company.logo}
                    alt={currentJob.company.name}
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <Building2 className="w-8 h-8 text-secondary-400" />
                )}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary-600">
                    {currentJob.company?.name}
                  </span>
                  {currentJob.company?.verified && (
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.5 rounded border border-emerald-200">
                      Verified
                    </span>
                  )}
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-secondary-900 mt-1">
                  {currentJob.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-secondary-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {currentJob.location}
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-emerald-600">
                    <DollarSign className="w-3.5 h-3.5 -mr-1" />
                    {formatSalary(currentJob.salaryMin, currentJob.salaryMax, currentJob.salaryCurrency)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    Posted {new Date(currentJob.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleBookmark}
                className={`p-3 rounded-xl border transition-all ${
                  isSaved
                    ? 'bg-primary-50 text-primary-600 border-primary-200'
                    : 'text-secondary-500 hover:text-secondary-800 border-secondary-200 bg-white'
                }`}
                title="Bookmark Job"
              >
                <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-primary-600' : ''}`} />
              </button>

              <button
                onClick={handleShare}
                className="p-3 rounded-xl border border-secondary-200 text-secondary-500 hover:text-secondary-800 bg-white transition-all"
                title="Share Job"
              >
                <Share2 className="w-5 h-5" />
              </button>

              <button
                disabled={hasApplied}
                onClick={handleApplyClick}
                className="btn-primary py-3 px-8 text-sm font-bold shadow-md shadow-primary-500/20 disabled:bg-emerald-600 disabled:opacity-90"
              >
                {hasApplied ? 'Applied ✓' : 'Apply for this Job'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Job Description */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview Card */}
            <div className="card p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-lg font-bold text-secondary-900 mb-3">About the Role</h2>
                <p className="text-sm text-secondary-600 leading-relaxed whitespace-pre-line">
                  {currentJob.description}
                </p>
              </div>

              {/* Responsibilities */}
              {currentJob.responsibilities && currentJob.responsibilities.length > 0 && (
                <div>
                  <h3 className="text-base font-bold text-secondary-900 mb-3">Key Responsibilities</h3>
                  <ul className="space-y-2">
                    {currentJob.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-secondary-600">
                        <CheckCircle className="w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Requirements */}
              {currentJob.requirements && currentJob.requirements.length > 0 && (
                <div>
                  <h3 className="text-base font-bold text-secondary-900 mb-3">Requirements & Experience</h3>
                  <ul className="space-y-2">
                    {currentJob.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-secondary-600">
                        <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Skills Required */}
              {currentJob.skills && currentJob.skills.length > 0 && (
                <div>
                  <h3 className="text-base font-bold text-secondary-900 mb-3">Target Technical Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentJob.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="text-xs font-semibold px-3 py-1 bg-primary-50 text-primary-700 rounded-lg border border-primary-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Related Jobs Section */}
            {relatedJobs && relatedJobs.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-secondary-900">Similar Positions in {currentJob.industry}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedJobs.map((rJob) => (
                    <JobCard key={rJob._id} job={rJob} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Company & Summary Sidebar */}
          <div className="space-y-6">
            {/* Quick Summary Card */}
            <div className="card p-6 space-y-4">
              <h3 className="text-sm font-bold text-secondary-900 border-b border-secondary-100 pb-3">
                Job Overview
              </h3>

              <div className="space-y-3.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-secondary-500">Employment Type</span>
                  <span className="font-semibold text-secondary-900 capitalize">{currentJob.jobType}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-secondary-500">Workplace Type</span>
                  <span className="font-semibold text-secondary-900 capitalize">{currentJob.workplaceType}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-secondary-500">Experience Level</span>
                  <span className="font-semibold text-secondary-900 capitalize">{currentJob.experienceLevel} Level</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-secondary-500">Industry</span>
                  <span className="font-semibold text-secondary-900">{currentJob.industry}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-secondary-500">Total Applicants</span>
                  <span className="font-semibold text-secondary-900">{currentJob.applicantsCount} Candidates</span>
                </div>
              </div>

              <button
                disabled={hasApplied}
                onClick={handleApplyClick}
                className="w-full btn-primary text-xs py-2.5 font-bold mt-2"
              >
                {hasApplied ? 'Application Sent' : 'Apply Now'}
              </button>
            </div>

            {/* Company Info Card */}
            {currentJob.company && (
              <div className="card p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-secondary-50 border border-secondary-200 p-1 flex items-center justify-center">
                    <img
                      src={currentJob.company.logo}
                      alt={currentJob.company.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-secondary-900">{currentJob.company.name}</h4>
                    <p className="text-xs text-secondary-500">{currentJob.company.location}</p>
                  </div>
                </div>

                <p className="text-xs text-secondary-600 line-clamp-3 leading-relaxed">
                  {currentJob.company.description}
                </p>

                <div className="border-t border-secondary-100 pt-3 flex items-center justify-between text-xs">
                  <span className="text-secondary-500">Company Size</span>
                  <span className="font-semibold text-secondary-800">{currentJob.company.companySize || '100+'} employees</span>
                </div>

                {currentJob.company.website && (
                  <a
                    href={currentJob.company.website}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary w-full text-center text-xs py-2 block"
                  >
                    Visit Company Website
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 z-50 bg-secondary-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto animate-scale-in">
            <button
              onClick={() => setIsApplyModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-secondary-400 hover:text-secondary-700 rounded-lg hover:bg-secondary-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary-600">
                1-Click Application
              </span>
              <h2 className="text-xl font-bold text-secondary-900">Apply for {currentJob.title}</h2>
              <p className="text-xs text-secondary-500 mt-1">at {currentJob.company?.name}</p>
            </div>

            <form onSubmit={handleSubmitApplication} className="space-y-4">
              {/* Resume Selector */}
              <div>
                <label className="block text-xs font-bold text-secondary-800 mb-1.5">
                  Select or Enter Resume URL (PDF)
                </label>
                <div className="flex items-center gap-2 p-2.5 bg-secondary-50 border border-secondary-200 rounded-xl">
                  <FileText className="w-4 h-4 text-primary-600" />
                  <input
                    type="text"
                    required
                    value={selectedResumeUrl}
                    onChange={(e) => setSelectedResumeUrl(e.target.value)}
                    placeholder="https://.../resume.pdf"
                    className="w-full text-xs text-secondary-900 bg-transparent focus:outline-none"
                  />
                </div>
                {user?.resume?.url && (
                  <p className="text-[11px] text-emerald-600 mt-1 font-medium">
                    ✓ Profile resume automatically attached ({user.resume.filename || 'Resume.pdf'})
                  </p>
                )}
              </div>

              {/* Cover Letter */}
              <div>
                <label className="block text-xs font-bold text-secondary-800 mb-1.5">
                  Cover Letter / Note to Recruiter
                </label>
                <textarea
                  rows={4}
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  placeholder="Introduce yourself and explain why your experience makes you an exceptional match for this role..."
                  className="input-field text-xs resize-none"
                />
              </div>

              {/* Match indicator */}
              <div className="p-3 bg-primary-50 rounded-xl border border-primary-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-primary-800 font-medium">
                  <Sparkles className="w-4 h-4 text-primary-600" />
                  <span>AI Candidate Match Estimate</span>
                </div>
                <span className="font-bold text-primary-700 bg-white px-2 py-0.5 rounded-md border border-primary-200">
                  92% Match
                </span>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsApplyModalOpen(false)}
                  className="btn-secondary text-xs py-2 px-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary text-xs py-2 px-6 font-bold"
                >
                  {submitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default JobDetails;

