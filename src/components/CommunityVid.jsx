import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

// Videos are local in frontend (no video in CMS)
const YOUTUBE_VIDEOS = [
  { id: 'fadY9BXl79o', title: 'Community Voice 1' },
  { id: 'd58Gft_Ioa0', title: 'Community Voice 2' },
  { id: 'RSvC4Ps-u1Y', title: 'Community Voice 3' },
];

export default function CommunityStories({ data }) {
  const scrollRef = useRef(null);
  const [activeVideo, setActiveVideo] = useState(null);

  // Text content from CMS
  const heading = data?.community_vid_title;
  const subheading = data?.community_vid_subtitle;

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth < 768 ? window.innerWidth * 0.85 : 560;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-24 w-full bg-white relative overflow-hidden">
      
      {/* Header Section from CMS */}
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          {heading && <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">{heading}</h2>}
          {subheading && <p className="text-slate-500 text-lg">{subheading}</p>}
        </div>
      </div>

      <div className="relative w-full">
        {/* Navigation Arrows */}
        <button 
          onClick={() => scroll('left')} 
          aria-label="Scroll left"
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 bg-white/90 hover:bg-white text-slate-800 rounded-full flex items-center justify-center shadow-xl backdrop-blur-md transition-all hover:scale-110 active:scale-95 border border-slate-100"
        >
          <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button 
          onClick={() => scroll('right')} 
          aria-label="Scroll right"
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 bg-white/90 hover:bg-white text-slate-800 rounded-full flex items-center justify-center shadow-xl backdrop-blur-md transition-all hover:scale-110 active:scale-95 border border-slate-100"
        >
          <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Video Cards Scroll Area */}
        <div 
          ref={scrollRef}
          className="flex gap-6 md:gap-8 overflow-x-auto hide-scroll px-6 md:px-16 py-4 scroll-smooth snap-x snap-mandatory"
        >
          {YOUTUBE_VIDEOS.map((video) => (
            <motion.div
              key={video.id}
              className="flex-shrink-0 w-[85vw] max-w-[400px] md:max-w-[560px] aspect-video bg-slate-900 rounded-[2rem] overflow-hidden shadow-xl relative group snap-center"
            >
              {activeVideo === video.id ? (
                <iframe 
                  className="absolute top-0 left-0 w-full h-full rounded-[1.5rem]"
                  src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1&controls=1`} 
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              ) : (
                <div 
                  className="absolute inset-0 w-full h-full cursor-pointer flex items-center justify-center"
                  onClick={() => setActiveVideo(video.id)}
                >
                  <img 
                    src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`} 
                    alt={video.title}
                    className="absolute inset-0 w-full h-full object-cover rounded-[1.5rem]"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 rounded-[1.5rem]"></div>
                  <div className="relative z-10 w-16 h-16 md:w-20 md:h-20 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.3)] group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 md:w-10 md:h-10 text-[#A855F7] ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              )}
              
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-[2rem] transition-colors duration-300 pointer-events-none z-20"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
