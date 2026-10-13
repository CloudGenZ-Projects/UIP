import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AboutHero from '../components/about/AboutHero';
import AboutMissionVision from '../components/about/AboutMissionVision';
import AboutLeadership from '../components/about/AboutLeadership';
import AboutWhyAndValues from '../components/about/AboutWhyAndValues';
import AboutCTA from '../components/about/AboutCTA';
import TeamBios from '../components/about/TeamBios';
import { useUipAboutPageLive } from '../hooks/usePayloadLive';

export default function AboutPage() {
  const { data } = useUipAboutPageLive();

  return (
    <div className="min-h-screen bg-white font-sans text-pride-navy">
      <Navbar />
      <main>
        <AboutHero data={data} />
        <AboutMissionVision data={data} />
        <AboutLeadership data={data} />
        <AboutWhyAndValues data={data} />
        <TeamBios data={data} />
        <AboutCTA data={data} />
      </main>
      <Footer />
    </div>
  );
}
