import React from 'react';
import { Users, Calendar, Heart, MessageSquare } from 'lucide-react';

const ICON_MAP = {
  users: <Users className="text-pink-500" />,
  calendar: <Calendar className="text-purple-500" />,
  heart: <Heart className="text-red-500" />,
  message: <MessageSquare className="text-blue-500" />
};

export default function VolunteerRoles({ heading, subtitle, roles }) {
  if (!roles || roles.length === 0) return null;

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-[#0f0a2e] mb-4">{heading}</h2>
          {subtitle && <p className="text-gray-500 text-lg">{subtitle}</p>}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {roles.map((role, i) => (
            <div key={i} className="p-8 rounded-3xl border border-gray-100 bg-gray-50/50 hover:shadow-xl transition-all group hover:-translate-y-2">
              <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {ICON_MAP[role.iconType] || <Users className="text-pink-500" />}
              </div>
              <h3 className="text-xl font-bold text-[#0f0a2e] mb-3">{role.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{role.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
