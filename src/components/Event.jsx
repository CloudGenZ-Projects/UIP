import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { apiService } from '../api/apiService';

const formatDateParts = (dateString) => {
  if (!dateString) return { day: '', month: '' };
  const [year, month, day] = dateString.split('-');
  const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  return {
    day: parseInt(day, 10),
    month: monthNames[parseInt(month, 10) - 1]
  };
};

const formatTime12hr = (timeString) => {
  if (!timeString) return '';
  const [hour, minute] = timeString.split(':');
  const h = parseInt(hour, 10);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 || 12;
  return `${h12}:${minute} ${ampm}`;
};

const featuredCardStyle = {
  border: '2px solid transparent',
  backgroundOrigin: 'border-box',
  backgroundClip: 'padding-box, border-box',
  backgroundImage: 'linear-gradient(#fff, #fff), linear-gradient(135deg, #FF6B6B, #A855F7, #3B82F6)',
};

export default function Events() {
  const [eventsData, setEventsData] = useState([]);
  const [visibleEvents, setVisibleEvents] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [isFiltered, setIsFiltered] = useState(false); 

  // Registration Modal States
  const [selectedEventForReg, setSelectedEventForReg] = useState(null);
  const [regData, setRegData] = useState({ firstName: '', lastName: '', email: '', phone: '', guestStatus: 'Attending Alone' });
  const [regSuccess, setRegSuccess] = useState(false);

  const [currentDate, setCurrentDate] = useState(new Date());

  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const localTodayStr = `${yyyy}-${mm}-${dd}`;

  const getDefaultEvents = (data) => {
    if (!Array.isArray(data)) return [];
    const upcomingEvents = data.filter(ev => ev.date >= localTodayStr);
    const groupedByDate = upcomingEvents.reduce((acc, ev) => {
      if (!acc[ev.date]) {
        acc[ev.date] = ev;
      } else {
        if (ev.time > acc[ev.date].time) {
          acc[ev.date] = ev;
        }
      }
      return acc;
    }, {});
    const defaultEventsList = Object.values(groupedByDate)
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, 3);
    return defaultEventsList;
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await apiService.getEvents();
        const evts = Array.isArray(response.data) ? response.data : [];
        setEventsData(evts);
        setVisibleEvents(getDefaultEvents(evts));
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleClearSelection = () => {
    setVisibleEvents(getDefaultEvents(eventsData));
    setIsFiltered(false);
  };

  const handlePrevMonth = () => setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  const handleNextMonth = () => setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));

  const currentYear = currentDate.getFullYear();
  const currentMonthIdx = currentDate.getMonth();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const currentMonthName = monthNames[currentMonthIdx];
  const daysInMonth = new Date(currentYear, currentMonthIdx + 1, 0).getDate();
  const startDayOfMonth = new Date(currentYear, currentMonthIdx, 1).getDay();

  // Registration Handlers
  const handleRegChange = (e) => setRegData({ ...regData, [e.target.name]: e.target.value });
  
  const submitRegistration = async (e) => {
    e.preventDefault();
    try {
      await apiService.registerForEvent(selectedEventForReg.id, regData);
      setRegSuccess(true);
      setTimeout(() => {
        setRegSuccess(false);
        setSelectedEventForReg(null);
        setRegData({ firstName: '', lastName: '', email: '', phone: '', guestStatus: 'Attending Alone' });
      }, 2500);
    } catch (error) {
      alert("Registration failed. Please try again.");
    }
  };

  const isEventInCurrentMonth = (dateString) => {
    if (!dateString) return false;
    const [y, m] = dateString.split('-');
    return parseInt(y, 10) === currentYear && (parseInt(m, 10) - 1) === currentMonthIdx;
  };

  let displayedEvents = visibleEvents.filter(ev => {
    if (ev.inAppRegistration) {
      return isEventInCurrentMonth(ev.date);
    }
    return true; 
  });

  if (!isFiltered) {
    const currentMonthInApp = eventsData.filter(ev => ev.inAppRegistration && isEventInCurrentMonth(ev.date));
    currentMonthInApp.forEach(mn => {
      if (!displayedEvents.some(ev => ev.id === mn.id)) {
        displayedEvents.push(mn);
      }
    });
    displayedEvents.sort((a, b) => a.date.localeCompare(b.date));
  }

  return (
    <section id="events" className="py-[100px] bg-[#FAFAFA] px-6">
      <div className="max-w-[1200px] mx-auto">
        <p className="text-center text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#A855F7] font-bold tracking-[2px] uppercase text-sm mb-2">
          What's Coming Up
        </p>
        <h2 className="text-center text-[2.5rem] font-[800] leading-[1.2] mb-[48px]">
          Upcoming Events
        </h2>

        <div className="grid lg:grid-cols-[1fr_360px] gap-12 items-start">
          <div className="relative pl-[60px]">
            <svg className="absolute left-0 top-0 w-[60px] h-full" viewBox="0 0 60 600" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M30,0 C60,100 0,200 30,300 C60,400 0,500 30,600" fill="none" stroke="url(#curveGrad)" strokeWidth="3" strokeLinecap="round" />
              <defs>
                <linearGradient id="curveGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FF6B6B" />
                  <stop offset="50%" stopColor="#A855F7" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
              </defs>
            </svg>

            <div className="flex flex-col gap-10">
              {isLoading ? (
                <div className="flex justify-center py-10">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#A855F7] border-solid"></div>
                </div>
              ) : displayedEvents.length === 0 ? (
                <div className="text-center text-slate-500 font-medium py-10 bg-white rounded-[20px] shadow-sm">
                  No events found for this selection.
                </div>
              ) : (
                displayedEvents.map((ev, i) => {
                  const { day, month } = formatDateParts(ev.date);

                  return (
                    <motion.div
                      id={`event-${ev.date}`}
                      key={ev.id || i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className={`relative ${ev.featured ? 'featured' : ''} scroll-mt-32`}
                    >
                      <div className={`absolute left-[-48px] top-6 rounded-full border-[3px] border-[#f1f5f9] bg-gradient-to-br from-[#FF6B6B] to-[#A855F7] z-10 transition-all 
                        ${ev.featured ? 'w-[22px] h-[22px] left-[-51px] top-[21px] shadow-[0_0_0_6px_rgba(168,85,247,0.2)]' : 'w-4 h-4'}`}
                      />

                      <div
                        className="bg-white p-7 rounded-[20px] flex flex-col md:flex-row gap-5 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:translate-x-1.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all duration-300"
                        style={ev.featured ? featuredCardStyle : {}}
                      >
                        <div className="bg-gradient-to-br from-[rgba(255,107,107,0.08)] to-[rgba(168,85,247,0.08)] p-3 rounded-[16px] flex flex-row md:flex-col items-center justify-center shrink-0 min-w-[64px] gap-2 md:gap-0">
                          <span className="text-[1.8rem] font-black text-[#A855F7] leading-none">{day}</span>
                          <span className="text-[0.75rem] font-bold text-slate-400 tracking-wider uppercase">{month}</span>
                        </div>

                        <div className="flex-1">
                          <h3 className="text-[1.1rem] font-bold text-slate-800 mb-1.5 flex items-center gap-2">
                            {ev.title}
                          </h3>
                          <p className="text-slate-500 text-[0.9rem] leading-[1.6] mb-2.5">{ev.desc}</p>
                          <div className="flex flex-wrap gap-4 text-[0.8rem] text-slate-400">
                            <span className="flex items-center gap-1">📍 {ev.loc}</span>
                            <span className="flex items-center gap-1">🕐 {formatTime12hr(ev.time)}</span>
                          </div>
                          
                          {(ev.featured || ev.link || ev.inAppRegistration) && (
                            <div className="flex flex-col gap-2 mt-3 items-start">
                              {ev.featured && (
                                <span className="px-3.5 py-1 bg-gradient-to-r from-[#FF6B6B] to-[#A855F7] text-white rounded-full text-[0.75rem] font-bold shadow-sm">
                                  Featured Event
                                </span>
                              )}

                              {ev.inAppRegistration ? (
                                <button
                                  onClick={() => setSelectedEventForReg(ev)}
                                  className="px-4 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:shadow-lg hover:-translate-y-0.5 rounded-full text-[0.8rem] font-bold transition-all inline-flex items-center gap-1"
                                >
                                  Register for Event
                                </button>
                              ) : ev.link ? (
                                <a
                                  href={ev.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-3.5 py-1 border border-slate-200 text-slate-600 hover:text-[#A855F7] hover:border-[#A855F7] rounded-full text-[0.75rem] font-bold transition-colors inline-flex items-center gap-1"
                                >
                                  {ev.buttonText || 'Event Link'} <span className="text-[10px]">↗</span>
                                </a>
                              ) : null}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="sticky top-[100px]">
            <div
              className="bg-white p-7 rounded-[24px] shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
              style={{
                border: '2px solid transparent',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
                backgroundImage: 'linear-gradient(#fff, #fff), linear-gradient(135deg, #FF6B6B22, #A855F722, #3B82F622)',
              }}
            >
              <div className="flex justify-between items-center mb-5">
                <button onClick={handlePrevMonth} className="p-1.5 text-slate-400 hover:text-[#FF6B6B] transition-colors rounded-full hover:bg-slate-50">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                </button>
                <div className="text-center font-bold text-[1.1rem] bg-clip-text text-transparent bg-gradient-to-r from-[#FF6B6B] to-[#A855F7]">
                  {currentMonthName} {currentYear}
                </div>
                <button onClick={handleNextMonth} className="p-1.5 text-slate-400 hover:text-[#A855F7] transition-colors rounded-full hover:bg-slate-50">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center text-[0.8rem]">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => <span key={d} className="font-bold p-2 text-slate-800 text-[0.7rem]">{d}</span>)}
                {[...Array(startDayOfMonth)].map((_, i) => <span key={`empty-${i}`} />)}

                {Array.from({ length: daysInMonth }, (_, i) => {
                  const day = i + 1;
                  const calendarDateStr = `${currentYear}-${String(currentMonthIdx + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                  const dayEvents = Array.isArray(eventsData) ? eventsData.filter(ev => ev.date === calendarDateStr) : [];
                  const hasEvent = dayEvents.length > 0;
                  const isFeatured = hasEvent && dayEvents.some(ev => ev.featured);
                  const isToday = calendarDateStr === localTodayStr;
                  const isPast = calendarDateStr < localTodayStr;
                  const isFuture = calendarDateStr > localTodayStr;

                  let colorClass = 'text-slate-500 hover:bg-slate-50 cursor-default';
                  if (hasEvent) {
                    if (isPast) { colorClass = 'bg-slate-200 text-slate-500 opacity-75 cursor-pointer hover:bg-slate-300 transition-colors shadow-inner'; } 
                    else if (isToday) { colorClass = 'bg-[#3B82F6] text-white font-bold cursor-pointer shadow-md animate-pulse ring-2 ring-blue-200'; } 
                    else if (isFuture) { colorClass = isFeatured ? 'bg-gradient-to-br from-[#FF6B6B] to-[#A855F7] text-white font-bold shadow-md cursor-pointer hover:scale-110 transform transition-all' : 'bg-purple-100 text-[#A855F7] font-bold cursor-pointer hover:bg-purple-200 transition-colors'; }
                  } else if (isToday) { colorClass = 'text-slate-800 font-bold border border-slate-300 bg-slate-50'; }

                  const hoverTitle = hasEvent ? dayEvents.map(ev => ev.title).join(' | ') : isToday ? "Today" : "";

                  return (
                    <span
                      key={day}
                      onClick={() => {
                        if (hasEvent) {
                          setVisibleEvents(dayEvents);
                          setIsFiltered(true);
                          setTimeout(() => {
                            const targetElement = document.getElementById(`event-${calendarDateStr}`);
                            if (targetElement) targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                          }, 100);
                        }
                      }}
                      className={`relative group p-2 rounded-lg transition-all ${colorClass}`}
                    >
                      {day}
                      {hoverTitle && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[200px] px-3 py-2 bg-slate-800 text-white text-[0.7rem] font-medium leading-tight rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[60] pointer-events-none text-center">
                          {hoverTitle}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-slate-800"></div>
                        </div>
                      )}
                    </span>
                  );
                })}
              </div>
              {isFiltered && (
                <div className="mt-5 text-center">
                  <button onClick={handleClearSelection} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-[0.8rem] font-bold rounded-lg transition-colors duration-300">
                    Clear Selection
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* --- REGISTRATION POPUP MODAL --- */}
      <AnimatePresence>
        {selectedEventForReg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm px-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-[2rem] p-8 md:p-10 max-w-sm w-full shadow-2xl border border-slate-100 relative overflow-hidden"
            >
              <button onClick={() => setSelectedEventForReg(null)} className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center bg-slate-100 text-slate-500 rounded-full hover:bg-slate-200 font-bold">✕</button>

              {regSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">🎉</div>
                  <h3 className="text-2xl font-black text-slate-800 mb-2">Registered!</h3>
                  <p className="text-slate-500 text-sm">We've saved your spot for {selectedEventForReg.title}. See you there!</p>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <span className="text-[10px] bg-blue-100 text-blue-600 px-2 py-1 rounded-full uppercase font-bold mb-3 inline-block tracking-wider">Event Registration</span>
                    <h3 className="text-2xl font-black text-slate-900 leading-tight">{selectedEventForReg.title}</h3>
                    <p className="text-slate-500 text-sm mt-1">🗓️ {formatDateParts(selectedEventForReg.date).month} {formatDateParts(selectedEventForReg.date).day} @ {formatTime12hr(selectedEventForReg.time)}</p>
                  </div>
                  
                  <form onSubmit={submitRegistration} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <input required type="text" name="firstName" placeholder="First Name" value={regData.firstName} onChange={handleRegChange} className="w-full p-3 rounded-xl border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-[#A855F7] bg-slate-50 focus:bg-white outline-none transition-all text-sm font-medium" />
                      <input required type="text" name="lastName" placeholder="Last Name" value={regData.lastName} onChange={handleRegChange} className="w-full p-3 rounded-xl border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-[#A855F7] bg-slate-50 focus:bg-white outline-none transition-all text-sm font-medium" />
                    </div>
                    <div>
                      <input required type="email" name="email" placeholder="Email Address" value={regData.email} onChange={handleRegChange} className="w-full p-3 rounded-xl border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-[#A855F7] bg-slate-50 focus:bg-white outline-none transition-all text-sm font-medium" />
                    </div>
                    <div>
                      <input type="tel" name="phone" placeholder="Phone Number (Optional)" value={regData.phone} onChange={handleRegChange} className="w-full p-3 rounded-xl border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-[#A855F7] bg-slate-50 focus:bg-white outline-none transition-all text-sm font-medium" />
                    </div>
                    <div>
                      <select required name="guestStatus" value={regData.guestStatus} onChange={handleRegChange} className="w-full p-3 rounded-xl border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-[#A855F7] bg-slate-50 focus:bg-white outline-none transition-all text-sm font-medium text-slate-700">
                        <option value="Attending Alone">Attending Alone</option>
                        <option value="Bringing 1 Guest">Bringing 1 Guest</option>
                        <option value="Bringing 2 Guests">Bringing 2 Guests</option>
                        <option value="Bringing 3+ Guests">Bringing 3+ Guests</option>
                      </select>
                    </div>
                    <button type="submit" className="w-full py-3.5 mt-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                      Confirm Registration
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}