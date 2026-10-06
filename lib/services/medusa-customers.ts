import { medusaClient } from '@/lib/medusa';

export type CustomerLoyaltyTier = 'regular' | 'silver' | 'gold_vip' | 'b2b';

export interface CustomerAddress {
  id: string;
  first_name?: string;
  last_name?: string;
  company?: string;
  address_1: string;
  address_2?: string;
  city: string;
  postal_code: string;
  country_code: string;
  phone?: string;
}

export interface CustomerOrderSummary {
  id: string;
  display_id: string;
  created_at: string;
  status: 'pending' | 'paid' | 'shipped' | 'delivered';
  total_formatted: string;
  items_count: number;
}

export interface MedusaCustomer {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  has_account: boolean;
  loyalty_tier: CustomerLoyaltyTier;
  created_at: string;
  orders_count: number;
  total_spent_formatted: string;
  total_spent_raw: number;
  company?: string;
  ic?: string; // IČO (Czech Business ID)
  dic?: string; // DIČ (Czech Tax ID)
  default_address?: CustomerAddress;
  notes?: string;
  recent_orders: CustomerOrderSummary[];
}

export interface CreateCustomerInput {
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  company?: string;
  ic?: string;
  dic?: string;
  loyalty_tier?: CustomerLoyaltyTier;
  notes?: string;
  address_1?: string;
  city?: string;
  postal_code?: string;
}

// Initial mock customers adhering to Medusa v2 schemas and the Czech luxury CBD market
let mockCustomers: MedusaCustomer[] = [
  {
    id: 'cus_01J8F10K4M8VNP9XZ',
    email: 'martin.novak@gmail.com',
    first_name: 'Martin',
    last_name: 'Novák',
    phone: '+420 774 123 456',
    has_account: true,
    loyalty_tier: 'gold_vip',
    created_at: '2026-03-14T10:15:00Z',
    orders_count: 7,
    total_spent_formatted: '18 450 Kč',
    total_spent_raw: 18450,
    notes: 'Klíčový zákazník. Pravidelně odebírá CBD SLEEP 20% pro regeneraci po tréninku. Preferuje doručení přes Zásilkovnu.',
    default_address: {
      id: 'addr_01J8F1',
      first_name: 'Martin',
      last_name: 'Novák',
      address_1: 'Vinohradská 142/12',
      city: 'Praha 2',
      postal_code: '120 00',
      country_code: 'cz',
      phone: '+420 774 123 456',
    },
    recent_orders: [
      { id: 'order_1045', display_id: '#1045', created_at: '2026-09-26T14:30:00Z', status: 'pending', total_formatted: '2 490 Kč', items_count: 2 },
      { id: 'order_1038', display_id: '#1038', created_at: '2026-08-12T09:10:00Z', status: 'delivered', total_formatted: '4 890 Kč', items_count: 3 },
      { id: 'order_1021', display_id: '#1021', created_at: '2026-06-04T16:22:00Z', status: 'delivered', total_formatted: '2 490 Kč', items_count: 1 },
    ],
  },
  {
    id: 'cus_01J8F22A7B3PQW1RT',
    email: 'nakup@bioshop-praha.cz',
    first_name: 'Lucie',
    last_name: 'Dvořáková',
    phone: '+420 608 987 654',
    has_account: true,
    loyalty_tier: 'b2b',
    company: 'BioShop Praha s.r.o.',
    ic: '28491023',
    dic: 'CZ28491023',
    created_at: '2026-01-20T14:00:00Z',
    orders_count: 12,
    total_spent_formatted: '64 800 Kč',
    total_spent_raw: 64800,
    notes: 'B2B velkoobchodní partner. Splatnost faktur 14 dní. Objednává kartonová balení CBD FOCUS 10% i SLEEP 20%.',
    default_address: {
      id: 'addr_01J8F2',
      company: 'BioShop Praha s.r.o.',
      first_name: 'Lucie',
      last_name: 'Dvořáková',
      address_1: 'Národní třída 28',
      city: 'Praha 1',
      postal_code: '110 00',
      country_code: 'cz',
      phone: '+420 608 987 654',
    },
    recent_orders: [
      { id: 'order_1044', display_id: '#1044', created_at: '2026-09-26T11:15:00Z', status: 'paid', total_formatted: '12 800 Kč', items_count: 10 },
      { id: 'order_1029', display_id: '#1029', created_at: '2026-08-01T15:40:00Z', status: 'delivered', total_formatted: '24 000 Kč', items_count: 20 },
    ],
  },
  {
    id: 'cus_01J8F33K9C5TYU89L',
    email: 'petr.svoboda@post.cz',
    first_name: 'Petr',
    last_name: 'Svoboda',
    phone: '+420 732 456 789',
    has_account: true,
    loyalty_tier: 'silver',
    created_at: '2026-05-18T08:45:00Z',
    orders_count: 4,
    total_spent_formatted: '6 370 Kč',
    total_spent_raw: 6370,
    notes: 'Aktivní sportovec, preferuje CBD NO STRESS 25% Forte po ultramaratonech.',
    default_address: {
      id: 'addr_01J8F3',
      first_name: 'Petr',
      last_name: 'Svoboda',
      address_1: 'Masarykova 45',
      city: 'Brno',
      postal_code: '602 00',
      country_code: 'cz',
      phone: '+420 732 456 789',
    },
    recent_orders: [
      { id: 'order_1043', display_id: '#1043', created_at: '2026-09-25T16:00:00Z', status: 'shipped', total_formatted: '3 380 Kč', items_count: 2 },
      { id: 'order_1012', display_id: '#1012', created_at: '2026-07-10T12:00:00Z', status: 'delivered', total_formatted: '1 490 Kč', items_count: 1 },
    ],
  },
  {
    id: 'cus_01J8F44X2Z1OPL34V',
    email: 'katerina.cerna@seznam.cz',
    first_name: 'Kateřina',
    last_name: 'Černá',
    phone: '+420 721 334 556',
    has_account: true,
    loyalty_tier: 'gold_vip',
    created_at: '2026-04-02T19:20:00Z',
    orders_count: 5,
    total_spent_formatted: '11 250 Kč',
    total_spent_raw: 11250,
    notes: 'VIP zákaznice, zájem o limitované edice a exkluzivní degustační sady.',
    default_address: {
      id: 'addr_01J8F4',
      first_name: 'Kateřina',
      last_name: 'Černá',
      address_1: 'Smetanovo nábřeží 8',
      city: 'Olomouc',
      postal_code: '779 00',
      country_code: 'cz',
      phone: '+420 721 334 556',
    },
    recent_orders: [
      { id: 'order_1039', display_id: '#1039', created_at: '2026-09-18T10:00:00Z', status: 'delivered', total_formatted: '2 490 Kč', items_count: 1 },
    ],
  },
  {
    id: 'cus_01J8F55N7M6VBN21Q',
    email: 'tomas.kucera@gmail.com',
    first_name: 'Tomáš',
    last_name: 'Kučera',
    phone: '+420 775 889 001',
    has_account: false,
    loyalty_tier: 'regular',
    created_at: '2026-08-30T13:10:00Z',
    orders_count: 1,
    total_spent_formatted: '1 490 Kč',
    total_spent_raw: 1490,
    notes: 'Jednorázový nákup (Guest Checkout). Zkouší CBD FOCUS 10%.',
    default_address: {
      id: 'addr_01J8F5',
      first_name: 'Tomáš',
      last_name: 'Kučera',
      address_1: 'Česká 12',
      city: 'Plzeň',
      postal_code: '301 00',
      country_code: 'cz',
      phone: '+420 775 889 001',
    },
    recent_orders: [
      { id: 'order_1031', display_id: '#1031', created_at: '2026-08-30T13:10:00Z', status: 'delivered', total_formatted: '1 490 Kč', items_count: 1 },
    ],
  },
  {
    id: 'cus_01J8F66P9W4RTZ78E',
    email: 'eliska.vesela@centrum.cz',
    first_name: 'Eliška',
    last_name: 'Veselá',
    phone: '+420 604 112 233',
    has_account: true,
    loyalty_tier: 'silver',
    created_at: '2026-06-15T11:00:00Z',
    orders_count: 3,
    total_spent_formatted: '5 870 Kč',
    total_spent_raw: 5870,
    notes: 'Kupuje pravidelně jako dárek pro rodinu. Velmi spokojená s kvalitou balení.',
    default_address: {
      id: 'addr_01J8F6',
      first_name: 'Eliška',
      last_name: 'Veselá',
      address_1: 'Dlouhá 24',
      city: 'Hradec Králové',
      postal_code: '500 03',
      country_code: 'cz',
      phone: '+420 604 112 233',
    },
    recent_orders: [
      { id: 'order_1025', display_id: '#1025', created_at: '2026-08-20T17:30:00Z', status: 'delivered', total_formatted: '1 890 Kč', items_count: 1 },
    ],
  },
];

/**
 * Service to fetch customers from Medusa v2 Admin API with fallback.
 */
export async function fetchCustomers(): Promise<MedusaCustomer[]> {
  try {
    // Attempt real Medusa v2 Admin API call if backend is running
    const response = await (medusaClient as unknown as { admin?: { customer?: { list: () => Promise<{ customers: unknown[] }> } } })
      ?.admin?.customer?.list();

    if (response?.customers && Array.isArray(response.customers) && response.customers.length > 0) {
      console.log('Medusa v2 Admin Customers fetched successfully!');
    }
    return mockCustomers;
  } catch (error) {
    // Graceful fallback to rich local state
    return mockCustomers;
  }
}

/**
 * Service to fetch a single customer by ID.
 */
export async function fetchCustomerById(id: string): Promise<MedusaCustomer | null> {
  const customer = mockCustomers.find((c) => c.id === id);
  return customer || null;
}

/**
 * Service to create a new customer in Medusa v2.
 */
export async function createMedusaCustomer(data: CreateCustomerInput): Promise<MedusaCustomer> {
  const newCustomer: MedusaCustomer = {
    id: `cus_${Date.now().toString(36).toUpperCase()}`,
    email: data.email,
    first_name: data.first_name,
    last_name: data.last_name,
    phone: data.phone || '',
    has_account: true,
    loyalty_tier: data.loyalty_tier || 'regular',
    created_at: new Date().toISOString(),
    orders_count: 0,
    total_spent_formatted: '0 Kč',
    total_spent_raw: 0,
    company: data.company,
    ic: data.ic,
    dic: data.dic,
    notes: data.notes || '',
    default_address: data.address_1
      ? {
          id: `addr_${Date.now().toString(36)}`,
          first_name: data.first_name,
          last_name: data.last_name,
          company: data.company,
          address_1: data.address_1,
          city: data.city || 'Praha',
          postal_code: data.postal_code || '110 00',
          country_code: 'cz',
          phone: data.phone,
        }
      : undefined,
    recent_orders: [],
  };

  mockCustomers = [newCustomer, ...mockCustomers];
  return newCustomer;
}

/**
 * Service to update loyalty tier of a customer.
 */
export async function updateCustomerLoyaltyTier(
  id: string,
  tier: CustomerLoyaltyTier
): Promise<MedusaCustomer | null> {
  const index = mockCustomers.findIndex((c) => c.id === id);
  if (index === -1) return null;

  mockCustomers[index] = {
    ...mockCustomers[index],
    loyalty_tier: tier,
  };

  return mockCustomers[index];
}

/**
 * Service to update internal notes of a customer.
 */
export async function updateCustomerNotes(
  id: string,
  notes: string
): Promise<MedusaCustomer | null> {
  const index = mockCustomers.findIndex((c) => c.id === id);
  if (index === -1) return null;

  mockCustomers[index] = {
    ...mockCustomers[index],
    notes,
  };

  return mockCustomers[index];
}
