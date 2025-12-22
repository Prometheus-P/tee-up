# Contract: Theme Configuration

**Feature**: 004-design-system-integration
**Date**: 2025-12-21

## Overview

This contract defines the theme configuration API for both system-wide theming (light/dark) and per-pro portfolio customization.

---

## System Theme (Light/Dark)

### Provider Setup

**Location**: `web/src/lib/theme-provider.tsx`

```typescript
'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { ThemeProviderProps } from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}
```

### Usage in Layout

**Location**: `web/src/app/layout.tsx`

```typescript
import { ThemeProvider } from '@/lib/theme-provider'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### Theme Toggle Hook

**Location**: `web/src/hooks/useTheme.ts`

```typescript
'use client'

import { useTheme as useNextTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function useTheme() {
  const { theme, setTheme, resolvedTheme, systemTheme } = useNextTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return {
    theme,
    setTheme,
    resolvedTheme: mounted ? resolvedTheme : undefined,
    systemTheme: mounted ? systemTheme : undefined,
    mounted,
    isDark: mounted && resolvedTheme === 'dark',
    isLight: mounted && resolvedTheme === 'light',
    isSystem: theme === 'system',
    toggleTheme: () => {
      setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
    },
  }
}
```

### Theme Toggle Component

**Location**: `web/src/components/ui/ThemeToggle.tsx`

```typescript
'use client'

import { Moon, Sun, Monitor } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { Button } from '@/components/ui/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function ThemeToggle() {
  const { theme, setTheme, mounted } = useTheme()

  if (!mounted) {
    return <Button variant="ghost" size="icon" aria-label="Toggle theme" disabled />
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Toggle theme">
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          <Sun className="mr-2 h-4 w-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          <Moon className="mr-2 h-4 w-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          <Monitor className="mr-2 h-4 w-4" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

---

## Pro Portfolio Theme Configuration

### Database Schema

**Table**: `pro_profiles`
**Column**: `theme_config` (JSONB)

```typescript
interface ThemeConfig {
  accentColor: string       // Hex color, e.g., "#0A362B"
  logoUrl: string | null    // URL to uploaded logo
  fontPreset: 'default' | 'modern' | 'classic'
  darkModeEnabled: boolean  // Allow visitors to toggle dark mode
}
```

### Server Action

**Location**: `web/src/actions/theme.ts`

```typescript
'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { ActionResult } from './types'

export interface ThemeConfig {
  accentColor: string
  logoUrl: string | null
  fontPreset: 'default' | 'modern' | 'classic'
  darkModeEnabled: boolean
}

const DEFAULT_THEME: ThemeConfig = {
  accentColor: '#0A362B',
  logoUrl: null,
  fontPreset: 'default',
  darkModeEnabled: true,
}

export async function getProTheme(profileId: string): Promise<ActionResult<ThemeConfig>> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('pro_profiles')
    .select('theme_config')
    .eq('id', profileId)
    .single()

  if (error) return { success: false, error: error.message }

  return {
    success: true,
    data: { ...DEFAULT_THEME, ...data?.theme_config },
  }
}

export async function updateProTheme(
  profileId: string,
  updates: Partial<ThemeConfig>
): Promise<ActionResult<ThemeConfig>> {
  const supabase = await createClient()

  // Get current user
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: 'Not authenticated' }

  // Validate accent color if provided
  if (updates.accentColor && !isValidHexColor(updates.accentColor)) {
    return { success: false, error: 'Invalid accent color format' }
  }

  // Merge with existing config
  const current = await getProTheme(profileId)
  if (!current.success) return current

  const newConfig = { ...current.data, ...updates }

  const { error } = await supabase
    .from('pro_profiles')
    .update({ theme_config: newConfig })
    .eq('id', profileId)
    .eq('user_id', user.id) // RLS check

  if (error) return { success: false, error: error.message }

  revalidatePath(`/[slug]`, 'page')
  revalidatePath('/dashboard/settings')

  return { success: true, data: newConfig }
}

function isValidHexColor(color: string): boolean {
  return /^#[0-9A-Fa-f]{6}$/.test(color)
}
```

### Applying Theme to Portfolio

**Location**: `web/src/app/(portfolio)/[slug]/page.tsx`

```typescript
import { getPublicProfile } from '@/actions/profiles'
import { notFound } from 'next/navigation'

export default async function PortfolioPage({ params }: { params: { slug: string } }) {
  const result = await getPublicProfile(params.slug)
  if (!result.success) notFound()

  const { data: profile } = result
  const themeConfig = profile.theme_config || {}
  const accentColor = themeConfig.accentColor || '#0A362B'

  return (
    <div
      style={{
        '--tee-accent-primary': accentColor,
        '--tee-accent-primary-hover': darkenColor(accentColor, 10),
        '--tee-accent-primary-active': darkenColor(accentColor, 20),
      } as React.CSSProperties}
    >
      <PortfolioRenderer profile={profile} />
    </div>
  )
}

function darkenColor(hex: string, percent: number): string {
  // Implementation to darken hex color
  const num = parseInt(hex.slice(1), 16)
  const amt = Math.round(2.55 * percent)
  const R = Math.max((num >> 16) - amt, 0)
  const G = Math.max((num >> 8 & 0x00FF) - amt, 0)
  const B = Math.max((num & 0x0000FF) - amt, 0)
  return `#${(1 << 24 | R << 16 | G << 8 | B).toString(16).slice(1)}`
}
```

---

## Font Preset Configuration

### Available Presets

| Preset | Display Font | Body Font | CSS Classes |
|--------|--------------|-----------|-------------|
| `default` | Pretendard | Inter | `font-pretendard`, `font-inter` |
| `modern` | Geist Sans | Geist Sans | `font-geist` |
| `classic` | Noto Serif KR | Noto Sans KR | `font-noto-serif`, `font-noto-sans` |

### Font Loading

**Location**: `web/src/app/layout.tsx`

```typescript
import { Pretendard, Inter } from '@/lib/fonts'
// Additional fonts loaded conditionally based on theme

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ko"
      className={`${Pretendard.variable} ${Inter.variable}`}
      suppressHydrationWarning
    >
      {/* ... */}
    </html>
  )
}
```

### Applying Font Preset

```typescript
// In PortfolioRenderer
const fontClasses = {
  default: 'font-pretendard',
  modern: 'font-geist',
  classic: 'font-noto-serif',
}

<div className={fontClasses[themeConfig.fontPreset || 'default']}>
  {/* Portfolio content */}
</div>
```

---

## Validation Rules

### Accent Color Validation

```typescript
// Must pass WCAG AA contrast check against white
function validateAccentColor(color: string): boolean {
  const rgb = hexToRgb(color)
  if (!rgb) return false

  // Calculate contrast ratio against white
  const contrast = getContrastRatio(rgb, { r: 255, g: 255, b: 255 })
  return contrast >= 4.5 // WCAG AA requirement
}
```

### Logo Validation

```typescript
interface LogoValidation {
  maxSizeBytes: 5 * 1024 * 1024  // 5MB
  allowedTypes: ['image/png', 'image/jpeg', 'image/svg+xml', 'image/webp']
  maxDimensions: { width: 200, height: 200 }
}
```

---

## Error Handling

### Theme Load Failure

```typescript
// If theme config fails to load, use defaults
const themeConfig = profile.theme_config || DEFAULT_THEME

// Error boundary for theme-related rendering
<ErrorBoundary context="portfolio-theme" fallback={<DefaultThemeFallback />}>
  <ThemedPortfolio config={themeConfig} />
</ErrorBoundary>
```

### Invalid Color Fallback

```typescript
// If accent color is invalid or missing
const safeAccentColor = isValidHexColor(themeConfig.accentColor)
  ? themeConfig.accentColor
  : DEFAULT_THEME.accentColor
```
