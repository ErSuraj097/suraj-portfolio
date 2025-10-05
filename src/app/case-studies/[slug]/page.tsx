import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, MapPin, User, ArrowLeft, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

interface CaseStudy {
  _id: string;
  title: string;
  slug: string;
  client?: string;
  duration?: string;
  overview: string;
  challenge: string;
  solution: string;
  results: string;
  technologies: string[];
  images: string[];
  category: string;
  featured: boolean;
  createdAt: string;
}

async function getCaseStudy(slug: string): Promise<CaseStudy | null> {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/case-studies/${slug}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      return null;
    }
    
    return response.json();
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const caseStudy = await getCaseStudy(params.slug);
  
  if (!caseStudy) {
    return {
      title: 'Case Study Not Found',
    };
  }

  return {
    title: `${caseStudy.title} - Case Study | Suraj Yadav`,
    description: caseStudy.overview,
  };
}

export default async function CaseStudyPage({ params }: { params: { slug: string } }) {
  const caseStudy = await getCaseStudy(params.slug);

  if (!caseStudy) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 gradient-dark"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-blue-900/10"></div>
      
      <Navbar />
      <div className="pt-16 relative z-10">
        <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back Button */}
          <Link
            href="/case-studies"
            className="inline-flex items-center space-x-2 gradient-text-accent hover:text-white mb-8 transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft size={20} />
            <span>Back to Case Studies</span>
          </Link>

          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center space-x-4 mb-4">
              <span className="px-3 py-1 glass rounded-full text-sm font-medium text-white/90 border border-white/20">
                {caseStudy.category}
              </span>
              {caseStudy.featured && (
                <span className="px-3 py-1 gradient-secondary rounded-full text-sm font-medium text-white glow-pink">
                  Featured
                </span>
              )}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold gradient-text-primary mb-6 leading-tight">
              {caseStudy.title}
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {caseStudy.client && (
                <div className="flex items-center space-x-2 text-gray-600">
                  <User size={16} />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Client</p>
                    <p>{caseStudy.client}</p>
                  </div>
                </div>
              )}
              {caseStudy.duration && (
                <div className="flex items-center space-x-2 text-gray-600">
                  <Calendar size={16} />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Duration</p>
                    <p>{caseStudy.duration}</p>
                  </div>
                </div>
              )}
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar size={16} />
                <div>
                  <p className="text-sm font-medium text-gray-900">Completed</p>
                  <p>{formatDate(caseStudy.createdAt)}</p>
                </div>
              </div>
            </div>
          </header>

          {/* Images */}
          {caseStudy.images.length > 0 && (
            <div className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {caseStudy.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${caseStudy.title} - Image ${index + 1}`}
                    className="w-full h-64 object-cover rounded-xl"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Content Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              {/* Overview */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Overview</h2>
                <p className="text-gray-700 leading-relaxed text-lg">{caseStudy.overview}</p>
              </section>

              {/* Challenge */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">The Challenge</h2>
                <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
                  <p className="text-gray-700 leading-relaxed">{caseStudy.challenge}</p>
                </div>
              </section>

              {/* Solution */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">The Solution</h2>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                  <p className="text-gray-700 leading-relaxed">{caseStudy.solution}</p>
                </div>
              </section>

              {/* Results */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Results & Impact</h2>
                <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
                  <p className="text-gray-700 leading-relaxed">{caseStudy.results}</p>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                {/* Technologies */}
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Technologies Used</h3>
                  <div className="space-y-2">
                    {caseStudy.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm mr-2 mb-2"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Info */}
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Details</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Category</p>
                      <p className="text-gray-900">{caseStudy.category}</p>
                    </div>
                    {caseStudy.client && (
                      <div>
                        <p className="text-sm font-medium text-gray-600">Client</p>
                        <p className="text-gray-900">{caseStudy.client}</p>
                      </div>
                    )}
                    {caseStudy.duration && (
                      <div>
                        <p className="text-sm font-medium text-gray-600">Timeline</p>
                        <p className="text-gray-900">{caseStudy.duration}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
                  <h3 className="text-lg font-semibold mb-2">Interested in Similar Work?</h3>
                  <p className="text-blue-100 mb-4">Let's discuss your project requirements.</p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center space-x-2 bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  >
                    <span>Get In Touch</span>
                    <ExternalLink size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
      <Footer />
    </main>
  );
}