import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import InvolvedHero from '../components/involved/involedHero';
import VolunteerRoles from '../components/involved/VolunteerRoles';
import DonationSection from '../components/involved/DonationSection';
import ImpactStats from '../components/involved/ImpactStats';
import { getUipInvolvedPageData } from '../services/api';
import { useUipInvolvedPageLive } from '../hooks/usePayloadLive';

import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function InvolvedPage() {
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUipInvolvedPageData()
      .then((data) => {
        if (data) setInitialData(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const liveData = useUipInvolvedPageLive(initialData);
  const data = liveData || initialData;

  if (loading && !data) {
    return (
      <div className="min-h-screen bg-[#0f0a2e] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <InvolvedHero data={data} />
        
        {/* Volunteer Section */}
        <VolunteerRoles
          heading={data?.volunteerHeading}
          subtitle={data?.volunteerSubtitle}
          roles={data?.volunteerRoles}
        />

        {/* Impact Stats */}
        <ImpactStats stats={data?.impactStats} />

        {/* Donation Section */}
        <DonationSection
          heading={data?.donationHeading}
          buttonText={data?.donationBtnText}
          buttonLink={data?.donationBtnLink}
          tiers={data?.donationTiers}
        />

        {/* Corporate Partnership CTA */}
        {data?.corporateHeading && (
          <section className="py-24 px-6 max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-[#1e1b4b] to-[#1E1B4B] rounded-[40px] p-10 md:p-16 flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1 text-center md:text-left text-white">
                <h2 className="text-3xl md:text-4xl font-black mb-6">{data.corporateHeading}</h2>
                {data.corporateDesc && (
                  <p className="text-white/70 text-lg mb-8 leading-relaxed">
                    {data.corporateDesc}
                  </p>
                )}
                {data.corporateLinkText && (
                  <Link to={data.corporateLinkUrl || '/Partnership'} className="inline-flex items-center gap-2 text-white font-bold text-lg border-b-2 border-pink-500 pb-1 hover:gap-4 transition-all">
                    {data.corporateLinkText} <ArrowRight />
                  </Link>
                )}
              </div>
              {data.corporateFeatures && data.corporateFeatures.length > 0 && (
                <div className="flex-1 grid grid-cols-1 gap-4 w-full">
                  {data.corporateFeatures.map((feat, idx) => (
                    <div key={idx} className="bg-white/5 border border-white/10 p-6 rounded-2xl text-white">
                      <h4 className="font-bold mb-1">{feat.title}</h4>
                      <p className="text-white/50 text-sm">{feat.desc}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Final CTA */}
        {data?.ctaHeading && (
          <section className="py-24 px-6 text-center">
            <h2 className="text-3xl font-black mb-8">{data.ctaHeading}</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {data.ctaPrimaryText && (
                <Link to={data.ctaPrimaryLink || '/volunteer'} className="px-10 py-4 bg-gradient-to-r from-[#FF6B6B] via-[#A855F7] to-[#3B82F6] text-white rounded-full font-bold shadow-lg hover:scale-105 transition-transform">
                  {data.ctaPrimaryText}
                </Link>
              )}
              {data.ctaSecondaryText && (
                <Link to={data.ctaSecondaryLink || '/donate'} className="px-8 py-4 bg-[#0f0a2e] text-white rounded-2xl font-bold hover:scale-105 transition-transform">
                  {data.ctaSecondaryText}
                </Link>
              )}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
