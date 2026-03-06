import { Shield, Sparkles, Users, Clock } from 'lucide-react';

const features = [
  {
    icon: Clock,
    title: 'Precision Temporelle',
    description:
      'Notre technologie de navigation quantique garantit une precision d\'atterrissage a la seconde pres, dans n\'importe quelle epoque.',
  },
  {
    icon: Shield,
    title: 'Securite Absolue',
    description:
      'Protocoles de non-interference stricts et bulle de protection personnelle pour chaque voyageur. Votre securite est notre priorite.',
  },
  {
    icon: Sparkles,
    title: 'Experience Luxe',
    description:
      'Hebergements d\'epoque soigneusement selectionnes, guides temporels experts et immersion culturelle complete.',
  },
  {
    icon: Users,
    title: 'Accompagnement Elite',
    description:
      'Une equipe d\'historiens et de chrononautes experimentes vous accompagne pour une experience inoubliable.',
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32 bg-dark-900">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-gold-400 mb-4">
              <div className="w-8 h-px bg-gold-400/40" />
              <span className="text-xs tracking-[0.25em] uppercase font-medium">
                A Propos
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-gold-50 mb-6 leading-tight">
              Le luxe de <br />
              <span className="text-gold-400 italic">l'impossible</span>
            </h2>
            <div className="space-y-4 text-dark-300 leading-relaxed">
              <p>
                Fondee en 2847, TimeTravel Agency est pionniere du voyage temporel de luxe.
                Nous transformons les pages de l'histoire en destinations exclusives,
                accessibles uniquement a une clientele selectionnee.
              </p>
              <p>
                Chaque voyage est concu sur mesure par nos chronoarchitectes, qui
                orchestrent minutieusement chaque detail pour vous offrir une immersion
                totale dans l'epoque de votre choix, sans compromis sur le confort
                ni la securite.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-8">
              <div>
                <p className="font-display text-3xl font-bold text-gold-400">847+</p>
                <p className="text-xs text-dark-500 uppercase tracking-wider mt-1">
                  Voyages realises
                </p>
              </div>
              <div className="w-px h-12 bg-dark-700" />
              <div>
                <p className="font-display text-3xl font-bold text-gold-400">100%</p>
                <p className="text-xs text-dark-500 uppercase tracking-wider mt-1">
                  Retours securises
                </p>
              </div>
              <div className="w-px h-12 bg-dark-700" />
              <div>
                <p className="font-display text-3xl font-bold text-gold-400">42</p>
                <p className="text-xs text-dark-500 uppercase tracking-wider mt-1">
                  Epoques disponibles
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group p-5 rounded-lg bg-dark-950/50 border border-dark-700/50 hover:border-gold-400/20 transition-all duration-500"
              >
                <div className="w-10 h-10 rounded bg-gold-400/10 flex items-center justify-center mb-4 group-hover:bg-gold-400/20 transition-colors duration-300">
                  <feature.icon className="w-5 h-5 text-gold-400" />
                </div>
                <h3 className="font-display text-lg font-semibold text-gold-50 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-dark-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
