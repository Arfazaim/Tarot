import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { generateTarotSystemPrompt } from '@/features/ai/prompts';
import { DrawnCard } from '@/features/tarot/types';

// Memaksa eksekusi di Edge Runtime untuk performa streaming
export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages, question, drawnCards } = await req.json();

  // Membangun prompt dasar berdasarkan kartu yang baru ditarik
  const systemPrompt = generateTarotSystemPrompt(
    question || "Membaca energi umum", 
    drawnCards as DrawnCard[]
  );

  const result = streamText({
    model: openai('gpt-4o'), // Atau model lain sesuai preferensi
    system: systemPrompt,
    messages,
  });

  return result.toUIMessageStreamResponse();
}