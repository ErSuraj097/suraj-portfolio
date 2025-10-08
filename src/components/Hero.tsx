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
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-red-900 via-black to-red-800"
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <div key={`h-${i}`} className="absolute left-0 right-0 h-px bg-red-400/30" style={{top: `${i * 5}%`}}></div>
        ))}
        {[...Array(20)].map((_, i) => (
          <div key={`v-${i}`} className="absolute top-0 bottom-0 w-px bg-red-400/30" style={{left: `${i * 5}%`}}></div>
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
      <div className="max-w-[80%] w-[80%] flex  mx-auto mt-20 px-4 bg-red-900/80 shadow-md rounded-md sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="text-left max-w-[60%] mx-auto ">
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
          {/* <motion.div
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
          </motion.div> */}

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-left space-x-6 mb-12"
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
            className="flex flex-col sm:flex-row justify-left gap-6"
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

        <div className="text-left max-w-[40] mx-auto" >

              fdhbjksdfjsjskj
          <img src="" alt="" srcset="" />
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


// 'use client';

// import { motion } from 'framer-motion';
// import { ArrowDown, Github, Linkedin, Mail, Cpu, Brain, Server, Code, Cloud, Shield, Zap, Download } from 'lucide-react';
// import Link from 'next/link';
// import { useState, useRef, useEffect, useCallback } from 'react';
// import Image from 'next/image';

// const Hero = () => {
//   const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
//   const [isScanning, setIsScanning] = useState(false);
//   const [isImageHovered, setIsImageHovered] = useState(false);
//   const containerRef = useRef(null);

//   // Typing animation states
//   const TYPING_SPEED = 100;
//   const ERASING_SPEED = 50;
//   const PAUSE_DURATION = 2000;
//   const WORDS = ["AI/ML Engineer", "Backend Developer", "Full Stack Developer", "Cloud Architect"];
  
//   const [text, setText] = useState("");
//   const [isTyping, setIsTyping] = useState(true);
//   const [wordIndex, setWordIndex] = useState(0);
//   const [charIndex, setCharIndex] = useState(0);

//   // Typing effect
//   const handleTyping = useCallback(() => {
//     if (isTyping) {
//       if (charIndex < WORDS[wordIndex].length) {
//         setText(prev => prev + WORDS[wordIndex][charIndex]);
//         setCharIndex(prev => prev + 1);
//       } else {
//         setTimeout(() => setIsTyping(false), PAUSE_DURATION);
//       }
//     } else {
//       if (charIndex > 0) {
//         setText(prev => prev.slice(0, -1));
//         setCharIndex(prev => prev - 1);
//       } else {
//         setWordIndex(prev => (prev + 1) % WORDS.length);
//         setIsTyping(true);
//       }
//     }
//   }, [charIndex, isTyping, wordIndex]);

//   useEffect(() => {
//     const timeout = setTimeout(
//       handleTyping,
//       isTyping ? TYPING_SPEED : ERASING_SPEED
//     );
//     return () => clearTimeout(timeout);
//   }, [handleTyping]);

//   // Mouse tracking for scanning effects
//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       if (containerRef.current) {
//         const rect = (containerRef.current as HTMLElement).getBoundingClientRect();
//         setCursorPosition({
//           x: e.clientX - rect.left,
//           y: e.clientY - rect.top
//         });
//       }
//     };

//     const handleMouseEnter = () => setIsScanning(true);
//     const handleMouseLeave = () => setIsScanning(false);

//     const container = containerRef.current;
//     if (container) {
//       container.addEventListener('mousemove', handleMouseMove);
//       container.addEventListener('mouseenter', handleMouseEnter);
//       container.addEventListener('mouseleave', handleMouseLeave);
//     }

//     return () => {
//       if (container) {
//         container.removeEventListener('mousemove', handleMouseMove);
//         container.removeEventListener('mouseenter', handleMouseEnter);
//         container.removeEventListener('mouseleave', handleMouseLeave);
//       }
//     };
//   }, []);

//   return (
//     <section 
//       ref={containerRef}
//       className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
//       id="home"
//     >
//       {/* Animated Grid Background */}
//       <div className="absolute inset-0 opacity-20">
//         {[...Array(20)].map((_, i) => (
//           <div key={`h-${i}`} className="absolute left-0 right-0 h-px bg-blue-400/30" style={{top: `${i * 5}%`}}></div>
//         ))}
//         {[...Array(20)].map((_, i) => (
//           <div key={`v-${i}`} className="absolute top-0 bottom-0 w-px bg-blue-400/30" style={{left: `${i * 5}%`}}></div>
//         ))}
//       </div>

//       {/* Scanning Lines */}
//       <div className="absolute inset-0 pointer-events-none">
//         {/* Vertical Scanning Lines */}
//         <div className="absolute left-1/4 w-0.5 h-20 bg-blue-500 shadow-[0_0_15px_5px_rgba(59,130,246,0.8)] animate-scan-vertical"
//              style={{ animationDelay: '0s' }}></div>
//         <div className="absolute left-1/2 w-0.5 h-20 bg-blue-500 shadow-[0_0_15px_5px_rgba(59,130,246,0.8)] animate-scan-vertical"
//              style={{ animationDelay: '1s' }}></div>
//         <div className="absolute left-3/4 w-0.5 h-20 bg-blue-500 shadow-[0_0_15px_5px_rgba(59,130,246,0.8)] animate-scan-vertical"
//              style={{ animationDelay: '2s' }}></div>

//         {/* Interactive Scan Lines */}
//         <div
//           className="absolute left-0 right-0 h-0.5 bg-cyan-400 shadow-[0_0_15px_5px_rgba(34,211,238,0.6)] opacity-70 transition-opacity duration-300"
//           style={{
//             top: `${cursorPosition.y}px`,
//             transform: 'translateY(-50%)',
//             opacity: isScanning ? 0.7 : 0
//           }}
//         ></div>
//         <div
//           className="absolute top-0 bottom-0 w-0.5 bg-cyan-400 shadow-[0_0_15px_5px_rgba(34,211,238,0.6)] opacity-70 transition-opacity duration-300"
//           style={{
//             left: `${cursorPosition.x}px`,
//             transform: 'translateX(-50%)',
//             opacity: isScanning ? 0.7 : 0
//           }}
//         ></div>
//       </div>

//       {/* Floating AI/Tech Icons */}
//       <div className="absolute inset-0 pointer-events-none">
//         <motion.div
//           className="absolute top-20 left-20"
//           animate={{ y: [0, -20, 0] }}
//           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
//         >
//           <Brain className="w-8 h-8 text-blue-400 opacity-60" />
//         </motion.div>
//         <motion.div
//           className="absolute top-32 right-32"
//           animate={{ y: [0, 15, 0] }}
//           transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
//         >
//           <Cpu className="w-8 h-8 text-purple-400 opacity-60" />
//         </motion.div>
//         <motion.div
//           className="absolute bottom-40 left-32"
//           animate={{ y: [0, -15, 0] }}
//           transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
//         >
//           <Server className="w-8 h-8 text-cyan-400 opacity-60" />
//         </motion.div>
//         <motion.div
//           className="absolute bottom-20 right-20"
//           animate={{ y: [0, 20, 0] }}
//           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 3 }}
//         >
//           <Code className="w-8 h-8 text-green-400 opacity-60" />
//         </motion.div>
//       </div>

//       {/* Status Indicator */}
//       <div className="absolute top-8 right-8 border border-blue-400/30 rounded-lg p-3 font-mono text-sm text-blue-400 backdrop-blur-sm">
//         <div className="flex items-center">
//           <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
//           SYSTEM ACTIVE
//         </div>
//       </div>

//       {/* Main Content Container */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 w-full mt-10%">
//         <div className="flex flex-col lg:flex-row-reverse items-center justify-between gap-8 w-full">
          
//           {/* Right Side - Image Profile (Smaller Version) */}
//           <motion.div
//             initial={{ opacity: 0, x: 50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, delay: 0.4 }}
//             className="home-img relative min-w-96 w-96 h-96 rounded-full overflow-hidden flex justify-center items-center opacity-80 bg-black/20 mb-8 lg:mb-0"
//             onMouseEnter={() => setIsImageHovered(true)}
//             onMouseLeave={() => setIsImageHovered(false)}
//           >
//             {/* Animated Border */}
//             <div className="absolute inset--8px bg-gradient-to-r from-#1afca9 to-#ff0000 transition-all duration-500 animate-spin-slow rounded-full" />
            
//             {/* Inner Content */}
//             <div className="img-box absolute inset-4 bg-slate-700/70 rounded-full z-3 border-4 border-black/20 overflow-hidden flex flex-col justify-center items-center">
              
//               {/* Profile Image - Hidden on hover */}
//               <div className={`absolute inset-0 transition-opacity duration-500 ${isImageHovered ? 'opacity-0' : 'opacity-100'}`}>
//                 <Image
//                   src="/avatar.jpg"
//                   alt="Suraj Yadav"
//                   fill
//                   className="object-cover object-top"
//                   priority
//                 />
//               </div>

//               {/* Hover Content */}
//               <div className={`text-center transition-all duration-500 ${isImageHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
//                 <motion.h2 
//                   initial={{ y: 20, opacity: 0 }}
//                   animate={isImageHovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
//                   transition={{ duration: 0.5, delay: 0.1 }}
//                   className="text-white text-lg font-semibold mb-1 tracking-wider uppercase"
//                 >
//                   Suraj<br />
//                   <span className="font-light text-xs tracking-normal">Software Developer</span>
//                 </motion.h2>

//                 <motion.div 
//                   initial={{ y: 20, opacity: 0 }}
//                   animate={isImageHovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
//                   transition={{ duration: 0.5, delay: 0.2 }}
//                   className="social-media flex justify-center gap-3 my-3"
//                 >
//                   <Link href="https://linkedin.com/in/suraj097" className="text-white text-lg hover:text-cyan-400 transition-all duration-300 hover:scale-110">
//                     <Linkedin size={16} />
//                   </Link>
//                   <Link href="https://github.com/ErSuraj097" className="text-white text-lg hover:text-cyan-400 transition-all duration-300 hover:scale-110">
//                     <Github size={16} />
//                   </Link>
//                   <Link href="mailto:your.email@example.com" className="text-white text-lg hover:text-cyan-400 transition-all duration-300 hover:scale-110">
//                     <Mail size={16} />
//                   </Link>
//                 </motion.div>

//                 <motion.div
//                   initial={{ y: 20, opacity: 0 }}
//                   animate={isImageHovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
//                   transition={{ duration: 0.5, delay: 0.3 }}
//                 >
//                   <Link 
//                     href="https://drive.google.com/file/d/1jB6s06Q37AW_JT5Hh7xaI0WZ8BObmddp/view?usp=sharing"
//                     className="hire-me inline-block mt-1 px-4 py-1 bg-white text-black rounded-full font-medium text-xs uppercase transition-all duration-300 hover:tracking-wider hover:shadow-lg hover:shadow-white/50"
//                   >
//                     Hire Me
//                   </Link>
//                 </motion.div>
//               </div>
//             </div>
//           </motion.div>

//           {/* Left Side - Text Content */}
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8 }}
//             className="home-text w-full max-w-500px text-center lg:text-left"
//           >
//             <motion.strong
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//               className="block font-bold tracking-wider text-lg mb-2 text-cyan-300"
//             >
//               Hello, it's me
//             </motion.strong>

//             <motion.h1
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.3 }}
//               className="text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight"
//             >
//               Suraj <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Yadav</span>
//             </motion.h1>

//             <motion.h2
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.4 }}
//               className="text-2xl lg:text-3xl text-gray-300 mt-4 mb-2 min-h-12"
//             >
//               I'm <span className="text-cyan-400 font-semibold">{text}</span>
//               <span className="ml-1 animate-pulse">|</span>
//             </motion.h2>

//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.5 }}
//               className="text-gray-400 my-6 text-lg leading-relaxed max-w-2xl"
//             >
//               AI/ML Engineer & Backend Developer crafting intelligent solutions 
//               and scalable systems that power the future. Specializing in machine learning, 
//               cloud architecture, and full-stack development.
//             </motion.p>

//             {/* Social Media Links */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.6 }}
//               className="social-media flex justify-center lg:justify-start gap-6 mb-8"
//             >
//               {[
//                 { icon: Linkedin, href: "https://linkedin.com/in/suraj097", color: "hover:text-blue-400" },
//                 { icon: Github, href: "https://github.com/ErSuraj097", color: "hover:text-gray-300" },
//                 { icon: Mail, href: "mailto:your.email@example.com", color: "hover:text-red-400" }
//               ].map((social, index) => (
//                 <motion.div
//                   key={social.href}
//                   whileHover={{ scale: 1.2, y: -5 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <Link
//                     href={social.href}
//                     className={`text-gray-400 text-2xl transition-all duration-300 ${social.color} hover:shadow-lg hover:shadow-cyan-500/50 p-2 rounded-full`}
//                   >
//                     <social.icon size={28} />
//                   </Link>
//                 </motion.div>
//               ))}
//             </motion.div>

//             {/* CTA Buttons */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.7 }}
//               className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
//             >
//               <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//                 <Link
//                   href="/projects"
//                   className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl hover:shadow-2xl transition-all duration-300 font-medium flex items-center justify-center gap-2 shadow-lg"
//                 >
//                   <Zap size={20} />
//                   View My Work
//                 </Link>
//               </motion.div>
//               <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//                 <Link
//                   href="https://drive.google.com/file/d/1jB6s06Q37AW_JT5Hh7xaI0WZ8BObmddp/view?usp=sharing"
//                   className="px-8 py-4 glass border border-white/20 text-white rounded-xl hover:bg-white/10 transition-all duration-300 font-medium flex items-center justify-center gap-2"
//                 >
//                   <Download size={20} />
//                   Download CV
//                 </Link>
//               </motion.div>
//             </motion.div>
//           </motion.div>
//         </div>

//         {/* Scroll Indicator */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.8, delay: 1 }}
//           className="absolute bottom-8 left-1/2 transform -translate-x-1/2 mt-12"
//         >
//           <motion.div
//             animate={{ y: [0, 10, 0] }}
//             transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
//           >
//             <Link href="#about" className="text-white/60 hover:text-white transition-colors duration-300 cursor-pointer">
//               <ArrowDown size={32} />
//             </Link>
//           </motion.div>
//         </motion.div>
//       </div>

//       <style jsx>{`
//         #home {
//           width: 100%;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           flex-wrap: wrap-reverse;
//           position: relative;
//           margin-top: 10%;
//           gap: 8%;
//         }

//         .home-text {
//           width: 100%;
//           max-width: 500px;
//         }

//         .home-text strong {
//           font-weight: 700;
//           letter-spacing: 1px;
//           font-size: 1.65rem;
//           margin-bottom: 8px;
//           color: aquamarine;
//         }

//         .home-img {
//           min-width: 200px;
//           width: 200px;
//           height: 200px;
//           border-radius: 50%;
//           overflow: hidden;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           opacity: 0.8;
//           background-color: rgba(0, 0, 0, 0.2);
//           position: relative;
//         }

//         .home-img::before {
//           content: ' ';
//           position: absolute;
//           inset: -8px;
//           background: linear-gradient(351deg, #1afca9, #ff0000);
//           transition: 0.5s;
//           animation: animate 4s linear infinite;
//           border-radius: 50%;
//         }

//         .home-img:hover::before {
//           inset: -12px;
//         }

//         @keyframes animate {
//           0% {
//             transform: rotate(0deg);
//           }
//           100% {
//             transform: rotate(360deg);
//           }
//         }

//         .home-img::after {
//           content: '';
//           position: absolute;
//           inset: 6px;
//           background: rgba(137, 137, 139, 0.725);
//           border-radius: 50%;
//           z-index: 1;
//         }

//         .img-box {
//           position: absolute;
//           inset: 4px;
//           border: 4px solid rgba(0, 0, 0, 0.2);
//           z-index: 3;
//           border-radius: 50%;
//           overflow: hidden;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           flex-direction: column;
//         }

//         .img-box img {
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           display: inline-block;
//           object-fit: cover;
//           object-position: top;
//           transition: 0.5s;
//           pointer-events: none;
//           z-index: 5;
//         }

//         .home-img:hover .img-box img {
//           opacity: 0;
//         }

//         .img-box h2 {
//           position: relative;
//           color: #fff;
//           font-size: 1.1rem;
//           text-align: center;
//           font-weight: 600;
//           letter-spacing: 0.3rem;
//           text-transform: uppercase;
//         }

//         .img-box h2 span {
//           font-weight: 300;
//           font-size: 0.7rem;
//         }

//         .img-box .social-media a {
//           color: white;
//           font-size: 1.1rem;
//           margin: 0 5px;
//           transition: 0.3s;
//         }

//         .img-box .social-media a:hover {
//           text-shadow: 0 0 10px #fff;
//         }

//         .img-box .hire-me {
//           position: relative;
//           margin-top: 8px;
//           padding: 4px 16px;
//           background: #fff;
//           color: #000;
//           border-radius: 20px;
//           font-weight: 500;
//           font-size: 0.9rem;
//           text-transform: uppercase;
//           transition: all 0.3s ease;
//         }

//         .img-box .hire-me:hover {
//           letter-spacing: 0.2rem;
//           box-shadow: 0 0 10px #fff;
//         }

//         @keyframes scan-vertical {
//           0% { top: -10%; }
//           100% { top: 110%; }
//         }

//         @keyframes spin-slow {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }

//         .animate-scan-vertical {
//           animation: scan-vertical 3s linear infinite;
//         }

//         .animate-spin-slow {
//           animation: spin-slow 4s linear infinite;
//         }

//         .glass {
//           background: rgba(255, 255, 255, 0.1);
//           backdrop-filter: blur(10px);
//           border: 1px solid rgba(255, 255, 255, 0.2);
//         }

//         /* Responsive */
//         @media (max-width: 865px) {
//           #home {
//             justify-content: center;
//           }
//           .home-text {
//             max-width: none;
//           }
//         }
//       `}</style>
//     </section>
//   );
// };

// export default Hero;