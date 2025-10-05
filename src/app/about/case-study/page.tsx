import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Case Studies - Suraj Yadav | AI/ML & Backend Engineer',
  description: 'Explore detailed case studies of my AI/ML and backend engineering projects, showcasing problem-solving and technical expertise.',
};

interface CaseStudy {
  _id: string;
  title: string;
  slug: string;
  client?: string;
  overview: string;
  challenge: string;
  solution: string;
  results: string;
  technologies: string[];
  category: string;
  featured: boolean;
}

async function getCaseStudies(): Promise<CaseStudy[]> {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/case-studies`, {
      cache: 'no-store'
    });
    if (!res.ok) throw new Error('Failed to fetch case studies');
    return res.json();
  } catch (error) {
    console.error('Error fetching case studies:', error);
    return [];
  }
}

export default async function CaseStudyPage() {
  const caseStudies = await getCaseStudies();

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold text-gray-900 mb-4">Case Studies</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                In-depth explorations of complex problems solved through innovative technology solutions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudies.map((study) => (
                <div key={study._id} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {study.category}
                    </span>
                    {study.featured && (
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                        Featured
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{study.title}</h3>
                  <p className="text-gray-600 mb-4">{study.overview}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {study.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                    {study.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                        +{study.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                  <Link
                    href={`/case-studies/${study.slug}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Read Case Study →
                  </Link>
                </div>
              ))}
            </div>

            {caseStudies.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600">No case studies available at the moment.</p>
              </div>
            )}

            <div className="text-center mt-12">
              <Link
                href="/case-studies"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium"
              >
                View All Case Studies
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
