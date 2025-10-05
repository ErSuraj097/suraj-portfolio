import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Project from '@/models/Project';
import Blog from '@/models/Blog';
import CaseStudy from '@/models/CaseStudy';
import Technology from '@/models/Technology';
import SuccessStory from '@/models/SuccessStory';
import Resume from '@/models/Resume';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    console.log('Connected to MongoDB');

    // Create admin user
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 12);
      await User.create({
        email: adminEmail,
        password: hashedPassword,
        role: 'admin'
      });
      console.log('Admin user created');
    }

    // Create sample projects
    const sampleProjects = [
      {
        title: 'AI-Powered Recommendation System',
        description: 'Machine learning system that provides personalized recommendations using collaborative filtering and deep learning.',
        longDescription: 'Built a comprehensive recommendation system using TensorFlow and Python that analyzes user behavior patterns to provide personalized suggestions. The system processes millions of data points and delivers real-time recommendations with 85% accuracy.',
        technologies: ['Python', 'TensorFlow', 'PostgreSQL', 'Redis', 'Docker'],
        category: 'AI/ML',
        images: [],
        githubUrl: 'https://github.com/yourusername/ai-recommendation',
        liveUrl: 'https://demo-recommendation.vercel.app',
        featured: true,
        status: 'completed'
      },
      {
        title: 'Scalable Microservices API',
        description: 'High-performance REST API built with Node.js and Express, handling 10k+ requests per second.',
        longDescription: 'Designed and implemented a microservices architecture using Node.js, Express, and MongoDB. The system includes authentication, rate limiting, caching, and comprehensive monitoring.',
        technologies: ['Node.js', 'Express', 'MongoDB', 'Redis', 'Docker', 'Kubernetes'],
        category: 'Backend',
        images: [],
        githubUrl: 'https://github.com/yourusername/microservices-api',
        featured: true,
        status: 'completed'
      },
      {
        title: 'Full-Stack E-commerce Platform',
        description: 'Complete e-commerce solution with React frontend, Node.js backend, and payment integration.',
        longDescription: 'Developed a full-featured e-commerce platform with user authentication, product catalog, shopping cart, payment processing, and admin dashboard.',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind CSS'],
        category: 'Full Stack',
        images: [],
        githubUrl: 'https://github.com/yourusername/ecommerce-platform',
        liveUrl: 'https://demo-ecommerce.vercel.app',
        featured: false,
        status: 'completed'
      }
    ];

    for (const project of sampleProjects) {
      const existing = await Project.findOne({ title: project.title });
      if (!existing) {
        await Project.create(project);
      }
    }

    // Create sample blog posts
    const sampleBlogs = [
      {
        title: 'Getting Started with Machine Learning in 2024',
        slug: 'getting-started-machine-learning-2024',
        excerpt: 'A comprehensive guide to starting your machine learning journey with the latest tools and frameworks.',
        content: `# Getting Started with Machine Learning in 2024

Machine learning has become more accessible than ever before. In this post, we'll explore the essential tools, frameworks, and concepts you need to know to start your ML journey.

## Essential Tools

1. **Python** - The most popular language for ML
2. **Jupyter Notebooks** - For experimentation and prototyping
3. **TensorFlow/PyTorch** - Deep learning frameworks
4. **Scikit-learn** - Traditional ML algorithms

## Getting Started

Start with understanding the basics of statistics and linear algebra. Then move on to practical projects using real datasets.

## Conclusion

The key to success in ML is consistent practice and working on real-world projects.`,
        coverImage: '',
        tags: ['Machine Learning', 'Python', 'Beginner'],
        category: 'AI/ML',
        published: true,
        readTime: 8
      },
      {
        title: 'Building Scalable APIs with Node.js',
        slug: 'building-scalable-apis-nodejs',
        excerpt: 'Learn how to design and implement APIs that can handle millions of requests with proper architecture patterns.',
        content: `# Building Scalable APIs with Node.js

Creating APIs that can scale to handle millions of requests requires careful planning and implementation. Here's what you need to know.

## Architecture Patterns

1. **Microservices** - Break down your application into smaller services
2. **Load Balancing** - Distribute traffic across multiple instances
3. **Caching** - Use Redis for frequently accessed data
4. **Database Optimization** - Proper indexing and query optimization

## Best Practices

- Use proper error handling
- Implement rate limiting
- Add comprehensive logging
- Use environment variables for configuration

## Conclusion

Scalability is not just about handling more requests, but doing so efficiently and reliably.`,
        coverImage: '',
        tags: ['Node.js', 'API', 'Scalability', 'Backend'],
        category: 'Backend',
        published: true,
        readTime: 12
      }
    ];

    for (const blog of sampleBlogs) {
      const existing = await Blog.findOne({ slug: blog.slug });
      if (!existing) {
        await Blog.create(blog);
      }
    }

    // Create sample case studies
    const sampleCaseStudies = [
      {
        title: 'Optimizing Database Performance for High-Traffic Application',
        slug: 'optimizing-database-performance-high-traffic',
        client: 'TechCorp Inc.',
        duration: '3 months',
        overview: 'Improved database performance by 300% for a high-traffic e-commerce application serving 1M+ daily users.',
        challenge: 'The existing database was experiencing severe performance issues during peak traffic, with query response times exceeding 5 seconds and frequent timeouts.',
        solution: 'Implemented database indexing strategies, query optimization, connection pooling, and introduced Redis caching layer. Also migrated to a more efficient database schema.',
        results: 'Reduced average query response time from 5s to 1.2s, eliminated timeouts, and improved overall application performance by 300%. User satisfaction increased significantly.',
        technologies: ['PostgreSQL', 'Redis', 'Node.js', 'Docker'],
        images: [],
        category: 'Backend',
        featured: true
      }
    ];

    for (const caseStudy of sampleCaseStudies) {
      const existing = await CaseStudy.findOne({ slug: caseStudy.slug });
      if (!existing) {
        await CaseStudy.create(caseStudy);
      }
    }

    // Create sample technologies
    const sampleTechnologies = [
      { name: 'Python', category: 'Programming Language', proficiency: 9, yearsOfExperience: 4 },
      { name: 'JavaScript', category: 'Programming Language', proficiency: 9, yearsOfExperience: 5 },
      { name: 'TypeScript', category: 'Programming Language', proficiency: 8, yearsOfExperience: 3 },
      { name: 'React', category: 'Framework', proficiency: 9, yearsOfExperience: 4 },
      { name: 'Next.js', category: 'Framework', proficiency: 8, yearsOfExperience: 2 },
      { name: 'Node.js', category: 'Framework', proficiency: 9, yearsOfExperience: 4 },
      { name: 'TensorFlow', category: 'Framework', proficiency: 8, yearsOfExperience: 3 },
      { name: 'MongoDB', category: 'Database', proficiency: 8, yearsOfExperience: 3 },
      { name: 'PostgreSQL', category: 'Database', proficiency: 9, yearsOfExperience: 4 },
      { name: 'Docker', category: 'Tool', proficiency: 8, yearsOfExperience: 3 },
      { name: 'AWS', category: 'Cloud Service', proficiency: 7, yearsOfExperience: 2 }
    ];

    for (const tech of sampleTechnologies) {
      const existing = await Technology.findOne({ name: tech.name });
      if (!existing) {
        await Technology.create(tech);
      }
    }

    // Create sample success stories
    const sampleSuccessStories = [
      {
        title: 'Performance Optimization',
        description: 'Improved application response time through database optimization and caching strategies',
        metric: '300%',
        category: 'Performance'
      },
      {
        title: 'Cost Reduction',
        description: 'Reduced infrastructure costs by optimizing cloud resource usage and implementing efficient architectures',
        metric: '40%',
        category: 'Cost Reduction'
      },
      {
        title: 'User Growth',
        description: 'Scalable systems successfully handling millions of concurrent users',
        metric: '2M+',
        category: 'User Growth'
      },
      {
        title: 'Deployment Speed',
        description: 'Streamlined CI/CD pipeline reducing deployment time significantly',
        metric: '75%',
        category: 'Efficiency'
      }
    ];

    for (const story of sampleSuccessStories) {
      const existing = await SuccessStory.findOne({ title: story.title });
      if (!existing) {
        await SuccessStory.create(story);
      }
    }

    // Create sample resume
    const existingResume = await Resume.findOne();
    if (!existingResume) {
      const sampleResume = {
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
        ],
        skills: {
          technical: [
            {
              category: 'Programming Languages',
              items: ['Python', 'JavaScript', 'TypeScript', 'Java', 'Go']
            },
            {
              category: 'Frameworks & Libraries',
              items: ['React', 'Next.js', 'Node.js', 'Express', 'TensorFlow', 'PyTorch']
            },
            {
              category: 'Databases',
              items: ['MongoDB', 'PostgreSQL', 'Redis', 'MySQL']
            },
            {
              category: 'Cloud & DevOps',
              items: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform']
            }
          ],
          soft: ['Leadership', 'Problem Solving', 'Communication', 'Team Collaboration', 'Project Management', 'Mentoring']
        },
        languages: [
          { name: 'English', proficiency: 'Native' },
          { name: 'Hindi', proficiency: 'Native' },
          { name: 'Spanish', proficiency: 'Intermediate' }
        ]
      };
      
      await Resume.create(sampleResume);
    }

    return NextResponse.json({ 
      message: 'Database initialized successfully with sample data!',
      adminCredentials: {
        email: adminEmail,
        password: adminPassword
      }
    });

  } catch (error) {
    console.error('Error initializing database:', error);
    return NextResponse.json({ error: 'Failed to initialize database' }, { status: 500 });
  }
}