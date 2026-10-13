import React from 'react';
import { motion } from 'framer-motion';

export default function CommunityStories({ data }) {
  if (!data) return null;

  const heading = data.community_voices_title;
  const subheading = data.community_voices_subtitle;

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-12 md:mb-16">
          {heading && <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">{heading}</h2>}
          {subheading && <p className="text-slate-500 text-lg">{subheading}</p>}
        </div>

        {/* Video Embed Wrapper */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto rounded-[2rem] overflow-hidden shadow-2xl border-[8px] border-slate-50 relative aspect-video bg-slate-100"
        >
          <iframe 
            className="absolute top-0 left-0 w-full h-full"
            src="https://embed.jasperplayer.com/?brand=CTV_NEWS&destination=ctvnews_web&language=EN&contentId=3191690" 
            frameBorder="0"
            scrolling="no"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
}
