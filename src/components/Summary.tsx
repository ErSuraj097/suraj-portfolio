'use client';

import { motion } from 'framer-motion';
import { section } from 'framer-motion/client';
import { section } from 'framer-motion/client';
import { Code2, Brain, Server, Zap, Award, Users } from 'lucide-react';

const Summary = () => {
  const highlights = [
    {
      icon: Code2,
      title: '5+ Years Experience',
      description: 'Full-stack development with modern technologies'
    },
    {
      icon: Brain,
      title: 'AI/ML Expertise',
      description: 'Machine learning models and intelligent systems'
    },
    {
      icon: Server,
      title: 'Backend Specialist',
      description: 'Scalable APIs and microservices architecture'
    },
    {
      icon: Zap,
      title: 'Performance Focused',
      description: 'Optimized solutions for high-traffic applications'
    },
    {
      icon: Award,
      title: 'Proven Results',
      description: 'Delivered successful projects for various clients'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Strong communication and leadership skills'
    }
  ];

  return (
    <section id="summary" className="py-20 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 gradient-dark"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20"></div>

      {/* Floating elements */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold gradient-text-primary mb-4">Professional Summary</h2>
          <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed">
            Passionate AI/ML Engineer and Backend Developer with 5+ years of experience building
            intelligent systems and scalable applications. Specialized in machine learning,
            microservices architecture, and high-performance backend solutions. Proven track
            record of delivering complex projects that drive business growth and improve user experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {highlights.map((highlight, index) => (
            <motion.div
              key={highlight.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass rounded-xl p-6 hover:scale-105 transition-all duration-300 group glow"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 gradient-primary rounded-lg mr-4 group-hover:scale-110 transition-transform duration-300">
                  <highlight.icon className="text-white" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-white">{highlight.title}</h3>
              </div>
              <p className="text-white/70">{highlight.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 glow-blue"
        >
          <h3 className="text-2xl font-bold gradient-text-accent mb-6 text-center">Core Competencies</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold gradient-text-primary mb-4">Technical Expertise</h4>
              <ul className="space-y-3 text-white/80">
                <li className="hover:text-white hover:translate-x-2 transition-all duration-300">• Machine Learning & Deep Learning (TensorFlow, PyTorch)</li>
                <li className="hover:text-white hover:translate-x-2 transition-all duration-300">• Backend Development (Node.js, Python, Express)</li>
                <li className="hover:text-white hover:translate-x-2 transition-all duration-300">• Database Design & Optimization (MongoDB, PostgreSQL)</li>
                <li className="hover:text-white hover:translate-x-2 transition-all duration-300">• Cloud Architecture (AWS, Docker, Kubernetes)</li>
                <li className="hover:text-white hover:translate-x-2 transition-all duration-300">• API Development & Microservices</li>
                <li className="hover:text-white hover:translate-x-2 transition-all duration-300">• Full-Stack Development (React, Next.js)</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold gradient-text-secondary mb-4">Key Achievements</h4>
              <ul className="space-y-3 text-white/80">
                <li className="hover:text-white hover:translate-x-2 transition-all duration-300">• Improved system performance by 300% through optimization</li>
                <li className="hover:text-white hover:translate-x-2 transition-all duration-300">• Built ML models serving 2M+ users daily</li>
                <li className="hover:text-white hover:translate-x-2 transition-all duration-300">• Reduced infrastructure costs by 40% with efficient architecture</li>
                <li className="hover:text-white hover:translate-x-2 transition-all duration-300">• Led development teams of 5+ engineers</li>
                <li className="hover:text-white hover:translate-x-2 transition-all duration-300">• Delivered 20+ successful projects on time and budget</li>
                <li className="hover:text-white hover:translate-x-2 transition-all duration-300">• Mentored junior developers and conducted technical interviews</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    {/* </div> */}
    </section >
  );
};

export default Summary;