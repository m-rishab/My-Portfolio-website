import { lazy, Suspense, useCallback, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import NameMarquee from './components/NameMarquee';
import ScrollProgressBar from './components/ScrollProgressBar';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import SideRail from './components/SideRail';
import CommandPalette from './components/CommandPalette';
import SmoothScroll from './components/SmoothScroll';
import ProjectModal from './components/ProjectModal';
import { keyProjects } from './data/portfolio';

const ProjectsSection = lazy(() => import('./components/Projects'));
const ExperienceSection = lazy(() => import('./components/Experience'));
const WritingNow = lazy(() => import('./components/WritingNow'));
const ContactSection = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const PortfolioChatbot = lazy(() => import('./components/PortfolioChatbot'));

function SectionLoader() {
  return (
    <div className="flex h-48 w-full items-center justify-center py-12">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#2f5ce8]/20 border-t-[#2f5ce8]" />
    </div>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [globalStudy, setGlobalStudy] = useState(null);

  const onPreloaderComplete = useCallback(() => setLoaded(true), []);

  const handlePaletteStudy = useCallback(
    (cmd) => {
      const id = cmd.replace('case-study:', '');
      const project = keyProjects.find((p) => p.id === id);
      if (project) setGlobalStudy(project);
    },
    [],
  );

  const closeStudy = useCallback(() => setGlobalStudy(null), []);

  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-paper text-ink">
        <Helmet>
          <title>Rishabh Mishra | AI Engineer & Data Scientist</title>
          <meta
            name="description"
            content="AI Engineer specializing in large-scale search analytics, automated GenAI evaluation, and RAG systems. Currently at Google xWS via Highspring."
          />
          <meta property="og:title" content="Rishabh Mishra | AI Engineer & Data Scientist" />
          <meta
            property="og:description"
            content="Building automated evaluation systems for LLMs at Google scale. Experience in RAG, prompt engineering, and billion-scale data analytics."
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://mirishabhh.onrender.com" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Rishabh Mishra | AI Engineer & Data Scientist" />
        </Helmet>

        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[500] focus:rounded-lg focus:bg-charcoal focus:px-4 focus:py-2 focus:text-headline"
        >
          Skip to content
        </a>

        <CustomCursor />
        <ScrollProgressBar />
        <SmoothScroll />

        {globalStudy && <ProjectModal project={globalStudy} onClose={closeStudy} />}

        <Preloader onComplete={onPreloaderComplete} />

        <CommandPalette onCaseStudy={handlePaletteStudy} />

        <div className="relative z-10">
          <Navbar />
          <SideRail />

          <main id="main-content">
            <Hero ready={loaded} />
            <NameMarquee id="marquee" />

            <Suspense fallback={<SectionLoader />}>
              <ProjectsSection />
              <ExperienceSection />
              <WritingNow />
              <ContactSection />
            </Suspense>
          </main>

          <Suspense fallback={null}>
            <Footer />
            <PortfolioChatbot />
          </Suspense>
        </div>
      </div>
    </ThemeProvider>
  );
}