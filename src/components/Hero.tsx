'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, Cpu, Brain, Server, Code, Cloud, Shield, Zap } from 'lucide-react';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

const Hero = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isScanning, setIsScanning] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = (containerRef.current as HTMLElement).getBoundingClientRect();
        setCursorPosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    const handleMouseEnter = () => setIsScanning(true);
    const handleMouseLeave = () => setIsScanning(false);

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <div key={`h-${i}`} className="absolute left-0 right-0 h-px bg-blue-400/30" style={{top: `${i * 5}%`}}></div>
        ))}
        {[...Array(20)].map((_, i) => (
          <div key={`v-${i}`} className="absolute top-0 bottom-0 w-px bg-blue-400/30" style={{left: `${i * 5}%`}}></div>
        ))}
      </div>

      {/* Scanning Lines */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Vertical Scanning Lines */}
        <div className="absolute left-1/4 w-0.5 h-20 bg-blue-500 shadow-[0_0_15px_5px_rgba(59,130,246,0.8)] animate-scan-vertical"
             style={{ animationDelay: '0s' }}></div>
        <div className="absolute left-1/2 w-0.5 h-20 bg-blue-500 shadow-[0_0_15px_5px_rgba(59,130,246,0.8)] animate-scan-vertical"
             style={{ animationDelay: '1s' }}></div>
        <div className="absolute left-3/4 w-0.5 h-20 bg-blue-500 shadow-[0_0_15px_5px_rgba(59,130,246,0.8)] animate-scan-vertical"
             style={{ animationDelay: '2s' }}></div>

        {/* Horizontal Scanning Lines */}
        <div className="absolute top-1/4 w-20 h-0.5 bg-purple-500 shadow-[0_0_15px_5px_rgba(168,85,247,0.8)] animate-scan-horizontal"
             style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-1/2 w-20 h-0.5 bg-purple-500 shadow-[0_0_15px_5px_rgba(168,85,247,0.8)] animate-scan-horizontal"
             style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-3/4 w-20 h-0.5 bg-purple-500 shadow-[0_0_15px_5px_rgba(168,85,247,0.8)] animate-scan-horizontal"
             style={{ animationDelay: '2.5s' }}></div>

        {/* Interactive Scan Lines */}
        <div
          className="absolute left-0 right-0 h-0.5 bg-cyan-400 shadow-[0_0_15px_5px_rgba(34,211,238,0.6)] opacity-70 transition-opacity duration-300"
          style={{
            top: `${cursorPosition.y}px`,
            transform: 'translateY(-50%)',
            opacity: isScanning ? 0.7 : 0
          }}
        ></div>
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-cyan-400 shadow-[0_0_15px_5px_rgba(34,211,238,0.6)] opacity-70 transition-opacity duration-300"
          style={{
            left: `${cursorPosition.x}px`,
            transform: 'translateX(-50%)',
            opacity: isScanning ? 0.7 : 0
          }}
        ></div>
      </div>

      {/* Floating AI/Tech Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-20"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Brain className="w-8 h-8 text-blue-400 opacity-60" />
        </motion.div>
        <motion.div
          className="absolute top-32 right-32"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <Cpu className="w-8 h-8 text-purple-400 opacity-60" />
        </motion.div>
        <motion.div
          className="absolute bottom-40 left-32"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          <Server className="w-8 h-8 text-cyan-400 opacity-60" />
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-20"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        >
          <Code className="w-8 h-8 text-green-400 opacity-60" />
        </motion.div>
        <motion.div
          className="absolute top-1/2 left-1/4"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <Cloud className="w-8 h-8 text-blue-300 opacity-60" />
        </motion.div>
      </div>

      {/* Central AI Sphere */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="relative w-48 h-48">
          {/* Outer Ring */}
          <div className="absolute inset-0 border-4 border-blue-400/30 rounded-full animate-spin-slow"></div>
          
          {/* Middle Ring */}
          <div className="absolute inset-8 border-4 border-purple-400/50 rounded-full animate-spin-slow-reverse"></div>
          
          {/* Inner Core */}
          <div className="absolute inset-16 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
              <Brain className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* Orbiting Elements */}
          <motion.div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center -translate-y-20">
              <Cpu className="w-5 h-5 text-blue-400" />
            </div>
          </motion.div>
          <motion.div
            className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2"
            animate={{ rotate: -360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center translate-x-20">
              <Code className="w-5 h-5 text-purple-400" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Status Indicator */}
      <div className="absolute buttom-0 right-8 border border-blue-400/30 rounded-lg p-3 font-mono text-sm text-blue-400 backdrop-blur-sm">
        <div className="flex items-center">
          <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
          SYSTEM ACTIVE
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-gradient">
                Suraj Yadav
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              AI/ML Engineer & Backend Developer crafting intelligent solutions 
              and scalable systems that power the future
            </p>
          </motion.div>

          {/* Tech Stack Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {[
              { name: "Machine Learning", color: "glow-blue" },
              { name: "Backend Engineering", color: "glow-purple" },
              { name: "Deep Learning", color: "glow-cyan" },
              { name: "Cloud Architecture", color: "glow-green" },
              { name: "Neural Networks", color: "glow-pink" },
              { name: "System Design", color: "glow-orange" }
            ].map((tech, index) => (
              <motion.span
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className={`px-6 py-3 glass rounded-full text-sm font-medium text-white ${tech.color} hover:scale-105 transition-all duration-300 cursor-default`}
              >
                {tech.name}
              </motion.span>
            ))}
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center space-x-6 mb-12"
          >
            {[
              { icon: Github, href: "https://github.com/yourusername", color: "glow" },
              { icon: Linkedin, href: "https://linkedin.com/in/yourusername", color: "glow-blue" },
              { icon: Mail, href: "mailto:your.email@example.com", color: "glow-cyan" }
            ].map((social, index) => (
              <motion.div
                key={social.href}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={social.href}
                  className={`p-4 glass rounded-full text-white hover:scale-110 transition-all duration-300 ${social.color} group`}
                >
                  <social.icon size={24} className="group-hover:scale-110 transition-transform duration-300" />
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-6"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/projects"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-2xl transition-all duration-300 font-medium glow shadow-2xl flex items-center justify-center"
              >
                <Zap className="w-5 h-5 mr-2" />
                View My Work
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/about"
                className="px-8 py-4 glass border border-white/20 text-white rounded-xl hover:scale-105 hover:bg-white/10 transition-all duration-300 font-medium flex items-center justify-center"
              >
                <Shield className="w-5 h-5 mr-2" />
                Learn More
              </Link>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown className="text-white/60 hover:text-white transition-colors duration-300 cursor-pointer" size={28} />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scan-vertical {
          0% { top: -10%; }
          100% { top: 110%; }
        }
        @keyframes scan-horizontal {
          0% { left: -10%; }
          100% { left: 110%; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-slow-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-scan-vertical {
          animation: scan-vertical 3s linear infinite;
        }
        .animate-scan-horizontal {
          animation: scan-horizontal 4s linear infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-spin-slow-reverse {
          animation: spin-slow-reverse 15s linear infinite;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        .glass {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .glow {
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
        }
        .glow-blue {
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
        }
        .glow-purple {
          box-shadow: 0 0 20px rgba(168, 85, 247, 0.5);
        }
        .glow-cyan {
          box-shadow: 0 0 20px rgba(34, 211, 238, 0.5);
        }
        .glow-green {
          box-shadow: 0 0 20px rgba(34, 197, 94, 0.5);
        }
        .glow-pink {
          box-shadow: 0 0 20px rgba(236, 72, 153, 0.5);
        }
        .glow-orange {
          box-shadow: 0 0 20px rgba(249, 115, 22, 0.5);
        }
      `}</style>
    </section>
  );
};

export default Hero;