import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#090909]/60 to-[#040404]/60 border-t border-brand-gold/25 pt-16 pb-12 text-xs text-brand-beige/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">
          
          {/* Col 1 */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="rounded-full border border-brand-gold/40 h-20 w-20 sm:h-24 sm:w-24 flex items-center justify-center bg-brand-black text-brand-gold font-serif font-bold text-xl tracking-wider transition-transform duration-500 hover:scale-105">
                CBD
              </div>
            </div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold mb-3">SPOLEČNOST A SÍDLO</h4>
            <address className="not-italic space-y-1.5 font-light text-brand-beige/80 leading-relaxed">
              <p className="font-medium text-white">CBD Master Level s.r.o.</p>
              <p>Václavské náměstí 1</p>
              <p>110 00 Praha 1, Česká republika</p>
              <p className="pt-2">Tel: <a href="tel:+420800123456" className="text-brand-gold hover:underline">+420 800 123 456</a></p>
              <p>Po–Pá: 09:00 – 17:00</p>
              <p>E-mail: <a href="mailto:info@cbdmasterlevel.cz" className="hover:text-white transition-colors">info@cbdmasterlevel.cz</a></p>
            </address>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold mb-4">O NÁS</h4>
            <ul className="space-y-2.5 font-light">
              <li><a href="#kontakt" className="hover:text-brand-gold hover:translate-x-1 inline-block transition-all duration-300">Kontaktní formulář</a></li>
              <li><a href="#mise" className="hover:text-brand-gold hover:translate-x-1 inline-block transition-all duration-300">Naše mise & Vědecký tým</a></li>
              <li><a href="#certifikaty" className="hover:text-brand-gold hover:translate-x-1 inline-block transition-all duration-300">Certifikáty jakosti a analýzy šarží (CoA)</a></li>
              <li><a href="#blog" className="hover:text-brand-gold hover:translate-x-1 inline-block transition-all duration-300">Blog o kanabinoidech</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold mb-4">MŮJ ÚČET</h4>
            <ul className="space-y-2.5 font-light">
              <li><a href="#prihlaseni" className="hover:text-brand-gold hover:translate-x-1 inline-block transition-all duration-300">Přihlášení k účtu</a></li>
              <li><a href="#objednavky" className="hover:text-brand-gold hover:translate-x-1 inline-block transition-all duration-300">Moje objednávky</a></li>
              <li><a href="#klub" className="hover:text-brand-gold hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-300"><span className="text-brand-gold">★</span> Věrnostní klub Master Elite</a></li>
              <li><a href="#sledovani" className="hover:text-brand-gold hover:translate-x-1 inline-block transition-all duration-300">Sledování zásilky</a></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold mb-4">ZÁKAZNICKÁ PÉČE</h4>
            <ul className="space-y-2.5 font-light">
              <li><a href="#platby" className="hover:text-brand-gold hover:translate-x-1 inline-block transition-all duration-300">Platební metody (Apple Pay, Karty, Převod)</a></li>
              <li><a href="#doruceni" className="hover:text-brand-gold hover:translate-x-1 inline-block transition-all duration-300">Doba a ceny doručení (Zásilkovna, PPL)</a></li>
              <li><a href="#reklamace" className="hover:text-brand-gold hover:translate-x-1 inline-block transition-all duration-300">Reklamace a vrácení zboží</a></li>
              <li><a href="#faq" className="hover:text-brand-gold hover:translate-x-1 inline-block transition-all duration-300">Často kladené otázky (FAQ)</a></li>
            </ul>
          </div>

          {/* Col 5 */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold mb-4">PRÁVNÍ INFORMACE</h4>
            <ul className="space-y-2.5 font-light">
              <li><a href="#obchodni-podminky" className="hover:text-brand-gold hover:translate-x-1 inline-block transition-all duration-300">Obchodní podmínky</a></li>
              <li><a href="#gdpr" className="hover:text-brand-gold hover:translate-x-1 inline-block transition-all duration-300">Zásady ochrany osobních údajů (GDPR)</a></li>
              <li><a href="#cookies" className="hover:text-brand-gold hover:translate-x-1 inline-block transition-all duration-300">Nastavení souborů cookies</a></li>
              <li className="pt-2 text-[10px] text-brand-muted border-t border-white/5 leading-normal">
                Upozornění: Doplňky stravy. Není určeno pro těhotné ženy a osoby mladší 18 let.
              </li>
            </ul>
          </div>
        </div>

        {/* Social & Copyright */}
        <div className="pt-8 border-t border-brand-gold/15 flex flex-col items-center justify-center space-y-6">
          <div className="flex items-center space-x-6">
            <a href="#facebook" aria-label="Facebook" className="w-16 h-16 rounded-full border border-brand-gold/40 flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-brand-black hover:scale-110 transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.1)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)]">
              <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
              </svg>
            </a>
            <a href="#instagram" aria-label="Instagram" className="w-16 h-16 rounded-full border border-brand-gold/40 flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-brand-black hover:scale-110 transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.1)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)]">
              <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
              </svg>
            </a>
            <a href="#tiktok" aria-label="TikTok" className="w-16 h-16 rounded-full border border-brand-gold/40 flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-brand-black hover:scale-110 transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.1)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)]">
              <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.3 0 .59.04.86.12V8.98a6.37 6.37 0 0 0-.86-.06 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.05a8.28 8.28 0 0 0 4.76 1.49V7.09a4.85 4.85 0 0 1-1-.4z"></path>
              </svg>
            </a>
          </div>
          <p className="text-center text-brand-beige/50 font-light text-[11px] tracking-wider">
            © 2025 CBD Master Level s.r.o. Všechna práva vyhrazena. 
          </p>
        </div>
      </div>
    </footer>
  );
}
