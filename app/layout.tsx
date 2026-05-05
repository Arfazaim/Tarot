import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Geist_Mono, Space_Grotesk } from 'next/font/google';
import './globals.css';

const displayFont = Cormorant_Garamond({
  variable: '--font-display-face',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const bodyFont = Space_Grotesk({
  variable: '--font-body-face',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const monoFont = Geist_Mono({
  variable: '--font-mono-face',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Astral Tarot',
    template: '%s | Astral Tarot',
  },
  description:
    'Tarot platform bertema astral dengan UI kosmik, pembacaan yang reflektif, dan AI yang merangkai makna kartu secara puitis.',
  keywords: ['tarot', 'astral', 'reading', 'oracle', 'ai'],
};

export const viewport: Viewport = {
  themeColor: '#050816',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable} h-full antialiased`}>
      <body className="min-h-full bg-transparent text-foreground">{children}</body>
    </html>
  );
}
