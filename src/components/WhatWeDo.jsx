import React from 'react';
import { motion } from 'framer-motion';

export default function WhatWeDo({ data }) {
  const badge = data?.what_we_do_badge;
  const title = data?.what_we_do_title;
  const services = data?.services || [];

  if (!services || services.length === 0) return null;

  return (
    <section className="py-[100px] px-6 bg-white">
      <div className="max-w-[1200px] mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          {badge && <p className="text-[#A855F7] font-bold tracking-[2px] uppercase text-sm mb-2">{badge}</p>}
          {title && <h2 className="text-[2.5rem] font-extrabold leading-tight mb-12 text-slate-800">{title}</h2>}
        </motion.div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-2xl bg-[#FAFAFA] border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center"
            >
              {item.icon && (
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-[#FF6B6B]/20 to-[#A855F7]/20 flex items-center justify-center text-3xl mb-6 shadow-sm">
                  {item.icon}
                </div>
              )}
              <h3 className="text-xl font-bold text-slate-800 mb-3">{item.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
