'use client';

import { 
  LayoutDashboard, 
  FileText, 
  FolderOpen, 
  BookOpen, 
  Mail, 
  User, 
  Settings, 
  Image, 
  Trophy,
  Heart,
  X
} from 'lucide-react';

interface AdminSidebarProps {
  activeSection: string;
  setActiveSection: (section: any) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'blogs', label: 'Blog Posts', icon: FileText },
  { id: 'projects', label: 'Projects', icon: FolderOpen },
  { id: 'case-studies', label: 'Case Studies', icon: BookOpen },
  { id: 'contacts', label: 'Contacts', icon: Mail },
  { id: 'resume', label: 'Resume', icon: User },
  { id: 'technologies', label: 'Technologies', icon: Settings },
  { id: 'gallery', label: 'Gallery', icon: Image },
  { id: 'success-stories', label: 'Success Stories', icon: Trophy },
  { id: 'our-story', label: 'Our Story', icon: Heart },
];

export default function AdminSidebar({ 
  activeSection, 
  setActiveSection, 
  sidebarOpen, 
  setSidebarOpen 
}: AdminSidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-6">
          <div className="px-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center px-3 py-2 mt-1 text-sm font-medium rounded-lg transition-colors
                    ${activeSection === item.id
                      ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }
                  `}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </>
  );
}