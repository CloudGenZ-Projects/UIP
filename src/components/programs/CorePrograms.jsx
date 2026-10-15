import React from 'react';
import { Link } from 'react-router-dom';

const COLOR_THEMES = [
  { bg: 'bg-indigo-50/60', accent: 'text-indigo-600' },
  { bg: 'bg-rose-50/60', accent: 'text-rose-600' },
  { bg: 'bg-teal-50/60', accent: 'text-teal-600' },
  { bg: 'bg-amber-50/60', accent: 'text-amber-600' },
  { bg: 'bg-emerald-50/60', accent: 'text-emerald-600' }
];

export default function CorePrograms({ programs }) {
  if (!programs || programs.length === 0) return null;

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Main Grid: Side-by-Side on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {programs.map((program, idx) => {
            const theme = COLOR_THEMES[idx % COLOR_THEMES.length];
            return (
              <div 
                key={program.id || program.programId || idx} 
                className={`p-10 md:p-12 rounded-[3rem] ${theme.bg} border border-transparent hover:border-slate-100 transition-all shadow-sm flex flex-col`}
              >
                {/* Header: Emoji & Badge */}
                <div className="flex items-center justify-between mb-8">
                  <span className="text-5xl">{program.emoji || '💬'}</span>
                  {program.schedule && (
                    <span className="bg-white px-4 py-1.5 rounded-full font-black text-[0.6rem] text-slate-900 uppercase tracking-[0.2em] shadow-sm">
                      {program.schedule}
                    </span>
                  )}
                </div>

                {/* Title & Description */}
                <div className="mb-8">
                  <h3 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight italic mb-4">
                    {program.title}
                  </h3>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    {program.desc}
                  </p>
                </div>
                
                {/* Features List */}
                {program.features && program.features.length > 0 && (
                  <div className="space-y-6 flex-grow mb-10">
                    <h4 className="font-black text-slate-400 uppercase text-[0.65rem] tracking-[0.25em] mb-4">Key Features:</h4>
                    {program.features.map((feature, i) => (
                      <div key={i} className="flex gap-4">
                        <span className={`w-10 h-10 rounded-2xl bg-white ${theme.accent} flex items-center justify-center shadow-sm shrink-0`}>
                          <svg className="w-5 h-5" viewBox="0 0 14 14" fill="none">
                            <path d="M2 7l3.5 3.5L12 3" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                        <div>
                          <h4 className="font-black text-slate-800 uppercase text-[0.7rem] tracking-widest mb-0.5">{feature.title}</h4>
                          <p className="text-slate-500 text-sm leading-snug">{feature.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Action Button */}
                <div className="pt-6 border-t border-black/5">
                  <Link to={program.link || '/programs'} className="w-full text-center inline-block px-10 py-4 bg-gradient-to-r from-[#FF6B6B] via-[#A855F7] to-[#3B82F6] text-white rounded-2xl font-black text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
                    {program.btnText || 'Learn More'}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
