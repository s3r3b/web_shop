import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RegisterForm from '@/components/RegisterForm';

export default function RegisterPage() {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center relative py-20 px-4 sm:px-6 lg:px-8 min-h-screen">
        {/* Background ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[600px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="w-full max-w-md relative z-10">
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-serif text-white tracking-wide mb-3">
              Vytvořit účet
            </h1>
            <p className="text-brand-beige/70 font-light text-sm">
              Zaregistrujte se a získejte přístup k exkluzivním produktům a VIP výhodám.
            </p>
          </div>

          <RegisterForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
