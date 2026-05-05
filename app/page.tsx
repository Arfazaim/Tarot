'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useChat } from '@ai-sdk/react';
import { useTarotStore } from '@/store/useTarotStore';
import { drawCards, getFullDeck } from '@/features/tarot/engine';
import TarotCard from '@/components/ui/TarotCard';

const DECK_SIZE = getFullDeck().length;

export default function Home() {
  const { currentSpread, setSpread, question, clearSpread } = useTarotStore();
  const [input, setInput] = useState('');
  const { messages, sendMessage, error, status } = useChat({});

  const chatErrorMessage = error
    ? 'Gemini belum bisa merespons. Periksa GEMINI_API_KEY atau GOOGLE_GENERATIVE_AI_API_KEY, koneksi jaringan, atau status layanan Google AI.'
    : null;

  const majorCount = currentSpread.filter((card) => card.arcana === 'Major').length;
  const reversedCount = currentSpread.filter((card) => card.orientation === 'Reversed').length;
  const uprightCount = currentSpread.length - reversedCount;

  const handleDrawThreeCards = () => {
    const deck = getFullDeck();
    const drawn = drawCards(deck, 3, ['Masa Lalu', 'Masa Kini', 'Masa Depan']);
    setSpread(drawn, 'Apa pola energi yang membentuk langkah saya saat ini?');
  };

  const handleDrawCelticCross = () => {
    const deck = getFullDeck();
    const positions = [
      'Inti Situasi',
      'Hambatan',
      'Akar Lama',
      'Arah Mendatang',
      'Kesadaran',
      'Bayangan',
      'Nasihat',
      'Pengaruh Luar',
      'Harapan dan Ketakutan',
      'Hasil',
    ];
    const drawn = drawCards(deck, 10, positions);
    setSpread(drawn, 'Bacakan energi saya secara mendalam dengan Celtic Cross.');
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

  const latestQuestion = question || 'Belum ada pertanyaan yang terikat pada spread ini.';

  return (
    <main className="relative min-h-screen overflow-hidden text-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(251,191,36,0.12),transparent_28%),radial-gradient(circle_at_20%_20%,rgba(129,140,248,0.18),transparent_24%),radial-gradient(circle_at_82%_18%,rgba(56,189,248,0.12),transparent_22%)]" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <motion.header
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-6 rounded-[2rem] border border-white/10 bg-slate-950/45 p-6 shadow-[0_35px_90px_rgba(2,6,23,0.45)] backdrop-blur-2xl lg:grid-cols-[minmax(0,1.4fr)_minmax(20rem,0.6fr)] lg:p-8"
        >
          <div className="space-y-5">
            <div className="inline-flex items-center gap-3 rounded-full border border-amber-200/15 bg-white/5 px-4 py-2 text-[0.65rem] uppercase tracking-[0.45em] text-amber-100/85">
              Astral Tarot
            </div>

            <div className="space-y-4">
              <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-white text-glow sm:text-6xl lg:text-7xl">
                Baca rahasia yang bergerak di balik langit malam.
              </h1>
              <p className="max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                Tema ini dibangun seperti observatorium kosmik: gelap, berlapis cahaya emas, dan penuh gerak halus. Tarik kartu, buka satu per satu, lalu biarkan AI menyusun narasi yang lebih tajam daripada daftar makna mentah.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleDrawThreeCards}
                className="rounded-full bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500 px-5 py-3 text-sm font-semibold text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(251,191,36,0.25)]"
              >
                Tarik 3 Kartu
              </button>
              <button
                onClick={handleDrawCelticCross}
                className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-amber-200/25 hover:bg-white/10"
              >
                Celtic Cross (10 Kartu)
              </button>
              {currentSpread.length > 0 ? (
                <button
                  onClick={clearSpread}
                  className="rounded-full border border-white/10 bg-slate-950/40 px-5 py-3 text-sm font-semibold text-slate-200 transition duration-300 hover:-translate-y-0.5 hover:border-sky-200/25 hover:bg-white/10"
                >
                  Reset Spread
                </button>
              ) : null}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
              <p className="text-[0.65rem] uppercase tracking-[0.4em] text-slate-300/70">Deck</p>
              <p className="mt-3 text-3xl font-semibold text-white">{DECK_SIZE}</p>
              <p className="mt-2 text-sm text-slate-300/80">Kartu yang siap dibaca.</p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
              <p className="text-[0.65rem] uppercase tracking-[0.4em] text-slate-300/70">Major</p>
              <p className="mt-3 text-3xl font-semibold text-amber-200">{majorCount}</p>
              <p className="mt-2 text-sm text-slate-300/80">Energi transformatif dan simbol besar.</p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
              <p className="text-[0.65rem] uppercase tracking-[0.4em] text-slate-300/70">Orientasi</p>
              <p className="mt-3 text-3xl font-semibold text-sky-200">{reversedCount}/{uprightCount}</p>
              <p className="mt-2 text-sm text-slate-300/80">Reversed vs Upright di spread aktif.</p>
            </div>
          </div>
        </motion.header>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(22rem,0.65fr)]">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-[2rem] border border-white/10 bg-slate-950/50 p-5 shadow-[0_35px_90px_rgba(2,6,23,0.42)] backdrop-blur-2xl sm:p-6"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[0.65rem] uppercase tracking-[0.45em] text-amber-100/70">Reading chamber</p>
                <h2 className="mt-2 text-3xl font-semibold text-white">Panggung kartu</h2>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-300">
                  {currentSpread.length > 0
                    ? 'Buka kartu satu per satu untuk melihat lapisan visual dan arah energi di setiap posisi.'
                    : 'Belum ada spread. Tarik kartu untuk mengisi ruang observatorium ini.'}
                </p>
              </div>

              {currentSpread.length > 0 ? (
                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
                  {currentSpread.length} kartu aktif
                </div>
              ) : null}
            </div>

            {currentSpread.length === 0 ? (
              <div className="mt-6 rounded-[1.75rem] border border-dashed border-white/10 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.08),rgba(5,8,22,0.55)_55%)] p-8 text-center">
                <div className="mx-auto flex max-w-xl flex-col items-center gap-4">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full border border-white/15 bg-[radial-gradient(circle,_rgba(251,191,36,0.2),rgba(255,255,255,0.03)_60%)] text-4xl text-amber-100 shadow-[0_0_45px_rgba(251,191,36,0.12)]">
                    ✦
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-semibold text-white">Siapkan niat, lalu buka gerbangnya.</h3>
                    <p className="text-sm leading-7 text-slate-300">
                      Kartu akan tampil sebagai panel astral, bukan sekadar gambar. Setiap kartu punya lipatan cahaya, orientasi, dan penanda arcana yang membantu pembacaan terasa hidup.
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-3 text-xs uppercase tracking-[0.35em] text-slate-300/70">
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">Sintesis</span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">Orientasi</span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">Langkah nyata</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-6 grid gap-6 grid-cols-[repeat(auto-fit,minmax(13rem,1fr))]">
                {currentSpread.map((card, idx) => (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08, duration: 0.45 }}
                    className="flex flex-col items-center gap-3"
                  >
                    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.65rem] uppercase tracking-[0.35em] text-slate-200/75">
                      {card.spreadPosition}
                    </span>
                    <TarotCard card={card} delay={idx * 0.14} />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.section>

          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            <section className="rounded-[2rem] border border-white/10 bg-slate-950/55 p-5 shadow-[0_35px_90px_rgba(2,6,23,0.42)] backdrop-blur-2xl sm:p-6">
              <p className="text-[0.65rem] uppercase tracking-[0.45em] text-sky-100/70">Reading state</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">{latestQuestion}</h2>

              <div className="mt-5 space-y-3 rounded-[1.5rem] border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-slate-400">Spread aktif</span>
                  <span className="font-medium text-white">{currentSpread.length || '0'}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-slate-400">Kartu terbalik</span>
                  <span className="font-medium text-white">{reversedCount}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-slate-400">Kartu tegak</span>
                  <span className="font-medium text-white">{uprightCount}</span>
                </div>
              </div>
            </section>

            <section className="rounded-[2rem] border border-white/10 bg-slate-950/55 p-5 shadow-[0_35px_90px_rgba(2,6,23,0.42)] backdrop-blur-2xl sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[0.65rem] uppercase tracking-[0.45em] text-amber-100/70">AI oracle</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">Percakapan kartu</h2>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
                  {status === 'streaming' ? 'AI menjawab...' : `${messages.length} pesan`}
                </span>
              </div>

              {chatErrorMessage ? (
                <div className="mt-4 rounded-[1.25rem] border border-rose-300/20 bg-rose-400/10 p-4 text-sm leading-7 text-rose-100">
                  {chatErrorMessage}
                </div>
              ) : null}

              <div className="mt-5 max-h-[24rem] space-y-3 overflow-y-auto pr-1">
                {messages.length === 0 ? (
                  <div className="rounded-[1.5rem] border border-dashed border-white/10 bg-white/5 p-5 text-sm leading-7 text-slate-300">
                    Setelah kartu dibuka, tulis pertanyaan lanjutan di bawah. AI akan membaca nuansa spread, bukan hanya satu kartu.
                  </div>
                ) : (
                  messages.map((message) => {
                    const messageText =
                      message.parts?.map((part) => (part.type === 'text' ? part.text : '')).join('') ||
                      '';

                    return (
                      <div
                        key={message.id}
                        className={`rounded-[1.25rem] border p-4 text-sm leading-7 ${message.role === 'user' ? 'ml-10 border-sky-300/15 bg-sky-400/10 text-sky-50' : 'mr-10 border-white/10 bg-white/5 text-slate-200'}`}
                      >
                        {messageText}
                      </div>
                    );
                  })
                )}
              </div>

              <form onSubmit={onSubmit} className="mt-5 flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Tanyakan sesuatu pada kartu..."
                  className="flex-1 rounded-full border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-300/40"
                />
                <button
                  type="submit"
                  className="rounded-full bg-gradient-to-r from-sky-300 via-amber-200 to-amber-400 px-4 py-3 text-sm font-semibold text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(125,211,252,0.18)]"
                >
                  Kirim
                </button>
              </form>
            </section>
          </motion.aside>
        </div>
      </div>
    </main>
  );
}