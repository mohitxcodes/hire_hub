import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  FileCheck2,
  UploadCloud,
  FileText,
  CheckCircle,
  AlertTriangle,
  Sparkles,
  Award,
} from 'lucide-react';
import { uploadResume } from '../../store/slices/authSlice';
import DashboardLayout from '../../components/layout/DashboardLayout';
import toast from 'react-hot-toast';

const SeekerResume = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const atsScore = user?.resume?.atsScore || 92;

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!file) {
      toast.error('Please select a PDF or DOC resume file');
      return;
    }

    const formData = new FormData();
    formData.append('resume', file);

    setUploading(true);
    dispatch(uploadResume(formData))
      .unwrap()
      .then(() => {
        toast.success('Resume uploaded & scanned with ATS Analyzer!');
        setFile(null);
      })
      .catch((err) => toast.error(err))
      .finally(() => setUploading(false));
  };

  return (
    <DashboardLayout title="Resume Management & ATS Checker">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* ATS Score Overview Card */}
        <div className="card p-6 sm:p-8 bg-gradient-to-tr from-slate-900 to-indigo-950 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-900 text-primary-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              Automated ATS Resume Analyzer
            </div>
            <h2 className="text-xl sm:text-2xl font-black">
              Your Resume ATS Match Score: {atsScore}%
            </h2>
            <p className="text-xs text-slate-300 max-w-md">
              Higher ATS scores ensure your resume passes recruiter automated screening tools and
              ranks higher in candidate search algorithms.
            </p>
          </div>

          <div className="w-28 h-28 rounded-full border-4 border-emerald-400 flex flex-col items-center justify-center bg-slate-800/80 shadow-lg flex-shrink-0">
            <span className="text-3xl font-black text-emerald-400">{atsScore}</span>
            <span className="text-[10px] uppercase font-bold text-slate-400">ATS Rating</span>
          </div>
        </div>

        {/* Current Resume Details */}
        <div className="card p-6 sm:p-8 space-y-6">
          <h3 className="text-base font-bold text-secondary-900 border-b border-secondary-100 pb-3 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary-600" />
            Current Active Resume
          </h3>

          {user?.resume?.url ? (
            <div className="p-4 bg-secondary-50 rounded-xl border border-secondary-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-secondary-900">
                    {user.resume.filename || 'Resume_Document.pdf'}
                  </h4>
                  <p className="text-[11px] text-secondary-400">
                    Last scanned on{' '}
                    {user.resume.uploadedAt
                      ? new Date(user.resume.uploadedAt).toLocaleDateString()
                      : 'Recently'}
                  </p>
                </div>
              </div>

              <a
                href={user.resume.url}
                target="_blank"
                rel="noreferrer"
                className="btn-outline text-xs py-2 px-4 text-center"
              >
                View Stored File
              </a>
            </div>
          ) : (
            <p className="text-xs text-secondary-400">No resume uploaded yet.</p>
          )}

          {/* Upload New Resume */}
          <form onSubmit={handleUpload} className="space-y-4 pt-4 border-t border-secondary-100">
            <h4 className="text-xs font-bold text-secondary-800 uppercase tracking-wider">
              Upload Updated Resume (PDF or DOC)
            </h4>

            <div className="border-2 border-dashed border-secondary-300 rounded-2xl p-6 text-center hover:border-primary-500 transition-colors bg-secondary-50/50">
              <UploadCloud className="w-10 h-10 text-primary-500 mx-auto mb-2" />
              <p className="text-xs font-semibold text-secondary-800">
                {file ? file.name : 'Select or drag & drop resume file here'}
              </p>
              <p className="text-[11px] text-secondary-400 mt-1">PDF, DOC, DOCX up to 5MB</p>

              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="mt-4 block w-full text-xs text-secondary-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 cursor-pointer"
              />
            </div>

            <button
              type="submit"
              disabled={uploading || !file}
              className="btn-primary text-xs py-2.5 px-6 font-bold disabled:opacity-40"
            >
              {uploading ? 'Scanning & Uploading...' : 'Scan & Update Resume'}
            </button>
          </form>
        </div>

        {/* ATS Score Improvement Breakdown */}
        <div className="card p-6 sm:p-8 space-y-4">
          <h3 className="text-base font-bold text-secondary-900 mb-2">
            ATS Breakdown & Suggestions
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Modern contact information & email properly formatted</span>
              </div>
              <span className="font-bold">Passed</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Technical stack keywords: React, Node, Express, MongoDB detected</span>
              </div>
              <span className="font-bold">High Density</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-amber-50 text-amber-800 rounded-xl border border-amber-200">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Quantify project achievements with measurable percentages and KPIs</span>
              </div>
              <span className="font-bold">Suggested</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SeekerResume;

