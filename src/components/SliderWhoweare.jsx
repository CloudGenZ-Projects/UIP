import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { getMediaUrl } from '../services/api';

export default function CommunityGallery({ images }) {
  const scrollRef = useRef(null);

  const activeGalleryImages = images && images.length > 0
    ? images.map((item) => getMediaUrl(item?.image || item)).filter(Boolean)
    : [];

  if (!activeGalleryImages || activeGalleryImages.length === 0) return null;

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth < 768 ? window.innerWidth * 0.8 : 380;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="py-8 w-full overflow-hidden relative">
      <style>{`
        .hide-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Navigation Buttons */}
      <button 
        onClick={() => scroll('left')}
        aria-label="Scroll Left"
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/80 hover:bg-white text-slate-800 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm transition-all hover:scale-105 active:scale-95 border border-slate-100"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button 
        onClick={() => scroll('right')}
        aria-label="Scroll Right"
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/80 hover:bg-white text-slate-800 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm transition-all hover:scale-105 active:scale-95 border border-slate-100"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Sliding Images Track */}
      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto hide-scroll px-6 py-4 scroll-smooth snap-x snap-mandatory"
      >
        {activeGalleryImages.map((imgSrc, index) => (
          <motion.div
            key={index}
            className="flex-shrink-0 w-[280px] sm:w-[340px] md:w-[380px] aspect-[4/3] rounded-3xl overflow-hidden shadow-md group relative snap-start border border-slate-100"
          >
            <img 
              src={imgSrc} 
              alt={`Gallery ${index + 1}`} 
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
