'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import {
  Users,
  Search,
  Filter,
  Download,
  UserPlus,
  Crown,
  Building2,
  Sparkles,
  UserCheck,
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  Clock,
  X,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  FileText,
  Save,
} from 'lucide-react';
import {
  MedusaCustomer,
  CustomerLoyaltyTier,
} from '@/lib/services/medusa-customers';
import {
  createCustomerAction,
  updateCustomerTierAction,
  updateCustomerNotesAction,
} from '@/lib/actions/customers';

interface CustomersClientProps {
  initialCustomers: MedusaCustomer[];
}

export default function CustomersClient({ initialCustomers }: CustomersClientProps) {
  const [customers, setCustomers] = useState<MedusaCustomer[]>(initialCustomers);
  const [activeTab, setActiveTab] = useState<'all' | CustomerLoyaltyTier>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'spent-desc' | 'orders-desc' | 'date-desc' | 'name-asc'>('spent-desc');
  
  // Selected customer for detail modal/drawer
  const [selectedCustomer, setSelectedCustomer] = useState<MedusaCustomer | null>(null);
  
  // Add customer modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [formFeedback, setFormFeedback] = useState<{ success?: string; error?: string } | null>(null);

  // Editable notes state inside detail modal
  const [currentNotes, setCurrentNotes] = useState('');
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [notesFeedback, setNotesFeedback] = useState<string | null>(null);

  // Open detail modal and sync notes
  const handleOpenDetail = (customer: MedusaCustomer) => {
    setSelectedCustomer(customer);
    setCurrentNotes(customer.notes || '');
    setNotesFeedback(null);
  };

  // Filter and sort customers
  const filteredCustomers = customers
    .filter((customer) => {
      // Tab filter
      if (activeTab !== 'all' && customer.loyalty_tier !== activeTab) {
        return false;
      }
      // Search filter
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase().trim();
      const fullName = `${customer.first_name} ${customer.last_name}`.toLowerCase();
      const email = customer.email.toLowerCase();
      const phone = (customer.phone || '').toLowerCase();
      const company = (customer.company || '').toLowerCase();
      const city = (customer.default_address?.city || '').toLowerCase();

      return (
        fullName.includes(query) ||
        email.includes(query) ||
        phone.includes(query) ||
        company.includes(query) ||
        city.includes(query)
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'spent-desc':
          return b.total_spent_raw - a.total_spent_raw;
        case 'orders-desc':
          return b.orders_count - a.orders_count;
        case 'date-desc':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'name-asc':
          return a.last_name.localeCompare(b.last_name, 'cs');
        default:
          return 0;
      }
    });

  // Calculate metrics
  const totalCustomersCount = customers.length;
  const totalRevenueSum = customers.reduce((acc, c) => acc + c.total_spent_raw, 0);
  const avgRevenuePerCustomer = totalCustomersCount > 0 ? Math.round(totalRevenueSum / totalCustomersCount) : 0;
  const vipAndB2bCount = customers.filter(
    (c) => c.loyalty_tier === 'gold_vip' || c.loyalty_tier === 'b2b'
  ).length;

  // Handle tier change
  const handleTierChange = async (newTier: CustomerLoyaltyTier) => {
    if (!selectedCustomer) return;
    
    startTransition(async () => {
      const res = await updateCustomerTierAction(selectedCustomer.id, newTier);
      if (res.success) {
        const updated = { ...selectedCustomer, loyalty_tier: newTier };
        setSelectedCustomer(updated);
        setCustomers((prev) =>
          prev.map((c) => (c.id === selectedCustomer.id ? updated : c))
        );
      }
    });
  };

  // Handle saving notes
  const handleSaveNotes = async () => {
    if (!selectedCustomer) return;
    setIsSavingNotes(true);
    setNotesFeedback(null);
    try {
      const res = await updateCustomerNotesAction(selectedCustomer.id, currentNotes);
      if (res.success) {
        const updated = { ...selectedCustomer, notes: currentNotes };
        setSelectedCustomer(updated);
        setCustomers((prev) =>
          prev.map((c) => (c.id === selectedCustomer.id ? updated : c))
        );
        setNotesFeedback('Poznámka byla uložena.');
      } else {
        setNotesFeedback(res.message || 'Chyba při ukládání.');
      }
    } catch {
      setNotesFeedback('Chyba spojení.');
    } finally {
      setIsSavingNotes(false);
      setTimeout(() => setNotesFeedback(null), 3000);
    }
  };

  // Export to CSV with UTF-8 BOM for Czech diacritics
  const handleExportCSV = () => {
    const headers = [
      'ID',
      'Jméno',
      'Příjmení',
      'E-mail',
      'Telefon',
      'Společnost',
      'IČO',
      'Město',
      'Segment',
      'Počet objednávek',
      'Celková útrata (Kč)',
      'Registrace',
    ];

    const rows = filteredCustomers.map((c) => [
      c.id,
      `"${c.first_name}"`,
      `"${c.last_name}"`,
      `"${c.email}"`,
      `"${c.phone || ''}"`,
      `"${c.company || ''}"`,
      `"${c.ic || ''}"`,
      `"${c.default_address?.city || ''}"`,
      `"${c.loyalty_tier}"`,
      c.orders_count,
      c.total_spent_raw,
      new Date(c.created_at).toLocaleDateString('cs-CZ'),
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `zakaznici_cbd_master_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Format date helper
  const formatDateCs = (dateString: string) => {
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString('cs-CZ', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch {
      return dateString;
    }
  };

  // Loyalty badge renderer
  const renderLoyaltyBadge = (tier: CustomerLoyaltyTier) => {
    switch (tier) {
      case 'gold_vip':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            VIP Gold
          </span>
        );
      case 'b2b':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/15 text-blue-300 border border-blue-500/30">
            <Building2 className="w-3.5 h-3.5 text-blue-400" />
            B2B Partner
          </span>
        );
      case 'silver':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-300/15 text-slate-200 border border-slate-300/30">
            <Sparkles className="w-3.5 h-3.5 text-slate-300" />
            Silver
          </span>
        );
      case 'regular':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-white/10 text-brand-beige/80 border border-white/10">
            <UserCheck className="w-3.5 h-3.5 text-brand-beige/60" />
            Běžný
          </span>
        );
    }
  };

  return (
    <>
      {/* Page Header */}
      <header className="mb-8 relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-brand-gold/10 border border-brand-gold/20 text-brand-gold">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-serif text-white tracking-wide">Správa zákazníků</h1>
              <p className="text-brand-beige/70 text-sm mt-0.5">
                Klientská databáze Medusa.js v2, segmentace, věrnostní program a nákupní historie.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={handleExportCSV}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-brand-gold/30 bg-[#090909] text-brand-beige hover:text-white hover:border-brand-gold transition-colors text-xs font-medium"
          >
            <Download className="w-4 h-4 text-brand-gold" />
            <span>Exportovat (CSV)</span>
          </button>

          <button
            onClick={() => {
              setFormFeedback(null);
              setIsAddModalOpen(true);
            }}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-brand-gold text-brand-black hover:bg-white transition-all text-xs font-semibold shadow-[0_0_20px_rgba(212,175,55,0.2)]"
          >
            <UserPlus className="w-4 h-4" />
            <span>Nový zákazník</span>
          </button>
        </div>
      </header>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8 relative z-10">
        <div className="bg-[#090909] border border-brand-gold/20 rounded-xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between text-brand-beige/60 text-[10px] uppercase tracking-widest mb-1">
            <span>Celkem zákazníků</span>
            <Users className="w-4 h-4 text-brand-gold/80" />
          </div>
          <h3 className="text-2xl font-serif text-white mt-1">{totalCustomersCount}</h3>
          <p className="text-xs text-brand-beige/50 mt-1 flex items-center gap-1">
            <span className="text-emerald-400 font-medium">+14%</span> oproti minulému měsíci
          </p>
        </div>

        <div className="bg-[#090909] border border-brand-gold/20 rounded-xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between text-brand-beige/60 text-[10px] uppercase tracking-widest mb-1">
            <span>Celková hodnota (LTV)</span>
            <TrendingUp className="w-4 h-4 text-brand-gold/80" />
          </div>
          <h3 className="text-2xl font-serif text-brand-gold mt-1">
            {totalRevenueSum.toLocaleString('cs-CZ')} Kč
          </h3>
          <p className="text-xs text-brand-beige/50 mt-1">Kumulovaná útrata všech klientů</p>
        </div>

        <div className="bg-[#090909] border border-brand-gold/20 rounded-xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between text-brand-beige/60 text-[10px] uppercase tracking-widest mb-1">
            <span>Průměrná hodnota (AOV)</span>
            <ShoppingBag className="w-4 h-4 text-brand-gold/80" />
          </div>
          <h3 className="text-2xl font-serif text-white mt-1">
            {avgRevenuePerCustomer.toLocaleString('cs-CZ')} Kč
          </h3>
          <p className="text-xs text-brand-beige/50 mt-1">Průměrná celoživotní hodnota</p>
        </div>

        <div className="bg-[#090909] border border-brand-gold/20 rounded-xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between text-brand-beige/60 text-[10px] uppercase tracking-widest mb-1">
            <span>VIP & B2B segment</span>
            <Crown className="w-4 h-4 text-amber-400" />
          </div>
          <h3 className="text-2xl font-serif text-white mt-1">{vipAndB2bCount}</h3>
          <p className="text-xs text-brand-beige/50 mt-1">
            {Math.round((vipAndB2bCount / (totalCustomersCount || 1)) * 100)}% z celkové základny
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#090909] border border-brand-gold/20 rounded-t-xl p-4 flex flex-col lg:flex-row gap-4 justify-between items-center relative z-10">
        {/* Loyalty Tier Tabs */}
        <div className="flex space-x-1.5 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 hide-scrollbar">
          {[
            { id: 'all', label: 'Všichni klienti', count: customers.length },
            { id: 'gold_vip', label: 'VIP Gold', count: customers.filter((c) => c.loyalty_tier === 'gold_vip').length },
            { id: 'b2b', label: 'B2B Partneři', count: customers.filter((c) => c.loyalty_tier === 'b2b').length },
            { id: 'silver', label: 'Silver', count: customers.filter((c) => c.loyalty_tier === 'silver').length },
            { id: 'regular', label: 'Běžní', count: customers.filter((c) => c.loyalty_tier === 'regular').length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'all' | CustomerLoyaltyTier)}
              className={`px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-brand-gold/15 text-brand-gold border border-brand-gold/30 shadow-[0_0_10px_rgba(212,175,55,0.1)]'
                  : 'text-brand-beige/60 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeTab === tab.id ? 'bg-brand-gold/20 text-brand-gold' : 'bg-white/5 text-brand-beige/40'
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-beige/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Hledat jméno, e-mail, IČO..."
              className="w-full bg-[#040404] border border-brand-gold/20 text-white text-xs rounded-lg pl-9 pr-4 py-2.5 focus:outline-none focus:border-brand-gold transition-colors placeholder:text-brand-beige/30"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-beige/40 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-brand-beige/40 shrink-0 hidden sm:block" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'spent-desc' | 'orders-desc' | 'date-desc' | 'name-asc')}
              className="bg-[#040404] border border-brand-gold/20 text-brand-beige/80 text-xs rounded-lg px-3 py-2.5 focus:outline-none focus:border-brand-gold transition-colors cursor-pointer"
            >
              <option value="spent-desc">Seřadit: Nejvyšší útrata (LTV)</option>
              <option value="orders-desc">Seřadit: Počet objednávek</option>
              <option value="date-desc">Seřadit: Nejnovější registrace</option>
              <option value="name-asc">Seřadit: Příjmení (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-[#090909] border-x border-b border-brand-gold/20 rounded-b-xl shadow-lg relative z-10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-brand-beige/80">
            <thead className="bg-[#040404] text-[10px] uppercase tracking-widest text-brand-beige/50 border-y border-brand-gold/10">
              <tr>
                <th className="px-6 py-4 font-medium">Zákazník</th>
                <th className="px-6 py-4 font-medium">Věrnostní status</th>
                <th className="px-6 py-4 font-medium">Kontakt & Město</th>
                <th className="px-6 py-4 font-medium text-center">Objednávky</th>
                <th className="px-6 py-4 font-medium text-right">Celková útrata</th>
                <th className="px-6 py-4 font-medium">Registrace</th>
                <th className="px-6 py-4 font-medium text-center">Akce</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-gold/10">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-brand-beige/40">
                    <Users className="w-8 h-8 mx-auto mb-2 opacity-30" />
                    <p className="text-sm">Nenalezeni žádní zákazníci odpovídající kritériím vyhledávání.</p>
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((customer) => {
                  const initials = `${customer.first_name[0] || ''}${customer.last_name[0] || ''}`;

                  return (
                    <tr
                      key={customer.id}
                      onClick={() => handleOpenDetail(customer)}
                      className="hover:bg-white/5 transition-colors cursor-pointer group"
                    >
                      {/* Name & Email */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold font-serif text-xs font-semibold shrink-0 group-hover:border-brand-gold/50 transition-colors">
                            {initials}
                          </div>
                          <div>
                            <div className="text-white font-medium flex items-center gap-2">
                              <span>
                                {customer.first_name} {customer.last_name}
                              </span>
                              {customer.company && (
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                  {customer.company}
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-brand-beige/50 flex items-center gap-1.5 mt-0.5">
                              <span>{customer.email}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Loyalty Tier Badge */}
                      <td className="px-6 py-4">{renderLoyaltyBadge(customer.loyalty_tier)}</td>

                      {/* Contact & Location */}
                      <td className="px-6 py-4">
                        <div className="text-xs text-brand-beige/70">
                          <div>{customer.phone || 'Bez telefonu'}</div>
                          <div className="text-brand-beige/40 mt-0.5">
                            {customer.default_address?.city || 'Česká republika'}
                          </div>
                        </div>
                      </td>

                      {/* Orders Count */}
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-medium text-white">
                          {customer.orders_count}
                        </span>
                      </td>

                      {/* Total Spent */}
                      <td className="px-6 py-4 text-right">
                        <span className="font-serif text-brand-gold font-semibold text-sm">
                          {customer.total_spent_formatted}
                        </span>
                      </td>

                      {/* Created At */}
                      <td className="px-6 py-4 text-xs text-brand-beige/50">
                        {formatDateCs(customer.created_at)}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-center" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => handleOpenDetail(customer)}
                          className="px-3 py-1.5 rounded-lg border border-brand-gold/20 text-brand-gold hover:bg-brand-gold hover:text-black transition-all text-xs font-medium inline-flex items-center gap-1"
                        >
                          <span>Karta</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ======================================================== */}
      {/* CUSTOMER DETAIL MODAL / DRAWER                           */}
      {/* ======================================================== */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#0c0c0c] border border-brand-gold/30 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
            {/* Header */}
            <div className="p-6 border-b border-brand-gold/20 flex items-center justify-between sticky top-0 bg-[#0c0c0c]/95 backdrop-blur z-20">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-brand-gold/15 border border-brand-gold/30 flex items-center justify-center text-brand-gold font-serif text-base font-semibold">
                  {selectedCustomer.first_name[0]}
                  {selectedCustomer.last_name[0]}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-serif text-white">
                      {selectedCustomer.first_name} {selectedCustomer.last_name}
                    </h2>
                    {renderLoyaltyBadge(selectedCustomer.loyalty_tier)}
                  </div>
                  <p className="text-xs text-brand-beige/50 font-mono mt-0.5">
                    ID: {selectedCustomer.id}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedCustomer(null)}
                className="p-2 text-brand-beige/50 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Customer Stats Cards */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-[#141414] border border-brand-gold/10 rounded-xl p-4 text-center">
                  <span className="text-[10px] uppercase tracking-wider text-brand-beige/50">Celková útrata</span>
                  <div className="text-lg font-serif text-brand-gold font-semibold mt-1">
                    {selectedCustomer.total_spent_formatted}
                  </div>
                </div>
                <div className="bg-[#141414] border border-brand-gold/10 rounded-xl p-4 text-center">
                  <span className="text-[10px] uppercase tracking-wider text-brand-beige/50">Počet objednávek</span>
                  <div className="text-lg font-serif text-white font-semibold mt-1">
                    {selectedCustomer.orders_count}
                  </div>
                </div>
                <div className="bg-[#141414] border border-brand-gold/10 rounded-xl p-4 text-center">
                  <span className="text-[10px] uppercase tracking-wider text-brand-beige/50">Členství od</span>
                  <div className="text-xs text-brand-beige/80 font-medium mt-2">
                    {formatDateCs(selectedCustomer.created_at)}
                  </div>
                </div>
              </div>

              {/* Contact and Address Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Contact Information */}
                <div className="bg-[#141414] border border-brand-gold/15 rounded-xl p-5 space-y-3">
                  <h4 className="text-xs uppercase tracking-widest text-brand-gold font-semibold flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" />
                    Kontaktní údaje
                  </h4>
                  <div className="space-y-2 text-xs text-brand-beige/80">
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-brand-beige/50">E-mail:</span>
                      <a href={`mailto:${selectedCustomer.email}`} className="text-white hover:text-brand-gold">
                        {selectedCustomer.email}
                      </a>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-brand-beige/50">Telefon:</span>
                      <span className="text-white">{selectedCustomer.phone || 'Neuveden'}</span>
                    </div>
                    {selectedCustomer.company && (
                      <>
                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-brand-beige/50">Firma:</span>
                          <span className="text-white font-medium">{selectedCustomer.company}</span>
                        </div>
                        {selectedCustomer.ic && (
                          <div className="flex justify-between py-1 border-b border-white/5">
                            <span className="text-brand-beige/50">IČO:</span>
                            <span className="text-white font-mono">{selectedCustomer.ic}</span>
                          </div>
                        )}
                        {selectedCustomer.dic && (
                          <div className="flex justify-between py-1 border-b border-white/5">
                            <span className="text-brand-beige/50">DIČ:</span>
                            <span className="text-white font-mono">{selectedCustomer.dic}</span>
                          </div>
                        )}
                      </>
                    )}
                    <div className="flex justify-between py-1">
                      <span className="text-brand-beige/50">Stav účtu:</span>
                      <span className="text-emerald-400 font-medium">Aktivní profil</span>
                    </div>
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="bg-[#141414] border border-brand-gold/15 rounded-xl p-5 space-y-3">
                  <h4 className="text-xs uppercase tracking-widest text-brand-gold font-semibold flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    Výchozí doručovací adresa
                  </h4>
                  {selectedCustomer.default_address ? (
                    <div className="space-y-1.5 text-xs text-brand-beige/80 pt-1">
                      <div className="text-white font-medium">
                        {selectedCustomer.default_address.first_name} {selectedCustomer.default_address.last_name}
                      </div>
                      <div>{selectedCustomer.default_address.address_1}</div>
                      <div>
                        {selectedCustomer.default_address.postal_code} {selectedCustomer.default_address.city}
                      </div>
                      <div className="text-brand-beige/50 uppercase tracking-wider text-[11px]">
                        {selectedCustomer.default_address.country_code === 'cz' ? 'Česká republika' : selectedCustomer.default_address.country_code}
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-brand-beige/40 italic py-3">
                      Zákazník nemá uloženou žádnou doručovací adresu.
                    </p>
                  )}

                  {/* Change Tier Selector */}
                  <div className="pt-2 border-t border-white/5">
                    <label className="text-[10px] uppercase tracking-wider text-brand-beige/50 block mb-1.5">
                      Změnit úroveň věrnosti
                    </label>
                    <select
                      value={selectedCustomer.loyalty_tier}
                      onChange={(e) => handleTierChange(e.target.value as CustomerLoyaltyTier)}
                      disabled={isPending}
                      className="w-full bg-[#090909] border border-brand-gold/20 text-white text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-brand-gold cursor-pointer"
                    >
                      <option value="regular">Běžný zákazník (Standard)</option>
                      <option value="silver">Silver Tier (5% stálá sleva)</option>
                      <option value="gold_vip">VIP Gold Tier (10% sleva + prioritní servis)</option>
                      <option value="b2b">B2B Velkoobchodní partner</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Internal Notes */}
              <div className="bg-[#141414] border border-brand-gold/15 rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs uppercase tracking-widest text-brand-gold font-semibold flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    Interní poznámka k zákazníkovi
                  </h4>
                  {notesFeedback && (
                    <span className="text-xs text-emerald-400 flex items-center gap-1 animate-fade-in">
                      <CheckCircle2 className="w-3 h-3" />
                      {notesFeedback}
                    </span>
                  )}
                </div>
                <textarea
                  value={currentNotes}
                  onChange={(e) => setCurrentNotes(e.target.value)}
                  placeholder="Zadejte interní poznámku (např. oblíbené produkty, speciální požadavky na dopravu, domluvené slevy)..."
                  rows={3}
                  className="w-full bg-[#090909] border border-brand-gold/20 text-white text-xs rounded-lg p-3 focus:outline-none focus:border-brand-gold transition-colors placeholder:text-brand-beige/30"
                />
                <div className="flex justify-end">
                  <button
                    onClick={handleSaveNotes}
                    disabled={isSavingNotes}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-gold/20 text-brand-gold border border-brand-gold/40 hover:bg-brand-gold hover:text-black transition-all text-xs font-medium disabled:opacity-50"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{isSavingNotes ? 'Ukládám...' : 'Uložit poznámku'}</span>
                  </button>
                </div>
              </div>

              {/* Order History */}
              <div className="bg-[#141414] border border-brand-gold/15 rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs uppercase tracking-widest text-brand-gold font-semibold flex items-center gap-1.5">
                    <ShoppingBag className="w-3.5 h-3.5" />
                    Historie objednávek ({selectedCustomer.recent_orders?.length || 0})
                  </h4>
                  <Link
                    href="/admin/zamowienia"
                    className="text-xs text-brand-gold hover:underline inline-flex items-center gap-1"
                  >
                    <span>Všechny objednávky</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>

                {selectedCustomer.recent_orders && selectedCustomer.recent_orders.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-white/10 text-brand-beige/40 uppercase tracking-wider text-[10px]">
                          <th className="py-2.5">Číslo</th>
                          <th className="py-2.5">Datum</th>
                          <th className="py-2.5">Položek</th>
                          <th className="py-2.5">Stav</th>
                          <th className="py-2.5 text-right">Částka</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {selectedCustomer.recent_orders.map((order) => (
                          <tr key={order.id} className="hover:bg-white/5 transition-colors">
                            <td className="py-2.5 font-medium text-white">{order.display_id}</td>
                            <td className="py-2.5 text-brand-beige/60">
                              {new Date(order.created_at).toLocaleDateString('cs-CZ')}
                            </td>
                            <td className="py-2.5 text-brand-beige/70">{order.items_count} ks</td>
                            <td className="py-2.5">
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-medium uppercase ${
                                  order.status === 'delivered'
                                    ? 'bg-emerald-500/10 text-emerald-400'
                                    : order.status === 'shipped'
                                    ? 'bg-blue-500/10 text-blue-400'
                                    : order.status === 'paid'
                                    ? 'bg-indigo-500/10 text-indigo-400'
                                    : 'bg-amber-500/10 text-amber-400'
                                }`}
                              >
                                {order.status === 'delivered' ? 'Doručeno' : order.status === 'shipped' ? 'Odesláno' : order.status === 'paid' ? 'Zaplaceno' : 'Čeká'}
                              </span>
                            </td>
                            <td className="py-2.5 text-right font-serif text-brand-gold font-medium">
                              {order.total_formatted}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-xs text-brand-beige/40 py-2 italic">
                    Tento zákazník zatím nemá evidovány žádné dokončené objednávky.
                  </p>
                )}
              </div>

              {/* Quick Actions Footer */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  href={`/admin/emaily`}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-brand-gold/30 bg-[#090909] text-brand-gold hover:bg-brand-gold hover:text-black transition-all text-xs font-semibold"
                >
                  <Mail className="w-4 h-4" />
                  <span>Odeslat transakční e-mail</span>
                </Link>
                <button
                  onClick={() => setSelectedCustomer(null)}
                  className="px-5 py-2.5 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors text-xs font-medium"
                >
                  Zavřít kartu
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* ADD NEW CUSTOMER MODAL                                   */}
      {/* ======================================================== */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#0c0c0c] border border-brand-gold/30 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <div className="p-6 border-b border-brand-gold/20 flex items-center justify-between sticky top-0 bg-[#0c0c0c]/95 backdrop-blur z-20">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-brand-gold/15 text-brand-gold">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-serif text-white">Přidat nového zákazníka</h2>
                  <p className="text-xs text-brand-beige/60">
                    Vytvoření klientského profilu s napojením na Medusa v2.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 text-brand-beige/50 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              action={async (formData: FormData) => {
                setFormFeedback(null);
                startTransition(async () => {
                  const res = await createCustomerAction(null, formData);
                  if (res.success && res.customer) {
                    setCustomers((prev) => [res.customer as MedusaCustomer, ...prev]);
                    setFormFeedback({ success: 'Zákazník byl úspěšně vytvořen.' });
                    setTimeout(() => {
                      setIsAddModalOpen(false);
                      setFormFeedback(null);
                    }, 1200);
                  } else {
                    setFormFeedback({
                      error: res.message || 'Nepodařilo se vytvořit zákazníka.',
                    });
                  }
                });
              }}
              className="p-6 space-y-5"
            >
              {formFeedback?.error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formFeedback.error}</span>
                </div>
              )}

              {formFeedback?.success && (
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{formFeedback.success}</span>
                </div>
              )}

              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-brand-beige/60 mb-1.5 font-medium">
                    Křestní jméno *
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    required
                    placeholder="Např. Martin"
                    className="w-full bg-[#141414] border border-brand-gold/20 text-white text-xs rounded-lg p-3 focus:outline-none focus:border-brand-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-brand-beige/60 mb-1.5 font-medium">
                    Příjmení *
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    required
                    placeholder="Např. Novák"
                    className="w-full bg-[#141414] border border-brand-gold/20 text-white text-xs rounded-lg p-3 focus:outline-none focus:border-brand-gold"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-brand-beige/60 mb-1.5 font-medium">
                    E-mailová adresa *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="klient@domena.cz"
                    className="w-full bg-[#141414] border border-brand-gold/20 text-white text-xs rounded-lg p-3 focus:outline-none focus:border-brand-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-brand-beige/60 mb-1.5 font-medium">
                    Telefonní číslo
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+420 774 123 456"
                    className="w-full bg-[#141414] border border-brand-gold/20 text-white text-xs rounded-lg p-3 focus:outline-none focus:border-brand-gold"
                  />
                </div>
              </div>

              {/* Loyalty Tier & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-brand-beige/60 mb-1.5 font-medium">
                    Věrnostní segment
                  </label>
                  <select
                    name="loyalty_tier"
                    defaultValue="regular"
                    className="w-full bg-[#141414] border border-brand-gold/20 text-white text-xs rounded-lg p-3 focus:outline-none focus:border-brand-gold cursor-pointer"
                  >
                    <option value="regular">Běžný zákazník (Standard)</option>
                    <option value="silver">Silver Tier (5% sleva)</option>
                    <option value="gold_vip">VIP Gold Tier (10% sleva + dárek)</option>
                    <option value="b2b">B2B Velkoobchodní partner</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-brand-beige/60 mb-1.5 font-medium">
                    Název společnosti (pro B2B)
                  </label>
                  <input
                    type="text"
                    name="company"
                    placeholder="Např. BioShop s.r.o."
                    className="w-full bg-[#141414] border border-brand-gold/20 text-white text-xs rounded-lg p-3 focus:outline-none focus:border-brand-gold"
                  />
                </div>
              </div>

              {/* Business ID (IČO & DIČ) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-brand-beige/60 mb-1.5 font-medium">
                    IČO
                  </label>
                  <input
                    type="text"
                    name="ic"
                    placeholder="Např. 12345678"
                    className="w-full bg-[#141414] border border-brand-gold/20 text-white text-xs rounded-lg p-3 focus:outline-none focus:border-brand-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-brand-beige/60 mb-1.5 font-medium">
                    DIČ
                  </label>
                  <input
                    type="text"
                    name="dic"
                    placeholder="Např. CZ12345678"
                    className="w-full bg-[#141414] border border-brand-gold/20 text-white text-xs rounded-lg p-3 focus:outline-none focus:border-brand-gold"
                  />
                </div>
              </div>

              {/* Address Details */}
              <div className="pt-2 border-t border-white/5 space-y-3">
                <span className="text-xs uppercase tracking-widest text-brand-gold font-semibold block">
                  Doručovací adresa
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <input
                      type="text"
                      name="address_1"
                      placeholder="Ulice a číslo popisné"
                      className="w-full bg-[#141414] border border-brand-gold/20 text-white text-xs rounded-lg p-3 focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="postal_code"
                      placeholder="PSČ (např. 110 00)"
                      className="w-full bg-[#141414] border border-brand-gold/20 text-white text-xs rounded-lg p-3 focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                </div>
                <div>
                  <input
                    type="text"
                    name="city"
                    placeholder="Město (např. Praha)"
                    className="w-full bg-[#141414] border border-brand-gold/20 text-white text-xs rounded-lg p-3 focus:outline-none focus:border-brand-gold"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-brand-beige/60 mb-1.5 font-medium">
                  Interní poznámka
                </label>
                <textarea
                  name="notes"
                  rows={2}
                  placeholder="Doplňující informace pro tým CBD Master..."
                  className="w-full bg-[#141414] border border-brand-gold/20 text-white text-xs rounded-lg p-3 focus:outline-none focus:border-brand-gold"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-lg border border-white/10 text-brand-beige hover:text-white transition-colors text-xs font-medium"
                >
                  Zrušit
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-6 py-2.5 rounded-lg bg-brand-gold text-brand-black hover:bg-white transition-all text-xs font-semibold shadow-[0_0_15px_rgba(212,175,55,0.2)] disabled:opacity-50"
                >
                  {isPending ? 'Ukládám zákazníka...' : 'Uložit do databáze'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
