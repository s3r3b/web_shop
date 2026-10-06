import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-16 lg:py-24 border-b border-[#D4AF37]/15">
      {/* Background Graphic & Overlays */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <Image fill src="/images/penthouse_laptop_night.jpg" alt="Večerní práce v luxusním penthouse" className="object-cover object-center opacity-40 scale-105 transition-all duration-1000" unoptimized />
        {/* Ambient Golden Mist & Drifting Bokeh Particles */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#070707]/60 via-transparent to-[#070707]/60"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(7,7,7,0)_0%,rgba(7,7,7,0.6)_50%,rgba(7,7,7,0.6)_100%)]"></div>
        <div className="particle-1 absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-brand-gold/10 blur-[90px]"></div>
        <div className="particle-2 absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-brand-goldLight/10 blur-[100px]"></div>
        <div className="particle-3 absolute top-1/2 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-brand-gold/5 blur-[120px]"></div>
      </div>
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif-luxury font-normal text-white tracking-tight leading-[1.1] mb-3">
          Převezměte kontrolu nad svým dnem i nocí.
        </h1>
        <p className="text-2xl sm:text-4xl lg:text-5xl font-serif-luxury italic font-light tracking-wide bg-gradient-to-r from-brand-goldLight via-brand-gold to-brand-goldDark bg-clip-text text-transparent mb-6 gold-text-glow">
          Prémiový CBD olej pro náročné.
        </p>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-brand-beige/80 leading-relaxed font-light mb-10">
          Formule nové generace založené na čistém kokosovém MCT oleji a přírodních profilech terpenů. Získejte zpět absolutní rovnováhu, soustředění a hluboký spánek.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-16">
          <a href="/produkty" className="btn-shine w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#B38F28] hover:from-[#E5C358] hover:to-[#D4AF37] text-brand-black font-semibold text-xs sm:text-sm uppercase tracking-[0.2em] rounded-full shadow-[0_4px_25px_rgba(212,175,55,0.35)]">
            PROZKOUMAT KOLEKCI MASTER LEVEL →
          </a>
          <a href="#proc-zvolit" className="w-full sm:w-auto px-8 py-4 bg-brand-dark/90 hover:bg-brand-surface border border-brand-gold/30 hover:border-brand-gold hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] text-brand-beige font-medium text-xs sm:text-sm uppercase tracking-[0.18em] rounded-full transition-all duration-300 hover:-translate-y-0.5">
            PROČ MASTER LEVEL? ⌅
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8 border-t border-brand-gold/15 max-w-4xl mx-auto">
          <div className="flex items-center justify-center space-x-2 text-xs tracking-wider text-brand-beige/70">
            <span className="text-brand-gold text-sm font-bold">✓</span>
            <span className="font-light"><strong className="font-medium text-white">0.0% THC</strong> (Plné spektrum bez psychoaktivity)</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-xs tracking-wider text-brand-beige/70">
            <span className="text-brand-gold text-sm font-bold">✓</span>
            <span className="font-light"><strong className="font-medium text-white">MCT Pure</strong> (Okamžitá vstřebatelnost)</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-xs tracking-wider text-brand-beige/70">
            <span className="text-brand-gold text-sm font-bold">✓</span>
            <span className="font-light"><strong className="font-medium text-white">Laboratorně</strong> (Certifikováno v EU)</span>
          </div>
        </div>
      </div>
    </section>
  );
}
