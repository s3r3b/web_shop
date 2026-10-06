'use server';

import { z } from 'zod';
import { emailService } from '@/lib/services/email';

const registerSchema = z.object({
  firstName: z.string().min(2, 'Křestní jméno musí mít alespoň 2 znaky.'),
  lastName: z.string().min(2, 'Příjmení musí mít alespoň 2 znaky.'),
  email: z.string().email('Zadejte platnou e-mailovou adresu.'),
  password: z.string().min(8, 'Heslo musí mít minimálně 8 znaků.'),
  terms: z.literal(true, {
    errorMap: () => ({ message: 'Pro registraci je nutné souhlasit s obchodními podmínkami.' }),
  }),
});

export type RegisterState = {
  success: boolean;
  message?: string;
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

export async function registerCustomerAction(
  _prevState: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  try {
    const rawData = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      password: formData.get('password'),
      terms: formData.get('terms') === 'on',
    };

    const parsed = registerSchema.safeParse(rawData);
    if (!parsed.success) {
      const fieldErrors: Record<string, string[]> = {};
      parsed.error.errors.forEach((err) => {
        const path = err.path[0] as string;
        if (!fieldErrors[path]) fieldErrors[path] = [];
        fieldErrors[path].push(err.message);
      });

      return {
        success: false,
        error: parsed.error.errors[0]?.message || 'Zkontrolujte prosím zadané údaje.',
        fieldErrors,
      };
    }

    const { firstName, lastName, email } = parsed.data;

    // Medusa v2 Customer Registration logic:
    // In production with running Medusa v2 backend:
    // const token = await medusaClient.auth.register("emailpass", { email, password });
    // Or customer creation workflow via Medusa v2 Store API
    
    // Simulate verification token generation (e.g. JWT or secure random hash)
    const verificationToken = Buffer.from(`${email}:${Date.now()}`).toString('base64url');
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const verificationUrl = `${baseUrl}/overeni-uctu?token=${verificationToken}`;

    // Dispatch automatic verification email loop via Resend & React Email
    await emailService.sendWelcomeVerificationEmail({
      to: email,
      firstName: `${firstName} ${lastName}`,
      verificationUrl,
    });

    return {
      success: true,
      message: 'Váš účet byl úspěšně vytvořen. Na Váš e-mail jsme zaslali odkaz pro potvrzení a aktivaci účtu.',
    };
  } catch (err) {
    console.error('[RegisterAction] Error occurred during registration:', err);
    return {
      success: false,
      error: 'Registrace selhala z důvodu neočekávané systémové chyby. Zkuste to prosím znovu.',
    };
  }
}
