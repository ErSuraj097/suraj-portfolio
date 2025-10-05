'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu, X, Code, User, BookOpen, Briefcase, Award, FileText, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: 'About', href: '/about', icon: User, hasDropdown: true },
    { name: 'Skills', href: '/skills', icon: Code },
    { name: 'Resume', href: '/resume', icon: FileText },
    { name: 'Projects', href: '/projects', icon: Briefcase },
    { name: 'Blog', href: '/blog', icon: BookOpen },
    { name: 'Contact', href: '/contact', icon: Award },
  ];

  const aboutDropdownItems = [
    { name: 'Our Story', href: '/about/our-story' },
    { name: 'Case Study', href: '/about/case-study' },
    { name: 'Gallery', href: '/about/gallery' },
  ];

  return (
    <nav className="fixed top-0 w-full glass-dark backdrop-blur-md z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center glow">
              <span className="text-white font-bold text-sm">SY</span>
            </div>
            <span className="font-bold text-xl gradient-text-primary">Suraj Yadav</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 relative">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.hasDropdown ? (
                  <>
                    <button
                      onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                      className={`flex items-center space-x-1 transition-all duration-300 text-white/80 hover:text-white font-medium hover:scale-105 ${
                        pathname.startsWith('/about') ? 'gradient-text-accent' : ''
                      }`}
                    >
                      <item.icon size={16} />
                      <span>{item.name}</span>
                      <ChevronDown size={14} />
                    </button>
                    {aboutDropdownOpen && (
                      <div className="absolute top-full left-0 mt-2 w-48 glass-dark border border-white/20 rounded-lg shadow-2xl z-50">
                        {aboutDropdownItems.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            className="block px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 first:rounded-t-lg last:rounded-b-lg"
                            onClick={() => setAboutDropdownOpen(false)}
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-1 transition-all duration-300 hover:scale-105 ${
                      pathname === item.href
                        ? 'gradient-text-accent font-medium'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    <item.icon size={16} />
                    <span>{item.name}</span>
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white/80 hover:text-white transition-all duration-300 hover:scale-110"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden py-4 border-t border-white/10"
          >
            {navItems.map((item) => (
              <div key={item.name} className="mb-2">
                {item.hasDropdown ? (
                  <>
                    <button
                      onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                      className={`flex items-center justify-between w-full px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg font-medium transition-all duration-200`}
                    >
                      <span>{item.name}</span>
                      <ChevronDown size={16} />
                    </button>
                    {aboutDropdownOpen && (
                      <div className="pl-4 mt-1 space-y-1">
                        {aboutDropdownItems.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            className="block px-4 py-2 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
                            onClick={() => {
                              setIsOpen(false);
                              setAboutDropdownOpen(false);
                            }}
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`block px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
