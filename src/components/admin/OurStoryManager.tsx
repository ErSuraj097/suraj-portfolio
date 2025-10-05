'use client';

import { useState, useEffect } from 'react';
import { Save, Edit } from 'lucide-react';

interface OurStory {
  _id?: string;
  title: string;
  subtitle: string;
  content: string;
  mission: string;
  vision: string;
  values: string[];
  milestones: {
    year: string;
    title: string;
    description: string;
  }[];
  team: {
    name: string;
    position: string;
    bio: string;
    image?: string;
  }[];
  updatedAt?: string;
}

export default function OurStoryManager() {
  const [story, setStory] = useState<OurStory>({
    title: '',
    subtitle: '',
    content: '',
    mission: '',
    vision: '',
    values: [''],
    milestones: [],
    team: [],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('story');

  useEffect(() => {
    fetchStory();
  }, []);

  const fetchStory = async () => {
    try {
      const response = await fetch('/api/our-story');
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          setStory(data[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching our story:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const url = story._id ? `/api/our-story/${story._id}` : '/api/our-story';
      const method = story._id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(story),
      });

      if (response.ok) {
        const data = await response.json();
        setStory(data);
      }
    } catch (error) {
      console.error('Error saving our story:', error);
    } finally {
      setSaving(false);
    }
  };

  const addValue = () => {
    setStory(prev => ({
      ...prev,
      values: [...prev.values, '']
    }));
  };

  const updateValue = (index: number, value: string) => {
    setStory(prev => ({
      ...prev,
      values: prev.values.map((v, i) => i === index ? value : v)
    }));
  };

  const removeValue = (index: number) => {
    setStory(prev => ({
      ...prev,
      values: prev.values.filter((_, i) => i !== index)
    }));
  };

  const addMilestone = () => {
    setStory(prev => ({
      ...prev,
      milestones: [...prev.milestones, { year: '', title: '', description: '' }]
    }));
  };

  const updateMilestone = (index: number, field: string, value: string) => {
    setStory(prev => ({
      ...prev,
      milestones: prev.milestones.map((m, i) => 
        i === index ? { ...m, [field]: value } : m
      )
    }));
  };

  const removeMilestone = (index: number) => {
    setStory(prev => ({
      ...prev,
      milestones: prev.milestones.filter((_, i) => i !== index)
    }));
  };

  const addTeamMember = () => {
    setStory(prev => ({
      ...prev,
      team: [...prev.team, { name: '', position: '', bio: '', image: '' }]
    }));
  };

  const updateTeamMember = (index: number, field: string, value: string) => {
    setStory(prev => ({
      ...prev,
      team: prev.team.map((t, i) => 
        i === index ? { ...t, [field]: value } : t
      )
    }));
  };

  const removeTeamMember = (index: number) => {
    setStory(prev => ({
      ...prev,
      team: prev.team.filter((_, i) => i !== index)
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const tabs = [
    { id: 'story', label: 'Our Story' },
    { id: 'mission', label: 'Mission & Vision' },
    { id: 'values', label: 'Values' },
    { id: 'milestones', label: 'Milestones' },
    { id: 'team', label: 'Team' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Our Story Management</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          <span>{saving ? 'Saving...' : 'Save Changes'}</span>
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
          {activeTab === 'story' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={story.title}
                  onChange={(e) => setStory(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                <input
                  type="text"
                  value={story.subtitle}
                  onChange={(e) => setStory(prev => ({ ...prev, subtitle: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                <textarea
                  rows={10}
                  value={story.content}
                  onChange={(e) => setStory(prev => ({ ...prev, content: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {activeTab === 'mission' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mission</label>
                <textarea
                  rows={4}
                  value={story.mission}
                  onChange={(e) => setStory(prev => ({ ...prev, mission: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vision</label>
                <textarea
                  rows={4}
                  value={story.vision}
                  onChange={(e) => setStory(prev => ({ ...prev, vision: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {activeTab === 'values' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Company Values</h3>
                <button
                  onClick={addValue}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Value
                </button>
              </div>

              {story.values.map((value, index) => (
                <div key={index} className="flex space-x-2">
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => updateValue(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter a company value"
                  />
                  <button
                    onClick={() => removeValue(index)}
                    className="px-3 py-2 text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'milestones' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Company Milestones</h3>
                <button
                  onClick={addMilestone}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Milestone
                </button>
              </div>

              {story.milestones.map((milestone, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-4">
                  <div className="flex justify-between items-start">
                    <h4 className="text-md font-medium text-gray-900">Milestone {index + 1}</h4>
                    <button
                      onClick={() => removeMilestone(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                      <input
                        type="text"
                        value={milestone.year}
                        onChange={(e) => updateMilestone(index, 'year', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                      <input
                        type="text"
                        value={milestone.title}
                        onChange={(e) => updateMilestone(index, 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      rows={3}
                      value={milestone.description}
                      onChange={(e) => updateMilestone(index, 'description', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'team' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Team Members</h3>
                <button
                  onClick={addTeamMember}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Team Member
                </button>
              </div>

              {story.team.map((member, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-4">
                  <div className="flex justify-between items-start">
                    <h4 className="text-md font-medium text-gray-900">Team Member {index + 1}</h4>
                    <button
                      onClick={() => removeTeamMember(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        value={member.name}
                        onChange={(e) => updateTeamMember(index, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                      <input
                        type="text"
                        value={member.position}
                        onChange={(e) => updateTeamMember(index, 'position', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                    <input
                      type="url"
                      value={member.image}
                      onChange={(e) => updateTeamMember(index, 'image', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                    <textarea
                      rows={3}
                      value={member.bio}
                      onChange={(e) => updateTeamMember(index, 'bio', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}