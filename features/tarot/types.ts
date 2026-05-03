export type Arcana = 'Major' | 'Minor';
export type Suit = 'Wands' | 'Cups' | 'Swords' | 'Pentacles' | 'None';
export type Orientation = 'Upright' | 'Reversed';

export interface Meaning {
  upright: string;
  reversed: string;
}

export interface TarotCard {
  id: string;
  name: string;
  arcana: Arcana;
  suit: Suit;
  number: number;
  keywords: string[];
  meanings: Meaning;
  imagePath: string;
}

export interface DrawnCard extends TarotCard {
  orientation: Orientation;
  spreadPosition: string; // e.g., "Past", "Present", "Future", "Obstacle"
}