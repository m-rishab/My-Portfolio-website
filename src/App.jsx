import { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import NameMarquee from './components/NameMarquee';
import ScrollProgressBar from './components/ScrollProgressBar';
import CursorReactiveCanvas from './components/CursorReactiveCanvas';

// Lazy-load below-the-fold components
const AboutSection = lazy(() => import('./components/AboutSection'));
const ExperienceSection = lazy(() => import('./components/Experience'));
const ProjectsSection = lazy(() => import('./components/Projects'));
const NowSection = lazy(() => import('./components/NowSection'));
const ContactSection = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const PortfolioChatbot = lazy(() => import('./components/PortfolioChatbot'));

// Simple sleek loading spinner fallback
function SectionLoader() {
  return (
    <div className="flex h-48 w-full items-center justify-center py-12">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
    </div>
  );
}

export default function App() {
  return (
    <div className="vignette">
      <Helmet>
        <title>Rishabh Mishra | AI Engineer & Data Analyst at Google</title>
        <meta
          name="description"
          content="AI Engineer specializing in large-scale search analytics, automated GenAI evaluation, and RAG systems. Currently at Google xWS via Highspring."
        />

        {/* Open Graph */}
        <meta property="og:title" content="Rishabh Mishra | AI Engineer & Data Analyst" />
        <meta
          property="og:description"
          content="Building automated evaluation systems for LLMs at Google scale. Experience in RAG, prompt engineering, and billion-scale data analytics."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mirishabhh.onrender.com" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Rishabh Mishra | AI Engineer" />
        <meta
          name="twitter:description"
          content="AI Engineer at Google xWS. Automated evaluation systems, RAG, large-scale analytics."
        />
      </Helmet>

      <ScrollProgressBar />

      {/* Cursor-reactive animated background */}
      <CursorReactiveCanvas />

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <NameMarquee />

          <Suspense fallback={<SectionLoader />}>
            <AboutSection />
            <ExperienceSection />
            <ProjectsSection />
            <NowSection />
            <ContactSection />
          </Suspense>
        </main>

        <Suspense fallback={null}>
          <Footer />
          <PortfolioChatbot />
        </Suspense>
      </div>
    </div>
  );
}
