import { useState, useCallback } from 'react';
import ChatBubble from './ChatBubble';
import ChatWindow, { type ChatMessage } from './ChatWindow';

const WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content:
    'Bienvenue chez TimeTravel Agency ! Je suis Chronos, votre assistant de voyage temporel. Je peux vous renseigner sur nos destinations : Paris 1889, Le Cretace ou Florence 1504. Comment puis-je vous aider ?',
  timestamp: new Date(),
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const toggle = useCallback(() => {
    setIsOpen((prev) => {
      if (!prev) setHasUnread(false);
      return !prev;
    });
  }, []);

  const sendMessage = useCallback(async (text: string) => {
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chatbot`;
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();

      const botMsg: ChatMessage = {
        id: `b-${Date.now()}`,
        role: 'assistant',
        content: data.reply || 'Desole, je n\'ai pas pu traiter votre demande.',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `e-${Date.now()}`,
          role: 'assistant',
          content:
            'Desole, une perturbation temporelle empeche la communication. Veuillez reessayer dans un instant.',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-4">
      <div
        className={`transition-all duration-500 origin-bottom-right ${
          isOpen
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-90 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="w-[360px] sm:w-[400px] h-[520px] rounded-2xl border border-dark-700/50 bg-dark-900/98 backdrop-blur-xl shadow-2xl shadow-black/40 overflow-hidden flex flex-col">
          <ChatWindow
            messages={messages}
            onSend={sendMessage}
            isLoading={isLoading}
          />
        </div>
      </div>

      <ChatBubble isOpen={isOpen} onClick={toggle} hasUnread={hasUnread} />
    </div>
  );
}
