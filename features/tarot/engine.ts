import { TarotCard, DrawnCard } from './types';
import deckData from './data/deck.json';

// Algoritma Fisher-Yates Shuffle (Unbiased)
export const shuffleDeck = (deck: TarotCard[]): TarotCard[] => {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Fungsi menarik kartu dengan 50% probabilitas Reversed
export const drawCards = (
  deck: TarotCard[], 
  count: number, 
  positions: string[]
): DrawnCard[] => {
  const shuffled = shuffleDeck(deck);
  const drawn = shuffled.slice(0, count);

  return drawn.map((card, index) => ({
    ...card,
    orientation: Math.random() >= 0.5 ? 'Reversed' : 'Upright',
    spreadPosition: positions[index] || `Position ${index + 1}`
  }));
};

export const getFullDeck = (): TarotCard[] => deckData as TarotCard[];