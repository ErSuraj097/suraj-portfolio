import Navbar from '@/components/Navbar';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact - Suraj Yadav | Get In Touch',
  description: 'Get in touch for collaboration opportunities, project discussions, or technical consultations. Available for freelance and full-time opportunities.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <Contact />
      </div>
      <Footer />
    </main>
  );
}