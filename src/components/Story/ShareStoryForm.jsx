import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { apiService } from '../../api/apiService';

export default function ShareStoryForm({ data }) {
  const [loading, setLoading] = useState(false);

  const badge = data?.share_story_badge;
  const title = data?.share_story_title;
  const description = data?.share_story_description;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.target);
    const payload = {
      name: formData.get('name') || 'Anonymous',
      email: formData.get('email'),
      story_text: formData.get('story_text'),
      consent_pub: formData.get('consent_pub') === 'on',
      consent_edit: formData.get('consent_edit') === 'on'
    };

    try {
      await apiService.submitStory(payload);
      alert('Your story has been shared successfully! 💜');
      e.target.reset();
    } catch (error) {
      alert('Failed to submit story. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}>
          {badge && <span className="text-6xl mb-6 block">{badge}</span>}
          {title && <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">{title}</h2>}
          {description && (
            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              {description}
            </p>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} className="bg-slate-50 p-10 rounded-[3rem] shadow-xl border border-slate-100">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <input name="name" type="text" placeholder="Full Name (Anonymity optional)" className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-[#A855F7]" />
            <input name="email" type="email" placeholder="Email Address *" required className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-[#A855F7]" />
            
            <textarea name="story_text" rows="5" required placeholder="Share your journey..." maxLength={500} className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-[#A855F7] resize-none"></textarea>

            <div className="space-y-4 py-2 text-left">
              <label className="flex items-start gap-3 cursor-pointer">
                <input name="consent_pub" type="checkbox" required className="mt-1 w-5 h-5 accent-[#A855F7] shrink-0" />
                <span className="text-sm text-slate-600">I consent to publication.</span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input name="consent_edit" type="checkbox" required className="mt-1 w-5 h-5 accent-[#A855F7] shrink-0" />
                <span className="text-sm text-slate-600">I consent to editing for length/clarity.</span>
              </label>
            </div>

            <button type="submit" disabled={loading} className="w-full mt-4 py-4 bg-gradient-to-r from-[#FF6B6B] via-[#A855F7] to-[#3B82F6] text-white rounded-2xl font-bold shadow-lg disabled:opacity-50">
              {loading ? 'Submitting...' : 'Submit My Story 💜'}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
