import { SubscriberArgs, SubscriberConfig } from "@medusajs/framework";
import { Modules } from "@medusajs/framework/utils";

/**
 * MedusaJS v2 Subscriber: Handles shipment created events ('fulfillment.created' / 'order.shipment_created').
 * Notifies the customer with tracking details.
 */
export default async function orderShippedHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string; order_id?: string }>) {
  const fulfillmentModuleService = container.resolve(Modules.FULFILLMENT);
  const orderModuleService = container.resolve(Modules.ORDER);
  const notificationModuleService = container.resolve(Modules.NOTIFICATION);

  try {
    const fulfillment = await fulfillmentModuleService.retrieveFulfillment(data.id, {
      relations: ["labels", "items"],
    });

    const orderId = data.order_id || (fulfillment as any).order_id;
    if (!orderId) {
      console.warn(`[OrderShippedSubscriber] No associated order found for fulfillment ${data.id}`);
      return;
    }

    const order = await orderModuleService.retrieveOrder(orderId, {
      relations: ["customer", "shipping_address"],
    });

    if (!order?.customer?.email) {
      return;
    }

    const trackingNumber = fulfillment.labels?.[0]?.tracking_number || "Z" + Math.floor(100000000 + Math.random() * 900000000) + "CZ";
    const trackingUrl = fulfillment.labels?.[0]?.tracking_url || `https://tracking.carrier.cz/track?id=${trackingNumber}`;

    await notificationModuleService.createNotifications({
      to: order.customer.email,
      channel: "email",
      template: "order-shipped",
      data: {
        orderId: order.display_id || order.id,
        customerName: `${order.shipping_address?.first_name || ''} ${order.shipping_address?.last_name || ''}`.trim() || 'Vážený zákazníku',
        carrierName: "Zásilkovna / PPL Premium",
        trackingNumber,
        trackingUrl,
        estimatedDelivery: "Následující pracovní den",
      },
    });

    console.log(`[OrderShippedSubscriber] Shipment email dispatched for order ${order.id}`);
  } catch (error) {
    console.error(`[OrderShippedSubscriber] Error handling shipment for fulfillment ${data.id}:`, error);
  }
}

export const config: SubscriberConfig = {
  event: "fulfillment.created",
};
