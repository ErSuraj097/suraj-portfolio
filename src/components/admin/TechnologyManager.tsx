'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import TechnologyForm from './forms/TechnologyForm';
import ConfirmDialog from './ConfirmDialog';

interface Technology {
  _id: string;
  name: string;
  category: string;
  proficiency: number;
  icon?: string;
  description?: string;
  yearsOfExperience?: number;
  featured: boolean;
  createdAt: string;
}

export default function TechnologyManager() {
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTechnology, setEditingTechnology] = useState<Technology | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  useEffect(() => {
    fetchTechnologies();
  }, []);

  const fetchTechnologies = async () => {
    try {
      const response = await fetch('/api/technologies');
      if (response.ok) {
        const data = await response.json();
        setTechnologies(data);
      }
    } catch (error) {
      console.error('Error fetching technologies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/technologies/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setTechnologies(technologies.filter(tech => tech._id !== id));
        setDeleteConfirm(null);
      }
    } catch (error) {
      console.error('Error deleting technology:', error);
    }
  };

  const handleEdit = (technology: Technology) => {
    setEditingTechnology(technology);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingTechnology(null);
    fetchTechnologies();
  };

  const filteredTechnologies = technologies.filter(tech => {
    const matchesSearch = tech.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || tech.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(technologies.map(tech => tech.category))];

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
        <h1 className="text-2xl font-bold text-gray-900">Technology Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>New Technology</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search technologies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <div className="flex items-center text-sm text-gray-600">
            {filteredTechnologies.length} of {technologies.length} technologies
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTechnologies.map((technology) => (
          <div key={technology._id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                {technology.icon && (
                  <img src={technology.icon} alt={technology.name} className="w-8 h-8" />
                )}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{technology.name}</h3>
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    {technology.category}
                  </span>
                </div>
              </div>
              {technology.featured && (
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                  Featured
                </span>
              )}
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Proficiency</span>
                <span>{technology.proficiency}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${technology.proficiency}%` }}
                ></div>
              </div>
            </div>

            {technology.yearsOfExperience && (
              <p className="text-sm text-gray-600 mb-4">
                {technology.yearsOfExperience} years of experience
              </p>
            )}

            {technology.description && (
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">{technology.description}</p>
            )}

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                {new Date(technology.createdAt).toLocaleDateString()}
              </span>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(technology)}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setDeleteConfirm(technology._id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <TechnologyForm
          technology={editingTechnology}
          onClose={handleFormClose}
        />
      )}

      {deleteConfirm && (
        <ConfirmDialog
          title="Delete Technology"
          message="Are you sure you want to delete this technology? This action cannot be undone."
          onConfirm={() => handleDelete(deleteConfirm)}
          onCancel={() => setDeleteConfirm(null)}
        />
      )}
    </div>
  );
}