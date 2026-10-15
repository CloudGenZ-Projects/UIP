import React from 'react';
import { motion } from 'framer-motion';

const STEP_COLORS = [
  'from-[#FF6B6B] to-[#FF8E8E]',
  'from-[#A855F7] to-[#D397F8]',
  'from-[#3B82F6] to-[#82B1FF]'
];

export default function JourneySteps({ heading, subtitle, steps }) {
  if (!steps || steps.length === 0) return null;

  return (
    <section className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 italic">{heading || 'Ready to Begin Your Journey?'}</h2>
          {subtitle && <p className="text-slate-500 text-lg">{subtitle}</p>}
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          <div className="hidden md:block absolute top-[60px] left-20 right-20 h-1 bg-slate-50 -z-10" />

          {steps.map((step, idx) => {
            const color = STEP_COLORS[idx % STEP_COLORS.length];
            return (
              <motion.div 
                key={step.num || idx} 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.2 }}
                className="relative flex flex-col items-center text-center group"
              >
                <div className={`w-28 h-28 rounded-full bg-gradient-to-br ${color} border-[8px] border-white flex items-center justify-center font-black text-4xl text-white shadow-2xl mb-8 group-hover:scale-110 transition-transform duration-300`}>
                  {step.num}
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4">{step.title}</h3>
                <p className="text-slate-500 leading-relaxed mb-6 flex-1">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
