import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Story - Suraj Yadav | AI/ML & Backend Engineer',
  description: 'Learn about my professional journey and the story behind my passion for AI/ML and backend engineering.',
};

interface StorySection {
  _id: string;
  title: string;
  content: string;
  section: string;
  order: number;
}

async function getOurStory(): Promise<StorySection[]> {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/our-story`, {
      cache: 'no-store'
    });
    if (!res.ok) throw new Error('Failed to fetch our story');
    return res.json();
  } catch (error) {
    console.error('Error fetching our story:', error);
    return [];
  }
}

export default async function OurStoryPage() {
  const storySections = await getOurStory();

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold text-gray-900 mb-4">Our Story</h1>
              <p className="text-xl text-gray-600">
                The journey of passion, innovation, and relentless pursuit of excellence in technology.
              </p>
            </div>

            <div className="space-y-12">
              {storySections.map((section) => (
                <div key={section._id} className="bg-gray-50 rounded-xl p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
                  <div className="prose prose-lg max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: section.content.replace(/\n/g, '<br />') }} />
                  </div>
                </div>
              ))}
            </div>

            {storySections.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600">Our story content is being prepared...</p>
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
