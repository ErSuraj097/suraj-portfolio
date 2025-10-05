'use client';

import { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import DashboardStats from './DashboardStats';
import BlogManager from './BlogManager';
import ProjectManager from './ProjectManager';
import CaseStudyManager from './CaseStudyManager';
import ContactManager from './ContactManager';
import ResumeManager from './ResumeManager';
import TechnologyManager from './TechnologyManager';
import GalleryManager from './GalleryManager';
import SuccessStoryManager from './SuccessStoryManager';
import OurStoryManager from './OurStoryManager';

type ActiveSection = 'dashboard' | 'blogs' | 'projects' | 'case-studies' | 'contacts' | 'resume' | 'technologies' | 'gallery' | 'success-stories' | 'our-story';

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardStats />;
      case 'blogs':
        return <BlogManager />;
      case 'projects':
        return <ProjectManager />;
      case 'case-studies':
        return <CaseStudyManager />;
      case 'contacts':
        return <ContactManager />;
      case 'resume':
        return <ResumeManager />;
      case 'technologies':
        return <TechnologyManager />;
      case 'gallery':
        return <GalleryManager />;
      case 'success-stories':
        return <SuccessStoryManager />;
      case 'our-story':
        return <OurStoryManager />;
      default:
        return <DashboardStats />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader 
          setSidebarOpen={setSidebarOpen}
          activeSection={activeSection}
        />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}