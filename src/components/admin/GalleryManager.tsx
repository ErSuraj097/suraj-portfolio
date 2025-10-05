'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Filter } from 'lucide-react';
import GalleryForm from './forms/GalleryForm';
import ConfirmDialog from './ConfirmDialog';

interface GalleryItem {
  _id: string;
  title: string;
  description?: string;
  imageUrl: string;
  category: string;
  tags: string[];
  featured: boolean;
  createdAt: string;
}

export default function GalleryManager() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      const response = await fetch('/api/gallery');
      if (response.ok) {
        const data = await response.json();
        setGalleryItems(data);
      }
    } catch (error) {
      console.error('Error fetching gallery items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/gallery/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setGalleryItems(galleryItems.filter(item => item._id !== id));
        setDeleteConfirm(null);
      }
    } catch (error) {
      console.error('Error deleting gallery item:', error);
    }
  };

  const handleEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingItem(null);
    fetchGalleryItems();
  };

  const filteredItems = galleryItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = !filterCategory || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(galleryItems.map(item => item.category))];

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
        <h1 className="text-2xl font-bold text-gray-900">Gallery Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Image</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search gallery..."
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
            <Filter className="h-4 w-4 mr-2" />
            {filteredItems.length} of {galleryItems.length} items
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div key={item._id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="relative">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              {item.featured && (
                <div className="absolute top-2 right-2">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    Featured
                  </span>
                </div>
              )}
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">{item.title}</h3>
              
              {item.description && (
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
              )}
              
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  {item.category}
                </span>
              </div>

              {item.tags && item.tags.length > 0 && (
                <div className="mb-3">
                  <div className="flex flex-wrap gap-1">
                    {item.tags.slice(0, 2).map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                    {item.tags.length > 2 && (
                      <span className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                        +{item.tags.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(item._id)}
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

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No gallery items found matching your criteria.</p>
        </div>
      )}

      {showForm && (
        <GalleryForm
          item={editingItem}
          onClose={handleFormClose}
        />
      )}

      {deleteConfirm && (
        <ConfirmDialog
          title="Delete Gallery Item"
          message="Are you sure you want to delete this gallery item? This action cannot be undone."
          onConfirm={() => handleDelete(deleteConfirm)}
          onCancel={() => setDeleteConfirm(null)}
        />
      )}
    </div>
  );
}