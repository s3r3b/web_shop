'use client';
import { createContext, useContext, useState, useEffect, ReactNode, useTransition } from 'react';
import { Product } from '@/lib/data';
import { addToCartAction, removeFromCartAction, updateQuantityAction, retrieveCart } from '@/lib/actions/cart';

export interface CartItem {
  id: string; // unique ID for cart item (product.id + variant)
  product: Product;
  quantity: number;
  variant: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, variant: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  cartTotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  isPending: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const EMPTY_ITEMS: CartItem[] = [];

export function CartProvider({ children, initialItems = EMPTY_ITEMS }: { children: ReactNode, initialItems?: CartItem[] }) {
  // Synchronizujemy stan lokalny z serwerowym stanem
  const [items, setItems] = useState<CartItem[]>(initialItems);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Load cart on client side on mount if initialItems are empty
  useEffect(() => {
    let mounted = true;
    if (initialItems.length === 0) {
      retrieveCart().then(data => {
        if (mounted && data && Array.isArray(data) && data.length > 0) {
          setItems(data);
        }
      }).catch(err => console.error(err));
    }
    return () => { mounted = false; };
  }, [initialItems.length]);

  const addToCart = (product: Product, variant: string, quantity: number) => {
    setIsCartOpen(true);
    
    // Optymistyczna aktualizacja UI (błyskawiczna reakcja interfejsu przed odpowiedzią serwera)
    setItems(prev => {
      const existingId = `${product.id}-${variant}`;
      const existingItem = prev.find(item => item.id === existingId);
      if (existingItem) {
        return prev.map(item => item.id === existingId ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { id: existingId, product, quantity, variant }];
    });

    // Wysłanie danych do bazy poprzez Server Action
    startTransition(async () => {
      await addToCartAction(product, variant, quantity);
    });
  };

  const removeFromCart = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
    startTransition(async () => {
      await removeFromCartAction(id);
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setItems(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
    startTransition(async () => {
      await updateQuantityAction(id, quantity);
    });
  };

  // Helper to extract price from variant string (e.g., "10ml (10% CBD) - 1 190 Kč")
  const getPriceFromVariant = (variant: string, basePrice: number) => {
    const match = variant.match(/-\s*([\d\s]+)\s*Kč/);
    if (match && match[1]) {
      return parseInt(match[1].replace(/\s/g, ''), 10);
    }
    return basePrice;
  };

  const cartTotal = items.reduce((total, item) => {
    const price = getPriceFromVariant(item.variant, item.product.price);
    return total + (price * item.quantity);
  }, 0);

  const cartCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, cartTotal, cartCount, isCartOpen, setIsCartOpen, isPending }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart musi być użyty wewnątrz CartProvider');
  }
  return context;
}
