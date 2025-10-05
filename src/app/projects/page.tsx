import Navbar from '@/components/Navbar';
import Projects from '@/components/Projects';
import Footer from '@/components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects - Suraj Yadav | Portfolio',
  description: 'Explore my featured projects in AI/ML, backend development, and full-stack applications. View live demos and source code.',
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <Projects />
      </div>
      <Footer />
    </main>
  );
}