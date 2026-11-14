import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  FileText,
  Edit3,
  Award,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';

const SeekerProfile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <DashboardLayout title="My Professional Profile">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Profile Card Header */}
        <div className="card p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-secondary-100">
            <div className="flex items-center gap-5">
              <img
                src={
                  user?.avatar ||
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
                }
                alt={user?.name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-primary-500 shadow-md"
              />
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-secondary-900">{user?.name}</h2>
                <p className="text-sm font-semibold text-primary-600 mt-0.5">
                  {user?.title || 'Full Stack Engineer'}
                </p>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-secondary-500">
                  {user?.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {user.location}
                    </span>
                  )}
                  {user?.phone && (
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5" />
                      {user.phone}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5" />
                    {user?.email}
                  </span>
                </div>
              </div>
            </div>

            <Link
              to="/seeker/edit-profile"
              className="btn-primary text-xs py-2.5 px-5 flex items-center gap-1.5 self-start sm:self-auto"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Profile</span>
            </Link>
          </div>

          {/* Bio */}
          <div className="pt-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-secondary-800 mb-2">
              Professional Summary
            </h3>
            <p className="text-xs sm:text-sm text-secondary-600 leading-relaxed max-w-3xl">
              {user?.bio ||
                'Passionate software engineer building resilient modern web applications with React, Node.js, Express, and MongoDB. Seeking high-impact software engineering roles.'}
            </p>
          </div>
        </div>

        {/* Technical Skills */}
        <div className="card p-6 sm:p-8">
          <h3 className="text-base font-bold text-secondary-900 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-primary-600" />
            Skills & Proficiencies
          </h3>
          <div className="flex flex-wrap gap-2">
            {user?.skills && user.skills.length > 0 ? (
              user.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 rounded-lg bg-primary-50 text-primary-700 text-xs font-semibold border border-primary-200"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-xs text-secondary-400">No skills added yet. Update profile to add skills.</p>
            )}
          </div>
        </div>

        {/* Work Experience */}
        <div className="card p-6 sm:p-8">
          <h3 className="text-base font-bold text-secondary-900 mb-6 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-primary-600" />
            Work Experience
          </h3>

          <div className="space-y-6">
            {user?.experience && user.experience.length > 0 ? (
              user.experience.map((exp, idx) => (
                <div key={idx} className="relative pl-6 border-l-2 border-primary-200 space-y-1">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary-600 border-2 border-white" />
                  <h4 className="text-sm font-bold text-secondary-900">{exp.title}</h4>
                  <p className="text-xs font-semibold text-primary-600">{exp.company} • {exp.location}</p>
                  <p className="text-[11px] text-secondary-400">
                    {new Date(exp.startDate).toLocaleDateString()} -{' '}
                    {exp.isCurrent ? 'Present' : exp.endDate ? new Date(exp.endDate).toLocaleDateString() : 'N/A'}
                  </p>
                  <p className="text-xs text-secondary-600 mt-2 leading-relaxed">{exp.description}</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-secondary-400">No work experience listed yet.</p>
            )}
          </div>
        </div>

        {/* Education */}
        <div className="card p-6 sm:p-8">
          <h3 className="text-base font-bold text-secondary-900 mb-6 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-primary-600" />
            Education
          </h3>

          <div className="space-y-4">
            {user?.education && user.education.length > 0 ? (
              user.education.map((edu, idx) => (
                <div key={idx} className="p-4 bg-secondary-50/70 rounded-xl border border-secondary-200/80">
                  <h4 className="text-sm font-bold text-secondary-900">{edu.degree}</h4>
                  <p className="text-xs text-primary-600 font-semibold">{edu.institution}</p>
                  <p className="text-[11px] text-secondary-400 mt-0.5">
                    {edu.startYear} - {edu.endYear} {edu.grade ? `• Grade: ${edu.grade}` : ''}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-xs text-secondary-400">No education entries added yet.</p>
            )}
          </div>
        </div>

        {/* Resume & ATS Scanner Card */}
        <div className="card p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-slate-900 text-white">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-primary-400 tracking-wider">
              ATS Score & Resume File
            </span>
            <h3 className="text-lg font-bold">
              {user?.resume?.filename || 'Resume_Document.pdf'}
            </h3>
            <p className="text-xs text-slate-300">
              Scanned with automatic keyword and structural analysis.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-center bg-slate-800 p-3 rounded-xl border border-slate-700">
              <span className="block text-2xl font-black text-emerald-400">
                {user?.resume?.atsScore || 92}/100
              </span>
              <span className="text-[10px] text-slate-400">ATS Match Score</span>
            </div>

            <Link
              to="/seeker/resume"
              className="btn-primary bg-primary-600 hover:bg-primary-500 text-xs py-3 px-5 font-bold"
            >
              Manage Resume
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SeekerProfile;

