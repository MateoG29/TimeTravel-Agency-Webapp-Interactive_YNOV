export type DestinationId = 'DEST_PARIS_1889' | 'DEST_CRETACEOUS' | 'DEST_FLORENCE_1504';

export type DestinationStatus = 'Disponible' | 'Complet' | 'Maintenance Temporelle';

export interface Destination {
  id: DestinationId;
  label: string;
  era: string;
  dateDisplay: string;
  dateISO: string;
  description: string;
  hoverTagline: string;
  image: string;
  price: string;
  tags: string[];
  status: DestinationStatus;
  quizKey: string;
  quizAccent: string;
}

export const destinations: Destination[] = [
  {
    id: 'DEST_PARIS_1889',
    label: 'Paris - La Belle Epoque',
    era: 'XIXe siecle',
    dateDisplay: 'Mai 1889',
    dateISO: '1889-05-06',
    description:
      "Assistez a l'inauguration de la Tour Eiffel lors de l'Exposition universelle. Promenez-vous dans le Paris de la Belle Epoque, entre cafes litteraires et ateliers impressionnistes.",
    hoverTagline: "L'elegance de la Belle Epoque et l'acier de la Tour Eiffel.",
    image:
      'https://i.imgur.com/xqQnJOP.jpg',
    price: '12 800 TC',
    tags: ['Culture', 'Gastronomie', 'Art'],
    status: 'Disponible',
    quizKey: 'paris',
    quizAccent: 'La Ville Lumiere vous appelle !',
  },
  {
    id: 'DEST_CRETACEOUS',
    label: 'Le Cretace - L\'Ere des Titans',
    era: '-66M annees',
    dateDisplay: '65 000 000 av. J.-C.',
    dateISO: '-065000000-01-01',
    description:
      "Explorez un monde domine par les dinosaures dans un safari temporel securise. Observez des creatures titanesques dans leur habitat naturel, a distance respectueuse.",
    hoverTagline: "Un voyage sauvage au temps des derniers geants.",
    image:
      'https://i.imgur.com/vyuDnEt.jpg',
    price: '34 500 TC',
    tags: ['Aventure', 'Nature', 'Extreme'],
    status: 'Disponible',
    quizKey: 'cretace',
    quizAccent: "L'aventure ultime vous attend !",
  },
  {
    id: 'DEST_FLORENCE_1504',
    label: 'Florence - La Renaissance',
    era: 'Renaissance',
    dateDisplay: 'Juin 1504',
    dateISO: '1504-06-01',
    description:
      "Rendez visite a Leonard de Vinci dans son atelier et decouvrez les secrets de la Renaissance italienne. Un voyage culturel au coeur de l'age d'or artistique europeen.",
    hoverTagline: "L'art et le genie de la Renaissance italienne.",
    image:
      'https://i.imgur.com/5asujp1.jpg',
    price: '18 200 TC',
    tags: ['Art', 'Histoire', 'Exclusif'],
    status: 'Disponible',
    quizKey: 'florence',
    quizAccent: 'La Renaissance vous attend !',
  },
];

export function getDestinationById(id: DestinationId): Destination | undefined {
  return destinations.find((d) => d.id === id);
}

export function getDestinationByQuizKey(key: string): Destination | undefined {
  return destinations.find((d) => d.quizKey === key);
}

export function getAvailableDestinations(): Destination[] {
  return destinations.filter((d) => d.status === 'Disponible');
}

export function getStatusColor(status: DestinationStatus): string {
  switch (status) {
    case 'Disponible':
      return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
    case 'Complet':
      return 'text-red-400 bg-red-400/10 border-red-400/20';
    case 'Maintenance Temporelle':
      return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
  }
}
