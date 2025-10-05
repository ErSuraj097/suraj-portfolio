import Navbar from '@/components/Navbar';
import Skills from '@/components/Skills';
import Footer from '@/components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Skills - Suraj Yadav | Technical Expertise',
  description: 'Explore my technical skills including programming languages, frameworks, databases, and tools. View proficiency levels and years of experience.',
};

export default function SkillsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <Skills />
      </div>
      <Footer />
    </main>
  );
}