import { useState, useEffect, useCallback } from 'react';
import { ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import { destinations, getDestinationByQuizKey } from '../data/destinations';

interface Question {
  text: string;
  options: { label: string; scores: Record<string, number> }[];
}

const quizKeys = destinations.map((d) => d.quizKey);

const questions: Question[] = [
  {
    text: 'Preferez-vous le luxe urbain ou la nature sauvage ?',
    options: [
      { label: 'Luxe urbain', scores: { paris: 2, florence: 1, cretace: 0 } },
      { label: 'Nature sauvage', scores: { paris: 0, florence: 0, cretace: 2 } },
      { label: 'Un peu des deux', scores: { paris: 1, florence: 2, cretace: 1 } },
    ],
  },
  {
    text: 'Etes-vous plutot pinceaux de peinture ou dents de sabre ?',
    options: [
      { label: 'Pinceaux de peinture', scores: { paris: 1, florence: 2, cretace: 0 } },
      { label: 'Dents de sabre', scores: { paris: 0, florence: 0, cretace: 2 } },
      { label: 'Aucun des deux, je suis curieux de tout', scores: { paris: 2, florence: 1, cretace: 1 } },
    ],
  },
  {
    text: 'Quel siecle vous attire le plus ?',
    options: [
      { label: 'XIXe siecle', scores: { paris: 2, florence: 0, cretace: 0 } },
      { label: 'La Renaissance', scores: { paris: 0, florence: 2, cretace: 0 } },
      { label: 'La Prehistoire', scores: { paris: 0, florence: 0, cretace: 2 } },
    ],
  },
];

const initialScores: Record<string, number> = Object.fromEntries(quizKeys.map((k) => [k, 0]));

export default function DestinationQuiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState(initialScores);
  const [phase, setPhase] = useState<'intro' | 'question' | 'result'>('intro');
  const [animating, setAnimating] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const transition = useCallback((callback: () => void) => {
    setAnimating(true);
    setTimeout(() => {
      callback();
      setAnimating(false);
    }, 400);
  }, []);

  const startQuiz = () => {
    transition(() => {
      setPhase('question');
      setCurrentQ(0);
      setScores({ ...initialScores });
    });
  };

  const handleAnswer = (optionIndex: number) => {
    if (animating) return;
    setSelectedOption(optionIndex);
    const option = questions[currentQ].options[optionIndex];
    const newScores = { ...scores };
    for (const key of quizKeys) {
      newScores[key] = (newScores[key] || 0) + (option.scores[key] || 0);
    }
    setScores(newScores);

    setTimeout(() => {
      transition(() => {
        setSelectedOption(null);
        if (currentQ < questions.length - 1) {
          setCurrentQ(currentQ + 1);
        } else {
          setPhase('result');
        }
      });
    }, 350);
  };

  const winnerKey = Object.entries(scores).reduce(
    (best, [key, val]) => (val > best.val ? { key, val } : best),
    { key: quizKeys[0], val: -1 }
  ).key;

  const winnerDest = getDestinationByQuizKey(winnerKey);

  const scrollToCard = () => {
    if (!winnerDest) return;
    const el = document.getElementById(`card-${winnerDest.id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('ring-2', 'ring-gold-400/60');
      setTimeout(() => el.classList.remove('ring-2', 'ring-gold-400/60'), 2500);
    }
  };

  const reset = () => {
    transition(() => {
      setPhase('intro');
      setCurrentQ(0);
      setScores({ ...initialScores });
    });
  };

  const progressPct = phase === 'question' ? ((currentQ + 1) / questions.length) * 100 : 0;

  return (
    <div className="mb-16 sm:mb-20">
      <div className="max-w-2xl mx-auto">
        <div className="relative rounded-xl border border-dark-700/50 bg-dark-900/50 backdrop-blur-sm overflow-hidden">
          <div className="absolute -top-px left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />

          {phase === 'question' && (
            <div className="h-0.5 bg-dark-800">
              <div
                className="h-full bg-gradient-to-r from-gold-400 to-gold-300 transition-all duration-700 ease-out"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          )}

          <div className="p-8 sm:p-10">
            <div
              className={`transition-all duration-400 ${
                animating
                  ? 'opacity-0 translate-y-4'
                  : 'opacity-100 translate-y-0'
              }`}
            >
              {phase === 'intro' && <IntroView onStart={startQuiz} />}

              {phase === 'question' && (
                <QuestionView
                  question={questions[currentQ]}
                  index={currentQ}
                  total={questions.length}
                  selectedOption={selectedOption}
                  onAnswer={handleAnswer}
                />
              )}

              {phase === 'result' && winnerDest && (
                <ResultView
                  title={winnerDest.label}
                  accent={winnerDest.quizAccent}
                  onScroll={scrollToCard}
                  onReset={reset}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function IntroView({ onStart }: { onStart: () => void }) {
  return (
    <div className="text-center">
      <div className="w-14 h-14 rounded-full bg-gold-400/10 flex items-center justify-center mx-auto mb-5">
        <Sparkles className="w-6 h-6 text-gold-400" />
      </div>
      <h3 className="font-display text-2xl sm:text-3xl font-semibold text-gold-50 mb-3">
        Trouvez votre <span className="text-gold-400 italic">Destination</span>
      </h3>
      <p className="text-dark-400 leading-relaxed mb-8 max-w-md mx-auto">
        Repondez a 3 questions et decouvrez quelle epoque correspond le mieux
        a votre personnalite de voyageur temporel.
      </p>
      <button
        onClick={onStart}
        className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-gold-400/10 border border-gold-400/25 rounded-lg text-sm text-gold-300 hover:bg-gold-400 hover:text-dark-950 hover:border-gold-400 transition-all duration-300 font-medium tracking-wide"
      >
        <span>Commencer le quiz</span>
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    </div>
  );
}

function QuestionView({
  question,
  index,
  total,
  selectedOption,
  onAnswer,
}: {
  question: Question;
  index: number;
  total: number;
  selectedOption: number | null;
  onAnswer: (i: number) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <span className="text-xs text-dark-500 uppercase tracking-wider font-medium">
          Question {index + 1}/{total}
        </span>
      </div>
      <h3 className="font-display text-xl sm:text-2xl font-semibold text-gold-50 mb-8 leading-snug">
        {question.text}
      </h3>
      <div className="space-y-3">
        {question.options.map((option, i) => (
          <button
            key={i}
            onClick={() => onAnswer(i)}
            className={`w-full text-left px-5 py-4 rounded-lg border transition-all duration-300 text-sm ${
              selectedOption === i
                ? 'border-gold-400/50 bg-gold-400/10 text-gold-300'
                : 'border-dark-700/50 bg-dark-800/40 text-dark-300 hover:border-gold-400/30 hover:bg-dark-800/70 hover:text-gold-50'
            }`}
          >
            <span className="inline-flex items-center gap-3">
              <span
                className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-medium shrink-0 transition-all duration-300 ${
                  selectedOption === i
                    ? 'border-gold-400 bg-gold-400 text-dark-950'
                    : 'border-dark-600 text-dark-500'
                }`}
              >
                {String.fromCharCode(65 + i)}
              </span>
              <span>{option.label}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function ResultView({
  title,
  accent,
  onScroll,
  onReset,
}: {
  title: string;
  accent: string;
  onScroll: () => void;
  onReset: () => void;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="text-center">
      <div
        className={`transition-all duration-700 ${
          visible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}
      >
        <div className="w-14 h-14 rounded-full bg-gold-400/15 flex items-center justify-center mx-auto mb-5">
          <Sparkles className="w-6 h-6 text-gold-400" />
        </div>
        <p className="text-xs text-gold-400 uppercase tracking-[0.2em] font-medium mb-2">
          Votre destination ideale
        </p>
        <h3 className="font-display text-3xl sm:text-4xl font-bold text-gold-50 mb-2">
          {title}
        </h3>
        <p className="text-dark-400 mb-8">{accent}</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onScroll}
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-gold-400 text-dark-950 rounded-lg text-sm font-semibold hover:bg-gold-300 transition-all duration-300 tracking-wide"
          >
            <span>Voir la destination</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          <button
            onClick={onReset}
            className="inline-flex items-center gap-2 px-5 py-3.5 text-sm text-dark-400 hover:text-gold-400 transition-colors duration-300"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Recommencer</span>
          </button>
        </div>
      </div>
    </div>
  );
}
