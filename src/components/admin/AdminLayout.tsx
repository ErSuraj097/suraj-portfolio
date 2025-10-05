'use client';

import { useState } from 'react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    FolderOpen,
    FileText,
    BarChart3,
    TrendingUp,
    Settings,
    LogOut,
    Menu,
    X,
    Home,
    MessageCircle,
    Code
} from 'lucide-react';

interface AdminLayoutProps {
    children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();

    const navigation = [
        { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Resume', href: '/admin/resume', icon: FileText },
        { name: 'Technologies', href: '/admin/technologies', icon: Code },
        { name: 'Projects', href: '/admin/projects', icon: FolderOpen },
        { name: 'Blog Posts', href: '/admin/blogs', icon: FileText },
        { name: 'Case Studies', href: '/admin/case-studies', icon: BarChart3 },
        { name: 'Success Stories', href: '/admin/success-stories', icon: TrendingUp },
        { name: 'Messages', href: '/admin/messages', icon: MessageCircle },
        { name: 'Settings', href: '/admin/settings', icon: Settings },
    ];

    const handleSignOut = () => {
        signOut({ callbackUrl: '/' });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile sidebar */}
            <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
                <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white shadow-xl">
                    <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">SY</span>
                            </div>
                            <span className="font-bold text-lg">Admin Panel</span>
                        </div>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <X size={24} />
                        </button>
                    </div>
                    <nav className="flex-1 px-4 py-4 space-y-2">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${pathname === item.href
                                    ? 'bg-blue-50 text-blue-700'
                                    : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                onClick={() => setSidebarOpen(false)}
                            >
                                <item.icon size={20} />
                                <span>{item.name}</span>
                            </Link>
                        ))}
                    </nav>
                    <div className="border-t border-gray-200 p-4">
                        <Link
                            href="/"
                            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors duration-200 mb-2"
                        >
                            <Home size={20} />
                            <span>View Portfolio</span>
                        </Link>
                        <button
                            onClick={handleSignOut}
                            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-red-700 hover:bg-red-50 transition-colors duration-200 w-full"
                        >
                            <LogOut size={20} />
                            <span>Sign Out</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Desktop sidebar */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
                <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
                    <div className="flex h-16 items-center px-4 border-b border-gray-200">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">SY</span>
                            </div>
                            <span className="font-bold text-lg">Admin Panel</span>
                        </div>
                    </div>
                    <nav className="flex-1 px-4 py-4 space-y-2">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${pathname === item.href
                                    ? 'bg-blue-50 text-blue-700'
                                    : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                <item.icon size={20} />
                                <span>{item.name}</span>
                            </Link>
                        ))}
                    </nav>
                    <div className="border-t border-gray-200 p-4">
                        <Link
                            href="/"
                            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors duration-200 mb-2"
                        >
                            <Home size={20} />
                            <span>View Portfolio</span>
                        </Link>
                        <button
                            onClick={handleSignOut}
                            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-red-700 hover:bg-red-50 transition-colors duration-200 w-full"
                        >
                            <LogOut size={20} />
                            <span>Sign Out</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="lg:pl-64">
                {/* Top bar */}
                <div className="sticky top-0 z-40 flex h-16 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                    <button
                        type="button"
                        className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Menu size={24} />
                    </button>
                    <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                        <div className="flex flex-1"></div>
                        <div className="flex items-center gap-x-4 lg:gap-x-6">
                            <span className="text-sm text-gray-700">Admin Panel</span>
                        </div>
                    </div>
                </div>

                {/* Page content */}
                <main className="py-8 px-4 sm:px-6 lg:px-8">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;