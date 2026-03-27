import { Link, useNavigate } from 'react-router-dom';
import { createEvent } from '../api/fetchEvents';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function CreateEvent() {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');
  const [event_time, setEventTime] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // Auth guard — redirect to login if not authenticated
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const tryCreate = async (title: string, description: string, event_time: string) => {
    try {
      setLoading(true);
      const isoDate = new Date(event_time).toISOString();
      const result = await createEvent(title, description, isoDate);
      setTitle('');
      setDescription('');
      setEventTime('');
      setMessage('Event Created Successfully');
      setIsError(false);
      console.log(result);
      navigate('/');
    } catch (error: unknown) {
      console.error(error);
      setMessage(error instanceof Error ? error.message : 'Error Creating Event');
      setIsError(true);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Navbar />

      <main className="max-w-3xl mx-auto px-8 pt-28 pb-16 flex-grow w-full">
        {/* Page Header */}
        <header className="mb-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary font-semibold text-sm mb-6 hover:underline"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Back to Home
          </Link>
          <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-primary tracking-tight mb-3">
            Create Event
          </h2>
          <p className="text-on-surface-variant text-lg leading-relaxed">
            Fill in the details below to create a new campus event.
          </p>
        </header>

        {/* Toast */}
        {message && (
          <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold text-sm shadow-lg mb-8 ${
            isError
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

        {/* Form Card */}
        <div className="bg-surface-container-lowest p-8 md:p-10 rounded-3xl shadow-2xl shadow-primary/5 border border-outline-variant/10">
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-on-surface mb-2">Event Title</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-lg">title</span>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  placeholder="e.g. InnovateX 2026"
                  className="w-full bg-surface-container border border-outline-variant/30 rounded-xl pl-12 pr-4 py-3.5 text-on-surface placeholder:text-outline/60 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-on-surface mb-2">Description</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-4 text-outline text-lg">description</span>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your event..."
                  rows={4}
                  className="w-full bg-surface-container border border-outline-variant/30 rounded-xl pl-12 pr-4 py-3.5 text-on-surface placeholder:text-outline/60 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm resize-none"
                ></textarea>
              </div>
            </div>

            {/* Date & Time */}
            <div>
              <label className="block text-sm font-semibold text-on-surface mb-2">Event Date & Time</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-lg">calendar_today</span>
                <input
                  value={event_time}
                  onChange={(e) => setEventTime(e.target.value)}
                  type="datetime-local"
                  className="w-full bg-surface-container border border-outline-variant/30 rounded-xl pl-12 pr-4 py-3.5 text-on-surface focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              onClick={() => tryCreate(title, description, event_time)}
              disabled={loading || !title || !description || !event_time}
              className="w-full bg-gradient-to-r from-primary to-primary-container text-on-primary py-4 rounded-xl font-bold text-base tracking-tight shadow-xl shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                  Creating...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-lg">add_circle</span>
                  Create Event
                </>
              )}
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default CreateEvent;
