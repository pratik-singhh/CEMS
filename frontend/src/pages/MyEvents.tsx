import { useEffect, useState } from 'react';
import type { Event } from '../types/event';
import { useNavigate } from 'react-router-dom';
import { fetchMyEvents } from '../api/fetchEvents';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function MyEvents() {
  const navigate = useNavigate();

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

  const [loading, setLoading] = useState<boolean>(false);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    async function tryFetch() {
      try {
        setLoading(true);
        const data: Event[] = await fetchMyEvents();
        setEvents(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        navigate('/login');
      }
    }
    tryFetch();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Navbar />

      <main className="max-w-7xl mx-auto px-8 pt-28 pb-16 flex-grow w-full">
        {/* Page Header */}
        <header className="mb-16">
          <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-primary tracking-tight mb-4">
            My Events
          </h2>
          <p className="text-on-surface-variant max-w-2xl text-lg leading-relaxed">
            Manage your event registrations. Your digital gateway to the vibrant campus life.
          </p>
        </header>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col justify-center items-center py-24 gap-4">
            <div className="w-12 h-12 rounded-full border-4 border-primary-fixed border-t-primary animate-spin"></div>
            <p className="text-on-surface-variant font-medium text-sm">Loading your events...</p>
          </div>
        )}

        {/* Events */}
        {!loading && (
          <section>
            <div className="flex items-center justify-between mb-10">
              <h3 className="font-headline text-2xl font-bold text-primary flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>confirmation_number</span>
                Registered Events
              </h3>
              <span className="bg-primary-fixed text-on-primary-fixed px-4 py-1 rounded-full text-sm font-bold">
                {events.length} Events
              </span>
            </div>

            {events.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((item: Event) => (
                  <div
                    key={item.id}
                    className="group relative bg-surface-container-lowest rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 border border-outline-variant/10 hover:-translate-y-1"
                  >
                    {/* Card Header */}
                    <div className="relative h-36 bg-gradient-to-br from-primary to-primary-container flex items-center justify-center overflow-hidden">
                      <div className="text-center text-white/10">
                        <span className="material-symbols-outlined" style={{ fontSize: '60px' }}>confirmation_number</span>
                      </div>
                      <div className="absolute top-4 left-4 bg-surface-container-lowest px-3 py-1.5 rounded-lg shadow-sm">
                        <p className="font-headline text-xs font-bold text-secondary text-center uppercase tracking-tighter">{formatMonth(item.event_time)}</p>
                        <p className="font-headline text-xl font-black text-primary text-center leading-none">{formatDay(item.event_time)}</p>
                      </div>
                      <div className="absolute top-4 right-4 bg-tertiary-fixed text-on-tertiary-fixed px-2.5 py-1 rounded text-[10px] font-bold tracking-widest uppercase shadow-md flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                        REGISTERED
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6">
                      <h4 className="font-headline text-xl font-extrabold text-primary mb-2 leading-tight">{item.title}</h4>
                      <p className="text-on-surface-variant text-sm line-clamp-2 mb-4 leading-relaxed">{item.description}</p>
                      <div className="flex items-center gap-2 text-outline text-sm">
                        <span className="material-symbols-outlined text-sm">schedule</span>
                        {formatDate(item.event_time)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-surface-container-lowest rounded-3xl border border-outline-variant/10">
                <span className="material-symbols-outlined text-outline-variant mb-4" style={{ fontSize: '64px' }}>event_busy</span>
                <h3 className="text-xl font-bold text-primary font-headline mb-2">No Registered Events</h3>
                <p className="text-on-surface-variant mb-6">You haven't registered for any events yet.</p>
                <button
                  onClick={() => navigate('/')}
                  className="bg-gradient-to-r from-primary to-primary-container text-on-primary px-8 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 active:scale-95 transition-all"
                >
                  Browse Events
                </button>
              </div>
            )}
          </section>
        )}

        {/* Bottom Nav */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 rounded-full border border-outline-variant/30 text-primary font-bold hover:bg-surface-container-high transition-colors text-sm flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Back to All Events
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default MyEvents;
