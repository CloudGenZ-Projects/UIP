import React from 'react';
import { motion } from 'framer-motion';

export default function AboutWhyAndValues({ data }) {
  if (!data) return null;

  const whyTitle = data.why_title;
  const whyItems = data.why_items || [];
  const whyQuote = data.why_quote;

  const card1Title = data.card_1_title;
  const card1Sub = data.card_1_subtitle;
  const card1Desc = data.card_1_description;

  const card2Title = data.card_2_title;
  const card2Sub = data.card_2_subtitle;
  const card2Desc = data.card_2_description;

  const valuesTitle = data.values_title;
  const valuesSub = data.values_subtitle;
  const values = data.values || [];

  return (
    <section className="py-24 px-6 bg-[#1e1b4b] text-white relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto relative z-10">
        
        {/* Our Why Header Section */}
        <div className="text-center mb-16">
          {whyTitle && <h2 className="text-4xl md:text-5xl font-extrabold mb-8">{whyTitle}</h2>}
          <div className="text-white/70 max-w-3xl mx-auto text-lg leading-relaxed space-y-5">
            {whyItems.map((item, i) => (
              <p key={i}>
                {item.highlight && <strong className="text-white font-bold">{item.highlight} </strong>}
                {item.text}
              </p>
            ))}
            {whyQuote && (
              <p className="text-2xl text-white font-semibold pt-4 leading-snug">
                {whyQuote}
              </p>
            )}
          </div>
        </div>

        {/* Leadership & Growth Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {(card1Title || card1Desc) && (
            <motion.div 
              whileHover={{ y: -10 }}
              className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-sm flex flex-col justify-center"
            >
              {card1Title && <h3 className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#FF6B6B] to-[#A855F7] mb-4">{card1Title}</h3>}
              {card1Sub && <p className="text-2xl font-bold mb-3">{card1Sub}</p>}
              {card1Desc && <p className="text-white/70 leading-relaxed text-lg">{card1Desc}</p>}
            </motion.div>
          )}

          {(card2Title || card2Desc) && (
            <motion.div 
              whileHover={{ y: -10 }}
              className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-sm flex flex-col justify-center"
            >
              {card2Title && <h3 className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#A855F7] to-[#3B82F6] mb-4">{card2Title}</h3>}
              {card2Sub && <p className="text-2xl font-bold mb-3">{card2Sub}</p>}
              {card2Desc && <p className="text-white/70 leading-relaxed text-lg">{card2Desc}</p>}
            </motion.div>
          )}
        </div>

        {/* Values Header */}
        <div className="text-center mb-10">
          {valuesTitle && <h2 className="text-3xl md:text-4xl font-extrabold mb-4">{valuesTitle}</h2>}
          {valuesSub && <p className="text-white/60 text-lg">{valuesSub}</p>}
        </div>

        {/* Values Grid */}
        {values.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={i} className="bg-white p-8 rounded-[2rem] text-slate-900 shadow-xl flex flex-col h-full border-t-4 border-[#A855F7]">
                <h4 className="font-bold text-xl mb-3">{v.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Wave bottom decoration */}
      <svg className="absolute bottom-0 left-0 w-full h-[60px]" viewBox="0 0 1440 60" preserveAspectRatio="none">
        <path d="M0,30 Q360,60 720,30 T1440,30 L1440,60 L0,60 Z" fill="#FAFAFA"/>
      </svg>
    </section>
  );
}
