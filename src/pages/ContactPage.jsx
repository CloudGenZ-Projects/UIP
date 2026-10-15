import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactHero from '../components/contact/ContactHero';
import ContactMain from '../components/contact/ContactMain';
import CrisisMiniBanner from '../components/contact/CrisisMiniBanner';
import { useUipContactPageLive } from '../hooks/usePayloadLive';

export default function ContactPage() {
  const { data } = useUipContactPageLive();

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
