import { NextRequest, NextResponse } from 'next/server';
import { emailService } from '@/lib/services/email';

/**
 * Webhook handler to receive event dispatches from Medusa v2 Event Bus or Custom Workflows.
 * Authenticated via secret token in authorization header or query.
 */
export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    const expectedSecret = process.env.MEDUSA_WEBHOOK_SECRET;

    if (expectedSecret && authHeader !== `Bearer ${expectedSecret}`) {
      return NextResponse.json({ error: 'Unauthorized webhook call' }, { status: 401 });
    }

    const payload = await req.json();
    const { event, data } = payload;

    console.log(`[MedusaWebhook] Received event: ${event}`);

    switch (event) {
      case 'order.placed': {
        await emailService.sendOrderConfirmationEmail({
          to: data.email,
          customerName: data.customerName || 'Vážený zákazníku',
          orderId: data.orderId,
          items: data.items || [],
          subtotal: data.subtotal || '0 Kč',
          shipping: data.shipping || '0 Kč',
          total: data.total || '0 Kč',
          shippingAddress: data.shippingAddress || {
            address: '',
            city: '',
            zip: '',
          },
          trackingUrl: data.trackingUrl,
        });
        break;
      }

      case 'customer.created': {
        await emailService.sendWelcomeVerificationEmail({
          to: data.email,
          firstName: data.firstName || 'Vážený zákazníku',
          verificationUrl: data.verificationUrl || `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/overeni-uctu`,
        });
        break;
      }

      case 'order.shipment_created':
      case 'fulfillment.created': {
        await emailService.sendOrderShippedEmail({
          to: data.email,
          customerName: data.customerName || 'Vážený zákazníku',
          orderId: data.orderId,
          carrierName: data.carrierName || 'Zásilkovna / PPL Premium',
          trackingNumber: data.trackingNumber,
          trackingUrl: data.trackingUrl,
          estimatedDelivery: data.estimatedDelivery,
        });
        break;
      }

      default:
        console.log(`[MedusaWebhook] Unhandled event type: ${event}`);
    }

    return NextResponse.json({ received: true, event });
  } catch (error) {
    console.error('[MedusaWebhook] Error processing incoming webhook:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
