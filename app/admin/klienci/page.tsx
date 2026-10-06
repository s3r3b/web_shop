import { Metadata } from 'next';
import CustomersClient from './CustomersClient';
import { fetchCustomers } from '@/lib/services/medusa-customers';

export const metadata: Metadata = {
  title: 'Správa zákazníků | CBD Master Admin',
  description: 'Správa zákazníků, věrnostní program, nákupní historie a B2B profily v Medusa v2.',
};

export const dynamic = 'force-dynamic';

export default async function AdminCustomersPage() {
  const initialCustomers = await fetchCustomers();

  return <CustomersClient initialCustomers={initialCustomers} />;
}
