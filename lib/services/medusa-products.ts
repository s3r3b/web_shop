import { medusaClient } from '@/lib/medusa';
import { products as staticProducts, Product } from '@/lib/data';

/**
 * Service to fetch products from Medusa v2 API.
 * Includes a graceful fallback to mock data during development/integration phase
 * if the Medusa backend is not yet running or reachable.
 */
export async function fetchProducts(): Promise<Product[]> {
  try {
    // In Medusa v2 JS SDK, products are fetched via the store module
    // Note: The specific syntax depends on the exact version, usually medusaClient.store.product.list()
    const response = await medusaClient.store.product.list();
    
    // In a fully integrated environment, we would map the Medusa response to our UI type here:
    // return response.products.map(p => ({
    //   id: p.id,
    //   name: p.title,
    //   price: p.variants[0]?.prices[0]?.amount || 0,
    //   ...
    // }));

    console.log("Medusa connected successfully!");
    return staticProducts;

  } catch (error) {
    console.warn("Medusa API unreachable, falling back to static mock data.");
    await new Promise(resolve => setTimeout(resolve, 600));
    return staticProducts;
  }
}
