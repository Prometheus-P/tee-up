# Data Model: Design System Integration

**Feature**: 004-design-system-integration
**Date**: 2025-12-21

## Overview

This document defines the data structures for the design system, including design tokens, component variants, and theme configurations.

## Entities

### 1. Design Token

Design tokens are named values representing visual properties. They are stored as CSS custom properties in `global.css`.

**Storage**: CSS custom properties (client-side runtime)

**Token Categories**:

| Category | Example Token | Type | Description |
|----------|---------------|------|-------------|
| Color - Background | `--tee-background` | CSS Color | Page/section backgrounds |
| Color - Surface | `--tee-surface` | CSS Color | Card/component backgrounds |
| Color - Border | `--tee-stone` | CSS Color | Borders and dividers |
| Color - Text | `--tee-ink-strong` | CSS Color | Primary text color |
| Color - Text | `--tee-ink-light` | CSS Color | Secondary text color |
| Color - Text | `--tee-ink-muted` | CSS Color | Tertiary/placeholder text |
| Color - Accent | `--tee-accent-primary` | CSS Color | Primary brand accent |
| Color - Accent | `--tee-accent-secondary` | CSS Color | Secondary accent (gold) |
| Color - State | `--tee-error` | CSS Color | Error states |
| Color - State | `--tee-success` | CSS Color | Success states |
| Color - State | `--tee-warning` | CSS Color | Warning states |
| Color - State | `--tee-info` | CSS Color | Info states |
| Spacing | `space-1` to `space-32` | Tailwind utility | 4px-based spacing scale |
| Typography | `text-h1` to `text-caption` | Tailwind utility | Font size + line height |
| Shadow | `shadow-card` | Tailwind utility | Elevation shadows |
| Radius | `rounded-sm` to `rounded-full` | Tailwind utility | Border radius |

**Token Naming Convention**:
- Prefix: `tee-` for CSS custom properties
- Semantic names: `ink-strong` (not `text-dark`)
- State suffixes: `-hover`, `-active`, `-disabled`

**Dark Mode Tokens**:

| Light Token | Dark Value |
|-------------|------------|
| `--tee-background: #F7F4F0` | `#1A1A17` |
| `--tee-surface: #FFFFFF` | `#2A2A27` |
| `--tee-stone: #E8E8E5` | `#3A3A37` |
| `--tee-ink-strong: #1A1A1A` | `#FAFAF9` |
| `--tee-ink-light: #52524E` | `#A8A8A5` |
| `--tee-accent-primary: #0A362B` | `#4ABA9A` |

---

### 2. Component Variant

Component variants are predefined style variations using CVA (class-variance-authority).

**Storage**: TypeScript code in component files

**Variant Schema**:

```typescript
interface ComponentVariant {
  name: string           // e.g., "primary", "secondary", "outline"
  component: string      // e.g., "Button", "Card", "Input"
  tokens: {
    base: string[]       // Base classes always applied
    variant: string[]    // Variant-specific classes
    size?: string[]      // Size-specific classes (if applicable)
  }
  accessibility: {
    focusRing: boolean   // Has focus-visible ring
    ariaRole?: string    // ARIA role if needed
  }
}
```

**Button Variants**:

| Variant | Visual | Use Case |
|---------|--------|----------|
| `primary` | Solid accent color, white text | Primary CTA |
| `secondary` | White bg, accent border | Secondary actions |
| `outline` | Transparent bg, accent border | Tertiary actions |
| `ghost` | Transparent bg, no border | Navigation, subtle actions |
| `destructive` | Red bg, white text | Delete, destructive actions |
| `link` | No background, underline | Inline links |

**Card Variants**:

| Variant | Visual | Use Case |
|---------|--------|----------|
| `default` | Surface bg, stone border | Standard content cards |
| `elevated` | Surface bg, shadow | Featured content |
| `interactive` | Hover state, cursor pointer | Clickable cards |
| `outline` | Transparent bg, border only | Minimal emphasis |

**Input Variants**:

| Variant | State | Visual |
|---------|-------|--------|
| `default` | Normal | Stone border, surface bg |
| `error` | Invalid | Red border, red text |
| `success` | Valid | Green checkmark icon |
| `disabled` | Disabled | Muted bg, no interaction |

---

### 3. Theme Configuration

Theme configurations are user-customizable appearance settings stored per-pro.

**Storage**: Supabase `pro_profiles` table

**Database Schema Extension**:

```sql
-- Add to pro_profiles table
ALTER TABLE pro_profiles ADD COLUMN IF NOT EXISTS theme_config JSONB DEFAULT '{}';

-- Theme config structure
{
  "accentColor": "#0A362B",     -- Custom accent color (hex)
  "logoUrl": null,              -- Uploaded logo URL (optional)
  "fontPreset": "default",      -- Font selection: "default" | "modern" | "classic"
  "darkModeEnabled": true       -- Allow dark mode toggle
}
```

**Entity Fields**:

| Field | Type | Default | Validation |
|-------|------|---------|------------|
| `accentColor` | string (hex) | `#0A362B` | Valid hex color, WCAG AA contrast check |
| `logoUrl` | string (URL) | `null` | Valid URL or null, max 5MB image |
| `fontPreset` | enum | `default` | One of: `default`, `modern`, `classic` |
| `darkModeEnabled` | boolean | `true` | Allow visitors to toggle dark mode |

**Font Presets**:

| Preset | Display Font | Body Font | Use Case |
|--------|--------------|-----------|----------|
| `default` | Pretendard | Inter | Modern Korean luxury |
| `modern` | Geist Sans | Geist Sans | Tech-forward feel |
| `classic` | Noto Serif KR | Noto Sans KR | Traditional elegance |

**Validation Rules**:
- Accent color must pass WCAG AA contrast check against white (#FFFFFF)
- Logo must be valid image format (PNG, JPG, SVG, WebP)
- Logo max dimensions: 200x200px, max file size: 5MB

---

### 4. Layout Template

Layout templates define structural arrangements for different page types.

**Storage**: React components in `components/layout/`

**Template Types**:

| Template | Structure | Used By |
|----------|-----------|---------|
| `DashboardLayout` | Sidebar + Header + Main | Dashboard pages |
| `PortfolioLayout` | Full-width + Header | Portfolio pages |
| `AdminLayout` | Top nav + Sidebar + Main | Admin pages |
| `AuthLayout` | Centered card | Login, register |
| `MarketingLayout` | Header + Hero + Footer | Marketing pages |

**Responsive Breakpoints**:

| Breakpoint | Width | Layout Changes |
|------------|-------|----------------|
| `sm` | 640px | Stack mobile nav |
| `md` | 768px | Show collapsed sidebar |
| `lg` | 1024px | Full sidebar visible |
| `xl` | 1280px | Wider content area |
| `2xl` | 1536px | Max width container |

**Dashboard Layout Regions**:

```
┌──────────────────────────────────────────────────┐
│ Header (64px)                                    │
├─────────────┬────────────────────────────────────┤
│ Sidebar     │ Main Content                       │
│ (240px)     │ ┌────────────────────────────────┐ │
│             │ │ Page Header                    │ │
│ • Nav Item  │ ├────────────────────────────────┤ │
│ • Nav Item  │ │ Content Area                   │ │
│ • Nav Item  │ │ (scrollable)                   │ │
│ • Nav Item  │ │                                │ │
│             │ └────────────────────────────────┘ │
└─────────────┴────────────────────────────────────┘
```

---

## State Transitions

### Theme State Machine

```
┌─────────────────┐
│ system          │ ← Default (follows OS preference)
└────────┬────────┘
         │ user toggles
         ▼
┌─────────────────┐
│ light           │ ← Explicit light mode
└────────┬────────┘
         │ user toggles
         ▼
┌─────────────────┐
│ dark            │ ← Explicit dark mode
└────────┬────────┘
         │ user toggles (cycles back)
         ▼
     [light]
```

### Component Focus State

```
┌─────────────────┐
│ default         │ ← No interaction
└────────┬────────┘
         │ mouse enter
         ▼
┌─────────────────┐
│ hover           │ ← Mouse over
└────────┬────────┘
         │ mouse down
         ▼
┌─────────────────┐
│ active          │ ← Being pressed
└────────┬────────┘
         │ mouse up / keyboard focus
         ▼
┌─────────────────┐
│ focus-visible   │ ← Keyboard focused (ring visible)
└─────────────────┘
```

---

## Relationships

```
pro_profiles (1) ─────────────> (1) theme_config
     │                                   │
     │ has                               │ defines
     ▼                                   ▼
portfolio_page ◄────────────── accent_color
                               font_preset
                               logo_url
```

---

## Migration

No database migration required for existing `pro_profiles` table if `theme_config` JSONB column already exists. Otherwise:

```sql
-- Migration: Add theme_config column
ALTER TABLE pro_profiles
ADD COLUMN IF NOT EXISTS theme_config JSONB DEFAULT '{
  "accentColor": "#0A362B",
  "logoUrl": null,
  "fontPreset": "default",
  "darkModeEnabled": true
}'::jsonb;
```
