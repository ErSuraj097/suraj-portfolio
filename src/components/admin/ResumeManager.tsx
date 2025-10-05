'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save } from 'lucide-react';
import ConfirmDialog from './ConfirmDialog';

interface Resume {
  _id: string;
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    linkedin: string;
    github: string;
  };
  summary: string;
  experience: Array<{
    company: string;
    position: string;
    duration: string;
    description: string;
    achievements: string[];
  }>;
  education: Array<{
    institution: string;
    degree: string;
    duration: string;
    gpa?: string;
  }>;
  skills: Array<{
    category: string;
    items: string[];
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    date: string;
    url?: string;
  }>;
  updatedAt: string;
}

export default function ResumeManager() {
  const [resume, setResume] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const response = await fetch('/api/resume');
      if (response.ok) {
        const data = await response.json();
        setResume(data[0] || getDefaultResume());
      } else {
        setResume(getDefaultResume());
      }
    } catch (error) {
      console.error('Error fetching resume:', error);
      setResume(getDefaultResume());
    } finally {
      setLoading(false);
    }
  };

  const getDefaultResume = (): Resume => ({
    _id: '',
    personalInfo: {
      name: '',
      title: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      linkedin: '',
      github: '',
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    certifications: [],
    updatedAt: new Date().toISOString(),
  });

  const handleSave = async () => {
    if (!resume) return;
    
    setSaving(true);
    try {
      const url = resume._id ? `/api/resume/${resume._id}` : '/api/resume';
      const method = resume._id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resume),
      });

      if (response.ok) {
        const data = await response.json();
        setResume(data);
      }
    } catch (error) {
      console.error('Error saving resume:', error);
    } finally {
      setSaving(false);
    }
  };

  const addExperience = () => {
    if (!resume) return;
    setResume({
      ...resume,
      experience: [
        ...resume.experience,
        {
          company: '',
          position: '',
          duration: '',
          description: '',
          achievements: [''],
        },
      ],
    });
  };

  const updateExperience = (index: number, field: string, value: any) => {
    if (!resume) return;
    const updated = [...resume.experience];
    updated[index] = { ...updated[index], [field]: value };
    setResume({ ...resume, experience: updated });
  };

  const removeExperience = (index: number) => {
    if (!resume) return;
    setResume({
      ...resume,
      experience: resume.experience.filter((_, i) => i !== index),
    });
  };

  const addEducation = () => {
    if (!resume) return;
    setResume({
      ...resume,
      education: [
        ...resume.education,
        {
          institution: '',
          degree: '',
          duration: '',
          gpa: '',
        },
      ],
    });
  };

  const updateEducation = (index: number, field: string, value: string) => {
    if (!resume) return;
    const updated = [...resume.education];
    updated[index] = { ...updated[index], [field]: value };
    setResume({ ...resume, education: updated });
  };

  const removeEducation = (index: number) => {
    if (!resume) return;
    setResume({
      ...resume,
      education: resume.education.filter((_, i) => i !== index),
    });
  };

  const addSkillCategory = () => {
    if (!resume) return;
    setResume({
      ...resume,
      skills: [
        ...resume.skills,
        {
          category: '',
          items: [''],
        },
      ],
    });
  };

  const updateSkillCategory = (index: number, field: string, value: any) => {
    if (!resume) return;
    const updated = [...resume.skills];
    updated[index] = { ...updated[index], [field]: value };
    setResume({ ...resume, skills: updated });
  };

  const removeSkillCategory = (index: number) => {
    if (!resume) return;
    setResume({
      ...resume,
      skills: resume.skills.filter((_, i) => i !== index),
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!resume) return null;

  const tabs = [
    { id: 'personal', label: 'Personal Info' },
    { id: 'summary', label: 'Summary' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'certifications', label: 'Certifications' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Resume Management</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          <span>{saving ? 'Saving...' : 'Save Resume'}</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'personal' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={resume.personalInfo.name}
                    onChange={(e) => setResume({
                      ...resume,
                      personalInfo: { ...resume.personalInfo, name: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={resume.personalInfo.title}
                    onChange={(e) => setResume({
                      ...resume,
                      personalInfo: { ...resume.personalInfo, title: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={resume.personalInfo.email}
                    onChange={(e) => setResume({
                      ...resume,
                      personalInfo: { ...resume.personalInfo, email: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={resume.personalInfo.phone}
                    onChange={(e) => setResume({
                      ...resume,
                      personalInfo: { ...resume.personalInfo, phone: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={resume.personalInfo.location}
                    onChange={(e) => setResume({
                      ...resume,
                      personalInfo: { ...resume.personalInfo, location: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                  <input
                    type="url"
                    value={resume.personalInfo.website}
                    onChange={(e) => setResume({
                      ...resume,
                      personalInfo: { ...resume.personalInfo, website: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                  <input
                    type="url"
                    value={resume.personalInfo.linkedin}
                    onChange={(e) => setResume({
                      ...resume,
                      personalInfo: { ...resume.personalInfo, linkedin: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">GitHub</label>
                  <input
                    type="url"
                    value={resume.personalInfo.github}
                    onChange={(e) => setResume({
                      ...resume,
                      personalInfo: { ...resume.personalInfo, github: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'summary' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Professional Summary</label>
              <textarea
                rows={6}
                value={resume.summary}
                onChange={(e) => setResume({ ...resume, summary: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Write a brief professional summary..."
              />
            </div>
          )}

          {activeTab === 'experience' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Work Experience</h3>
                <button
                  onClick={addExperience}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Experience</span>
                </button>
              </div>

              {resume.experience.map((exp, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-4">
                  <div className="flex justify-between items-start">
                    <h4 className="text-md font-medium text-gray-900">Experience {index + 1}</h4>
                    <button
                      onClick={() => removeExperience(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => updateExperience(index, 'company', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                      <input
                        type="text"
                        value={exp.position}
                        onChange={(e) => updateExperience(index, 'position', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                    <input
                      type="text"
                      value={exp.duration}
                      onChange={(e) => updateExperience(index, 'duration', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Jan 2020 - Present"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      rows={3}
                      value={exp.description}
                      onChange={(e) => updateExperience(index, 'description', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Achievements (one per line)</label>
                    <textarea
                      rows={3}
                      value={exp.achievements.join('\n')}
                      onChange={(e) => updateExperience(index, 'achievements', e.target.value.split('\n').filter(a => a.trim()))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Similar sections for education, skills, and certifications would follow the same pattern */}
        </div>
      </div>
    </div>
  );
}