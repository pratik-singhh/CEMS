import { useEffect, useState } from 'react';
import type { Event } from '../types/event';
import { fetchEvents, deleteEvent } from '../api/fetchEvents';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function AdminDashboard() {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    const payload = token && JSON.parse(atob(token.split('.')[1]));
    const { role } = payload !== null ? payload : { role: 'student' };
    if (role !== 'admin') {
      navigate('/');
      return;
    }

    async function tryFetch() {
      setLoading(true);
      try {
        const data = await fetchEvents();
        setEvents(data || []);
      } catch (error) {
        console.error(error);
        setIsError(true);
        setMessage('Failed to load dashboard data');
      }
      setLoading(false);
    }
    tryFetch();
  }, [navigate]);

  const tryDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
      return;
    }

    try {
      await deleteEvent(id);
      setEvents(prev => prev.filter(item => item.id !== id));
      setMessage('Event deleted successfully');
      setIsError(false);
    } catch (error) {
      console.error(error);
      setMessage('Failed to delete event');
      setIsError(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Navbar />

      {/* Hero Section */}
      <section className="relative px-8 py-16 lg:py-24 overflow-hidden bg-gradient-to-br from-[#0a0c2e] via-primary-container to-[#0a0c2e] mt-[72px]">
        <div className="max-w-7xl mx-auto z-10 relative">
          <span className="inline-block bg-primary-fixed text-on-primary-fixed px-4 py-1.5 rounded-full text-xs font-bold font-headline uppercase tracking-wide mb-6">
            Admin Control Center
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold font-headline tracking-tight mb-6 text-white">
            Manage your <span className="text-primary-fixed-dim">campus events</span>
          </h2>
          <div className="flex flex-wrap gap-4 mt-8">
            <button
              onClick={() => navigate('/create-event')}
              className="flex items-center gap-2 bg-primary-fixed text-on-primary-fixed px-6 py-3 rounded-xl font-bold text-sm shadow-lg hover:shadow-primary-fixed/20 transition-all hover:-translate-y-0.5"
            >
              <span className="material-symbols-outlined">add_circle</span>
              Create New Event
            </button>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-8 py-12 flex-grow w-full">
        {/* Status Toast */}
        {message && (
          <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold text-sm shadow-md mb-8 ${isError
            ? 'bg-error-container text-on-error-container'
            : 'bg-tertiary-fixed text-on-tertiary-fixed'
            }`}>
            <span className="material-symbols-outlined text-lg">
              {isError ? 'error' : 'check_circle'}
            </span>
            {message}
            <button onClick={() => setMessage('')} className="ml-auto hover:opacity-70 transition-opacity">
              <span className="material-symbols-outlined text-base">close</span>
            </button>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/10 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined">calendar_today</span>
            </div>
            <div>
              <p className="text-on-surface-variant text-xs font-bold uppercase tracking-wider">Total Events</p>
              <h3 className="text-2xl font-black text-primary">{events.length}</h3>
            </div>
          </div>
        </div>

        {/* Event List */}
        <div className="flex items-center justify-between mb-8 border-b border-outline-variant/20 pb-4">
          <h2 className="text-2xl font-extrabold text-primary font-headline">Event Management</h2>
        </div>

        {loading ? (
          <div className="flex flex-col justify-center items-center py-20 gap-4">
            <div className="w-10 h-10 rounded-full border-4 border-primary-fixed border-t-primary animate-spin"></div>
            <p className="text-on-surface-variant font-medium text-sm">Loading dashboard...</p>
          </div>
        ) : events.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {events.map((item) => (
              <div
                key={item.id}
                className="group flex flex-col md:flex-row md:items-center justify-between bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/10 shadow-sm hover:shadow-md transition-all gap-6"
              >
                <div className="flex-grow max-w-2xl">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-primary font-headline">{item.title}</h3>
                    <span className="bg-secondary-fixed text-on-secondary-fixed text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">
                      {item.registrations || 0} Registrations
                    </span>
                  </div>
                  <p className="text-on-surface-variant text-sm line-clamp-1">{item.description}</p>
                </div>

                <div className="flex items-center gap-3 border-t md:border-t-0 pt-4 md:pt-0 border-outline-variant/10">
                  <button
                    onClick={() => navigate(`/edit-event/${item.id}`)}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-secondary/10 text-secondary hover:bg-secondary hover:text-on-secondary transition-all font-bold text-sm"
                  >
                    <span className="material-symbols-outlined text-lg">edit</span>
                    Edit
                  </button>
                  <button
                    onClick={() => tryDelete(item.id)}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-error/10 text-error hover:bg-error hover:text-on-error transition-all font-bold text-sm"
                  >
                    <span className="material-symbols-outlined text-lg">delete</span>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <span className="material-symbols-outlined text-outline-variant mb-4" style={{ fontSize: '48px' }}>event_busy</span>
            <h3 className="text-lg font-bold text-primary font-headline mb-1">No Events Found</h3>
            <p className="text-on-surface-variant text-sm">Start by creating your first campus event.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default AdminDashboard;
