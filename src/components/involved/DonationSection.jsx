import React from 'react';
import { Link } from 'react-router-dom';

export default function DonationSection({ heading, buttonText, buttonLink, tiers }) {
  if (!tiers || tiers.length === 0) return null;

  return (
    <section className="py-24 px-6 bg-[#f8fafc] rounded-[60px] mx-4 my-10">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-black text-[#1E1B4B] mb-12">{heading || 'Make a Donation'}</h2>
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {tiers.map((t, i) => (
            <div key={i} className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100">
              <div className="text-3xl font-black text-[#A855F7] mb-2">{t.amount}</div>
              <p className="text-gray-500 text-sm">{t.impact}</p>
            </div>
          ))}
        </div>
        <Link to={buttonLink || '/donate'} className="inline-block bg-[#0f0a2e] text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-[#1e1b4b] transition-all">
          {buttonText || 'Donate Now 💜'}
        </Link>
      </div>
    </section>
  );
}
