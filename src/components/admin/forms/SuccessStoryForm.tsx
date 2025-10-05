'use client';

import { useState, useEffect } from 'react';
import { X, Save, Plus, Trash2 } from 'lucide-react';

interface SuccessStory {
  _id?: string;
  title: string;
  client: string;
  description: string;
  result: string;
  metrics?: {
    label: string;
    value: string;
  }[];
  testimonial?: {
    text: string;
    author: string;
    position: string;
  };
  image?: string;
  featured: boolean;
}

interface SuccessStoryFormProps {
  story?: SuccessStory | null;
  onClose: () => void;
}

export default function SuccessStoryForm({ story, onClose }: SuccessStoryFormProps) {
  const [formData, setFormData] = useState<SuccessStory>({
    title: '',
    client: '',
    description: '',
    result: '',
    metrics: [],
    testimonial: {
      text: '',
      author: '',
      position: '',
    },
    image: '',
    featured: false,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (story) {
      setFormData({
        ...story,
        testimonial: story.testimonial || { text: '', author: '', position: '' },
        metrics: story.metrics || [],
      });
    }
  }, [story]);

  const addMetric = () => {
    setFormData(prev => ({
      ...prev,
      metrics: [...(prev.metrics || []), { label: '', value: '' }]
    }));
  };

  const updateMetric = (index: number, field: 'label' | 'value', value: string) => {
    setFormData(prev => ({
      ...prev,
      metrics: prev.metrics?.map((metric, i) => 
        i === index ? { ...metric, [field]: value } : metric
      ) || []
    }));
  };

  const removeMetric = (index: number) => {
    setFormData(prev => ({
      ...prev,
      metrics: prev.metrics?.filter((_, i) => i !== index) || []
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Clean up empty testimonial
      const dataToSubmit = {
        ...formData,
        testimonial: formData.testimonial?.text ? formData.testimonial : undefined,
        metrics: formData.metrics?.filter(m => m.label && m.value) || []
      };

      const url = story ? `/api/success-stories/${story._id}` : '/api/success-stories';
      const method = story ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSubmit),
      });

      if (response.ok) {
        onClose();
      } else {
        console.error('Error saving success story');
      }
    } catch (error) {
      console.error('Error saving success story:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {story ? 'Edit Success Story' : 'Create New Success Story'}
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
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Client *
                </label>
                <input
                  type="text"
                  required
                  value={formData.client}
                  onChange={(e) => setFormData(prev => ({ ...prev, client: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Result *
              </label>
              <textarea
                required
                rows={3}
                value={formData.result}
                onChange={(e) => setFormData(prev => ({ ...prev, result: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL
              </label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Key Metrics</h3>
                <button
                  type="button"
                  onClick={addMetric}
                  className="flex items-center space-x-2 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Metric</span>
                </button>
              </div>

              {formData.metrics && formData.metrics.map((metric, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-gray-200 rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                    <input
                      type="text"
                      value={metric.label}
                      onChange={(e) => updateMetric(index, 'label', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Performance Improvement"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={metric.value}
                      onChange={(e) => updateMetric(index, 'value', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 50%"
                    />
                    <button
                      type="button"
                      onClick={() => removeMetric(index)}
                      className="px-3 py-2 text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Testimonial (Optional)</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Testimonial Text
                  </label>
                  <textarea
                    rows={3}
                    value={formData.testimonial?.text || ''}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      testimonial: { ...prev.testimonial!, text: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Author
                    </label>
                    <input
                      type="text"
                      value={formData.testimonial?.author || ''}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        testimonial: { ...prev.testimonial!, author: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Position
                    </label>
                    <input
                      type="text"
                      value={formData.testimonial?.position || ''}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        testimonial: { ...prev.testimonial!, position: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-gray-700">Featured Success Story</span>
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
              <span>{loading ? 'Saving...' : 'Save Success Story'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}