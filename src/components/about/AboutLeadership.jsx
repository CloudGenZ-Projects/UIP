import React from 'react';
import { motion } from 'framer-motion';
import { getMediaUrl } from '../../services/api';

export default function AboutLeadership({ data }) {
  if (!data) return null;

  const resolvedImg = getMediaUrl(data.leadership_image);
  const captionName = data.leadership_image_caption_name;
  const captionRole = data.leadership_image_caption_role;
  const title = data.leadership_title;
  const p1 = data.leadership_paragraph_1;
  const p2 = data.leadership_paragraph_2;
  const quote = data.leadership_quote;
  const author = data.leadership_quote_author;

  return (
    <section className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Image Side */}
          {resolvedImg && (
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              whileInView={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#FF6B6B] to-[#A855F7] rounded-[3rem] blur-2xl opacity-10"></div>
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-[12px] border-white">
                <img src={resolvedImg} alt={captionName || "Leadership"} className="w-full h-auto" />
                {(captionName || captionRole) && (
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent text-white">
                    {captionName && <p className="text-2xl font-bold">{captionName}</p>}
                    {captionRole && <p className="text-white/70">{captionRole}</p>}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Text Side */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {title && <h2 className="text-4xl font-extrabold text-slate-900 leading-tight">{title}</h2>}
            <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
              {p1 && <p>{p1}</p>}
              {p2 && <p>{p2}</p>}
              {quote && (
                <div className="p-8 rounded-[2rem] bg-slate-50 border-l-8 border-[#A855F7] shadow-sm italic font-medium">
                  "{quote}"
                </div>
              )}
              {author && <p className="font-semibold text-[#A855F7]">{author}</p>}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
