'use client';

import { motion } from 'framer-motion';
import { Brain, Server, Code, Cloud } from 'lucide-react';

const About = () => {
  const skills = [
    {
      icon: Brain,
      title: 'AI/ML Engineering',
      description: 'Building intelligent systems with TensorFlow, PyTorch, and scikit-learn',
      technologies: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenCV']
    },
    {
      icon: Server,
      title: 'Backend Development',
      description: 'Scalable APIs and microservices with modern frameworks',
      technologies: ['Node.js', 'Python', 'Express', 'FastAPI', 'PostgreSQL']
    },
    {
      icon: Code,
      title: 'Full Stack Development',
      description: 'End-to-end web applications with modern tech stacks',
      technologies: ['React', 'Next.js', 'TypeScript', 'MongoDB', 'Tailwind']
    },
    {
      icon: Cloud,
      title: 'Cloud & DevOps',
      description: 'Deploying and scaling applications on cloud platforms',
      technologies: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform']
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">About Me</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            I'm a passionate developer with expertise in AI/ML and backend engineering. 
            I love creating intelligent solutions that solve real-world problems and 
            building scalable systems that can handle millions of users.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg mr-4">
                  <skill.icon className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{skill.title}</h3>
              </div>
              <p className="text-gray-600 mb-4">{skill.description}</p>
              <div className="flex flex-wrap gap-2">
                {skill.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-white text-gray-700 rounded-full text-sm border"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">My Journey</h3>
            <p className="text-gray-600 max-w-4xl mx-auto leading-relaxed">
              With over 3 years of experience in software development, I've worked on diverse projects 
              ranging from machine learning models that predict user behavior to scalable backend systems 
              that serve millions of requests. I'm passionate about staying up-to-date with the latest 
              technologies and best practices, always looking for ways to improve and optimize solutions.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;