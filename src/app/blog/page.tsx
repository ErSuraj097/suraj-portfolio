import Navbar from '@/components/Navbar';
import Blog from '@/components/Blog';
import Footer from '@/components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - Suraj Yadav | Tech Articles & Insights',
  description: 'Read my latest blog posts about AI/ML, backend development, technology trends, and programming tutorials.',
};

export default function BlogPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <Blog />
      </div>
      <Footer />
    </main>
  );
}