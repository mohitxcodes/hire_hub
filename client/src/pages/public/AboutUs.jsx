import React from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import { Target, ShieldCheck, Zap, Users, GraduationCap, Award } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Hero */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-primary-50/60 to-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-widest text-primary-600 bg-primary-100/70 px-3 py-1 rounded-full">
            Our Purpose & Vision
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-secondary-900 tracking-tight mt-4 mb-6">
            Empowering Careers Through Intelligent Technology
          </h1>
          <p className="text-base text-secondary-600 max-w-2xl mx-auto leading-relaxed">
            HireHub was engineered to eliminate friction from tech hiring. We connect ambitious
            engineers, designers, and innovators with verified high-growth companies using automated
            skill verification and transparent tracking.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white border-y border-secondary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-50 border border-secondary-200">
              <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center mb-4">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-secondary-900 mb-2">High Precision Matching</h3>
              <p className="text-xs text-secondary-600 leading-relaxed">
                Our algorithmic skill matching maps candidate competencies against actual project
                demands, boosting interview conversion rates.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-secondary-200">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-secondary-900 mb-2">Verified Companies Only</h3>
              <p className="text-xs text-secondary-600 leading-relaxed">
                Zero fake postings. Every employer on HireHub undergoes manual administrator review
                and domain verification before posting vacancies.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-secondary-200">
              <div className="w-12 h-12 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-secondary-900 mb-2">Full Transparency</h3>
              <p className="text-xs text-secondary-600 leading-relaxed">
                Know where your application stands in real time: Applied, Under Review, Shortlisted,
                Interview Scheduled, or Selected.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Credits */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary-600 text-white flex items-center justify-center mx-auto mb-4 shadow-md">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-secondary-900 mb-2">
            Academic Project & Technical Showcase
          </h2>
          <p className="text-sm text-secondary-600 max-w-xl mx-auto mb-6">
            Developed with excellence by <strong>Mohit Kumar</strong> (UID: <strong>24BCS12347</strong>),
            Section <strong>KRG_617_A</strong> at <strong>Chandigarh University</strong>.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-secondary-200 text-xs font-semibold text-secondary-700 shadow-xs">
            <Award className="w-4 h-4 text-amber-500" />
            <span>Built with MERN Stack • Production Architecture • Tailwind CSS</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;

