import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { apiService } from '../../api/apiService';

const cardBorderStyle = {
  backgroundOrigin: 'border-box',
  backgroundClip: 'padding-box, border-box',
  backgroundImage: 'linear-gradient(#fff, #fff), linear-gradient(135deg, #FF6B6B, #A855F7, #3B82F6)',
};

export default function WellnessForm() {
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    
   
    const payload = {
      ...Object.fromEntries(formData.entries()),
      formId: 'uip-contact'
    };

    try {
      await apiService.submitWellness(payload);
      await fetch(`https://formsubmit.cloudgenz.com/submit/${payload.formId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      setShowPopup(true); // Trigger Popup
      e.target.reset();
    } catch (error) {
      console.error(error);
      alert('Failed to book session. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans overflow-x-hidden m-0 p-0 flex flex-col">
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-[120px] pb-[160px] px-6">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#1e1b4b] via-[#4c1d95] to-[#3b82f6]">
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_20%_50%,rgba(255,107,107,0.3)_0%,transparent_60%),radial-gradient(ellipse_at_80%_20%,rgba(59,130,246,0.3)_0%,transparent_60%)]"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-[900px]">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="text-white text-4xl md:text-6xl font-black leading-tight mb-6"
          >
            Book Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF6B6B] via-[#A855F7] to-[#3B82F6]">Wellness Session</span>
          </motion.h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Take the first step toward healing and community connection. Our sessions provide a safe, supportive space for LGBTQ+ newcomers.
          </p>
        </div>

        {/* Wave Divider */}
        <svg className="absolute bottom-[-2px] left-0 w-full h-[100px] md:h-[150px] z-[3]" viewBox="0 0 1440 180" preserveAspectRatio="none">
          <path d="M0,80 C240,160 480,0 720,80 C960,160 1200,0 1440,80 L1440,180 L0,180 Z" fill="#f8fafc"/>
        </svg>
      </section>

      {/* --- MAIN CONTENT --- */}
      <div className="max-w-[1200px] mx-auto px-6 -mt-24 pb-24 relative z-10 w-full">
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Main Form Area */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            style={cardBorderStyle}
            className="lg:col-span-2 bg-white rounded-[3rem] p-8 md:p-14 border-2 border-transparent shadow-2xl"
          >
            <form className="space-y-16" onSubmit={handleSubmit}>
              
              {/* Section 1: Personal Information */}
              <section className="space-y-8">
                <div className="flex items-center gap-5">
                  <span className="w-12 h-12 rounded-2xl bg-[#FF6B6B]/10 text-[#FF6B6B] flex items-center justify-center font-black text-xl shadow-sm">1</span>
                  <h2 className="text-2xl font-black text-slate-900 italic">Personal Information</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Full Name *</label>
                    <input type="text" name="name" placeholder="Enter your full name" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#A855F7] outline-none font-bold" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Pronouns</label>
                    <input type="text" name="pronouns" placeholder="e.g., she/her, they/them" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#A855F7] outline-none font-bold" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Email Address *</label>
                    <input type="email" name="email" placeholder="your@email.com" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#A855F7] outline-none font-bold" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Phone (optional)</label>
                    <input type="tel" name="phone" placeholder="For reminders" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#A855F7] outline-none font-bold" />
                  </div>
                </div>
              </section>

              {/* Section 2: Session Preferences */}
              <section className="space-y-8">
                <div className="flex items-center gap-5">
                  <span className="w-12 h-12 rounded-2xl bg-[#A855F7]/10 text-[#A855F7] flex items-center justify-center font-black text-xl shadow-sm">2</span>
                  <h2 className="text-2xl font-black text-slate-900 italic">Session Preferences</h2>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2 block mb-4">Type of Wellness Session *</label>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {['Group Support Circle', 'Individual Session', 'Mindfulness & Healing', 'Help me choose'].map(type => (
                        <label key={type} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 cursor-pointer hover:bg-slate-100 transition-all group">
                          <input type="radio" name="session_type" value={type} className="w-5 h-5 accent-[#A855F7]" required /> 
                          <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Preferred Date Range</label>
                      <select name="date_range" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#A855F7] outline-none font-bold text-slate-600">
                        <option value="Next 7 days">Next 7 days</option>
                        <option value="Next 14 days">Next 14 days</option>
                        <option value="Next month">Next month</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Time Preference</label>
                      <select name="time_pref" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#A855F7] outline-none font-bold text-slate-600">
                        <option value="Mornings">Mornings</option>
                        <option value="Afternoons">Afternoons</option>
                        <option value="Evenings">Evenings</option>
                        <option value="Weekends">Weekends</option>
                      </select>
                    </div>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-[2rem] space-y-4">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 block">First time with us?</label>
                    <div className="flex gap-8">
                      <label className="flex items-center gap-2 font-bold text-slate-600 cursor-pointer"><input type="radio" name="first_time" value="Yes" className="accent-[#A855F7]" /> Yes</label>
                      <label className="flex items-center gap-2 font-bold text-slate-600 cursor-pointer"><input type="radio" name="first_time" value="No" defaultChecked className="accent-[#A855F7]" /> No, first time</label>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 3: Goals & Needs */}
              <section className="space-y-8">
                <div className="flex items-center gap-5">
                  <span className="w-12 h-12 rounded-2xl bg-[#3B82F6]/10 text-[#3B82F6] flex items-center justify-center font-black text-xl shadow-sm">3</span>
                  <h2 className="text-2xl font-black text-slate-900 italic">Goals & Needs</h2>
                </div>
                <div className="space-y-8">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Current Challenges (optional)</label>
                    <textarea name="challenges" rows="3" placeholder="Share what you feel comfortable sharing..." className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#A855F7] outline-none resize-none font-medium"></textarea>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Specific Goals (optional)</label>
                    <textarea name="goals" rows="3" placeholder="What would you like to achieve?" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#A855F7] outline-none resize-none font-medium"></textarea>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Accessibility Needs</label>
                    <textarea name="access_needs" rows="2" placeholder="ASL, wheelchair access, quiet space, etc." className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#A855F7] outline-none resize-none font-medium"></textarea>
                  </div>
                </div>
              </section>

              {/* Section 4: Emergency Contact & Consent */}
              <section className="space-y-8">
                <div className="flex items-center gap-5">
                  <span className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-xl shadow-sm">4</span>
                  <h2 className="text-2xl font-black text-slate-900 italic">Emergency Contact & Consent</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Emergency Contact Name</label>
                    <input type="text" name="emergency_name" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#A855F7] outline-none font-bold" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Emergency Phone</label>
                    <input type="tel" name="emergency_phone" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#A855F7] outline-none font-bold" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Additional Notes</label>
                  <textarea name="notes" rows="2" placeholder="Any other questions?" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#A855F7] outline-none resize-none font-medium"></textarea>
                </div>

                <div className="space-y-4 p-8 bg-slate-900 rounded-[2.5rem] text-white">
                  <label className="flex items-start gap-5 cursor-pointer group">
                    <input type="checkbox" className="mt-1 w-6 h-6 accent-[#FF6B6B] shrink-0" required />
                    <div className="text-sm">
                      <strong className="text-[#FF6B6B] block mb-1 uppercase tracking-widest text-xs">Consent to Participate *</strong>
                      <p className="text-white/60">I understand wellness sessions are supportive and not a substitute for professional medical treatment.</p>
                    </div>
                  </label>
                  <label className="flex items-start gap-5 cursor-pointer group pt-4 border-t border-white/10">
                    <input type="checkbox" className="mt-1 w-6 h-6 accent-[#FF6B6B] shrink-0" required />
                    <div className="text-sm">
                      <strong className="text-[#FF6B6B] block mb-1 uppercase tracking-widest text-xs">Privacy Agreement *</strong>
                      <p className="text-white/60">I agree to maintain confidentiality about what is shared in sessions and protect the privacy of others.</p>
                    </div>
                  </label>
                </div>
              </section>

              <button type="submit" disabled={loading} className="w-full py-5 bg-gradient-to-r from-[#FF6B6B] via-[#A855F7] to-[#3B82F6] text-white font-black text-xl rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all disabled:opacity-50">
                {loading ? 'Booking Session...' : 'Book Wellness Session 💜'}
              </button>
            </form>
          </motion.div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              style={cardBorderStyle}
              className="bg-white rounded-[2.5rem] p-8 border-2 border-transparent shadow-xl"
            >
              <h3 className="text-2xl font-black text-slate-900 mb-6 italic">Our Sessions</h3>
              <div className="space-y-8">
                <SidebarItem icon="👥" title="Group Support" desc="Connect with others who share similar experiences. 90 min duration." />
                <SidebarItem icon="👤" title="Individual Wellness" desc="One-on-one sessions focused on your personal journey. 60 min duration." />
                <SidebarItem icon="🧘" title="Mindfulness" desc="Guided meditation and trauma-informed healing. 75 min duration." />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-[#1e1b4b] rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden"
            >
              <h3 className="text-xl font-black mb-6 text-[#FF6B6B] italic">What to Expect</h3>
              <div className="space-y-6 relative z-10">
                <ExpectItem title="Safe & Confidential" desc="Judgment-free environment where your privacy is our top priority." />
                <ExpectItem title="Trauma-Informed" desc="Facilitators trained in cultural competency for LGBTQ+ experiences." />
                <ExpectItem title="Community Focused" desc="Build real connections while working on personal growth." />
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#A855F7]/20 rounded-full blur-3xl"></div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* SUCCESS POPUP */}
      <AnimatePresence>
        {showPopup && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.9, opacity: 0, y: 20 }} 
              className="bg-white rounded-[2rem] p-8 md:p-10 max-w-sm w-full text-center shadow-2xl border border-slate-100"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-[#FF6B6B] to-[#A855F7] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-4xl text-white">💜</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-3">Booking Confirmed!</h3>
              <p className="text-slate-500 mb-8 font-medium leading-relaxed">
                Your wellness session has been successfully booked. We will reach out to you shortly with more details.
              </p>
              <button 
                onClick={() => setShowPopup(false)}
                className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl shadow-md hover:bg-slate-800 hover:shadow-xl transition-all"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SidebarItem({ icon, title, desc }) {
  return (
    <div className="group">
      <h4 className="font-black text-slate-900 mb-2 flex items-center gap-3">
        <span className="text-2xl">{icon}</span> {title}
      </h4>
      <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
    </div>
  );
}

function ExpectItem({ title, desc }) {
  return (
    <div className="space-y-1">
      <h4 className="font-bold text-white">{title}</h4>
      <p className="text-sm text-white/50">{desc}</p>
    </div>
  );
}