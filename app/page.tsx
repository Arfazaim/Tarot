'use client';

import { useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { useTarotStore } from '@/store/useTarotStore';
import { drawCards, getFullDeck } from '@/features/tarot/engine';
import TarotCard from '@/components/ui/TarotCard';

export default function Home() {
  const { currentSpread, setSpread, question } = useTarotStore();
  const [input, setInput] = useState('');
  const { messages, sendMessage } = useChat({});

  const handleDrawThreeCards = () => {
    const deck = getFullDeck();
    const drawn = drawCards(deck, 3, ['Masa Lalu', 'Masa Kini', 'Masa Depan']);
    setSpread(drawn, "Bagaimana arah karir saya?"); 
  };

  const handleDrawCelticCross = () => {
    const deck = getFullDeck();
    const positions = [
      'The Present', 'The Challenge', 'The Past', 'The Future',
      'Above (Conscious)', 'Below (Subconscious)', 'Advice',
      'External Influences', 'Hopes and Fears', 'Outcome'
    ];
    const drawn = drawCards(deck, 10, positions);
    setSpread(drawn, "Tolong baca energi saat ini secara mendalam dengan Celtic Cross.");
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    sendMessage(
      { role: 'user', parts: [{ type: 'text', text: input }] },
      { body: { question, drawnCards: currentSpread } }
    );
    setInput('');
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gold-500">Tarot AI Reading</h1>
      
      <div className="flex flex-wrap justify-center gap-6 mb-12">
        {currentSpread.length === 0 ? (
          <div className="flex gap-4">
            <button 
              onClick={handleDrawThreeCards}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold transition"
            >
              Tarik 3 Kartu
            </button>
            <button 
              onClick={handleDrawCelticCross}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition"
            >
              Celtic Cross (10 Kartu)
            </button>
          </div>
        ) : (
          currentSpread.map((card, idx) => (
            <div key={card.id} className="flex flex-col items-center gap-4">
              <span className="text-sm font-medium text-indigo-300">{card.spreadPosition}</span>
              <TarotCard card={card} delay={idx * 0.2} />
            </div>
          ))
        )}
      </div>

      {currentSpread.length > 0 && (
        <section className="max-w-2xl mx-auto bg-neutral-900 p-6 rounded-xl border border-neutral-800">
          <div className="space-y-4 mb-4 max-h-64 overflow-y-auto">
            {messages.map((m: any) => (
              <div key={m.id} className={m.role === 'user' ? 'text-right text-indigo-400' : 'text-left text-neutral-300'}>
                {m.parts && m.parts[0]?.text ? m.parts[0].text : m.content || m.text}
              </div>
            ))}
          </div>

          <form onSubmit={onSubmit} className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tanyakan sesuatu pada kartu..."
              className="flex-1 bg-neutral-800 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button type="submit" className="bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-700">
              Kirim
            </button>
          </form>
        </section>
      )}
    </main>
  );
}