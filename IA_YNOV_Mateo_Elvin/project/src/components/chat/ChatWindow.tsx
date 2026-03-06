import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Clock } from 'lucide-react';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatWindowProps {
  messages: ChatMessage[];
  onSend: (message: string) => void;
  isLoading: boolean;
}

const suggestions = [
  'Quels sont vos prix ?',
  'Parlez-moi de Paris 1889',
  'Le Cretace est-il dangereux ?',
  'Recommandez-moi une destination',
];

export default function ChatWindow({ messages, onSend, isLoading }: ChatWindowProps) {
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;
    onSend(trimmed);
    setInput('');
  }

  function handleSuggestion(text: string) {
    if (isLoading) return;
    onSend(text);
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-5 py-4 border-b border-dark-700/50 shrink-0">
        <div className="relative">
          <div className="w-9 h-9 rounded-full bg-gold-400/15 flex items-center justify-center">
            <Clock className="w-4.5 h-4.5 text-gold-400" />
          </div>
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-dark-900" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gold-50 leading-tight">Chronos</p>
          <p className="text-[11px] text-dark-500">Assistant TimeTravel</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 min-h-0">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                msg.role === 'user'
                  ? 'bg-gold-400 text-dark-950 rounded-br-md'
                  : 'bg-dark-800 text-dark-200 border border-dark-700/50 rounded-bl-md'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-dark-800 border border-dark-700/50 rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400/60 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        {messages.length === 1 && !isLoading && (
          <div className="space-y-2 pt-1">
            <p className="text-[11px] text-dark-500 uppercase tracking-wider font-medium px-1">
              Suggestions
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSuggestion(s)}
                  className="px-3 py-1.5 text-xs text-dark-300 bg-dark-800/60 border border-dark-700/40 rounded-full hover:border-gold-400/30 hover:text-gold-300 transition-all duration-300"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="shrink-0 px-4 py-3 border-t border-dark-700/50"
      >
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Posez votre question..."
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 bg-dark-800/60 border border-dark-700/50 rounded-lg text-sm text-gold-50 placeholder:text-dark-600 focus:outline-none focus:border-gold-400/30 focus:ring-1 focus:ring-gold-400/15 disabled:opacity-50 transition-all duration-300"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="w-10 h-10 rounded-lg bg-gold-400/10 border border-gold-400/20 text-gold-400 flex items-center justify-center hover:bg-gold-400 hover:text-dark-950 hover:border-gold-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 shrink-0"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
