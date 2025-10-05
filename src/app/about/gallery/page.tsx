import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gallery - Suraj Yadav | AI/ML & Backend Engineer',
  description: 'Explore my portfolio gallery showcasing projects, achievements, and the visual side of my technical journey.',
};

interface GalleryItem {
  _id: string;
  title: string;
  description?: string;
  image: string;
  category: string;
  featured: boolean;
}

async function getGallery(): Promise<GalleryItem[]> {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/gallery`, {
      cache: 'no-store'
    });
    if (!res.ok) throw new Error('Failed to fetch gallery');
    return res.json();
  } catch (error) {
    console.error('Error fetching gallery:', error);
    return [];
  }
}

export default async function GalleryPage() {
  const galleryItems = await getGallery();

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold text-gray-900 mb-4">Gallery</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                A visual journey through my projects, achievements, and the creative process behind the code.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {galleryItems.map((item) => (
                <div key={item._id} className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="aspect-w-4 aspect-h-3 bg-gray-200">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={400}
                      height={300}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center">
                    <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
                      <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                      {item.description && <p className="text-sm">{item.description}</p>}
                      <div className="mt-2">
                        <span className="px-2 py-1 bg-white text-gray-800 rounded text-xs">
                          {item.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {galleryItems.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600">No gallery items available at the moment.</p>
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
