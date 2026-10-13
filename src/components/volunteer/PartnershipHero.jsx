import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { apiService } from '../../api/apiService';

export default function WaysToGiveOptions() {
  const [formData, setFormData] = useState({
    orgName: '',
    contactName: '',
    email: '',
    phone: '',
    interests: [],
    otherInterest: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });

  // State to toggle the inline Zeffy form
  const [showZeffy, setShowZeffy] = useState(false);

  const partnershipOptions = [
    "Sponsoring an event or program",
    "Donating goods or services",
    "Hosting a fundraiser",
    "Employee giving or workplace campaign",
    "Community outreach or promotion"
  ];

  const handleCheckboxChange = (option) => {
    setFormData((prev) => {
      if (prev.interests.includes(option)) {
        return { ...prev, interests: prev.interests.filter((item) => item !== option) };
      } else {
        return { ...prev, interests: [...prev.interests, option] };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage({ type: '', text: '' });

    try {
      
      const payload = {
        ...formData,
        formId: 'uip-contact'
      };

      // Calling the backend using your apiService with the updated payload
      await apiService.submitPartnership(payload);

      await fetch(`https://formsubmit.cloudgenz.com/submit/${payload.formId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      setSubmitMessage({
        type: 'success',
        text: "Thank you! Your community partnership request has been submitted successfully."
      });

      // Reset form on success
      setFormData({
        orgName: '', contactName: '', email: '', phone: '',
        interests: [], otherInterest: '', description: ''
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitMessage({
        type: 'error',
        text: "Oops! Something went wrong while submitting. Please try again later."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 px-6 bg-[#FAFAFA] relative">
      <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-8">

        {/* ======================= */}
        {/* 1. DONATE CARD          */}
        {/* ======================= */}
        <motion.div
          id="donate"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 md:p-14 shadow-xl border border-slate-100"
        >
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1 w-full">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Donate</h2>
              <p className="text-xl font-bold text-[#A855F7] mb-6">
                Your support helps create spaces where people feel seen, supported, and connected.
              </p>
              <p className="text-slate-600 text-lg mb-6">Your support can help us:</p>
              <ul className="space-y-4 mb-10">
                {[
                  'Host safe community gatherings',
                  'Provide transit support for participants',
                  'Purchase workshop and program materials',
                  'Support peer-led programs and outreach'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700 font-medium">
                    <span className="text-[#FF6B6B] font-black mt-0.5">✓</span> {item}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setShowZeffy(!showZeffy)}
                className="inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-[#FF6B6B] via-[#A855F7] to-[#3B82F6] text-white rounded-2xl font-black shadow-lg hover:scale-105 transition-transform"
              >
                {showZeffy ? 'Close Donation Form' : 'Donate via Zeffy'}
              </button>
            </div>

            <div className="flex-1 bg-slate-50 p-8 rounded-[2rem] w-full border border-slate-100">
              <h3 className="font-black text-slate-900 mb-6 text-xl">Suggested Giving Options</h3>
              <div className="space-y-4">
                <GiveOption amt="$25" desc="Helps cover refreshments or materials for a community gathering" />
                <GiveOption amt="$50" desc="Provides transit support for a participant" />
                <GiveOption amt="$100" desc="Supports a workshop or safe space event" />
                <GiveOption amt="$150+" desc="Helps sponsor a community gathering" />
              </div>
            </div>
          </div>

          {/* Inline Zeffy Embed Section */}
          {showZeffy && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full mt-12 pt-8 border-t border-slate-100 overflow-hidden"
            >
              <h3 className="text-2xl font-black text-slate-900 mb-6 text-center">Secure Donation Form</h3>
              <iframe
                src="https://www.zeffy.com/en-CA/donation-form/youre-not-alone"
                title="Zeffy Donation"
                className="w-full h-[850px] md:h-[900px] border-0 rounded-2xl shadow-inner bg-white"
                allow="payment"
              />
            </motion.div>
          )}
        </motion.div>

        {/* ======================= */}
        {/* 2. DONATE ITEMS CARD    */}
        {/* ======================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-gradient-to-br from-[#1e1b4b] to-[#4c1d95] text-white rounded-[2.5rem] p-8 md:p-14 shadow-xl flex flex-col lg:flex-row gap-12 items-center"
        >
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-black mb-6">Donate Items</h2>
            <p className="text-white/80 text-lg mb-10 leading-relaxed">
              Many newcomers arrive with very few belongings. Donating practical items can help someone feel more comfortable, supported, and welcome.
            </p>
            <a
              href="https://www.amazon.ca/hz/wishlist/ls/BL3KJDUPUZ2A/ref=hz_ls_biz_ex"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-10 py-4 bg-white text-[#4c1d95] rounded-2xl font-black shadow-lg hover:scale-105 transition-transform"
            >
              View Our Wishlist
            </a>
          </div>

          <div className="flex-1 w-full">
            <h3 className="font-bold mb-6 text-[#FF6B6B] uppercase tracking-widest text-sm">Most-needed items:</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                'Hygiene products',
                'Grocery gift cards',
                'Transit passes',
                'Winter accessories',
                'Journals and self-care items',
                'Backpacks and phone chargers'
              ].map((item, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm p-4 rounded-xl text-sm font-bold border border-white/10 flex items-center">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ======================= */}
        {/* 3. PARTNER FORM SECTION */}
        {/* ======================= */}
        <motion.div
          id='partner'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 md:p-14 shadow-xl border border-slate-100 flex flex-col lg:flex-row gap-12 items-start"
        >
          <div className="flex-1 lg:sticky lg:top-10">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Partner With Us</h2>
            <p className="text-slate-600 text-lg mb-4 leading-relaxed font-bold">
              We work with partners who believe in dignity, inclusion, and community-led impact.
            </p>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              Businesses, organizations, and community groups can support United in Pride through sponsorship, donated resources, or community partnerships.
            </p>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed font-bold">
              Together, we can create more safe spaces and reach more LGBTQ+ newcomers.
            </p>

            <div className="hidden lg:flex w-20 h-20 rounded-full bg-purple-50 items-center justify-center">
              <span className="text-3xl">🤝</span>
            </div>
          </div>

          <div className="flex-[1.5] w-full bg-slate-50 p-8 md:p-10 rounded-[2rem] border border-slate-100">
            <h3 className="text-2xl font-black text-slate-900 mb-6">Community Partner Form</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-5">
                <input
                  type="text" required placeholder="Organization / Business Name"
                  value={formData.orgName} onChange={e => setFormData({ ...formData, orgName: e.target.value })}
                  className="w-full p-4 bg-white rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#A855F7] outline-none text-sm font-medium"
                />
                <input
                  type="text" required placeholder="Contact Name"
                  value={formData.contactName} onChange={e => setFormData({ ...formData, contactName: e.target.value })}
                  className="w-full p-4 bg-white rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#A855F7] outline-none text-sm font-medium"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <input
                  type="email" required placeholder="Email Address"
                  value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-4 bg-white rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#A855F7] outline-none text-sm font-medium"
                />
                <input
                  type="tel" required placeholder="Phone Number"
                  value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-4 bg-white rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#A855F7] outline-none text-sm font-medium"
                />
              </div>

              <div className="pt-2">
                <p className="text-sm font-bold text-slate-800 mb-4">What type of partnership are you interested in?</p>
                <div className="space-y-3">
                  {partnershipOptions.map((option) => (
                    <label key={option} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={formData.interests.includes(option)}
                        onChange={() => handleCheckboxChange(option)}
                        className="w-5 h-5 accent-[#A855F7] rounded cursor-pointer"
                      />
                      <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors">{option}</span>
                    </label>
                  ))}

                  <div className="flex items-center gap-3 pt-2">
                    <label className="flex items-center gap-3 cursor-pointer group whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={formData.interests.includes('Other')}
                        onChange={() => handleCheckboxChange('Other')}
                        className="w-5 h-5 accent-[#A855F7] rounded cursor-pointer"
                      />
                      <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors">Other:</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Please specify"
                      value={formData.otherInterest}
                      onChange={e => setFormData({ ...formData, otherInterest: e.target.value })}
                      disabled={!formData.interests.includes('Other')}
                      className="w-full p-3 bg-white rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#A855F7] outline-none text-sm font-medium disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <p className="text-sm font-bold text-slate-800 mb-3">Tell us a little about your organization and how you would like to support United in Pride</p>
                <textarea
                  required
                  placeholder="Share your ideas..."
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-4 bg-white rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#A855F7] outline-none text-sm font-medium resize-none h-32"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black shadow-lg hover:bg-black transition-colors disabled:opacity-70"
              >
                {isSubmitting ? 'Submitting...' : 'Become a Community Partner'}
              </button>
            </form>
          </div>
        </motion.div>

        {/* ======================= */}
        {/* 4. VOLUNTEER WITH US    */}
        {/* ======================= */}
       

        {/* ======================= */}
        {/* 5. SHARE OUR WORK BANNER*/}
        {/* ======================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-slate-100 rounded-[2.5rem] p-8 md:p-14 shadow-sm border border-slate-200 flex flex-col md:flex-row gap-10 items-center text-center md:text-left"
        >
          <div className="flex-1">
            <h2 className="text-3xl font-black text-slate-900 mb-4">Share Our Work</h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              Not everyone can donate, and that is okay. Sharing our work is one of the most powerful ways to help. Follow us, invite others to our events, and help us spread the word.
            </p>
          </div>

          <div className="flex-1 w-full bg-white p-8 rounded-[2rem] border-l-8 border-[#3B82F6] shadow-md">
            <p className="font-black text-slate-800 text-xl italic leading-snug">
              "Awareness creates connection. Connection creates belonging."
            </p>
          </div>
        </motion.div>

      </div>

      {/* ======================= */}
      {/* SUCCESS / ERROR MODAL   */}
      {/* ======================= */}
      <AnimatePresence>
        {submitMessage.text && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white p-8 md:p-10 rounded-3xl max-w-sm w-full text-center shadow-2xl"
            >
              <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 text-4xl shadow-inner ${submitMessage.type === 'success' ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'
                }`}>
                {submitMessage.type === 'success' ? '✅' : '❌'}
              </div>

              <h3 className="text-2xl font-black text-slate-800 mb-3">
                {submitMessage.type === 'success' ? 'Success!' : 'Oops!'}
              </h3>

              <p className="text-slate-600 font-medium mb-8 leading-relaxed">
                {submitMessage.text}
              </p>

              <button
                onClick={() => setSubmitMessage({ type: '', text: '' })}
                className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-black transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}

// Internal component for the suggested giving amounts
function GiveOption({ amt, desc }) {
  return (
    <div className="flex gap-4 items-start bg-white p-4 rounded-xl shadow-sm border border-slate-100">
      <span className="bg-gradient-to-br from-[#FF6B6B] to-[#A855F7] text-white font-black px-4 py-1.5 rounded-lg shadow-sm">
        {amt}
      </span>
      <p className="text-sm font-bold text-slate-600 mt-1 leading-snug">{desc}</p>
    </div>
  );
}