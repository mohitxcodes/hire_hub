import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Briefcase, PlusCircle, Plus, Trash2, ArrowLeft } from 'lucide-react';
import { createJob } from '../../store/slices/jobSlice';
import DashboardLayout from '../../components/layout/DashboardLayout';
import toast from 'react-hot-toast';

const PostJob = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    industry: 'Technology',
    workplaceType: 'remote',
    jobType: 'full-time',
    experienceLevel: 'mid',
    location: 'Remote',
    salaryMin: 90000,
    salaryMax: 130000,
    salaryCurrency: 'USD',
    isSalaryNegotiable: true,
    description: '',
    featured: false,
  });

  const [skills, setSkills] = useState(['React', 'Node.js', 'Express', 'MongoDB']);
  const [newSkill, setNewSkill] = useState('');

  const [responsibilities, setResponsibilities] = useState([
    'Design and develop robust, highly scalable full-stack web applications',
    'Collaborate across cross-functional product and engineering teams',
  ]);
  const [newResp, setNewResp] = useState('');

  const [requirements, setRequirements] = useState([
    '3+ years of hands-on experience in full-stack engineering',
    'Demonstrated mastery of JavaScript, React, Node.js, and MongoDB',
  ]);
  const [newReq, setNewReq] = useState('');

  const [loading, setLoading] = useState(false);

  // Skill management
  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (s) => setSkills(skills.filter((x) => x !== s));

  // Responsibilities
  const handleAddResp = (e) => {
    e.preventDefault();
    if (newResp.trim()) {
      setResponsibilities([...responsibilities, newResp.trim()]);
      setNewResp('');
    }
  };

  const handleRemoveResp = (i) => setResponsibilities(responsibilities.filter((_, idx) => idx !== i));

  // Requirements
  const handleAddReq = (e) => {
    e.preventDefault();
    if (newReq.trim()) {
      setRequirements([...requirements, newReq.trim()]);
      setNewReq('');
    }
  };

  const handleRemoveReq = (i) => setRequirements(requirements.filter((_, idx) => idx !== i));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      toast.error('Please fill in title and description');
      return;
    }

    setLoading(true);
    dispatch(
      createJob({
        ...formData,
        skills,
        responsibilities,
        requirements,
      })
    )
      .unwrap()
      .then(() => {
        toast.success('Job vacancy posted successfully!');
        navigate('/recruiter/jobs');
      })
      .catch((err) => toast.error(err))
      .finally(() => setLoading(false));
  };

  return (
    <DashboardLayout title="Post a New Job Vacancy">
      <div className="max-w-4xl mx-auto space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Main Role Details */}
          <div className="card p-6 sm:p-8 space-y-4">
            <h3 className="text-base font-bold text-secondary-900 border-b border-secondary-100 pb-3">
              Position Specifications
            </h3>

            <div>
              <label className="block text-xs font-bold text-secondary-800 mb-1.5">
                Job Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Senior Full Stack MERN Developer"
                className="input-field text-xs py-2.5"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-secondary-800 mb-1.5">
                  Industry
                </label>
                <select
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="input-field text-xs py-2.5"
                >
                  <option value="Technology">Technology</option>
                  <option value="Fintech">Fintech</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Travel & Hospitality">Travel & Hospitality</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="E-Commerce">E-Commerce</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-secondary-800 mb-1.5">
                  Employment Type
                </label>
                <select
                  value={formData.jobType}
                  onChange={(e) => setFormData({ ...formData, jobType: e.target.value })}
                  className="input-field text-xs py-2.5"
                >
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-secondary-800 mb-1.5">
                  Workplace Setting
                </label>
                <select
                  value={formData.workplaceType}
                  onChange={(e) => setFormData({ ...formData, workplaceType: e.target.value })}
                  className="input-field text-xs py-2.5"
                >
                  <option value="remote">Remote</option>
                  <option value="on-site">On-site</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-secondary-800 mb-1.5">
                  Experience Seniority
                </label>
                <select
                  value={formData.experienceLevel}
                  onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                  className="input-field text-xs py-2.5"
                >
                  <option value="entry">Entry Level</option>
                  <option value="mid">Mid Level</option>
                  <option value="senior">Senior Level</option>
                  <option value="lead">Lead / Architect</option>
                  <option value="executive">Executive</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-secondary-800 mb-1.5">
                  Location (City or 'Remote')
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. San Francisco, CA or Remote"
                  className="input-field text-xs py-2.5"
                />
              </div>
            </div>

            {/* Compensation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-secondary-800 mb-1.5">
                  Minimum Annual Salary ($)
                </label>
                <input
                  type="number"
                  required
                  value={formData.salaryMin}
                  onChange={(e) => setFormData({ ...formData, salaryMin: Number(e.target.value) })}
                  className="input-field text-xs py-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-secondary-800 mb-1.5">
                  Maximum Annual Salary ($)
                </label>
                <input
                  type="number"
                  required
                  value={formData.salaryMax}
                  onChange={(e) => setFormData({ ...formData, salaryMax: Number(e.target.value) })}
                  className="input-field text-xs py-2.5"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="isNegotiable"
                checked={formData.isSalaryNegotiable}
                onChange={(e) => setFormData({ ...formData, isSalaryNegotiable: e.target.checked })}
                className="rounded text-primary-600 focus:ring-primary-500 w-4 h-4"
              />
              <label htmlFor="isNegotiable" className="text-xs text-secondary-700 font-medium">
                Salary is negotiable based on candidate experience
              </label>
            </div>
          </div>

          {/* Job Description */}
          <div className="card p-6 sm:p-8 space-y-4">
            <h3 className="text-base font-bold text-secondary-900 border-b border-secondary-100 pb-3">
              Description & Requirements
            </h3>

            <div>
              <label className="block text-xs font-bold text-secondary-800 mb-1.5">
                Role Summary & Job Description *
              </label>
              <textarea
                rows={5}
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe team mission, technical objectives, and key day-to-day work..."
                className="input-field text-xs resize-none"
              />
            </div>

            {/* Responsibilities list */}
            <div>
              <label className="block text-xs font-bold text-secondary-800 mb-1.5">
                Key Responsibilities
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newResp}
                  onChange={(e) => setNewResp(e.target.value)}
                  placeholder="Add a core responsibility"
                  className="input-field text-xs py-2 flex-1"
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddResp(e))}
                />
                <button
                  type="button"
                  onClick={handleAddResp}
                  className="btn-secondary text-xs py-2 px-3"
                >
                  Add
                </button>
              </div>
              <ul className="space-y-1.5 text-xs">
                {responsibilities.map((resp, i) => (
                  <li key={i} className="flex items-center justify-between p-2 bg-secondary-50 rounded-lg">
                    <span>• {resp}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveResp(i)}
                      className="text-rose-500 hover:text-rose-700"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements list */}
            <div>
              <label className="block text-xs font-bold text-secondary-800 mb-1.5">
                Requirements & Qualifications
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newReq}
                  onChange={(e) => setNewReq(e.target.value)}
                  placeholder="Add a requirement"
                  className="input-field text-xs py-2 flex-1"
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddReq(e))}
                />
                <button
                  type="button"
                  onClick={handleAddReq}
                  className="btn-secondary text-xs py-2 px-3"
                >
                  Add
                </button>
              </div>
              <ul className="space-y-1.5 text-xs">
                {requirements.map((req, i) => (
                  <li key={i} className="flex items-center justify-between p-2 bg-secondary-50 rounded-lg">
                    <span>• {req}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveReq(i)}
                      className="text-rose-500 hover:text-rose-700"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills */}
            <div>
              <label className="block text-xs font-bold text-secondary-800 mb-1.5">
                Required Technical Skills (Used for AI Match Algorithm)
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Type skill (e.g. React, Node.js)"
                  className="input-field text-xs py-2 flex-1"
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill(e))}
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="btn-secondary text-xs py-2 px-3"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((s, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-50 text-primary-700 rounded-lg text-xs font-semibold border border-primary-200"
                  >
                    <span>{s}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(s)}
                      className="text-primary-400 hover:text-primary-700 font-bold"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/recruiter/dashboard')}
              className="btn-secondary text-xs py-2.5 px-5"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary text-xs py-2.5 px-8 font-bold flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{loading ? 'Publishing...' : 'Publish Job Vacancy'}</span>
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default PostJob;

