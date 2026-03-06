import DestinationCard from './DestinationCard';
import DestinationQuiz from './DestinationQuiz';
import { Compass } from 'lucide-react';
import { destinations } from '../data/destinations';

interface DestinationsProps {
  onExplore?: (destinationId: string) => void;
}

export default function Destinations({ onExplore }: DestinationsProps) {
  return (
    <section id="destinations" className="relative py-24 sm:py-32 bg-dark-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold-400/[0.03] via-transparent to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-gold-400 mb-4">
            <div className="w-8 h-px bg-gold-400/40" />
            <Compass className="w-4 h-4" />
            <span className="text-xs tracking-[0.25em] uppercase font-medium">
              Nos Destinations
            </span>
            <div className="w-8 h-px bg-gold-400/40" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-gold-50 mb-4">
            Choisissez votre <span className="text-gold-400 italic">Epoque</span>
          </h2>
          <p className="text-dark-400 max-w-xl mx-auto leading-relaxed">
            Trois destinations emblematiques, soigneusement selectionnees pour
            leur richesse historique et leur potentiel d'emerveillement.
          </p>
        </div>

        <DestinationQuiz />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {destinations.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} onExplore={onExplore} />
          ))}
        </div>
      </div>
    </section>
  );
}
