import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from './ContactForm';

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col">
        {/* Header Section */}
        <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-brand-black/60 text-center relative overflow-hidden">
          <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.05)_0%,rgba(7,7,7,0)_50%)]"></div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white tracking-wide mb-6">
              Spojte se s námi
            </h1>
            <p className="text-lg text-brand-beige/80 font-light leading-relaxed max-w-xl mx-auto">
              Jsme tu pro Vás. Máte-li jakékoliv dotazy ohledně našich prémiových CBD produktů, neváhejte nás kontaktovat.
            </p>
          </div>
        </section>

        {/* Contact Info & Form Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-brand-gold/10">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Left: Contact Information */}
            <div className="flex flex-col justify-center space-y-12">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-brand-gold mb-8">
                  Kontaktní údaje
                </h2>
                <div className="space-y-8">
                  <div className="group">
                    <h3 className="text-xs font-medium uppercase tracking-widest text-brand-beige/50 mb-2">
                      E-mail
                    </h3>
                    <a href="mailto:info@cbdmasterlevel.cz" className="text-xl sm:text-2xl font-serif text-white group-hover:text-brand-gold transition-colors">
                      info@cbdmasterlevel.cz
                    </a>
                  </div>
                  
                  <div className="group">
                    <h3 className="text-xs font-medium uppercase tracking-widest text-brand-beige/50 mb-2">
                      Zákaznická linka
                    </h3>
                    <a href="tel:+420800123456" className="text-xl sm:text-2xl font-serif text-white group-hover:text-brand-gold transition-colors">
                      +420 800 123 456
                    </a>
                    <p className="text-sm text-brand-beige/50 font-light mt-1">Po - Pá: 9:00 - 17:00</p>
                  </div>

                  <div>
                    <h3 className="text-xs font-medium uppercase tracking-widest text-brand-beige/50 mb-2">
                      Sídlo společnosti
                    </h3>
                    <address className="not-italic text-lg text-white font-serif">
                      Master Level CBD s.r.o.<br />
                      Pařížská 12<br />
                      110 00 Praha 1<br />
                      Česká republika
                    </address>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-white/5">
                <h3 className="text-xs font-medium uppercase tracking-widest text-brand-beige/50 mb-6">
                  Sledujte nás
                </h3>
                <div className="flex gap-6">
                  <a href="#instagram" className="text-sm font-bold uppercase tracking-widest text-brand-gold hover:text-white transition-colors">
                    Instagram
                  </a>
                  <a href="#facebook" className="text-sm font-bold uppercase tracking-widest text-brand-gold hover:text-white transition-colors">
                    Facebook
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div>
              <ContactForm />
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
