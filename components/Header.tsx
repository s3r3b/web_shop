"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { UserRound, ShoppingBag, X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '@/components/CartProvider';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cartCount, 
    items, 
    cartTotal, 
    removeFromCart, 
    updateQuantity 
  } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when either menu or cart is open
  useEffect(() => {
    if (isMenuOpen || isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen, isCartOpen]);

  return (
    <div className="w-full">
      <header className={`sticky top-0 z-50 backdrop-blur-md bg-[#070707]/85 border-b border-[#D4AF37]/20 transition-all duration-300 ${scrolled ? 'shadow-[0_8px_30px_rgba(0,0,0,0.85)]' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-24 flex items-center justify-between">
          
          {/* Left: Minimal Luxury Hamburger */}
          <button 
            type="button" 
            onClick={() => setIsMenuOpen(true)} 
            onTouchEnd={(e) => {
              e.preventDefault();
              setIsMenuOpen(true);
            }}
            className="flex items-center space-x-3 cursor-pointer group py-3 px-2 -ml-2 rounded-lg hover:bg-white/5 active:bg-white/10 transition-colors"
          >
            <div className="flex flex-col space-y-1.5 w-6 transition-transform duration-300 group-hover:scale-105 pointer-events-none">
              <span className="h-[1.5px] w-6 bg-brand-beige group-hover:bg-brand-gold transition-all duration-300"></span>
              <span className="h-[1.5px] w-4 bg-brand-beige group-hover:w-6 group-hover:bg-brand-gold transition-all duration-300"></span>
              <span className="h-[1.5px] w-5 bg-brand-beige group-hover:w-6 group-hover:bg-brand-gold transition-all duration-300"></span>
            </div>
            <span className="text-xs uppercase tracking-[0.25em] font-medium text-brand-beige/80 group-hover:text-brand-gold group-hover:tracking-[0.3em] transition-all duration-300 pointer-events-none">MENU</span>
          </button>
          
          {/* Center: Brand Logo (Temporary Vector Placeholder) */}
          <div className="flex items-center justify-center absolute left-1/2 -translate-x-1/2">
            <Link href="/" className="block relative group py-2">
              <div className="absolute inset-0 rounded-full bg-[#D4AF37] opacity-20 blur-md group-hover:opacity-50 transition-opacity duration-500"></div>
              <div className="relative h-12 w-12 sm:h-14 sm:w-14 rounded-full border border-brand-gold/40 flex items-center justify-center bg-brand-black text-brand-gold font-serif font-bold text-xs tracking-wider shadow-[0_0_8px_rgba(212,175,55,0.4)] transition-transform duration-500 group-hover:scale-105">
                CBD
              </div>
            </Link>
          </div>
          
          {/* Right: Region Pill, Profile & Luxury Bag */}
          <div className="flex items-center space-x-2 sm:space-x-6">
            <div className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-full border border-brand-gold/30 bg-brand-dark text-[11px] font-medium tracking-wider text-brand-beige hover:border-brand-gold hover:shadow-[0_0_12px_rgba(212,175,55,0.25)] transition-all duration-300 cursor-pointer">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2 shadow-[0_0_6px_#34d399]"></span>
              CZ · CZK
            </div>
            <Link href="/prihlaseni" aria-label="Můj účet" className="p-3 -m-3 rounded-full text-brand-beige/80 hover:text-brand-gold hover:bg-white/5 active:bg-white/10 transition-all duration-300 mr-2">
              <UserRound strokeWidth={1} className="w-5 h-5 pointer-events-none" />
            </Link>
            <button type="button" onClick={() => setIsCartOpen(true)} aria-label="Nákupní košík" className="relative p-3 -m-3 rounded-full text-brand-beige/80 hover:text-brand-gold hover:bg-white/5 active:bg-white/10 transition-all duration-300">
              <ShoppingBag strokeWidth={1} className="w-5 h-5 pointer-events-none" />
              {cartCount > 0 && (
                <span className="cart-badge-pulse absolute top-1 right-1 bg-brand-gold text-brand-black text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center shadow-sm pointer-events-none">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Drawer Overlay */}
      {(isMenuOpen || isCartOpen) && (
        <div 
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={() => {
            setIsMenuOpen(false);
            setIsCartOpen(false);
          }} 
        />
      )}

      {/* Navigation Drawer */}
      <div className={`fixed inset-y-0 left-0 z-[70] w-full sm:w-[450px] bg-gradient-to-b from-[#090909] to-[#040404] border-r border-brand-gold/20 transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-8 sm:p-12 h-full flex flex-col relative overflow-hidden">
          {/* Subtle gold glow behind menu */}
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="flex justify-between items-center mb-16 relative z-10">
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-gold">MENU</span>
            <button 
              onClick={() => setIsMenuOpen(false)} 
              className="text-brand-beige hover:text-brand-gold transition-all duration-300 hover:rotate-90 p-2 -mr-2"
              aria-label="Zavřít menu"
            >
              <X strokeWidth={1} className="w-7 h-7" />
            </button>
          </div>
          
          <nav className="flex flex-col space-y-6 relative z-10 mt-4">
            <Link href="/" onClick={() => setIsMenuOpen(false)} className="group flex items-center w-max">
              <span className="w-5 h-[1px] bg-brand-gold/30 mr-4 group-hover:w-10 group-hover:bg-brand-gold transition-all duration-500"></span>
              <span className="text-xl sm:text-2xl font-serif text-white group-hover:text-brand-gold transition-colors tracking-wide">HLAVNÍ STRÁNKA</span>
            </Link>
            <Link href="/produkty" onClick={() => setIsMenuOpen(false)} className="group flex items-center w-max">
              <span className="w-5 h-[1px] bg-brand-gold/30 mr-4 group-hover:w-10 group-hover:bg-brand-gold transition-all duration-500"></span>
              <span className="text-xl sm:text-2xl font-serif text-white group-hover:text-brand-gold transition-colors tracking-wide">OBCHOD</span>
            </Link>
            <Link href="/o-nas" onClick={() => setIsMenuOpen(false)} className="group flex items-center w-max">
              <span className="w-5 h-[1px] bg-brand-gold/30 mr-4 group-hover:w-10 group-hover:bg-brand-gold transition-all duration-500"></span>
              <span className="text-xl sm:text-2xl font-serif text-white group-hover:text-brand-gold transition-colors tracking-wide">O NÁS</span>
            </Link>
            <Link href="/kontakt" onClick={() => setIsMenuOpen(false)} className="group flex items-center w-max">
              <span className="w-5 h-[1px] bg-brand-gold/30 mr-4 group-hover:w-10 group-hover:bg-brand-gold transition-all duration-500"></span>
              <span className="text-xl sm:text-2xl font-serif text-white group-hover:text-brand-gold transition-colors tracking-wide">KONTAKT</span>
            </Link>
          </nav>
          
          <div className="mt-auto pt-8 border-t border-brand-gold/10 relative z-10">
            <div className="mb-6 flex items-center justify-center w-20 h-20 rounded-full border border-brand-gold/20 bg-brand-black/50 text-brand-gold font-serif font-bold opacity-60 hover:opacity-100 transition-all duration-500">
              CBD
            </div>
            <address className="not-italic text-brand-beige/60 text-[13px] space-y-2.5 font-light">
              <p className="hover:text-white transition-colors cursor-pointer">info@cbdmasterlevel.cz</p>
              <p className="hover:text-white transition-colors cursor-pointer">+420 800 123 456</p>
              <div className="pt-6 flex items-center gap-6">
                <a href="#instagram" className="text-brand-gold/70 hover:text-brand-gold text-[11px] font-bold tracking-[0.2em] uppercase transition-colors">Instagram</a>
                <a href="#facebook" className="text-brand-gold/70 hover:text-brand-gold text-[11px] font-bold tracking-[0.2em] uppercase transition-colors">Facebook</a>
              </div>
            </address>
          </div>
        </div>
      </div>

      {/* Cart Drawer */}
      <div className={`fixed inset-y-0 right-0 z-[70] w-full sm:w-[450px] bg-gradient-to-b from-[#090909] to-[#040404] border-l border-brand-gold/20 transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 sm:p-12 h-full flex flex-col relative overflow-hidden">
          {/* Subtle gold glow behind cart */}
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="flex justify-between items-center mb-16 relative z-10">
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-gold">NÁKUPNÍ KOŠÍK</span>
            <button 
              onClick={() => setIsCartOpen(false)} 
              className="text-brand-beige hover:text-brand-gold transition-all duration-300 hover:rotate-90 p-2 -mr-2"
              aria-label="Zavřít košík"
            >
              <X strokeWidth={1} className="w-7 h-7" />
            </button>
          </div>
          
          <div className="flex-1 flex flex-col relative z-10">
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center opacity-70">
                <div className="w-24 h-24 rounded-full border border-brand-gold/20 flex items-center justify-center text-brand-gold/50 mb-8">
                  <ShoppingBag strokeWidth={1} className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-serif text-white mb-3">Váš košík je prázdný</h3>
                <p className="text-sm font-light text-brand-beige/70 mb-10 max-w-[280px]">
                  Objevte naše prémiové CBD produkty a najděte si svůj oblíbený.
                </p>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="bg-brand-gold text-brand-black font-semibold text-xs uppercase tracking-widest px-10 py-4 rounded-lg hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                >
                  ZAČÍT NAKUPOVAT
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto pr-2 space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 border-b border-white/5 pb-6">
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-black/40 border border-brand-gold/20 flex-shrink-0">
                        <Image src={item.product.image} alt={item.product.name} fill className="object-cover" unoptimized />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="text-white font-serif tracking-wide">{item.product.name}</h4>
                            <button onClick={() => removeFromCart(item.id)} className="text-brand-beige/40 hover:text-red-400 transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-[10px] text-brand-gold/70">{item.variant}</p>
                        </div>
                        <div className="flex justify-between items-end mt-2">
                          <div className="flex items-center border border-brand-gold/30 rounded-md">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 text-brand-beige/60 hover:text-white transition-colors">
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs text-white">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 text-brand-beige/60 hover:text-white transition-colors">
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          {/* Price is already in the variant string for simplicity, but we can display total price per item */}
                          <p className="text-sm text-brand-gold font-medium">
                            {(() => {
                              const match = item.variant.match(/-\s*([\d\s]+)\s*Kč/);
                              const price = match && match[1] ? parseInt(match[1].replace(/\s/g, ''), 10) : item.product.price;
                              return `${(price * item.quantity).toLocaleString('cs-CZ')} Kč`;
                            })()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="pt-6 border-t border-brand-gold/20 mt-6">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-sm text-brand-beige/70 uppercase tracking-widest">Celkem</span>
                    <span className="text-2xl font-serif text-white">{cartTotal.toLocaleString('cs-CZ')} Kč</span>
                  </div>
                  <a href="/pokladna" onClick={() => setIsCartOpen(false)} className="w-full flex items-center justify-center bg-brand-gold text-brand-black font-semibold text-xs uppercase tracking-widest py-4 rounded-lg hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                    PŘEJÍT K POKLADNĚ
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
