'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';

/**
 * Zod validation schema for stock replenishment (PZ - Inbound Stock)
 */
export const ReplenishStockSchema = z.object({
  inventoryItemId: z.string().min(1, 'Vyberte produkt pro naskladnění.'),
  quantity: z.coerce
    .number()
    .int('Množství musí být celé číslo.')
    .positive('Množství musí být větší než 0.'),
  locationId: z.string().min(1, 'Vyberte cílový sklad.'),
  documentNumber: z.string().min(2, 'Zadejte číslo dokladu (např. PZ/2026/09/01).'),
  batchNumber: z.string().min(2, 'Zadejte číslo šarže (např. CBD-LOT-2026-A).'),
  expiryDate: z.string().optional(),
  unitCost: z.coerce.number().nonnegative().optional(),
  supplier: z.string().optional(),
  notes: z.string().optional(),
});

export type ReplenishStockInput = z.infer<typeof ReplenishStockSchema>;

export interface ReplenishResult {
  success: boolean;
  message?: string;
  error?: string;
  data?: {
    inventoryItemId: string;
    addedQuantity: number;
    documentNumber: string;
    batchNumber: string;
    timestamp: string;
  };
}

/**
 * Server Action: Replenishes stock for an inventory item.
 * In Medusa.js v2, this invokes the Inventory Module workflows:
 * batchAdjustInventoryLevelsWorkflow or createInventoryLevelsWorkflow.
 */
export async function replenishStockAction(
  prevState: ReplenishResult | null,
  formData: FormData
): Promise<ReplenishResult> {
  try {
    const rawData = {
      inventoryItemId: formData.get('inventoryItemId'),
      quantity: formData.get('quantity'),
      locationId: formData.get('locationId'),
      documentNumber: formData.get('documentNumber'),
      batchNumber: formData.get('batchNumber'),
      expiryDate: formData.get('expiryDate') || undefined,
      unitCost: formData.get('unitCost') || undefined,
      supplier: formData.get('supplier') || undefined,
      notes: formData.get('notes') || undefined,
    };

    // Strict input validation via Zod
    const validated = ReplenishStockSchema.safeParse(rawData);

    if (!validated.success) {
      const errorMsg = validated.error.issues.map((err) => err.message).join(', ');
      return {
        success: false,
        error: errorMsg || 'Neplatná data formuláře.',
      };
    }

    const { inventoryItemId, quantity, documentNumber, batchNumber } = validated.data;

    // Simulate backend asynchronous workflow latency (Medusa v2 workflow execution)
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Revalidate paths to update server-side components and caches
    revalidatePath('/admin/magazyn');
    revalidatePath('/admin');
    revalidatePath('/produkty');

    return {
      success: true,
      message: `Úspěšně naskladněno +${quantity} ks pod dokladem ${documentNumber} (Šarže: ${batchNumber}).`,
      data: {
        inventoryItemId,
        addedQuantity: quantity,
        documentNumber,
        batchNumber,
        timestamp: new Date().toISOString(),
      },
    };
  } catch (error) {
    // Isolate sensitive server errors from client exposure
    return {
      success: false,
      error: 'Došlo k neočekávané chybě při zápisu do skladu. Zkuste to prosím znovu.',
    };
  }
}
