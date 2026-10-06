import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 border-b border-brand-gold/15 overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-40">
            <Image 
              src="/images/penthouse_laptop_night.jpg" 
              alt="Večerní práce v luxusním penthouse" 
              fill 
              className="object-cover" 
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-b from-brand-black/60 via-brand-black/40 to-brand-black/60"></div>
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto text-center mt-10">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white tracking-wide mb-6">
              Příběh značky <span className="text-brand-gold italic">Master Level</span>
            </h1>
            <p className="text-lg sm:text-xl text-brand-beige/80 font-light leading-relaxed max-w-2xl mx-auto">
              Naše cesta začala s jednoduchou, ale odvážnou myšlenkou: vytvořit CBD produkt, který neponechává žádný prostor pro kompromisy. Produkt pro ty, kteří vyžadují absolutní čistotu a maximální účinnost.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative h-[600px] rounded-sm overflow-hidden border border-brand-gold/20 shadow-[0_0_30px_rgba(212,175,55,0.05)]">
              <Image 
                src="https://images.unsplash.com/photo-1599824647306-db2899453982?q=80&w=2787&auto=format&fit=crop" 
                alt="Laboratoř CBD" 
                fill 
                className="object-cover" 
                unoptimized
              />
              <div className="absolute inset-0 bg-brand-black/20"></div>
            </div>
            <div>
              <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-brand-gold mb-4">Naše filozofie</h2>
              <h3 className="text-3xl sm:text-4xl font-serif text-white mb-6">Spojení přírody a precizní vědy</h3>
              <div className="space-y-6 text-brand-beige/70 font-light leading-relaxed text-sm sm:text-base">
                <p>
                  Na trhu zaplaveném produkty průměrné kvality jsme se rozhodli jít jinou cestou. Master Level není jen název, je to závazek k dokonalosti. Využíváme nejmodernější metody CO2 extrakce, abychom zachovali plné spektrum blahodárných látek bez stop psychoaktivního THC.
                </p>
                <p>
                  Každá kapka našeho oleje je výsledkem pečlivého výběru prémiového konopí, pěstovaného v ekologicky čistých podmínkách. Naše produkty procházejí vícestupňovým laboratorním testováním u nezávislých institucí pro zaručení naprosté bezpečnosti.
                </p>
                <p>
                  Věříme, že skutečný luxus spočívá v transparentnosti, čistotě a hmatatelných výsledcích. Naše oleje jsou obohaceny o vysoce kvalitní MCT kokosový olej, který zaručuje okamžitou vstřebatelnost a maximální biologickou dostupnost pro Vaše tělo.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#090909]/50 backdrop-blur-sm border-t border-brand-gold/10">
          <div className="max-w-7xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-serif text-white mb-4">Pilíře Master Level</h2>
            <div className="w-16 h-[1px] bg-brand-gold mx-auto"></div>
          </div>
          
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center p-8 border border-white/5 bg-brand-black/50 hover:border-brand-gold/30 transition-colors duration-500 rounded-sm">
              <div className="w-12 h-12 mx-auto mb-6 flex items-center justify-center rounded-full bg-brand-gold/10 text-brand-gold text-xl font-serif border border-brand-gold/20">01</div>
              <h4 className="text-white font-medium mb-3 uppercase tracking-widest text-sm">Absolutní Čistota</h4>
              <p className="text-brand-beige/60 font-light text-sm leading-relaxed">
                Používáme pouze certifikované plodiny a nejčistší nosné oleje. Nula kompromisů, nula zbytečných aditiv.
              </p>
            </div>
            
            <div className="text-center p-8 border border-white/5 bg-brand-black/50 hover:border-brand-gold/30 transition-colors duration-500 rounded-sm">
              <div className="w-12 h-12 mx-auto mb-6 flex items-center justify-center rounded-full bg-brand-gold/10 text-brand-gold text-xl font-serif border border-brand-gold/20">02</div>
              <h4 className="text-white font-medium mb-3 uppercase tracking-widest text-sm">Laboratorní Jistota</h4>
              <p className="text-brand-beige/60 font-light text-sm leading-relaxed">
                Každá šarže je podrobena přísným testům na přítomnost těžkých kovů, pesticidů a pro potvrzení profilu kanabinoidů.
              </p>
            </div>
            
            <div className="text-center p-8 border border-white/5 bg-brand-black/50 hover:border-brand-gold/30 transition-colors duration-500 rounded-sm">
              <div className="w-12 h-12 mx-auto mb-6 flex items-center justify-center rounded-full bg-brand-gold/10 text-brand-gold text-xl font-serif border border-brand-gold/20">03</div>
              <h4 className="text-white font-medium mb-3 uppercase tracking-widest text-sm">Maximální Účinnost</h4>
              <p className="text-brand-beige/60 font-light text-sm leading-relaxed">
                Díky pokročilým metodám zpracování naše oleje garantují vysokou biologickou dostupnost a rychlý nástup účinku.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
