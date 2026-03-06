import { useState, useEffect } from 'react';
import { CalendarClock, ChevronDown, Loader2, MapPin, Send, Sparkles, User } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { destinations, getStatusColor } from '../data/destinations';

interface BookingProps {
  selectedDestination?: string;
}

const departures = [
  { value: 'Immediat', label: 'Depart immediat' },
  { value: 'Semaine prochaine', label: 'Semaine prochaine' },
  { value: 'Mois prochain', label: 'Mois prochain' },
  { value: 'Saison 2848', label: 'Saison 2848' },
];

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function Booking({ selectedDestination }: BookingProps) {
  const [name, setName] = useState('');
  const [destination, setDestination] = useState('');
  const [departure, setDeparture] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');

  useEffect(() => {
    if (selectedDestination) {
      setDestination(selectedDestination);
    }
  }, [selectedDestination]);

  const selectedDest = destinations.find((d) => d.id === destination);
  const isBookable = !selectedDest || selectedDest.status === 'Disponible';
  const isValid = name.trim().length > 0 && destination !== '' && departure !== '' && isBookable;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid || !selectedDest) return;

    setStatus('submitting');
    const { error } = await supabase.from('reservations').insert({
      traveler_name: name.trim(),
      destination: selectedDest.id,
      departure_era: departure,
    });

    if (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    setStatus('success');
    setName('');
    setDestination('');
    setDeparture('');
    setTimeout(() => setStatus('idle'), 5000);
  }

  return (
    <section id="booking" className="relative py-24 sm:py-32 bg-dark-900">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/20 to-transparent" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-gold-400/[0.04] via-transparent to-transparent" />

      <div className="relative max-w-3xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-gold-400 mb-4">
            <div className="w-8 h-px bg-gold-400/40" />
            <CalendarClock className="w-4 h-4" />
            <span className="text-xs tracking-[0.25em] uppercase font-medium">
              Reservation
            </span>
            <div className="w-8 h-px bg-gold-400/40" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-gold-50 mb-4">
            Reservez votre <span className="text-gold-400 italic">Voyage</span>
          </h2>
          <p className="text-dark-400 max-w-xl mx-auto leading-relaxed">
            Remplissez le formulaire ci-dessous et notre equipe de chrononautes
            preparera votre itineraire sur mesure.
          </p>
        </div>

        <div className="relative rounded-xl border border-dark-700/50 bg-dark-950/60 backdrop-blur-sm p-8 sm:p-10">
          <div className="absolute -top-px left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />

          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="w-16 h-16 rounded-full bg-gold-400/10 flex items-center justify-center mb-5">
                <Sparkles className="w-7 h-7 text-gold-400" />
              </div>
              <h3 className="font-display text-2xl font-semibold text-gold-50 mb-2">
                Reservation confirmee !
              </h3>
              <p className="text-dark-400 max-w-md leading-relaxed">
                Votre billet temporel est en cours de preparation.
                Nos chrononautes vous contacteront sous peu pour finaliser les details de votre voyage.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="traveler-name"
                  className="block text-xs uppercase tracking-wider text-dark-400 mb-2 font-medium"
                >
                  Nom du voyageur
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500 pointer-events-none" />
                  <input
                    id="traveler-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Entrez votre nom complet"
                    className="w-full pl-11 pr-4 py-3.5 bg-dark-900/80 border border-dark-700/60 rounded-lg text-gold-50 placeholder:text-dark-600 focus:outline-none focus:border-gold-400/40 focus:ring-1 focus:ring-gold-400/20 transition-all duration-300 text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="destination"
                  className="block text-xs uppercase tracking-wider text-dark-400 mb-2 font-medium"
                >
                  Destination
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500 pointer-events-none" />
                  <select
                    id="destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full pl-11 pr-10 py-3.5 bg-dark-900/80 border border-dark-700/60 rounded-lg text-gold-50 focus:outline-none focus:border-gold-400/40 focus:ring-1 focus:ring-gold-400/20 transition-all duration-300 text-sm appearance-none cursor-pointer"
                  >
                    <option value="" disabled className="bg-dark-900 text-dark-500">
                      Choisissez une destination
                    </option>
                    {destinations.map((d) => (
                      <option
                        key={d.id}
                        value={d.id}
                        disabled={d.status !== 'Disponible'}
                        className="bg-dark-900 text-gold-50"
                      >
                        {d.label} — {d.dateDisplay}{d.status !== 'Disponible' ? ` (${d.status})` : ''}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500 pointer-events-none" />
                </div>
                {selectedDest && !isBookable && (
                  <p className={`mt-2 text-xs px-3 py-1.5 rounded-md inline-block border ${getStatusColor(selectedDest.status)}`}>
                    Cette destination est actuellement {selectedDest.status.toLowerCase()}.
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="departure"
                  className="block text-xs uppercase tracking-wider text-dark-400 mb-2 font-medium"
                >
                  Epoque de depart
                </label>
                <div className="relative">
                  <CalendarClock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500 pointer-events-none" />
                  <select
                    id="departure"
                    value={departure}
                    onChange={(e) => setDeparture(e.target.value)}
                    className="w-full pl-11 pr-10 py-3.5 bg-dark-900/80 border border-dark-700/60 rounded-lg text-gold-50 focus:outline-none focus:border-gold-400/40 focus:ring-1 focus:ring-gold-400/20 transition-all duration-300 text-sm appearance-none cursor-pointer"
                  >
                    <option value="" disabled className="bg-dark-900 text-dark-500">
                      Selectionnez une periode
                    </option>
                    {departures.map((d) => (
                      <option key={d.value} value={d.value} className="bg-dark-900 text-gold-50">
                        {d.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500 pointer-events-none" />
                </div>
              </div>

              {status === 'error' && (
                <div className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-sm text-red-400">
                    Une erreur est survenue. Veuillez reessayer.
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={!isValid || status === 'submitting'}
                className="group w-full flex items-center justify-center gap-3 px-8 py-4 bg-gold-400 text-dark-950 font-semibold rounded-lg hover:bg-gold-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 text-sm tracking-wide uppercase"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Traitement en cours...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    <span>Reserver mon billet temporel</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
