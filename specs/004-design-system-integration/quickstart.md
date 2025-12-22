# Quickstart: Design System Integration

**Feature**: 004-design-system-integration
**Date**: 2025-12-21

## Overview

This guide helps developers get started with the TEE:UP design system. Follow these patterns to ensure consistency across all UI implementations.

---

## 1. Using Design Tokens

### Colors

Always use CSS custom properties via Tailwind utilities:

```tsx
// ✅ Correct: Use token-based colors
<div className="bg-tee-surface text-tee-ink-strong border-tee-stone">

// ❌ Wrong: Don't use hardcoded colors
<div className="bg-white text-gray-900 border-gray-200">
```

### Spacing

Use the defined spacing scale:

```tsx
// ✅ Correct: Use spacing tokens
<div className="p-space-4 mb-space-6 gap-space-2">

// ❌ Wrong: Don't use arbitrary values
<div className="p-[17px] mb-[25px] gap-[9px]">
```

### Typography

Use the typography scale with appropriate fonts:

```tsx
// ✅ Correct: Use typography tokens
<h1 className="text-h1 font-pretendard">Page Title</h1>
<p className="text-body font-inter text-tee-ink-light">Body text</p>

// ❌ Wrong: Don't use arbitrary sizes
<h1 className="text-[48px] font-sans">Page Title</h1>
```

---

## 2. Using Components

### Buttons

```tsx
import { Button } from '@/components/ui/Button'

// Primary action
<Button variant="primary">Save Changes</Button>

// Secondary action
<Button variant="secondary">Cancel</Button>

// Destructive action
<Button variant="destructive">Delete</Button>

// With loading state
<Button variant="primary" loading>Saving...</Button>

// With icon
<Button variant="primary" leftIcon={<PlusIcon />}>Add Lead</Button>
```

### Cards

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card'

<Card variant="default">
  <CardHeader>
    <CardTitle>Lead Information</CardTitle>
    <CardDescription>Contact details and status</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Your content */}
  </CardContent>
  <CardFooter>
    <Button variant="primary">Contact</Button>
  </CardFooter>
</Card>
```

### Form Fields

```tsx
import { FormField } from '@/components/patterns/FormField'
import { Input } from '@/components/ui/Input'

<FormField
  label="Email Address"
  htmlFor="email"
  required
  error={errors.email}
  helpText="We'll never share your email"
>
  <Input
    id="email"
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />
</FormField>
```

---

## 3. Layout Patterns

### Dashboard Layout

```tsx
// app/(dashboard)/layout.tsx
import { Sidebar } from '@/components/layout/Sidebar'
import { DashboardHeader } from '@/components/layout/DashboardHeader'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-space-6 bg-tee-background">
          {children}
        </main>
      </div>
    </div>
  )
}
```

### Page Structure

```tsx
// Dashboard page example
export default function LeadsPage() {
  return (
    <div className="space-y-space-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-h2 font-pretendard">Leads</h1>
        <Button variant="primary" leftIcon={<PlusIcon />}>
          Add Lead
        </Button>
      </div>

      {/* Content */}
      <Card>
        <CardContent>
          <LeadsTable />
        </CardContent>
      </Card>
    </div>
  )
}
```

---

## 4. State Patterns

### Loading States

```tsx
import { Skeleton } from '@/components/patterns/LoadingState'

// Card skeleton
<Card>
  <CardContent>
    <Skeleton className="h-4 w-3/4 mb-2" />
    <Skeleton className="h-4 w-1/2" />
  </CardContent>
</Card>

// Button loading
<Button variant="primary" loading>Processing...</Button>
```

### Empty States

```tsx
import { EmptyState } from '@/components/patterns/EmptyState'
import { InboxIcon } from 'lucide-react'

<EmptyState
  icon={InboxIcon}
  title="No leads yet"
  description="When clients contact you, their information will appear here."
  action={{
    label: "Share your portfolio",
    onClick: () => router.push('/dashboard/portfolio')
  }}
/>
```

### Error States

```tsx
import { Alert } from '@/components/ui/Alert'

<Alert variant="error" title="Failed to load leads" dismissible>
  Please try refreshing the page. If the problem persists, contact support.
</Alert>
```

---

## 5. Theme Handling

### Using the Theme Hook

```tsx
'use client'

import { useTheme } from '@/hooks/useTheme'

function MyComponent() {
  const { resolvedTheme, toggleTheme, mounted } = useTheme()

  if (!mounted) return null // Prevent hydration mismatch

  return (
    <button onClick={toggleTheme}>
      Current theme: {resolvedTheme}
    </button>
  )
}
```

### Theme-Aware Styling

The design tokens automatically adapt to light/dark mode. No additional classes needed:

```tsx
// This card automatically adapts to theme
<Card className="bg-tee-surface text-tee-ink-strong">
  Content adapts to theme automatically
</Card>
```

---

## 6. Accessibility Checklist

### Focus States

All interactive elements must have visible focus:

```tsx
// Already built into components, but for custom elements:
<button className="focus-visible:ring-2 focus-visible:ring-tee-accent-primary focus-visible:ring-offset-2">
  Custom Button
</button>
```

### Touch Targets

Minimum 44x44px for mobile:

```tsx
// Built into Button sizes, but verify for custom elements:
<a className="min-h-[44px] min-w-[44px] flex items-center justify-center">
  Tap Target
</a>
```

### Screen Reader Labels

```tsx
// Icon-only buttons need labels
<Button variant="ghost" size="icon" aria-label="Open settings">
  <SettingsIcon />
</Button>

// Form inputs need labels
<FormField label="Email" htmlFor="email">
  <Input id="email" />
</FormField>
```

---

## 7. Common Mistakes

### ❌ Don't Mix Token Systems

```tsx
// Wrong: Mixing Tailwind defaults with tokens
<div className="bg-white text-tee-ink-strong p-4 mb-space-6">

// Correct: Use tokens consistently
<div className="bg-tee-surface text-tee-ink-strong p-space-4 mb-space-6">
```

### ❌ Don't Skip Loading States

```tsx
// Wrong: No loading feedback
<Button onClick={handleSave}>Save</Button>

// Correct: Show loading state
<Button onClick={handleSave} loading={isLoading}>
  {isLoading ? 'Saving...' : 'Save'}
</Button>
```

### ❌ Don't Forget Mobile

```tsx
// Wrong: Fixed sidebar on mobile
<aside className="w-64">

// Correct: Responsive sidebar
<aside className="hidden lg:block w-64">
  {/* Desktop sidebar */}
</aside>
<Sheet>
  {/* Mobile drawer */}
</Sheet>
```

---

## 8. File Locations

| Purpose | Location |
|---------|----------|
| Design tokens (CSS) | `web/src/app/global.css` |
| Tailwind config | `web/tailwind.config.ts` |
| UI components | `web/src/components/ui/` |
| Layout components | `web/src/components/layout/` |
| UI patterns | `web/src/components/patterns/` |
| Theme hook | `web/src/hooks/useTheme.ts` |
| Token utilities | `web/src/lib/design-tokens.ts` |

---

## 9. Testing Components

### Visual Regression

```bash
# Run Playwright visual tests
npm run test:e2e -- --project=visual
```

### Accessibility

```bash
# Run axe-core tests
npm run test:e2e -- accessibility.spec.ts
```

### Theme Testing

```typescript
// e2e/theme.spec.ts
test('should toggle between light and dark mode', async ({ page }) => {
  await page.goto('/dashboard')

  // Check initial state
  await expect(page.locator('html')).not.toHaveAttribute('data-theme', 'dark')

  // Toggle theme
  await page.getByRole('button', { name: 'Toggle theme' }).click()
  await page.getByRole('menuitem', { name: 'Dark' }).click()

  // Verify theme changed
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
})
```

---

## Need Help?

- **Design tokens reference**: See `contracts/design-tokens.md`
- **Component API**: See `contracts/component-variants.md`
- **Theme configuration**: See `contracts/theme-configuration.md`
- **Research & decisions**: See `research.md`
