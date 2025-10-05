'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Filter } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  category: string;
  images: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'AI/ML', 'Backend', 'Full Stack', 'Mobile'];

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (activeFilter === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === activeFilter));
    }
  }, [projects, activeFilter]);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="projects" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Here are some of my recent projects that showcase my skills in AI/ML, 
            backend development, and full-stack engineering.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                activeFilter === category
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {project.images && project.images.length > 0 && (
                <div className="relative h-48 bg-gray-200">
                  <Image
                    src={project.images[0]}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                      Featured
                    </span>
                  )}
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>
                
                <div className="flex space-x-4">
                  {project.githubUrl && (
                    <Link
                      href={project.githubUrl}
                      className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors duration-200"
                    >
                      <Github size={16} />
                      <span>Code</span>
                    </Link>
                  )}
                  {project.liveUrl && (
                    <Link
                      href={project.liveUrl}
                      className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors duration-200"
                    >
                      <ExternalLink size={16} />
                      <span>Live Demo</span>
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProjects.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-600">No projects found for the selected category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;