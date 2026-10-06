import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <h2 className="text-4xl font-serif text-brand-gold mb-4">404 - Nenalezeno</h2>
      <p className="text-brand-beige/80 mb-8 max-w-md mx-auto">Tato stránka nebyla nalezena. Omlouváme se za způsobené nepříjemnosti.</p>
      <Link href="/" className="px-8 py-3 rounded-full bg-brand-gold text-brand-black font-semibold uppercase tracking-widest text-xs hover:bg-white transition-colors shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)]">
        Návrat domů
      </Link>
    </div>
  );
}
