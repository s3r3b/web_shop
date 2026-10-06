import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { emailService } from '@/lib/services/email';

const testSendSchema = z.object({
  to: z.string().email('Neplatná e-mailová adresa'),
  template: z.enum(['welcome', 'order', 'shipped']),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = testSendSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: validation.error.issues[0]?.message || 'Neplatná data' },
        { status: 400 }
      );
    }

    const { to, template } = validation.data;

    let result;

    switch (template) {
      case 'welcome':
        result = await emailService.sendWelcomeVerificationEmail({
          to,
          firstName: 'Vážený zákazníku (Test)',
          verificationUrl: 'https://cbd-master.cz/overeni-uctu?token=test_preview_token',
          membershipId: 'ML-TEST-99',
        });
        break;

      case 'shipped':
        result = await emailService.sendOrderShippedEmail({
          to,
          customerName: 'Vážený zákazníku (Test)',
          orderId: 'ML-TEST-2026',
          carrierName: 'Zásilkovna / PPL Premium Express',
          trackingNumber: 'TEST984120489CZ',
          trackingUrl: 'https://tracking.carrier.cz/track?id=TEST984120489CZ',
          estimatedDelivery: 'Zítra do 12:00',
        });
        break;

      case 'order':
      default:
        result = await emailService.sendOrderConfirmationEmail({
          to,
          customerName: 'Vážený zákazníku (Test)',
          orderId: 'ML-TEST-8942',
          items: [
            {
              id: 'test-1',
              title: 'Full Spectrum CBD Olej 20% Swiss Bio',
              variantTitle: '10ml (2000mg CBD + Terpene Entourage) • Šarže #SW-2601',
              sku: 'CBD-FS-20-10ML',
              quantity: 1,
              price: '1 890 Kč',
            },
            {
              id: 'test-2',
              title: 'Noční CBD + CBN Hluboký Spánek Elixír',
              variantTitle: '30ml (1500mg CBD + 500mg CBN)',
              sku: 'CBD-CBN-SLEEP-30ML',
              quantity: 1,
              price: '1 490 Kč',
            },
          ],
          subtotal: '3 380 Kč',
          shipping: '0 Kč (VIP Expresní Kurýr Zdarma)',
          tax: '586,61 Kč (DPH 21%)',
          total: '3 380 Kč',
          paymentMethod: 'Online platba kartou (Placeno)',
          shippingAddress: {
            address: 'Pařížská 127/20',
            city: 'Praha 1',
            zip: '110 00',
            country: 'Česká republika',
          },
          trackingUrl: 'https://cbd-master.cz/objednavky/ML-TEST-8942',
        });
        break;
    }

    return NextResponse.json({
      success: result.success,
      simulated: (result as { simulated?: boolean }).simulated || false,
      id: (result as { id?: string }).id,
      error: (result as { error?: unknown }).error ? String((result as { error?: unknown }).error) : undefined,
    });
  } catch (error) {
    console.error('[TestSendEmailRoute] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Došlo k neočekávané chybě při odesílání.' },
      { status: 500 }
    );
  }
}
