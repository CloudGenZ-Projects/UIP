import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import CarePackHero from '../components/carepacks/CarePackHero';
import CarePackContents from '../components/carepacks/CarePackContents';
import CarePackFAQ from '../components/carepacks/CarePackFAQ';
import CarePackFormCTA from '../components/carepacks/CarePackFormCTA';
import { useUipCarePacksPageLive } from '../hooks/usePayloadLive';

export default function CarePackPage() {
  const { data } = useUipCarePacksPageLive();

  return (
    <div className="min-h-screen bg-white font-sans text-pride-navy">
      <Navbar />
      <main id="care-packs">
        <CarePackHero data={data} />
        <CarePackContents data={data} />
        <CarePackFormCTA data={data} />
        <CarePackFAQ data={data} />
      </main>
      <Footer />
    </div>
  );
}
