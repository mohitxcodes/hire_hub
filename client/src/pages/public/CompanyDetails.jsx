import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Building2,
  MapPin,
  Globe,
  Star,
  Users,
  Briefcase,
  ArrowLeft,
  Calendar,
  CheckCircle,
} from 'lucide-react';
import { fetchCompanyById } from '../../store/slices/companySlice';
import JobCard from '../../components/common/JobCard';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const CompanyDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { currentCompany, companyJobs, loading } = useSelector((state) => state.companies);

  useEffect(() => {
    if (id) {
      dispatch(fetchCompanyById(id));
      window.scrollTo(0, 0);
    }
  }, [id, dispatch]);

  if (loading || !currentCompany) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <LoadingSpinner size="lg" text="Loading company profile..." />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      {/* Header Banner */}
      <div className="bg-white border-b border-secondary-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/companies"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary-500 hover:text-primary-600 mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Companies</span>
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-2xl bg-secondary-50 border border-secondary-200 p-2.5 flex items-center justify-center overflow-hidden shadow-sm">
                {currentCompany.logo ? (
                  <img
                    src={currentCompany.logo}
                    alt={currentCompany.name}
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <Building2 className="w-10 h-10 text-secondary-400" />
                )}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-secondary-900">
                    {currentCompany.name}
                  </h1>
                  {currentCompany.verified && (
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-emerald-600" /> Verified
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-secondary-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {currentCompany.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    {currentCompany.companySize || '100+'} employees
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    {currentCompany.rating || 4.8} / 5.0
                  </span>
                </div>
              </div>
            </div>

            {currentCompany.website && (
              <a
                href={currentCompany.website}
                target="_blank"
                rel="noreferrer"
                className="btn-outline flex items-center justify-center gap-2 text-xs font-semibold self-start sm:self-auto py-2.5 px-6"
              >
                <Globe className="w-4 h-4" />
                <span>Visit Careers Page</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-10">
        {/* About section */}
        <div className="card p-6 sm:p-8">
          <h2 className="text-base font-bold text-secondary-900 mb-3">About {currentCompany.name}</h2>
          <p className="text-sm text-secondary-600 leading-relaxed max-w-4xl">
            {currentCompany.description}
          </p>
        </div>

        {/* Open Positions List */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-secondary-900 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-primary-600" />
              Open Positions ({companyJobs?.length || 0})
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companyJobs && companyJobs.length > 0 ? (
              companyJobs.map((job) => (
                <JobCard key={job._id} job={{ ...job, company: currentCompany }} />
              ))
            ) : (
              <div className="col-span-full card p-8 text-center text-xs text-secondary-500">
                No active open vacancies currently posted for this company.
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CompanyDetails;

