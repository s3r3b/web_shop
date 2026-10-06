'use client';

import { useState, useTransition } from 'react';
import Image from 'next/image';
import { 
  Box, 
  Search, 
  Plus, 
  AlertTriangle, 
  Building2, 
  CheckCircle2, 
  History, 
  Layers, 
  X,
  ArrowUpRight,
  ArrowDownRight,
  PackagePlus,
  Truck,
  FileText,
  Calendar,
  Sparkles,
  ClipboardList,
  Check,
  AlertCircle
} from 'lucide-react';
import { products } from '@/lib/data';
import { replenishStockAction, ReplenishResult } from '@/lib/actions/inventory';

interface InventoryItem {
  id: string;
  sku: string;
  productId: string;
  productName: string;
  variantTitle: string;
  image: string;
  locationId: string;
  locationName: string;
  onHand: number;
  reserved: number;
  available: number;
  minThreshold: number;
  unitPrice: number;
}

interface StockMovementLog {
  id: string;
  documentNumber: string;
  sku: string;
  productName: string;
  locationName: string;
  quantity: number;
  batchNumber: string;
  expiryDate?: string;
  supplier?: string;
  date: string;
}

export default function AdminInventoryPage() {
  const initialInventory: InventoryItem[] = [
    {
      id: 'inv-1',
      sku: 'ML-FOC-10-10ML',
      productId: 'focus-10',
      productName: 'FOCUS 10%',
      variantTitle: '10ml (10% CBD)',
      image: products[0].image,
      locationId: 'loc-prg',
      locationName: 'Centrální sklad Praha',
      onHand: 42,
      reserved: 4,
      available: 38,
      minThreshold: 15,
      unitPrice: 1190,
    },
    {
      id: 'inv-2',
      sku: 'ML-FOC-05-10ML',
      productId: 'focus-10',
      productName: 'FOCUS 10%',
      variantTitle: '10ml (5% CBD)',
      image: products[0].image,
      locationId: 'loc-prg',
      locationName: 'Centrální sklad Praha',
      onHand: 8,
      reserved: 2,
      available: 6,
      minThreshold: 10,
      unitPrice: 890,
    },
    {
      id: 'inv-3',
      sku: 'ML-SLP-20-10ML',
      productId: 'sleep-20',
      productName: 'SLEEP 20% (CBD + CBN)',
      variantTitle: '10ml (20% CBD)',
      image: products[1].image,
      locationId: 'loc-prg',
      locationName: 'Centrální sklad Praha',
      onHand: 74,
      reserved: 8,
      available: 66,
      minThreshold: 20,
      unitPrice: 1690,
    },
    {
      id: 'inv-4',
      sku: 'ML-SLP-10-10ML',
      productId: 'sleep-20',
      productName: 'SLEEP 20% (CBD + CBN)',
      variantTitle: '10ml (10% CBD)',
      image: products[1].image,
      locationId: 'loc-prg',
      locationName: 'Centrální sklad Praha',
      onHand: 19,
      reserved: 3,
      available: 16,
      minThreshold: 15,
      unitPrice: 1290,
    },
    {
      id: 'inv-5',
      sku: 'ML-STR-25-10ML',
      productId: 'nostress-25',
      productName: 'NO STRESS 25%',
      variantTitle: '10ml (25% CBD)',
      image: products[2].image,
      locationId: 'loc-prg',
      locationName: 'Centrální sklad Praha',
      onHand: 31,
      reserved: 1,
      available: 30,
      minThreshold: 10,
      unitPrice: 2490,
    },
    {
      id: 'inv-6',
      sku: 'ML-FOC-10-10ML-BRN',
      productId: 'focus-10',
      productName: 'FOCUS 10%',
      variantTitle: '10ml (10% CBD)',
      image: products[0].image,
      locationId: 'loc-brn',
      locationName: 'Expediční sklad Brno',
      onHand: 15,
      reserved: 1,
      available: 14,
      minThreshold: 10,
      unitPrice: 1190,
    },
    {
      id: 'inv-7',
      sku: 'ML-SLP-20-10ML-BRN',
      productId: 'sleep-20',
      productName: 'SLEEP 20% (CBD + CBN)',
      variantTitle: '10ml (20% CBD)',
      image: products[1].image,
      locationId: 'loc-brn',
      locationName: 'Expediční sklad Brno',
      onHand: 0,
      reserved: 0,
      available: 0,
      minThreshold: 10,
      unitPrice: 1690,
    },
  ];

  const initialMovements: StockMovementLog[] = [
    {
      id: 'mov-1',
      documentNumber: 'PZ/2026/09/014',
      sku: 'ML-FOC-10-10ML',
      productName: 'FOCUS 10%',
      locationName: 'Centrální sklad Praha',
      quantity: 50,
      batchNumber: 'CBD-FOC-2026-09A',
      expiryDate: '2028-09-15',
      supplier: 'Swiss Organic Cannabinoids AG',
      date: '2026-09-21 14:32',
    },
    {
      id: 'mov-2',
      documentNumber: 'PZ/2026/09/009',
      sku: 'ML-SLP-20-10ML',
      productName: 'SLEEP 20% (CBD + CBN)',
      locationName: 'Centrální sklad Praha',
      quantity: 40,
      batchNumber: 'CBD-CBN-2026-08C',
      expiryDate: '2028-08-10',
      supplier: 'Czech Bio Extraction Lab s.r.o.',
      date: '2026-09-18 10:15',
    },
  ];

  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);
  const [movements, setMovements] = useState<StockMovementLog[]>(initialMovements);
  const [activeTab, setActiveTab] = useState<'all' | 'in-stock' | 'low-stock' | 'out-of-stock'>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Replenishment Modal (PZ - Przyjęcie / Uzupełnienie)
  const [isReplenishModalOpen, setIsReplenishModalOpen] = useState(false);
  const [selectedInventoryId, setSelectedInventoryId] = useState<string>(initialInventory[0].id);
  const [replenishQty, setReplenishQty] = useState<number>(25);
  const [docNumber, setDocNumber] = useState<string>('PZ/2026/09/101');
  const [batchNum, setBatchNum] = useState<string>('CBD-LOT-2026-B12');
  const [expDate, setExpDate] = useState<string>('2028-10-01');
  const [supplierName, setSupplierName] = useState<string>('Swiss Organic Cannabinoids AG');
  const [unitCostValue, setUnitCostValue] = useState<number>(450);
  const [notesValue, setNotesValue] = useState<string>('Rutynowe uzupełnienie zapasów magazynowych');

  // Quick Adjustment Modal State
  const [isQuickAdjustModalOpen, setIsQuickAdjustModalOpen] = useState(false);
  const [selectedQuickItem, setSelectedQuickItem] = useState<InventoryItem | null>(null);
  const [quickAdjustQty, setQuickAdjustQty] = useState<number>(10);
  const [quickAdjustType, setQuickAdjustType] = useState<'add' | 'subtract'>('add');
  const [quickAdjustReason, setQuickAdjustReason] = useState<string>('Dostawa towaru');

  // Feedback Notification State
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  // Stats calculation
  const totalStockOnHand = inventory.reduce((acc, item) => acc + item.onHand, 0);
  const totalReserved = inventory.reduce((acc, item) => acc + item.reserved, 0);
  const lowStockCount = inventory.filter((item) => item.onHand > 0 && item.onHand <= item.minThreshold).length;
  const outOfStockCount = inventory.filter((item) => item.onHand === 0).length;
  const totalStockValue = inventory.reduce((acc, item) => acc + (item.onHand * item.unitPrice), 0);

  // Filtered inventory
  const filteredInventory = inventory.filter((item) => {
    const matchesSearch = 
      item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.variantTitle.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLocation = selectedLocation === 'all' || item.locationId === selectedLocation;

    if (!matchesSearch || !matchesLocation) return false;

    if (activeTab === 'in-stock') return item.onHand > item.minThreshold;
    if (activeTab === 'low-stock') return item.onHand > 0 && item.onHand <= item.minThreshold;
    if (activeTab === 'out-of-stock') return item.onHand === 0;

    return true;
  });

  const handleOpenReplenishModal = (itemId?: string) => {
    if (itemId) {
      setSelectedInventoryId(itemId);
    } else if (inventory.length > 0) {
      setSelectedInventoryId(inventory[0].id);
    }
    setDocNumber('PZ/2026/09/' + Math.floor(100 + Math.random() * 900));
    setBatchNum('CBD-LOT-2026-B' + Math.floor(10 + Math.random() * 90));
    setReplenishQty(25);
    setIsReplenishModalOpen(true);
  };

  const handleExecuteReplenish = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    startTransition(async () => {
      const res: ReplenishResult = await replenishStockAction(null, formData);

      if (res.success) {
        // Update local state
        const targetItem = inventory.find((i) => i.id === selectedInventoryId);
        if (targetItem) {
          setInventory((prev) =>
            prev.map((item) => {
              if (item.id === selectedInventoryId) {
                const newOnHand = item.onHand + replenishQty;
                return {
                  ...item,
                  onHand: newOnHand,
                  available: newOnHand - item.reserved,
                };
              }
              return item;
            })
          );

          // Add to movement log
          const newMovement: StockMovementLog = {
            id: 'mov-' + Date.now(),
            documentNumber: docNumber,
            sku: targetItem.sku,
            productName: targetItem.productName,
            locationName: targetItem.locationName,
            quantity: replenishQty,
            batchNumber: batchNum,
            expiryDate: expDate,
            supplier: supplierName,
            date: new Date().toISOString().replace('T', ' ').substring(0, 16),
          };
          setMovements((prev) => [newMovement, ...prev]);
        }

        setToastMessage({
          type: 'success',
          text: res.message || `Úspěšně naskladněno +${replenishQty} ks.`,
        });
        setIsReplenishModalOpen(false);

        setTimeout(() => setToastMessage(null), 5000);
      } else {
        setToastMessage({
          type: 'error',
          text: res.error || 'Chyba při naskladnění zboží.',
        });
      }
    });
  };

  const handleOpenQuickAdjust = (item: InventoryItem, defaultType: 'add' | 'subtract' = 'add') => {
    setSelectedQuickItem(item);
    setQuickAdjustType(defaultType);
    setQuickAdjustQty(defaultType === 'add' ? 10 : 1);
    setQuickAdjustReason(defaultType === 'add' ? 'Dostawa towaru' : 'Korekta inwentaryzacyjna');
    setIsQuickAdjustModalOpen(true);
  };

  const handleApplyQuickAdjust = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedQuickItem) return;

    setInventory((prev) =>
      prev.map((item) => {
        if (item.id === selectedQuickItem.id) {
          const delta = quickAdjustType === 'add' ? quickAdjustQty : -quickAdjustQty;
          const newOnHand = Math.max(0, item.onHand + delta);
          const newAvailable = Math.max(0, newOnHand - item.reserved);
          return {
            ...item,
            onHand: newOnHand,
            available: newAvailable,
          };
        }
        return item;
      })
    );

    setToastMessage({
      type: 'success',
      text: `Korekta stanu magazynowego (${quickAdjustType === 'add' ? '+' : '-'}${quickAdjustQty} szt.) została zapisana.`,
    });
    setIsQuickAdjustModalOpen(false);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const activeReplenishItem = inventory.find((i) => i.id === selectedInventoryId) || inventory[0];

  return (
    <>
      {/* Toast Notification */}
      {toastMessage && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-xl border shadow-2xl backdrop-blur-md transition-all animate-in slide-in-from-top-4 ${
          toastMessage.type === 'success'
            ? 'bg-[#090909]/95 border-brand-gold/60 text-white shadow-[0_0_25px_rgba(212,175,55,0.25)]'
            : 'bg-[#150505]/95 border-red-500/60 text-red-300 shadow-[0_0_25px_rgba(239,68,68,0.25)]'
        }`}>
          {toastMessage.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-brand-gold flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
          )}
          <span className="text-sm font-medium">{toastMessage.text}</span>
          <button 
            onClick={() => setToastMessage(null)}
            className="ml-2 text-brand-beige/40 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <header className="mb-8 relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-serif text-white">Zarządzanie magazynem</h1>
            <span className="px-2.5 py-0.5 rounded bg-brand-gold/10 text-brand-gold border border-brand-gold/20 text-[10px] uppercase tracking-widest font-semibold">
              Medusa v2
            </span>
          </div>
          <p className="text-brand-beige/70 text-sm">
            Naskladnění zboží, kontrola partii CBD, rezerwacje koszyków i multi-lokalizacja (Praha / Brno).
          </p>
        </div>
        
        {/* Primary Action Button */}
        <div className="flex gap-3 w-full sm:w-auto">
          <button 
            onClick={() => handleOpenReplenishModal()}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-brand-gold text-brand-black px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_20px_rgba(212,175,55,0.35)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]"
          >
            <PackagePlus className="w-4 h-4 text-brand-black" />
            <span>Uzupełnij stan magazynu (PZ)</span>
          </button>
        </div>
      </header>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 relative z-10">
        <div className="bg-[#090909] border border-brand-gold/20 rounded-xl p-6 shadow-lg relative overflow-hidden group hover:border-brand-gold/40 transition-colors">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] uppercase tracking-widest text-brand-beige/60">Wartość magazynu</span>
            <span className="p-2 rounded-lg bg-brand-gold/10 text-brand-gold border border-brand-gold/20">
              <Box className="w-4 h-4" />
            </span>
          </div>
          <h3 className="text-2xl font-serif text-white">{totalStockValue.toLocaleString('cs-CZ')} Kč</h3>
          <p className="text-xs text-brand-beige/50 mt-1">Cena detaliczna zapasów</p>
        </div>

        <div className="bg-[#090909] border border-brand-gold/20 rounded-xl p-6 shadow-lg relative overflow-hidden group hover:border-brand-gold/40 transition-colors">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] uppercase tracking-widest text-brand-beige/60">Łącznie na stanie</span>
            <span className="p-2 rounded-lg bg-white/5 text-white border border-white/10">
              <Layers className="w-4 h-4" />
            </span>
          </div>
          <h3 className="text-2xl font-serif text-white">{totalStockOnHand} <span className="text-sm font-sans text-brand-beige/50 font-normal">szt.</span></h3>
          <p className="text-xs text-brand-beige/50 mt-1">Wszystkie warianty i lokalizacje</p>
        </div>

        <div className="bg-[#090909] border border-brand-gold/20 rounded-xl p-6 shadow-lg relative overflow-hidden group hover:border-brand-gold/40 transition-colors">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] uppercase tracking-widest text-brand-beige/60">Zarezerwowane</span>
            <span className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <History className="w-4 h-4" />
            </span>
          </div>
          <h3 className="text-2xl font-serif text-white">{totalReserved} <span className="text-sm font-sans text-brand-beige/50 font-normal">szt.</span></h3>
          <p className="text-xs text-brand-beige/50 mt-1">W toku realizacji zamówień</p>
        </div>

        <div className="bg-[#090909] border border-brand-gold/20 rounded-xl p-6 shadow-lg relative overflow-hidden group hover:border-brand-gold/40 transition-colors">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] uppercase tracking-widest text-brand-beige/60">Alerty magazynowe</span>
            <span className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <AlertTriangle className="w-4 h-4" />
            </span>
          </div>
          <h3 className="text-2xl font-serif text-white">
            <span className={lowStockCount > 0 ? 'text-amber-400' : 'text-white'}>{lowStockCount}</span>
            <span className="text-sm font-sans text-brand-beige/50 font-normal"> niski stan / </span>
            <span className={outOfStockCount > 0 ? 'text-red-400' : 'text-white'}>{outOfStockCount}</span>
            <span className="text-sm font-sans text-brand-beige/50 font-normal"> brak</span>
          </h3>
          <p className="text-xs text-brand-beige/50 mt-1">Wymagające pilnego naskladnění</p>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-[#090909] border border-brand-gold/20 rounded-t-xl p-4 flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center relative z-10">
        
        {/* Status Tabs */}
        <div className="flex space-x-1 overflow-x-auto pb-2 lg:pb-0 hide-scrollbar">
          {[
            { id: 'all', label: 'Wszystkie stany' },
            { id: 'in-stock', label: 'Dostępne (> min)' },
            { id: 'low-stock', label: `Niski stan (${lowStockCount})` },
            { id: 'out-of-stock', label: `Wyprzedane (${outOfStockCount})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-brand-gold/15 text-brand-gold border border-brand-gold/30'
                  : 'text-brand-beige/60 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Location selector & Search */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Location Filter */}
          <div className="relative min-w-[200px]">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gold" />
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full bg-[#040404] border border-brand-gold/20 text-white text-xs rounded-lg pl-9 pr-8 py-2.5 focus:outline-none focus:border-brand-gold appearance-none cursor-pointer"
            >
              <option value="all">Wszystkie lokalizacje</option>
              <option value="loc-prg">Centrální sklad Praha</option>
              <option value="loc-brn">Expediční sklad Brno</option>
            </select>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-beige/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Szukaj po SKU, nazwie..."
              className="w-full bg-[#040404] border border-brand-gold/20 text-white text-xs rounded-lg pl-9 pr-4 py-2.5 focus:outline-none focus:border-brand-gold transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-[#090909] border-x border-b border-brand-gold/20 rounded-b-xl shadow-lg relative z-10 overflow-hidden mb-12">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-brand-beige/80">
            <thead className="bg-[#040404] text-[10px] uppercase tracking-widest text-brand-beige/50 border-y border-brand-gold/10">
              <tr>
                <th className="px-6 py-4 font-medium">SKU / Produkt</th>
                <th className="px-6 py-4 font-medium">Lokalizacja</th>
                <th className="px-6 py-4 font-medium text-center">Fizycznie (On Hand)</th>
                <th className="px-6 py-4 font-medium text-center">Zarezerwowane</th>
                <th className="px-6 py-4 font-medium text-center">Dostępne do sprzedaży</th>
                <th className="px-6 py-4 font-medium">Status zapasu</th>
                <th className="px-6 py-4 font-medium text-center">Akcja naskladnění</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-gold/10">
              {filteredInventory.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-brand-beige/50 text-sm">
                    Brak pozycji magazynowych spełniających kryteria wyszukiwania.
                  </td>
                </tr>
              ) : (
                filteredInventory.map((item) => {
                  const isOutOfStock = item.onHand === 0;
                  const isLowStock = !isOutOfStock && item.onHand <= item.minThreshold;

                  return (
                    <tr key={item.id} className="hover:bg-white/5 transition-colors group">
                      
                      {/* Product & Variant */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="relative w-11 h-11 rounded-md overflow-hidden bg-black/40 border border-brand-gold/20 flex-shrink-0">
                            <Image src={item.image} alt={item.productName} fill className="object-cover" unoptimized />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-white font-medium font-serif leading-tight">{item.productName}</span>
                            <span className="text-xs text-brand-beige/60 mt-0.5">{item.variantTitle}</span>
                            <span className="text-[11px] font-mono text-brand-gold/70 mt-0.5">{item.sku}</span>
                          </div>
                        </div>
                      </td>

                      {/* Location */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-3.5 h-3.5 text-brand-gold/60" />
                          <span className="text-xs text-brand-beige/80">{item.locationName}</span>
                        </div>
                      </td>

                      {/* On Hand */}
                      <td className="px-6 py-4 text-center">
                        <span className="text-white font-medium text-sm">{item.onHand}</span>
                        <span className="text-[10px] text-brand-beige/40 ml-1">szt.</span>
                      </td>

                      {/* Reserved */}
                      <td className="px-6 py-4 text-center">
                        {item.reserved > 0 ? (
                          <span className="text-blue-400 font-medium text-xs bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full">
                            {item.reserved} szt.
                          </span>
                        ) : (
                          <span className="text-brand-beige/40 text-xs">0</span>
                        )}
                      </td>

                      {/* Available to Sell */}
                      <td className="px-6 py-4 text-center">
                        <span className={`font-semibold text-sm ${isOutOfStock ? 'text-red-400' : isLowStock ? 'text-amber-400' : 'text-emerald-400'}`}>
                          {item.available}
                        </span>
                        <span className="text-[10px] text-brand-beige/40 ml-1">szt.</span>
                      </td>

                      {/* Status Badge */}
                      <td className="px-6 py-4">
                        {isOutOfStock ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-500/10 text-red-400 border border-red-500/20 rounded-full text-xs font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                            Wyprzedany
                          </span>
                        ) : isLowStock ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full text-xs font-medium">
                            <AlertTriangle className="w-3 h-3 text-amber-400" />
                            Niski stan (min: {item.minThreshold})
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-medium">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            Optymalny
                          </span>
                        )}
                      </td>

                      {/* Action column: Dedicated Replenish Button + Quick adjust */}
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleOpenReplenishModal(item.id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-gold/15 text-brand-gold hover:bg-brand-gold hover:text-brand-black border border-brand-gold/30 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200"
                            title="Naskladnit zboží (PZ)"
                          >
                            <PackagePlus className="w-3.5 h-3.5" />
                            <span>Uzupełnij</span>
                          </button>

                          <div className="flex items-center gap-1 border-l border-brand-gold/15 pl-2">
                            <button
                              onClick={() => handleOpenQuickAdjust(item, 'add')}
                              className="p-1.5 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-md transition-colors"
                              title="Szybka korekta (+)"
                            >
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleOpenQuickAdjust(item, 'subtract')}
                              disabled={item.onHand === 0}
                              className="p-1.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 rounded-md transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                              title="Szybka korekta (-)"
                            >
                              <ArrowDownRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer summary */}
        <div className="p-4 border-t border-brand-gold/10 flex flex-col sm:flex-row justify-between items-center text-xs text-brand-beige/60 gap-3">
          <span>Wyświetlono {filteredInventory.length} z {inventory.length} pozycji magazynowych</span>
          <div className="flex items-center gap-4 text-[11px] text-brand-beige/50">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Optymalny stan
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span> Poniżej progu minimum
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-400"></span> Brak towaru
            </span>
          </div>
        </div>
      </div>

      {/* Inbound Movement Log / Dziennik dostaw i uzupełnień */}
      <div className="bg-[#090909] border border-brand-gold/20 rounded-xl p-6 shadow-xl relative z-10 mb-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 pb-4 border-b border-brand-gold/15">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-brand-gold/10 text-brand-gold border border-brand-gold/20">
              <ClipboardList className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-serif text-white">Historia uzupełnień magazynu (PZ)</h3>
              <p className="text-xs text-brand-beige/60 mt-0.5">Dziennik dostaw, numery partii CBD i dokumenty przyjęcia zewnętrznego</p>
            </div>
          </div>
          <span className="text-[11px] font-mono text-brand-gold/80 px-3 py-1 rounded bg-black/40 border border-brand-gold/20">
            Rejestr zgodności UE & Medusa v2
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-brand-beige/70">
            <thead className="bg-[#040404] text-[10px] uppercase tracking-widest text-brand-beige/50 border-y border-brand-gold/10">
              <tr>
                <th className="px-4 py-3 font-medium">Dokument PZ</th>
                <th className="px-4 py-3 font-medium">Data i czas</th>
                <th className="px-4 py-3 font-medium">Produkt / SKU</th>
                <th className="px-4 py-3 font-medium">Lokalizacja</th>
                <th className="px-4 py-3 font-medium">Numer partii (Šarže)</th>
                <th className="px-4 py-3 font-medium">Dostawca</th>
                <th className="px-4 py-3 font-medium text-right">Przyjęto</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-gold/10">
              {movements.map((log) => (
                <tr key={log.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 font-mono font-medium text-brand-gold">{log.documentNumber}</td>
                  <td className="px-4 py-3 text-brand-beige/60">{log.date}</td>
                  <td className="px-4 py-3 font-medium text-white">
                    {log.productName} <span className="font-mono text-brand-beige/40 text-[10px]">({log.sku})</span>
                  </td>
                  <td className="px-4 py-3 text-brand-beige/80">{log.locationName}</td>
                  <td className="px-4 py-3 font-mono text-brand-beige/90">{log.batchNumber}</td>
                  <td className="px-4 py-3 text-brand-beige/60">{log.supplier || '—'}</td>
                  <td className="px-4 py-3 text-right">
                    <span className="inline-flex items-center gap-1 font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                      +{log.quantity} szt.
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FULL REPLENISHMENT MODAL (PZ / Naskladnění) */}
      {isReplenishModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
          <div className="bg-[#090909] border border-brand-gold/40 rounded-2xl w-full max-w-2xl p-6 sm:p-8 shadow-[0_0_60px_rgba(0,0,0,0.95)] relative my-8">
            
            {/* Modal Header */}
            <div className="flex justify-between items-start mb-6 border-b border-brand-gold/20 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-brand-gold/15 text-brand-gold border border-brand-gold/30">
                  <PackagePlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-serif text-white">Uzupełnij stan magazynowy (PZ)</h3>
                  <p className="text-xs text-brand-beige/60 mt-0.5">
                    Przyjęcie zewnętrzne i aktualizacja zapasu w Medusa v2 Inventory Module
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsReplenishModalOpen(false)}
                className="text-brand-beige/50 hover:text-white transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Active Selected Item Preview */}
            <div className="flex items-center gap-4 bg-[#040404] p-4 rounded-xl border border-brand-gold/20 mb-6">
              <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-black/60 border border-brand-gold/25 flex-shrink-0">
                <Image src={activeReplenishItem.image} alt={activeReplenishItem.productName} fill className="object-cover" unoptimized />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-white font-serif truncate">{activeReplenishItem.productName}</h4>
                <p className="text-xs text-brand-beige/70">{activeReplenishItem.variantTitle} &bull; <span className="font-mono text-brand-gold">{activeReplenishItem.sku}</span></p>
                <p className="text-[11px] text-brand-beige/50 mt-1 flex items-center gap-1.5">
                  <Building2 className="w-3 h-3 text-brand-gold" /> {activeReplenishItem.locationName}
                </p>
              </div>
              <div className="text-right pl-3 border-l border-brand-gold/15">
                <span className="text-[9px] uppercase tracking-wider text-brand-beige/50 block">Aktualny stan</span>
                <span className="text-lg font-bold text-white">{activeReplenishItem.onHand} <span className="text-xs font-normal text-brand-beige/60">szt.</span></span>
                <span className="text-[10px] text-emerald-400 block">Dostępne: {activeReplenishItem.available} szt.</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleExecuteReplenish} className="space-y-5">
              
              {/* Product selector & Target Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-widest text-brand-gold block mb-1.5">
                    Produkt / Wariant docelowy
                  </label>
                  <select
                    name="inventoryItemId"
                    value={selectedInventoryId}
                    onChange={(e) => setSelectedInventoryId(e.target.value)}
                    className="w-full bg-[#040404] border border-brand-gold/20 text-white text-xs rounded-xl px-3.5 py-3 focus:outline-none focus:border-brand-gold appearance-none cursor-pointer"
                  >
                    {inventory.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.productName} ({item.variantTitle}) - {item.sku}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-widest text-brand-gold block mb-1.5">
                    Magazyn docelowy (Location)
                  </label>
                  <select
                    name="locationId"
                    defaultValue={activeReplenishItem.locationId}
                    className="w-full bg-[#040404] border border-brand-gold/20 text-white text-xs rounded-xl px-3.5 py-3 focus:outline-none focus:border-brand-gold appearance-none cursor-pointer"
                  >
                    <option value="loc-prg">Centrální sklad Praha (Hlavní)</option>
                    <option value="loc-brn">Expediční sklad Brno</option>
                  </select>
                </div>
              </div>

              {/* Quantity & Document Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-widest text-brand-gold block mb-1.5">
                    Ilość naskladňovaných sztuk *
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="quantity"
                      min="1"
                      max="100000"
                      value={replenishQty}
                      onChange={(e) => setReplenishQty(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full bg-[#040404] border border-brand-gold/30 rounded-xl px-4 py-3 text-white text-base font-bold focus:outline-none focus:border-brand-gold"
                      required
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-brand-beige/50">
                      sztuk (ks)
                    </span>
                  </div>
                  <span className="text-[11px] text-brand-beige/50 mt-1 block">
                    Nowy stan magazynu: <strong className="text-emerald-400">{activeReplenishItem.onHand + replenishQty} szt.</strong>
                  </span>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-widest text-brand-gold block mb-1.5">
                    Numer dokumentu przyjęcia (PZ / Faktura) *
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-beige/40" />
                    <input
                      type="text"
                      name="documentNumber"
                      value={docNumber}
                      onChange={(e) => setDocNumber(e.target.value)}
                      placeholder="np. PZ/2026/09/101"
                      className="w-full bg-[#040404] border border-brand-gold/20 rounded-xl pl-10 pr-4 py-3 text-white text-xs font-mono focus:outline-none focus:border-brand-gold"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Batch number & Expiry Date (CBD Compliance) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-widest text-brand-gold block mb-1.5">
                    Numer partii produkcyjnej (Šarže / Batch) *
                  </label>
                  <input
                    type="text"
                    name="batchNumber"
                    value={batchNum}
                    onChange={(e) => setBatchNum(e.target.value)}
                    placeholder="np. CBD-LOT-2026-X4"
                    className="w-full bg-[#040404] border border-brand-gold/20 rounded-xl px-4 py-3 text-white text-xs font-mono focus:outline-none focus:border-brand-gold"
                    required
                  />
                  <span className="text-[10px] text-brand-beige/40 mt-1 block">Wymóg certyfikacji olejków CBD w UE</span>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-widest text-brand-gold block mb-1.5">
                    Data ważności (Min. trvanlivost)
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-beige/40" />
                    <input
                      type="date"
                      name="expiryDate"
                      value={expDate}
                      onChange={(e) => setExpDate(e.target.value)}
                      className="w-full bg-[#040404] border border-brand-gold/20 rounded-xl pl-10 pr-4 py-2.5 text-white text-xs focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                </div>
              </div>

              {/* Supplier & Unit Cost */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-widest text-brand-gold block mb-1.5">
                    Dostawca / Laboratorium
                  </label>
                  <div className="relative">
                    <Truck className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-beige/40" />
                    <input
                      type="text"
                      name="supplier"
                      value={supplierName}
                      onChange={(e) => setSupplierName(e.target.value)}
                      placeholder="np. Swiss Organic Cannabinoids AG"
                      className="w-full bg-[#040404] border border-brand-gold/20 rounded-xl pl-10 pr-4 py-3 text-white text-xs focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-widest text-brand-gold block mb-1.5">
                    Koszt zakupu jednostkowego (Kč netto)
                  </label>
                  <input
                    type="number"
                    name="unitCost"
                    value={unitCostValue}
                    onChange={(e) => setUnitCostValue(parseFloat(e.target.value) || 0)}
                    placeholder="np. 450"
                    className="w-full bg-[#040404] border border-brand-gold/20 rounded-xl px-4 py-3 text-white text-xs font-mono focus:outline-none focus:border-brand-gold"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-widest text-brand-gold block mb-1.5">
                  Notatki do przyjęcia
                </label>
                <input
                  type="text"
                  name="notes"
                  value={notesValue}
                  onChange={(e) => setNotesValue(e.target.value)}
                  placeholder="np. Certyfikat analizy laboratoryjnej CoA dołączony do dostawy"
                  className="w-full bg-[#040404] border border-brand-gold/20 rounded-xl px-4 py-2.5 text-white text-xs focus:outline-none focus:border-brand-gold"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-brand-gold/20">
                <button
                  type="button"
                  onClick={() => setIsReplenishModalOpen(false)}
                  disabled={isPending}
                  className="flex-1 px-4 py-3 rounded-xl border border-white/10 text-brand-beige/70 hover:text-white hover:bg-white/5 text-xs font-semibold uppercase tracking-wider transition-colors disabled:opacity-50"
                >
                  Anuluj
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex-1 bg-brand-gold text-brand-black px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_25px_rgba(212,175,55,0.35)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isPending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-brand-black border-t-transparent rounded-full animate-spin"></div>
                      <span>Przetwarzanie PZ...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Zatwierdź i naskladni (+{replenishQty} ks)</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* QUICK ADJUST MODAL */}
      {isQuickAdjustModalOpen && selectedQuickItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#090909] border border-brand-gold/30 rounded-2xl w-full max-w-lg p-6 sm:p-8 shadow-[0_0_50px_rgba(0,0,0,0.9)] relative">
            
            <div className="flex justify-between items-center mb-6 border-b border-brand-gold/15 pb-4">
              <div>
                <h3 className="text-xl font-serif text-white">Szybka korekta inwentaryzacyjna</h3>
                <p className="text-xs text-brand-beige/60 mt-0.5">Medusa v2 Inventory Level Adjustment</p>
              </div>
              <button 
                onClick={() => setIsQuickAdjustModalOpen(false)} 
                className="text-brand-beige/50 hover:text-white transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleApplyQuickAdjust} className="space-y-5">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-widest text-brand-gold block mb-2">Typ operacji</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => { setQuickAdjustType('add'); setQuickAdjustReason('Dostawa towaru'); }}
                    className={`flex items-center justify-center gap-2 py-3 rounded-xl border text-xs font-semibold uppercase tracking-wider transition-all ${
                      quickAdjustType === 'add' ? 'bg-emerald-500/15 border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]' : 'border-white/10 text-brand-beige/60 hover:border-white/20'
                    }`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                    <span>Przyjęcie (+)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setQuickAdjustType('subtract'); setQuickAdjustReason('Korekta inwentaryzacyjna'); }}
                    className={`flex items-center justify-center gap-2 py-3 rounded-xl border text-xs font-semibold uppercase tracking-wider transition-all ${
                      quickAdjustType === 'subtract' ? 'bg-red-500/15 border-red-500 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.15)]' : 'border-white/10 text-brand-beige/60 hover:border-white/20'
                    }`}
                  >
                    <ArrowDownRight className="w-4 h-4" />
                    <span>Wydanie / Odpis (-)</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-widest text-brand-gold block mb-2">Ilość sztuk</label>
                <input
                  type="number"
                  min="1"
                  max={quickAdjustType === 'subtract' ? selectedQuickItem.onHand : 10000}
                  value={quickAdjustQty}
                  onChange={(e) => setQuickAdjustQty(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full bg-[#040404] border border-brand-gold/20 rounded-xl px-4 py-3 text-white text-base font-medium focus:outline-none focus:border-brand-gold"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-widest text-brand-gold block mb-2">Powód operacji magazynowej</label>
                <select
                  value={quickAdjustReason}
                  onChange={(e) => setQuickAdjustReason(e.target.value)}
                  className="w-full bg-[#040404] border border-brand-gold/20 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-brand-gold"
                >
                  {quickAdjustType === 'add' ? (
                    <>
                      <option value="Dostawa towaru">Dostawa towaru (PZ)</option>
                      <option value="Korekta inwentaryzacyjna (+)">Korekta inwentaryzacyjna (+)</option>
                      <option value="Zwrot klienta">Zwrot klienta</option>
                    </>
                  ) : (
                    <>
                      <option value="Korekta inwentaryzacyjna (-)">Korekta inwentaryzacyjna (-)</option>
                      <option value="Uszkodzenie towaru / Ubytek">Uszkodzenie towaru / Ubytek</option>
                      <option value="Przeterminowanie próbki">Przeterminowanie próbki</option>
                    </>
                  )}
                </select>
              </div>

              <div className="flex gap-3 pt-4 border-t border-brand-gold/15">
                <button
                  type="button"
                  onClick={() => setIsQuickAdjustModalOpen(false)}
                  className="flex-1 px-4 py-3 rounded-xl border border-white/10 text-brand-beige/70 hover:text-white hover:bg-white/5 text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  Anuluj
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-brand-gold text-brand-black px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                >
                  Zatwierdź korektę
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
