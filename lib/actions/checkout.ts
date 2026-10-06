'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { emailService } from '@/lib/services/email';
import { OrderItem } from '@/components/emails/order-confirmation-email';

const MOCK_CART_COOKIE = 'mock_cbd_cart';

const checkoutSchema = z.object({
  firstName: z.string().min(2, 'Vyplňte prosím křestní jméno.'),
  lastName: z.string().min(2, 'Vyplňte prosím příjmení.'),
  email: z.string().email('Zadejte platnou e-mailovou adresu.'),
  phone: z.string().min(9, 'Zadejte platné telefonní číslo.'),
  address: z.string().min(3, 'Zadejte ulici a číslo popisné.'),
  city: z.string().min(2, 'Zadejte město.'),
  zip: z.string().min(4, 'Zadejte platné PSČ.'),
});

export type CheckoutState = {
  success: boolean;
  message?: string;
  error?: string;
  orderId?: string;
};

export async function submitCheckoutAction(
  _prevState: any,
  formData: FormData
): Promise<CheckoutState> {
  try {
    const rawData = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      address: formData.get('address'),
      city: formData.get('city'),
      zip: formData.get('zip'),
    };

    const parsed = checkoutSchema.safeParse(rawData);
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.errors[0]?.message || 'Vyplňte prosím všechna povinná pole správně.',
      };
    }

    const { firstName, lastName, email, address, city, zip } = parsed.data;

    const cookieStore = await cookies();
    const cartCookie = cookieStore.get(MOCK_CART_COOKIE)?.value;
    const rawCartItems = cartCookie ? JSON.parse(cartCookie) : [];

    // Map cart items for email rendering
    const emailItems: OrderItem[] = rawCartItems.length > 0
      ? rawCartItems.map((item: any) => ({
          id: item.id || String(Math.random()),
          title: item.product?.title || item.title || 'Prémiový CBD produkt',
          variantTitle: item.variant || 'Standardní balení',
          quantity: item.quantity || 1,
          price: `${((item.product?.price || 1890) * (item.quantity || 1)).toLocaleString('cs-CZ')} Kč`,
        }))
      : [
          {
            id: 'default-1',
            title: 'CBD Olej 20% Full Spectrum',
            variantTitle: '10ml flakon',
            quantity: 1,
            price: '1 890 Kč',
          },
        ];

    // Compute totals
    const subtotalNum = rawCartItems.reduce((acc: number, item: any) => {
      const price = item.product?.price || 1890;
      return acc + price * (item.quantity || 1);
    }, 0) || 1890;

    const shippingCost = 0; // Zdarma nad limit
    const totalNum = subtotalNum + shippingCost;

    const orderId = `CBD-${Math.floor(10000 + Math.random() * 90000)}`;
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    // Dispatch transactional order confirmation email via Resend & React Email
    await emailService.sendOrderConfirmationEmail({
      to: email,
      customerName: `${firstName} ${lastName}`,
      orderId,
      items: emailItems,
      subtotal: `${subtotalNum.toLocaleString('cs-CZ')} Kč`,
      shipping: '0 Kč (Zdarma)',
      total: `${totalNum.toLocaleString('cs-CZ')} Kč`,
      shippingAddress: {
        address,
        city,
        zip,
      },
      trackingUrl: `${baseUrl}/objednavky/${orderId}`,
    });

    // Clear cart upon successful order
    cookieStore.delete(MOCK_CART_COOKIE);
    revalidatePath('/', 'layout');

    return {
      success: true,
      orderId,
      message: `Vaše objednávka č. ${orderId} byla úspěšně přijata. Potvrzení jsme zaslali na e-mail ${email}.`,
    };
  } catch (error) {
    console.error('[CheckoutAction] Failed to process order:', error);
    return {
      success: false,
      error: 'Zpracování objednávky selhalo kvůli systémové chybě. Zkuste to prosím později.',
    };
  }
}
