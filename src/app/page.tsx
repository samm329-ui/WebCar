import ScrollHero from '@/components/scroll-hero';
import Navigation from '@/components/navigation';
import Services from '@/components/services';
import Categories from '@/components/categories';
import Gallery from '@/components/gallery';
import About from '@/components/about';
import Contact from '@/components/contact';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <main>
      <Navigation />
      <ScrollHero />
      <div className="bg-background">
        <Services />
        <Categories />
        <Gallery />
        <About />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
