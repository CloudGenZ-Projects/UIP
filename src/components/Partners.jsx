import React from 'react';
import { motion } from 'framer-motion';
import { getMediaUrl } from '../services/api';

export default function Partners({ data }) {
  const partners = Array.isArray(data?.partners) ? data.partners : [];
  if (!partners || partners.length === 0) return null;

  const heading = data?.partners_title;
  const subheading = data?.partners_description;

  return (
    <section className="py-[2px] px-6 bg-[#FAFAFA] overflow-hidden">
      <div className="max-w-[1000px] mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          {heading && (
            <h2 className="text-[2.5rem] font-extrabold leading-tight mb-4 text-slate-800">
              {heading}
            </h2>
          )}
          {subheading && (
            <p className="text-slate-500 text-[1.1rem] leading-[1.8] max-w-[600px] mx-auto mb-12">
              {subheading}
            </p>
          )}
        </motion.div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12">
          {partners.map((partner, index) => {
            const logoUrl = getMediaUrl(partner.logo);
            return (
              <motion.a
                key={index}
                href={partner.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }} 
                whileInView={{ opacity: 1, scale: 1 }} 
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="px-8 py-6 w-full md:w-auto min-w-[300px] bg-white rounded-2xl shadow-md border border-slate-100 flex items-center justify-center text-center cursor-pointer hover:shadow-lg transition"
              >
                {logoUrl ? (
                  <img src={logoUrl} alt={partner.name} className="h-10 object-contain mx-auto" />
                ) : (
                  <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FF6B6B] to-[#A855F7]">
                    {partner.name}
                  </h3>
                )}
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
