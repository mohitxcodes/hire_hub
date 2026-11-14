import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Search, Building2, MapPin, Star, Briefcase, ExternalLink } from 'lucide-react';
import { fetchCompanies } from '../../store/slices/companySlice';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const Companies = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [industry, setIndustry] = useState('');

  const { companies, totalCompanies, loading } = useSelector((state) => state.companies);

  useEffect(() => {
    dispatch(fetchCompanies({ search, industry }));
  }, [dispatch, search, industry]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <div className="bg-white border-b border-secondary-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-2xl">
          <h1 className="text-3xl font-extrabold text-secondary-900">Top Hiring Companies</h1>
          <p className="text-xs sm:text-sm text-secondary-500 mt-2">
            Discover verified companies, tech cultures, employee ratings, and active open roles.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-secondary-50 border border-secondary-200 rounded-xl">
              <Search className="w-4 h-4 text-secondary-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search company by name"
                className="w-full text-xs text-secondary-900 bg-transparent focus:outline-none"
              />
            </div>

            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="px-3 py-2 bg-secondary-50 border border-secondary-200 rounded-xl text-xs text-secondary-800 focus:outline-none"
            >
              <option value="">All Industries</option>
              <option value="Technology">Technology</option>
              <option value="Fintech">Fintech</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Travel & Hospitality">Travel & Hospitality</option>
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        {loading ? (
          <LoadingSpinner size="lg" text="Loading company directory..." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies && companies.length > 0 ? (
              companies.map((company) => (
                <div
                  key={company._id}
                  className="card p-6 flex flex-col justify-between hover:border-primary-400 hover:shadow-lg transition-all"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-secondary-50 border border-secondary-200 p-2 flex items-center justify-center overflow-hidden">
                        {company.logo ? (
                          <img
                            src={company.logo}
                            alt={company.name}
                            className="max-h-full max-w-full object-contain"
                          />
                        ) : (
                          <Building2 className="w-7 h-7 text-secondary-400" />
                        )}
                      </div>

                      <div className="flex items-center gap-1 text-xs text-amber-500 font-semibold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{company.rating || 4.8}</span>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-secondary-900 mt-4">{company.name}</h3>
                    <div className="flex items-center gap-1 text-xs text-secondary-400 mt-0.5">
                      <MapPin className="w-3 h-3" />
                      <span>{company.location}</span>
                    </div>

                    <p className="text-xs text-secondary-600 line-clamp-3 mt-3 leading-relaxed">
                      {company.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-4 text-[11px]">
                      <span className="badge bg-secondary-100 text-secondary-700">
                        {company.industry}
                      </span>
                      <span className="badge bg-secondary-100 text-secondary-700">
                        {company.companySize || '100+'} employees
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-secondary-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-2.5 py-1 rounded-md">
                      {company.openJobsCount || 2} Open Jobs
                    </span>

                    <Link
                      to={`/companies/${company._id}`}
                      className="text-xs font-bold text-secondary-700 hover:text-primary-600 flex items-center gap-1"
                    >
                      <span>Explore</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-sm text-secondary-400">
                No companies found matching your search.
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Companies;

