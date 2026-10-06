import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface VerifyAccountPageProps {
  searchParams: Promise<{ token?: string; id?: string }>;
}

export default async function VerifyAccountPage({ searchParams }: VerifyAccountPageProps) {
  const params = await searchParams;
  const token = params.token || params.id;

  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center relative py-24 px-4 sm:px-6 lg:px-8 min-h-[80vh]">
        {/* Background ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[700px] h-[500px] bg-brand-gold/5 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="w-full max-w-lg relative z-10 text-center">
          <div className="bg-[#090909] border border-brand-gold/25 p-8 sm:p-12 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.8)] space-y-6">
            <div className="w-20 h-20 bg-brand-gold/10 border border-brand-gold/30 rounded-full flex items-center justify-center mx-auto text-brand-gold shadow-[0_0_25px_rgba(212,175,55,0.2)]">
              <ShieldCheck className="w-10 h-10" />
            </div>

            <h1 className="text-3xl font-serif text-white tracking-wide">
              Účet byl úspěšně aktivován
            </h1>

            <p className="text-brand-beige/80 font-light text-sm leading-relaxed">
              Vaše e-mailová adresa byla úspěšně ověřena v naší databázi. Nyní máte plný přístup ke všem výhodám privátního klubu CBD Master, historii svých nákupů a expresnímu odbavení.
            </p>

            {token && (
              <div className="text-[11px] text-brand-beige/40 font-mono py-1 px-3 bg-black/40 rounded border border-white/5 inline-block">
                Kód ověření: {token.slice(0, 16)}...
              </div>
            )}

            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/prihlaseni"
                className="bg-brand-gold text-brand-black font-semibold text-xs uppercase tracking-widest px-8 py-4 rounded-lg hover:bg-white transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] inline-flex items-center justify-center space-x-2"
              >
                <span>Přihlásit se do účtu</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/produkty"
                className="border border-brand-gold/40 text-brand-gold hover:text-white hover:border-white font-semibold text-xs uppercase tracking-widest px-8 py-4 rounded-lg transition-all inline-flex items-center justify-center"
              >
                Prohlížet nabídku
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
