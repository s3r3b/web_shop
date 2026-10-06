'use client';
import { useState } from 'react';
import { Search, Filter, MoreHorizontal, Eye, Truck, CheckCircle2, Clock } from 'lucide-react';

export default function AdminOrdersPage() {
  const [activeTab, setActiveTab] = useState('all');

  const orders = [
    { id: '#1045', customer: 'Martin Novák', email: 'martin.n@email.cz', total: '2 490 Kč', status: 'pending', items: 2, date: 'Dnes, 14:30' },
    { id: '#1044', customer: 'Lucie Dvořáková', email: 'lucie.d@email.cz', total: '1 190 Kč', status: 'paid', items: 1, date: 'Dnes, 11:15' },
    { id: '#1043', customer: 'Petr Svoboda', email: 'petr.svoboda@email.cz', total: '3 380 Kč', status: 'shipped', items: 3, date: 'Včera' },
    { id: '#1042', customer: 'Jan Kowalski', email: 'jan@kowalski.pl', total: '1 290 Kč', status: 'delivered', items: 1, date: 'Včera' },
    { id: '#1041', customer: 'Anna Nowak', email: 'anna.n@gmail.com', total: '890 Kč', status: 'delivered', items: 1, date: '8 Zář 2026' },
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full text-xs font-medium"><Clock className="w-3 h-3"/> Oczekuje na płatność</span>;
      case 'paid':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-medium"><CheckCircle2 className="w-3 h-3"/> Opłacono</span>;
      case 'shipped':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full text-xs font-medium"><Truck className="w-3 h-3"/> Wysłano</span>;
      case 'delivered':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-medium"><CheckCircle2 className="w-3 h-3"/> Doręczono</span>;
      default:
        return <span className="px-2.5 py-1 bg-gray-500/10 text-gray-400 border border-gray-500/20 rounded-full text-xs">{status.toUpperCase()}</span>;
    }
  };

  return (
    <>
      <header className="mb-8 relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-serif text-white mb-2">Zarządzanie zamówieniami</h1>
          <p className="text-brand-beige/70 text-sm">Przegląd wszystkich zamówień w Twoim sklepie.</p>
        </div>
        <button className="bg-brand-gold text-brand-black px-4 py-2 rounded-lg text-sm font-semibold hover:bg-white transition-colors">
          Eksportuj (CSV)
        </button>
      </header>

      {/* Filters and Search */}
      <div className="bg-[#090909] border border-brand-gold/20 rounded-t-xl p-4 flex flex-col md:flex-row gap-4 justify-between items-center relative z-10">
        <div className="flex space-x-1 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
          {['all', 'pending', 'paid', 'shipped', 'delivered'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${activeTab === tab ? 'bg-brand-gold/10 text-brand-gold border border-brand-gold/20' : 'text-brand-beige/60 hover:text-white hover:bg-white/5'}`}
            >
              {tab === 'all' ? 'Wszystkie' : 
               tab === 'pending' ? 'Oczekujące' : 
               tab === 'paid' ? 'Opłacone' : 
               tab === 'shipped' ? 'Wysłane' : 'Doręczone'}
            </button>
          ))}
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-beige/40" />
            <input 
              type="text" 
              placeholder="Szukaj zamówienia..." 
              className="w-full bg-[#040404] border border-brand-gold/20 text-white text-sm rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:border-brand-gold transition-colors"
            />
          </div>
          <button className="p-2 border border-brand-gold/20 rounded-lg text-brand-beige/60 hover:text-white hover:border-brand-gold/50 transition-colors bg-[#040404]">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-[#090909] border-x border-b border-brand-gold/20 rounded-b-xl shadow-lg relative z-10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-brand-beige/80">
            <thead className="bg-[#040404] text-[10px] uppercase tracking-widest text-brand-beige/50 border-y border-brand-gold/10">
              <tr>
                <th className="px-6 py-4 font-medium">Zamówienie</th>
                <th className="px-6 py-4 font-medium">Klient</th>
                <th className="px-6 py-4 font-medium">Data</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Pozycje</th>
                <th className="px-6 py-4 font-medium text-right">Łącznie</th>
                <th className="px-6 py-4 font-medium text-center">Akcje</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-gold/10">
              {orders.map((order, index) => (
                <tr key={index} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4 font-medium text-white">{order.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-white font-medium">{order.customer}</span>
                      <span className="text-xs text-brand-beige/50">{order.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-brand-beige/60">{order.date}</td>
                  <td className="px-6 py-4">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="px-6 py-4 text-brand-beige/60">{order.items} szt.</td>
                  <td className="px-6 py-4 text-right font-medium text-white">{order.total}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-brand-gold hover:bg-brand-gold/10 rounded-md transition-colors" title="Zobacz szczegóły">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-brand-beige/60 hover:text-white hover:bg-white/10 rounded-md transition-colors" title="Więcej akcji">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-brand-gold/10 flex justify-between items-center text-xs text-brand-beige/60">
          <span>Wyświetlano 1-5 z 48 zamówień</span>
          <div className="flex space-x-1">
            <button className="px-3 py-1 rounded-md border border-brand-gold/20 text-brand-beige/40 cursor-not-allowed">Poprzednia</button>
            <button className="px-3 py-1 rounded-md bg-brand-gold text-brand-black font-medium">1</button>
            <button className="px-3 py-1 rounded-md border border-brand-gold/20 hover:bg-white/5 hover:text-white transition-colors">2</button>
            <button className="px-3 py-1 rounded-md border border-brand-gold/20 hover:bg-white/5 hover:text-white transition-colors">3</button>
            <span className="px-2 py-1">...</span>
            <button className="px-3 py-1 rounded-md border border-brand-gold/20 hover:bg-white/5 hover:text-white transition-colors">Następna</button>
          </div>
        </div>
      </div>
    </>
  );
}
