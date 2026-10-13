import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ProgramsCTA({ data }) {
  if (!data) return null;

  const handleScrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <section className="py-24 px-6 bg-[#FAFAFA]">
      <div className="max-w-[1000px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="rounded-[3.5rem] p-[2px] shadow-2xl" 
          style={{ backgroundImage: 'linear-gradient(135deg, #FF6B6B, #A855F7, #3B82F6)' }}
        >
          <div className="bg-white rounded-[calc(3.5rem-2px)] py-20 px-8 md:px-20 text-center">
            {data.ctaEmoji && <span className="text-6xl mb-8 block">{data.ctaEmoji}</span>}
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-tight">
              {data.ctaTitleLine1} <br /> {data.ctaTitleLine2}
            </h2>
            {data.ctaDesc && (
              <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
                {data.ctaDesc}
              </p>
            )}

            <div className="flex flex-wrap justify-center gap-4 mb-16">
              {data.ctaPrimaryBtnText && (
                <NavLink 
                  to={data.ctaPrimaryBtnLink || '/programs'} 
                  onClick={handleScrollToTop}
                  className="px-10 py-5 bg-gradient-to-r from-[#FF6B6B] via-[#A855F7] to-[#3B82F6] text-white rounded-2xl font-black text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
                >
                  {data.ctaPrimaryBtnText}
                </NavLink>
              )}
              
              {data.ctaSecondaryBtnText && (
                <NavLink 
                  to={data.ctaSecondaryBtnLink || '/contact'} 
                  onClick={handleScrollToTop}
                  className="px-10 py-5 border-2 border-slate-200 text-slate-900 rounded-2xl font-black text-lg hover:bg-slate-50 transition-all"
                >
                  {data.ctaSecondaryBtnText}
                </NavLink>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
