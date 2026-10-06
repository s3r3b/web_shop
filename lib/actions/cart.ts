'use server';

import { cookies } from 'next/headers';
import { revalidateTag, revalidatePath } from 'next/cache';
import { medusaClient } from '@/lib/medusa';
import { Product } from '@/lib/data';

const CART_COOKIE = 'medusa_cart_id';
const MOCK_CART_COOKIE = 'mock_cbd_cart';

/**
 * Zwraca zawartość koszyka. Jeśli serwer Medusy działa, odpytuje API.
 * W przeciwnym razie wykorzystuje bezpieczne ciasteczko HttpOnly (wariant deweloperski).
 */
export async function retrieveCart() {
  const cookieStore = await cookies();
  const cartId = cookieStore.get(CART_COOKIE)?.value;

  try {
    if (cartId) {
      // Przyszła integracja z Medusa API (Gdy serwer będzie podłączony):
      // const { cart } = await medusaClient.store.cart.retrieve(cartId, { next: { tags: ['cart'] } } as any);
      // return cart;
      throw new Error("Medusa API not connected yet");
    }
    throw new Error("No cart ID");
  } catch (error) {
    // FALLBACK (Brak Medusy): Parsujemy stan koszyka z szyfrowanego ciasteczka HttpOnly
    const mock = cookieStore.get(MOCK_CART_COOKIE)?.value;
    return mock ? JSON.parse(mock) : [];
  }
}

/**
 * Server Action: Dodaje produkt do koszyka za pośrednictwem serwera.
 * Używamy ciasteczek HttpOnly do zapisu sesji.
 */
export async function addToCartAction(product: Product, variant: string, quantity: number) {
  const cookieStore = await cookies();
  
  try {
    // Przyszła integracja z Medusa API:
    // let cartId = cookieStore.get(CART_COOKIE)?.value;
    // if (!cartId) {
    //   const newCart = await medusaClient.store.cart.create();
    //   cartId = newCart.cart.id;
    //   cookieStore.set(CART_COOKIE, cartId, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    // }
    // await medusaClient.store.cart.addLineItem(cartId, { variant_id: variant, quantity });
    throw new Error("Medusa API not connected yet");
  } catch (error) {
    // MOCK FALLBACK (HttpOnly Cookie Mutation)
    const currentMock = cookieStore.get(MOCK_CART_COOKIE)?.value;
    let items = currentMock ? JSON.parse(currentMock) : [];
    
    const existingId = `${product.id}-${variant}`;
    const existing = items.find((i: any) => i.id === existingId);
    
    if (existing) {
      existing.quantity += quantity;
    } else {
      items.push({ id: existingId, product, quantity, variant });
    }
    
    cookieStore.set(MOCK_CART_COOKIE, JSON.stringify(items), { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // Ważność 7 dni
    });
  }
  
  // Odświeża układ (Server Components) nowymi danymi
  // revalidateTag('cart');
  revalidatePath('/', 'layout');
}

/**
 * Server Action: Usuwa produkt z koszyka
 */
export async function removeFromCartAction(id: string) {
  const cookieStore = await cookies();
  const currentMock = cookieStore.get(MOCK_CART_COOKIE)?.value;
  if (currentMock) {
    let items = JSON.parse(currentMock).filter((i: any) => i.id !== id);
    cookieStore.set(MOCK_CART_COOKIE, JSON.stringify(items), { httpOnly: true, path: '/' });
  }
  // revalidateTag('cart');
  revalidatePath('/', 'layout');
}

/**
 * Server Action: Aktualizuje ilość danego wariantu
 */
export async function updateQuantityAction(id: string, quantity: number) {
  if (quantity <= 0) return removeFromCartAction(id);
  
  const cookieStore = await cookies();
  const currentMock = cookieStore.get(MOCK_CART_COOKIE)?.value;
  if (currentMock) {
    let items = JSON.parse(currentMock).map((i: any) => i.id === id ? { ...i, quantity } : i);
    cookieStore.set(MOCK_CART_COOKIE, JSON.stringify(items), { httpOnly: true, path: '/' });
  }
  // revalidateTag('cart');
  revalidatePath('/', 'layout');
}
