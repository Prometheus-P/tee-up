# Contract: Component Variants

**Feature**: 004-design-system-integration
**Date**: 2025-12-21

## Overview

This contract defines the component variant API using `class-variance-authority` (CVA) for type-safe, theme-aware styling.

---

## Button Component

**Location**: `web/src/components/ui/Button.tsx`

### Variants

| Variant | Description | Use Case |
|---------|-------------|----------|
| `primary` | Solid accent background, white text | Primary CTAs |
| `secondary` | Surface background, accent border | Secondary actions |
| `outline` | Transparent, accent border | Tertiary actions |
| `ghost` | Transparent, no border | Navigation, subtle actions |
| `destructive` | Error background, white text | Delete actions |
| `link` | No background, underline on hover | Inline links |

### Sizes

| Size | Height | Padding | Font Size |
|------|--------|---------|-----------|
| `sm` | 36px | 12px horizontal | 14px |
| `md` | 40px | 16px horizontal | 14px |
| `lg` | 44px | 24px horizontal | 16px |
| `icon` | 40px | 10px | - |

### API

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link'
  size?: 'sm' | 'md' | 'lg' | 'icon'
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}
```

### Examples

```tsx
// Primary CTA
<Button variant="primary" size="md">Save Changes</Button>

// Secondary action
<Button variant="secondary">Cancel</Button>

// Destructive with icon
<Button variant="destructive" leftIcon={<TrashIcon />}>Delete</Button>

// Loading state
<Button variant="primary" loading>Saving...</Button>

// Icon-only button
<Button variant="ghost" size="icon" aria-label="Settings">
  <SettingsIcon />
</Button>
```

---

## Card Component

**Location**: `web/src/components/ui/Card.tsx`

### Variants

| Variant | Description | Use Case |
|---------|-------------|----------|
| `default` | Surface background, stone border | Standard content cards |
| `elevated` | Surface background, shadow | Featured content |
| `interactive` | Hover state, cursor pointer | Clickable cards |
| `outline` | Transparent, border only | Minimal emphasis |

### Subcomponents

| Component | Purpose |
|-----------|---------|
| `Card` | Container |
| `CardHeader` | Title and description area |
| `CardTitle` | Main heading |
| `CardDescription` | Secondary text |
| `CardContent` | Main content area |
| `CardFooter` | Action buttons area |

### API

```typescript
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'interactive' | 'outline'
}
```

### Examples

```tsx
// Standard card
<Card variant="default">
  <CardHeader>
    <CardTitle>Lead Details</CardTitle>
    <CardDescription>Contact information</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
  <CardFooter>
    <Button variant="primary">Contact</Button>
  </CardFooter>
</Card>

// Interactive card (clickable)
<Card variant="interactive" onClick={handleClick}>
  <CardContent>Click to view details</CardContent>
</Card>
```

---

## Input Component

**Location**: `web/src/components/ui/Input.tsx`

### States

| State | Description | Visual |
|-------|-------------|--------|
| `default` | Normal input | Stone border |
| `focus` | Keyboard focused | Accent ring |
| `error` | Validation failed | Error border + message |
| `success` | Validation passed | Green checkmark |
| `disabled` | Not interactive | Muted background |

### Sizes

| Size | Height | Font Size |
|------|--------|-----------|
| `sm` | 32px | 14px |
| `md` | 40px | 14px |
| `lg` | 48px | 16px |

### API

```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  size?: 'sm' | 'md' | 'lg'
  error?: string
  success?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}
```

### Examples

```tsx
// Standard input
<Input placeholder="Enter email" />

// With error
<Input
  type="email"
  value={email}
  error="Invalid email address"
/>

// With icon
<Input
  type="search"
  leftIcon={<SearchIcon />}
  placeholder="Search leads..."
/>
```

---

## FormField Pattern

**Location**: `web/src/components/patterns/FormField.tsx`

### API

```typescript
interface FormFieldProps {
  label: string
  htmlFor: string
  required?: boolean
  error?: string
  helpText?: string
  children: React.ReactNode
}
```

### Example

```tsx
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

### Rendered HTML

```html
<div class="flex flex-col gap-space-2">
  <label for="email" class="text-caption font-inter text-tee-ink-strong">
    Email Address
    <span class="text-tee-error ml-1">*</span>
  </label>
  <input id="email" type="email" class="..." />
  <p class="text-caption text-tee-error" role="alert">
    {error message}
  </p>
  <p class="text-caption text-tee-ink-muted">
    We'll never share your email
  </p>
</div>
```

---

## EmptyState Pattern

**Location**: `web/src/components/patterns/EmptyState.tsx`

### API

```typescript
interface EmptyStateProps {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
}
```

### Example

```tsx
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

---

## LoadingState Pattern

**Location**: `web/src/components/patterns/LoadingState.tsx`

### Variants

| Variant | Description | Use Case |
|---------|-------------|----------|
| `spinner` | Circular spinner | Button loading, small areas |
| `skeleton` | Animated placeholder | Card/content loading |
| `dots` | Pulsing dots | Chat/typing indicators |

### API

```typescript
interface LoadingStateProps {
  variant?: 'spinner' | 'skeleton' | 'dots'
  size?: 'sm' | 'md' | 'lg'
  label?: string // For accessibility
}

// Skeleton-specific
interface SkeletonProps {
  className?: string
  width?: string | number
  height?: string | number
}
```

### Examples

```tsx
// Spinner (in button)
<Button loading>Saving...</Button>

// Skeleton card
<Card>
  <CardContent>
    <Skeleton className="h-4 w-3/4 mb-2" />
    <Skeleton className="h-4 w-1/2" />
  </CardContent>
</Card>

// Full page loading
<LoadingState variant="spinner" size="lg" label="Loading dashboard..." />
```

---

## Alert Component

**Location**: `web/src/components/ui/Alert.tsx`

### Variants

| Variant | Description | Use Case |
|---------|-------------|----------|
| `info` | Blue accent | Information messages |
| `success` | Green accent | Success confirmations |
| `warning` | Yellow accent | Warnings |
| `error` | Red accent | Error messages |

### API

```typescript
interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'error'
  title?: string
  children: React.ReactNode
  dismissible?: boolean
  onDismiss?: () => void
}
```

### Example

```tsx
<Alert variant="success" title="Profile saved" dismissible>
  Your changes have been saved successfully.
</Alert>
```

---

## Accessibility Requirements

All components MUST:

1. **Focus States**: Visible `focus-visible` ring using accent color
2. **ARIA Labels**: Proper labeling for screen readers
3. **Keyboard Navigation**: Tab, Enter, Space, Escape support
4. **Color Contrast**: WCAG AA minimum (4.5:1 for text, 3:1 for UI)
5. **Touch Targets**: Minimum 44x44px on mobile

### Focus Ring Implementation

```css
/* All interactive elements */
.focus-visible:focus-visible {
  @apply outline-none ring-2 ring-tee-accent-primary ring-offset-2;
}
```
