'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 animated-gradient opacity-20"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <Navbar />
      <div className="pt-16 relative z-10">
        <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full text-center">
            <div className="mb-8">
              <h1 className="text-9xl font-bold gradient-text-primary animate-pulse">404</h1>
              <h2 className="text-3xl font-bold text-white mb-4">Page Not Found</h2>
              <p className="text-white/70 mb-8">
                Sorry, the page you're looking for doesn't exist or has been moved.
              </p>
            </div>
            
            <div className="space-y-6">
              <Link
                href="/"
                className="inline-flex items-center space-x-2 px-8 py-4 gradient-primary text-white rounded-xl hover:scale-105 transition-all duration-300 font-medium glow shadow-2xl"
              >
                <Home size={20} />
                <span>Go Home</span>
              </Link>
              
              <div className="text-center">
                <button
                  onClick={() => window.history.back()}
                  className="inline-flex items-center space-x-2 text-white/70 hover:text-white transition-all duration-300 hover:scale-105"
                >
                  <ArrowLeft size={16} />
                  <span>Go Back</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}