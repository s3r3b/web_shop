'use client';

import { useCart } from '@/components/CartProvider';
import { useTransition, useState } from 'react';
import { submitCheckoutAction } from '@/lib/actions/checkout';
import Image from 'next/image';

export default function CheckoutClient() {
  const { items, cartTotal } = useCart();
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<{ success?: boolean; message?: string; error?: string } | null>(null);

  if (status?.success) {
    return (
      <div className="max-w-2xl mx-auto text-center py-24 px-4">
        <div className="w-20 h-20 rounded-full border border-brand-gold/40 flex items-center justify-center mx-auto mb-8 bg-brand-gold/10 text-brand-gold">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif text-white mb-4">Děkujeme za Vaši objednávku</h2>
        <p className="text-brand-beige/70 font-light mb-10 leading-relaxed max-w-xl mx-auto">
          {status.message || 'Vaše objednávka byla úspěšně přijata a brzy začneme s jejím zpracováním. Potvrzení jsme zaslali na Váš e-mail.'}
        </p>
        <a href="/produkty" className="inline-block bg-brand-gold text-brand-black font-semibold text-xs uppercase tracking-widest px-8 py-4 rounded-sm hover:bg-white transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
          Pokračovat v nákupu
        </a>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-24 px-4">
        <h2 className="text-3xl font-serif text-white mb-6">Váš košík je prázdný</h2>
        <a href="/produkty" className="inline-block bg-brand-gold text-brand-black font-semibold text-xs uppercase tracking-widest px-8 py-4 rounded-sm hover:bg-white transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
          Zpět do obchodu
        </a>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null);
    const form = e.currentTarget;
    const formData = new FormData(form);

    startTransition(async () => {
      const result = await submitCheckoutAction(null, formData);
      setStatus(result);
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white tracking-wide">
          Pokladna
        </h1>
        <p className="text-brand-beige/60 font-light mt-3">
          Dokončete svou objednávku zadáním doručovacích údajů
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Left Col: Form */}
        <div className="lg:col-span-7">
          <div className="bg-[#0A0A0A] border border-brand-gold/15 p-6 sm:p-10 rounded-sm shadow-[0_0_40px_rgba(212,175,55,0.03)]">
            <h2 className="text-xl font-serif text-white mb-8 border-b border-brand-gold/15 pb-4">
              Dodací údaje
            </h2>

            {status?.error && (
              <div className="mb-8 p-4 border border-red-500/30 bg-red-500/10 text-red-400 text-sm rounded-sm">
                {status.error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-xs font-medium uppercase tracking-widest text-brand-beige/70 mb-2">Jméno</label>
                  <input type="text" id="firstName" name="firstName" required disabled={isPending} className="w-full bg-brand-black border border-white/10 rounded-sm px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-brand-gold/50 transition-colors disabled:opacity-50" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-xs font-medium uppercase tracking-widest text-brand-beige/70 mb-2">Příjmení</label>
                  <input type="text" id="lastName" name="lastName" required disabled={isPending} className="w-full bg-brand-black border border-white/10 rounded-sm px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-brand-gold/50 transition-colors disabled:opacity-50" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-xs font-medium uppercase tracking-widest text-brand-beige/70 mb-2">E-mail</label>
                  <input type="email" id="email" name="email" required disabled={isPending} className="w-full bg-brand-black border border-white/10 rounded-sm px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-brand-gold/50 transition-colors disabled:opacity-50" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xs font-medium uppercase tracking-widest text-brand-beige/70 mb-2">Telefon</label>
                  <input type="tel" id="phone" name="phone" required disabled={isPending} className="w-full bg-brand-black border border-white/10 rounded-sm px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-brand-gold/50 transition-colors disabled:opacity-50" />
                </div>
              </div>

              <div>
                <label htmlFor="address" className="block text-xs font-medium uppercase tracking-widest text-brand-beige/70 mb-2">Ulice a číslo popisné</label>
                <input type="text" id="address" name="address" required disabled={isPending} className="w-full bg-brand-black border border-white/10 rounded-sm px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-brand-gold/50 transition-colors disabled:opacity-50" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="city" className="block text-xs font-medium uppercase tracking-widest text-brand-beige/70 mb-2">Město</label>
                  <input type="text" id="city" name="city" required disabled={isPending} className="w-full bg-brand-black border border-white/10 rounded-sm px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-brand-gold/50 transition-colors disabled:opacity-50" />
                </div>
                <div>
                  <label htmlFor="zip" className="block text-xs font-medium uppercase tracking-widest text-brand-beige/70 mb-2">PSČ</label>
                  <input type="text" id="zip" name="zip" required disabled={isPending} className="w-full bg-brand-black border border-white/10 rounded-sm px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-brand-gold/50 transition-colors disabled:opacity-50" />
                </div>
              </div>

              <div className="pt-6 border-t border-brand-gold/15 mt-8">
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-brand-gold text-brand-black font-semibold text-xs sm:text-sm uppercase tracking-widest py-4 rounded-sm hover:bg-white transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                >
                  {isPending ? (
                    <div className="w-5 h-5 border-2 border-brand-black border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    'Závazně objednat a zaplatit'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Col: Summary */}
        <div className="lg:col-span-5">
          <div className="bg-[#0A0A0A] border border-white/5 p-6 sm:p-10 rounded-sm sticky top-24">
            <h2 className="text-xl font-serif text-white mb-6 border-b border-brand-gold/15 pb-4">
              Shrnutí objednávky
            </h2>
            
            <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
              {items.map((item) => {
                const getPrice = (variant: string, basePrice: number) => {
                  const match = variant.match(/-\s*([\d\s]+)\s*Kč/);
                  return match && match[1] ? parseInt(match[1].replace(/\s/g, ''), 10) : basePrice;
                };
                const price = getPrice(item.variant, item.product.price);
                
                return (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative w-16 h-16 bg-brand-black border border-white/10 rounded-sm overflow-hidden flex-shrink-0">
                      <Image 
                        src={item.product.image} 
                        alt={item.product.name} 
                        fill 
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-medium text-white">{item.product.name}</h4>
                        <span className="text-sm text-brand-gold whitespace-nowrap ml-4">
                          {(price * item.quantity).toLocaleString('cs-CZ')} Kč
                        </span>
                      </div>
                      <p className="text-xs text-brand-beige/50 mt-1">
                        {item.variant.split(' - ')[0]}
                      </p>
                      <p className="text-xs text-brand-beige/50 mt-1">
                        Množství: {item.quantity}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="space-y-4 pt-6 border-t border-brand-gold/15 text-sm text-brand-beige/70">
              <div className="flex justify-between">
                <span>Mezisoučet</span>
                <span className="text-white">{cartTotal.toLocaleString('cs-CZ')} Kč</span>
              </div>
              <div className="flex justify-between">
                <span>Doprava (Zásilkovna)</span>
                <span className="text-white">{cartTotal > 2000 ? 'Zdarma' : '89 Kč'}</span>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-brand-gold/30">
              <div className="flex justify-between items-end">
                <span className="text-sm font-medium text-white uppercase tracking-widest">Celkem k úhradě</span>
                <span className="text-2xl font-serif text-brand-gold">
                  {(cartTotal + (cartTotal > 2000 ? 0 : 89)).toLocaleString('cs-CZ')} Kč
                </span>
              </div>
              <p className="text-[10px] text-right text-brand-beige/40 mt-1">Včetně 21% DPH</p>
            </div>
            
            <div className="mt-8 flex items-center gap-3 p-4 bg-brand-gold/5 border border-brand-gold/10 rounded-sm">
              <svg className="w-5 h-5 text-brand-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
              <p className="text-xs text-brand-beige/70 leading-relaxed font-light">
                Vaše platba a osobní údaje jsou chráněny 256-bitovým šifrováním.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
