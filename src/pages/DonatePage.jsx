import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Donate from '../components/volunteer/Donate'; 
import VolunteerHero from '../components/volunteer/VolunteerHero';
import { getUipDonatePageData } from '../services/api';
import { useUipDonatePageLive } from '../hooks/usePayloadLive';

export default function DonatePage() {
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUipDonatePageData()
      .then((data) => {
        if (data) setInitialData(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const liveData = useUipDonatePageLive(initialData);
  const data = liveData || initialData;

  if (loading && !data) {
    return (
      <div className="min-h-screen bg-[#0f0a2e] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

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
