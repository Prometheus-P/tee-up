# CONTEXT.md
## TEE:UP System Context & Source of Truth

> **Last Updated:** 2025-11-24
> **Version:** 1.0.0
> **Status:** Active
> **Owner:** Product Team

---

## 1. System Intent

### Vision
TEE:UP is a **premium golf lesson matching platform** that connects VIP golfers with verified professional golfers through a sophisticated, data-driven interface.

### Mission
Enable effortless discovery and booking of elite golf coaching by showcasing verified pros through:
- Magazine-style, visual-first profiles
- Trust-building verification badges and statistics
- Real-time chat for instant connection
- Transparent pricing and availability

### Core Value Proposition
**"Show, Don't Tell"** — No lengthy explanations. Only stunning pro profiles, verified credentials, and instant booking.

---

## 2. Guardrails

### Business Constraints
1. **Free Entry for Pros** — No upfront cost to register as a pro
2. **Off-Platform Payments** — Lesson fees paid directly (cash/transfer at location)
3. **Lead-Based Subscription** — Pros get 3 free inquiries/month, then must subscribe
4. **No Commission on Lessons** — Revenue only from pro subscriptions

### Technical Constraints
1. **Monorepo Structure** — `/web` (Next.js frontend) + `/api` (Express backend)
2. **No Dark Patterns** — Transparent pricing, clear subscription limits
3. **WCAG AA Compliance** — Accessibility first
4. **Mobile-First Design** — Responsive from 320px to 4K

### Design Principles
1. **Korean Luxury Minimalism** — 90% neutrals, 10% accent
2. **Calm Control** — Reduce cognitive load, maintain transparency
3. **Data Clarity** — Metrics scannable at a glance
4. **No Unnecessary Copy** — Visual storytelling over text

---

## 3. Target Personas

### Primary: VIP Golfers (General Users)
- **Demographics:** Age 30-55, C-suite executives, high-net-worth
- **Goals:** Find trustworthy pro quickly, book without hassle
- **Pain Points:** Decision paralysis, trust deficit, vulnerability
- **Design Response:** Large CTAs, verification badges, instant confirmation

### Secondary: Pro Golfers (Expert Users)
- **Demographics:** Age 28-45, KPGA/LPGA certified, independent coaches
- **Goals:** Maximize bookings, track performance, manage costs
- **Pain Points:** Cognitive overload, time pressure, accuracy demands
- **Design Response:** Dashboard metrics, data tables, progressive disclosure

---

## 4. Technology Stack

### Frontend (web/)
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS
- **Fonts:** Pretendard (Korean), Inter (English)
- **Design Tokens:** CSS Variables (calm-*, accent-*)

### Backend (api/)
- **Framework:** Express.js
- **Language:** TypeScript
- **Architecture:** RESTful API
- **Planned:** Supabase (PostgreSQL + Realtime + Auth)

### Infrastructure (Planned)
- **Database:** Supabase
- **Media:** Cloudinary or AWS S3
- **Payments:** Toss Payments (subscription billing)
- **Hosting:** Vercel (frontend), Railway/Fly.io (backend)

---

## 5. System Boundaries

### In Scope
- Pro profile creation and showcase
- Golfer inquiry and chat
- Lead counting and subscription enforcement
- Pro dashboard with analytics
- Booking confirmation workflow

### Out of Scope (Phase 1-2)
- Payment processing for lessons (off-platform)
- Scheduling/calendar sync
- Video conferencing integration
- Community features (forums, groups)
- Mobile native apps (web-only for now)

---

## 6. Key Metrics

### Business KPIs
- **Pro Sign-Ups:** Target 50+ pros by Month 3
- **Golfer Sign-Ups:** Target 200+ golfers by Month 6
- **Lead Conversion:** 40% inquiry → confirmed lesson
- **Subscription Rate:** 25% of pros upgrade within 3 months
- **Monthly Recurring Revenue (MRR):** ₩5M+ by Month 6

### Technical SLIs
- **Page Load Time:** < 2.5s (LCP)
- **API Response:** < 200ms (p95)
- **Uptime:** 99.5% (Phase 1), 99.9% (Phase 2)
- **Error Rate:** < 1% of user sessions

---

## 7. Development Phases

### Phase 1: MVP (Current - 4 weeks)
**Goal:** Showcase platform
- [x] Pro profile pages
- [x] Pro directory with search/filter
- [x] Korean Luxury Minimalism design system
- [ ] KakaoTalk link integration (temporary chat)
- [ ] Admin dashboard for pro management

### Phase 2: Beta (8 weeks)
**Goal:** Lock-in with real-time features
- [ ] In-app chat (Supabase Realtime)
- [ ] User authentication (Supabase Auth)
- [ ] Pro dashboard with analytics
- [ ] Subscription model with Toss Payments

### Phase 3: Scale (Future)
- Revenue optimization
- Advanced analytics
- AI-powered matching
- Mobile apps

---

## 8. Design System Philosophy

### Color System
```css
/* Neutrals (90% usage) */
--calm-white: #FAFAF9      /* Page background */
--calm-cloud: #F4F4F2      /* Card backgrounds */
--calm-stone: #E8E8E5      /* Borders */
--calm-charcoal: #52524E   /* Body text */
--calm-obsidian: #1A1A17   /* Headings */

/* Accent (10% usage) */
--calm-accent: #3B82F6     /* Primary blue */
--calm-accent-light: #DBEAFE
--calm-accent-dark: #1E40AF
```

### Typography
- **Display Font:** Pretendard (Korean excellence)
- **Body Font:** Inter (global standard)
- **Mono Font:** JetBrains Mono (metrics/data)

### Component Architecture
- Functional components with hooks
- Server components by default (Next.js 14)
- Client components marked with `"use client"`
- Reusable classes in `global.css` (`.btn-primary`, `.card`, `.input`)

---

## 9. Data Model (Core Entities)

### Users
- `id`, `role` (golfer | pro), `name`, `phone`, `created_at`

### Pro Profiles
- `user_id`, `bio`, `career` (JSONB), `tags[]`, `main_image`, `gallery[]`, `location`, `subscription_tier`, `monthly_chat_count`

### Chat Rooms
- `id`, `pro_id`, `golfer_id`, `status` (active | matched | closed), `created_at`

### Messages
- `id`, `room_id`, `sender_id`, `content`, `read_at`, `created_at`

---

## 10. Security & Compliance

### Data Protection
- **Phone Number Privacy:** Hidden until chat initiated
- **PII Encryption:** All sensitive data encrypted at rest
- **GDPR/PIPA Compliance:** User consent flows, data deletion rights

### Content Moderation
- Pro profile review before publish
- Automated spam detection in chat
- Profanity filter (Korean + English)

### Authentication
- Email/phone verification
- Session-based auth (Supabase)
- Role-based access control (RBAC)

---

## 11. Operational Guidelines

### Deployment
- **Development:** Auto-deploy on push to `dev` branch
- **Staging:** Auto-deploy on push to `main` branch
- **Production:** Manual approval required

### Monitoring
- Error tracking: Sentry
- Analytics: Google Analytics + Mixpanel
- Uptime: UptimeRobot

### Support
- **Email:** support@teeup.kr
- **KakaoTalk:** @teeup (플러스친구)
- **Response SLA:** < 24 hours

---

## 12. Change Management

### Document Updates
1. **Minor Changes:** Update version (e.g., 1.0.0 → 1.0.1), add note in commit
2. **Major Changes:** Increment version (e.g., 1.0.0 → 2.0.0), create ADR in `/specs/ADRs/`
3. **Context Change:** Requires tech lead review + CI validation

### Review Frequency
- **Weekly:** During sprint planning
- **Monthly:** Business metrics review
- **Quarterly:** Strategic alignment check

---

## 13. Communication Channels

### Internal
- **Slack:** #teeup-dev, #teeup-product
- **Notion:** Product roadmap, meeting notes
- **GitHub:** Code reviews, issues, PRs

### External
- **Landing Page:** https://teeup.kr (planned)
- **Instagram:** @teeup.official (planned)
- **Email:** hello@teeup.kr

---

## 14. Team Structure

### Current Team
- **Product Manager:** [TBD]
- **Tech Lead:** [TBD]
- **Frontend Developer:** [TBD]
- **Backend Developer:** [TBD]
- **Designer:** [TBD]

### Future Roles
- DevOps Engineer
- QA Engineer
- Customer Success Manager

---

## 15. References

### Key Documents
- [PRD.md](business/PRD.md) — Product requirements
- [DESIGN_SYSTEM.md](specs/DESIGN_SYSTEM.md) — Visual design specs
- [UX_STRATEGY.md](guides/UX_STRATEGY.md) — UX philosophy
- [ARCHITECTURE.md](specs/ARCHITECTURE.md) — System architecture

### External Resources
- [Next.js 14 Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

**This document is the single source of truth for TEE:UP. All decisions, designs, and code should align with this context.**
