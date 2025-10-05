'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Download, 
  Briefcase, 
  GraduationCap, 
  Award, 
  MapPin, 
  Calendar,
  ExternalLink,
  Mail,
  Phone,
  Globe
} from 'lucide-react';

interface ResumeData {
  personalInfo: {
    fullName: string;
    title: string;
    email: string;
    phone?: string;
    location?: string;
    website?: string;
    linkedin?: string;
    github?: string;
  };
  summary: string;
  experience: Array<{
    company: string;
    position: string;
    duration: string;
    location?: string;
    description: string;
    achievements: string[];
    technologies: string[];
  }>;
  education: Array<{
    institution: string;
    degree: string;
    field?: string;
    duration: string;
    gpa?: string;
    description?: string;
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    date: string;
    credentialId?: string;
    url?: string;
  }>;
  resumeFile?: string;
}

const Resume = () => {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResumeData();
  }, []);

  const fetchResumeData = async () => {
    try {
      const response = await fetch('/api/resume');
      if (response.ok) {
        const data = await response.json();
        setResumeData(data);
      } else {
        // Use default data if no resume found
        setResumeData(getDefaultResumeData());
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching resume:', error);
      setResumeData(getDefaultResumeData());
      setLoading(false);
    }
  };

  const getDefaultResumeData = (): ResumeData => ({
    personalInfo: {
      fullName: 'Suraj Yadav',
      title: 'AI/ML Engineer & Backend Developer',
      email: 'suraj.yadav@example.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      website: 'https://surajyadav.dev',
      linkedin: 'https://linkedin.com/in/surajyadav',
      github: 'https://github.com/surajyadav'
    },
    summary: 'Passionate AI/ML Engineer and Backend Developer with 5+ years of experience building intelligent systems and scalable applications. Specialized in machine learning, microservices architecture, and high-performance backend solutions.',
    experience: [
      {
        company: 'TechCorp Inc.',
        position: 'Senior AI/ML Engineer',
        duration: '2022 - Present',
        location: 'San Francisco, CA',
        description: 'Lead AI/ML initiatives and backend development for high-traffic applications serving millions of users.',
        achievements: [
          'Built recommendation system improving user engagement by 45%',
          'Optimized ML model inference reducing latency by 60%',
          'Led team of 5 engineers in developing microservices architecture'
        ],
        technologies: ['Python', 'TensorFlow', 'Node.js', 'MongoDB', 'AWS']
      },
      {
        company: 'StartupXYZ',
        position: 'Full Stack Developer',
        duration: '2020 - 2022',
        location: 'Remote',
        description: 'Developed end-to-end web applications and implemented machine learning solutions for business automation.',
        achievements: [
          'Built scalable API handling 100k+ requests per day',
          'Implemented automated data processing pipeline',
          'Reduced infrastructure costs by 40% through optimization'
        ],
        technologies: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'Python']
      }
    ],
    education: [
      {
        institution: 'University of Technology',
        degree: 'Master of Science',
        field: 'Computer Science',
        duration: '2018 - 2020',
        gpa: '3.8/4.0',
        description: 'Specialized in Machine Learning and Artificial Intelligence'
      },
      {
        institution: 'Engineering College',
        degree: 'Bachelor of Technology',
        field: 'Computer Engineering',
        duration: '2014 - 2018',
        gpa: '3.6/4.0'
      }
    ],
    certifications: [
      {
        name: 'AWS Certified Solutions Architect',
        issuer: 'Amazon Web Services',
        date: '2023',
        credentialId: 'AWS-SAA-123456'
      },
      {
        name: 'TensorFlow Developer Certificate',
        issuer: 'Google',
        date: '2022',
        credentialId: 'TF-DEV-789012'
      },
      {
        name: 'MongoDB Certified Developer',
        issuer: 'MongoDB Inc.',
        date: '2021',
        credentialId: 'MDB-DEV-345678'
      }
    ]
  });

  if (loading) {
    return (
      <section id="resume" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading resume...</p>
          </div>
        </div>
      </section>
    );
  }

  if (!resumeData) return null;

  return (
    <section id="resume" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Resume</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Comprehensive overview of my professional experience, education, and achievements.
          </p>
          {resumeData.resumeFile && (
            <a
              href={resumeData.resumeFile}
              download
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium"
            >
              <Download size={20} />
              <span>Download PDF Resume</span>
            </a>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Personal Info & Summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Personal Info */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail size={16} className="text-blue-600" />
                  <a href={`mailto:${resumeData.personalInfo.email}`} className="text-gray-700 hover:text-blue-600">
                    {resumeData.personalInfo.email}
                  </a>
                </div>
                {resumeData.personalInfo.phone && (
                  <div className="flex items-center space-x-3">
                    <Phone size={16} className="text-blue-600" />
                    <span className="text-gray-700">{resumeData.personalInfo.phone}</span>
                  </div>
                )}
                {resumeData.personalInfo.location && (
                  <div className="flex items-center space-x-3">
                    <MapPin size={16} className="text-blue-600" />
                    <span className="text-gray-700">{resumeData.personalInfo.location}</span>
                  </div>
                )}
                {resumeData.personalInfo.website && (
                  <div className="flex items-center space-x-3">
                    <Globe size={16} className="text-blue-600" />
                    <a href={resumeData.personalInfo.website} className="text-gray-700 hover:text-blue-600">
                      Portfolio
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Summary */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Professional Summary</h3>
              <p className="text-gray-700 leading-relaxed">{resumeData.summary}</p>
            </div>

            {/* Certifications */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Award className="mr-2" size={20} />
                Certifications
              </h3>
              <div className="space-y-4">
                {resumeData.certifications.map((cert, index) => (
                  <div key={index} className="border-l-4 border-blue-600 pl-4">
                    <h4 className="font-semibold text-gray-900">{cert.name}</h4>
                    <p className="text-gray-600">{cert.issuer}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-sm text-gray-500">{cert.date}</span>
                      {cert.url && (
                        <a href={cert.url} className="text-blue-600 hover:text-blue-800">
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Experience & Education */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Experience */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Briefcase className="mr-2" size={24} />
                Professional Experience
              </h3>
              <div className="space-y-8">
                {resumeData.experience.map((exp, index) => (
                  <div key={index} className="relative">
                    {index !== resumeData.experience.length - 1 && (
                      <div className="absolute left-4 top-12 bottom-0 w-0.5 bg-gray-200"></div>
                    )}
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <Briefcase size={16} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                          <h4 className="text-xl font-semibold text-gray-900">{exp.position}</h4>
                          <div className="flex items-center text-gray-600 text-sm">
                            <Calendar size={14} className="mr-1" />
                            {exp.duration}
                          </div>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                          <p className="text-lg text-blue-600 font-medium">{exp.company}</p>
                          {exp.location && (
                            <div className="flex items-center text-gray-600 text-sm">
                              <MapPin size={14} className="mr-1" />
                              {exp.location}
                            </div>
                          )}
                        </div>
                        <p className="text-gray-700 mb-4">{exp.description}</p>
                        
                        {exp.achievements.length > 0 && (
                          <div className="mb-4">
                            <h5 className="font-semibold text-gray-800 mb-2">Key Achievements:</h5>
                            <ul className="list-disc list-inside space-y-1 text-gray-700">
                              {exp.achievements.map((achievement, i) => (
                                <li key={i}>{achievement}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <GraduationCap className="mr-2" size={24} />
                Education
              </h3>
              <div className="space-y-6">
                {resumeData.education.map((edu, index) => (
                  <div key={index} className="relative">
                    {index !== resumeData.education.length - 1 && (
                      <div className="absolute left-4 top-12 bottom-0 w-0.5 bg-gray-200"></div>
                    )}
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <GraduationCap size={16} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                          <h4 className="text-xl font-semibold text-gray-900">
                            {edu.degree} {edu.field && `in ${edu.field}`}
                          </h4>
                          <div className="flex items-center text-gray-600 text-sm">
                            <Calendar size={14} className="mr-1" />
                            {edu.duration}
                          </div>
                        </div>
                        <p className="text-lg text-blue-600 font-medium mb-2">{edu.institution}</p>
                        {edu.gpa && (
                          <p className="text-gray-600 mb-2">GPA: {edu.gpa}</p>
                        )}
                        {edu.description && (
                          <p className="text-gray-700">{edu.description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Resume;