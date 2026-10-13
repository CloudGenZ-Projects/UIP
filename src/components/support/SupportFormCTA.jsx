import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { apiService } from '../../api/apiService'; // Apne path ke hisaab se adjust karein

export default function SupportFormCTA() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    primaryNeed: '',
    urgency: 'normal', // default value
    situationDesc: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // State for the success/error popup modal
  const [popup, setPopup] = useState({ show: false, type: '', title: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Custom Validation
    if (!formData.primaryNeed) {
      setPopup({
        show: true,
        type: 'error',
        title: 'Missing Information',
        message: 'Please select your primary support need.'
      });
      return;
    }

    setIsSubmitting(true);
    try {
     
      const payload = {
        ...formData,
        formId: 'uip-contact'
      };

      await apiService.submitSupportRequest(payload);
      
      // Show Custom Success Popup
      setPopup({
        show: true,
        type: 'success',
        title: 'Request Sent!',
        message: 'Support request sent successfully! We will get back to you shortly.'
      });
      
      // Reset Form
      setFormData({
        fullName: '', email: '', phone: '', primaryNeed: '', urgency: 'normal', situationDesc: ''
      });
    } catch (error) {
      // Show Custom Error Popup
      setPopup({
        show: true,
        type: 'error',
        title: 'Submission Failed',
        message: 'Failed to send request. Please try again later.'
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closePopup = () => {
    setPopup({ show: false, type: '', title: '', message: '' });
  };

  return (
    <section className="py-20 px-6 bg-[#FAFAFA] relative">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-3xl p-0.5 shadow-xl" style={{ background: 'linear-gradient(135deg, #b8a7e0, #7dcbb8)' }}>
          <div className="bg-white rounded-[calc(1.5rem-2px)] p-8 md:p-14">
            
            <div className="text-center mb-10">
              <span className="text-4xl mb-4 block">💌</span>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-pride-navy mb-4">
                Need Personalized Support?
              </h2>
              <p className="text-pride-muted text-lg max-w-2xl mx-auto">
                Every journey is unique. Share your specific needs with us and we'll connect you with the right resources, services, and support tailored to your situation.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6 text-left">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-pride-navy mb-2">Full Name *</label>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Your full name" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-pride-purple focus:ring-1 focus:ring-pride-purple transition-all" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-pride-navy mb-2">Email Address *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-pride-purple focus:ring-1 focus:ring-pride-purple transition-all" required />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-pride-navy mb-2">Phone Number</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Optional - for faster response" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-pride-purple focus:ring-1 focus:ring-pride-purple transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-pride-navy mb-2">Primary Support Need *</label>
                  <select name="primaryNeed" value={formData.primaryNeed} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-pride-purple focus:ring-1 focus:ring-pride-purple transition-all text-pride-navy" required>
                    <option value="" disabled>Select your primary need</option>
                    <option value="Housing & Shelter">Housing & Shelter</option>
                    <option value="Legal & Immigration">Legal & Immigration</option>
                    <option value="Healthcare & Mental Health">Healthcare & Mental Health</option>
                    <option value="Settlement & Integration">Settlement & Integration</option>
                    <option value="Employment & Training">Employment & Training</option>
                    <option value="Youth Services">Youth Services</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-pride-navy mb-3">How urgent is your need?</label>
                <div className="grid grid-cols-3 gap-3">
                  <label className="cursor-pointer">
                    <input type="radio" name="urgency" value="low" checked={formData.urgency === 'low'} onChange={handleChange} className="peer sr-only" />
                    <div className="text-center px-3 py-3 rounded-xl border border-gray-200 peer-checked:border-teal-500 peer-checked:bg-teal-50 hover:bg-gray-50 transition-all">
                      <div className="font-bold text-pride-navy text-sm">Low</div>
                      <div className="text-xs text-pride-muted mt-1">Wait a few days</div>
                    </div>
                  </label>
                  <label className="cursor-pointer">
                    <input type="radio" name="urgency" value="normal" checked={formData.urgency === 'normal'} onChange={handleChange} className="peer sr-only" />
                    <div className="text-center px-3 py-3 rounded-xl border border-gray-200 peer-checked:border-purple-500 peer-checked:bg-purple-50 hover:bg-gray-50 transition-all">
                      <div className="font-bold text-pride-navy text-sm">Normal</div>
                      <div className="text-xs text-pride-muted mt-1">Within 24-48 hours</div>
                    </div>
                  </label>
                  <label className="cursor-pointer">
                    <input type="radio" name="urgency" value="high" checked={formData.urgency === 'high'} onChange={handleChange} className="peer sr-only" />
                    <div className="text-center px-3 py-3 rounded-xl border border-red-200 peer-checked:border-red-500 peer-checked:bg-red-50 hover:bg-red-50 transition-all">
                      <div className="font-bold text-red-600 text-sm">High</div>
                      <div className="text-xs text-red-500 mt-1">Same day response</div>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-pride-navy mb-2">Tell Us About Your Situation *</label>
                <textarea 
                  name="situationDesc"
                  value={formData.situationDesc}
                  onChange={handleChange}
                  rows="4" 
                  maxLength={500}
                  placeholder="Share as much or as little as you're comfortable with. We're here to listen..." 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-pride-purple focus:ring-1 focus:ring-pride-purple transition-all resize-none"
                  required
                ></textarea>
                <p className="text-xs text-right text-gray-400 mt-1">{formData.situationDesc.length}/500 characters</p>
              </div>

              <div className="text-center pt-4 border-t border-gray-100">
                <button disabled={isSubmitting} type="submit" className="w-full sm:w-auto bg-gradient-cta text-white font-bold text-lg px-10 py-4 rounded-full shadow-md hover:opacity-90 transition-opacity disabled:opacity-70 bg-purple-600">
                  {isSubmitting ? 'Sending...' : 'Send Support Request'}
                </button>
                <p className="text-sm text-pride-muted mt-4">
                  We typically respond within 24 hours. For immediate crisis support, please use the resources above.
                </p>
              </div>

            </form>
          </div>
        </div>
      </div>

      {/* ======================= */}
      {/* SUCCESS / ERROR POPUP */}
      {/* ======================= */}
      <AnimatePresence>
        {popup.show && (
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
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border ${popup.type === 'success' ? 'bg-purple-50 text-purple-500 border-purple-100' : 'bg-red-50 text-red-500 border-red-100'}`}>
                <span className="text-4xl font-bold">{popup.type === 'success' ? '✨' : '⚠️'}</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-3">{popup.title}</h3>
              <p className="text-slate-500 mb-8 font-medium leading-relaxed">
                {popup.message}
              </p>
              <button 
                onClick={closePopup}
                className="w-full py-4 bg-slate-100 text-slate-700 font-black rounded-2xl shadow-sm hover:bg-slate-200 transition-all"
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