import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductCards from '@/components/ProductCards';
import ComparisonTable from '@/components/ComparisonTable';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col">
        <Hero />
        <ProductCards />
        <ComparisonTable />
      </main>
      <Footer />
    </div>
  );
}
