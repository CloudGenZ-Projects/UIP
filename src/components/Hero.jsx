import React from 'react';
import { motion } from 'framer-motion';

export default function Hero({ data }) {
  if (!data) return null;

  // Video is local in the frontend (no video in CMS)
  const youtubeVideoId = "RHaZ3dy1rc0";
  const thumbnailUrl = `https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg`;

  // Text content from CMS
  const badge = data.hero_badge;
  const titleLine1 = data.hero_title_line_1;
  const titleGradient = data.hero_title_gradient;
  const description = data.hero_description;

  const cta1Label = data.hero_cta_primary_label;
  const cta1Link = data.hero_cta_primary_link;
  const cta2Label = data.hero_cta_secondary_label;
  const cta2Link = data.hero_cta_secondary_link;
  const cta3Label = data.hero_cta_tertiary_label;
  const cta3Link = data.hero_cta_tertiary_link;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-[120px] pb-[160px] px-6">
      
      {/* Background YouTube Video */}
      <div 
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-cover bg-center"
        style={{ backgroundImage: `url(${thumbnailUrl})` }}
      >
        <iframe
          src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${youtubeVideoId}&modestbranding=1`}
          title="YouTube Background Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          className="absolute top-1/2 left-1/2 w-[100vw] h-[100vh] min-w-[177.77vh] min-h-[56.25vw] -translate-x-1/2 -translate-y-1/2 opacity-80"
        ></iframe>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-br from-[#1e1b4b]/80 via-[#4c1d95]/80 to-[#3b82f6]/80">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_20%_50%,rgba(255,107,107,0.3)_0%,transparent_60%),radial-gradient(ellipse_at_80%_20%,rgba(59,130,246,0.3)_0%,transparent_60%)]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-[800px]">
        
        {badge && (
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }}
            className="inline-block py-2 px-5 bg-white/12 border border-white/20 rounded-full text-white/90 text-sm font-semibold backdrop-blur-md mb-6 shadow-lg"
          >
            {badge}
          </motion.p>
        )}
        
        {(titleLine1 || titleGradient) && (
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white text-3xl md:text-[3.2rem] font-extrabold leading-[1.2] mb-5 drop-shadow-2xl"
          >
            {titleLine1 && <>{titleLine1}<br /></>}
            {titleGradient && (
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF6B6B] via-[#A855F7] to-[#3B82F6]">
                {titleGradient}
              </span>
            )}
          </motion.h1>
        )}
        
        {description && (
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/95 text-lg md:text-[1.2rem] leading-[1.9] max-w-[650px] mx-auto mb-9 font-medium drop-shadow-md"
          >
            {description}
          </motion.p>
        )}
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          {cta1Label && (
            <a href={cta1Link || '#'} className="px-8 py-3.5 bg-gradient-to-r from-[#FF6B6B] via-[#A855F7] to-[#3B82F6] text-white rounded-full font-bold shadow-xl hover:scale-105 transition-transform duration-300">
              {cta1Label}
            </a>
          )}
          {cta2Label && (
            <a href={cta2Link || '#'} className="px-8 py-3.5 bg-white/15 border-2 border-white/50 backdrop-blur-md text-white rounded-full font-bold hover:bg-white/25 transition-all duration-300">
              {cta2Label}
            </a>
          )}
          {cta3Label && (
            <a href={cta3Link || '#'} className="px-8 py-3.5 bg-white/15 border-2 border-white/50 backdrop-blur-md text-white rounded-full font-bold hover:bg-white/25 transition-all duration-300">
              {cta3Label}
            </a>
          )}
        </motion.div>

      </div>

      {/* Bottom Wave Divider */}
      <svg className="absolute bottom-[-2px] left-0 w-full h-[180px] z-[3]" viewBox="0 0 1440 180" preserveAspectRatio="none">
        <path d="M0,80 C240,160 480,0 720,80 C960,160 1200,0 1440,80 L1440,180 L0,180 Z" fill="#FAFAFA"/>
      </svg>
      
    </section>
  );
}
