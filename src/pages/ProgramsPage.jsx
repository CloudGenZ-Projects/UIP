import React, { useState, useEffect } from 'react';
import ProgramsHero from '../components/programs/ProgramsHero';
import CorePrograms from '../components/programs/CorePrograms';
import ProgramImpact from '../components/programs/ProgramImpact';
import JourneySteps from '../components/programs/JourneySteps';
import ProgramsCTA from '../components/programs/ProgramsCTA';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getUipProgramsPageData } from '../services/api';
import { useUipProgramsPageLive } from '../hooks/usePayloadLive';

export default function ProgramsPage() {
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUipProgramsPageData()
      .then((data) => {
        if (data) setInitialData(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const liveData = useUipProgramsPageLive(initialData);
  const data = liveData || initialData;

  if (loading && !data) {
    return (
      <div className="min-h-screen bg-[#0f0a2e] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

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
