import React from 'react';
import { motion } from 'framer-motion';
import { getMediaUrl } from '../../services/api';

const ACCENTS = ['text-[#FF6B6B]', 'text-[#A855F7]', 'text-[#3B82F6]', 'text-emerald-500'];

const cardBorderStyle = {
  backgroundOrigin: 'border-box',
  backgroundClip: 'padding-box, border-box',
  backgroundImage: 'linear-gradient(#fff, #fff), linear-gradient(135deg, #FF6B6B22, #A855F722, #3B82F622)',
};

export default function CarePackContents({ data }) {
  if (!data) return null;

  const badge = data.contents_badge;
  const title = data.contents_title;
  const description = data.contents_description;
  const resolvedImg = getMediaUrl(data.contents_image);
  const categories = data.pack_categories || [];

  return (
    <section className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          {badge && (
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-[#FF6B6B] font-black text-xs uppercase tracking-[0.3em] mb-4 block"
            >
              {badge}
            </motion.span>
          )}
          {title && (
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-tight"
            >
              {title}
            </motion.h2>
          )}
          {description && (
            <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">
              {description}
            </p>
          )}
        </div>

        {/* Image Section */}
        {resolvedImg && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative max-w-5xl mx-auto mb-20"
          >
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#FF6B6B]/10 via-[#A855F7]/10 to-[#3B82F6]/10 rounded-[4rem] blur-3xl opacity-50"></div>
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-white">
              <img 
                src={resolvedImg} 
                alt="Care Pack Items" 
                className="w-full h-[300px] md:h-[500px] object-cover"
              />
            </div>
          </motion.div>
        )}

        {/* Grid Section */}
        {categories.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((category, idx) => {
              const accent = ACCENTS[idx % ACCENTS.length];
              const itemsList = typeof category.items_list === 'string'
                ? category.items_list.split(',').map(s => s.trim()).filter(Boolean)
                : (category.items || []);

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  style={cardBorderStyle}
                  className="bg-white p-8 md:p-10 rounded-[2.5rem] border-2 border-transparent shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-4xl p-3 bg-slate-50 rounded-2xl group-hover:scale-110 transition-transform">
                      {category.emoji || '🎁'}
                    </span>
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 leading-tight">
                        {category.title}
                      </h3>
                      <p className="text-slate-400 text-sm font-medium mt-1">
                        {category.desc}
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-3 mt-4 flex-grow">
                    {itemsList.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-center gap-3 text-slate-600 font-medium text-sm md:text-base">
                        <span className={`font-black text-lg ${accent}`}>✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
