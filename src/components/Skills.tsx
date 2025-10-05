'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Cloud, Wrench, Cpu } from 'lucide-react';

interface Technology {
  _id: string;
  name: string;
  category: string;
  proficiency: number;
  yearsOfExperience: number;
}

const Skills = () => {
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  const categoryIcons = {
    'Programming Language': Code,
    'Framework': Cpu,
    'Database': Database,
    'Cloud Service': Cloud,
    'Tool': Wrench,
  };

  const categories = ['All', 'Programming Language', 'Framework', 'Database', 'Cloud Service', 'Tool'];

  useEffect(() => {
    fetchTechnologies();
  }, []);

  const fetchTechnologies = async () => {
    try {
      const response = await fetch('/api/technologies');
      const data = await response.json();
      setTechnologies(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching technologies:', error);
      setLoading(false);
    }
  };

  const filteredTechnologies = activeCategory === 'All' 
    ? technologies 
    : technologies.filter(tech => tech.category === activeCategory);

  const getProficiencyColor = (proficiency: number) => {
    if (proficiency >= 8) return 'from-green-500 to-green-600';
    if (proficiency >= 6) return 'from-blue-500 to-blue-600';
    if (proficiency >= 4) return 'from-yellow-500 to-yellow-600';
    return 'from-red-500 to-red-600';
  };

  const getProficiencyLabel = (proficiency: number) => {
    if (proficiency >= 8) return 'Expert';
    if (proficiency >= 6) return 'Advanced';
    if (proficiency >= 4) return 'Intermediate';
    return 'Beginner';
  };

  if (loading) {
    return (
      <section id="skills" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading skills...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Technical Skills</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive overview of my technical expertise across different domains, 
            with proficiency levels and years of experience.
          </p>
        </motion.div>

        {/* Category Filter */}
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
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTechnologies.map((tech, index) => {
            const IconComponent = categoryIcons[tech.category as keyof typeof categoryIcons] || Code;
            
            return (
              <motion.div
                key={tech._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                      <IconComponent className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{tech.name}</h3>
                      <p className="text-sm text-gray-600">{tech.category}</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{tech.yearsOfExperience}y exp</span>
                </div>

                <div className="mb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      {getProficiencyLabel(tech.proficiency)}
                    </span>
                    <span className="text-sm text-gray-600">{tech.proficiency}/10</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full bg-gradient-to-r ${getProficiencyColor(tech.proficiency)}`}
                      style={{ width: `${tech.proficiency * 10}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredTechnologies.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-600">No skills found for the selected category.</p>
          </div>
        )}

        {/* Soft Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Soft Skills</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'Leadership',
              'Problem Solving',
              'Communication',
              'Team Collaboration',
              'Project Management',
              'Mentoring',
              'Critical Thinking',
              'Adaptability'
            ].map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 text-center border border-gray-200"
              >
                <span className="font-medium text-gray-800">{skill}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;