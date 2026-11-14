import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Bookmark, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchSavedJobs } from '../../store/slices/jobSlice';
import DashboardLayout from '../../components/layout/DashboardLayout';
import JobCard from '../../components/common/JobCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';

const SeekerSavedJobs = () => {
  const dispatch = useDispatch();
  const { savedJobs, loading } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(fetchSavedJobs());
  }, [dispatch]);

  return (
    <DashboardLayout title="Saved Job Bookmarks">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-xs text-secondary-500">
            You have <strong className="text-secondary-900">{savedJobs?.length || 0}</strong> bookmarked positions
          </p>
          <Link
            to="/jobs"
            className="text-xs font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1"
          >
            <span>Explore More Jobs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <LoadingSpinner size="lg" text="Loading saved jobs..." />
        ) : savedJobs && savedJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedJobs.map((job) => (
              <JobCard
                key={job._id}
                job={job}
                onSaveToggle={() => dispatch(fetchSavedJobs())}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Bookmark}
            title="No saved jobs yet"
            description="Bookmark jobs while browsing to review and apply to them later."
            action={
              <Link to="/jobs" className="btn-primary text-xs py-2 px-5">
                Browse Vacancies
              </Link>
            }
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default SeekerSavedJobs;

