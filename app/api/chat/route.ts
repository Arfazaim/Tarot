import { streamText, convertToModelMessages } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateTarotSystemPrompt } from '@/features/ai/prompts';
import { DrawnCard } from '@/features/tarot/types';

// Memaksa eksekusi di Edge Runtime untuk performa streaming
export const runtime = 'edge';

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY ?? process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const messages = Array.isArray(body.messages) ? body.messages : [];
  const question = typeof body.question === 'string' && body.question.trim().length > 0 ? body.question : 'Pembacaan umum';
  const drawnCards = Array.isArray(body.drawnCards) ? (body.drawnCards as DrawnCard[]) : [];

  const systemPrompt = generateTarotSystemPrompt(question, drawnCards);

  const result = streamText({
    model: google('gemini-2.5-flash'),
    system: systemPrompt,
    messages: await convertToModelMessages(messages),
    temperature: 0.8,
    maxRetries: 0,
  });

  return result.toUIMessageStreamResponse();
}