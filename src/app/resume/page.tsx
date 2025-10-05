import Navbar from '@/components/Navbar';
import Resume from '@/components/Resume';
import Footer from '@/components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resume - Suraj Yadav | Professional Experience',
  description: 'View my complete professional resume including work experience, education, certifications, and achievements in AI/ML and backend development.',
};

export default function ResumePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <Resume />
      </div>
      <Footer />
    </main>
  );
}