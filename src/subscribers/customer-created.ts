import { SubscriberArgs, SubscriberConfig } from "@medusajs/framework";
import { Modules } from "@medusajs/framework/utils";

/**
 * MedusaJS v2 Subscriber: Handles the 'customer.created' event.
 * Triggers an account activation / verification email loop for new customers.
 */
export default async function customerCreatedHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const customerModuleService = container.resolve(Modules.CUSTOMER);
  const notificationModuleService = container.resolve(Modules.NOTIFICATION);

  try {
    const customer = await customerModuleService.retrieveCustomer(data.id);

    if (!customer?.email) {
      console.warn(`[CustomerCreatedSubscriber] Missing email for customer ID: ${data.id}`);
      return;
    }

    const storefrontUrl = process.env.STOREFRONT_URL || "http://localhost:3000";
    const verificationUrl = `${storefrontUrl}/overeni-uctu?id=${customer.id}`;

    await notificationModuleService.createNotifications({
      to: customer.email,
      channel: "email",
      template: "welcome-verification",
      data: {
        firstName: customer.first_name || "Vážený zákazníku",
        verificationUrl,
      },
    });

    console.log(`[CustomerCreatedSubscriber] Welcome verification email dispatched for ${customer.email}`);
  } catch (error) {
    console.error(`[CustomerCreatedSubscriber] Failed to process customer.created for ID ${data.id}:`, error);
  }
}

export const config: SubscriberConfig = {
  event: "customer.created",
};
