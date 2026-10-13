import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getMediaUrl } from '../../services/api';

const contactCardStyle = {
  backgroundOrigin: 'border-box',
  backgroundClip: 'padding-box, border-box',
  backgroundImage: 'linear-gradient(#fff, #fff), linear-gradient(135deg, #FF6B6B, #A855F7, #3B82F6)',
};

export default function ResourceNavigationIntro({ data }) {
  if (!data) return null;

  const badge = data.intro_badge;
  const title = data.intro_title;
  const description = data.intro_description;
  const features = data.intro_features || [];
  const resolvedImg = getMediaUrl(data.intro_image);

  const cardTitle = data.intro_card_title;
  const cardDesc = data.intro_card_desc;
  const btn1Label = data.intro_card_btn_1_label;
  const btn1Link = data.intro_card_btn_1_link;
  const btn2Label = data.intro_card_btn_2_label;
  const btn2Link = data.intro_card_btn_2_link;

  const floatingTitle = data.intro_floating_badge_title;
  const floatingDesc = data.intro_floating_badge_desc;

  return (
    <section className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-20 items-center">
        
        {/* Left Content */}
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}>
          {badge && (
            <span className="inline-block py-1.5 px-4 rounded-full bg-blue-50 text-blue-600 text-xs font-black tracking-widest uppercase mb-6">
              {badge}
            </span>
          )}
          {title && (
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-slate-500 text-lg leading-relaxed mb-10">
              {description}
            </p>
          )}

          {features.length > 0 && (
            <div className="grid sm:grid-cols-2 gap-8 mb-12">
              {features.map((f, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600 font-bold shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">{f.title}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {(cardTitle || cardDesc) && (
            <div style={contactCardStyle} className="rounded-[2.5rem] p-8 md:p-10 border-2 border-transparent shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#FF6B6B] to-[#A855F7] flex items-center justify-center text-white text-2xl shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  {cardTitle && <h4 className="font-bold text-slate-900 text-xl">{cardTitle}</h4>}
                  {cardDesc && <p className="text-slate-500">{cardDesc}</p>}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                {btn1Label && (
                  <Link 
                    to={btn1Link || '/contact'}
                    className="flex-1 flex justify-center items-center bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-black transition-all"
                  >
                    {btn1Label}
                  </Link>
                )}
                {btn2Label && (
                  <Link 
                    to={btn2Link || '/support'}
                    className="flex-1 flex justify-center items-center border-2 border-[#A855F7] text-[#A855F7] px-8 py-4 rounded-2xl font-bold hover:bg-purple-50 transition-all"
                  >
                    {btn2Label}
                  </Link>
                )}
              </div>
            </div>
          )}
        </motion.div>

        {/* Right Image/Visual */}
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} className="relative">
          {resolvedImg && (
            <div className="rounded-[3rem] overflow-hidden shadow-2xl border-8 border-slate-50 relative z-10 group">
              <img 
                src={resolvedImg} 
                alt="Community support" 
                className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          )}

          {/* Floating Trusted Partners Box */}
          {(floatingTitle || floatingDesc) && (
            <div className="bg-white rounded-[2rem] p-8 shadow-2xl border border-slate-100 max-w-[280px] z-20 mt-6 md:mt-0 md:absolute md:-bottom-10 md:-left-10">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                {floatingTitle && <span className="font-black text-slate-900 text-lg">{floatingTitle}</span>}
              </div>
              {floatingDesc && (
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  {floatingDesc}
                </p>
              )}
            </div>
          )}
        </motion.div>

      </div>
    </section>
  );
}
