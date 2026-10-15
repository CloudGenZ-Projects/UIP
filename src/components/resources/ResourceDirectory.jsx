import React from 'react';
import { motion } from 'framer-motion';
import { getMediaUrl } from '../../services/api';

const cardStyle = {
  backgroundOrigin: 'border-box',
  backgroundClip: 'padding-box, border-box',
  backgroundImage: 'linear-gradient(#fff, #fff), linear-gradient(135deg, #FF6B6B22, #A855F722, #3B82F622)',
};

export default function ResourceDirectory({ data }) {
  if (!data) return null;

  const title = data.partners_title;
  const description = data.partners_description;
  const partners = data.partners_list || [];

  return (
    <section id="partners" className="py-24 px-6 bg-[#f8fafc]">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Intro Text & Important Note */}
        <div className="max-w-[800px] mx-auto text-center mb-16">
          {title && <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">{title}</h2>}
          {description && (
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              {description}
            </p>
          )}

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-[#FF6B6B]/10 via-[#A855F7]/10 to-[#3B82F6]/10 border border-[#A855F7]/20 rounded-3xl p-8 shadow-sm"
          >
            <div className="flex items-center justify-center gap-3 mb-4 text-[#A855F7]">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-bold text-slate-900">Important Note</h3>
            </div>
            <p className="text-slate-700 font-medium mb-8">
              If you need additional support, please reach out to us directly. We will connect you to the right resources based on your specific needs.
            </p>
            <a 
              href="/contact" 
              className="inline-block px-10 py-4 bg-gradient-to-r from-[#FF6B6B] via-[#A855F7] to-[#3B82F6] text-white rounded-full font-bold shadow-lg hover:scale-105 transition-transform"
            >
              Get Support
            </a>
          </motion.div>
        </div>

        {/* Partners Grid */}
        {partners.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[900px] mx-auto">
            {partners.map((partner, index) => {
              const logoUrl = getMediaUrl(partner.logo);

              return (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  style={cardStyle}
                  className="bg-white rounded-[2.5rem] p-8 border-2 border-transparent shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full group"
                >
                  <div className="flex justify-between items-start mb-6 gap-4">
                    <h3 className="font-extrabold text-2xl text-slate-900 group-hover:text-[#A855F7] transition-colors leading-tight">
                      {partner.name}
                    </h3>
                    {logoUrl && (
                      <img src={logoUrl} alt={partner.name} className="w-12 h-12 object-contain rounded-lg" />
                    )}
                  </div>

                  {partner.type && (
                    <span className="self-start mb-6 bg-[#A855F7]/10 text-[#A855F7] text-xs font-black uppercase px-3 py-1.5 rounded-lg">
                      {partner.type}
                    </span>
                  )}

                  {partner.summary && (
                    <p className="text-slate-500 text-base leading-relaxed mb-8 flex-grow">
                      {partner.summary}
                    </p>
                  )}

                  {partner.website && (
                    <div className="mt-auto pt-6 border-t border-slate-50">
                      <a 
                        href={partner.website} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="inline-flex items-center justify-center w-full py-4 rounded-2xl bg-slate-50 text-slate-900 font-black text-sm hover:bg-slate-900 hover:text-white transition-all shadow-sm"
                      >
                        Visit Website
                      </a>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
