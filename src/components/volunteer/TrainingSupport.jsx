import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { apiService } from '../../api/apiService';

export default function VolunteerDetails() {
  const volunteerInterestsOptions = [
    "Event support", "Peer support / community hosting", "Program coordination", 
    "Outreach / social media", "Translation / interpretation", "Graphic design / admin", 
    "Fundraising support", "Care pack coordination", "Other"
  ];

  const livedExperienceOptions = [
    "LGBTQ+ newcomer / immigrant", "LGBTQ+ community member", "Ally", "Prefer not to say"
  ];

  // Form State
  const [formData, setFormData] = useState({
    fullName: '', 
    preferredName: '', 
    email: '', 
    phone: '', 
    city: '',
    interests: [], 
    availability: '', 
    livedExperience: [],
    experienceDesc: '', 
    motivationDesc: '', 
    agreedToContact: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // State for the success/error popup modal
  const [popup, setPopup] = useState({ show: false, type: '', title: '', message: '' });

  // Helper to handle multiple checkboxes (Arrays)
  const handleCheckboxChange = (field, value) => {
    setFormData((prev) => {
      const array = prev[field];
      if (array.includes(value)) {
        return { ...prev, [field]: array.filter((item) => item !== value) };
      } else {
        return { ...prev, [field]: [...array, value] };
      }
    });
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation for radio button
    if (!formData.availability) {
      setPopup({
        show: true,
        type: 'error',
        title: 'Missing Information',
        message: 'Please select how often you can volunteer.'
      });
      return;
    }

    setIsSubmitting(true);
    try {

      const payload = {
        ...formData,
        formId: 'uip-contact'
      };

      await apiService.submitVolunteer(payload);

      await fetch(`https://formsubmit.cloudgenz.com/submit/${payload.formId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      // Show Custom Success Popup
      setPopup({
        show: true,
        type: 'success',
        title: 'Application Submitted!',
        message: 'Thank you for your application! We will contact you soon.'
      });
      
      // Reset form after successful submission
      setFormData({
        fullName: '', preferredName: '', email: '', phone: '', city: '',
        interests: [], availability: '', livedExperience: [],
        experienceDesc: '', motivationDesc: '', agreedToContact: false
      });
    } catch (error) {
      // Show Custom Error Popup
      setPopup({
        show: true,
        type: 'error',
        title: 'Submission Failed',
        message: 'Failed to submit application. Please try again.'
      });
      console.error("Submission Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closePopup = () => {
    setPopup({ show: false, type: '', title: '', message: '' });
  };

  return (
    <section className="pb-24 px-6 bg-[#FAFAFA] overflow-hidden relative" id='volunteer'>
      <div className="max-w-[1250px] mx-auto">

        {/* --- Form Section --- */}
        <div id="apply-form" className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-4xl font-black text-slate-900 mb-6">Volunteer With Us</h2>
            <p className="text-slate-600 text-lg leading-[1.8] mb-10">
              Join us in building a national movement. Together, we're creating lasting change for LGBTQ+ newcomers across Canada. 
              <br />
              Your support helps create spaces where people feel seen, supported, and connected.
              <br />
              Volunteering with United in Pride means becoming part of a community, not just offering your time.
            </p>
            
        
            {/* --------------------------------- */}
            
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white shadow-2xl rounded-[2.5rem] border border-slate-100 p-8 md:p-10"
          >
            <h3 className="text-2xl font-black text-slate-900 mb-2">Volunteer Application</h3>
            <p className="text-slate-500 text-sm mb-8 font-medium">Please fill in your details below.</p>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Name Fields */}
              <div className="grid md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  required
                  placeholder="Full Name" 
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  className="w-full p-4 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-purple-500/20 outline-none text-sm font-medium" 
                />
                <input 
                  type="text" 
                  placeholder="Preferred Name (optional)" 
                  value={formData.preferredName}
                  onChange={(e) => setFormData({...formData, preferredName: e.target.value})}
                  className="w-full p-4 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-purple-500/20 outline-none text-sm font-medium" 
                />
              </div>

              {/* Contact Fields */}
              <div className="grid md:grid-cols-2 gap-4">
                <input 
                  type="email" 
                  required
                  placeholder="Email Address" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full p-4 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-purple-500/20 outline-none text-sm font-medium" 
                />
                <input 
                  type="text" 
                  required
                  placeholder="Phone / WhatsApp" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full p-4 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-purple-500/20 outline-none text-sm font-medium" 
                />
              </div>

              <div className="grid md:grid-cols-1 gap-4">
                <input 
                  type="text" 
                  required
                  placeholder="City" 
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  className="w-full p-4 bg-slate-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-purple-500/20 text-sm font-medium" 
                />
              </div>

              {/* Volunteer Interests (Multiple Checkboxes) */}
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">How would you like to volunteer?</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-bold text-slate-600">
                   {volunteerInterestsOptions.map(item => (
                     <label key={item} className="flex items-center gap-2 cursor-pointer hover:text-purple-600 transition-colors">
                       <input 
                        type="checkbox" 
                        checked={formData.interests.includes(item)}
                        onChange={() => handleCheckboxChange('interests', item)}
                        className="rounded text-purple-600 focus:ring-purple-500 w-4 h-4 cursor-pointer" 
                      /> 
                      {item}
                     </label>
                   ))}
                </div>
              </div>

              {/* Availability (Radio Buttons) */}
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">How often can you volunteer?</p>
                <div className="flex flex-wrap gap-4 text-xs font-bold text-slate-600">
                   {["Occasionally", "Monthly", "Bi-weekly", "Weekly"].map(time => (
                     <label key={time} className="flex items-center gap-2 cursor-pointer hover:text-purple-600 transition-colors">
                       <input 
                        type="radio" 
                        name="availability" 
                        checked={formData.availability === time}
                        onChange={() => setFormData({...formData, availability: time})}
                        className="text-purple-600 focus:ring-purple-500 w-4 h-4 cursor-pointer" 
                      /> 
                      {time}
                     </label>
                   ))}
                </div>
              </div>

              {/* Lived Experience (Multiple Checkboxes) */}
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Do you identify as: (Optional)</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-bold text-slate-600">
                   {livedExperienceOptions.map(exp => (
                     <label key={exp} className="flex items-center gap-2 cursor-pointer hover:text-purple-600 transition-colors">
                       <input 
                        type="checkbox" 
                        checked={formData.livedExperience.includes(exp)}
                        onChange={() => handleCheckboxChange('livedExperience', exp)}
                        className="rounded text-purple-600 focus:ring-purple-500 w-4 h-4 cursor-pointer" 
                      /> 
                      {exp}
                     </label>
                   ))}
                </div>
              </div>

              {/* Text Areas */}
              <textarea 
                placeholder="Tell us about any relevant experience or skills" 
                value={formData.experienceDesc}
                onChange={(e) => setFormData({...formData, experienceDesc: e.target.value})}
                className="w-full p-4 bg-slate-50 rounded-xl border-none h-24 outline-none focus:ring-2 focus:ring-purple-500/20 text-sm font-medium resize-none"
              ></textarea>
              
              <textarea 
                placeholder="Why would you like to volunteer with United in Pride?" 
                value={formData.motivationDesc}
                onChange={(e) => setFormData({...formData, motivationDesc: e.target.value})}
                className="w-full p-4 bg-slate-50 rounded-xl border-none h-24 outline-none focus:ring-2 focus:ring-purple-500/20 text-sm font-medium resize-none"
              ></textarea>

              {/* Agreement */}
              <label className="flex items-start gap-3 text-xs font-bold text-slate-500 cursor-pointer pt-2 hover:text-slate-800 transition-colors">
                <input 
                  type="checkbox" 
                  required 
                  checked={formData.agreedToContact}
                  onChange={(e) => setFormData({...formData, agreedToContact: e.target.checked})}
                  className="mt-0.5 rounded text-purple-600 focus:ring-purple-500 w-4 h-4 cursor-pointer" 
                />
                I agree to be contacted about volunteer opportunities.
              </label>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full py-4 bg-gradient-to-r from-[#FF6B6B] via-[#A855F7] to-[#3B82F6] text-white rounded-2xl font-black shadow-lg hover:scale-[1.02] transition-transform ${isSubmitting ? 'opacity-70 cursor-wait' : ''}`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Volunteer Request'}
              </button>
            </form>
          </motion.div>
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