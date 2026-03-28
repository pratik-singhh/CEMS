function Footer() {
  return (
    <footer className="bg-surface-container-low py-16 px-8 mt-auto border-t border-outline-variant/15">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-12">
        <div className="max-w-md">
          <span className="text-2xl font-black tracking-tighter text-primary mb-6 block font-headline">
            EVENTS.HUB
          </span>
          <p className="text-on-surface-variant text-sm leading-relaxed">
            The central hub for all academic, technical, and cultural activities at Campus. Stay connected, stay inspired.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 lg:gap-20 w-full lg:w-auto">
          <div>
            <h4 className="font-bold text-primary mb-6 text-sm uppercase tracking-widest font-headline">
              NAVIGATION
            </h4>
            <ul className="space-y-4 text-on-surface-variant text-sm">
              <li><a className="hover:text-primary transition-colors" href="/">Home</a></li>
              <li><a className="hover:text-primary transition-colors" href="/">Upcoming Events</a></li>
              <li><a className="hover:text-primary transition-colors" href="/my-events">My Events</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-primary mb-6 text-sm uppercase tracking-widest font-headline">
              HELP & SUPPORT
            </h4>
            <ul className="space-y-4 text-on-surface-variant text-sm">
              <li><a className="hover:text-primary transition-colors" href="#">Contact Support</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Event Organizers</a></li>
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <h4 className="font-bold text-primary mb-6 text-sm uppercase tracking-widest font-headline">
              SOCIAL
            </h4>
            <div className="flex gap-4">
              <a className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all" href="#">
                <span className="material-symbols-outlined text-lg">public</span>
              </a>
              <a className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all" href="#">
                <span className="material-symbols-outlined text-lg">share</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-outline-variant/10 text-center text-sm text-slate-500 font-medium tracking-wide">
        © 2026 CAMPUS Event Portal. All rights reserved. Built for Excellence.
      </div>
    </footer>
  );
}

export default Footer;
