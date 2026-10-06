import type {Metadata} from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/components/CartProvider';
import GoldenDust from '@/components/GoldenDust';
import ConsoleSanitizer from '@/components/ConsoleSanitizer';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'CBD Master Level | Prémiové CBD Oleje Nové Generace',
  description: 'Przejmij kontrolę nad svým dnem i nocí. Luksusowy sklep z olejkami CBD klasy premium.',
  openGraph: {
    title: 'CBD Master Level | Premium CBD',
    description: 'Przejmij kontrolę nad svým dnem i nocí. Luksusowy sklep z olejkami CBD klasy premium.',
    type: 'website',
  },
};

export const dynamic = "force-dynamic";

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="cs" className={`scroll-smooth ${cormorant.variable} ${plusJakarta.variable}`}>
      <body className={`${plusJakarta.className} selection:bg-brand-gold selection:text-brand-black antialiased bg-brand-black text-brand-beige`} suppressHydrationWarning>
        <ConsoleSanitizer />
        <GoldenDust />
        <CartProvider initialItems={[]}>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
