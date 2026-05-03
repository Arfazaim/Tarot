'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { DrawnCard } from '@/features/tarot/types';

interface Props {
  card: DrawnCard;
  delay?: number;
}

export default function TarotCard({ card, delay = 0 }: Props) {
  const [isRevealed, setIsRevealed] = useState(false);

  // Jika Reversed, kita putar 180 derajat di sumbu Z setelah diputar di sumbu Y (balik kartu)
  const rotationZ = card.orientation === 'Reversed' ? 180 : 0;

  return (
    <AnimatePresence>
      <motion.div 
        className="relative w-48 h-80 cursor-pointer perspective-1000"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        onClick={() => setIsRevealed(true)}
      >
        <motion.div
          className="w-full h-full preserve-3d"
          animate={{ rotateY: isRevealed ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          {/* Bagian Belakang Kartu (Back) */}
          <div className="absolute w-full h-full backface-hidden bg-indigo-900 rounded-xl border-2 border-gold-500 shadow-xl" />
          
          {/* Bagian Depan Kartu (Face) */}
          <motion.div 
            className="absolute w-full h-full backface-hidden rounded-xl bg-white shadow-xl overflow-hidden flex flex-col items-center justify-center p-2"
            style={{ rotateY: 180, rotateZ: rotationZ }} // Menangani Upright/Reversed
          >
            {/* Ganti dengan <Image /> dari Next.js di produksi */}
            <div className="w-full h-4/5 bg-gray-200 mb-2 bg-cover bg-center" style={{ backgroundImage: `url(${card.imagePath})`}} />
            <h3 className="text-sm font-bold text-center">{card.name}</h3>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}