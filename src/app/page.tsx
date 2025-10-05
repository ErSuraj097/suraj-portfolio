import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Summary from '@/components/Summary';
import SuccessStories from '@/components/SuccessStories';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Summary />
      <SuccessStories />
      <Footer />
    </main>
  );
}