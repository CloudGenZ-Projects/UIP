import React from 'react';

export default function ImpactStats({ stats }) {
  if (!stats || stats.length === 0) return null;

  return (
    <section className="py-24 px-6 bg-[#1E1B4B] text-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#A855F7] mb-2">
                {s.val}
              </div>
              <div className="font-bold text-lg mb-1">{s.label}</div>
              <div className="text-white/50 text-sm">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
