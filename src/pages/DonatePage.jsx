import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Donate from '../components/volunteer/Donate'; 
import VolunteerHero from '../components/volunteer/VolunteerHero';
import { useUipDonatePageLive } from '../hooks/usePayloadLive';

export default function DonatePage() {
  const { data } = useUipDonatePageLive();

  return (
    <div className="min-h-screen bg-white font-sans text-[#3A3556]">
      <Navbar />

      <main id="donate" className="relative">
        <VolunteerHero data={data} />
        <Donate data={data} />
      </main>

      <Footer />
    </div>
  );
}
