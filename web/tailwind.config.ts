import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

const config: Config = {
  darkMode: 'selector',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // TEE:UP Design Tokens - Colors
        // Neutrals
        'tee-background': 'var(--color-tee-background)', // 아주 연한 웜 화이트
        'tee-surface': 'var(--color-tee-surface)',     // 순백
        'tee-ink-strong': 'var(--color-tee-ink-strong)', // 거의 블랙에 가까운 딥 네이비/차콜
        'tee-ink-light': 'var(--color-tee-ink-light)',   // on-surface-variant for subdued text

        // Accents
        'tee-accent-primary': 'var(--color-tee-accent-primary)', // TEE:UP 그린
        'tee-accent-secondary': 'var(--color-tee-accent-secondary)', // 골드/샴페인

        // States (derived from accent-primary for consistency)
        'tee-accent-primary-hover': 'var(--color-tee-accent-primary-hover)',
        'tee-accent-primary-active': 'var(--color-tee-accent-primary-active)',
        'tee-accent-primary-disabled': 'var(--color-tee-accent-primary-disabled)',

        // Functional / Semantic Colors (map existing to new token structure if possible, or define new)
        'functional-success': 'var(--color-functional-success)',
        'functional-warning': 'var(--color-functional-warning)',
        'functional-error': 'var(--color-functional-error)',
        'functional-info': 'var(--color-functional-info)',

        // Brand colors for specific external services (if needed, e.g., Kakao)
        'brand-kakao': 'var(--color-brand-kakao)',
        'brand-kakao-text': 'var(--color-brand-kakao-text)',
        'brand-kakao-hover': 'var(--color-brand-kakao-hover)',
      },
      fontFamily: {
        sans: ['Pretendard', '-apple-system', 'system-ui', 'sans-serif'],
        display: ['Pretendard', '-apple-system', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      fontSize: {
        'h1': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }], // 48px
        'h2': ['2.25rem', { lineHeight: '1.25', letterSpacing: '-0.015em' }], // 36px
        'h3': ['1.5rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }], // 24px
        'body': ['1rem', { lineHeight: '1.5', letterSpacing: 'normal' }], // 16px
        'caption': ['0.875rem', { lineHeight: '1.4', letterSpacing: '0.02em' }], // 14px
      },
      lineHeight: {
        'tight': '1.2',
        'snug': '1.25',
        'normal': '1.5',
        'relaxed': '1.75',
      },
      letterSpacing: {
        'tight': '-0.02em',
        'normal': 'normal',
        'wide': '0.02em',
        'wider': '0.04em',
      },
      spacing: {
        '0': '0',
        'px': '1px', // Keep pixel for fine adjustments
        '1': '0.25rem',  // 4px
        '2': '0.5rem',   // 8px
        '3': '0.75rem',  // 12px
        '4': '1rem',     // 16px
        '5': '1.25rem',  // 20px
        '6': '1.5rem',   // 24px
        '8': '2rem',     // 32px
        '10': '2.5rem',  // 40px
        '12': '3rem',    // 48px
        '16': '4rem',    // 64px
        '20': '5rem',    // 80px
        '24': '6rem',    // 96px
        '32': '8rem',    // 128px
        '40': '10rem',   // 160px
      },
      borderRadius: {
        'none': '0',
        'sm': '0.25rem', // 4px
        'md': '0.5rem',  // 8px
        'lg': '0.75rem', // 12px
        'xl': '1rem',    // 16px
        '2xl': '1.5rem', // 24px
        '3xl': '2rem',   // 32px
        'full': '9999px',
      },
      boxShadow: {
        'card': '0px 2px 8px rgba(0, 0, 0, 0.05)', // Very weak shadow for floating cards
      },
      transitionDuration: {
        '120': '0.12s', // 120ms for button transition
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '40px',
      },
      animation: {
        'fadeIn': 'fadeIn 0.3s ease-in-out',
        'slideUp': 'slideUp 0.4s ease-out',
        'scaleIn': 'scaleIn 0.3s ease-out',
        'shimmer': 'shimmer 2s infinite linear',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}

export default config
