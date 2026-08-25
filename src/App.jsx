import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ExperienceSection from './components/Experience';
import ProjectsSection from './components/Projects';
import ContactSection from './components/Contact';
import Footer from './components/Footer';
import PortfolioChatbot from './components/PortfolioChatbot';
import AntigravityCanvas from './components/AntigravityCanvas';
import ScrollProgressBar from './components/ScrollProgressBar';

export default function App() {
  return (
    <div className="vignette">
      <ScrollProgressBar />
      <AntigravityCanvas />

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <ExperienceSection />
          <ProjectsSection />
          <ContactSection />
        </main>
        <Footer />
        <PortfolioChatbot />
      </div>
    </div>
  );
}
