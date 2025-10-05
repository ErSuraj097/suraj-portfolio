'use client';

import Link from 'next/link';
import { Github, Linkedin, Mail, Twitter, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: 'https://github.com/yourusername', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/yourusername', label: 'Twitter' },
    { icon: Mail, href: 'mailto:your.email@example.com', label: 'Email' },
  ];

  const quickLinks = [
    { name: 'About', href: '/about' },
    { name: 'Skills', href: '/skills' },
    { name: 'Resume', href: '/resume' },
    { name: 'Projects', href: '/projects' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <footer className="relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 gradient-dark"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center glow">
                <span className="text-white font-bold text-sm">SY</span>
              </div>
              <span className="font-bold text-xl gradient-text-primary">Suraj Yadav</span>
            </div>
            <p className="text-white/70 mb-6 max-w-md leading-relaxed">
              AI/ML Engineer & Backend Developer passionate about creating intelligent 
              solutions and scalable systems that make a difference.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="p-3 glass rounded-lg hover:scale-110 transition-all duration-300 text-white/80 hover:text-white group"
                  aria-label={link.label}
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <link.icon size={20} className="group-hover:rotate-12 transition-transform duration-300" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 gradient-text-accent">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white hover:translate-x-2 transition-all duration-300 block"
                    style={{
                      animationDelay: `${index * 0.05}s`
                    }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4 gradient-text-secondary">Get In Touch</h3>
            <div className="space-y-3 text-white/70">
              <p className="hover:text-white transition-colors duration-300">Available for freelance work</p>
              <p className="hover:text-white transition-colors duration-300">Open to collaboration</p>
              <Link
                href="mailto:your.email@example.com"
                className="block hover:text-white transition-all duration-300 hover:translate-x-2 glass px-3 py-2 rounded-lg"
              >
                your.email@example.com
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-sm">
              © {currentYear} Suraj Yadav. All rights reserved.
            </p>
            <p className="text-white/60 text-sm flex items-center space-x-1 mt-4 md:mt-0">
              <span>Made with</span>
              <Heart size={16} className="text-red-400 animate-pulse" />
              <span>using Next.js & MongoDB</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;