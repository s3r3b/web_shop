import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCardClient from '@/components/ProductCardClient';
import { fetchProducts } from '@/lib/services/medusa-products';

// This is now a Server Component!
export default async function ProduktyPage() {
  // Fetching data securely on the server
  const products = await fetchProducts();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col relative bg-[#040404]">
        {/* Ambient background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none"></div>

        <section className="py-20 lg:py-28 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-4xl sm:text-6xl font-serif-luxury font-normal text-white mb-6">
                Kolekce Master Level
              </h1>
              <p className="text-base sm:text-lg text-brand-beige/70 font-light leading-relaxed">
                Objevte naši prémiovou řadu CBD olejů. Každá kapka představuje dokonalou harmonii čistoty, síly a precizního zpracování.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
              {products.map((product, idx) => (
                <ProductCardClient key={product.id} product={product} idx={idx} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
