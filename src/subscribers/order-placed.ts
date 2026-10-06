import { SubscriberArgs, SubscriberConfig } from "@medusajs/framework";
import { Modules } from "@medusajs/framework/utils";

/**
 * MedusaJS v2 Subscriber: Handles the 'order.placed' event.
 * Dispatches an order confirmation transactional email via Notification Module / Resend provider.
 */
export default async function orderPlacedHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const orderModuleService = container.resolve(Modules.ORDER);
  const notificationModuleService = container.resolve(Modules.NOTIFICATION);

  try {
    // 1. Fetch complete order details including items, customer, and shipping address
    const order = await orderModuleService.retrieveOrder(data.id, {
      relations: ["items", "shipping_address", "customer"],
    });

    if (!order || !order.customer?.email) {
      console.warn(`[OrderPlacedSubscriber] Missing customer email for order ID: ${data.id}`);
      return;
    }

    // 2. Dispatch notification via Medusa v2 Notification Provider (Resend)
    await notificationModuleService.createNotifications({
      to: order.customer.email,
      channel: "email",
      template: "order-confirmation",
      data: {
        orderId: order.display_id || order.id,
        customerName: `${order.shipping_address?.first_name || ''} ${order.shipping_address?.last_name || ''}`.trim() || 'Vážený zákazníku',
        items: order.items.map((item) => ({
          id: item.id,
          title: item.title,
          variantTitle: item.variant_title || '',
          quantity: item.quantity,
          price: `${item.unit_price} CZK`,
        })),
        total: `${order.total} CZK`,
        shippingAddress: {
          address: order.shipping_address?.address_1 || '',
          city: order.shipping_address?.city || '',
          zip: order.shipping_address?.postal_code || '',
        },
      },
    });

    console.log(`[OrderPlacedSubscriber] Order confirmation email successfully dispatched for order ${order.id}`);
  } catch (error) {
    console.error(`[OrderPlacedSubscriber] Error processing order.placed for ID ${data.id}:`, error);
  }
}

export const config: SubscriberConfig = {
  event: "order.placed",
};
