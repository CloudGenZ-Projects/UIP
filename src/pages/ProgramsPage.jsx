import React from 'react';
import ProgramsHero from '../components/programs/ProgramsHero';
import CorePrograms from '../components/programs/CorePrograms';
import ProgramImpact from '../components/programs/ProgramImpact';
import JourneySteps from '../components/programs/JourneySteps';
import ProgramsCTA from '../components/programs/ProgramsCTA';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useUipProgramsPageLive } from '../hooks/usePayloadLive';

export default function ProgramsPage() {
  const { data } = useUipProgramsPageLive();

  return (
    <div className="min-h-screen bg-white font-sans text-pride-navy">
      <Navbar />
      
      <main id="programs" className="relative">
        <ProgramsHero data={data} />
        <CorePrograms programs={data?.programsList} />
        <ProgramImpact
          heading={data?.impactHeading}
          subtitle={data?.impactSubtitle}
          stats={data?.impactStats}
        />
        <JourneySteps
          heading={data?.journeyHeading}
          subtitle={data?.journeySubtitle}
          steps={data?.journeySteps}
        />
        
        <div id="donate">
          <ProgramsCTA data={data} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
