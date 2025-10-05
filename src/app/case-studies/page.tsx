import Navbar from '@/components/Navbar';
import CaseStudies from '@/components/CaseStudies';
import CaseStudiesTest from '@/components/CaseStudiesTest';
import Footer from '@/components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Case Studies - Suraj Yadav | Project Deep Dives',
  description: 'Detailed case studies of complex projects showcasing problem-solving approaches, technical solutions, and measurable results.',
};

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 gradient-dark"></div>
      
      <Navbar />
      <div className="pt-16 relative z-10">
        <CaseStudiesTest />
        <CaseStudies />
      </div>
      <Footer />
    </main>
  );
}