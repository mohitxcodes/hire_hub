import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Mail, Send, Heart, Globe, Linkedin, Twitter, Github } from 'lucide-react';
import toast from 'react-hot-toast';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter a valid email');
      return;
    }
    toast.success('Thank you for subscribing to HireHub career updates!');
    setEmail('');
  };

  return (
    <footer className="bg-secondary-900 text-secondary-300 pt-16 pb-12 border-t border-secondary-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-secondary-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary-500 to-violet-500 flex items-center justify-center text-white shadow-md">
                <Briefcase className="w-5 h-5" />
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                Hire<span className="text-primary-400">Hub</span>
              </span>
            </Link>
            <p className="text-sm text-secondary-400 max-w-sm leading-relaxed">
              HireHub is the next-generation intelligent job portal platform connecting ambitious
              professionals with industry-leading companies worldwide.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-secondary-800 hover:bg-primary-600 hover:text-white flex items-center justify-center transition-colors text-secondary-400"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-secondary-800 hover:bg-primary-600 hover:text-white flex items-center justify-center transition-colors text-secondary-400"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-secondary-800 hover:bg-primary-600 hover:text-white flex items-center justify-center transition-colors text-secondary-400"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://hirehub.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-secondary-800 hover:bg-primary-600 hover:text-white flex items-center justify-center transition-colors text-secondary-400"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick links: Job Seekers */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              For Job Seekers
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/jobs" className="hover:text-white transition-colors">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link to="/companies" className="hover:text-white transition-colors">
                  Top Companies
                </Link>
              </li>
              <li>
                <Link to="/seeker/saved-jobs" className="hover:text-white transition-colors">
                  Saved Jobs
                </Link>
              </li>
              <li>
                <Link to="/seeker/applications" className="hover:text-white transition-colors">
                  Track Applications
                </Link>
              </li>
              <li>
                <Link to="/seeker/profile" className="hover:text-white transition-colors">
                  ATS Resume Scanner
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick links: Employers */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              For Employers
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/recruiter/post-job" className="hover:text-white transition-colors">
                  Post a Vacancy
                </Link>
              </li>
              <li>
                <Link to="/recruiter/applicants" className="hover:text-white transition-colors">
                  Candidate Pipeline
                </Link>
              </li>
              <li>
                <Link to="/recruiter/analytics" className="hover:text-white transition-colors">
                  Recruitment Analytics
                </Link>
              </li>
              <li>
                <Link to="/recruiter/company" className="hover:text-white transition-colors">
                  Company Branding
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Stay Informed
            </h4>
            <p className="text-xs text-secondary-400 mb-3 leading-relaxed">
              Get weekly job alerts, salary benchmarks, and hiring insights.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-secondary-800 border border-secondary-700 rounded-lg py-2 pl-3 pr-9 text-xs text-white placeholder-secondary-500 focus:outline-none focus:border-primary-500"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 p-1 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-secondary-500 gap-4">
          <p>© {new Date().getFullYear()} HireHub Inc. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> by Mohit Kumar | Chandigarh University
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

