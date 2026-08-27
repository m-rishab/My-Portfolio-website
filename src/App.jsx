import Navbar from './components/Navbar';
import Hero from './components/Hero';
import NameMarquee from './components/NameMarquee';
import AboutSection from './components/AboutSection';
import ExperienceSection from './components/Experience';
import ProjectsSection from './components/Projects';
import NowSection from './components/NowSection';
import WritingSection from './components/WritingSection';
import ContactSection from './components/Contact';
import Footer from './components/Footer';
import PortfolioChatbot from './components/PortfolioChatbot';
import ScrollProgressBar from './components/ScrollProgressBar';

export default function App() {
  return (
    <div className="vignette">
      <ScrollProgressBar />

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <NameMarquee />
          <AboutSection />
          <ExperienceSection />
          <ProjectsSection />
          <NowSection />
          <WritingSection />
          <ContactSection />
        </main>
        <Footer />
        <PortfolioChatbot />
      </div>
    </div>
  );
}
