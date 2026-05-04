<!-- BEGIN:nextjs-agent-rules -->
# Astral Tarot Agent Rules

This is a Next.js 16 App Router codebase. Before changing routing, metadata, fonts, or streaming behavior, read the matching guide in `node_modules/next/dist/docs/` and follow the local conventions instead of defaulting to older Next.js patterns.

## Project Shape

- `app/page.tsx` owns the main landing experience, drawing controls, and chat layout.
- `app/layout.tsx` owns metadata, fonts, and root document structure.
- `app/globals.css` defines the cosmic visual system and base styling.
- `components/ui/TarotCard.tsx` owns the card flip interaction and visual reveal.
- `features/tarot/engine.ts` handles deck access, shuffling, and draws.
- `features/ai/prompts.ts` defines the tarot reading voice and response structure.
- `app/api/chat/route.ts` streams the assistant response through Groq using `GROQ_API_KEY`.

## Editing Rules

- Prefer `apply_patch` for edits and keep them focused.
- Preserve the astral tarot direction: deep indigo layers, soft gold highlights, luminous borders, and a refined mystical tone.
- Avoid using copyrighted art, names, or text from other works. Keep any inspirations original.
- If you touch app-router behavior or Next-specific features, validate against the Next 16 docs first.
- If you add tarot assets later, keep them under `public/assets/cards/` and match the `imagePath` values in deck data.

## Quality Bar

- Do not leave placeholder copy in user-facing UI when a concrete alternative is easy.
- Make UI changes feel intentional, atmospheric, and readable on both desktop and mobile.
- When editing AI prompts, keep the output practical, empathetic, and structurally clear.
<!-- END:nextjs-agent-rules -->
