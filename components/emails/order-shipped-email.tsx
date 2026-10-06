import * as React from 'react';
import {
  Body,
  Button,
  Container,
  Font,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import { emailTheme, commonStyles } from './theme';

export interface OrderShippedEmailProps {
  orderId: string;
  customerName: string;
  carrierName: string;
  trackingNumber: string;
  trackingUrl: string;
  estimatedDelivery?: string;
}

export const OrderShippedEmail: React.FC<OrderShippedEmailProps> = ({
  orderId = 'ML-2026-8942',
  customerName = 'Vážený zákazníku',
  carrierName = 'Zásilkovna / PPL Premium Express',
  trackingNumber = 'Z984120489CZ',
  trackingUrl = 'https://tracking.carrier.cz/track?id=Z984120489CZ',
  estimatedDelivery = 'Následující pracovní den (Dopoledne)',
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
      </Head>
      <Preview>Vaše zásilka #{orderId} byla předána dopravci – CBD Master Level</Preview>
      <Body style={commonStyles.main}>
        <Container style={commonStyles.container}>
          {/* Header Brand */}
          <Section style={commonStyles.headerSection}>
            <Text style={commonStyles.brandEmblem}>◆ BOTANICAL APOTHECARY ◆</Text>
            <Text style={commonStyles.brandTitle}>CBD MASTER</Text>
            <Text style={commonStyles.brandSubtitle}>LEVEL MASTER • OZNÁMENÍ O EXPEDICI</Text>
          </Section>

          <Hr style={commonStyles.ornamentalDivider} />

          {/* Main Content */}
          <Section style={commonStyles.contentSection}>
            <Heading style={commonStyles.h1Serif}>Vaše zásilka je na cestě</Heading>
            
            <Text style={greetingText}>
              Vážený kliente {customerName},
            </Text>

            <Text style={commonStyles.paragraph}>
              S potěšením Vám oznamujeme, že Vaše prémiová objednávka <strong style={goldHighlight}>#{orderId}</strong> byla 
              dnes kompletována, zapečetěna do ochranného termoboxu a předána našemu expresnímu kurýrovi.
            </Text>

            {/* Shipment Card */}
            <Section style={shipmentBox}>
              <Text style={shipmentHeading}>Přepravní informace</Text>
              <Text style={shipmentLine}>
                <strong>Vybraný dopravce:</strong> {carrierName}
              </Text>
              <Text style={shipmentLine}>
                <strong>Sledovací kód (Tracking No.):</strong> <span style={goldMono}>{trackingNumber}</span>
              </Text>
              <Text style={shipmentLine}>
                <strong>Očekávaný termín doručení:</strong> {estimatedDelivery}
              </Text>
            </Section>

            <Section style={commonStyles.goldButtonContainer}>
              <Button style={commonStyles.goldButton} href={trackingUrl}>
                Sledovat pohyb zásilky
              </Button>
            </Section>

            <Text style={commonStyles.paragraph}>
              Při převzetí zásilky doporučujeme zkontrolovat neporušenost naší bezpečnostní 
              holografické pásky CBD Master Level.
            </Text>
          </Section>

          <Hr style={commonStyles.ornamentalDivider} />

          {/* Footer */}
          <Section style={commonStyles.footerSection}>
            <Text style={commonStyles.footerBrand}>CBD MASTER LEVEL</Text>
            <Text style={commonStyles.footerText}>
              Asistence k zásilce: <a href="mailto:expedice@cbd-master.cz" style={goldLink}>expedice@cbd-master.cz</a>
            </Text>
            <Text style={copyrightText}>
              © {new Date().getFullYear()} CBD Master Level s.r.o. Švýcarská certifikace původu.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default OrderShippedEmail;

const greetingText: React.CSSProperties = {
  color: emailTheme.colors.goldLight,
  fontFamily: emailTheme.fonts.serif,
  fontSize: '20px',
  fontStyle: 'italic',
  margin: '0 0 16px 0',
};

const goldHighlight: React.CSSProperties = {
  color: emailTheme.colors.goldPrimary,
};

const goldMono: React.CSSProperties = {
  color: emailTheme.colors.goldPrimary,
  fontFamily: 'monospace',
  fontWeight: 600,
};

const shipmentBox: React.CSSProperties = {
  backgroundColor: emailTheme.colors.cardBg,
  border: `1px solid ${emailTheme.colors.cardBorder}`,
  borderRadius: '6px',
  padding: '22px 24px',
  margin: '24px 0',
};

const shipmentHeading: React.CSSProperties = {
  color: emailTheme.colors.goldLight,
  fontFamily: emailTheme.fonts.serif,
  fontSize: '18px',
  fontWeight: 600,
  letterSpacing: '0.05em',
  margin: '0 0 14px 0',
  textTransform: 'uppercase',
};

const shipmentLine: React.CSSProperties = {
  color: emailTheme.colors.textSecondary,
  fontFamily: emailTheme.fonts.sans,
  fontSize: '14px',
  lineHeight: '1.6',
  margin: '0 0 8px 0',
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
