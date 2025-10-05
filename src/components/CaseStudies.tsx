'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, User } from 'lucide-react';
import Link from 'next/link';
import { section } from 'framer-motion/client';
import { section } from 'framer-motion/client';

interface CaseStudy {
  _id: string;
  title: string;
  slug: string;
  client?: string;
  duration?: string;
  overview: string;
  technologies: string[];
  category: string;
  featured: boolean;
}

const CaseStudies = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const fetchCaseStudies = async () => {
    try {
      console.log('Fetching case studies...');
      const response = await fetch('/api/case-studies');
      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Case studies data:', data);
      console.log('Number of case studies:', data.length);
      setCaseStudies(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching case studies:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="case-studies" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-dark"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white/30 mx-auto"></div>
            <p className="mt-4 text-white/70">Loading case studies...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="case-studies" className="py-20 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 gradient-dark"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold gradient-text-primary mb-4">Case Studies</h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Deep dives into complex problems I've solved, showcasing the process, 
            challenges, and results of my most impactful projects.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {console.log('Rendering case studies:', caseStudies.length)}
          {caseStudies.map((study, index) => (
            <motion.div
              key={study._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass rounded-xl p-8 hover:scale-105 transition-all duration-300 group glow"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 glass rounded-full text-sm font-medium text-white/90 border border-white/20">
                  {study.category}
                </span>
                {study.featured && (
                  <span className="px-3 py-1 gradient-secondary rounded-full text-sm font-medium text-white glow-pink">
                    Featured
                  </span>
                )}
              </div>

              <h3 className="text-2xl font-bold text-white mb-4 group-hover:gradient-text-primary transition-all duration-300">{study.title}</h3>
              
              <div className="flex items-center space-x-6 mb-4 text-sm text-white/70">
                {study.client && (
                  <div className="flex items-center space-x-1">
                    <User size={16} />
                    <span>{study.client}</span>
                  </div>
                )}
                {study.duration && (
                  <div className="flex items-center space-x-1">
                    <Clock size={16} />
                    <span>{study.duration}</span>
                  </div>
                )}
              </div>

              <p className="text-white/80 mb-6 leading-relaxed">{study.overview}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {study.technologies.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 glass text-white/90 rounded-full text-sm border border-white/10 hover:bg-white/10 transition-all duration-200"
                  >
                    {tech}
                  </span>
                ))}
                {study.technologies.length > 4 && (
                  <span className="px-3 py-1 glass text-white/90 rounded-full text-sm border border-white/10">
                    +{study.technologies.length - 4} more
                  </span>
                )}
              </div>

              <Link
                href={`/case-studies/${study.slug}`}
                className="inline-flex items-center space-x-2 gradient-text-accent hover:text-white font-medium transition-all duration-300 hover:scale-105"
              >
                <span>Read Case Study</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          ))}
        </div>

        {caseStudies.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-white/70">No case studies available at the moment.</p>
            <p className="text-white/50 text-sm mt-2">Create some case studies in the admin panel to see them here.</p>
            <p className="text-red-400 text-sm mt-2">DEBUG: Loading={loading.toString()}, Count={caseStudies.length}</p>
          </div>
        )}

        {/* Debug info */}
        <div className="text-center py-4 text-white/50 text-sm">
          DEBUG: Loading: {loading.toString()}, Case Studies Count: {caseStudies.length}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/case-studies"
            className="inline-flex items-center space-x-2 px-8 py-4 gradient-primary text-white rounded-xl hover:scale-105 transition-all duration-300 font-medium glow shadow-2xl"
          >
            <span>View All Case Studies</span>
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
      {/* </div> */}
    </section>
  );
};

export default CaseStudies;