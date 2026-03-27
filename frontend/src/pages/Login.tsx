import { useState } from 'react';
import { getToken } from '../api/fetchEvents';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const tryLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const token = await getToken(email, password);
      if (token) {
        localStorage.setItem('token', token);
        navigate('/');
      } else {
        setError('Invalid email or password');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex bg-surface">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#0a0c2e] via-primary-container to-[#0a0c2e] items-center justify-center p-12 relative overflow-hidden">
        <div className="relative z-10 max-w-md">
          <h1 className="text-5xl font-extrabold font-headline text-white tracking-tight mb-6 leading-tight">
            Welcome to <span className="text-primary-fixed-dim">Campus Events</span>
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed mb-8">
            Your gateway to hackathons, cultural nights, workshops, and more. Sign in to register for events and track your activities.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed font-bold text-sm border-2 border-white/20">P</div>
              <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed font-bold text-sm border-2 border-white/20">R</div>
              <div className="w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed font-bold text-sm border-2 border-white/20">S</div>
            </div>
            <p className="text-slate-400 text-sm font-medium">1000+ students already joined</p>
          </div>
        </div>
        {/* Background decorative elements */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary-fixed/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Brand */}
          <div className="lg:hidden mb-10 text-center">
            <h1 className="text-2xl font-black text-primary tracking-tighter font-headline">EVENTS.SSIPMT</h1>
            <p className="text-on-surface-variant text-sm mt-1">Campus Event Management Portal</p>
          </div>

          <div className="bg-surface-container-lowest p-8 md:p-10 rounded-3xl shadow-2xl shadow-primary/5 border border-outline-variant/10">
            <div className="mb-8">
              <h2 className="text-3xl font-extrabold text-primary font-headline tracking-tight mb-2">Sign In</h2>
              <p className="text-on-surface-variant text-sm">Enter your credentials to access your account</p>
            </div>

            {error && (
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-error-container text-on-error-container text-sm font-semibold mb-6">
                <span className="material-symbols-outlined text-base">error</span>
                {error}
              </div>
            )}

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-on-surface mb-2">Email Address</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-lg">mail</span>
                  <input
                    className="w-full bg-surface-container border border-outline-variant/30 rounded-xl pl-12 pr-4 py-3.5 text-on-surface placeholder:text-outline/60 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@ssipmt.edu"
                    type="email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-on-surface mb-2">Password</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-lg">lock</span>
                  <input
                    type="password"
                    className="w-full bg-surface-container border border-outline-variant/30 rounded-xl pl-12 pr-4 py-3.5 text-on-surface placeholder:text-outline/60 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <button
                onClick={() => tryLogin()}
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary to-primary-container text-on-primary py-4 rounded-xl font-bold text-base tracking-tight shadow-xl shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                    Signing in...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-lg">login</span>
                    Sign In
                  </>
                )}
              </button>
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => navigate('/')}
                className="text-primary font-semibold text-sm hover:underline flex items-center justify-center gap-1 mx-auto"
              >
                <span className="material-symbols-outlined text-base">arrow_back</span>
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
