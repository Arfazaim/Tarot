import { streamText, convertToModelMessages } from 'ai';
import { groq } from '@ai-sdk/groq';
import { generateTarotSystemPrompt } from '@/features/ai/prompts';
import { DrawnCard } from '@/features/tarot/types';

// Memaksa eksekusi di Edge Runtime untuk performa streaming
export const runtime = 'edge';

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const messages = Array.isArray(body.messages) ? body.messages : [];
  const question = typeof body.question === 'string' && body.question.trim().length > 0 ? body.question : 'Pembacaan umum';
  const drawnCards = Array.isArray(body.drawnCards) ? (body.drawnCards as DrawnCard[]) : [];

  const systemPrompt = generateTarotSystemPrompt(question, drawnCards);

  const result = streamText({
    model: groq('llama-3.1-8b-instant'),
    system: systemPrompt,
    messages: await convertToModelMessages(messages),
    temperature: 0.8,
    maxRetries: 0,
  });

  return result.toUIMessageStreamResponse();
}