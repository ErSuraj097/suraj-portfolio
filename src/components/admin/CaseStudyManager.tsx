'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, Search, Filter, Star } from 'lucide-react';
import CaseStudyForm from './forms/CaseStudyForm';
import ConfirmDialog from './ConfirmDialog';

interface CaseStudy {
  _id: string;
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
  createdAt: string;
}

export default function CaseStudyManager() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCaseStudy, setEditingCaseStudy] = useState<CaseStudy | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const fetchCaseStudies = async () => {
    try {
      const response = await fetch('/api/case-studies');
      if (response.ok) {
        const data = await response.json();
        setCaseStudies(data);
      }
    } catch (error) {
      console.error('Error fetching case studies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/case-studies/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setCaseStudies(caseStudies.filter(cs => cs._id !== id));
        setDeleteConfirm(null);
      }
    } catch (error) {
      console.error('Error deleting case study:', error);
    }
  };

  const handleEdit = (caseStudy: CaseStudy) => {
    setEditingCaseStudy(caseStudy);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingCaseStudy(null);
    fetchCaseStudies();
  };

  const toggleFeatured = async (id: string, featured: boolean) => {
    try {
      const response = await fetch(`/api/admin/case-studies/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ featured: !featured }),
      });
      if (response.ok) {
        fetchCaseStudies();
      }
    } catch (error) {
      console.error('Error updating case study:', error);
    }
  };

  const filteredCaseStudies = caseStudies.filter(cs => {
    const matchesSearch = cs.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cs.overview.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || cs.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

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
        <h1 className="text-2xl font-bold text-gray-900">Case Study Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>New Case Study</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search case studies..."
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
            <option value="AI/ML">AI/ML</option>
            <option value="Backend">Backend</option>
            <option value="Full Stack">Full Stack</option>
          </select>

          <div className="flex items-center text-sm text-gray-600">
            <Filter className="h-4 w-4 mr-2" />
            {filteredCaseStudies.length} of {caseStudies.length} case studies
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCaseStudies.map((caseStudy) => (
          <div key={caseStudy._id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{caseStudy.title}</h3>
                {caseStudy.client && (
                  <p className="text-sm text-gray-600 mb-2">Client: {caseStudy.client}</p>
                )}
                {caseStudy.duration && (
                  <p className="text-sm text-gray-600 mb-2">Duration: {caseStudy.duration}</p>
                )}
              </div>
              <button
                onClick={() => toggleFeatured(caseStudy._id, caseStudy.featured)}
                className={`ml-2 ${caseStudy.featured ? 'text-yellow-500' : 'text-gray-300'} hover:text-yellow-500`}
              >
                <Star className="h-5 w-5" fill={caseStudy.featured ? 'currentColor' : 'none'} />
              </button>
            </div>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">{caseStudy.overview}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                caseStudy.category === 'AI/ML' ? 'bg-purple-100 text-purple-800' :
                caseStudy.category === 'Backend' ? 'bg-green-100 text-green-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {caseStudy.category}
              </span>
            </div>

            {caseStudy.technologies && caseStudy.technologies.length > 0 && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {caseStudy.technologies.slice(0, 3).map((tech, index) => (
                    <span
                      key={index}
                      className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {caseStudy.technologies.length > 3 && (
                    <span className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                      +{caseStudy.technologies.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                {new Date(caseStudy.createdAt).toLocaleDateString()}
              </span>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => window.open(`/case-studies/${caseStudy.slug}`, '_blank')}
                  className="text-blue-600 hover:text-blue-900"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleEdit(caseStudy)}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setDeleteConfirm(caseStudy._id)}
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
        <CaseStudyForm
          caseStudy={editingCaseStudy}
          onClose={handleFormClose}
        />
      )}

      {deleteConfirm && (
        <ConfirmDialog
          title="Delete Case Study"
          message="Are you sure you want to delete this case study? This action cannot be undone."
          onConfirm={() => handleDelete(deleteConfirm)}
          onCancel={() => setDeleteConfirm(null)}
        />
      )}
    </div>
  );
}