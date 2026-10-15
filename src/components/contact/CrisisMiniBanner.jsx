import React from 'react';

export default function CrisisMiniBanner({ data }) {
  const items = data?.crisisItems || [
    { label: 'Emergency Services', val: '911', desc: 'Immediate Danger' },
    { label: 'Talk Suicide Canada', val: '1-833-456-4566', desc: 'Call Anytime 24/7' },
    { label: 'LGBT National Hotline', val: '1-866-585-0445', desc: 'Peer Support' },
    { label: 'Crisis Text Line', val: 'HOME to 741741', desc: 'Text Support' }
  ];

  return (
    <section className="py-20 px-6 bg-[#FFFFFF] overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-16 items-center relative z-10">
        
        {/* Left Content */}
        <div className="lg:max-w-md text-center lg:text-left shrink-0">
          <div className="inline-flex items-center gap-3 bg-red-50 text-red-600 px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-red-200 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.5)]"></span>
            {data?.crisisBadge || 'Immediate Crisis Support'}
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-slate-900">
            {data?.crisisHeading || 'Need Help Right Away?'}
          </h2>
          <p className="text-slate-600 font-medium leading-relaxed text-lg">
            {data?.crisisDescription || "If you're in immediate danger or having thoughts of self-harm, please reach out. You are not alone. These services are free, confidential, and available 24/7."}
          </p>
        </div>

        {/* Right Content - Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
          {items.map((item, i) => (
            <div key={i} className="bg-white border border-slate-200 p-7 rounded-[2rem] hover:border-red-200 hover:bg-red-50/50 transition-all group shadow-sm hover:shadow-md">
              <h4 className="text-slate-400 text-[0.75rem] font-black uppercase tracking-[0.2em] mb-2 group-hover:text-red-500 transition-colors">
                {item.label}
              </h4>
              <div className="text-2xl md:text-3xl font-black text-slate-900 mb-2 tracking-tight">
                {item.val}
              </div>
              <p className="text-sm text-slate-500 font-semibold">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
