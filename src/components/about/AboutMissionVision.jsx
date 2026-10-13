import React from 'react';
import { motion } from 'framer-motion';

const borderStyle = {
  backgroundOrigin: 'border-box',
  backgroundClip: 'padding-box, border-box',
  backgroundImage: 'linear-gradient(#fff, #fff), linear-gradient(90deg, #FF6B6B, #A855F7, #3B82F6)',
};

export default function AboutMissionVision({ data }) {
  if (!data) return null;

  const missionBadge = data.mission_badge;
  const missionTitle = data.mission_title;
  const missionDesc = data.mission_description;
  const pillars = data.mission_pillars || [];

  const visionTitle = data.vision_title;
  const visionDesc = data.vision_description;
  const visionTags = data.vision_tags || [];

  return (
    <section className="py-24 px-6 bg-[#FAFAFA]">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}>
            {missionBadge && (
              <span className="text-[#FF6B6B] font-bold tracking-widest uppercase text-sm mb-3 block">
                {missionBadge}
              </span>
            )}
            {missionTitle && (
              <h2 className="text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
                {missionTitle}
              </h2>
            )}
            {missionDesc && (
              <p className="text-xl text-slate-600 leading-relaxed font-medium">
                {missionDesc}
              </p>
            )}
          </motion.div>
          
          {pillars.length > 0 && (
            <div className="grid sm:grid-cols-2 gap-6">
              {pillars.map((p, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  style={borderStyle}
                  className="bg-white p-7 rounded-[24px] border-2 border-transparent shadow-sm hover:shadow-md transition-all flex flex-col justify-center"
                >
                  <h3 className="font-bold text-slate-800 text-lg mb-2">{p.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Vision Block */}
        {(visionTitle || visionDesc) && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mt-24 p-12 rounded-[3rem] bg-gradient-to-br from-[#1e1b4b] to-[#4c1d95] text-white text-center shadow-xl relative overflow-hidden"
          >
            <div className="relative z-10 max-w-3xl mx-auto">
              {visionTitle && <h2 className="text-4xl font-extrabold mb-6">{visionTitle}</h2>}
              {visionDesc && <p className="text-xl text-white/80 leading-relaxed mb-8">{visionDesc}</p>}
              {visionTags.length > 0 && (
                <div className="flex flex-wrap justify-center gap-4">
                  {visionTags.map((v, i) => (
                    <span key={i} className="px-6 py-2 bg-white/10 rounded-full border border-white/20 text-sm font-bold">
                      {v.tag || v}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#A855F7]/10 rounded-full blur-3xl"></div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
