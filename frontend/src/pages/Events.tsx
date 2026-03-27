import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Event } from '../types/event';
import { fetchEvents, registerEvent, fetchMyEvents } from '../api/fetchEvents';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Events() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDay = (dateString: string) => {
    const date = new Date(dateString);
    return date.getDate().toString().padStart(2, '0');
  };

  const formatMonth = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', { month: 'short' }).toUpperCase();
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [iserror, setError] = useState<boolean>(false);
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [registeredIds, setRegisteredIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem('token');
    setLoggedIn(!!token);
    async function tryFetch() {
      try {
        const data = await fetchEvents();
        setEvents(data || []);

        // Fetch registered events if logged in
        if (token) {
          try {
            const myEvents = await fetchMyEvents();
            if (myEvents) {
              // Use event_id because the JOIN gives us registrations.id (not events.id)
              setRegisteredIds(new Set(myEvents.map((e: Record<string, unknown>) => (e.event_id ?? e.id) as number)));
            }
          } catch {
            // ignore — user just won't see registered status
          }
        }
      } catch (err) {
        console.error(err);
        setError(true);
        setMessage('Failed to load events. Is the server running?');
      }
      setLoading(false);
    }
    tryFetch();
  }, []);

  const tryRegister = async (event_id: number) => {
    try {
      const response = await registerEvent(event_id);
      setError(false);
      setMessage('Event Registered Successfully');
      setRegisteredIds(prev => new Set(prev).add(event_id));
      console.log(response);
    } catch (error: unknown) {
      console.error(error);
      setError(true);
      setMessage(error instanceof Error ? error.message : 'Registration failed');
    }
  };

  const categoryColors = [
    { bg: 'bg-tertiary-fixed', text: 'text-on-tertiary-fixed', label: 'TECH' },
    { bg: 'bg-secondary-fixed', text: 'text-on-secondary-fixed', label: 'CULTURAL' },
    { bg: 'bg-primary-container', text: 'text-white', label: 'WORKSHOP' },
    { bg: 'bg-primary-fixed', text: 'text-on-primary-fixed', label: 'SEMINAR' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Navbar />

      {/* Hero Section */}
      <section className="relative px-8 py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-[#0a0c2e] via-primary-container to-[#0a0c2e] mt-[72px]">
        <div className="max-w-7xl mx-auto z-10 relative">
          <span className="inline-block bg-primary-fixed text-on-primary-fixed px-4 py-1.5 rounded-full text-xs font-bold font-headline uppercase tracking-wide mb-6">
            CAMPUS LIVE UPDATES
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold font-headline tracking-tight mb-6 leading-[1.1] text-white max-w-3xl">
            What's new happening on <span className="text-primary-fixed-dim">campus?</span>
          </h2>
          <p className="text-lg md:text-xl max-w-lg mb-12 font-medium leading-relaxed text-slate-300">
            Join your community. From hackathons to cultural nights, everything you need is right here.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 max-w-xl">
            <div className="relative flex-grow w-full">
              <span className="material-symbols-outlined text-slate-400 absolute left-4 top-1/2 -translate-y-1/2">search</span>
              <input
                className="w-full border rounded-xl pl-12 pr-4 py-4 font-medium outline-none bg-white/10 border-white/20 text-white placeholder:text-slate-400 backdrop-blur-md focus:ring-2 focus:ring-primary-fixed-dim transition-all"
                placeholder="Search for events..."
                type="text"
                readOnly
              />
            </div>
          </div>
        </div>
      </section>

      {/* Toast message */}
      {message && (
        <div className="max-w-7xl mx-auto w-full px-8 mt-6">
          <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold text-sm shadow-lg ${
            iserror
              ? 'bg-error-container text-on-error-container'
              : 'bg-tertiary-fixed text-on-tertiary-fixed'
          }`}>
            <span className="material-symbols-outlined text-lg">
              {iserror ? 'error' : 'check_circle'}
            </span>
            {message}
            <button onClick={() => setMessage('')} className="ml-auto hover:opacity-70 transition-opacity">
              <span className="material-symbols-outlined text-base">close</span>
            </button>
          </div>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex flex-col justify-center items-center py-32 gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-primary-fixed border-t-primary animate-spin"></div>
          <p className="text-on-surface-variant font-medium text-sm">Loading events...</p>
        </div>
      )}

      {/* Events Grid */}
      {!loading && (
        <main className="max-w-7xl mx-auto px-8 py-16 flex-grow w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6 border-b border-outline-variant/20 pb-6">
            <h2 className="text-3xl font-extrabold text-primary font-headline">All Events</h2>
            <span className="bg-primary-fixed text-on-primary-fixed px-4 py-1.5 rounded-full text-sm font-bold">
              {events.length} Events
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {events.map((item, index) => {
              const cat = categoryColors[index % categoryColors.length];
              return (
                <div
                  key={item.id}
                  className="group flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden shadow-lg shadow-primary/5 transition-all hover:-translate-y-2 border border-outline-variant/10"
                >
                  {/* Card Header with Date Badge */}
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary-container to-primary flex items-center justify-center">
                    <div className="text-center text-white/20">
                      <span className="material-symbols-outlined" style={{ fontSize: '80px' }}>event</span>
                    </div>
                    <div className="absolute top-4 left-4 bg-surface-container-lowest/90 backdrop-blur-md px-4 py-2 rounded-lg text-center shadow-md">
                      <span className="block text-primary font-bold text-lg leading-tight">{formatDay(item.event_time)}</span>
                      <span className="block text-outline text-xs font-bold uppercase tracking-tighter">{formatMonth(item.event_time)}</span>
                    </div>
                    <div className={`absolute top-4 right-4 ${cat.bg} ${cat.text} px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 uppercase tracking-widest shadow-md`}>
                      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                      {cat.label}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 md:p-8 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 text-secondary font-bold text-xs uppercase tracking-widest mb-3">
                      <span className="material-symbols-outlined text-sm">schedule</span>
                      {formatTime(item.event_time)}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-primary mb-3 leading-tight font-headline">{item.title}</h3>
                    <p className="text-on-surface-variant text-sm mb-6 line-clamp-2 leading-relaxed">{item.description}</p>

                    {isLoggedIn ? (
                      registeredIds.has(item.id) ? (
                        <div className="mt-auto w-full bg-tertiary-fixed text-on-tertiary-fixed py-3.5 rounded-xl font-bold tracking-tight text-center flex items-center justify-center gap-2">
                          <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                          Registered
                        </div>
                      ) : (
                        <button
                          onClick={() => tryRegister(item.id)}
                          className="mt-auto w-full bg-gradient-to-r from-primary to-primary-container text-on-primary py-3.5 rounded-xl font-bold tracking-tight shadow-xl shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98] transition-all"
                        >
                          Register Now
                        </button>
                      )
                    ) : (
                      <div className="mt-auto flex items-center gap-2 text-outline text-sm">
                        <span className="material-symbols-outlined text-sm">calendar_today</span>
                        {formatDate(item.event_time)}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {events.length === 0 && !loading && (
            <div className="text-center py-20">
              <span className="material-symbols-outlined text-outline-variant mb-4" style={{ fontSize: '64px' }}>event_busy</span>
              <h3 className="text-xl font-bold text-primary font-headline mb-2">No Events Found</h3>
              <p className="text-on-surface-variant">Check back later for upcoming events.</p>
            </div>
          )}
        </main>
      )}

      {/* Mobile bottom nav for logged-in users */}
      {isLoggedIn && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface-container-lowest border-t border-outline-variant/20 px-4 py-3 flex justify-around items-center">
          <button onClick={() => navigate('/')} className="flex flex-col items-center gap-1 text-primary">
            <span className="material-symbols-outlined text-xl">home</span>
            <span className="text-[10px] font-bold">Home</span>
          </button>
          <button onClick={() => navigate('/my-events')} className="flex flex-col items-center gap-1 text-on-surface-variant">
            <span className="material-symbols-outlined text-xl">confirmation_number</span>
            <span className="text-[10px] font-bold">My Events</span>
          </button>
          <button onClick={() => navigate('/create-event')} className="flex flex-col items-center gap-1 text-on-surface-variant">
            <span className="material-symbols-outlined text-xl">add_circle</span>
            <span className="text-[10px] font-bold">Create</span>
          </button>
          <button onClick={() => { localStorage.removeItem('token'); setLoggedIn(false); navigate('/login'); }} className="flex flex-col items-center gap-1 text-on-surface-variant">
            <span className="material-symbols-outlined text-xl">logout</span>
            <span className="text-[10px] font-bold">Logout</span>
          </button>
        </div>
      )}

      {!isLoggedIn && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface-container-lowest border-t border-outline-variant/20 px-4 py-3 flex justify-around items-center">
          <button onClick={() => navigate('/')} className="flex flex-col items-center gap-1 text-primary">
            <span className="material-symbols-outlined text-xl">home</span>
            <span className="text-[10px] font-bold">Home</span>
          </button>
          <button onClick={() => navigate('/login')} className="flex flex-col items-center gap-1 text-on-surface-variant">
            <span className="material-symbols-outlined text-xl">login</span>
            <span className="text-[10px] font-bold">Login</span>
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Events;
