import { Clock, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="footer" className="relative bg-dark-950 pt-16 pb-8">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <a href="#" className="flex items-center gap-2.5 mb-4 group">
              <Clock className="w-6 h-6 text-gold-400 transition-transform duration-500 group-hover:rotate-[360deg]" />
              <span className="font-display text-lg font-semibold text-gold-50">
                TimeTravel
              </span>
            </a>
            <p className="text-sm text-dark-400 leading-relaxed">
              Pionniers du voyage temporel de luxe depuis 2847. Chaque epoque,
              une experience inoubliable.
            </p>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold text-gold-50 uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Accueil', href: '#' },
                { label: 'Destinations', href: '#destinations' },
                { label: 'A propos', href: '#about' },
                { label: 'Contact', href: '#footer' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-dark-400 hover:text-gold-400 transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold text-gold-50 uppercase tracking-wider mb-4">
              Destinations
            </h4>
            <ul className="space-y-2.5">
              {['Paris 1889', 'Le Cretace', 'Florence 1504', 'Toutes les epoques'].map(
                (dest) => (
                  <li key={dest}>
                    <a
                      href="#destinations"
                      className="text-sm text-dark-400 hover:text-gold-400 transition-colors duration-300"
                    >
                      {dest}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold text-gold-50 uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold-400 mt-0.5 shrink-0" />
                <span className="text-sm text-dark-400">
                  Station Temporelle Alpha, Neo-Paris, 2847
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <span className="text-sm text-dark-400">+temporal 847.00.00</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                <span className="text-sm text-dark-400">contact@timetravel.agency</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-dark-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-dark-500">
            2847 TimeTravel Agency. Tous droits reserves a travers le temps.
          </p>
          <div className="flex items-center gap-6">
            {['Mentions legales', 'Politique temporelle', 'CGV'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs text-dark-500 hover:text-gold-400 transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
