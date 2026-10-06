import { Resend } from 'resend';
import {
  WelcomeVerificationEmail,
  OrderConfirmationEmail,
  OrderShippedEmail,
  type OrderItem,
} from '@/components/emails';
import React from 'react';

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;
const DEFAULT_FROM = process.env.EMAIL_FROM || 'CBD Master <objednavky@cbd-master.cz>';

export interface SendWelcomeEmailParams {
  to: string;
  firstName: string;
  verificationUrl: string;
  membershipId?: string;
}

export interface SendOrderConfirmationParams {
  to: string;
  customerName: string;
  orderId: string;
  items: OrderItem[];
  subtotal: string;
  shipping: string;
  tax?: string;
  total: string;
  paymentMethod?: string;
  shippingAddress: {
    address: string;
    city: string;
    zip: string;
    country?: string;
  };
  trackingUrl?: string;
}

export interface SendOrderShippedParams {
  to: string;
  customerName: string;
  orderId: string;
  carrierName: string;
  trackingNumber: string;
  trackingUrl: string;
  estimatedDelivery?: string;
}

/**
 * Service encapsulating transactional email dispatches via Resend and React Email.
 * Employs defensive execution: if RESEND_API_KEY is not configured (e.g. local dev),
 * it logs the payload to the console without interrupting checkout or registration flows.
 */
export const emailService = {
  async sendWelcomeVerificationEmail(params: SendWelcomeEmailParams) {
    const { to, firstName, verificationUrl } = params;

    if (!resend) {
      console.warn('[EmailService] RESEND_API_KEY is missing. Simulating welcome verification email dispatch to:', to);
      return { success: true, simulated: true, id: `mock_welcome_${Date.now()}` };
    }

    try {
      const { data, error } = await resend.emails.send({
        from: DEFAULT_FROM,
        to: [to],
        subject: 'Vítejte v CBD Master – Potvrďte svůj zákaznický účet',
        react: React.createElement(WelcomeVerificationEmail, {
          firstName,
          verificationUrl,
          membershipId: params.membershipId,
        }),
      });

      if (error) {
        console.error('[EmailService] Failed to send welcome email:', error);
        return { success: false, error };
      }

      return { success: true, id: data?.id };
    } catch (err) {
      console.error('[EmailService] Unexpected error sending welcome email:', err);
      return { success: false, error: err };
    }
  },

  async sendOrderConfirmationEmail(params: SendOrderConfirmationParams) {
    const {
      to,
      customerName,
      orderId,
      items,
      subtotal,
      shipping,
      total,
      shippingAddress,
      trackingUrl,
    } = params;

    if (!resend) {
      console.warn(`[EmailService] RESEND_API_KEY is missing. Simulating order confirmation dispatch for order #${orderId} to:`, to);
      return { success: true, simulated: true, id: `mock_order_${Date.now()}` };
    }

    try {
      const { data, error } = await resend.emails.send({
        from: DEFAULT_FROM,
        to: [to],
        subject: `Potvrzení objednávky č. ${orderId} – CBD Master`,
        react: React.createElement(OrderConfirmationEmail, {
          orderId,
          customerName,
          items,
          subtotal,
          shipping,
          tax: params.tax,
          total,
          paymentMethod: params.paymentMethod,
          shippingAddress,
          trackingUrl,
        }),
      });

      if (error) {
        console.error('[EmailService] Failed to send order confirmation email:', error);
        return { success: false, error };
      }

      return { success: true, id: data?.id };
    } catch (err) {
      console.error('[EmailService] Unexpected error sending order confirmation email:', err);
      return { success: false, error: err };
    }
  },

  async sendOrderShippedEmail(params: SendOrderShippedParams) {
    const {
      to,
      customerName,
      orderId,
      carrierName,
      trackingNumber,
      trackingUrl,
      estimatedDelivery,
    } = params;

    if (!resend) {
      console.warn(`[EmailService] RESEND_API_KEY is missing. Simulating shipment notification dispatch for order #${orderId} to:`, to);
      return { success: true, simulated: true, id: `mock_shipped_${Date.now()}` };
    }

    try {
      const { data, error } = await resend.emails.send({
        from: DEFAULT_FROM,
        to: [to],
        subject: `Vaše objednávka č. ${orderId} byla expedována – CBD Master`,
        react: React.createElement(OrderShippedEmail, {
          orderId,
          customerName,
          carrierName,
          trackingNumber,
          trackingUrl,
          estimatedDelivery,
        }),
      });

      if (error) {
        console.error('[EmailService] Failed to send order shipped email:', error);
        return { success: false, error };
      }

      return { success: true, id: data?.id };
    } catch (err) {
      console.error('[EmailService] Unexpected error sending order shipped email:', err);
      return { success: false, error: err };
    }
  },
};
