'use client';

import { useState, useEffect } from 'react';
import { X, Save, Plus, Trash2 } from 'lucide-react';

interface CaseStudy {
  _id?: string;
  title: string;
  slug: string;
  client?: string;
  duration?: string;
  overview: string;
  challenge: string;
  solution: string;
  results: string;
  technologies: string[];
  images: string[];
  category: string;
  featured: boolean;
}

interface CaseStudyFormProps {
  caseStudy?: CaseStudy | null;
  onClose: () => void;
}

export default function CaseStudyForm({ caseStudy, onClose }: CaseStudyFormProps) {
  const [formData, setFormData] = useState<CaseStudy>({
    title: '',
    slug: '',
    client: '',
    duration: '',
    overview: '',
    challenge: '',
    solution: '',
    results: '',
    technologies: [],
    images: [],
    category: 'Full Stack',
    featured: false,
  });
  const [loading, setLoading] = useState(false);
  const [techInput, setTechInput] = useState('');
  const [imageInput, setImageInput] = useState('');

  useEffect(() => {
    if (caseStudy) {
      setFormData(caseStudy);
      setTechInput(caseStudy.technologies.join(', '));
    }
  }, [caseStudy]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title)
    }));
  };

  const handleTechChange = (value: string) => {
    setTechInput(value);
    const technologies = value.split(',').map(tech => tech.trim()).filter(tech => tech);
    setFormData(prev => ({ ...prev, technologies }));
  };

  const addImage = () => {
    if (imageInput.trim()) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, imageInput.trim()]
      }));
      setImageInput('');
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = caseStudy ? `/api/admin/case-studies/${caseStudy._id}` : '/api/case-studies';
      const method = caseStudy ? 'PUT' : 'POST';

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
        console.error('Error saving case study');
      }
    } catch (error) {
      console.error('Error saving case study:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {caseStudy ? 'Edit Case Study' : 'Create New Case Study'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Slug *
                </label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Client
                </label>
                <input
                  type="text"
                  value={formData.client}
                  onChange={(e) => setFormData(prev => ({ ...prev, client: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration
                </label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 3 months"
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
                  <option value="AI/ML">AI/ML</option>
                  <option value="Backend">Backend</option>
                  <option value="Full Stack">Full Stack</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Overview *
              </label>
              <textarea
                required
                rows={3}
                value={formData.overview}
                onChange={(e) => setFormData(prev => ({ ...prev, overview: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Challenge *
              </label>
              <textarea
                required
                rows={4}
                value={formData.challenge}
                onChange={(e) => setFormData(prev => ({ ...prev, challenge: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Solution *
              </label>
              <textarea
                required
                rows={4}
                value={formData.solution}
                onChange={(e) => setFormData(prev => ({ ...prev, solution: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Results *
              </label>
              <textarea
                required
                rows={4}
                value={formData.results}
                onChange={(e) => setFormData(prev => ({ ...prev, results: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Technologies (comma-separated)
              </label>
              <input
                type="text"
                value={techInput}
                onChange={(e) => handleTechChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="React, Node.js, MongoDB"
              />
              {formData.technologies.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {formData.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Images
              </label>
              <div className="flex space-x-2 mb-2">
                <input
                  type="url"
                  value={imageInput}
                  onChange={(e) => setImageInput(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Image URL"
                />
                <button
                  type="button"
                  onClick={addImage}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              {formData.images.length > 0 && (
                <div className="space-y-2">
                  {formData.images.map((image, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                      <img src={image} alt="" className="w-12 h-12 object-cover rounded" />
                      <span className="flex-1 text-sm text-gray-600 truncate">{image}</span>
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-gray-700">Featured Case Study</span>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-4 p-6 border-t border-gray-200 bg-gray-50">
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
              <span>{loading ? 'Saving...' : 'Save Case Study'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}