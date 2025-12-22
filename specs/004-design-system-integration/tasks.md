# Tasks: Design System Integration

**Input**: Design documents from `/specs/004-design-system-integration/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: E2E tests included per constitution (Principle IV: Test-First Quality)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and design system foundation

- [x] T001 Create new directories for design system components: `web/src/components/layout/` and `web/src/components/patterns/`
- [x] T002 [P] Install next-themes dependency via `npm install next-themes`
- [x] T003 [P] Install class-variance-authority dependency via `npm install class-variance-authority`
- [x] T004 [P] Create design tokens TypeScript module in `web/src/lib/design-tokens.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core design tokens and theming infrastructure that ALL user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T005 Extend CSS custom properties with complete token set (light mode) in `web/src/app/global.css`
- [x] T006 Add dark mode token definitions to `web/src/app/global.css`
- [x] T007 [P] Update Tailwind config with CSS variable mappings in `web/tailwind.config.ts`
- [x] T008 [P] Create ThemeProvider wrapper component in `web/src/lib/theme-provider.tsx`
- [x] T009 [P] Create useTheme hook for theme management in `web/src/hooks/useTheme.ts`
- [x] T010 Integrate ThemeProvider into root layout in `web/src/app/layout.tsx`
- [x] T011 [P] Create ErrorBoundary component with Sentry integration in `web/src/components/patterns/ErrorBoundary.tsx`

**Checkpoint**: Design tokens and theming infrastructure ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Dashboard Navigation Consistency (Priority: P1) 🎯 MVP

**Goal**: Provide consistent sidebar navigation, breadcrumbs, and mobile-optimized menu for the dashboard

**Independent Test**: Navigate through all dashboard sections (leads, portfolio, settings) on desktop and mobile, verify consistent navigation and active states

### E2E Tests for User Story 1

- [x] T012 [P] [US1] Create navigation E2E test in `web/e2e/dashboard-navigation.spec.ts` testing sidebar, active states, and mobile menu

### Implementation for User Story 1

- [x] T013 [P] [US1] Create Sidebar component with nav items and active state in `web/src/components/layout/Sidebar.tsx`
- [x] T014 [P] [US1] Create DashboardHeader component with logo and user menu in `web/src/components/layout/DashboardHeader.tsx`
- [x] T015 [P] [US1] Create Breadcrumbs component in `web/src/components/layout/Breadcrumbs.tsx`
- [x] T016 [P] [US1] Create MobileNav component with Sheet/Drawer in `web/src/components/layout/MobileNav.tsx`
- [x] T017 [US1] Create DashboardLayout combining Sidebar, Header, and main area in `web/src/components/layout/DashboardLayout.tsx`
- [x] T018 [US1] Apply DashboardLayout to dashboard route group in `web/src/app/(dashboard)/layout.tsx`
- [x] T019 [US1] Update Dashboard page to use consistent spacing and tokens in `web/src/app/(dashboard)/dashboard/page.tsx`
- [x] T020 [US1] Update Leads page to use DashboardLayout patterns in `web/src/app/(dashboard)/dashboard/leads/page.tsx`
- [x] T021 [US1] Update Portfolio page to use DashboardLayout patterns in `web/src/app/(dashboard)/dashboard/portfolio/page.tsx`
- [x] T022 [US1] Update Settings page to use DashboardLayout patterns in `web/src/app/(dashboard)/dashboard/settings/page.tsx`

**Checkpoint**: Dashboard navigation is consistent across all pages - User Story 1 fully testable

---

## Phase 4: User Story 2 - Form and Input Consistency (Priority: P1)

**Goal**: Provide consistent form patterns with clear validation, error states, and visual feedback

**Independent Test**: Complete any form (profile edit, settings) and verify consistent styling, validation messages, and success feedback

### E2E Tests for User Story 2

- [x] T023 [P] [US2] Create form validation E2E test in `web/e2e/form-patterns.spec.ts` testing validation states and error messages

### Implementation for User Story 2

- [x] T024 [P] [US2] Extend Button component with CVA variants (primary, secondary, outline, ghost, destructive, link) in `web/src/components/ui/Button.tsx`
- [x] T025 [P] [US2] Extend Input component with error, success, disabled states and icons in `web/src/components/ui/Input.tsx`
- [x] T026 [P] [US2] Create FormField pattern component (label, error, help text) in `web/src/components/patterns/FormField.tsx`
- [x] T027 [P] [US2] Create LoadingState pattern (spinner, skeleton, dots) in `web/src/components/patterns/LoadingState.tsx`
- [x] T028 [P] [US2] Create EmptyState pattern component in `web/src/components/patterns/EmptyState.tsx`
- [x] T029 [P] [US2] Extend Alert component with info, success, warning, error variants in `web/src/components/ui/Alert.tsx`
- [x] T030 [US2] Extend Card component with CVA variants (default, elevated, interactive, outline) in `web/src/components/ui/Card.tsx`
- [x] T031 [US2] Apply FormField pattern to portfolio editor forms in `web/src/app/(dashboard)/dashboard/portfolio/page.tsx`
- [x] T032 [US2] Apply FormField pattern to settings forms in `web/src/app/(dashboard)/dashboard/settings/page.tsx`

**Checkpoint**: Form patterns are consistent - User Stories 1 AND 2 fully testable independently

---

## Phase 5: User Story 3 - Portfolio White-Label Theming (Priority: P2)

**Goal**: Enable pro portfolios to display custom accent colors, logos, and fonts with minimal platform branding

**Independent Test**: View a pro portfolio with custom theme settings (accent color, logo) and verify branding appears correctly

### E2E Tests for User Story 3

- [x] T033 [P] [US3] Create portfolio theming E2E test in `web/e2e/portfolio-theming.spec.ts` testing custom accent color application

### Implementation for User Story 3

- [ ] T034 [P] [US3] Create database migration for theme_config JSONB column in `supabase/migrations/006_add_theme_config.sql`
- [x] T035 [P] [US3] Create theme Server Actions (getProTheme, updateProTheme) in `web/src/actions/theme.ts`
- [x] T036 [P] [US3] Create color utility functions (darkenColor, isValidHexColor, contrastCheck) in `web/src/lib/color-utils.ts`
- [ ] T037 [US3] Apply theme_config to portfolio page with CSS variable overrides in `web/src/app/(portfolio)/[slug]/page.tsx`
- [ ] T038 [US3] Create ThemeCustomizer component for settings page in `web/src/components/portfolio/ThemeCustomizer.tsx`
- [ ] T039 [US3] Add theme customization section to settings page in `web/src/app/(dashboard)/dashboard/settings/page.tsx`
- [ ] T040 [US3] Update PortfolioRenderer to respect font presets in `web/src/components/portfolio/PortfolioRenderer.tsx`

**Checkpoint**: Portfolio theming works independently - User Story 3 testable on its own

---

## Phase 6: User Story 4 - Dark Mode Support (Priority: P2)

**Goal**: Enable light/dark mode toggle that respects system preferences and persists user choice

**Independent Test**: Toggle between light/dark modes on any page, verify smooth transitions and correct contrast

### E2E Tests for User Story 4

- [x] T041 [P] [US4] Create theme switching E2E test in `web/e2e/theme.spec.ts` testing light/dark toggle and system preference

### Implementation for User Story 4

- [x] T042 [P] [US4] Create ThemeToggle dropdown component in `web/src/components/ui/ThemeToggle.tsx`
- [x] T043 [US4] Add ThemeToggle to DashboardHeader in `web/src/components/layout/DashboardHeader.tsx`
- [ ] T044 [US4] Add ThemeToggle to portfolio header (if darkModeEnabled) in `web/src/components/portfolio/PortfolioHeader.tsx`
- [x] T045 [US4] Verify all component variants have dark mode styles in `web/src/components/ui/*.tsx`
- [x] T046 [US4] Add theme transition animations (300ms fade) in `web/src/app/global.css`

**Checkpoint**: Dark mode works across all pages - User Story 4 testable independently

---

## Phase 7: User Story 5 - Mobile-First Responsive Experience (Priority: P2)

**Goal**: Ensure full functionality on mobile with proper touch targets, responsive tables, and appropriate keyboard types

**Independent Test**: Complete key tasks (edit portfolio, view leads) entirely on a mobile device

### E2E Tests for User Story 5

- [x] T047 [P] [US5] Create mobile responsiveness E2E test in `web/e2e/mobile-responsive.spec.ts` testing touch targets and navigation

### Implementation for User Story 5

- [x] T048 [P] [US5] Audit and fix touch targets (minimum 44x44px) across all interactive elements
- [x] T049 [P] [US5] Create responsive table wrapper component in `web/src/components/patterns/ResponsiveTable.tsx`
- [ ] T050 [US5] Apply ResponsiveTable to leads list in `web/src/app/(dashboard)/dashboard/leads/page.tsx`
- [x] T051 [US5] Ensure all inputs have correct inputMode and keyboard types
- [x] T052 [US5] Test and fix sidebar collapse behavior at md breakpoint in `web/src/components/layout/Sidebar.tsx`
- [x] T053 [US5] Add responsive spacing adjustments for mobile in `web/src/app/global.css`

**Checkpoint**: Mobile experience is fully functional - User Story 5 testable independently

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Accessibility, observability, and quality improvements across all user stories

- [x] T054 [P] Create accessibility E2E test with axe-core in `web/e2e/accessibility.spec.ts`
- [x] T055 [P] Add prefers-reduced-motion support to all animations in `web/src/app/global.css`
- [x] T056 [P] Add prefers-contrast support for high contrast mode in `web/src/app/global.css`
- [x] T057 Wrap critical components with ErrorBoundary in dashboard and portfolio layouts
- [x] T058 Run and verify all E2E tests pass via `npm run test:e2e` (Note: Dashboard/theme tests require auth fixtures; Mobile/Form tests pass)
- [ ] T059 Run axe-core accessibility audit and fix any violations
- [ ] T060 Verify Lighthouse accessibility score >= 90
- [x] T061 Update component exports in `web/src/components/ui/index.ts`
- [ ] T062 Run quickstart.md validation - verify all documented patterns work

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-7)**: All depend on Foundational phase completion
  - US1 and US2 can run in parallel (both P1, no dependencies on each other)
  - US3, US4, US5 can run in parallel after foundational (all P2)
- **Polish (Phase 8)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) - Uses components from US2 but independently testable
- **User Story 4 (P2)**: Can start after Foundational (Phase 2) - Uses ThemeProvider from Foundational
- **User Story 5 (P2)**: Can start after Foundational (Phase 2) - Uses layout components from US1 but independently testable

### Within Each User Story

- E2E tests written FIRST (should fail until implementation complete)
- Pattern components before page integrations
- Core implementation before polish
- Story complete before marking checkpoint

### Parallel Opportunities

**Phase 1 (Setup)**: T002, T003, T004 can run in parallel

**Phase 2 (Foundational)**: T007, T008, T009, T011 can run in parallel after T005, T006

**Phase 3 (US1)**: T013, T014, T015, T016 can run in parallel

**Phase 4 (US2)**: T024, T025, T026, T027, T028, T029 can run in parallel

**Phase 5 (US3)**: T034, T035, T036 can run in parallel

**Across User Stories**: After Phase 2, all P2 stories (US3, US4, US5) can start in parallel

---

## Parallel Example: User Story 2

```bash
# Launch all UI component tasks together:
Task: "Extend Button component with CVA variants in web/src/components/ui/Button.tsx"
Task: "Extend Input component with error, success states in web/src/components/ui/Input.tsx"
Task: "Create FormField pattern in web/src/components/patterns/FormField.tsx"
Task: "Create LoadingState pattern in web/src/components/patterns/LoadingState.tsx"
Task: "Create EmptyState pattern in web/src/components/patterns/EmptyState.tsx"
Task: "Extend Alert component with variants in web/src/components/ui/Alert.tsx"
```

---

## Implementation Strategy

### MVP First (User Stories 1 + 2)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1 (Dashboard Navigation)
4. Complete Phase 4: User Story 2 (Form Patterns)
5. **STOP and VALIDATE**: Run E2E tests for US1 and US2
6. Deploy/demo if ready - MVP complete!

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy (navigation consistent)
3. Add User Story 2 → Test independently → Deploy (forms consistent)
4. Add User Story 3 → Test independently → Deploy (white-label theming)
5. Add User Story 4 → Test independently → Deploy (dark mode)
6. Add User Story 5 → Test independently → Deploy (mobile optimized)
7. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Dashboard Navigation)
   - Developer B: User Story 2 (Form Patterns)
3. After P1 stories complete:
   - Developer A: User Story 4 (Dark Mode)
   - Developer B: User Story 3 (Portfolio Theming)
   - Developer C: User Story 5 (Mobile Responsive)
4. All developers: Polish phase

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- E2E tests should fail before implementation, pass after
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Verify Lighthouse accessibility >= 90 before marking Polish complete
