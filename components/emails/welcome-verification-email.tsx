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

export interface WelcomeVerificationEmailProps {
  firstName: string;
  verificationUrl: string;
  membershipId?: string;
}

export const WelcomeVerificationEmail: React.FC<WelcomeVerificationEmailProps> = ({
  firstName = 'Vážený zákazníku',
  verificationUrl = 'https://cbd-master.cz/overeni-uctu?token=mock_token',
  membershipId = 'ML-9481',
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
      <Preview>Vítejte v exkluzivním světě CBD Master Level – aktivujte svůj účet</Preview>
      <Body style={commonStyles.main}>
        <Container style={commonStyles.container}>
          {/* Brand Header */}
          <Section style={commonStyles.headerSection}>
            <Text style={commonStyles.brandEmblem}>◆ BOTANICAL APOTHECARY ◆</Text>
            <Text style={commonStyles.brandTitle}>CBD MASTER</Text>
            <Text style={commonStyles.brandSubtitle}>LEVEL MASTER • SWISS EXTRACTION QUALITY</Text>
          </Section>

          <Hr style={commonStyles.ornamentalDivider} />

          {/* Member Card Badge */}
          <Section style={badgeContainer}>
            <Text style={commonStyles.badge}>ČLENSKÝ ÚČET: #{membershipId}</Text>
          </Section>

          {/* Main Content */}
          <Section style={commonStyles.contentSection}>
            <Heading style={commonStyles.h1Serif}>Vítejte v kruhu náročných</Heading>
            
            <Text style={greetingText}>
              Vážený kliente {firstName},
            </Text>

            <Text style={commonStyles.paragraph}>
              Děkujeme za projevenou důvěru a registraci do privátního klientského portálu CBD Master Level. 
              Vytvořili jsme značku pro ty, kteří odmítají kompromisy a požadují certifikovanou čistotu, 
              organický původ a maximální synergický účinek plnospektrálních kanabinoidů.
            </Text>

            {/* Privilege Highlights Card */}
            <Section style={privilegeBox}>
              <Text style={privilegeHeader}>Vaše výsady CBD Master Level:</Text>
              <Text style={privilegeItem}>
                <span style={goldBullet}>✦</span> <strong>Garantovaný švýcarský původ:</strong> Šetrná CO₂ extrakce s nulovým obsahem těžkých kovů a reziduí.
              </Text>
              <Text style={privilegeItem}>
                <span style={goldBullet}>✦</span> <strong>Laboratorní certifikáty (CoA):</strong> Neomezený přístup k detailní chromatografii každé vyrobené šarže.
              </Text>
              <Text style={privilegeItem}>
                <span style={goldBullet}>✦</span> <strong>Přednostní expedice & VIP concierge:</strong> Osobní asistence při výběru ideální koncentrace a terpenového profilu.
              </Text>
            </Section>

            <Text style={commonStyles.paragraph}>
              Pro plné zpřístupnění Vašeho účtu, historie objednávek a laboratorních certifikátů prosím 
              potvrďte svou e-mailovou adresu kliknutím na níže uvedené tlačítko:
            </Text>

            {/* CTA Button */}
            <Section style={commonStyles.goldButtonContainer}>
              <Button style={commonStyles.goldButton} href={verificationUrl}>
                Aktivovat účet CBD Master
              </Button>
            </Section>

            <Text style={securityNotice}>
              Bezpečnostní upozornění: Odkaz pro aktivaci vyprší za 24 hodin. Pokud jste registraci na našich stránkách 
              nezadali, považujte tento e-mail za bezpředmětný. Žádný zástupce CBD Master Vás nikdy nebude žádat o heslo.
            </Text>
          </Section>

          <Hr style={commonStyles.ornamentalDivider} />

          {/* Footer */}
          <Section style={commonStyles.footerSection}>
            <Text style={commonStyles.footerBrand}>CBD MASTER LEVEL</Text>
            <Text style={commonStyles.footerText}>
              Exkluzivní distribuce pro Českou republiku & Evropskou unii
            </Text>
            <Text style={commonStyles.footerText}>
              Laboratorní standard ISO 22716 & Švýcarská bio certifikace
            </Text>
            <Text style={contactSupport}>
              Dotazy & Concierge: <a href="mailto:info@cbd-master.cz" style={goldLink}>info@cbd-master.cz</a> • +420 800 223 627
            </Text>
            <Text style={copyrightText}>
              © {new Date().getFullYear()} CBD Master Level s.r.o. Všechna práva vyhrazena.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default WelcomeVerificationEmail;

const badgeContainer: React.CSSProperties = {
  textAlign: 'center',
  marginBottom: '8px',
};

const greetingText: React.CSSProperties = {
  color: emailTheme.colors.goldLight,
  fontFamily: emailTheme.fonts.serif,
  fontSize: '20px',
  fontStyle: 'italic',
  margin: '0 0 16px 0',
};

const privilegeBox: React.CSSProperties = {
  backgroundColor: emailTheme.colors.cardBg,
  border: `1px solid ${emailTheme.colors.cardBorder}`,
  borderRadius: '6px',
  padding: '20px 24px',
  margin: '24px 0',
};

const privilegeHeader: React.CSSProperties = {
  color: emailTheme.colors.goldLight,
  fontFamily: emailTheme.fonts.serif,
  fontSize: '18px',
  fontWeight: 600,
  letterSpacing: '0.05em',
  margin: '0 0 14px 0',
  textTransform: 'uppercase',
};

const privilegeItem: React.CSSProperties = {
  color: emailTheme.colors.textSecondary,
  fontFamily: emailTheme.fonts.sans,
  fontSize: '14px',
  lineHeight: '1.6',
  margin: '0 0 10px 0',
};

const goldBullet: React.CSSProperties = {
  color: emailTheme.colors.goldPrimary,
  marginRight: '6px',
};

const securityNotice: React.CSSProperties = {
  color: emailTheme.colors.textMuted,
  fontFamily: emailTheme.fonts.sans,
  fontSize: '12px',
  lineHeight: '1.6',
  marginTop: '24px',
  fontStyle: 'italic',
};

const contactSupport: React.CSSProperties = {
  color: emailTheme.colors.textMuted,
  fontFamily: emailTheme.fonts.sans,
  fontSize: '12px',
  margin: '12px 0 6px 0',
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
