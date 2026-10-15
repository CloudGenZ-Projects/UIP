import React from 'react';
import { Link } from 'react-router-dom';

export default function StoriesCTA({ data }) {
  if (!data) return null;

  const title = data.cta_title;
  const desc = data.cta_description;
  const pLabel = data.cta_primary_label;
  const pLink = data.cta_primary_link;
  const sLabel = data.cta_secondary_label;
  const sLink = data.cta_secondary_link;

  return (
    <section className="py-24 px-6 bg-[#FAFAFA]">
      <div className="max-w-[1000px] mx-auto">
        <div 
          className="rounded-[3rem] p-[2px] shadow-2xl" 
          style={{ backgroundImage: 'linear-gradient(135deg, #FF6B6B, #A855F7, #3B82F6)' }}
        >
          <div className="bg-white rounded-[calc(3rem-2px)] py-16 px-8 md:px-16 text-center">
            {title && <h2 className="text-4xl font-black text-slate-900 mb-6">{title}</h2>}
            {desc && (
              <p className="text-slate-500 text-lg mb-10 max-w-2xl mx-auto">
                {desc}
              </p>
            )}

            <div className="flex flex-wrap justify-center gap-4">
              {pLabel && (
                <Link to={pLink || '/programs'} className="px-10 py-4 bg-gradient-to-r from-[#FF6B6B] to-[#A855F7] text-white rounded-full font-bold shadow-lg hover:scale-105 transition-transform">
                  {pLabel}
                </Link>
              )}
              {sLabel && (
                <Link to={sLink || '/about'} className="px-10 py-4 border-2 border-[#A855F7] text-[#A855F7] rounded-full font-bold hover:bg-purple-50 transition-colors">
                  {sLabel}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
