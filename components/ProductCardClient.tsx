'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ShoppingBag, Check } from 'lucide-react';
import { useCart } from '@/components/CartProvider';
import { Product } from '@/lib/data';

interface ProductCardClientProps {
  product: Product;
  idx: number;
}

export default function ProductCardClient({ product, idx }: ProductCardClientProps) {
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [isAdded, setIsAdded] = useState(false);

  const getVariantPrice = (variantStr: string) => {
    const match = variantStr.match(/-\s*([\d\s]+)\s*Kč/);
    if (match && match[1]) {
      return match[1].trim() + ' Kč';
    }
    return `${product.price.toLocaleString('cs-CZ')} Kč`;
  };

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div className={`group relative rounded-2xl bg-brand-dark p-6 sm:p-7 border border-[#D4AF37]/25 hover:border-brand-gold/70 lux-product-card flex flex-col justify-between transition-all duration-300 ${product.badge ? 'border-2 border-brand-gold shadow-[0_0_30px_rgba(212,175,55,0.2)] featured-card transform lg:-translate-y-2' : ''}`}>
      
      {product.badge && (
        <div className="badge-breathing absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#D4AF37] to-[#B38F28] text-brand-black text-[10px] font-bold tracking-[0.25em] uppercase py-1 px-4 rounded-full shadow-md z-10 whitespace-nowrap">
          {product.badge}
        </div>
      )}
      
      <div>
        <div className="flex items-center justify-between mb-4 mt-2">
          <span className="text-[11px] font-semibold tracking-[0.2em] text-brand-gold uppercase">
            0{idx + 1} · {product.subtitle}
          </span>
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] tracking-wider uppercase ${product.badge ? 'bg-brand-gold/20 border border-brand-gold text-brand-goldLight font-medium' : 'bg-brand-surface border border-brand-gold/30 text-brand-goldLight group-hover:border-brand-gold/60'}`}>
            {product.tags[1]}
          </span>
        </div>
        
        <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-black/40 mb-6 flex items-center justify-center p-2 border border-white/5 group-hover:border-brand-gold/30 transition-colors">
          <Image 
            fill 
            src={product.image} 
            alt={product.name} 
            className="object-cover rounded-lg group-hover:scale-105 transition-transform duration-500" 
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
          />
          <div className="absolute bottom-3 left-3 bg-brand-dark/95 backdrop-blur-md px-3 py-1 rounded border border-brand-gold/30 text-[10px] text-brand-goldLight font-medium">
            {product.tags[0]}
          </div>
        </div>
        
        <h3 className="text-2xl font-serif-luxury font-medium text-white mb-2 tracking-wide group-hover:text-brand-goldLight transition-colors">
          {product.name}
        </h3>
        <p className="text-xs sm:text-sm text-brand-beige/75 font-light mb-6 leading-relaxed">
          {product.description}
        </p>
      </div>
      
      <div className="mt-auto space-y-4 pt-4 border-t border-white/10">
        {/* Dynamic Price Display */}
        <div className="flex items-baseline justify-between">
          <span className="text-[11px] text-brand-muted uppercase tracking-wider font-light">Cena vč. 21% DPH</span>
          <span className="text-xl sm:text-2xl font-serif-luxury font-bold text-brand-gold">
            {getVariantPrice(selectedVariant)}
          </span>
        </div>

        {/* Variant Selector */}
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-brand-beige/60 mb-1.5">Zvolte objem a koncentraci</label>
          <div className="relative">
            <select 
              className="w-full bg-[#070707] border border-brand-gold/30 text-white text-xs sm:text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-brand-gold appearance-none cursor-pointer"
              value={selectedVariant}
              onChange={(e) => setSelectedVariant(e.target.value)}
            >
              {product.variants.map(v => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-brand-gold text-xs">
              ▼
            </div>
          </div>
        </div>
        
        {/* Add to Cart CTA */}
        <button 
          onClick={handleAddToCart}
          className={`btn-shine w-full flex items-center justify-center space-x-2 font-bold text-xs uppercase tracking-widest py-3.5 rounded-lg transition-all duration-300 shadow-md ${
            isAdded
              ? 'bg-emerald-500 text-black border border-emerald-400'
              : product.badge 
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#B38F28] hover:from-[#E5C358] hover:to-[#D4AF37] text-brand-black shadow-[0_4px_20px_rgba(212,175,55,0.4)]' 
                : 'bg-brand-surface hover:bg-brand-gold hover:text-brand-black border border-brand-gold/50 text-brand-gold'
          }`}
        >
          {isAdded ? (
            <>
              <Check className="w-4 h-4 text-black" />
              <span>Přidáno do košíku</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />
              <span>Do košíku</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
