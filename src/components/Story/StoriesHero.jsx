import React from 'react';
import { motion } from 'framer-motion';

export default function StoriesHero({ data }) {
  if (!data) return null;

  const badge = data.hero_badge;
  const title1 = data.hero_title_line_1;
  const titleGrad = data.hero_title_gradient;
  const desc = data.hero_description;

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-[120px] pb-[160px] px-6">
      {/* Background Gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#1e1b4b] via-[#4c1d95] to-[#3b82f6]">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_20%_50%,rgba(255,107,107,0.3)_0%,transparent_60%),radial-gradient(ellipse_at_80%_20%,rgba(59,130,246,0.3)_0%,transparent_60%)]"></div>
      </div>
      
      <div className="relative z-10 text-center max-w-[900px]">
        {badge && (
          <motion.span 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            className="inline-block py-2 px-5 bg-white/12 border border-white/20 rounded-full text-white/90 text-sm font-medium backdrop-blur-md mb-6"
          >
            {badge}
          </motion.span>
        )}
        
        {(title1 || titleGrad) && (
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white text-5xl md:text-[4.5rem] font-extrabold leading-[1.1] mb-6"
          >
            {title1 && <>{title1} <br /></>}
            {titleGrad && (
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF6B6B] via-[#A855F7] to-[#3B82F6]">
                {titleGrad}
              </span>
            )}
          </motion.h1>
        )}
        
        {desc && (
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/80 text-lg md:text-[1.25rem] leading-[1.8] max-w-[700px] mx-auto"
          >
            {desc}
          </motion.p>
        )}
      </div>

      {/* Wave bottom decoration */}
      <svg className="absolute bottom-[-2px] left-0 w-full h-[120px] md:h-[180px] z-[3]" viewBox="0 0 1440 180" preserveAspectRatio="none">
        <path d="M0,80 C240,160 480,0 720,80 C960,160 1200,0 1440,80 L1440,180 L0,180 Z" fill="#FFFFFF"/>
      </svg>
    </section>
  );
}
