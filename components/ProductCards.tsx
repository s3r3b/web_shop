import { products } from '@/lib/data';
import ProductCardClient from '@/components/ProductCardClient';

export default function ProductCards() {
  return (
    <section id="kolekce" className="py-20 lg:py-28 relative bg-[#090909]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-[0.3em] font-medium text-brand-gold mb-2">KOLEKCE MASTER LEVEL</p>
          <h2 className="text-3xl sm:text-5xl font-serif-luxury font-normal text-white mb-4">
            Tři pilíře dokonalé rovnováhy.
          </h2>
          <p className="text-sm sm:text-base text-brand-beige/70 font-light leading-relaxed">
            Každá šarže je vytvořena s důrazem na čistotu terpenů, certifikaci v EU a nulové psychoaktivní účinky (0.0% THC).
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {products.map((product, idx) => (
            <ProductCardClient key={product.id} product={product} idx={idx} />
          ))}
        </div>

        <div className="mt-14 p-4 sm:p-5 rounded-xl border border-brand-gold/30 bg-gradient-to-r from-brand-dark via-brand-surface to-brand-dark text-center transition-all duration-300 hover:border-brand-gold/60 hover:shadow-[0_0_20px_rgba(212,175,55,0.12)]">
          <p className="text-xs sm:text-sm font-medium tracking-wide text-brand-beige flex flex-wrap items-center justify-center gap-2 sm:gap-4">
            <span className="text-brand-gold font-bold dot-pulse">●</span>
            <span>Doprava zdarma po celé ČR od 2 000 CZK</span>
            <span className="hidden sm:inline text-brand-gold/50">|</span>
            <span>Doručení do 24–48h (Zásilkovna / PPL)</span>
            <span className="hidden sm:inline text-brand-gold/50">|</span>
            <span>100% diskrétní luxusní balení</span>
          </p>
        </div>
      </div>
    </section>
  );
}
