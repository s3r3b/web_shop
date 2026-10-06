export interface Product {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  price: number;
  image: string;
  badge?: string;
  tags: string[];
  variants: string[];
}

export const products: Product[] = [
  {
    id: 'focus-10',
    name: 'FOCUS 10%',
    subtitle: 'DENNÍ VÝKON',
    description: 'Maximální koncentrace a jasná mysl. Navrženo pro podporu kognitivního výkonu během náročného pracovního dne.',
    price: 1190,
    image: '/images/cbd-focus.jpg',
    tags: ['Terpeny: Limonene (Super Lemon Haze)', '5% / 10% CBD'],
    variants: ['10ml (10% CBD) - 1 190 Kč', '10ml (5% CBD) - 890 Kč'],
  },
  {
    id: 'sleep-20',
    name: 'SLEEP 20% (CBD + CBN)',
    subtitle: 'NOČNÍ REGENERACE',
    description: 'Hluboká regenerace a zdravý spánek. Synergická noční receptura s kanabinolem (CBN) pro uvolnění centrálního nervového systému.',
    price: 1690,
    image: '/images/cbd-sleep.jpg',
    badge: 'NEJOBLÍBENĚJŠÍ FORMULE',
    tags: ['CBD + CBN + Myrcene', '10% / 20% CBD'],
    variants: ['10ml (20% CBD) - 1 690 Kč', '10ml (10% CBD) - 1 290 Kč'],
  },
  {
    id: 'nostress-25',
    name: 'NO STRESS 25%',
    subtitle: 'ABSOLUTNÍ KLID',
    description: 'Rovnováha a klid v náročných chvílích. Vysoce koncentrovaná síla pro okamžité uvolnění svalového napětí a psychického tlaku.',
    price: 2490,
    image: '/images/cbd-nostress.jpg',
    tags: ['Terpeny: Beta-Caryophyllene (Gelato)', '25% CBD FORTE'],
    variants: ['10ml (25% CBD) - 2 490 Kč'],
  }
];
