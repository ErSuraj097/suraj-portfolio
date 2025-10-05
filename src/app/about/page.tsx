import Navbar from '@/components/Navbar';
import About from '@/components/About';
import Footer from '@/components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About - Suraj Yadav | AI/ML & Backend Engineer',
  description: 'Learn about my expertise in AI/ML engineering, backend development, and full-stack solutions. Discover my technical skills and professional journey.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <About />
      </div>
      <Footer />
    </main>
  );
}