'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { DrawnCard } from '@/features/tarot/types';

interface Props {
  card: DrawnCard;
  delay?: number;
}

const arcanaGradient: Record<'Major' | 'Minor', string> = {
  Major: 'from-amber-200 via-amber-400 to-orange-300',
  Minor: 'from-cyan-200 via-sky-400 to-indigo-400',
};

const getCardCaption = (card: DrawnCard) =>
  card.arcana === 'Major' ? `Major Arcana ${card.number}` : `${card.suit} ${card.number}`;

export default function TarotCard({ card, delay = 0 }: Props) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const rotationZ = card.orientation === 'Reversed' ? 180 : 0;
  const hoverRotation = card.orientation === 'Reversed' ? -1.5 : 1.5;
  const caption = getCardCaption(card);

  return (
    <motion.button
      type="button"
      className="group relative aspect-[3/5] w-full max-w-[17rem] cursor-pointer rounded-[2rem] border-0 bg-transparent p-0 text-left outline-none"
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -6, rotateZ: hoverRotation }}
      whileTap={{ scale: 0.98 }}
      transition={{ delay, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      aria-pressed={isRevealed}
      aria-label={`Buka kartu ${card.name}`}
      onClick={() => setIsRevealed(true)}
    >
      <motion.div
        className="absolute inset-0 preserve-3d"
        animate={{ rotateY: isRevealed ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 240, damping: 22 }}
      >
        <div className="absolute inset-0 rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.14),_rgba(7,10,20,0.96)_58%)] shadow-[0_30px_70px_rgba(0,0,0,0.4)]" />
        <div className="absolute inset-2 rounded-[1.4rem] border border-white/10 bg-[linear-gradient(180deg,rgba(10,14,29,0.95),rgba(5,8,16,0.92))]" />

        <div className="absolute inset-3 backface-hidden overflow-hidden rounded-[1.2rem]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_24%,rgba(251,191,36,0.22),transparent_42%),radial-gradient(circle_at_50%_80%,rgba(96,165,250,0.12),transparent_32%)]" />
          <div className="absolute inset-0 flex flex-col justify-between rounded-[1rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,11,24,0.94),rgba(4,7,16,0.92))] p-4 text-center text-white">
            <div className="space-y-3">
              <p className="text-[0.62rem] uppercase tracking-[0.5em] text-amber-100/80">Astral Tarot</p>
              <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-white/15 bg-[radial-gradient(circle,_rgba(255,255,255,0.08),rgba(255,255,255,0.02)_60%,transparent_61%)]">
                <div className="h-18 w-18 rounded-full border border-amber-200/60 bg-[radial-gradient(circle,_rgba(251,191,36,0.7),rgba(8,11,24,0.92)_62%,transparent_64%)] shadow-[0_0_32px_rgba(251,191,36,0.22)]" />
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-300/70">Klik untuk membuka</p>
              <p className="text-2xl font-semibold text-white text-glow">{card.orientation}</p>
              <p className="text-sm text-slate-300/80">{card.spreadPosition}</p>
            </div>
          </div>
        </div>

        <motion.div
          className="absolute inset-0 backface-hidden rounded-[2rem] p-3"
          style={{ rotateY: 180, rotateZ: rotationZ }}
        >
          <div className={`relative h-full overflow-hidden rounded-[1.4rem] border border-white/10 bg-slate-950 shadow-[0_30px_80px_rgba(2,6,23,0.5)]`}>
            <div className={`absolute inset-0 bg-gradient-to-br ${arcanaGradient[card.arcana]} opacity-70`} />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.22),transparent_28%),radial-gradient(circle_at_bottom,rgba(4,8,20,0.06),rgba(4,8,20,0.84)_72%)]" />

            {!imageFailed ? (
              <Image
                src={card.imagePath}
                alt={card.name}
                fill
                sizes="272px"
                className={`object-cover object-center transition-opacity duration-500 ${imageLoaded ? 'opacity-95' : 'opacity-0'}`}
                draggable={false}
                loading="lazy"
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageFailed(true)}
              />
            ) : null}

            {!imageLoaded || imageFailed ? (
              <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
                <div className="relative flex h-[72%] w-[72%] flex-col items-center justify-center rounded-full border border-white/15 bg-[radial-gradient(circle,_rgba(255,255,255,0.08),transparent_60%)]">
                  <div className="absolute inset-6 rounded-full border border-white/10" />
                  <div className="absolute inset-12 rounded-full border border-amber-200/30" />
                  <span className="text-5xl font-semibold text-white/90">{String(card.number).padStart(2, '0')}</span>
                  <span className="mt-2 text-[0.65rem] uppercase tracking-[0.45em] text-slate-200/70">{card.arcana}</span>
                  <span className="mt-4 max-w-[12rem] text-sm text-slate-200/80">{card.suit === 'None' ? 'Mandala utama yang menandai perubahan besar.' : `Energi ${card.suit.toLowerCase()} yang menuntun fokus kartu ini.`}</span>
                </div>
              </div>
            ) : null}

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-transparent" />

            <div className="absolute inset-x-4 bottom-4 space-y-2">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-white/15 bg-slate-950/60 px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.32em] text-amber-100/85">
                  {card.arcana}
                </span>
                <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.32em] text-slate-200/80">
                  {card.orientation}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">{card.name}</h3>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-200/70">{caption}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.button>
  );
}