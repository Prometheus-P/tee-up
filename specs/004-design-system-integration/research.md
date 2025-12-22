# Research: Design System Integration

**Feature**: 004-design-system-integration
**Date**: 2025-12-21
**Status**: Complete

## 1. Design Token Architecture

**Decision**: Use semantic CSS custom properties with Tailwind CSS, organized in `global.css` as the single source of truth.

**Rationale**:
- Runtime theming via `.dark` or `[data-theme]` requires no rebuild
- Semantic naming (`bg-surface`, `text-subtle`) scales better than visual naming (`bg-blue-600`)
- Browser exposes tokens as CSS variables for third-party styles to access
- Already partially implemented in existing `global.css` and `tailwind.config.ts`

**Implementation Pattern**:
```css
/* Semantic Token Structure */
:root {
  /* Surfaces */
  --tee-surface: #FFFFFF;
  --tee-surface-subtle: #F7F4F0;

  /* Text/Ink */
  --tee-ink-strong: #1A1A1A;
  --tee-ink-light: #52524E;
  --tee-ink-muted: #8A8A87;

  /* Interactive */
  --tee-accent-primary: #0A362B;
  --tee-accent-secondary: #B39A68;

  /* Severity */
  --tee-error: #D32F2F;
  --tee-success: #388E3C;
}
```

**Alternatives Considered**:
- Tailwind 4 `@theme` directive (not yet stable for production)
- Design token generators like Style Dictionary (overkill for team size)
- CSS-in-JS tokens (conflicts with Tailwind approach)

---

## 2. shadcn/ui Extension Patterns

**Decision**: Use `class-variance-authority` (CVA) for variants, compose via Radix primitives, never fork base components.

**Rationale**:
- CVA provides type-safe, theme-aware styling aligned with shadcn/ui conventions
- Radix primitives have battle-tested WAI-ARIA compliance built-in
- Copying shadcn/ui components gives ownership without version conflicts
- Composition over inheritance prevents styling brittleness

**Extension Pattern**:
```typescript
// components/ui/custom-button.tsx
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:ring-2',
  {
    variants: {
      variant: {
        primary: 'bg-tee-accent-primary text-white hover:bg-tee-accent-primary-hover',
        secondary: 'bg-tee-surface border border-tee-stone hover:bg-tee-background',
        ghost: 'hover:bg-tee-background',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-10 px-4',
        lg: 'h-11 px-6',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)
```

**Accessibility Maintenance**:
- Always preserve `aria-*` attributes from Radix primitives
- Keyboard navigation (Tab, Arrow Keys, Enter/Space) comes built-in
- Test with VoiceOver (Mac), NVDA (Windows), axe DevTools

**Alternatives Considered**:
- Chakra UI (heavier, conflicts with minimalist design)
- Headless UI (fewer components, less Radix ecosystem support)
- Building from scratch (massive accessibility testing burden)

---

## 3. Shopify Polaris UX Patterns

**Decision**: Apply Polaris admin patterns to dashboard sections: IndexTable for lists, FormLayout for inputs, Navigation sidebar for hierarchy.

**Rationale**:
- Polaris is battle-tested for merchant/admin interfaces
- Patterns reduce decision fatigue and provide accessibility out-of-the-box
- Data table, form, and navigation patterns directly applicable to Pro Dashboard

**Key Patterns to Adopt**:

| Component | TEE:UP Use Case | Pattern |
|-----------|-----------------|---------|
| Data Table | Lead list, portfolio sections | Sortable columns, row selection, bulk actions, empty state |
| Form Layout | Settings, portfolio editor | Grouped fields, required indicators, inline validation |
| Navigation | Dashboard sidebar | Primary/secondary nav items, active state highlighting |
| Card | Metric display, section containers | Consistent padding (16px/24px), border-bottom dividers |
| Empty State | No leads, no portfolios | Icon + heading + CTA button |
| Pagination | Lead list pagination | Previous/Next buttons, page indicators |

**Dashboard Layout Structure**:
```
┌─────────────────────────────────────────┐
│ Header (Logo + User Menu)               │
├────────────────┬────────────────────────┤
│ Sidebar Nav    │ Main Content Area      │
│ • Dashboard    │ ┌──────────────────┐   │
│ • Leads        │ │ Page Header      │   │
│ • Portfolio    │ ├──────────────────┤   │
│ • Settings     │ │ Content          │   │
│                │ │ (Cards/Tables)   │   │
│                │ └──────────────────┘   │
└────────────────┴────────────────────────┘
```

**Form Patterns**:
- Required fields: Asterisk at label level
- Validation: Inline errors below field, success checkmark on valid
- Help text: Gray, small, below label or field
- Button placement: Primary action right-aligned at form bottom

**Alternatives Considered**:
- Generic admin templates (lack domain context)
- Building patterns from scratch (reinventing solved problems)

---

## 4. Vercel Geist Visual Language

**Decision**: Adopt Geist's 4px/8px spacing grid and typography scale for consistent minimalism.

**Rationale**:
- Geist follows Swiss design principles (precision, clarity, functionality)
- 4px base unit enables refined spacing without feeling cramped
- Typography scale with ample line-height pairs with "Calm Control" aesthetic
- Aligns with existing Pretendard (Korean) / Inter (English) font stack

**Spacing Scale (4px base)**:
```javascript
spacing: {
  0.5: '2px',    // Micro: icon padding, badges
  1: '4px',      // Tight: text leading
  2: '8px',      // Compact: input padding, small margins
  3: '12px',     // Normal: section spacing
  4: '16px',     // Standard: card padding, button padding
  6: '24px',     // Loose: component gaps
  8: '32px',     // Wide: section spacing
  12: '48px',    // Extra: hero section spacing
}
```

**Typography Hierarchy**:
```
Display:    Pretendard 48px/56px  (hero, page titles)
Heading 1:  Pretendard 36px/44px  (section titles)
Heading 2:  Pretendard 28px/36px  (subsection titles)
Heading 3:  Pretendard 20px/28px  (card titles)
Body:       Inter 16px/24px       (paragraph text)
Body Small: Inter 14px/20px       (secondary text)
Label:      Inter 12px/16px       (form labels, captions)
Mono:       JetBrains Mono 13px   (code, metrics)
```

**Key Geist Principles**:
1. Ample whitespace - let breathing room guide the eye
2. High contrast - WCAG AA standards (4.5:1 minimum)
3. Geometric precision - align to 4px grid
4. Functional color - 90% neutrals, 10% accent
5. Icon consistency - 24x24 or 16x16, matched line-height

**Alternatives Considered**:
- Material Design spacing (8px only, less refined)
- Bootstrap grid (too opinionated, not minimalist)

---

## 5. Theme Customization in Next.js

**Decision**: Use `next-themes` + CSS custom properties for runtime theme switching.

**Rationale**:
- `next-themes` is the de facto standard for Next.js theme management
- Prevents flash of wrong theme on page load
- Supports system preference detection + user override
- CSS variables enable theme changes without React re-renders

**Implementation**:
```typescript
// lib/theme-provider.tsx
'use client'

import { ThemeProvider } from 'next-themes'

export function ClientThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="system"
      enableSystem
    >
      {children}
    </ThemeProvider>
  )
}
```

**Custom Accent Color Support**:
```css
/* Portfolio-specific accent override via data attribute */
[data-accent="#C67C4E"] {
  --tee-accent-primary: #C67C4E;
}
```

**Storage Strategy**:
- Light/dark preference: `next-themes` handles localStorage
- Custom accent color: Stored in `pro_profiles.accent_color` (Supabase)
- Applied via Server Component that sets `data-accent` attribute

**Alternatives Considered**:
- Manual localStorage + Context (more code, flash issues)
- Styled-components theming (CSS-in-JS overhead)
- Tailwind config only (no runtime switching)

---

## 6. Client-Side Error Tracking

**Decision**: Layer Error Boundaries (granular) + Sentry SDK (comprehensive telemetry).

**Rationale**:
- Error Boundaries catch React render errors (prevents blank pages)
- Sentry captures unhandled exceptions, tracks frequency, provides session replays
- Strategic placement prevents cascading failures
- Critical for SaaS reliability - Pro portfolios must stay live

**Implementation**:
```typescript
// components/error-boundary.tsx
'use client'

import * as Sentry from '@sentry/nextjs'

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  context?: string // e.g., "portfolio-editor", "lead-form"
}

export function ErrorBoundary({ children, fallback, context = 'app' }: ErrorBoundaryProps) {
  return (
    <Sentry.ErrorBoundary
      fallback={fallback || <DefaultErrorFallback />}
      onError={(error) => {
        Sentry.captureException(error, { tags: { context } })
      }}
    >
      {children}
    </Sentry.ErrorBoundary>
  )
}
```

**Strategic Placement**:
- One boundary per major feature (dashboard nav, portfolio editor, lead list)
- Not per component (too granular, impacts performance)
- Server Actions use try-catch with ActionResult pattern

**Error Context to Capture**:
- Component name
- Viewport size
- Theme state (light/dark)
- User role (pro/golfer/admin)

**Alternatives Considered**:
- LogRocket (expensive for SaaS scale)
- Custom error logging (loses context, no aggregation)
- Just try-catch (no centralized monitoring)

---

## Summary

| Area | Decision | Key Benefit |
|------|----------|-------------|
| Tokens | Semantic CSS custom properties | Single source of truth, runtime switching |
| Components | CVA + Radix composition | Accessible, type-safe, updateable |
| Admin UX | Polaris patterns | Battle-tested for merchant interfaces |
| Visual | Geist 4px grid + typography | Minimalist precision |
| Theming | next-themes + CSS vars | No flash, system preference support |
| Errors | Error Boundaries + Sentry | Resilient rendering, production insights |

## Next Phase

Proceed to Phase 1 to generate:
- `data-model.md` - Design token and theme configuration entities
- `contracts/` - Component API documentation
- `quickstart.md` - Developer onboarding guide
