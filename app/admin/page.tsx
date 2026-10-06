import Link from 'next/link';

export default function AdminDashboardPage() {
  return (
    <>
      <header className="mb-10 relative z-10 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-serif text-white mb-2">Dzień dobry 👋</h1>
          <p className="text-brand-beige/70 text-sm">Witaj w panelu zarządzania sklepem.</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-widest text-brand-gold mb-1">Dzisiejsza data</p>
          <p className="text-sm text-white font-light">9 Września 2026</p>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10 relative z-10">
        <div className="bg-[#090909] border border-brand-gold/20 rounded-xl p-6 shadow-lg">
          <p className="text-[10px] uppercase tracking-widest text-brand-beige/60 mb-1">Przychód</p>
          <h3 className="text-2xl font-serif text-white">€ 2,450</h3>
        </div>
        
        <div className="bg-[#090909] border border-brand-gold/20 rounded-xl p-6 shadow-lg">
          <p className="text-[10px] uppercase tracking-widest text-brand-beige/60 mb-1">Zamówienia</p>
          <h3 className="text-2xl font-serif text-white">48</h3>
        </div>

        <Link href="/admin/klienci" className="bg-[#090909] border border-brand-gold/20 rounded-xl p-6 shadow-lg hover:border-brand-gold/50 transition-colors group block">
          <div className="flex justify-between items-start">
            <p className="text-[10px] uppercase tracking-widest text-brand-beige/60 mb-1">Klienci</p>
            <span className="text-xs text-brand-gold opacity-0 group-hover:opacity-100 transition-opacity">Správa &rarr;</span>
          </div>
          <h3 className="text-2xl font-serif text-white">37</h3>
        </Link>

        <div className="bg-[#090909] border border-brand-gold/20 rounded-xl p-6 shadow-lg">
          <p className="text-[10px] uppercase tracking-widest text-brand-beige/60 mb-1">Średnia wart. zam.</p>
          <h3 className="text-2xl font-serif text-white">€ 51.04</h3>
        </div>
      </div>

      {/* Alerts & Inventory */}
      <div className="mb-10 relative z-10">
        <div className="bg-[#1a1505] border border-brand-gold/30 rounded-xl p-4 flex items-center shadow-lg">
          <span className="text-2xl mr-4">⚠️</span>
          <div>
            <h4 className="text-brand-gold font-medium text-sm">Niski stan magazynowy</h4>
            <p className="text-brand-beige/70 text-xs mt-1">Produkt <strong>CBD Oil 10%</strong> ma na stanie tylko 7 sztuk.</p>
          </div>
          <Link href="/admin/magazyn" className="ml-auto bg-brand-gold/10 text-brand-gold border border-brand-gold/20 px-4 py-2 rounded-lg text-xs font-medium hover:bg-brand-gold/20 transition-colors">
            Zaktualizuj magazyn
          </Link>
        </div>
      </div>

      {/* Recent Orders Table Mockup */}
      <div className="bg-[#090909] border border-brand-gold/20 rounded-xl shadow-lg relative z-10 overflow-hidden">
        <div className="p-6 border-b border-brand-gold/10 flex justify-between items-center">
          <h2 className="text-lg font-serif text-white">Ostatnie zamówienia</h2>
          <div className="flex space-x-2">
            <button className="px-3 py-1.5 bg-brand-gold/10 text-brand-gold text-xs rounded-md border border-brand-gold/20">Wszystkie</button>
            <button className="px-3 py-1.5 text-brand-beige/50 text-xs rounded-md hover:text-white transition-colors">Oczekujące</button>
            <button className="px-3 py-1.5 text-brand-beige/50 text-xs rounded-md hover:text-white transition-colors">Wysłane</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-brand-beige/80">
            <thead className="bg-[#040404] text-[10px] uppercase tracking-widest text-brand-beige/50">
              <tr>
                <th className="px-6 py-4 font-medium">Zamówienie</th>
                <th className="px-6 py-4 font-medium">Klient</th>
                <th className="px-6 py-4 font-medium">Suma</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-gold/10">
              <tr className="hover:bg-white/5 transition-colors cursor-pointer">
                <td className="px-6 py-4 font-medium text-white">#1042</td>
                <td className="px-6 py-4">Jan Kowalski</td>
                <td className="px-6 py-4">129 PLN</td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 bg-brand-gold/10 text-brand-gold border border-brand-gold/20 rounded-full text-xs">PAID</span>
                </td>
                <td className="px-6 py-4 text-brand-beige/50">Dzisiaj</td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors cursor-pointer">
                <td className="px-6 py-4 font-medium text-white">#1041</td>
                <td className="px-6 py-4">Anna Nowak</td>
                <td className="px-6 py-4">59 PLN</td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs">SHIPPED</span>
                </td>
                <td className="px-6 py-4 text-brand-beige/50">Dzisiaj</td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors cursor-pointer">
                <td className="px-6 py-4 font-medium text-white">#1040</td>
                <td className="px-6 py-4">Piotr X</td>
                <td className="px-6 py-4">99 PLN</td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs">DELIVERED</span>
                </td>
                <td className="px-6 py-4 text-brand-beige/50">Wczoraj</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
