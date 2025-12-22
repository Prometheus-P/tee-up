# Implementation Plan: Design System Integration

**Branch**: `004-design-system-integration` | **Date**: 2025-12-21 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/004-design-system-integration/spec.md`

## Summary

Establish a unified design system for TEE:UP that combines:
- **Radix UI**: Headless, accessible component primitives (already via shadcn/ui)
- **Shopify Polaris UX patterns**: Admin dashboard workflows and merchant-style navigation
- **Vercel Geist aesthetics**: Minimalist visual language with "Calm Control" philosophy

The technical approach extends existing shadcn/ui components with standardized design tokens, consistent layout patterns, and theme customization support for pro portfolios.

## Technical Context

**Language/Version**: TypeScript 5.x, React 18.x
**Primary Dependencies**: Next.js 14 (App Router), shadcn/ui (Radix-based), Tailwind CSS 3.x
**Storage**: Supabase (PostgreSQL) for theme configurations per pro
**Testing**: Jest (unit), Playwright (E2E), axe-core (accessibility)
**Target Platform**: Web (responsive 320px-2560px), modern browsers (Chrome, Firefox, Safari, Edge - last 2 versions)
**Project Type**: Web application (monorepo with web/ directory)
**Performance Goals**: LCP < 2.5s, theme transitions < 100ms, animations < 300ms
**Constraints**: WCAG 2.1 AA compliance, 44x44px touch targets, prefers-reduced-motion support
**Scale/Scope**: ~35 screens across dashboard, portfolio, admin areas

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Pre-Design Validation

| Principle | Status | Notes |
|-----------|--------|-------|
| **I. Korean Luxury Minimalism** | ✅ PASS | 90/10 color rule maintained; accent colors #0A362B (green) and #B39A68 (gold) align with premium positioning. Note: Constitution specifies #2563EB (blue) but project uses forest green - requires amendment or explicit override justification. |
| **II. Trust & Transparency** | ✅ PASS | No dark patterns; clear error/loading states specified in FR-018 to FR-020 |
| **III. Mobile-First Accessibility** | ✅ PASS | Touch targets ≥44x44px, WCAG AA compliance, responsive design 320px-2560px, reduced motion support |
| **IV. Test-First Quality** | ✅ PASS | Playwright E2E + Jest unit + axe-core accessibility testing planned |
| **V. Incremental Delivery** | ✅ PASS | P1 stories (dashboard, forms) before P2 (theming, dark mode, mobile) |

### Color Amendment Required

The constitution specifies accent blue (#2563EB) but the project uses forest green (#0A362B) as established in `global.css` and `tailwind.config.ts`. This plan proceeds with the existing green accent, which should be formalized via constitution amendment.

**Justification**: Forest green (#0A362B) was established as the primary accent in the initial design system and is already in production. Changing to blue would require significant rework and deviate from the "golf course" branding association.

## Project Structure

### Documentation (this feature)

```text
specs/004-design-system-integration/
├── plan.md              # This file
├── spec.md              # Feature specification
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (component API documentation)
│   ├── design-tokens.md
│   ├── component-variants.md
│   └── theme-configuration.md
└── checklists/
    └── requirements.md  # Quality checklist
```

### Source Code (repository root)

```text
web/
├── src/
│   ├── app/
│   │   ├── (dashboard)/      # Pro dashboard pages
│   │   ├── (portfolio)/      # Public portfolio pages
│   │   ├── admin/            # Platform admin pages
│   │   └── global.css        # Design tokens (CSS custom properties)
│   ├── components/
│   │   ├── ui/               # shadcn/ui components (Button, Card, Input, etc.)
│   │   ├── layout/           # Layout components (Sidebar, Header, Breadcrumbs) [NEW]
│   │   ├── patterns/         # UI patterns (FormField, EmptyState, LoadingState) [NEW]
│   │   └── portfolio/        # Portfolio-specific components
│   ├── hooks/
│   │   └── useTheme.ts       # Theme management hook [NEW]
│   └── lib/
│       ├── design-tokens.ts  # Programmatic token access [NEW]
│       └── cn.ts             # Class name utility (existing)
├── tailwind.config.ts        # Tailwind design token configuration
└── e2e/
    ├── accessibility.spec.ts # axe-core accessibility tests
    └── theme.spec.ts         # Theme switching tests
```

**Structure Decision**: Extends existing web/ structure. New directories `components/layout/` and `components/patterns/` organize design system components separate from feature-specific components.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Color Amendment (green vs blue) | Existing production code uses green accent | Changing to blue would break existing UI and deviate from golf branding |

## Phase Dependencies

```text
Phase 0 (Research)
    ↓
Phase 1 (Design & Contracts)
    ├── data-model.md
    ├── contracts/
    └── quickstart.md
    ↓
Phase 2 (Tasks - via /speckit.tasks)
```

## Next Steps

1. Complete Phase 0: Generate `research.md` with best practices for design systems
2. Complete Phase 1: Generate `data-model.md`, `contracts/`, and `quickstart.md`
3. Run `/speckit.tasks` to generate implementation tasks
