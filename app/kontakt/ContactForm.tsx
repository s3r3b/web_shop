'use client';

import { useState, useTransition } from 'react';
import { submitContactForm } from '@/lib/actions/contact';

export default function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<{ success?: boolean; message?: string; error?: string } | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null);
    const form = e.currentTarget;
    const formData = new FormData(form);

    startTransition(async () => {
      const result = await submitContactForm(null, formData);
      setStatus(result);
      if (result.success) {
        form.reset();
      }
    });
  };

  return (
    <div className="bg-[#0A0A0A] border border-brand-gold/15 p-8 sm:p-12 rounded-sm shadow-[0_0_40px_rgba(212,175,55,0.03)] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 rounded-full blur-[80px] pointer-events-none"></div>
      
      <h3 className="text-2xl font-serif text-white mb-8">Napište nám</h3>
      
      {status?.success && (
        <div className="mb-8 p-4 border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm rounded-sm">
          {status.message}
        </div>
      )}

      {status?.error && (
        <div className="mb-8 p-4 border border-red-500/30 bg-red-500/10 text-red-400 text-sm rounded-sm">
          {status.error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        <div>
          <label htmlFor="name" className="block text-xs font-medium uppercase tracking-widest text-brand-beige/70 mb-2">
            Jméno a příjmení
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            disabled={isPending}
            className="w-full bg-brand-black border border-white/10 rounded-sm px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-brand-gold/50 transition-colors disabled:opacity-50"
            placeholder="Vaše jméno"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-xs font-medium uppercase tracking-widest text-brand-beige/70 mb-2">
            E-mailová adresa
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            disabled={isPending}
            className="w-full bg-brand-black border border-white/10 rounded-sm px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-brand-gold/50 transition-colors disabled:opacity-50"
            placeholder="vas@email.cz"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-xs font-medium uppercase tracking-widest text-brand-beige/70 mb-2">
            Zpráva
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            disabled={isPending}
            className="w-full bg-brand-black border border-white/10 rounded-sm px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-brand-gold/50 transition-colors disabled:opacity-50 resize-none"
            placeholder="Jak Vám můžeme pomoci?"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-brand-gold text-brand-black font-semibold text-xs uppercase tracking-widest py-4 rounded-sm hover:bg-white transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
        >
          {isPending ? (
            <div className="w-5 h-5 border-2 border-brand-black border-t-transparent rounded-full animate-spin"></div>
          ) : (
            'Odeslat zprávu'
          )}
        </button>
      </form>
    </div>
  );
}
