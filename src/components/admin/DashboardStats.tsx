'use client';

import { useEffect, useState } from 'react';
import { FileText, FolderOpen, BookOpen, Mail, Users, Eye } from 'lucide-react';

interface Stats {
  blogs: number;
  projects: number;
  caseStudies: number;
  contacts: number;
  technologies: number;
  gallery: number;
}

export default function DashboardStats() {
  const [stats, setStats] = useState<Stats>({
    blogs: 0,
    projects: 0,
    caseStudies: 0,
    contacts: 0,
    technologies: 0,
    gallery: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Blog Posts',
      value: stats.blogs,
      icon: FileText,
      color: 'bg-blue-500',
      change: '+12%',
    },
    {
      title: 'Projects',
      value: stats.projects,
      icon: FolderOpen,
      color: 'bg-green-500',
      change: '+8%',
    },
    {
      title: 'Case Studies',
      value: stats.caseStudies,
      icon: BookOpen,
      color: 'bg-purple-500',
      change: '+5%',
    },
    {
      title: 'Contacts',
      value: stats.contacts,
      icon: Mail,
      color: 'bg-yellow-500',
      change: '+23%',
    },
    {
      title: 'Technologies',
      value: stats.technologies,
      icon: Users,
      color: 'bg-red-500',
      change: '+3%',
    },
    {
      title: 'Gallery Items',
      value: stats.gallery,
      icon: Eye,
      color: 'bg-indigo-500',
      change: '+15%',
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{card.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{card.value}</p>
                  <p className="text-sm text-green-600 mt-1">{card.change} from last month</p>
                </div>
                <div className={`p-3 rounded-full ${card.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <p className="text-sm text-gray-600">New blog post published</p>
              <span className="text-xs text-gray-400">2 hours ago</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="text-sm text-gray-600">Project updated</p>
              <span className="text-xs text-gray-400">4 hours ago</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <p className="text-sm text-gray-600">New contact message</p>
              <span className="text-xs text-gray-400">1 day ago</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <button className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md">
              Create New Blog Post
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-green-600 hover:bg-green-50 rounded-md">
              Add New Project
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-purple-600 hover:bg-purple-50 rounded-md">
              Create Case Study
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-yellow-600 hover:bg-yellow-50 rounded-md">
              View Messages
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}