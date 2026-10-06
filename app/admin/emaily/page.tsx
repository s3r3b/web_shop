import { Metadata } from 'next';
import EmailPreviewClient from './EmailPreviewClient';

export const metadata: Metadata = {
  title: 'Knihovna šablon e-mailů | CBD Master Admin',
  description: 'Správa a živý náhled transakčních e-mailů CBD Master Level ve stylu Cormorant Garamond.',
};

export default function AdminEmailsPage() {
  return <EmailPreviewClient />;
}
