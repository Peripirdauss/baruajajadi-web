'use client';

import { Header } from '@/components/header';
import { AboutHero } from '@/components/about-hero';
import { AboutBio } from '@/components/about-bio';
import { Skills } from '@/components/skills';
import { Projects } from '@/components/projects';
import { Timeline } from '@/components/timeline';
import { ContactCTA } from '@/components/contact-cta';
import { Footer } from '@/components/footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <AboutHero />
        <AboutBio />
        <Skills />
        <Projects />
        <Timeline />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}
