import React, { useState } from 'react';
import { getMediaUrl } from '../../services/api';

const PALETTES = [
  { bgColor: 'bg-indigo-50/60', accent: 'text-indigo-600' },
  { bgColor: 'bg-rose-50/60', accent: 'text-rose-600' },
  { bgColor: 'bg-teal-50/60', accent: 'text-teal-600' },
  { bgColor: 'bg-amber-50/60', accent: 'text-amber-600' },
  { bgColor: 'bg-emerald-50/60', accent: 'text-emerald-600' },
];

export default function TeamBios({ data }) {
  const [expandedCards, setExpandedCards] = useState({});
  const MAX_LENGTH = 280;

  const teamMembers = data?.team_members || [];
  if (!teamMembers || teamMembers.length === 0) return null;

  const toggleExpand = (id) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {teamMembers.map((person, index) => {
            const memberId = person.id || String(index);
            const palette = PALETTES[index % PALETTES.length];
            const resolvedImg = getMediaUrl(person.image);
            const bioText = person.bio || '';
            const isLongText = bioText.length > MAX_LENGTH;
            const isExpanded = expandedCards[memberId];

            const truncatedBio = isLongText
              ? bioText.slice(0, MAX_LENGTH).trim() + '...'
              : bioText;

            return (
              <div
                key={memberId}
                className={`h-full p-8 md:p-12 rounded-[3rem] ${palette.bgColor} border border-transparent hover:border-slate-100 transition-all shadow-sm flex flex-col relative overflow-hidden`}
              >
                {/* Decorative Gradient Bar at the bottom */}
                <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-[#FF6B6B] via-[#A855F7] to-[#3B82F6]"></div>

                {/* Header: Profile Image & Role Badge */}
                <div className="flex flex-col mb-8 gap-5">
                  {resolvedImg ? (
                    <img
                      src={resolvedImg}
                      alt={person.name}
                      className="w-full aspect-square sm:w-72 sm:h-72 lg:w-64 lg:h-64 xl:w-72 xl:h-72 object-cover object-top rounded-3xl shadow-sm border-4 border-white"
                    />
                  ) : (
                    <div className="w-full aspect-square sm:w-72 sm:h-72 lg:w-64 lg:h-64 xl:w-72 xl:h-72 bg-white/60 rounded-3xl flex items-center justify-center text-4xl shadow-sm border-4 border-white">
                      🏳️‍🌈
                    </div>
                  )}
                  {person.role && (
                    <div className="flex">
                      <span className="bg-white px-4 py-2 rounded-full font-black text-[0.65rem] md:text-xs text-slate-900 uppercase tracking-[0.2em] shadow-sm text-center">
                        {person.role}
                      </span>
                    </div>
                  )}
                </div>

                {/* Title (Name) & Description (Bio) */}
                <div className="flex-grow flex flex-col">
                  {person.name && (
                    <h3 className={`text-3xl md:text-4xl font-black text-slate-900 leading-tight italic mb-4 ${palette.accent}`}>
                      {person.name}
                    </h3>
                  )}

                  {bioText && (
                    <p className="text-slate-600 text-lg leading-relaxed whitespace-pre-line mb-4">
                      {isExpanded ? bioText : truncatedBio}
                    </p>
                  )}

                  {isLongText && (
                    <button
                      onClick={() => toggleExpand(memberId)}
                      className={`mt-auto self-start font-black text-sm uppercase tracking-widest hover:opacity-70 transition-opacity ${palette.accent}`}
                    >
                      {isExpanded ? 'Read Less' : 'Read More'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
