'use client';

import { Menu, Bell, User, LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useState } from 'react';

interface AdminHeaderProps {
  setSidebarOpen: (open: boolean) => void;
  activeSection: string;
}

export default function AdminHeader({ setSidebarOpen, activeSection }: AdminHeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const getSectionTitle = (section: string) => {
    const titles: { [key: string]: string } = {
      dashboard: 'Dashboard',
      blogs: 'Blog Management',
      projects: 'Project Management',
      'case-studies': 'Case Study Management',
      contacts: 'Contact Management',
      resume: 'Resume Management',
      technologies: 'Technology Management',
      gallery: 'Gallery Management',
      'success-stories': 'Success Story Management',
      'our-story': 'Our Story Management',
    };
    return titles[section] || 'Admin Panel';
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h2 className="ml-2 text-xl font-semibold text-gray-800">
            {getSectionTitle(activeSection)}
          </h2>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full">
            <Bell className="h-5 w-5" />
          </button>

          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center p-2 text-gray-400 hover:text-gray-600 rounded-full"
            >
              <User className="h-5 w-5" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <button
                  onClick={() => signOut({ callbackUrl: '/admin/login' })}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}