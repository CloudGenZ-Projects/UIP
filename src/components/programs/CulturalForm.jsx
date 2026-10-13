import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { apiService } from '../../api/apiService';

const cardBorderStyle = {
  backgroundOrigin: 'border-box',
  backgroundClip: 'padding-box, border-box',
  backgroundImage: 'linear-gradient(#fff, #fff), linear-gradient(135deg, #FF6B6B, #A855F7, #3B82F6)',
};

export default function CulturalForm() {
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
      interests: interestsArray.join(', '),
      age_group: formData.get('age_group'),
      country: formData.get('country'),
      background: formData.get('background'),
      dietary: formData.get('dietary'),
      access_needs: formData.get('access_needs'),
      emergency_name: formData.get('emergency_name'),
      emergency_phone: formData.get('emergency_phone'),
      volunteering: formData.get('volunteering') === 'on',
      photo_consent: formData.get('photo_consent'),
      comments: formData.get('comments'),
      formId: 'uip-contact'
    };

    try {
      await apiService.submitCultural(payload);
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
      console.error(error);
      alert('Oh no! Something went wrong. Please check your connection and try again.');
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

        <div className="relative z-10 text-center max-w-[1000px]">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white text-4xl md:text-6xl font-black leading-tight mb-6"
          >
            Come Celebrate <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF6B6B] via-[#A855F7] to-[#3B82F6]">With Us!</span>
          </motion.h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Experience the beautiful richness of our community through joyful gatherings. Honor your diverse roots, share stories, and build lifelong friendships in a space made for you. 🌺
          </p>
        </div>

        <svg className="absolute bottom-[-2px] left-0 w-full h-[100px] md:h-[150px] z-[3]" viewBox="0 0 1440 180" preserveAspectRatio="none">
          <path d="M0,80 C240,160 480,0 720,80 C960,160 1200,0 1440,80 L1440,180 L0,180 Z" fill="#f8fafc" />
        </svg>
      </section>

      {/* --- MAIN CONTENT --- */}
      <div className="max-w-[1200px] mx-auto px-6 -mt-24 pb-24 relative z-10 w-full">
        <div className="grid lg:grid-cols-3 gap-12">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            style={cardBorderStyle}
            className="lg:col-span-2 bg-white rounded-[3rem] p-8 md:p-14 border-2 border-transparent shadow-2xl"
          >
            <form className="space-y-16" onSubmit={handleSubmit}>

              {/* Section 1: Personal Info */}
              <section className="space-y-8">
                <div className="flex items-center gap-5">
                  <span className="w-12 h-12 rounded-2xl bg-[#FF6B6B]/10 text-[#FF6B6B] flex items-center justify-center font-black text-xl shadow-sm">1</span>
                  <h2 className="text-2xl font-black text-slate-900 italic">Tell Us About Yourself</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">What's your name? *</label>
                    <input type="text" name="name" placeholder="Your chosen name" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#A855F7] transition-all outline-none font-bold" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Pronouns</label>
                    <input type="text" name="pronouns" placeholder="e.g., she/her, they/them" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#A855F7] transition-all outline-none font-bold" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Best Email *</label>
                    <input type="email" name="email" placeholder="So we can send you invites" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#A855F7] transition-all outline-none font-bold" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Phone (optional)</label>
                    <input type="tel" name="phone" placeholder="For quick event updates" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#A855F7] transition-all outline-none font-bold" />
                  </div>
                </div>
              </section>

              {/* Section 2: Event Interests */}
              <section className="space-y-8">
                <div className="flex items-center gap-5">
                  <span className="w-12 h-12 rounded-2xl bg-[#A855F7]/10 text-[#A855F7] flex items-center justify-center font-black text-xl shadow-sm">2</span>
                  <h2 className="text-2xl font-black text-slate-900 italic">What Excites You?</h2>
                </div>
                <div className="space-y-6">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 block ml-2">Which gatherings would you love to attend? (Check all you like) *</label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      '🍿 Queer Afro Movie Night',
                      '🌈 Pride Month Celebrations',
                      '🌍 Heritage & Cultural Feasts',
                      '🎉 Holiday Get-Togethers',
                      '🏆 Community Milestones',
                      '🍲 Potlucks & Food Festivals',
                      '🎵 Music & Dance Jams',
                      '🎨 Art & Creativity Showcases',
                      '⚽ Sports & Park Days',
                      '📖 Storytelling & Poetry Nights'
                    ].map(event => (
                      <label key={event} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 cursor-pointer hover:bg-slate-100 transition-all group">
                        <input type="checkbox" name="interests_checkbox" value={event} className="w-5 h-5 accent-[#A855F7] rounded" />
                        <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900">{event}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="space-y-4 pt-4">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 block ml-2">Age Group</label>
                  <div className="flex flex-wrap gap-4">
                    {['18–24', '25–34', '35–44', '45–54', '55–64', '65+', 'Prefer not to say'].map(age => (
                      <label key={age} className="flex items-center gap-2 font-bold text-slate-600 cursor-pointer bg-slate-50 px-4 py-2 rounded-xl transition-all hover:bg-slate-200">
                        <input type="radio" name="age_group" value={age} className="accent-[#A855F7]" /> {age}
                      </label>
                    ))}
                  </div>
                </div>
              </section>

              {/* Section 3: Cultural Background */}
              <section className="space-y-8">
                <div className="flex items-center gap-5">
                  <span className="w-12 h-12 rounded-2xl bg-[#3B82F6]/10 text-[#3B82F6] flex items-center justify-center font-black text-xl shadow-sm">3</span>
                  <h2 className="text-2xl font-black text-slate-900 italic">Your Beautiful Roots</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Country or Region of Origin</label>
                    <input type="text" name="country" placeholder="This helps us plan inclusively!" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#A855F7] outline-none font-bold" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Cultural/Ethnic Background</label>
                    <input type="text" name="background" placeholder="Share whatever you feel comfortable with" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#A855F7] outline-none font-bold" />
                  </div>
                </div>
              </section>

              {/* Section 4: Special Needs */}
              <section className="space-y-8">
                <div className="flex items-center gap-5">
                  <span className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-xl shadow-sm">4</span>
                  <h2 className="text-2xl font-black text-slate-900 italic">How Can We Support You?</h2>
                </div>
                <div className="space-y-8">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Dietary Needs or Allergies</label>
                    <textarea name="dietary" rows="2" placeholder="e.g., vegetarian, halal, nut allergy, gluten-free" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#A855F7] outline-none resize-none font-medium"></textarea>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Accessibility Needs</label>
                    <textarea name="access_needs" rows="2" placeholder="Let us know about ASL, wheelchair access, low stimulation space, etc." className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#A855F7] outline-none resize-none font-medium"></textarea>
                  </div>
                </div>
              </section>

              {/* Section 5: Emergency & Volunteering */}
              <section className="space-y-8">
                <div className="flex items-center gap-5">
                  <span className="w-12 h-12 rounded-2xl bg-[#FF6B6B]/10 text-[#FF6B6B] flex items-center justify-center font-black text-xl shadow-sm">5</span>
                  <h2 className="text-2xl font-black text-slate-900 italic">Connections & Community</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Emergency Contact Name</label>
                    <input type="text" name="emergency_name" placeholder="A trusted friend or family member" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#A855F7] outline-none font-bold" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Emergency Phone</label>
                    <input type="tel" name="emergency_phone" placeholder="Their phone number" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#A855F7] outline-none font-bold" />
                  </div>
                </div>
                <label className="flex items-center gap-4 p-6 rounded-[2rem] bg-slate-900 text-white cursor-pointer hover:shadow-xl transition-all group">
                  <input type="checkbox" name="volunteering" className="w-6 h-6 accent-[#FF6B6B] rounded" />
                  <span className="font-bold text-sm uppercase tracking-widest">I'd love to help plan or volunteer at events! 💜</span>
                </label>
              </section>

              {/* Section 6: Consent */}
              <section className="space-y-8">
                <div className="flex items-center gap-5">
                  <span className="w-12 h-12 rounded-2xl bg-[#A855F7]/10 text-[#A855F7] flex items-center justify-center font-black text-xl shadow-sm">6</span>
                  <h2 className="text-2xl font-black text-slate-900 italic">Final Touches</h2>
                </div>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 block ml-2">Are you okay with being in event photos?</label>
                    <div className="flex flex-wrap gap-6 p-4 bg-slate-50 rounded-2xl">
                      {['Yes, I consent', 'No photos please', 'Ask me first'].map(opt => (
                        <label key={opt} className="flex items-center gap-2 font-bold text-slate-600 cursor-pointer">
                          <input type="radio" name="photo_consent" value={opt} className="accent-[#A855F7]" /> {opt}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Got any thoughts or fun ideas?</label>
                    <textarea name="comments" rows="3" placeholder="Tell us what kind of gatherings you'd love to see!" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#A855F7] outline-none resize-none font-medium"></textarea>
                  </div>
                </div>
              </section>

              <button type="submit" disabled={loading} className="w-full py-5 bg-gradient-to-r from-[#FF6B6B] via-[#A855F7] to-[#3B82F6] text-white font-black text-xl rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all disabled:opacity-50">
                {loading ? 'Sending to our community...' : 'Join the Celebration! 🌈'}
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
              <h3 className="text-2xl font-black text-slate-900 mb-2 italic">Coming Up!</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8 border-b border-slate-50 pb-4">Mark your calendar</p>

              <div className="space-y-6">
                {/* NEW MOVIE NIGHT EVENT */}
                <EventCard
                  title="Queer Afro Movie Night 🍿"
                  desc="A monthly gathering celebrating beautiful queer African stories through film, conversation, and community."
                  loc="Every Last Saturday (First event: Apr 25)"
                />
                <EventCard
                  title="Pride Month Kickoff 🌈"
                  desc="A vibrant evening with delicious food, great music, and local community performances."
                  loc="Community Centre"
                />
                <EventCard
                  title="Summer Harvest Potluck 🍲"
                  desc="Share a dish from your culture, play games, and enjoy a day outdoors together."
                  loc="Riverside Park"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-[#1e1b4b] rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden"
            >
              <h3 className="text-xl font-black mb-8 text-[#FF6B6B] italic">What You Can Expect</h3>
              <div className="space-y-8 relative z-10">
                <ExpectItem icon="🍲" title="Delicious Eats" desc="Authentic food prepared with love, and we always respect your dietary needs." />
                <ExpectItem icon="🎵" title="Music & Good Vibes" desc="Share your favorite tracks and experience amazing traditions." />
                <ExpectItem icon="🤝" title="Real Connections" desc="Meet wonderful folks in a joyful, affirming, and entirely safe environment." />
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6B6B]/10 rounded-full blur-3xl"></div>
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
                <span className="text-4xl text-white">🎉</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-3">You're on the list!</h3>
              <p className="text-slate-500 mb-8 font-medium leading-relaxed">
                We're thrilled to have you join our cultural gatherings. Keep an eye on your email for the next invite. Can't wait to see you there! 🌈
              </p>
              <button
                onClick={() => setShowPopup(false)}
                className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl shadow-md hover:bg-slate-800 hover:shadow-xl transition-all"
              >
                Awesome!
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function EventCard({ title, desc, loc }) {
  return (
    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:shadow-md transition-all group">
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-black text-slate-900 text-sm leading-tight pr-2">{title}</h4>
        <span className="bg-[#FF6B6B]/10 text-[#FF6B6B] text-[0.6rem] font-black uppercase px-3 py-1 rounded-full whitespace-nowrap mt-1">Coming up</span>
      </div>
      <p className="text-[0.7rem] text-slate-500 mb-3 leading-relaxed">{desc}</p>
      <p className="text-[0.7rem] font-black text-[#3B82F6] uppercase tracking-widest">📍 {loc}</p>
    </div>
  );
}

function ExpectItem({ icon, title, desc }) {
  return (
    <div className="flex gap-4">
      <div className="text-2xl shrink-0">{icon}</div>
      <div>
        <h4 className="font-bold text-white text-sm mb-1">{title}</h4>
        <p className="text-[0.7rem] text-white/50 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}