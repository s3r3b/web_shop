'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import {
  createMedusaCustomer,
  updateCustomerLoyaltyTier,
  updateCustomerNotes,
  CustomerLoyaltyTier,
} from '@/lib/services/medusa-customers';

const createCustomerSchema = z.object({
  email: z.string().email('Zadejte platnou e-mailovou adresu'),
  first_name: z.string().min(2, 'Křestní jméno musí mít alespoň 2 znaky'),
  last_name: z.string().min(2, 'Příjmení musí mít alespoň 2 znaky'),
  phone: z.string().optional(),
  company: z.string().optional(),
  ic: z.string().optional(),
  dic: z.string().optional(),
  loyalty_tier: z.enum(['regular', 'silver', 'gold_vip', 'b2b']).default('regular'),
  notes: z.string().optional(),
  address_1: z.string().optional(),
  city: z.string().optional(),
  postal_code: z.string().optional(),
});

export type CreateCustomerActionState = {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
  customer?: unknown;
};

/**
 * Server Action to create a new customer with Zod validation
 */
export async function createCustomerAction(
  _prevState: CreateCustomerActionState | null,
  formData: FormData
): Promise<CreateCustomerActionState> {
  try {
    const rawData = {
      email: formData.get('email')?.toString().trim(),
      first_name: formData.get('first_name')?.toString().trim(),
      last_name: formData.get('last_name')?.toString().trim(),
      phone: formData.get('phone')?.toString().trim() || undefined,
      company: formData.get('company')?.toString().trim() || undefined,
      ic: formData.get('ic')?.toString().trim() || undefined,
      dic: formData.get('dic')?.toString().trim() || undefined,
      loyalty_tier: (formData.get('loyalty_tier')?.toString() as CustomerLoyaltyTier) || 'regular',
      notes: formData.get('notes')?.toString().trim() || undefined,
      address_1: formData.get('address_1')?.toString().trim() || undefined,
      city: formData.get('city')?.toString().trim() || undefined,
      postal_code: formData.get('postal_code')?.toString().trim() || undefined,
    };

    const validation = createCustomerSchema.safeParse(rawData);

    if (!validation.success) {
      return {
        success: false,
        message: 'Zkontrolujte prosím vyplněné údaje.',
        errors: validation.error.flatten().fieldErrors,
      };
    }

    const created = await createMedusaCustomer(validation.data);

    revalidatePath('/admin/klienci');
    revalidatePath('/admin');

    return {
      success: true,
      message: 'Zákazník byl úspěšně zaregistrován.',
      customer: created,
    };
  } catch (error) {
    console.error('Failed to create customer:', error);
    return {
      success: false,
      message: 'Došlo k neočekávané chybě při vytváření profilu zákazníka.',
    };
  }
}

/**
 * Server Action to update customer loyalty tier
 */
export async function updateCustomerTierAction(
  customerId: string,
  tier: CustomerLoyaltyTier
) {
  try {
    if (!customerId) {
      return { success: false, message: 'Chybí identifikátor zákazníka.' };
    }

    const updated = await updateCustomerLoyaltyTier(customerId, tier);
    if (!updated) {
      return { success: false, message: 'Zákazník nebyl nalezen.' };
    }

    revalidatePath('/admin/klienci');
    return { success: true, message: 'Věrnostní úroveň byla úspěšně aktualizována.' };
  } catch (error) {
    console.error('Failed to update loyalty tier:', error);
    return { success: false, message: 'Chyba při aktualizaci věrnostního programu.' };
  }
}

/**
 * Server Action to update internal customer notes
 */
export async function updateCustomerNotesAction(customerId: string, notes: string) {
  try {
    if (!customerId) {
      return { success: false, message: 'Chybí identifikátor zákazníka.' };
    }

    const updated = await updateCustomerNotes(customerId, notes);
    if (!updated) {
      return { success: false, message: 'Zákazník nebyl nalezen.' };
    }

    revalidatePath('/admin/klienci');
    return { success: true, message: 'Interní poznámka byla uložena.' };
  } catch (error) {
    console.error('Failed to update customer notes:', error);
    return { success: false, message: 'Chyba při ukládání interní poznámky.' };
  }
}
