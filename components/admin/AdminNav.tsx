'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Users, 
  Package, 
  Settings, 
  Ticket, 
  Box,
  Mail,
} from 'lucide-react';

const NAV_ITEMS = [
  { href: '/admin', label: 'Pulpit', icon: LayoutDashboard, exact: true },
  { href: '/admin/zamowienia', label: 'Zamówienia', icon: ShoppingCart },
  { href: '/admin/produkty', label: 'Produkty', icon: Package },
  { href: '/admin/magazyn', label: 'Magazyn', icon: Box },
  { href: '/admin/emaily', label: 'Szablony e-mail', icon: Mail },
  { href: '/admin/klienci', label: 'Klienci', icon: Users },
  { href: '#', label: 'Rabaty', icon: Ticket, disabled: true },
  { href: '#', label: 'Ustawienia', icon: Settings, disabled: true },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex-1 p-4 space-y-1.5">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = item.exact 
          ? pathname === item.href 
          : item.href !== '#' && pathname?.startsWith(item.href);

        if (item.disabled) {
          return (
            <div
              key={item.label}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-brand-beige/30 cursor-not-allowed select-none"
            >
              <Icon strokeWidth={1.5} className="w-5 h-5" />
              <span className="text-sm font-medium tracking-wide">{item.label}</span>
              <span className="ml-auto text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/5 text-brand-beige/40">
                Wkrótce
              </span>
            </div>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
              isActive
                ? 'bg-brand-gold/15 text-brand-gold border border-brand-gold/30 shadow-[0_0_15px_rgba(212,175,55,0.15)] font-semibold'
                : 'text-brand-beige/70 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Icon strokeWidth={isActive ? 2 : 1.5} className="w-5 h-5" />
            <span className="text-sm font-medium tracking-wide">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
