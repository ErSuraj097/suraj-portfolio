'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, Search, Filter, Star } from 'lucide-react';
import ProjectForm from './forms/ProjectForm';
import ConfirmDialog from './ConfirmDialog';

interface Project {
  _id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  category: string;
  images: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function ProjectManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setProjects(projects.filter(project => project._id !== id));
        setDeleteConfirm(null);
      }
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingProject(null);
    fetchProjects();
  };

  const toggleFeatured = async (id: string, featured: boolean) => {
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ featured: !featured }),
      });
      if (response.ok) {
        fetchProjects();
      }
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || project.category === filterCategory;
    const matchesStatus = !filterStatus || project.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
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
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Project Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search projects..."
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
            <option value="Mobile">Mobile</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Status</option>
            <option value="completed">Completed</option>
            <option value="in-progress">In Progress</option>
            <option value="planned">Planned</option>
          </select>

          <div className="flex items-center text-sm text-gray-600">
            <Filter className="h-4 w-4 mr-2" />
            {filteredProjects.length} of {projects.length} projects
          </div>
        </div>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div key={project._id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {project.images && project.images[0] && (
              <img
                src={project.images[0]}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
            )}
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900 truncate">{project.title}</h3>
                <button
                  onClick={() => toggleFeatured(project._id, project.featured)}
                  className={`ml-2 ${project.featured ? 'text-yellow-500' : 'text-gray-300'} hover:text-yellow-500`}
                >
                  <Star className="h-5 w-5" fill={project.featured ? 'currentColor' : 'none'} />
                </button>
              </div>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  project.category === 'AI/ML' ? 'bg-purple-100 text-purple-800' :
                  project.category === 'Backend' ? 'bg-green-100 text-green-800' :
                  project.category === 'Full Stack' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {project.category}
                </span>
                
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  project.status === 'completed' ? 'bg-green-100 text-green-800' :
                  project.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {project.status.replace('-', ' ')}
                </span>
              </div>

              {project.technologies && project.technologies.length > 0 && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <span
                        key={index}
                        className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-900"
                    >
                      GitHub
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(project)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(project._id)}
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

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No projects found matching your criteria.</p>
        </div>
      )}

      {/* Project Form Modal */}
      {showForm && (
        <ProjectForm
          project={editingProject}
          onClose={handleFormClose}
        />
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <ConfirmDialog
          title="Delete Project"
          message="Are you sure you want to delete this project? This action cannot be undone."
          onConfirm={() => handleDelete(deleteConfirm)}
          onCancel={() => setDeleteConfirm(null)}
        />
      )}
    </div>
  );
}