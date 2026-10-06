import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CheckoutClient from './CheckoutClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pokladna | CBD Master Level',
  description: 'Dokončete svůj nákup prémiových CBD olejů.',
};

export default function CheckoutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col bg-brand-black/40">
        <CheckoutClient />
      </main>
      <Footer />
    </div>
  );
}
