import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Save, Plus, Trash2, ArrowLeft } from 'lucide-react';
import { updateProfile } from '../../store/slices/authSlice';
import DashboardLayout from '../../components/layout/DashboardLayout';
import toast from 'react-hot-toast';

const SeekerEditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    title: user?.title || '',
    bio: user?.bio || '',
    phone: user?.phone || '',
    location: user?.location || '',
  });

  const [skills, setSkills] = useState(user?.skills || ['React', 'Node.js', 'Express', 'MongoDB']);
  const [newSkill, setNewSkill] = useState('');

  const [experience, setExperience] = useState(
    user?.experience || [
      {
        title: 'Full Stack Developer',
        company: 'Innovatech Solutions',
        location: 'Remote',
        startDate: '2023-01-01',
        endDate: '2023-12-31',
        isCurrent: false,
        description: 'Developed modern web applications using MERN stack.',
      },
    ]
  );

  const [education, setEducation] = useState(
    user?.education || [
      {
        degree: 'Bachelor of Technology in Computer Science',
        institution: 'Chandigarh University',
        fieldOfStudy: 'Computer Science and Engineering',
        startYear: 2021,
        endYear: 2025,
        grade: '9.2 CGPA',
      },
    ]
  );

  const [loading, setLoading] = useState(false);

  // Skill management
  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  // Experience management
  const handleAddExperience = () => {
    setExperience([
      ...experience,
      {
        title: '',
        company: '',
        location: '',
        startDate: new Date().toISOString().split('T')[0],
        endDate: '',
        isCurrent: false,
        description: '',
      },
    ]);
  };

  const handleUpdateExperience = (index, field, value) => {
    const updated = [...experience];
    updated[index] = { ...updated[index], [field]: value };
    setExperience(updated);
  };

  const handleRemoveExperience = (index) => {
    setExperience(experience.filter((_, i) => i !== index));
  };

  // Education management
  const handleAddEducation = () => {
    setEducation([
      ...education,
      {
        degree: '',
        institution: '',
        fieldOfStudy: '',
        startYear: 2020,
        endYear: 2024,
        grade: '',
      },
    ]);
  };

  const handleUpdateEducation = (index, field, value) => {
    const updated = [...education];
    updated[index] = { ...updated[index], [field]: value };
    setEducation(updated);
  };

  const handleRemoveEducation = (index) => {
    setEducation(education.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    dispatch(
      updateProfile({
        ...formData,
        skills,
        experience,
        education,
      })
    )
      .unwrap()
      .then(() => {
        toast.success('Profile updated successfully!');
        navigate('/seeker/profile');
      })
      .catch((err) => toast.error(err))
      .finally(() => setLoading(false));
  };

  return (
    <DashboardLayout title="Edit Profile Details">
      <div className="max-w-4xl mx-auto space-y-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="card p-6 sm:p-8 space-y-4">
            <h3 className="text-base font-bold text-secondary-900 border-b border-secondary-100 pb-3">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-secondary-800 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-field text-xs py-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-secondary-800 mb-1.5">
                  Professional Headline / Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Senior Full Stack Developer"
                  className="input-field text-xs py-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-secondary-800 mb-1.5">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 9876543210"
                  className="input-field text-xs py-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-secondary-800 mb-1.5">
                  Location (City, Country)
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Chandigarh, India"
                  className="input-field text-xs py-2.5"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-secondary-800 mb-1.5">
                Professional Bio / Summary
              </label>
              <textarea
                rows={4}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Highlight your key achievements and expertise..."
                className="input-field text-xs resize-none"
              />
            </div>
          </div>

          {/* Technical Skills */}
          <div className="card p-6 sm:p-8 space-y-4">
            <h3 className="text-base font-bold text-secondary-900 border-b border-secondary-100 pb-3">
              Skills
            </h3>

            <div className="flex gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Type skill (e.g. Docker, TypeScript)"
                className="input-field text-xs py-2 flex-1"
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill(e))}
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="btn-primary text-xs py-2 px-4"
              >
                Add Skill
              </button>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-primary-50 text-primary-700 text-xs font-semibold border border-primary-200"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-primary-400 hover:text-primary-700 font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="card p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-secondary-100 pb-3">
              <h3 className="text-base font-bold text-secondary-900">Experience</h3>
              <button
                type="button"
                onClick={handleAddExperience}
                className="text-xs font-bold text-primary-600 hover:text-primary-700 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Position
              </button>
            </div>

            <div className="space-y-6">
              {experience.map((exp, idx) => (
                <div key={idx} className="p-4 bg-secondary-50 rounded-xl border border-secondary-200 space-y-3 relative">
                  <button
                    type="button"
                    onClick={() => handleRemoveExperience(idx)}
                    className="absolute top-3 right-3 text-rose-500 hover:text-rose-700 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-8">
                    <div>
                      <label className="block text-[11px] font-bold text-secondary-700 mb-1">Title</label>
                      <input
                        type="text"
                        value={exp.title}
                        onChange={(e) => handleUpdateExperience(idx, 'title', e.target.value)}
                        placeholder="e.g. Frontend Engineer"
                        className="input-field text-xs py-2 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-secondary-700 mb-1">Company</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => handleUpdateExperience(idx, 'company', e.target.value)}
                        placeholder="e.g. Acme Corp"
                        className="input-field text-xs py-2 bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-secondary-700 mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={exp.description}
                      onChange={(e) => handleUpdateExperience(idx, 'description', e.target.value)}
                      placeholder="Summary of responsibilities and achievements"
                      className="input-field text-xs py-2 bg-white resize-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="card p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-secondary-100 pb-3">
              <h3 className="text-base font-bold text-secondary-900">Education</h3>
              <button
                type="button"
                onClick={handleAddEducation}
                className="text-xs font-bold text-primary-600 hover:text-primary-700 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Degree
              </button>
            </div>

            <div className="space-y-4">
              {education.map((edu, idx) => (
                <div key={idx} className="p-4 bg-secondary-50 rounded-xl border border-secondary-200 space-y-3 relative">
                  <button
                    type="button"
                    onClick={() => handleRemoveEducation(idx)}
                    className="absolute top-3 right-3 text-rose-500 hover:text-rose-700 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-8">
                    <div>
                      <label className="block text-[11px] font-bold text-secondary-700 mb-1">Degree</label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => handleUpdateEducation(idx, 'degree', e.target.value)}
                        placeholder="Bachelor of Engineering"
                        className="input-field text-xs py-2 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-secondary-700 mb-1">Institution</label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => handleUpdateEducation(idx, 'institution', e.target.value)}
                        placeholder="Chandigarh University"
                        className="input-field text-xs py-2 bg-white"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit buttons */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate('/seeker/profile')}
              className="btn-secondary text-xs py-2.5 px-6"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary text-xs py-2.5 px-8 font-bold flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{loading ? 'Saving...' : 'Save Profile Changes'}</span>
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default SeekerEditProfile;

