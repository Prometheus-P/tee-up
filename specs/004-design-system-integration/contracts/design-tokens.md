# Contract: Design Tokens

**Feature**: 004-design-system-integration
**Date**: 2025-12-21

## Overview

This contract defines the design token API - the CSS custom properties and Tailwind utilities that form the visual foundation of TEE:UP.

## Token Files

| File | Purpose |
|------|---------|
| `web/src/app/global.css` | CSS custom properties (runtime) |
| `web/tailwind.config.ts` | Tailwind utility mappings (build-time) |
| `web/src/lib/design-tokens.ts` | Programmatic token access (TypeScript) |

---

## CSS Custom Properties API

### Color Tokens

```css
/* Location: web/src/app/global.css */

:root {
  /* Backgrounds */
  --tee-background: #F7F4F0;
  --tee-surface: #FFFFFF;

  /* Borders */
  --tee-stone: #E8E8E5;

  /* Text */
  --tee-ink-strong: #1A1A1A;
  --tee-ink-light: #52524E;
  --tee-ink-muted: #8A8A87;

  /* Accents */
  --tee-accent-primary: #0A362B;
  --tee-accent-primary-hover: #072A21;
  --tee-accent-primary-active: #051E18;
  --tee-accent-primary-disabled: #B4C6BF;
  --tee-accent-secondary: #B39A68;

  /* States */
  --tee-error: #D32F2F;
  --tee-success: #388E3C;
  --tee-warning: #FBC02D;
  --tee-info: #1976D2;

  /* Brand */
  --tee-kakao: #FEE500;
  --tee-kakao-text: #3C1E1E;
}

.dark, [data-theme="dark"] {
  --tee-background: #1A1A17;
  --tee-surface: #2A2A27;
  --tee-stone: #3A3A37;
  --tee-ink-strong: #FAFAF9;
  --tee-ink-light: #A8A8A5;
  --tee-ink-muted: #6A6A67;
  --tee-accent-primary: #4ABA9A;
  --tee-accent-primary-hover: #5FCBAB;
  --tee-accent-primary-active: #3AA98A;
  --tee-accent-primary-disabled: #2A4A42;
  --tee-accent-secondary: #D4B888;
  --tee-error: #EF5350;
  --tee-success: #66BB6A;
  --tee-warning: #FFCA28;
  --tee-info: #42A5F5;
}
```

---

## Tailwind Utility API

### Color Utilities

```typescript
// Location: web/tailwind.config.ts

colors: {
  // Map to CSS custom properties
  'tee-background': 'var(--tee-background)',
  'tee-surface': 'var(--tee-surface)',
  'tee-stone': 'var(--tee-stone)',
  'tee-ink-strong': 'var(--tee-ink-strong)',
  'tee-ink-light': 'var(--tee-ink-light)',
  'tee-ink-muted': 'var(--tee-ink-muted)',
  'tee-accent-primary': 'var(--tee-accent-primary)',
  'tee-accent-secondary': 'var(--tee-accent-secondary)',
  'tee-error': 'var(--tee-error)',
  'tee-success': 'var(--tee-success)',
  'tee-warning': 'var(--tee-warning)',
  'tee-info': 'var(--tee-info)',
}
```

**Usage**:
```tsx
<div className="bg-tee-surface text-tee-ink-strong border-tee-stone">
  Content
</div>
```

### Spacing Scale

```typescript
// Location: web/tailwind.config.ts

spacing: {
  'space-1': '0.25rem',   // 4px
  'space-2': '0.5rem',    // 8px
  'space-3': '0.75rem',   // 12px
  'space-4': '1rem',      // 16px
  'space-5': '1.25rem',   // 20px
  'space-6': '1.5rem',    // 24px
  'space-7': '1.75rem',   // 28px
  'space-8': '2rem',      // 32px
  'space-10': '2.5rem',   // 40px
  'space-12': '3rem',     // 48px
  'space-16': '4rem',     // 64px
  'space-20': '5rem',     // 80px
  'space-24': '6rem',     // 96px
  'space-32': '8rem',     // 128px
}
```

**Usage**:
```tsx
<div className="p-space-4 mb-space-6 gap-space-2">
  Content
</div>
```

### Typography Scale

```typescript
// Location: web/tailwind.config.ts

fontSize: {
  'h1': ['3rem', { lineHeight: '1.2' }],       // 48px
  'h2': ['2.25rem', { lineHeight: '1.25' }],   // 36px
  'h3': ['1.5rem', { lineHeight: '1.33' }],    // 24px
  'body': ['1rem', { lineHeight: '1.5' }],     // 16px
  'caption': ['0.875rem', { lineHeight: '1.4' }], // 14px
}

fontFamily: {
  pretendard: ['var(--font-pretendard)'],
  inter: ['var(--font-inter)'],
}
```

**Usage**:
```tsx
<h1 className="text-h1 font-pretendard">Page Title</h1>
<p className="text-body font-inter text-tee-ink-light">Body text</p>
```

---

## Programmatic Token Access

```typescript
// Location: web/src/lib/design-tokens.ts

export const tokens = {
  colors: {
    background: 'var(--tee-background)',
    surface: 'var(--tee-surface)',
    stone: 'var(--tee-stone)',
    inkStrong: 'var(--tee-ink-strong)',
    inkLight: 'var(--tee-ink-light)',
    inkMuted: 'var(--tee-ink-muted)',
    accentPrimary: 'var(--tee-accent-primary)',
    accentSecondary: 'var(--tee-accent-secondary)',
    error: 'var(--tee-error)',
    success: 'var(--tee-success)',
    warning: 'var(--tee-warning)',
    info: 'var(--tee-info)',
  },
  spacing: {
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    6: '1.5rem',
    8: '2rem',
    12: '3rem',
    16: '4rem',
  },
} as const

// Get computed token value at runtime
export function getTokenValue(token: string): string {
  if (typeof window === 'undefined') return ''
  return getComputedStyle(document.documentElement).getPropertyValue(token).trim()
}

// Example: getTokenValue('--tee-accent-primary') → "#0A362B"
```

---

## Usage Guidelines

### Do

```tsx
// ✅ Use semantic token names
<div className="bg-tee-surface text-tee-ink-strong">

// ✅ Use spacing scale
<div className="p-space-4 gap-space-2">

// ✅ Use typography scale
<h2 className="text-h2 font-pretendard">
```

### Don't

```tsx
// ❌ Don't use hardcoded colors
<div className="bg-white text-gray-900">

// ❌ Don't use arbitrary spacing
<div className="p-[17px] gap-[9px]">

// ❌ Don't use arbitrary font sizes
<h2 className="text-[35px]">
```

---

## Token Override (Portfolio Theming)

For pro portfolios with custom accent colors:

```tsx
// Server Component sets data attribute
export default async function PortfolioPage({ params }: { params: { slug: string } }) {
  const profile = await getPublicProfile(params.slug)
  const accentColor = profile.data?.theme_config?.accentColor || '#0A362B'

  return (
    <div data-accent={accentColor} style={{ '--tee-accent-primary': accentColor } as React.CSSProperties}>
      <PortfolioContent />
    </div>
  )
}
```
