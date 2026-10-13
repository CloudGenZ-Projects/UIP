import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { apiService } from '../../api/apiService';

const cardBorderStyle = {
  backgroundOrigin: 'border-box',
  backgroundClip: 'padding-box, border-box',
  backgroundImage: 'linear-gradient(#fff, #fff), linear-gradient(135deg, #FF6B6B, #A855F7, #3B82F6)',
};

export default function YouthProgramForm() {
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const interestsArray = formData.getAll('interests_checkbox');

    const payload = {
      name: formData.get('name'),
      pronouns: formData.get('pronouns'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      age_group: formData.get('age_group'),
      newcomer_status: formData.get('newcomer_status'),
      interests: interestsArray.join(', '),
      access_needs: formData.get('access_needs'),
      allergies: formData.get('allergies'),
      emergency_contact: formData.get('emergency_contact'),
      photo_consent: formData.get('photo_consent'),
      
      formId: 'uip-contact'
    };

    try {
      await apiService.submitYouthProgram(payload);
      await fetch(`https://formsubmit.cloudgenz.com/submit/${payload.formId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      setShowPopup(true);
      e.target.reset();
    } catch (error) {
      alert('Oops! We had trouble submitting your form. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans overflow-x-hidden m-0 p-0 flex flex-col">
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-[100px] pb-[160px] px-6 m-0 border-none">
        <div className="absolute inset-0 top-0 z-0 bg-gradient-to-br from-[#1e1b4b] via-[#4c1d95] to-[#3b82f6]">
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_20%_50%,rgba(255,107,107,0.3)_0%,transparent_60%),radial-gradient(ellipse_at_80%_20%,rgba(59,130,246,0.3)_0%,transparent_60%)]"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-[1000px]">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="text-white text-4xl md:text-6xl font-black leading-tight mb-6"
          >
            Youth & Newcomer <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF6B6B] via-[#A855F7] to-[#3B82F6]">Programs</span>
          </motion.h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Welcome to a warm, uplifting space built just for you! Connect with other young LGBTQ+ newcomers, get creative, learn something new, and find your chosen family here. 🌻
          </p>
        </div>

        <svg className="absolute bottom-[-2px] left-0 w-full h-[100px] md:h-[150px] z-[3]" viewBox="0 0 1440 180" preserveAspectRatio="none">
          <path d="M0,80 C240,160 480,0 720,80 C960,160 1200,0 1440,80 L1440,180 L0,180 Z" fill="#f8fafc"/>
        </svg>
      </section>

      <div className="max-w-[1200px] mx-auto px-6 -mt-24 pb-24 relative z-10 w-full">
        <div className="grid lg:grid-cols-3 gap-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            style={cardBorderStyle}
            className="lg:col-span-2 bg-white rounded-[3rem] p-8 md:p-14 border-2 border-transparent shadow-2xl"
          >
            <form className="space-y-16" onSubmit={handleSubmit}>
              
              <section className="space-y-8">
                <div className="flex items-center gap-5">
                  <span className="w-12 h-12 rounded-2xl bg-[#FF6B6B]/10 text-[#FF6B6B] flex items-center justify-center font-black text-xl shadow-sm">1</span>
                  <h2 className="text-2xl font-black text-slate-900 italic">Let's Get to Know You</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">What should we call you? *</label>
                    <input type="text" name="name" required className="w-full bg-slate-50 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#A855F7] outline-none font-bold" placeholder="Your chosen name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Pronouns</label>
                    <input type="text" name="pronouns" className="w-full bg-slate-50 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#A855F7] outline-none font-bold" placeholder="e.g., they/them, she/her" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Best Email *</label>
                    <input type="email" name="email" required className="w-full bg-slate-50 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#A855F7] outline-none font-bold" placeholder="Where we can reach you" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Age Group *</label>
                    <select name="age_group" required className="w-full bg-slate-50 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#A855F7] outline-none font-bold text-slate-600">
                      <option value="">Select your age range</option>
                      <option value="Under 18">Under 18</option>
                      <option value="18-24">18 - 24</option>
                      <option value="25-29">25 - 29</option>
                    </select>
                  </div>
                </div>
              </section>

              <section className="space-y-8">
                <div className="flex items-center gap-5">
                  <span className="w-12 h-12 rounded-2xl bg-[#A855F7]/10 text-[#A855F7] flex items-center justify-center font-black text-xl shadow-sm">2</span>
                  <h2 className="text-2xl font-black text-slate-900 italic">Your Story & Interests</h2>
                </div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Newcomer Journey</label>
                    <input type="text" name="newcomer_status" placeholder="e.g., Arrived recently, Refugee Claimant, International Student" className="w-full bg-slate-50 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#A855F7] outline-none font-bold" />
                  </div>
                  <div className="space-y-4">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 block ml-2">What sounds fun to you? (Check all you like)</label>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {[
                        '⛺ Summer Community Camp',
                        '🛋️ Safe Hangouts & Chill Time', 
                        '🌱 Life Skills & Self-care', 
                        '🤝 Peer Mentorship & Chats', 
                        '🎨 Art, Music & Expression'
                      ].map(interest => (
                        <label key={interest} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl cursor-pointer hover:bg-slate-100 transition-colors">
                          <input type="checkbox" name="interests_checkbox" value={interest} className="w-5 h-5 accent-[#A855F7]" /> 
                          <span className="text-sm font-bold text-slate-600">{interest}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              <section className="space-y-8">
                <div className="flex items-center gap-5">
                  <span className="w-12 h-12 rounded-2xl bg-[#3B82F6]/10 text-[#3B82F6] flex items-center justify-center font-black text-xl shadow-sm">3</span>
                  <h2 className="text-2xl font-black text-slate-900 italic">Taking Care of You</h2>
                </div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Who should we call in an emergency?</label>
                    <input type="text" name="emergency_contact" placeholder="Name & Phone Number of a trusted person" className="w-full bg-slate-50 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#A855F7] outline-none font-bold" />
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Food allergies or dietary needs?</label>
                      <textarea name="allergies" rows="2" placeholder="Let us know so we can feed you safely!" className="w-full bg-slate-50 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#A855F7] outline-none font-medium"></textarea>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Are you okay with photos?</label>
                      <select name="photo_consent" className="w-full bg-slate-50 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#A855F7] outline-none font-bold text-slate-600">
                        <option value="Yes">Yes, I love being in photos! 📸</option>
                        <option value="No">No photos for me, please 🛑</option>
                      </select>
                    </div>
                  </div>
                </div>
              </section>

              <button type="submit" disabled={loading} className="w-full py-5 bg-gradient-to-r from-[#FF6B6B] via-[#A855F7] to-[#3B82F6] text-white font-black text-xl rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all disabled:opacity-50">
                {loading ? 'Sending your details...' : 'Join the Community! ✨'}
              </button>
            </form>
          </motion.div>

          <div className="lg:col-span-1 space-y-8">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} style={cardBorderStyle} className="bg-white rounded-[2.5rem] p-8 shadow-xl sticky top-8">
              <h3 className="text-2xl font-black text-slate-900 mb-8 italic">What's Happening?</h3>
              <div className="space-y-10">
                
                {/* NEW SUMMER CAMP FEATURE */}
                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center text-2xl shadow-sm border border-yellow-200">⛺</div>
                  <div>
                    <h4 className="font-black text-sm mb-1 text-slate-800">Summer Community Camp</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">Starts July 17! A special program focused on building connections, expressing creativity, and finding a deep sense of belonging for LGBTQ+ newcomers.</p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-2xl shadow-sm border border-slate-100">🛋️</div>
                  <div>
                    <h4 className="font-black text-sm mb-1 text-slate-800">Safe Hangouts</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">A cozy, low-pressure environment where you can just be yourself and breathe.</p>
                  </div>
                </div>
                
                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-2xl shadow-sm border border-slate-100">🤝</div>
                  <div>
                    <h4 className="font-black text-sm mb-1 text-slate-800">Peer Mentorship</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">Chat with friendly folks who have walked similar paths and are here to support you.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      <AnimatePresence>
        {showPopup && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4">
            <motion.div className="bg-white rounded-[2rem] p-8 md:p-10 max-w-sm w-full text-center shadow-2xl">
              <div className="w-20 h-20 bg-gradient-to-br from-[#FF6B6B] to-[#A855F7] rounded-full flex items-center justify-center mx-auto mb-6 text-white text-4xl">🌻</div>
              <h3 className="text-2xl font-black text-slate-900 mb-3">Welcome Home!</h3>
              <p className="text-slate-500 mb-8 font-medium">We've got your info! We are so excited to have you join us and will be in touch really soon. 🎉</p>
              <button onClick={() => setShowPopup(false)} className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl">Awesome, thanks!</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}