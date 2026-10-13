import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Donate({ data }) {
  const [freq, setFreq] = useState('once');
  const [amt, setAmt] = useState(50);

  if (!data) return null;

  const badge = data.donate_badge;
  const title = data.donate_title;
  const description = data.donate_description;
  const impactItems = data.donate_impact_items || [];
  const ctaLabel = data.donate_cta_label;
  const ctaLink = data.donate_cta_link || '/donate';

  return (
    <section id="donate" className="relative bg-[#1e1b4b] py-[120px] px-6">
      <svg className="absolute top-[-2px] left-0 w-full h-[120px]" viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,40 1440,60 L1440,0 L0,0 Z" fill="#FAFAFA"/>
      </svg>

      <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-12 items-start">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}>
          {badge && <p className="text-[#FF6B6B] font-bold tracking-widest uppercase text-sm mb-2">{badge}</p>}
          {title && <h2 className="text-white text-[2.5rem] font-extrabold mb-4">{title}</h2>}
          {description && <p className="text-white/80 mb-8 leading-relaxed">{description}</p>}
          {impactItems && impactItems.length > 0 && (
            <div className="flex flex-col gap-4">
              {impactItems.map((imp, i) => (
                <div key={i} className="flex items-center gap-5 p-5 bg-white/5 rounded-2xl border-l-[3px] border-[#A855F7] backdrop-blur-md">
                  <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#FF6B6B] to-[#A855F7] shrink-0">{imp.amount}</span>
                  <p className="text-white/70 text-sm">{imp.description}</p>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} className="bg-white rounded-[24px] p-8 shadow-2xl">
          <h3 className="text-center text-xl font-bold mb-6">Make Your Gift</h3>
         
          <div className="flex bg-slate-100 p-1 rounded-full mb-5">
            {['once', 'monthly'].map(f => (
              <button key={f} onClick={() => setFreq(f)} className={`flex-1 py-2 rounded-full font-bold text-sm transition-all ${freq === f ? 'bg-gradient-to-r from-[#FF6B6B] to-[#A855F7] text-white shadow-md' : 'text-slate-500'}`}>
                {f === 'once' ? 'One-Time' : 'Monthly'}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-4 gap-3 mb-5">
            {[25, 50, 100, 250].map(val => (
              <button key={val} onClick={() => setAmt(val)} className={`py-3 rounded-xl border-2 font-black transition-all ${amt === val ? 'border-[#A855F7] bg-purple-50 text-[#A855F7]' : 'border-slate-100 hover:border-slate-300'}`}>${val}</button>
            ))}
          </div>

          {ctaLabel && (
            <Link 
              to={ctaLink} 
              className="flex items-center justify-center w-full py-4 bg-gradient-to-r from-[#FF6B6B] via-[#A855F7] to-[#3B82F6] text-white rounded-2xl font-bold shadow-lg shadow-purple-500/20 mb-4 transform hover:scale-[1.02] hover:shadow-purple-500/30 hover:shadow-xl active:scale-[0.98] transition-all duration-300 tracking-wide text-base"
            >
              {ctaLabel} 💜
            </Link>
          )}

          <p className="text-center text-xs text-slate-400">Secure payment • Tax-deductible</p>
        </motion.div>
      </div>
    </section>
  );
}
