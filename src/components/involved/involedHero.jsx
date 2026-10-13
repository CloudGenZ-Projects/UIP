import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function PartnershipHero({ data }) {
  if (!data) return null;

  return (
    <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden pt-[120px] pb-[180px] px-6 text-center border-none">
      
      {/* --- EXACT BACKGROUND COLORS AS REQUESTED --- */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#1e1b4b] via-[#4c1d95] to-[#3b82f6]">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_20%_50%,rgba(255,107,107,0.3)_0%,transparent_60%),radial-gradient(ellipse_at_80%_20%,rgba(59,130,246,0.3)_0%,transparent_60%)]"></div>
      </div>
      
      <div className="relative z-10 max-w-[1000px]">
        {/* Badge Component */}
        {data.heroBadge && (
          <motion.span 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            className="inline-block py-2 px-5 bg-white/12 border border-white/20 rounded-full text-white/90 text-sm font-bold uppercase tracking-widest backdrop-blur-md mb-8"
          >
            {data.heroBadge}
          </motion.span>
        )}
        
        {/* Main Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-white text-5xl md:text-[5rem] font-black leading-[1.1] mb-8"
        >
          {data.heroTitleLine1} <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF6B6B] via-[#A855F7] to-[#3B82F6]">
            {data.heroTitleGradient}
          </span>
        </motion.h1>
        
        {/* Description */}
        {data.heroDescription && (
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/80 text-lg md:text-[1.3rem] leading-[1.8] max-w-[800px] mx-auto mb-12"
          >
            {data.heroDescription}
          </motion.p>
        )}

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-5"
        >
          {data.heroPrimaryBtnText && (
            <Link to={data.heroPrimaryBtnLink || '/Partnership'} className="px-10 py-4 bg-gradient-to-r from-[#FF6B6B] via-[#A855F7] to-[#3B82F6] text-white rounded-full font-bold shadow-lg hover:scale-105 transition-transform inline-block">
              {data.heroPrimaryBtnText}
            </Link>
          )}
          {data.heroSecondaryBtnText && (
            <Link to={data.heroSecondaryBtnLink || '/programs'} className="px-10 py-4 bg-white/10 border-2 border-white/20 backdrop-blur-md text-white rounded-full font-bold hover:bg-white/20 transition-all inline-block">
              {data.heroSecondaryBtnText}
            </Link>
          )}
        </motion.div>
      </div>

      {/* --- WAVE DIVIDER --- */}
      <svg className="absolute bottom-[-2px] left-0 w-full h-[120px] md:h-[180px] z-[3]" viewBox="0 0 1440 180" preserveAspectRatio="none">
        <path d="M0,80 C240,160 480,0 720,80 C960,160 1200,0 1440,80 L1440,180 L0,180 Z" fill="#FFFFFF"/>
      </svg>
    </section>
  );
}
