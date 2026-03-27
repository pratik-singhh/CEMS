import { useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem('token');

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm flex justify-between items-center px-6 md:px-8 py-4 w-full border-b border-outline-variant/10">
      <div className="flex items-center gap-4">
        <h1
          className="text-xl md:text-2xl font-black text-primary tracking-tighter font-headline cursor-pointer"
          onClick={() => navigate('/')}
        >
          EVENTS.SSIPMT
        </h1>
      </div>

      <nav className="hidden md:flex items-center gap-8">
        <button
          onClick={() => navigate('/')}
          className={`font-headline py-1 text-sm tracking-wide transition-colors ${
            isActive('/')
              ? 'text-primary border-b-2 border-primary font-bold'
              : 'text-slate-500 font-semibold hover:text-primary'
          }`}
        >
          Home
        </button>
        {isLoggedIn && (
          <>
            <button
              onClick={() => navigate('/my-events')}
              className={`font-headline py-1 text-sm tracking-wide transition-colors ${
                isActive('/my-events')
                  ? 'text-primary border-b-2 border-primary font-bold'
                  : 'text-slate-500 font-semibold hover:text-primary'
              }`}
            >
              My Events
            </button>
            <button
              onClick={() => navigate('/create-event')}
              className={`font-headline py-1 text-sm tracking-wide transition-colors ${
                isActive('/create-event')
                  ? 'text-primary border-b-2 border-primary font-bold'
                  : 'text-slate-500 font-semibold hover:text-primary'
              }`}
            >
              Create Event
            </button>
          </>
        )}
      </nav>

      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <>
            <button
              className="relative w-10 h-10 flex items-center justify-center rounded-full border-2 border-primary-fixed-dim cursor-pointer hover:opacity-80 transition-opacity text-slate-500 hover:text-primary"
              title="Notifications"
            >
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-secondary rounded-full border border-white"></span>
            </button>
            <button
              onClick={handleLogout}
              className="hidden sm:flex items-center gap-2 bg-surface-container-highest hover:bg-surface-dim text-on-surface-variant px-4 py-2 rounded-full font-semibold text-sm transition-colors"
            >
              <span className="material-symbols-outlined text-base">logout</span>
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary-container text-on-primary px-5 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-base">login</span>
            Login
          </button>
        )}
      </div>
    </header>
  );
}

export default Navbar;
