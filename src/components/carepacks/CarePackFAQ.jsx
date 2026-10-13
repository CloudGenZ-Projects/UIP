import React, { useState } from 'react';

const FAQS = [
  {
    question: 'Who is eligible for a Welcome Care Pack?',
    answer: 'Welcome Care Packs are available to LGBTQ+ newcomers, immigrants, and refugees who have arrived in Canada within the last 12 months. We operate on an honor system and trust that those who request a pack truly need one.'
  },
  {
    question: 'How long does shipping take?',
    answer: 'Once you submit your application, our volunteers pack your box within 5 business days. Standard shipping within Canada typically takes an additional 3 to 7 business days depending on your province or territory.'
  },
  {
    question: 'Is there really no cost?',
    answer: 'Yes, it is 100% free! Thanks to the generous support of our donors, community partners, and volunteers, we cover all costs for the items and shipping.'
  }
];

export default function CarePackFAQ({ data }) {
  const title = data?.faq_title || "Frequently Asked Questions";
  const description = data?.faq_description || "Everything you need to know about our Welcome Care Packs.";
  const faqsList = (data?.faqs && data.faqs.length > 0) ? data.faqs : FAQS;
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-20 px-6 bg-[#FAFAFA]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-pride-navy mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-pride-muted">
            Everything you need to know about our Welcome Care Packs.
          </p>
        </div>

        <div className="space-y-4">
          {faqsList.map((faq, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-2xl overflow-hidden transition-all duration-300 border ${openIndex === index ? 'border-pride-purple/30 shadow-md' : 'border-gray-100 shadow-sm'}`}
            >
              <button
                className="w-full text-left px-6 py-5 flex items-center justify-between font-bold text-pride-navy focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              >
                <span>{faq.question}</span>
                <span className={`transform transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-pride-purple' : 'text-gray-400'}`}>
                  ▼
                </span>
              </button>
              
              <div 
                className={`transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="px-6 pb-5 text-pride-muted leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}