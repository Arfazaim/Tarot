import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DrawnCard } from '@/features/tarot/types';

interface TarotState {
  currentSpread: DrawnCard[];
  question: string;
  history: Array<{ question: string; cards: DrawnCard[]; date: string }>;
  setSpread: (cards: DrawnCard[], question: string) => void;
  clearSpread: () => void;
}

export const useTarotStore = create<TarotState>()(
  persist(
    (set) => ({
      currentSpread: [],
      question: '',
      history: [],
      setSpread: (cards, question) => 
        set((state) => ({ 
          currentSpread: cards, 
          question,
          history: [...state.history, { question, cards, date: new Date().toISOString() }]
        })),
      clearSpread: () => set({ currentSpread: [], question: '' }),
    }),
    {
      name: 'tarot-session-storage', 
    }
  )
);