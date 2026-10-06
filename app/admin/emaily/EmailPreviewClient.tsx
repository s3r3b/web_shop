'use client';

import React, { useState } from 'react';
import { 
  Mail, 
  Smartphone, 
  Monitor, 
  Tablet, 
  ExternalLink, 
  CheckCircle2, 
  Send, 
  Sparkles, 
  Layers, 
  Type 
} from 'lucide-react';

type TemplateKey = 'order' | 'welcome' | 'shipped';

interface TemplateInfo {
  key: TemplateKey;
  nameCz: string;
  namePl: string;
  descriptionCz: string;
  subjectCz: string;
}

const TEMPLATES: TemplateInfo[] = [
  {
    key: 'order',
    nameCz: 'Potvrzení objednávky',
    namePl: 'Potwierdzenie zamówienia',
    descriptionCz: 'Transakční e-mail odesílaný ihned po úspěšné autorizaci platby s detailním rozpisem položek, šarží a doručení.',
    subjectCz: 'Potvrzení objednávky #ML-2026-8942 – CBD Master Level Apothecary',
  },
  {
    key: 'welcome',
    nameCz: 'Uvítací & Verifikace účtu',
    namePl: 'Powitanie i weryfikacja konta',
    descriptionCz: 'Onboardingový e-mail s pozvánkou do privátního VIP klubu a odkazem pro autorizaci e-mailové adresy.',
    subjectCz: 'Vítejte v exkluzivním světě CBD Master Level – aktivujte svůj účet',
  },
  {
    key: 'shipped',
    nameCz: 'Oznámení o expedici',
    namePl: 'Powiadomienie o wysyłce',
    descriptionCz: 'Notifikace o předání bezpečnostního termoboxu kurýrovi se sledovacím číslem a odkazem.',
    subjectCz: 'Vaše zásilka #ML-2026-8942 byla předána dopravci – CBD Master Level',
  },
];

export default function EmailPreviewClient() {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateKey>('order');
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [testEmail, setTestEmail] = useState('info@cbd-master.com');
  const [isSending, setIsSending] = useState(false);
  const [sendResult, setSendResult] = useState<{ success: boolean; message: string } | null>(null);

  const currentTemplate = TEMPLATES.find((t) => t.key === selectedTemplate) || TEMPLATES[0];

  const getContainerWidth = () => {
    switch (viewport) {
      case 'mobile':
        return 'max-w-[400px]';
      case 'tablet':
        return 'max-w-[540px]';
      case 'desktop':
      default:
        return 'max-w-[720px]';
    }
  };

  const handleSendTestEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testEmail || isSending) return;

    setIsSending(true);
    setSendResult(null);

    try {
      const res = await fetch('/api/admin/emails/test-send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: testEmail,
          template: selectedTemplate,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSendResult({
          success: true,
          message: data.simulated
            ? `Simulace odeslání (v režimu bez klíče): E-mail připraven pro ${testEmail}`
            : `Testovací e-mail byl úspěšně odeslán na adresu ${testEmail}!`,
        });
      } else {
        setSendResult({
          success: false,
          message: data.error || 'Odeslání testovacího e-mailu se nezdařilo.',
        });
      }
    } catch {
      setSendResult({
        success: false,
        message: 'Chyba sítě při odesílání e-mailu.',
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-brand-gold/15 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-brand-gold text-xs uppercase tracking-widest font-mono mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Knihovna šablon e-mailů • React Email</span>
          </div>
          <h1 className="text-3xl font-serif text-white tracking-wide">
            Šablony e-mailů CBD Master Level
          </h1>
          <p className="text-brand-beige/60 text-sm mt-1">
            Typografie v prestižním stylu <span className="text-brand-gold font-serif italic text-base">Cormorant Garamond</span>, 
            zlaté linky a temný botanický vizuál.
          </p>
        </div>

        {/* Action button: Open raw HTML in new tab */}
        <div className="flex items-center space-x-3">
          <a
            href={`/api/admin/emails/preview?template=${selectedTemplate}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-lg border border-brand-gold/30 bg-brand-gold/10 text-brand-gold hover:bg-brand-gold/20 transition-all text-xs tracking-wider uppercase font-semibold"
          >
            <span>Otevřít HTML</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar Controls */}
        <div className="xl:col-span-4 space-y-6">
          {/* Template Selector */}
          <div className="bg-[#0b0f0c] border border-brand-gold/20 rounded-xl p-5 shadow-xl">
            <h2 className="text-xs uppercase tracking-widest text-brand-gold/80 font-mono mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-brand-gold" />
              <span>Dostupné šablony</span>
            </h2>

            <div className="space-y-2">
              {TEMPLATES.map((tmpl) => {
                const isSelected = tmpl.key === selectedTemplate;
                return (
                  <button
                    key={tmpl.key}
                    onClick={() => {
                      setSelectedTemplate(tmpl.key);
                      setSendResult(null);
                    }}
                    className={`w-full text-left p-3.5 rounded-lg transition-all border ${
                      isSelected
                        ? 'bg-brand-gold/15 border-brand-gold text-white shadow-[0_0_15px_rgba(212,175,55,0.15)]'
                        : 'bg-white/5 border-transparent text-brand-beige/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-lg tracking-wide text-brand-gold">
                        {tmpl.nameCz}
                      </span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-brand-gold" />}
                    </div>
                    <p className="text-xs text-brand-beige/50 mt-1 line-clamp-2">
                      {tmpl.descriptionCz}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Typography & Design Spec Card */}
          <div className="bg-[#0b0f0c] border border-brand-gold/20 rounded-xl p-5 shadow-xl space-y-4">
            <h2 className="text-xs uppercase tracking-widest text-brand-gold/80 font-mono flex items-center gap-2">
              <Type className="w-4 h-4 text-brand-gold" />
              <span>Design & Typografie</span>
            </h2>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded bg-white/5 border border-white/5">
                <span className="text-brand-beige/50 block font-mono text-[10px] uppercase">Primární písmo nadpisů</span>
                <span className="text-white font-serif text-base block mt-0.5">Cormorant Garamond (Google Fonts)</span>
                <span className="text-brand-gold/80 italic text-[11px] block mt-0.5">Vznešený renesanční serif, vytříbená ligatura</span>
              </div>

              <div className="p-3 rounded bg-white/5 border border-white/5">
                <span className="text-brand-beige/50 block font-mono text-[10px] uppercase">Sekundární text & detaily</span>
                <span className="text-white block mt-0.5">Montserrat / System UI sans-serif</span>
              </div>

              <div className="p-3 rounded bg-white/5 border border-white/5">
                <span className="text-brand-beige/50 block font-mono text-[10px] uppercase">Barevná paleta</span>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="w-5 h-5 rounded-full bg-[#070a08] border border-white/20" title="Pozadí #070A08" />
                  <span className="w-5 h-5 rounded-full bg-[#0f1411] border border-brand-gold/40" title="Kontejner #0F1411" />
                  <span className="w-5 h-5 rounded-full bg-[#151c17] border border-brand-gold/30" title="Karta #151C17" />
                  <span className="w-5 h-5 rounded-full bg-[#d4af37]" title="Zlato #D4AF37" />
                  <span className="w-5 h-5 rounded-full bg-[#f3e5ab]" title="Světlé zlato #F3E5AB" />
                </div>
              </div>
            </div>
          </div>

          {/* Test Dispatch Box */}
          <div className="bg-[#0b0f0c] border border-brand-gold/20 rounded-xl p-5 shadow-xl">
            <h2 className="text-xs uppercase tracking-widest text-brand-gold/80 font-mono mb-3 flex items-center gap-2">
              <Mail className="w-4 h-4 text-brand-gold" />
              <span>Odeslat testovací e-mail</span>
            </h2>

            <form onSubmit={handleSendTestEmail} className="space-y-3">
              <div>
                <label className="text-[11px] text-brand-beige/60 uppercase font-mono block mb-1">
                  Příjemce testu
                </label>
                <input
                  type="email"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  placeholder="vas@email.cz"
                  className="w-full px-3 py-2 bg-white/5 border border-brand-gold/20 rounded-lg text-sm text-white focus:outline-none focus:border-brand-gold"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="w-full py-2.5 px-4 bg-brand-gold hover:bg-brand-gold-light text-[#070a08] font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {isSending ? (
                  <span>Odesílám...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Odeslat náhled</span>
                  </>
                )}
              </button>

              {sendResult && (
                <div
                  className={`p-3 rounded-lg text-xs leading-relaxed ${
                    sendResult.success
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-red-500/10 text-red-400 border border-red-500/20'
                  }`}
                >
                  {sendResult.message}
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Right Preview Viewport */}
        <div className="xl:col-span-8 space-y-4">
          {/* Viewport Control Bar */}
          <div className="bg-[#0b0f0c] border border-brand-gold/20 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs">
              <span className="text-brand-beige/50 font-mono uppercase block text-[10px]">Předmět e-mailu (Subject):</span>
              <span className="text-brand-gold font-medium">{currentTemplate.subjectCz}</span>
            </div>

            <div className="flex items-center bg-white/5 rounded-lg p-1 border border-white/10">
              <button
                onClick={() => setViewport('desktop')}
                className={`p-2 rounded flex items-center gap-1.5 text-xs transition-colors ${
                  viewport === 'desktop'
                    ? 'bg-brand-gold text-[#070a08] font-bold shadow'
                    : 'text-brand-beige/70 hover:text-white'
                }`}
                title="Desktop (720px)"
              >
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Desktop</span>
              </button>

              <button
                onClick={() => setViewport('tablet')}
                className={`p-2 rounded flex items-center gap-1.5 text-xs transition-colors ${
                  viewport === 'tablet'
                    ? 'bg-brand-gold text-[#070a08] font-bold shadow'
                    : 'text-brand-beige/70 hover:text-white'
                }`}
                title="Tablet (540px)"
              >
                <Tablet className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Tablet</span>
              </button>

              <button
                onClick={() => setViewport('mobile')}
                className={`p-2 rounded flex items-center gap-1.5 text-xs transition-colors ${
                  viewport === 'mobile'
                    ? 'bg-brand-gold text-[#070a08] font-bold shadow'
                    : 'text-brand-beige/70 hover:text-white'
                }`}
                title="Mobil (400px)"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Mobil</span>
              </button>
            </div>
          </div>

          {/* Interactive Iframe Frame */}
          <div className="bg-[#050706] border border-brand-gold/20 rounded-2xl p-4 md:p-8 flex justify-center items-start min-h-[850px] shadow-2xl overflow-x-auto">
            <div className={`w-full ${getContainerWidth()} transition-all duration-300`}>
              <iframe
                src={`/api/admin/emails/preview?template=${selectedTemplate}`}
                title="Email Preview"
                className="w-full h-[950px] rounded-lg border border-brand-gold/30 shadow-[0_10px_40px_rgba(0,0,0,0.8)] bg-[#070a08]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
