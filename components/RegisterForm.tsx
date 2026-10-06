'use client';

import React, { useState, useTransition } from 'react';
import { registerCustomerAction, RegisterState } from '@/lib/actions/auth';
import { CheckCircle2, AlertCircle, Loader2, Mail } from 'lucide-react';

export default function RegisterForm() {
  const [isPending, startTransition] = useTransition();
  const [state, setState] = useState<RegisterState | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const res = await registerCustomerAction({ success: false }, formData);
      setState(res);
    });
  };

  if (state?.success) {
    return (
      <div className="bg-[#090909] border border-brand-gold/30 p-8 sm:p-10 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.8)] text-center space-y-6">
        <div className="w-16 h-16 bg-brand-gold/10 border border-brand-gold/30 rounded-full flex items-center justify-center mx-auto text-brand-gold">
          <Mail className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-serif text-white">Ověřte svůj e-mail</h2>
        <p className="text-brand-beige/80 font-light text-sm leading-relaxed max-w-sm mx-auto">
          {state.message}
        </p>
        <div className="p-4 bg-brand-gold/5 border border-brand-gold/20 rounded-lg text-xs text-brand-beige/70">
          Zkontrolujte prosím také složku Nevyžádaná pošta (Spam), pokud e-mail nedorazí do několika minut.
        </div>
        <div className="pt-2">
          <a
            href="/prihlaseni"
            className="inline-block bg-brand-gold text-brand-black font-semibold text-xs uppercase tracking-widest px-8 py-3.5 rounded-lg hover:bg-white transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)]"
          >
            Přejít k přihlášení
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#090909] border border-brand-gold/20 p-8 sm:p-10 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.8)] space-y-6"
    >
      {state?.error && (
        <div className="p-4 bg-red-950/40 border border-red-500/30 rounded-lg flex items-start space-x-3 text-red-300 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-400 mt-0.5" />
          <span>{state.error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-widest text-brand-gold" htmlFor="firstName">
            Jméno
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            className="w-full bg-[#040404] border border-brand-beige/20 rounded-lg px-4 py-3 text-white text-sm font-light focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all"
            placeholder="Vaše jméno"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-widest text-brand-gold" htmlFor="lastName">
            Příjmení
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            className="w-full bg-[#040404] border border-brand-beige/20 rounded-lg px-4 py-3 text-white text-sm font-light focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all"
            placeholder="Vaše příjmení"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[11px] font-bold uppercase tracking-widest text-brand-gold" htmlFor="email">
          E-mail
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full bg-[#040404] border border-brand-beige/20 rounded-lg px-4 py-3 text-white text-sm font-light focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all"
          placeholder="E-mailová adresa"
        />
      </div>

      <div className="space-y-2">
        <label className="text-[11px] font-bold uppercase tracking-widest text-brand-gold" htmlFor="password">
          Heslo
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          minLength={8}
          className="w-full bg-[#040404] border border-brand-beige/20 rounded-lg px-4 py-3 text-white text-sm font-light focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all"
          placeholder="Minimálně 8 znaků"
        />
      </div>

      <div className="flex items-start space-x-3 pt-2">
        <div className="flex items-center h-5">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            required
            className="w-4 h-4 rounded border-brand-beige/30 bg-[#040404] text-brand-gold focus:ring-brand-gold focus:ring-offset-brand-black cursor-pointer"
          />
        </div>
        <label htmlFor="terms" className="text-xs text-brand-beige/70 font-light leading-relaxed cursor-pointer">
          Souhlasím s <span className="text-brand-gold hover:underline">obchodními podmínkami</span> a beru na vědomí <span className="text-brand-gold hover:underline">zpracování osobních údajů</span>.
        </label>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-brand-gold text-brand-black font-semibold text-sm uppercase tracking-widest py-4 rounded-lg hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] mt-4 disabled:opacity-50 flex items-center justify-center space-x-2"
      >
        {isPending ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Zpracovávám registraci...</span>
          </>
        ) : (
          <span>Vytvořit účet</span>
        )}
      </button>

      <div className="text-center pt-4 border-t border-brand-gold/10">
        <p className="text-sm font-light text-brand-beige/70">
          Už máte účet?{' '}
          <a href="/prihlaseni" className="text-brand-gold hover:text-white transition-colors font-medium">
            Přihlaste se
          </a>
        </p>
      </div>
    </form>
  );
}
