'use server';

export async function submitContactForm(prevState: any, formData: FormData) {
  try {
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // Input validation
    if (!name || !email || !message) {
      return { 
        success: false, 
        error: 'Vyplňte prosím všechna povinná pole.' 
      };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.toString())) {
      return {
        success: false,
        error: 'Zadejte platnou e-mailovou adresu.'
      };
    }

    // Simulate safe API call or email provider integration
    await new Promise(resolve => setTimeout(resolve, 1500));

    return { 
      success: true, 
      message: 'Vaše zpráva byla úspěšně odeslána. Náš tým se Vám brzy ozve.' 
    };
  } catch (error) {
    console.error('Contact form error:', error);
    return { 
      success: false, 
      error: 'Odeslání zprávy selhalo kvůli systémové chybě. Zkuste to prosím později.' 
    };
  }
}
