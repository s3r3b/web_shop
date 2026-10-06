import * as React from 'react';
import {
  Body,
  Button,
  Column,
  Container,
  Font,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';
import { emailTheme, commonStyles } from './theme';

export interface OrderItem {
  id: string;
  title: string;
  variantTitle?: string;
  sku?: string;
  quantity: number;
  price: string;
}

export interface OrderConfirmationEmailProps {
  orderId: string;
  customerName: string;
  items: OrderItem[];
  subtotal: string;
  shipping: string;
  tax?: string;
  total: string;
  paymentMethod?: string;
  shippingAddress: {
    address: string;
    city: string;
    zip: string;
    country?: string;
  };
  trackingUrl?: string;
}

export const OrderConfirmationEmail: React.FC<OrderConfirmationEmailProps> = ({
  orderId = 'ML-2026-8942',
  customerName = 'Vážený zákazníku',
  items = [
    {
      id: '1',
      title: 'Full Spectrum CBD Olej 20% Swiss Bio',
      variantTitle: '10ml (2000mg CBD + Terpene Entourage) • Šarže #SW-2601',
      sku: 'CBD-FS-20-10ML',
      quantity: 1,
      price: '1 890 Kč',
    },
    {
      id: '2',
      title: 'Noční CBD + CBN Hluboký Spánek Elixír',
      variantTitle: '30ml (1500mg CBD + 500mg CBN + Melatonin)',
      sku: 'CBD-CBN-SLEEP-30ML',
      quantity: 1,
      price: '1 490 Kč',
    },
  ],
  subtotal = '3 380 Kč',
  shipping = '0 Kč (VIP Expresní Kurýr Zdarma)',
  tax = '586,61 Kč (DPH 21% v ceně)',
  total = '3 380 Kč',
  paymentMethod = 'Online platba kartou (Placeno)',
  shippingAddress = {
    address: 'Pařížská 127/20',
    city: 'Praha 1 - Staré Město',
    zip: '110 00',
    country: 'Česká republika',
  },
  trackingUrl = 'https://cbd-master.cz/objednavky/ML-2026-8942',
}) => {
  return (
    <Html lang="cs">
      <Head>
        <Font
          fontFamily="Cormorant Garamond"
          fallbackFontFamily="Georgia"
          webFont={{
            url: 'https://fonts.gstatic.com/s/cormorantgaramond/v16/co3bmX5slCNuHLi8bLeU9MK7whWMhyjQqlPauvY.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
        <Font
          fontFamily="Cormorant Garamond"
          fallbackFontFamily="Georgia"
          webFont={{
            url: 'https://fonts.gstatic.com/s/cormorantgaramond/v16/co3bmX5slCNuHLi8bLeU9MK7whWMhyjQqlPauvY.woff2',
            format: 'woff2',
          }}
          fontWeight={600}
          fontStyle="normal"
        />
        <Font
          fontFamily="Cormorant Garamond"
          fallbackFontFamily="Georgia"
          webFont={{
            url: 'https://fonts.gstatic.com/s/cormorantgaramond/v16/co3bmX5slCNuHLi8bLeU9MK7whWMhyjQqlPauvY.woff2',
            format: 'woff2',
          }}
          fontWeight={700}
          fontStyle="normal"
        />
      </Head>
      <Preview>Potvrzení objednávky #{orderId} – CBD Master Level Apothecary</Preview>
      <Body style={commonStyles.main}>
        <Container style={commonStyles.container}>
          {/* Brand Header */}
          <Section style={commonStyles.headerSection}>
            <Text style={commonStyles.brandEmblem}>◆ BOTANICAL APOTHECARY ◆</Text>
            <Text style={commonStyles.brandTitle}>CBD MASTER</Text>
            <Text style={commonStyles.brandSubtitle}>LEVEL MASTER • POTVRZENÍ OBJEDNÁVKY</Text>
          </Section>

          <Hr style={commonStyles.ornamentalDivider} />

          {/* Intro Section */}
          <Section style={commonStyles.contentSection}>
            <Heading style={commonStyles.h1Serif}>Děkujeme za Vaši objednávku</Heading>
            
            <Text style={orderGreeting}>
              Vážený kliente {customerName},
            </Text>

            <Text style={commonStyles.paragraph}>
              Vaše objednávka <strong style={goldHighlight}>#{orderId}</strong> byla úspěšně 
              autorizována a předána našemu laboratornímu týmu k přípravě a balení v certifikovaných 
              ochranných obalech zabraňujících UV degradaci bioaktivních kanabinoidů.
            </Text>

            {/* Order Status Ribbon */}
            <Section style={ribbonBox}>
              <Row>
                <Column style={{ width: '50%' }}>
                  <Text style={ribbonLabel}>ČÍSLO OBJEDNÁVKY</Text>
                  <Text style={ribbonValue}>#{orderId}</Text>
                </Column>
                <Column style={{ width: '50%', textAlign: 'right' }}>
                  <Text style={ribbonLabel}>STAV PLATBY</Text>
                  <Text style={ribbonStatusBadge}>{paymentMethod}</Text>
                </Column>
              </Row>
            </Section>
          </Section>

          {/* Items Section */}
          <Section style={tableWrapper}>
            <Text style={tableHeadingSerif}>Specifikace objednaných produktů</Text>
            
            {items.map((item, idx) => (
              <Section key={item.id || idx} style={itemContainer}>
                <Row>
                  <Column style={{ width: '70%', verticalAlign: 'top' }}>
                    <Text style={itemTitle}>{item.title}</Text>
                    {item.variantTitle && (
                      <Text style={itemSub}>{item.variantTitle}</Text>
                    )}
                    {item.sku && (
                      <Text style={itemSku}>KÓD: {item.sku}</Text>
                    )}
                    <Text style={itemQty}>Počet kusů: <strong>{item.quantity}×</strong></Text>
                  </Column>
                  <Column style={{ width: '30%', textAlign: 'right', verticalAlign: 'top' }}>
                    <Text style={itemPrice}>{item.price}</Text>
                  </Column>
                </Row>
              </Section>
            ))}
          </Section>

          <Hr style={commonStyles.ornamentalDivider} />

          {/* Pricing Breakdown */}
          <Section style={summaryWrapper}>
            <Row style={summaryRow}>
              <Column style={{ width: '60%' }}>
                <Text style={summaryLabel}>Mezisoučet produktů:</Text>
              </Column>
              <Column style={{ width: '40%', textAlign: 'right' }}>
                <Text style={summaryValue}>{subtotal}</Text>
              </Column>
            </Row>

            <Row style={summaryRow}>
              <Column style={{ width: '60%' }}>
                <Text style={summaryLabel}>Prémiové doručení (Termo-izolovaný obal):</Text>
              </Column>
              <Column style={{ width: '40%', textAlign: 'right' }}>
                <Text style={summaryValue}>{shipping}</Text>
              </Column>
            </Row>

            {tax && (
              <Row style={summaryRow}>
                <Column style={{ width: '60%' }}>
                  <Text style={summaryLabelMuted}>Daňový rozpis:</Text>
                </Column>
                <Column style={{ width: '40%', textAlign: 'right' }}>
                  <Text style={summaryValueMuted}>{tax}</Text>
                </Column>
              </Row>
            )}

            <Hr style={subtleDivider} />

            <Row style={totalRow}>
              <Column style={{ width: '50%' }}>
                <Text style={totalLabelSerif}>Celkem k úhradě:</Text>
                <Text style={totalVatNote}>Včetně DPH a certifikace původu</Text>
              </Column>
              <Column style={{ width: '50%', textAlign: 'right' }}>
                <Text style={totalAmountSerif}>{total}</Text>
              </Column>
            </Row>
          </Section>

          {/* Shipping & Delivery Address Card */}
          <Section style={deliveryCard}>
            <Text style={deliveryCardTitle}>Doručovací údaje & Adresa příjemce</Text>
            <Text style={deliveryCardLine}><strong>Příjemce:</strong> {customerName}</Text>
            <Text style={deliveryCardLine}><strong>Ulice a číslo:</strong> {shippingAddress.address}</Text>
            <Text style={deliveryCardLine}><strong>Město:</strong> {shippingAddress.zip} {shippingAddress.city}</Text>
            <Text style={deliveryCardLine}><strong>Země:</strong> {shippingAddress.country || 'Česká republika'}</Text>
          </Section>

          {/* Action Button */}
          <Section style={commonStyles.goldButtonContainer}>
            <Button style={commonStyles.goldButton} href={trackingUrl}>
              Zobrazit detail v klientském portálu
            </Button>
          </Section>

          {/* Quality Pledge Card */}
          <Section style={pledgeCard}>
            <Text style={pledgeTitle}>Garance nejvyšší čistoty CBD Master Level</Text>
            <Text style={pledgeText}>
              Každá lahvička je zapečetěna ochrannou plombou. Součástí Vaší zásilky je tištěný 
              certifikát analýzy (CoA) vystavený nezávislou akreditovanou švýcarskou laboratoří.
            </Text>
          </Section>

          <Hr style={commonStyles.ornamentalDivider} />

          {/* Footer */}
          <Section style={commonStyles.footerSection}>
            <Text style={commonStyles.footerBrand}>CBD MASTER LEVEL</Text>
            <Text style={commonStyles.footerText}>
              Oficiální prodejce certifikovaných botanických extraktů
            </Text>
            <Text style={commonStyles.footerText}>
              V případě dotazů kontaktujte náš Concierge servis: <a href="mailto:objednavky@cbd-master.cz" style={goldLink}>objednavky@cbd-master.cz</a>
            </Text>
            <Text style={copyrightText}>
              © {new Date().getFullYear()} CBD Master Level s.r.o. Praha, Česká republika.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default OrderConfirmationEmail;

const orderGreeting: React.CSSProperties = {
  color: emailTheme.colors.goldLight,
  fontFamily: emailTheme.fonts.serif,
  fontSize: '20px',
  fontStyle: 'italic',
  margin: '0 0 16px 0',
};

const goldHighlight: React.CSSProperties = {
  color: emailTheme.colors.goldPrimary,
};

const ribbonBox: React.CSSProperties = {
  backgroundColor: emailTheme.colors.cardBg,
  border: `1px solid ${emailTheme.colors.cardBorder}`,
  borderRadius: '6px',
  padding: '16px 20px',
  margin: '24px 0',
};

const ribbonLabel: React.CSSProperties = {
  color: emailTheme.colors.textMuted,
  fontFamily: emailTheme.fonts.sans,
  fontSize: '10px',
  letterSpacing: '0.2em',
  margin: '0 0 4px 0',
  textTransform: 'uppercase',
};

const ribbonValue: React.CSSProperties = {
  color: emailTheme.colors.goldLight,
  fontFamily: emailTheme.fonts.serif,
  fontSize: '18px',
  fontWeight: 600,
  letterSpacing: '0.05em',
  margin: 0,
};

const ribbonStatusBadge: React.CSSProperties = {
  color: '#86efac',
  fontFamily: emailTheme.fonts.sans,
  fontSize: '12px',
  fontWeight: 600,
  margin: 0,
};

const tableWrapper: React.CSSProperties = {
  margin: '28px 0',
};

const tableHeadingSerif: React.CSSProperties = {
  color: emailTheme.colors.goldLight,
  fontFamily: emailTheme.fonts.serif,
  fontSize: '22px',
  fontWeight: 500,
  letterSpacing: '0.04em',
  margin: '0 0 16px 0',
  borderBottom: `1px solid ${emailTheme.colors.cardBorder}`,
  paddingBottom: '8px',
};

const itemContainer: React.CSSProperties = {
  backgroundColor: emailTheme.colors.cardBg,
  border: `1px solid ${emailTheme.colors.cardBorder}`,
  borderRadius: '6px',
  padding: '16px 20px',
  marginBottom: '12px',
};

const itemTitle: React.CSSProperties = {
  color: emailTheme.colors.textPrimary,
  fontFamily: emailTheme.fonts.serif,
  fontSize: '18px',
  fontWeight: 600,
  letterSpacing: '0.02em',
  margin: '0 0 4px 0',
};

const itemSub: React.CSSProperties = {
  color: emailTheme.colors.textSecondary,
  fontFamily: emailTheme.fonts.sans,
  fontSize: '12px',
  lineHeight: '1.4',
  margin: '0 0 4px 0',
};

const itemSku: React.CSSProperties = {
  color: emailTheme.colors.textMuted,
  fontFamily: emailTheme.fonts.sans,
  fontSize: '10px',
  letterSpacing: '0.15em',
  margin: '0 0 4px 0',
};

const itemQty: React.CSSProperties = {
  color: emailTheme.colors.goldLight,
  fontFamily: emailTheme.fonts.sans,
  fontSize: '12px',
  margin: '6px 0 0 0',
};

const itemPrice: React.CSSProperties = {
  color: emailTheme.colors.goldLight,
  fontFamily: emailTheme.fonts.serif,
  fontSize: '20px',
  fontWeight: 600,
  letterSpacing: '0.03em',
  margin: 0,
};

const summaryWrapper: React.CSSProperties = {
  padding: '8px 4px',
};

const summaryRow: React.CSSProperties = {
  margin: '6px 0',
};

const summaryLabel: React.CSSProperties = {
  color: emailTheme.colors.textSecondary,
  fontFamily: emailTheme.fonts.sans,
  fontSize: '14px',
  margin: 0,
};

const summaryValue: React.CSSProperties = {
  color: emailTheme.colors.textPrimary,
  fontFamily: emailTheme.fonts.sans,
  fontSize: '14px',
  fontWeight: 500,
  margin: 0,
};

const summaryLabelMuted: React.CSSProperties = {
  color: emailTheme.colors.textMuted,
  fontFamily: emailTheme.fonts.sans,
  fontSize: '12px',
  margin: 0,
};

const summaryValueMuted: React.CSSProperties = {
  color: emailTheme.colors.textMuted,
  fontFamily: emailTheme.fonts.sans,
  fontSize: '12px',
  margin: 0,
};

const subtleDivider: React.CSSProperties = {
  borderColor: emailTheme.colors.dividerSubtle,
  margin: '16px 0',
};

const totalRow: React.CSSProperties = {
  margin: '12px 0 0 0',
};

const totalLabelSerif: React.CSSProperties = {
  color: emailTheme.colors.goldLight,
  fontFamily: emailTheme.fonts.serif,
  fontSize: '22px',
  fontWeight: 600,
  letterSpacing: '0.04em',
  margin: '0 0 2px 0',
};

const totalVatNote: React.CSSProperties = {
  color: emailTheme.colors.textMuted,
  fontFamily: emailTheme.fonts.sans,
  fontSize: '11px',
  margin: 0,
};

const totalAmountSerif: React.CSSProperties = {
  color: emailTheme.colors.goldPrimary,
  fontFamily: emailTheme.fonts.serif,
  fontSize: '28px',
  fontWeight: 700,
  letterSpacing: '0.05em',
  margin: 0,
};

const deliveryCard: React.CSSProperties = {
  backgroundColor: emailTheme.colors.cardBg,
  border: `1px solid ${emailTheme.colors.cardBorder}`,
  borderRadius: '6px',
  padding: '20px 24px',
  margin: '28px 0 16px 0',
};

const deliveryCardTitle: React.CSSProperties = {
  color: emailTheme.colors.goldLight,
  fontFamily: emailTheme.fonts.serif,
  fontSize: '18px',
  fontWeight: 600,
  letterSpacing: '0.04em',
  margin: '0 0 12px 0',
  textTransform: 'uppercase',
};

const deliveryCardLine: React.CSSProperties = {
  color: emailTheme.colors.textSecondary,
  fontFamily: emailTheme.fonts.sans,
  fontSize: '13px',
  lineHeight: '1.6',
  margin: '0 0 4px 0',
};

const pledgeCard: React.CSSProperties = {
  backgroundColor: 'rgba(212, 175, 55, 0.05)',
  borderLeft: `3px solid ${emailTheme.colors.goldPrimary}`,
  padding: '16px 20px',
  margin: '20px 0',
};

const pledgeTitle: React.CSSProperties = {
  color: emailTheme.colors.goldLight,
  fontFamily: emailTheme.fonts.serif,
  fontSize: '16px',
  fontWeight: 600,
  letterSpacing: '0.04em',
  margin: '0 0 6px 0',
};

const pledgeText: React.CSSProperties = {
  color: emailTheme.colors.textSecondary,
  fontFamily: emailTheme.fonts.sans,
  fontSize: '12px',
  lineHeight: '1.6',
  margin: 0,
};

const goldLink: React.CSSProperties = {
  color: emailTheme.colors.goldPrimary,
  textDecoration: 'none',
  fontWeight: 500,
};

const copyrightText: React.CSSProperties = {
  color: '#555e56',
  fontFamily: emailTheme.fonts.sans,
  fontSize: '11px',
  marginTop: '16px',
};
