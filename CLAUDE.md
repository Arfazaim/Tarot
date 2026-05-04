@AGENTS.md

# Project Brief

Astral Tarot is a Next.js tarot reading experience with an AI oracle. The visual direction is original and cosmic: dark space layers, gold accents, glass panels, and ceremonial typography.

## What To Expect

- The landing page is the main product surface, not a marketing shell.
- Card visuals should feel like ritual objects, even if image assets are missing.
- AI replies should read like a reflective tarot guide: clear, atmospheric, and actionable.

## Safe Extension Points

- Use `app/page.tsx` for page composition and reading flow.
- Use `components/ui/TarotCard.tsx` for reveal and card styling.
- Use `features/ai/prompts.ts` for the reading voice and structure.
- Use `app/api/chat/route.ts` for streaming behavior through Groq with `GROQ_API_KEY`.
- Use `app/globals.css` for shared theme tokens and cosmic background treatment.

## Asset Convention

If card art is added later, place it in `public/assets/cards/` and keep `features/tarot/data/deck.json` aligned with those paths.
