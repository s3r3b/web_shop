import Medusa from "@medusajs/js-sdk";

// Validate environment variables to ensure safe initialization
const MEDUSA_BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";
const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "";

/**
 * Singleton instance of the Medusa v2 JS SDK.
 * This client is configured to communicate with the Medusa backend.
 * 
 * For server-side fetching in Next.js App Router, ensure to pass 
 * appropriate headers (like cookies for sessions/cart) in individual requests.
 */
export const medusaClient = new Medusa({
  baseUrl: MEDUSA_BACKEND_URL,
  publishableKey: PUBLISHABLE_KEY,
  debug: process.env.NODE_ENV === "development",
});
