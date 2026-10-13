import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactHero from '../components/contact/ContactHero';
import ContactMain from '../components/contact/ContactMain';
import CrisisMiniBanner from '../components/contact/CrisisMiniBanner';
import { getUipContactPageData } from '../services/api';
import { useUipContactPageLive } from '../hooks/usePayloadLive';

export default function ContactPage() {
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUipContactPageData()
      .then((data) => {
        if (data) setInitialData(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const liveData = useUipContactPageLive(initialData);
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
      
      <main id="contact">
        <ContactHero data={data} />
        <ContactMain data={data} />
        <CrisisMiniBanner data={data} />
      </main>

      <Footer />
    </div>
  );
}
