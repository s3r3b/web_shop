'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Admin redirect check
    if (email === 'admin123' && password === 'admin123') {
      router.push('/admin');
      return;
    }

    // Customer auth simulation
    setError('Neplatné přihlašovací údaje.');
  };

  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center relative py-20 px-4 sm:px-6 lg:px-8 min-h-screen">
        {/* Background ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[600px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="w-full max-w-md relative z-10">
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-serif text-white tracking-wide mb-3">
              Přihlášení
            </h1>
            <p className="text-brand-beige/70 font-light text-sm">
              Vítejte zpět. Přihlaste se ke svému účtu.
            </p>
          </div>

          <form onSubmit={handleLogin} className="bg-[#090909] border border-brand-gold/20 p-8 sm:p-10 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.8)] space-y-6">
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-widest text-brand-gold" htmlFor="email">E-mail</label>
              <input 
                type="text" 
                id="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#040404] border border-brand-beige/20 rounded-lg px-4 py-3 text-white text-sm font-light focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all"
                placeholder="E-mailová adresa"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[11px] font-bold uppercase tracking-widest text-brand-gold" htmlFor="password">Heslo</label>
                <a href="#zapomenute-heslo" className="text-[11px] text-brand-beige/60 hover:text-brand-gold transition-colors">Zapomněli jste heslo?</a>
              </div>
              <input 
                type="password" 
                id="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#040404] border border-brand-beige/20 rounded-lg px-4 py-3 text-white text-sm font-light focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all"
                placeholder="Vaše heslo"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-xs text-red-400 text-center">{error}</p>
              </div>
            )}

            <button 
              type="submit" 
              className="w-full bg-brand-gold text-brand-black font-semibold text-sm uppercase tracking-widest py-4 rounded-lg hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] mt-2"
            >
              Přihlásit se
            </button>
            
            <div className="text-center pt-6 border-t border-brand-gold/10">
              <p className="text-sm font-light text-brand-beige/70">
                Nemáte ještě účet? <a href="/registrace" className="text-brand-gold hover:text-white transition-colors font-medium">Zaregistrujte se</a>
              </p>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
