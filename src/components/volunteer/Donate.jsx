import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Donate({ data }) {
  const [isMonthly, setIsMonthly] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState('');

  const handleCustomChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^[0-9\b]+$/.test(value)) {
      setCustomAmount(value);
      setSelectedAmount(value === '' ? 0 : parseInt(value));
    }
  };

  const currentAmt = customAmount || selectedAmount;
  const tiers = data?.impactTiers || [
    { amount: 25, displayAmount: '$25', desc: 'One wellness circle session for a newcomer' },
    { amount: 50, displayAmount: '$50', desc: 'Essential workshop materials and legal resources' },
    { amount: 100, displayAmount: '$100', desc: 'Community dinner and networking for 20 people' },
    { amount: 250, displayAmount: '$250', desc: 'Monthly transportation support for participants' }
  ];

  return (
    <section className="py-24 px-6 bg-[#f8fafc]">
      <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-16 items-start">
        
        {/* Left: Donation Card */}
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} className="bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-100">
          <div className="flex bg-slate-100 p-1.5 rounded-full mb-10">
            <button onClick={() => setIsMonthly(false)} className={`flex-1 py-3 rounded-full font-bold text-sm transition-all ${!isMonthly ? 'bg-white text-slate-900 shadow-md' : 'text-slate-400'}`}>One-Time</button>
            <button onClick={() => setIsMonthly(true)} className={`flex-1 py-3 rounded-full font-bold text-sm transition-all ${isMonthly ? 'bg-white text-slate-900 shadow-md' : 'text-slate-400'}`}>Monthly</button>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            {[25, 50, 100, 250, 500, 1000].map(amt => (
              <button key={amt} onClick={() => {setSelectedAmount(amt); setCustomAmount('')}} className={`py-4 rounded-2xl border-2 font-black transition-all ${selectedAmount === amt && !customAmount ? 'border-[#A855F7] bg-purple-50 text-[#A855F7]' : 'border-slate-100 text-slate-400'}`}>${amt}</button>
            ))}
          </div>

          <div className="relative mb-10">
            <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-slate-400">$</span>
            <input type="text" placeholder="Custom Amount" value={customAmount} onChange={handleCustomChange} className="w-full pl-12 pr-6 py-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-900 focus:ring-2 focus:ring-[#A855F7] outline-none" />
          </div>

          <a 
            href={data?.zeffyDonationUrl || "https://www.zeffy.com/en-CA/donation-form/youre-not-alone"}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center w-full py-5 bg-gradient-to-r from-[#FF6B6B] via-[#A855F7] to-[#3B82F6] text-white rounded-[1.5rem] font-black text-xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all mb-4"
          >
            Give ${currentAmt || 0}{isMonthly ? '/mo' : ''} 💜
          </a>
          
          <p className="text-center text-[0.7rem] text-slate-400 font-bold uppercase tracking-[0.2em]">{data?.taxDeductibleNote || 'Secure Tax-Deductible Donation'}</p>
        </motion.div>

        {/* Right: Impact */}
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} className="bg-[#1e1b4b] p-12 rounded-[3rem] text-white relative overflow-hidden">
          <h2 className="text-3xl font-black mb-10">{data?.impactHeading || 'Your Impact'}</h2>
          <div className="space-y-8 relative z-10">
            {tiers.map((tier, i) => (
              <ImpactItem key={i} amt={tier.displayAmount || `$${tier.amount}`} desc={tier.desc} active={currentAmt >= (tier.amount || 0)} />
            ))}
          </div>
          {data?.impactQuote && (
            <div className="mt-12 pt-10 border-t border-white/10 italic text-white/50 text-sm">
              {data.impactQuote}
            </div>
          )}
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px]"></div>
        </motion.div>
      </div>
    </section>
  );
}

function ImpactItem({ amt, desc, active }) {
  return (
    <div className={`flex items-center gap-6 transition-all duration-500 ${active ? 'opacity-100 scale-105' : 'opacity-40'}`}>
      <span className="text-2xl font-black text-[#FF6B6B] shrink-0 w-20">{amt}</span>
      <p className="font-bold text-slate-200">{desc}</p>
    </div>
  );
}
