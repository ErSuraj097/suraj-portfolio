'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Star } from 'lucide-react';
import SuccessStoryForm from './forms/SuccessStoryForm';
import ConfirmDialog from './ConfirmDialog';

interface SuccessStory {
  _id: string;
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
  createdAt: string;
}

export default function SuccessStoryManager() {
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingStory, setEditingStory] = useState<SuccessStory | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const response = await fetch('/api/success-stories');
      if (response.ok) {
        const data = await response.json();
        setStories(data);
      }
    } catch (error) {
      console.error('Error fetching success stories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/success-stories/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setStories(stories.filter(story => story._id !== id));
        setDeleteConfirm(null);
      }
    } catch (error) {
      console.error('Error deleting success story:', error);
    }
  };

  const handleEdit = (story: SuccessStory) => {
    setEditingStory(story);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingStory(null);
    fetchStories();
  };

  const toggleFeatured = async (id: string, featured: boolean) => {
    try {
      const response = await fetch(`/api/success-stories/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ featured: !featured }),
      });
      if (response.ok) {
        fetchStories();
      }
    } catch (error) {
      console.error('Error updating success story:', error);
    }
  };

  const filteredStories = stories.filter(story =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    story.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    story.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Success Story Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>New Success Story</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search success stories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredStories.map((story) => (
          <div key={story._id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {story.image && (
              <img
                src={story.image}
                alt={story.title}
                className="w-full h-48 object-cover"
              />
            )}
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{story.title}</h3>
                  <p className="text-sm text-blue-600 font-medium mb-2">{story.client}</p>
                </div>
                <button
                  onClick={() => toggleFeatured(story._id, story.featured)}
                  className={`ml-2 ${story.featured ? 'text-yellow-500' : 'text-gray-300'} hover:text-yellow-500`}
                >
                  <Star className="h-5 w-5" fill={story.featured ? 'currentColor' : 'none'} />
                </button>
              </div>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{story.description}</p>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Result:</h4>
                <p className="text-sm text-green-600">{story.result}</p>
              </div>

              {story.metrics && story.metrics.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Key Metrics:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {story.metrics.slice(0, 4).map((metric, index) => (
                      <div key={index} className="text-center p-2 bg-gray-50 rounded">
                        <div className="text-lg font-bold text-blue-600">{metric.value}</div>
                        <div className="text-xs text-gray-600">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {story.testimonial && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-700 italic mb-2">"{story.testimonial.text}"</p>
                  <p className="text-xs text-gray-600">
                    - {story.testimonial.author}, {story.testimonial.position}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {new Date(story.createdAt).toLocaleDateString()}
                </span>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(story)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(story._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredStories.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No success stories found matching your criteria.</p>
        </div>
      )}

      {showForm && (
        <SuccessStoryForm
          story={editingStory}
          onClose={handleFormClose}
        />
      )}

      {deleteConfirm && (
        <ConfirmDialog
          title="Delete Success Story"
          message="Are you sure you want to delete this success story? This action cannot be undone."
          onConfirm={() => handleDelete(deleteConfirm)}
          onCancel={() => setDeleteConfirm(null)}
        />
      )}
    </div>
  );
}