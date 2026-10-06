export default function ComparisonTable() {
  return (
    <section id="proc-zvolit" className="py-20 lg:py-28 relative bg-[#070707]/60 border-t border-brand-gold/15">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3.5 py-1 rounded-full border border-brand-gold/30 bg-brand-dark text-[11px] font-semibold tracking-[0.25em] text-brand-goldLight uppercase mb-4 shadow-[0_0_10px_rgba(212,175,55,0.15)]">
            VĚDECKÝ STANDARD & KVALITA
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif-luxury font-normal text-white mb-3">
            Proč zvolit CBD Master Level?
          </h2>
          <p className="text-sm sm:text-base text-brand-beige/70 font-light">
            Porovnání s běžnými oleji dostupnými na trhu
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse" id="comparison-table">
            <thead>
              <tr className="border-b border-brand-gold/20">
                <th className="py-5 px-4 sm:px-6 text-xs font-semibold tracking-[0.2em] text-brand-muted uppercase w-1/4">
                  VLASTNOST / PARAMETR
                </th>
                <th className="py-5 px-4 sm:px-6 bg-brand-dark/95 border-t-2 border-l border-r border-brand-gold rounded-t-xl text-center w-5/12 table-column-glow">
                  <div className="inline-flex items-center space-x-2">
                    <span className="w-5 h-5 rounded-full bg-brand-gold text-brand-black flex items-center justify-center text-xs font-bold shadow-sm">✓</span>
                    <span className="text-sm sm:text-base font-serif-luxury tracking-widest font-bold text-brand-gold">CBD MASTER LEVEL</span>
                  </div>
                </th>
                <th className="py-5 px-4 sm:px-6 text-xs font-medium tracking-[0.15em] text-stone-500 uppercase text-center w-1/3">
                  BĚŽNÝ CBD OLEJ Z TRHU
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs sm:text-sm">
              <tr className="table-row-hover transition-colors duration-200">
                <td className="py-6 px-4 sm:px-6 font-medium text-white tracking-wide">Terpenový profil</td>
                <td className="py-6 px-4 sm:px-6 bg-brand-dark/70 border-l border-r border-brand-gold/40 text-brand-beige">
                  <div className="flex items-start space-x-2.5">
                    <span className="text-brand-gold font-bold text-base leading-none">✔</span>
                    <span className="leading-relaxed">Originální konopné profily (např. Super Lemon Haze, Gelato) s plným doprovodným efektem (entourage effect).</span>
                  </div>
                </td>
                <td className="py-6 px-4 sm:px-6 text-stone-400">
                  <div className="flex items-start space-x-2.5">
                    <span className="text-red-400/80 font-bold text-base leading-none">✘</span>
                    <span className="leading-relaxed">Žádné terpeny nebo syntetická laboratorní aromata.</span>
                  </div>
                </td>
              </tr>
              <tr className="table-row-hover transition-colors duration-200">
                <td className="py-6 px-4 sm:px-6 font-medium text-white tracking-wide">Olejová báze</td>
                <td className="py-6 px-4 sm:px-6 bg-brand-dark/70 border-l border-r border-brand-gold/40 text-brand-beige">
                  <div className="flex items-start space-x-2.5">
                    <span className="text-brand-gold font-bold text-base leading-none">✔</span>
                    <span className="leading-relaxed">100% Čistý kokosový MCT olej (okamžitě vstřebatelný, jemná neutrální chuť).</span>
                  </div>
                </td>
                <td className="py-6 px-4 sm:px-6 text-stone-400">
                  <div className="flex items-start space-x-2.5">
                    <span className="text-red-400/80 font-bold text-base leading-none">✘</span>
                    <span className="leading-relaxed">Obyčejný technický konopný olej (hořká, dráždivá a trpká chuť).</span>
                  </div>
                </td>
              </tr>
              <tr className="table-row-hover transition-colors duration-200">
                <td className="py-6 px-4 sm:px-6 font-medium text-white tracking-wide">Účinek a působení</td>
                <td className="py-6 px-4 sm:px-6 bg-brand-dark/70 border-l border-r border-brand-gold/40 text-brand-beige">
                  <div className="flex items-start space-x-2.5">
                    <span className="text-brand-gold font-bold text-base leading-none">✔</span>
                    <span className="leading-relaxed">Cílené funkční působení (Soustředění / Hluboký spánek / Úleva od stresu).</span>
                  </div>
                </td>
                <td className="py-6 px-4 sm:px-6 text-stone-400">
                  <div className="flex items-start space-x-2.5">
                    <span className="text-red-400/80 font-bold text-base leading-none">✘</span>
                    <span className="leading-relaxed">Nejasné, náhodné nebo pouze obecné působení bez synergického účinku.</span>
                  </div>
                </td>
              </tr>
              <tr className="table-row-hover transition-colors duration-200">
                <td className="py-6 px-4 sm:px-6 font-medium text-white tracking-wide">Chuť a aroma</td>
                <td className="py-6 px-4 sm:px-6 bg-brand-dark/70 border-l border-r border-brand-gold/40 text-brand-beige">
                  <div className="flex items-start space-x-2.5">
                    <span className="text-brand-gold font-bold text-base leading-none">✔</span>
                    <span className="leading-relaxed">Delikátní, autentický bylinně-ovocný profil bez nepříjemné pachuti.</span>
                  </div>
                </td>
                <td className="py-6 px-4 sm:px-6 text-stone-400">
                  <div className="flex items-start space-x-2.5">
                    <span className="text-red-400/80 font-bold text-base leading-none">✘</span>
                    <span className="leading-relaxed">Nepříjemně hořký, svíravý a kalný zemitý podtón.</span>
                  </div>
                </td>
              </tr>
              <tr className="table-row-hover transition-colors duration-200">
                <td className="py-6 px-4 sm:px-6 font-medium text-white tracking-wide">Balení a ochrana</td>
                <td className="py-6 px-4 sm:px-6 bg-brand-dark/95 border-l border-r border-b border-brand-gold rounded-b-xl text-brand-beige table-column-glow">
                  <div className="flex items-start space-x-2.5">
                    <span className="text-brand-gold font-bold text-base leading-none">✔</span>
                    <span className="leading-relaxed">Speciální farmaceutické fialové Miron/UV sklo chránící vzácné kanabinoidy + Prémiový magnetický box.</span>
                  </div>
                </td>
                <td className="py-6 px-4 sm:px-6 text-stone-400">
                  <div className="flex items-start space-x-2.5">
                    <span className="text-red-400/80 font-bold text-base leading-none">✘</span>
                    <span className="leading-relaxed">Obyčejná průhledná lahvička náchylná k rychlé degradaci světlem.</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
