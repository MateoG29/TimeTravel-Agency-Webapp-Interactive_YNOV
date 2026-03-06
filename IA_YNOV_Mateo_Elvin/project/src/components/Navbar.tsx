import { useState, useEffect, useCallback } from 'react';
import { Clock, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileOpen(false);
  }, []);

  const links = [
    { label: 'Destinations', id: 'destinations' },
    { label: 'A propos', id: 'about' },
    { label: 'Reservation', id: 'booking' },
    { label: 'Contact', id: 'footer' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-dark-900/95 backdrop-blur-md border-b border-gold-400/10 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="relative">
            <Clock className="w-7 h-7 text-gold-400 transition-transform duration-500 group-hover:rotate-[360deg]" />
            <div className="absolute inset-0 bg-gold-400/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          <span className="font-display text-xl font-semibold text-gold-50 tracking-wide">
            TimeTravel
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => scrollTo(e, link.id)}
              className="cursor-pointer text-sm text-dark-300 hover:text-gold-400 transition-colors duration-300 tracking-wide uppercase"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#booking"
            onClick={(e) => scrollTo(e, 'booking')}
            className="cursor-pointer ml-2 px-5 py-2 text-sm font-medium text-dark-900 bg-gold-400 rounded hover:bg-gold-300 transition-all duration-300 tracking-wide"
          >
            Reserver
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-gold-400 p-1"
          aria-label="Menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-dark-900/98 backdrop-blur-md border-t border-gold-400/10 mt-2">
          <div className="px-6 py-6 flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => scrollTo(e, link.id)}
                className="cursor-pointer text-dark-200 hover:text-gold-400 transition-colors duration-300 text-base tracking-wide"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#booking"
              onClick={(e) => scrollTo(e, 'booking')}
              className="cursor-pointer mt-2 text-center px-5 py-2.5 text-sm font-medium text-dark-900 bg-gold-400 rounded hover:bg-gold-300 transition-all duration-300"
            >
              Reserver
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
