import React from 'react';
import { motion } from 'framer-motion';
import SliderWhoweare from './SliderWhoweare';
import { getMediaUrl } from '../services/api';

export default function About({ data }) {
  if (!data) return null;

  const badge = data.about_badge;
  const title = data.about_title;
  const description = data.about_description;
  const resolvedImg = getMediaUrl(data.about_image);
  const features = Array.isArray(data?.about_features) ? data.about_features : [];
  const ctaLabel = data.about_cta_label;
  const ctaLink = data.about_cta_link;

  return (
    <section id="about" className="py-[100px] px-6 overflow-hidden bg-[#FAFAFA]">
      <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-[64px] items-center">
        
        {/* Left Side: Image */}
        {resolvedImg && (
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} className="relative">
            <div className="aspect-square rounded-[30%_70%_70%_30%/30%_30%_70%_70%] overflow-hidden relative z-[2]">
              <img 
                src={resolvedImg} 
                alt={title || "About"} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute top-[-20px] right-[-20px] w-[80%] h-[80%] rounded-[70%_30%_30%_70%/70%_70%_30%_30%] bg-purple-500/10 z-[1]"></div>
          </motion.div>
        )}

        {/* Right Side: Text */}
        <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }}>
          {badge && <p className="text-[#FF6B6B] font-bold tracking-[2px] uppercase text-sm mb-2">{badge}</p>}
          {title && <h2 className="text-[2.5rem] font-extrabold leading-tight mb-4">{title}</h2>}
          {description && (
            <p className="text-slate-500 text-[1.05rem] leading-[1.8] mb-8">
              {description}
            </p>
          )}
          {features && features.length > 0 && (
            <div className="flex flex-col gap-5 mb-8">
              {features.map((f, i) => (
                <div key={i} className="flex gap-4 items-start">
                  {f.icon && <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-xl shrink-0">{f.icon}</div>}
                  <div>
                    <strong className="block text-slate-800">{f.title}</strong>
                    {f.description && <p className="text-slate-400 text-sm">{f.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
          {ctaLabel && (
            <a href={ctaLink || '#'} className="px-8 py-3.5 bg-gradient-to-r from-[#FF6B6B] to-[#A855F7] text-white rounded-full font-bold shadow-lg">
              {ctaLabel}
            </a>
          )}
        </motion.div>
        
      </div>
      <SliderWhoweare images={data.about_gallery_images} />
    </section>
  );
}
