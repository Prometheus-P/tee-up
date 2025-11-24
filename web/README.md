# TEE:UP Frontend

Premium golf lesson matching platform - Next.js 14 frontend application.

## 🚀 Current Status: Phase 1 Complete → Phase 2 In Progress

### ✅ Phase 1: MVP Frontend (Complete)

#### User-Facing Features
- **Pro Profile Showcase**
  - Magazine-style profile pages with hero images
  - Career highlights, specialties, pricing tiers
  - Video integration and testimonials
  - Skills visualization
  - Social media integration (Instagram, YouTube)

- **Pro Directory**
  - Search and filter functionality
  - Card-based grid layout
  - Direct navigation to profiles

- **KakaoTalk Integration**
  - Direct messaging button on pro profiles
  - Deep linking to KakaoTalk chat
  - Temporary solution before in-app chat

- **SEO Optimization**
  - Comprehensive meta tags
  - Open Graph for social sharing
  - Twitter Cards
  - Dynamic metadata per profile

#### Admin Panel
- **Authentication System**
  - Login page with validation
  - Protected admin routes
  - Session management

- **Pro Management**
  - Review pending applications
  - Approve/reject workflow
  - View approved pros with metrics
  - Profile views, leads, and conversion tracking

- **Chat Management**
  - Active chat rooms overview
  - Flagged message moderation
  - Chat insights and statistics

- **Analytics Dashboard**
  - KPI metrics (MAU, conversions, revenue)
  - Revenue trends tracking
  - Pro performance leaderboard
  - Platform health metrics
  - Time period filtering (7/30/90 days)

### 🧪 Testing

```bash
npm test
```

**Current Coverage:**
- 5 test suites, 56 tests passing
- Full TDD coverage for admin features
- Integration tests for KakaoTalk feature

### 📦 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS
- **Fonts:** Pretendard (Korean), DM Sans (English)
- **Testing:** Jest + React Testing Library
- **Code Quality:** ESLint with Next.js config

### 🏗️ Project Structure

```
src/
├── app/
│   ├── admin/              # Admin panel pages
│   │   ├── analytics/      # Analytics dashboard
│   │   ├── chats/          # Chat management
│   │   ├── pros/           # Pro management
│   │   └── users/          # User management
│   ├── components/         # Shared components
│   ├── profile/            # Pro profile pages
│   │   └── [slug]/         # Dynamic routes
│   └── layout.tsx          # Root layout with SEO
├── lib/
│   └── supabase/           # Supabase integration
│       ├── client.ts       # Browser client
│       ├── server.ts       # Server client
│       └── middleware.ts   # Session management
├── hooks/                  # Custom React hooks
│   ├── useAdminAuth.ts
│   ├── useProManagement.ts
│   ├── useFlaggedMessages.ts
│   └── useTimePeriod.ts
├── middleware.ts           # Next.js middleware
└── global.css              # Global styles + design system
```

### 🎨 Design System

**Colors:**
- `--calm-white`: Background
- `--calm-obsidian`: Primary text
- `--calm-charcoal`: Secondary text
- `--calm-ash`: Tertiary text
- `--accent`: Gold accent (#d4af37)
- `--success/error/warning/info`: Semantic colors

**Typography:**
- Display: DM Sans (headings)
- Body: Pretendard (Korean text support)

### 🚀 Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Start production server
npm start
```

### 📊 Performance

**Bundle Sizes:**
- First Load JS: ~87.7 kB (shared)
- Admin pages: ~99-100 kB
- Profile pages: ~102 kB

**Optimizations:**
- Image optimization (AVIF, WebP)
- Font optimization
- Code splitting by route
- SSG for static pages

### 🔧 Phase 2: Backend Integration (In Progress)

#### Completed
- [x] **Supabase Integration Foundation**
  - Client/Server separation for Next.js 14
  - Middleware for session management
  - Route protection for admin pages
  - Environment configuration

- [x] **Database Schema Design**
  - Complete schema with all tables and relationships
  - Row Level Security (RLS) policies
  - Indexes for performance
  - Triggers and functions for automation
  - Setup guide and documentation

#### In Progress
- [ ] **Supabase Project Setup**
  - Create production/development projects
  - Apply database schema
  - Configure authentication providers

- [ ] **Authentication System**
  - Replace mock admin auth with Supabase Auth
  - Implement login/signup flows
  - Add email verification
  - Session management

#### Upcoming
- [ ] **Pro Profile Migration**
  - Connect profiles to Supabase database
  - Implement CRUD operations
  - Add image upload with Supabase Storage

- [ ] **Real-time Chat**
  - Build chat UI components
  - Implement Supabase Realtime subscriptions
  - Message persistence and history
  - Read receipts and notifications

- [ ] **Payment Integration**
  - Toss Payments setup
  - Subscription billing
  - Payment webhooks

#### Additional Features
- [ ] Mobile responsive improvements
- [ ] Accessibility audit (WCAG AA)
- [ ] Performance monitoring
- [ ] Error tracking (Sentry)

### 📝 Git Commit Convention

All commits follow TDD methodology:
- `(frontend): plan X.X feature - RED phase` - Failing tests
- `(frontend): plan X.X feature - GREEN phase` - Implementation
- `(frontend): plan X.X feature - REFACTOR phase` - Code cleanup

### 🤝 Contributing

This project follows strict TDD methodology:
1. Write failing tests (RED)
2. Make tests pass (GREEN)
3. Refactor code (REFACTOR)
4. Commit each phase separately

### 📄 License

Private - TEE:UP Platform
