'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Search, Filter, Plus, MoreHorizontal, Edit, Trash2, Box } from 'lucide-react';
import { products } from '@/lib/data';

export default function AdminProductsPage() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <>
      <header className="mb-8 relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-serif text-white mb-2">Zarządzanie produktami</h1>
          <p className="text-brand-beige/70 text-sm">Zarządzaj katalogiem swoich produktów premium CBD.</p>
        </div>
        <button className="flex items-center gap-2 bg-brand-gold text-brand-black px-4 py-2 rounded-lg text-sm font-semibold hover:bg-white transition-colors shadow-[0_0_15px_rgba(212,175,55,0.3)]">
          <Plus className="w-4 h-4" />
          <span>Dodaj produkt</span>
        </button>
      </header>

      {/* Filters and Search */}
      <div className="bg-[#090909] border border-brand-gold/20 rounded-t-xl p-4 flex flex-col md:flex-row gap-4 justify-between items-center relative z-10">
        <div className="flex space-x-1 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
          {['all', 'published', 'drafts', 'out-of-stock'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${activeTab === tab ? 'bg-brand-gold/10 text-brand-gold border border-brand-gold/20' : 'text-brand-beige/60 hover:text-white hover:bg-white/5'}`}
            >
              {tab === 'all' ? 'Wszystkie' : 
               tab === 'published' ? 'Aktywne' : 
               tab === 'drafts' ? 'Szkice' : 'Wyprzedane'}
            </button>
          ))}
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-beige/40" />
            <input 
              type="text" 
              placeholder="Szukaj produktu..." 
              className="w-full bg-[#040404] border border-brand-gold/20 text-white text-sm rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:border-brand-gold transition-colors"
            />
          </div>
          <button className="p-2 border border-brand-gold/20 rounded-lg text-brand-beige/60 hover:text-white hover:border-brand-gold/50 transition-colors bg-[#040404]">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-[#090909] border-x border-b border-brand-gold/20 rounded-b-xl shadow-lg relative z-10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-brand-beige/80">
            <thead className="bg-[#040404] text-[10px] uppercase tracking-widest text-brand-beige/50 border-y border-brand-gold/10">
              <tr>
                <th className="px-6 py-4 font-medium">Produkt</th>
                <th className="px-6 py-4 font-medium">Kategoria</th>
                <th className="px-6 py-4 font-medium">Warianty</th>
                <th className="px-6 py-4 font-medium">Stan magazynowy</th>
                <th className="px-6 py-4 font-medium">Cena bazowa</th>
                <th className="px-6 py-4 font-medium text-center">Akcje</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-gold/10">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-12 rounded-md overflow-hidden bg-black/40 border border-brand-gold/20 flex-shrink-0">
                        <Image src={product.image} alt={product.name} fill className="object-cover" unoptimized />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-white font-medium font-serif">{product.name}</span>
                        <span className="text-xs text-brand-beige/50">{product.subtitle}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {product.tags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 bg-brand-surface border border-brand-gold/30 rounded-full text-[10px] text-brand-goldLight whitespace-nowrap">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-brand-beige/60">
                    <span className="px-2 py-1 bg-white/5 rounded text-xs">{product.variants.length} wariantów</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      <span className="text-emerald-400 text-xs">W magazynie</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-white font-medium">
                    {product.price.toLocaleString('cs-CZ')} Kč
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-brand-gold hover:bg-brand-gold/10 rounded-md transition-colors" title="Edytuj produkt">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-brand-beige/60 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors" title="Usuń produkt">
                        <Trash2 className="w-4 h-4" />
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
          <span>Wyświetlano 1-{products.length} z {products.length} produktów</span>
          <div className="flex space-x-1">
            <button className="px-3 py-1 rounded-md border border-brand-gold/20 text-brand-beige/40 cursor-not-allowed">Poprzednia</button>
            <button className="px-3 py-1 rounded-md bg-brand-gold text-brand-black font-medium">1</button>
            <button className="px-3 py-1 rounded-md border border-brand-gold/20 text-brand-beige/40 cursor-not-allowed">Następna</button>
          </div>
        </div>
      </div>
    </>
  );
}
