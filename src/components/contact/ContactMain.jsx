import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Instagram,
  Facebook,
  Linkedin,
  MapPin,
  Phone,
  Mail,
  Clock
} from 'lucide-react';
import { apiService } from '../../api/apiService';

const formCardStyle = {
  backgroundOrigin: 'border-box',
  backgroundClip: 'padding-box, border-box',
  backgroundImage: 'linear-gradient(#fff, #fff), linear-gradient(135deg, #FF6B6B22, #A855F722, #3B82F622)',
};

const socialLinks = [
  {
    i: <Instagram size={19} />,
    label: 'Instagram',
    href: 'https://www.instagram.com/unite_in_pride?igsh=Z3VtdjJsaTB5ZTR3&utm_source=qr'
  },
  {
    i: <Facebook size={19} />,
    label: 'Facebook',
    href: 'https://www.facebook.com/people/United-in-Pride/61579117565491/?mibextid=wwXIfr&rdid=yKDvw6J1FEk8NY4q&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F19nM1NbmSt%2F%3Fmibextid%3DwwXIfr'
  },
  {
    i: <Linkedin size={19} />,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/youpride/'
  },
  {
    i: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
      </svg>
    ),
    label: 'TikTok',
    href: 'https://www.tiktok.com/@unitedinpride1?_t=ZS-8yhxvJbUwYi&_r=1'
  }
];

export default function ContactMain({ data }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'General Information',
    message: ''
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });

    try {
      const payload = {
        ...formData,
        formId: 'uip-contact' 
      };

      await apiService.submitContact(payload);

      await fetch(`https://formsubmit.cloudgenz.com/submit/${payload.formId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      setStatus({ loading: false, success: true, error: '' });
      setFormData({
        name: '',
        email: '',
        phone: '',
        interest: 'General Information',
        message: ''
      });

      setTimeout(() => setStatus((prev) => ({ ...prev, success: false })), 5000);

    } catch (error) {
      console.error("Error submitting contact form:", error);
      setStatus({ loading: false, success: false, error: 'Failed to send message. Please try again later.' });
    }
  };

  return (
    <section className="py-24 px-6 bg-white relative z-10">
      <div className="max-w-[1200px] mx-auto grid lg:grid-cols-5 gap-16 items-start">

        {/* Left Column: Form */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          style={formCardStyle}
          className="lg:col-span-3 bg-white border-2 border-transparent rounded-[3rem] p-8 md:p-12 shadow-2xl"
        >
          <div className="mb-10">
            <h2 className="text-3xl font-black text-slate-900 mb-2">{data?.formTitle || 'Send Us a Message'}</h2>
            <p className="text-slate-500">{data?.formSubtitle || 'Fill out the form below and our team will get back to you.'}</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-semibold text-slate-900 focus:ring-2 focus:ring-[#A855F7] outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@email.com"
                  required
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-semibold text-slate-900 focus:ring-2 focus:ring-[#A855F7] outline-none"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Phone (Optional)</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-semibold text-slate-900 focus:ring-2 focus:ring-[#A855F7] outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Topic of Interest</label>
                <select
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-semibold text-slate-900 focus:ring-2 focus:ring-[#A855F7] outline-none"
                >
                  <option value="General Information">General Information</option>
                  <option value="Joining Programs">Joining Programs</option>
                  <option value="Volunteering">Volunteering</option>
                  <option value="Partnerships">Partnerships</option>
                  <option value="Donations">Donations</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Your Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                placeholder="Tell us how we can help..."
                required
                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-semibold text-slate-900 focus:ring-2 focus:ring-[#A855F7] outline-none resize-none"
              ></textarea>
            </div>

            {status.success && (
              <p className="text-green-600 font-bold text-sm bg-green-50 p-4 rounded-xl border border-green-200">
                Thank you! Your message has been sent successfully. We will be in touch soon.
              </p>
            )}
            {status.error && (
              <p className="text-red-500 font-bold text-sm bg-red-50 p-4 rounded-xl border border-red-200">
                {status.error}
              </p>
            )}

            <button
              type="submit"
              disabled={status.loading}
              className="w-full py-5 bg-gradient-to-r from-[#FF6B6B] via-[#A855F7] to-[#3B82F6] text-white rounded-2xl font-black text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all disabled:opacity-50"
            >
              {status.loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </motion.div>

        {/* Right Column: Contact Details */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 space-y-10"
        >
          <div>
            <h2 className="text-3xl font-black text-slate-900 mb-8">Contact Information</h2>
            
            <div className="space-y-8">
              <ContactBlock
                icon="✉️"
                title="Email Us"
                detail={data?.contactEmail || 'hello@unitedinpride.org'}
                sub={data?.contactEmailSub || 'We typically respond within 24-48 hours'}
                link={`mailto:${data?.contactEmail || 'hello@unitedinpride.org'}`}
              />

              <ContactBlock
                icon="📞"
                title="Call Us"
                detail={data?.contactPhone || '+1 (613) 296-3392'}
                sub={data?.contactPhoneSub || 'Monday - Friday, 9am - 5pm EST'}
                link={`tel:${data?.contactPhone || '+16132963392'}`}
              />

              <div className="flex gap-6">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-2xl shrink-0 shadow-sm">
                  📱
                </div>
                <div>
                  <h4 className="font-bold text-slate-400 text-xs uppercase tracking-widest mb-1">Direct Message</h4>
                  <div className="flex gap-3 my-1">
                    <a href="https://www.tiktok.com/@unitedinpride1?_t=ZS-8yhxvJbUwYi&_r=1" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[#A855F7] hover:underline flex items-center gap-1">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg> TikTok
                    </a>
                    <a href="https://www.linkedin.com/company/youpride/" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[#A855F7] hover:underline flex items-center gap-1"><Linkedin size={15} /> LinkedIn</a>
                    <a href="https://www.instagram.com/unite_in_pride?igsh=Z3VtdjJsaTB5ZTR3&utm_source=qr" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[#A855F7] hover:underline flex items-center gap-1"><Instagram size={15} /> Instagram</a>
                  </div>
                  <p className="text-sm text-slate-500">Prefer a quicker response? Reach out via social media</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-2xl shrink-0 shadow-sm">
                  💬
                </div>
                <div>
                  <h4 className="font-bold text-slate-400 text-xs uppercase tracking-widest mb-1">WhatsApp</h4>
                  <a href={data?.whatsappUrl || "https://whatsapp.com/channel/0029VbC7CIMJpe8eQBfVNN3K"} target="_blank" rel="noopener noreferrer" className="inline-block mt-1 px-5 py-2.5 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-bold text-sm rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">Join Our Channel →</a>
                  <p className="text-sm text-slate-500 mt-1">Stay connected with our WhatsApp community</p>
                </div>
              </div>

              <ContactBlock
                icon="📍"
                title="Location"
                detail={data?.locationTitle || "Ottawa, Ontario"}
                sub={data?.locationSub || "Programs are hosted at trusted community partner spaces across the city"}
              />

              <ContactBlock
                icon="🕒"
                title="Availability"
                detail={
                  <span className="text-base leading-snug block">{data?.availabilityTitle || 'Our team operates flexibly to support community needs.'}</span>
                }
                sub={data?.availabilitySub || "Most responses are provided within 24–48 hours. Your information is kept confidential and used only to support you and connect you to appropriate resources."}
              />
            </div>
          </div>

          <div className="pt-5 border-t border-slate-100">
            <h3 className="font-bold text-xl text-slate-900 mb-6">Follow Our Journey</h3>
            <div className="flex gap-4 mb-4">
              {socialLinks.map((s, idx) => (
                <a
                  key={idx}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-[42px] h-[42px] rounded-full bg-[rgba(203,17,17,0.05)] border border-[rgba(255,255,255,0.1)] flex items-center justify-center transition-all duration-300 hover:bg-gradient-to-br hover:from-[#FF6B6B] hover:to-[#750ad9] hover:-translate-y-[3px] text-[rgba(217,21,21,0.8)] hover:text-white"
                >
                  {s.i}
                </a>
              ))}
            </div>
            <p className='text-sm text-slate-500'>Stay updated with our events, stories, and community highlights</p>
          </div>

          {/* Map */}
          <div className="relative w-full h-[300px] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white group">
            <iframe
              src={data?.mapEmbedUrl || "https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d8805.130692564679!2d-75.68435945241849!3d45.37935242108252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e0!4m3!3m2!1d21.547494!2d78.60014749999999!4m5!1s0x4cce0609e36febf7%3A0x840991e9373515c1!2s2451%20Riverside%20Dr.%2C%20Ottawa%2C%20ON%20K1H%207X7%2C%20Canada!3m2!1d45.382172999999995!2d-75.6833748!5e0!3m2!1sen!2sin!4v1774372991048!5m2!1sen!2sin"}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Map"
            ></iframe>
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-5 py-3 rounded-2xl shadow-xl border border-white/50 pointer-events-none">
              <p className="font-black text-slate-900 text-sm">📍 Based in Ottawa</p>
              <p className="text-[0.7rem] text-slate-500 font-bold uppercase tracking-widest">Serving Canada Nationwide</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

function ContactBlock({ icon, title, detail, sub, link }) {
  return (
    <div className="flex gap-6">
      <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-2xl shrink-0 shadow-sm">
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-slate-400 text-xs uppercase tracking-widest mb-1">{title}</h4>
        {link ? (
          <a href={link} className="text-xl font-black text-slate-900 mb-1 hover:text-[#A855F7] transition-colors block">
            {detail}
          </a>
        ) : (
          <div className="text-xl font-black text-slate-900 mb-1">{detail}</div>
        )}
        <p className="text-sm text-slate-500">{sub}</p>
      </div>
    </div>
  );
}
