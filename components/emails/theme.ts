import * as React from 'react';

/**
 * CBD Master Level - Premium Email Design System & Tokens
 * Aesthetic: Dark Botanical Luxury, 24k Gold accents, Cormorant Garamond typography
 */
export const emailTheme = {
  colors: {
    background: '#070a08',
    containerBg: '#0f1411',
    cardBg: '#151c17',
    cardBorder: 'rgba(212, 175, 55, 0.22)',
    goldPrimary: '#d4af37',
    goldLight: '#f3e5ab',
    goldDark: '#997d25',
    goldMuted: 'rgba(212, 175, 55, 0.7)',
    textPrimary: '#ffffff',
    textSecondary: '#d8d3c5',
    textMuted: '#8e968f',
    divider: 'rgba(212, 175, 55, 0.25)',
    dividerSubtle: 'rgba(255, 255, 255, 0.08)',
    badgeBg: 'rgba(212, 175, 55, 0.12)',
    badgeBorder: 'rgba(212, 175, 55, 0.3)',
    badgeText: '#e8c96c',
  },
  fonts: {
    serif: '"Cormorant Garamond", Georgia, Cambria, "Times New Roman", serif',
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
};

export const commonStyles = {
  main: {
    backgroundColor: emailTheme.colors.background,
    fontFamily: emailTheme.fonts.sans,
    margin: 0,
    padding: '40px 10px',
  } as React.CSSProperties,

  container: {
    backgroundColor: emailTheme.colors.containerBg,
    border: '1px solid rgba(212, 175, 55, 0.35)',
    borderRadius: '8px',
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.85)',
    margin: '0 auto',
    maxWidth: '620px',
    padding: '44px 36px',
  } as React.CSSProperties,

  headerSection: {
    textAlign: 'center' as const,
    paddingBottom: '24px',
  } as React.CSSProperties,

  brandEmblem: {
    color: emailTheme.colors.goldPrimary,
    fontSize: '13px',
    letterSpacing: '0.45em',
    textTransform: 'uppercase' as const,
    margin: '0 0 6px 0',
    fontFamily: emailTheme.fonts.sans,
    fontWeight: 600,
  } as React.CSSProperties,

  brandTitle: {
    color: emailTheme.colors.goldLight,
    fontFamily: emailTheme.fonts.serif,
    fontSize: '36px',
    fontWeight: 500,
    letterSpacing: '0.14em',
    lineHeight: '1.1',
    margin: '0 0 8px 0',
    textTransform: 'uppercase' as const,
  } as React.CSSProperties,

  brandSubtitle: {
    color: emailTheme.colors.textMuted,
    fontFamily: emailTheme.fonts.sans,
    fontSize: '11px',
    letterSpacing: '0.3em',
    margin: 0,
    textTransform: 'uppercase' as const,
  } as React.CSSProperties,

  ornamentalDivider: {
    borderColor: emailTheme.colors.divider,
    margin: '28px 0',
  } as React.CSSProperties,

  contentSection: {
    padding: '10px 0',
  } as React.CSSProperties,

  h1Serif: {
    color: emailTheme.colors.textPrimary,
    fontFamily: emailTheme.fonts.serif,
    fontSize: '30px',
    fontWeight: 600,
    letterSpacing: '0.04em',
    lineHeight: '1.25',
    margin: '0 0 20px 0',
  } as React.CSSProperties,

  h2Serif: {
    color: emailTheme.colors.goldLight,
    fontFamily: emailTheme.fonts.serif,
    fontSize: '22px',
    fontWeight: 500,
    letterSpacing: '0.05em',
    margin: '0 0 16px 0',
  } as React.CSSProperties,

  paragraph: {
    color: emailTheme.colors.textSecondary,
    fontFamily: emailTheme.fonts.sans,
    fontSize: '15px',
    lineHeight: '1.75',
    margin: '0 0 16px 0',
    fontWeight: 300,
  } as React.CSSProperties,

  goldButton: {
    backgroundColor: emailTheme.colors.goldPrimary,
    border: '1px solid #f3e5ab',
    borderRadius: '4px',
    color: '#070a08',
    display: 'inline-block',
    fontFamily: emailTheme.fonts.serif,
    fontSize: '17px',
    fontWeight: 700,
    letterSpacing: '0.12em',
    padding: '16px 36px',
    textAlign: 'center' as const,
    textDecoration: 'none',
    textTransform: 'uppercase' as const,
  } as React.CSSProperties,

  goldButtonContainer: {
    textAlign: 'center' as const,
    margin: '36px 0 28px 0',
  } as React.CSSProperties,

  badge: {
    backgroundColor: emailTheme.colors.badgeBg,
    border: `1px solid ${emailTheme.colors.badgeBorder}`,
    borderRadius: '20px',
    color: emailTheme.colors.badgeText,
    display: 'inline-block',
    fontFamily: emailTheme.fonts.sans,
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '0.15em',
    padding: '4px 14px',
    textTransform: 'uppercase' as const,
    marginBottom: '16px',
  } as React.CSSProperties,

  footerSection: {
    paddingTop: '20px',
    textAlign: 'center' as const,
  } as React.CSSProperties,

  footerBrand: {
    color: emailTheme.colors.goldMuted,
    fontFamily: emailTheme.fonts.serif,
    fontSize: '18px',
    letterSpacing: '0.1em',
    margin: '0 0 6px 0',
  } as React.CSSProperties,

  footerText: {
    color: emailTheme.colors.textMuted,
    fontFamily: emailTheme.fonts.sans,
    fontSize: '12px',
    lineHeight: '1.6',
    margin: '0 0 6px 0',
  } as React.CSSProperties,
};
