import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import ResourcesHero from '../components/resources/ResourcesHero';
import ResourceNavigationIntro from '../components/resources/ResourceNavigationIntro';
import ResourceDirectory from '../components/resources/ResourceDirectory';
import SupportFormCTA from '../components/support/SupportFormCTA';
import { useUipPartnersPageLive } from '../hooks/usePayloadLive';

export default function ResourcesPage() {
  const { data } = useUipPartnersPageLive();

  return (
    <div className="min-h-screen bg-white font-sans text-pride-navy">
      <Navbar />
      <main id="resources">
        <ResourcesHero data={data} />
        <ResourceNavigationIntro data={data} />
        <ResourceDirectory data={data} />
        <SupportFormCTA data={data} />
      </main>
      <Footer />
    </div>
  );
}
