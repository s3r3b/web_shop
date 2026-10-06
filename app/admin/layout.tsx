import Link from 'next/link';
import { LogOut, Download } from 'lucide-react';
import AdminNav from '@/components/admin/AdminNav';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#040404] text-white flex flex-col md:flex-row">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-[#090909] border-r border-brand-gold/10 flex flex-col shrink-0">
        <div className="p-6 border-b border-brand-gold/10 flex items-center justify-between">
          <Link href="/" className="text-xl font-serif tracking-widest text-white hover:text-brand-gold transition-colors">
            CBD<span className="text-brand-gold">.</span> ADMIN
          </Link>
        </div>
        
        <AdminNav />

        <div className="p-4 border-t border-brand-gold/10 space-y-2">
          <a
            href="/api/export-project"
            download="cbd-master-project.zip"
            className="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-brand-gold bg-brand-gold/10 border border-brand-gold/20 hover:bg-brand-gold/20 transition-colors text-xs font-semibold"
          >
            <Download strokeWidth={1.5} className="w-4 h-4" />
            <span>Stáhnout projekt (ZIP)</span>
          </a>
          <Link href="/prihlaseni" className="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-brand-beige/70 hover:bg-red-500/10 hover:text-red-400 transition-colors text-sm font-medium">
            <LogOut strokeWidth={1.5} className="w-4 h-4" />
            <span>Wyloguj się</span>
          </Link>
        </div>
      </aside>

      {/* Main Admin Content */}
      <main className="flex-1 p-6 md:p-10 relative overflow-y-auto">
        {/* Ambient background for admin */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none"></div>
        
        {children}
      </main>
    </div>
  );
}
