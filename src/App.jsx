import './index.css';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Services from './components/Services/Services';
import Packages from './components/Packages/Packages';
import Portfolio from './components/Portfolio/Portfolio';
import Testimonials from './components/Testimonials/Testimonials';
import YouTubeGrid from './components/YouTubeGrid/YouTubeGrid';
import Footer from './components/Footer/Footer';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Packages />
        <Portfolio />
        <Testimonials />
        <YouTubeGrid />
      </main>
      <Footer />
    </>
  );
}

