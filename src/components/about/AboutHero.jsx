import React from 'react';
import { motion } from 'framer-motion';

export default function AboutHero({ data }) {
  if (!data) return null;

  // Video is local in the frontend (no video in CMS)
  const youtubeVideoId = "0Lo3zopgsrw";

  const badge = data.hero_badge;
  const titleLine1 = data.hero_title_line_1;
  const titleGradient = data.hero_title_gradient;
  const description = data.hero_description;

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-[120px] pb-[180px] px-6">
      
      {/* Background YouTube Video */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-black">
        <iframe
          src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${youtubeVideoId}&playsinline=1&modestbranding=1&vq=hd1080`}
          title="YouTube Background Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          width="1920"
          height="1080"
          className="absolute top-1/2 left-1/2 w-[100vw] h-[100vh] min-w-[177.77vh] min-h-[56.25vw] -translate-x-1/2 -translate-y-1/2 opacity-80"
        ></iframe>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-br from-[#1e1b4b]/80 via-[#4c1d95]/80 to-[#3b82f6]/80">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_20%_50%,rgba(255,107,107,0.3)_0%,transparent_60%),radial-gradient(ellipse_at_80%_20%,rgba(59,130,246,0.3)_0%,transparent_60%)]"></div>
      </div>
      
      {/* Content */}
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
        
        {(titleLine1 || titleGradient) && (
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white text-5xl md:text-[4.5rem] font-extrabold leading-[1.1] mb-8"
          >
            {titleLine1 && <>{titleLine1} <br /></>}
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
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/80 text-lg md:text-[1.25rem] leading-[1.8] max-w-[700px] mx-auto"
          >
            {description}
          </motion.p>
        )}
      </div>

      {/* Hero Wave */}
      <svg className="absolute bottom-[-2px] left-0 w-full h-[120px] md:h-[180px] z-[3]" viewBox="0 0 1440 180" preserveAspectRatio="none">
        <path d="M0,80 C240,160 480,0 720,80 C960,160 1200,0 1440,80 L1440,180 L0,180 Z" fill="#FAFAFA"/>
      </svg>
    </section>
  );
}
