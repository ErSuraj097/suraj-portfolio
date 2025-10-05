'use client';

import { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';

interface Technology {
  _id?: string;
  name: string;
  category: string;
  proficiency: number;
  icon?: string;
  description?: string;
  yearsOfExperience?: number;
  featured: boolean;
}

interface TechnologyFormProps {
  technology?: Technology | null;
  onClose: () => void;
}

export default function TechnologyForm({ technology, onClose }: TechnologyFormProps) {
  const [formData, setFormData] = useState<Technology>({
    name: '',
    category: 'Frontend',
    proficiency: 50,
    icon: '',
    description: '',
    yearsOfExperience: 1,
    featured: false,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (technology) {
      setFormData(technology);
    }
  }, [technology]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = technology ? `/api/technologies/${technology._id}` : '/api/technologies';
      const method = technology ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onClose();
      } else {
        console.error('Error saving technology');
      }
    } catch (error) {
      console.error('Error saving technology:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    'Frontend',
    'Backend',
    'Database',
    'DevOps',
    'Mobile',
    'AI/ML',
    'Cloud',
    'Tools',
    'Languages',
    'Frameworks',
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {technology ? 'Edit Technology' : 'Add New Technology'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., React"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Proficiency (%) *
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={formData.proficiency}
                onChange={(e) => setFormData(prev => ({ ...prev, proficiency: parseInt(e.target.value) }))}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>0%</span>
                <span className="font-medium">{formData.proficiency}%</span>
                <span>100%</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Years of Experience
              </label>
              <input
                type="number"
                min="0"
                max="20"
                step="0.5"
                value={formData.yearsOfExperience}
                onChange={(e) => setFormData(prev => ({ ...prev, yearsOfExperience: parseFloat(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Icon URL
            </label>
            <input
              type="url"
              value={formData.icon}
              onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://example.com/icon.svg"
            />
            {formData.icon && (
              <div className="mt-2">
                <img src={formData.icon} alt="Icon preview" className="w-8 h-8" />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Brief description of your experience with this technology"
            />
          </div>

          <div className="flex items-center">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <span className="ml-2 text-sm text-gray-700">Featured Technology</span>
            </label>
          </div>

          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              <span>{loading ? 'Saving...' : 'Save Technology'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}