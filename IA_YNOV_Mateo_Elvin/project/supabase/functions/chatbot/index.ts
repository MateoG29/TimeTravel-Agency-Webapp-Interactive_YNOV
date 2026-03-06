import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface Destination {
  keywords: string[];
  name: string;
  responses: Record<string, string>;
  defaultResponse: string;
}

const destinations: Destination[] = [
  {
    keywords: ["paris", "1889", "eiffel", "belle epoque", "exposition", "lumiere"],
    name: "Paris - La Belle Epoque",
    responses: {
      prix: "Notre forfait Paris 1889 debute a 12 800 Chrono-Credits pour un sejour de 3 jours. Le forfait Premium, incluant une visite privee de la Tour Eiffel avec Gustave Eiffel en personne, est propose a 24 500 CC. Pour une immersion complete d'une semaine avec logement dans un hotel particulier du Marais, comptez 45 000 CC.",
      activite: "A Paris 1889, vous pourrez assister a l'inauguration de la Tour Eiffel lors de l'Exposition Universelle, flaner dans les ateliers des impressionnistes a Montmartre, diner dans les grands cafes du Boulevard Haussmann, et decouvrir les premieres representations du Moulin Rouge. Nous proposons egalement une soiree privee dans le salon de Sarah Bernhardt.",
      securite: "Notre bulle de protection temporelle vous entoure en permanence. Vous recevrez des vetements d'epoque sur mesure, de la monnaie locale authentique et un traducteur neuronal discret. Nos chrononautes restent a proximite pour garantir votre securite sans alterer votre experience.",
      duree: "Nous proposons des sejours de 3 jours (decouverte), 5 jours (confort) ou 7 jours (immersion totale). La majorite de nos voyageurs choisissent le forfait 5 jours pour profiter pleinement de la Belle Epoque parisienne.",
    },
    defaultResponse: "Paris 1889 est notre destination la plus romantique. Imaginez-vous au pied de la Tour Eiffel fraichement inauguree, dans le Paris effervescent de la Belle Epoque ! Les forfaits debutent a 12 800 CC. Souhaitez-vous en savoir plus sur les activites, les tarifs ou la duree du sejour ?",
  },
  {
    keywords: ["cretace", "dinosaure", "safari", "prehistoire", "dino", "t-rex", "trex", "sauvage", "nature"],
    name: "Le Cretace - L'Ere des Titans",
    responses: {
      prix: "Le Safari Cretace est notre experience la plus exclusive. Le forfait Explorateur (2 jours) est a 34 500 CC. Le forfait Aventurier (4 jours, campement de luxe sous dome protecteur) coute 58 000 CC. Notre experience ultime, le forfait Paleontologue (7 jours avec survol aerien et plongee marine), est propose a 89 000 CC.",
      activite: "Au Cretace, vous observerez des Tyrannosaures dans leur habitat naturel depuis notre vehicule anti-gravite blinde, assisterez a des vols de Pteranodons au coucher du soleil, explorerez une foret luxuriante geante, et pourrez meme plonger dans les oceans prehistoriques pour observer des Mosasaures. Le tout depuis la securite absolue de nos installations.",
      securite: "C'est notre destination la plus securisee, paradoxalement ! Vous serez entoure d'un champ de force quantique invisible de 5e generation, impenetrable par toute forme de vie. Nos vehicules anti-gravite sont blindes et nos guides sont des paleontologues-chrononautes experimentes. Taux de satisfaction securite : 100%.",
      duree: "Le forfait minimum est de 2 jours pour une premiere decouverte. Nous recommandons 4 jours pour une experience complete. Les passionnes optent pour notre sejour de 7 jours qui inclut l'exploration de 3 zones geographiques differentes.",
    },
    defaultResponse: "Le Cretace est notre destination la plus spectaculaire ! Imaginez observer un T-Rex en toute securite, depuis notre vehicule anti-gravite blinde. Les safaris debutent a 34 500 CC. C'est une experience que seuls quelques privilegies peuvent vivre. Voulez-vous des details sur les activites, les prix ou les mesures de securite ?",
  },
  {
    keywords: ["florence", "1504", "renaissance", "vinci", "leonard", "michel-ange", "art", "italie", "peinture"],
    name: "Florence - La Renaissance",
    responses: {
      prix: "Notre sejour florentin debute a 18 200 CC pour 3 jours incluant une visite de l'atelier de Leonard de Vinci. Le forfait Mecene (5 jours) a 32 000 CC inclut un portrait personnel peint par un maitre de la Renaissance. Le forfait Grand Tour (10 jours, Florence + Rome + Venise) est propose a 67 000 CC.",
      activite: "A Florence 1504, vous visiterez l'atelier de Leonard de Vinci alors qu'il travaille sur ses inventions, assisterez au devoilement du David de Michel-Ange, dinerez dans les palais des Medicis, decouvrirez les secrets de la perspective dans les botteghe florentines, et pourrez meme commander une oeuvre originale a un artiste de la Renaissance.",
      securite: "La Florence de la Renaissance est l'une de nos destinations les plus accessibles. Vous recevrez des habits florentins sur mesure, un guide-interprete maitrisant l'italien du Cinquecento, et une bourse de florins d'or. Nos chrononautes veillent discretement a la non-interference historique.",
      duree: "Le sejour minimum est de 3 jours. Nous conseillons 5 jours pour vivre pleinement l'experience Renaissance. Pour les amoureux d'art et d'histoire, notre Grand Tour de 10 jours couvre Florence, Rome et Venise.",
    },
    defaultResponse: "Florence 1504, c'est l'age d'or de la Renaissance ! Vous pourrez croiser Leonard de Vinci et Michel-Ange dans leurs ateliers. Les sejours debutent a 18 200 CC. Une experience culturelle absolument unique. Souhaitez-vous des informations sur les activites, les tarifs ou la duree ?",
  },
];

const topicKeywords: Record<string, string[]> = {
  prix: ["prix", "cout", "coute", "tarif", "combien", "budget", "cher", "argent", "credit", "forfait", "payer", "cc"],
  activite: ["activite", "faire", "voir", "visite", "programme", "inclus", "experience", "decouvrir", "explorer"],
  securite: ["securite", "danger", "risque", "sur", "protection", "securise", "protege", "safe"],
  duree: ["duree", "jours", "combien de temps", "semaine", "long", "sejour", "nuit"],
};

const generalResponses: Record<string, string> = {
  greeting: "Bienvenue chez TimeTravel Agency ! Je suis Chronos, votre assistant de voyage temporel. Je connais parfaitement nos trois destinations : Paris - La Belle Epoque (Mai 1889), Le Cretace - L'Ere des Titans (65 000 000 av. J.-C.) et Florence - La Renaissance (Juin 1504). Comment puis-je vous aider a planifier votre prochain voyage dans le temps ?",
  farewell: "Merci pour votre interet ! N'hesitez pas a revenir si vous avez d'autres questions. Nos chrononautes sont toujours prets a vous aider. A bientot... dans une autre epoque !",
  reservation: "Pour reserver, rien de plus simple ! Rendez-vous dans notre section Reservation sur le site, selectionnez votre destination, votre epoque de depart et remplissez le formulaire. Notre equipe vous recontactera sous 24h pour finaliser les details de votre voyage temporel.",
  agence: "TimeTravel Agency a ete fondee en 2847. Nous sommes les pionniers du voyage temporel de luxe, avec plus de 847 voyages realises et un taux de retour securise de 100%. Nous proposons actuellement 42 epoques differentes, dont nos 3 destinations phares : Paris - La Belle Epoque, Le Cretace - L'Ere des Titans et Florence - La Renaissance.",
  recommandation: "Cela depend de vos gouts ! Si vous aimez la culture et le romantisme, Paris - La Belle Epoque est parfait. Pour les amateurs de sensations fortes et de nature, Le Cretace - L'Ere des Titans est incomparable. Et si l'art et l'histoire vous passionnent, Florence - La Renaissance vous emerveillera. Avez-vous fait notre quiz 'Trouvez votre Destination' ? Il peut vous aider a choisir !",
  unknown: "Je ne suis pas certain de comprendre votre question. Je suis specialise dans nos destinations temporelles : Paris - La Belle Epoque, Le Cretace - L'Ere des Titans et Florence - La Renaissance. Posez-moi des questions sur les prix, les activites, la securite ou la duree des sejours, et je serai ravi de vous renseigner !",
};

const generalKeywords: Record<string, string[]> = {
  greeting: ["bonjour", "salut", "hello", "hi", "hey", "bonsoir", "coucou"],
  farewell: ["merci", "au revoir", "bye", "adieu", "a bientot", "bonne journee"],
  reservation: ["reserver", "reservation", "billet", "book", "formulaire"],
  agence: ["agence", "timetravel", "time travel", "entreprise", "qui etes", "histoire de", "fondee", "fondes"],
  recommandation: ["recommand", "conseil", "suggere", "suggestion", "choisir", "laquelle", "quelle destination", "meilleur", "prefere", "ideal"],
};

function detectDestination(message: string): Destination | null {
  const lower = message.toLowerCase();
  for (const dest of destinations) {
    if (dest.keywords.some((kw) => lower.includes(kw))) {
      return dest;
    }
  }
  return null;
}

function detectTopic(message: string): string | null {
  const lower = message.toLowerCase();
  for (const [topic, keywords] of Object.entries(topicKeywords)) {
    if (keywords.some((kw) => lower.includes(kw))) {
      return topic;
    }
  }
  return null;
}

function detectGeneral(message: string): string | null {
  const lower = message.toLowerCase();
  for (const [key, keywords] of Object.entries(generalKeywords)) {
    if (keywords.some((kw) => lower.includes(kw))) {
      return key;
    }
  }
  return null;
}

function generateResponse(message: string): string {
  const destination = detectDestination(message);
  const topic = detectTopic(message);
  const general = detectGeneral(message);

  if (destination && topic && destination.responses[topic]) {
    return destination.responses[topic];
  }

  if (destination) {
    return destination.defaultResponse;
  }

  if (topic) {
    const summaries: Record<string, string> = {
      prix: "Voici un apercu de nos tarifs :\n\n- Paris - La Belle Epoque : a partir de 12 800 CC\n- Le Cretace - L'Ere des Titans : a partir de 34 500 CC\n- Florence - La Renaissance : a partir de 18 200 CC\n\nChaque destination propose plusieurs forfaits. De quelle destination souhaitez-vous connaitre les details ?",
      activite: "Chaque destination offre des experiences uniques ! Paris - La Belle Epoque propose des visites culturelles et gastronomiques. Le Cretace - L'Ere des Titans offre des safaris dinosaures. Florence - La Renaissance permet de rencontrer les grands maitres. Quelle destination vous interesse ?",
      securite: "La securite est notre priorite absolue. Chaque voyageur beneficie d'une bulle de protection quantique, de vetements d'epoque, et d'un accompagnement par nos chrononautes experimentes. Nous avons un taux de retour securise de 100%. Souhaitez-vous des details sur la securite d'une destination specifique ?",
      duree: "Nos sejours varient de 2 a 10 jours selon la destination et le forfait choisi. Paris propose 3-7 jours, le Cretace 2-7 jours, et Florence 3-10 jours. Quelle destination vous interesse ?",
    };
    return summaries[topic] || generalResponses.unknown;
  }

  if (general) {
    return generalResponses[general];
  }

  return generalResponses.unknown;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return new Response(
        JSON.stringify({ error: "Message requis" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const reply = generateResponse(message.trim());

    return new Response(
      JSON.stringify({ reply }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch {
    return new Response(
      JSON.stringify({ reply: generalResponses.unknown }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
