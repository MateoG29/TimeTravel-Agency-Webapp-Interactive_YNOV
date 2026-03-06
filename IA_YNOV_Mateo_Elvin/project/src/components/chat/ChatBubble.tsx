import { MessageCircle, X } from 'lucide-react';

interface ChatBubbleProps {
  isOpen: boolean;
  onClick: () => void;
  hasUnread: boolean;
}

export default function ChatBubble({ isOpen, onClick, hasUnread }: ChatBubbleProps) {
  return (
    <button
      onClick={onClick}
      aria-label={isOpen ? 'Fermer le chat' : 'Ouvrir le chat'}
      className="relative w-14 h-14 rounded-full bg-gold-400 text-dark-950 shadow-lg shadow-gold-400/20 hover:bg-gold-300 hover:shadow-gold-400/30 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center"
    >
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
          isOpen ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'
        }`}
      >
        <MessageCircle className="w-6 h-6" />
      </div>
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
          isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'
        }`}
      >
        <X className="w-6 h-6" />
      </div>

      {hasUnread && !isOpen && (
        <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-dark-950 animate-pulse" />
      )}
    </button>
  );
}
