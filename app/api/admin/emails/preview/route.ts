import { NextRequest, NextResponse } from 'next/server';
import React from 'react';
import { render } from '@react-email/render';
import {
  WelcomeVerificationEmail,
  OrderConfirmationEmail,
  OrderShippedEmail,
} from '@/components/emails';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const template = searchParams.get('template') || 'order';

  try {
    let emailElement: React.ReactElement;

    switch (template) {
      case 'welcome':
        emailElement = React.createElement(WelcomeVerificationEmail, {
          firstName: 'Alexander Horváth',
          verificationUrl: 'https://cbd-master.cz/overeni-uctu?token=demo_token_123',
          membershipId: 'ML-2026-VIP',
        });
        break;

      case 'shipped':
        emailElement = React.createElement(OrderShippedEmail, {
          orderId: 'ML-2026-8942',
          customerName: 'Alexander Horváth',
          carrierName: 'Zásilkovna / PPL Premium Express',
          trackingNumber: 'Z984120489CZ',
          trackingUrl: 'https://tracking.carrier.cz/track?id=Z984120489CZ',
          estimatedDelivery: 'Zítra do 12:00',
        });
        break;

      case 'order':
      default:
        emailElement = React.createElement(OrderConfirmationEmail, {
          orderId: 'ML-2026-8942',
          customerName: 'Alexander Horváth',
          items: [
            {
              id: '1',
              title: 'Full Spectrum CBD Olej 20% Swiss Bio',
              variantTitle: '10ml (2000mg CBD + Terpene Entourage) • Šarže #SW-2601',
              sku: 'CBD-FS-20-10ML',
              quantity: 1,
              price: '1 890 Kč',
            },
            {
              id: '2',
              title: 'Noční CBD + CBN Hluboký Spánek Elixír',
              variantTitle: '30ml (1500mg CBD + 500mg CBN + Melatonin)',
              sku: 'CBD-CBN-SLEEP-30ML',
              quantity: 1,
              price: '1 490 Kč',
            },
          ],
          subtotal: '3 380 Kč',
          shipping: '0 Kč (VIP Expresní Kurýr Zdarma)',
          tax: '586,61 Kč (DPH 21% v ceně)',
          total: '3 380 Kč',
          paymentMethod: 'Online platba kartou (Placeno)',
          shippingAddress: {
            address: 'Pařížská 127/20',
            city: 'Praha 1 - Staré Město',
            zip: '110 00',
            country: 'Česká republika',
          },
          trackingUrl: 'https://cbd-master.cz/objednavky/ML-2026-8942',
        });
        break;
    }

    const html = await render(emailElement);

    return new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    });
  } catch (error) {
    console.error('[EmailPreviewRoute] Error rendering email template:', error);
    return new NextResponse(
      `<html><body style="background:#0a0a0a;color:#ff6b6b;padding:20px;font-family:monospace;">Chyba při renderování šablony: ${String(error)}</body></html>`,
      { status: 500, headers: { 'Content-Type': 'text/html' } }
    );
  }
}
