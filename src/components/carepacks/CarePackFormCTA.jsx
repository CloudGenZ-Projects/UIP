import React, { useState } from 'react';
import { apiService } from '../../api/apiService'; // Adjust path if needed

export default function CarePackFormCTA() {
  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    consent: false
  });

  // Submission Status State
  const [status, setStatus] = useState({ 
    loading: false, 
    success: false, 
    error: '' 
  });

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });

    try {
      
      const payload = {
        ...formData,
        formId: 'uip-contact'
      };

      await apiService.submitCarePack(payload);
      
      setStatus({ loading: false, success: true, error: '' });
      
      // Reset the form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        consent: false
      });

      // Hide success message after 5 seconds
      setTimeout(() => setStatus((prev) => ({ ...prev, success: false })), 5000);
      
    } catch (error) {
      console.error("Error submitting Care Pack application:", error);
      setStatus({ loading: false, success: false, error: 'Failed to submit application. Please try again later.' });
    }
  };

  return (
    <section id="request-form" className="py-20 px-6 bg-pride-sand">
      <div className="max-w-4xl mx-auto">
        {/* Gradient Border Wrapper */}
        <div className="rounded-3xl p-0.5 shadow-xl" style={{ background: 'linear-gradient(135deg, #b8a7e0, #7dcbb8)' }}>
          <div className="bg-white rounded-[calc(1.5rem-2px)] p-8 md:p-14">
            
            <div className="text-center mb-10">
              <span className="text-4xl mb-4 block">📦</span>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-pride-navy mb-4">
                Apply for Your Welcome Care Pack
              </h2>
              <p className="text-pride-muted text-lg max-w-2xl mx-auto">
                No cost. Simply complete our 2‑minute form and we'll ship it to your Canadian address within 5 business days.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6 text-left">
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-pride-navy mb-2">First Name *</label>
                  <input 
                    type="text" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter your first name" 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-pride-purple focus:ring-1 focus:ring-pride-purple transition-all" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-pride-navy mb-2">Last Name *</label>
                  <input 
                    type="text" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter your last name" 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-pride-purple focus:ring-1 focus:ring-pride-purple transition-all" 
                    required 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-pride-navy mb-2">Email Address *</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com" 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-pride-purple focus:ring-1 focus:ring-pride-purple transition-all" 
                  required 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-pride-navy mb-2">Complete Shipping Address *</label>
                <textarea 
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3" 
                  maxLength="500"
                  placeholder="Street address, apartment/unit number, city, province, and postal code..." 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-pride-purple focus:ring-1 focus:ring-pride-purple transition-all resize-none"
                  required
                ></textarea>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-xs text-gray-400">Canadian addresses only</p>
                  <p className="text-xs text-gray-400">{formData.address.length}/500 characters</p>
                </div>
              </div>

              <label className="flex items-start gap-3 p-4 bg-purple-50 rounded-xl border border-purple-100 cursor-pointer hover:bg-purple-100/50 transition-colors">
                <input 
                  type="checkbox" 
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  className="mt-1 w-5 h-5 rounded border-gray-300 text-pride-purple focus:ring-pride-purple cursor-pointer" 
                  required 
                />
                <span className="text-sm text-pride-navy font-medium leading-relaxed">
                  I consent to United in Pride using my information to process my Welcome Care Pack application and to occasionally share updates about programs and services. *
                </span>
              </label>

              {/* Status Messages */}
              {status.success && (
                <div className="p-4 bg-[#7dcbb8]/20 border border-[#7dcbb8] text-pride-navy rounded-xl font-bold text-center">
                  Success! Your Care Pack request has been submitted. 📦
                </div>
              )}
              {status.error && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl font-bold text-center">
                  {status.error}
                </div>
              )}

              <div className="text-center pt-4">
                <button 
                  type="submit" 
                  disabled={status.loading}
                  className={`w-full sm:w-auto bg-gradient-cta text-white font-bold text-lg px-12 py-4 rounded-full shadow-md transition-opacity ${status.loading ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'}`}
                >
                  {status.loading ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </section>
  );
}