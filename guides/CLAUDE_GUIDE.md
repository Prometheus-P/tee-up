# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**TEE:UP (티업)** is a premium golf lesson matching platform that connects golfers with verified pro golfers. The platform showcases pro profiles in a magazine-style, sophisticated interface and facilitates 1:1 chat inquiries for lesson booking.

**Business Model:**
- Free pro profile registration (low barrier to entry)
- Lesson payments happen off-platform (flexibility for both parties)
- Revenue: Lead-based subscription for pros (3 free inquiries/month, then paid subscription required)
- "Lead" = chat room creation; "Matched" = confirmed lesson booking

**Target Audience:** VIP golfers in Gangnam, elite 2030s, corporate clients

## Tech Stack

**Monorepo Structure:** `/web` (frontend) + `/api` (backend) + `/golf-pro-platform` (prototypes)

### Frontend (web/)
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Fonts:** Noto Sans KR (body), DM Sans (headings)
- **Philosophy:** Luxury, minimal, high-end (inspired by Catchtable, Tesla)

### Backend (api/)
- **Framework:** Express.js
- **Language:** TypeScript
- **CORS:** Enabled for cross-origin requests
- **Architecture:** RESTful API

### Planned Stack
- **Database:** Supabase (PostgreSQL + Realtime + Auth)
- **Media Storage:** Cloudinary or AWS S3
- **Payments:** Toss Payments (subscription billing)

## Development Commands

### Frontend
```bash
cd web
npm run dev        # Start development server (http://localhost:3000)
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
```

### Backend
```bash
cd api
npm start          # Compile TypeScript and start server (http://localhost:5000)
```

## Architecture Overview

### Frontend Architecture
- **Routing:** File-based routing with dynamic routes (`/profile/[slug]`)
- **Component Pattern:** Functional components with hooks (useState, useMemo)
- **Data Flow:** Currently props drilling; API integration pending
- **Key Routes:**
  - `/` - Landing page with pro directory
  - `/profile` - Pro profiles list page
  - `/profile/[slug]` - Individual pro detail page

**Component Structure:**
```
web/src/app/
├── components/
│   ├── ProsDirectory.tsx      # Pro listing with search/filter
│   ├── BookingModal.tsx       # Reservation modal UI
│   └── ScheduleWidget.tsx     # Date/time selection
├── profile/
│   ├── [slug]/                # Dynamic pro profile pages
│   ├── ProfileTemplate.tsx    # Reusable profile layout
│   └── profile-data.ts        # Profile data store
├── global.css                 # Global styles + CSS variables
├── layout.tsx                 # Root layout with fonts
└── page.tsx                   # Home page
```

### Backend Architecture
- **Type:** RESTful API
- **Current Endpoints:**
  - `GET /api/profiles` - Get all profiles summary
  - `GET /api/profiles/:slug` - Get single profile by slug
- **Data Storage:** In-memory data store (to be replaced with Supabase)

### Design System

**Color Palette:**
```css
--lux-dark: #050406      /* Background */
--lux-carbon: #0d0b10    /* Card backgrounds */
--lux-gold: #c0a36b      /* Primary accent (gold) */
--lux-rose: #f7e8d3      /* Text color (rose/cream) */
```

**Typography:**
- Display font: DM Sans (elegant, for headlines)
- Body font: Noto Sans KR (Korean support, readability)
- Usage: Serif for titles, Sans-serif for body text

**UI Principles:**
- Full-screen hero images with parallax effects
- Glass morphism effects (backdrop-blur)
- Smooth transitions (300ms duration)
- Sufficient whitespace and visual hierarchy
- Image-first content presentation

## Core Features

### Phase 1: MVP (Current Implementation)
1. **Pro Profile Showcase**
   - High-quality profile pages with hero images
   - Career highlights, specialties, pricing tiers
   - Video integration, testimonials
   - Skills visualization (driver, iron, short game, putting)

2. **Pro Directory**
   - Search and filter by name, location, specialty
   - Card-based grid layout
   - Click-through to detail pages

3. **Booking UI** (Frontend only)
   - Schedule widget for date/time selection
   - Booking modal with reservation/waitlist modes
   - Service type selection

### Phase 2: Planned Features
1. **Real-time Chat** (Supabase Realtime)
   - 1:1 messaging between golfer and pro
   - Lead tracking (inquiry counting)
   - Phone number protection

2. **Authentication** (Supabase Auth)
   - User roles: golfer, pro
   - Login/signup flows

3. **Pro Dashboard**
   - Profile view count analytics
   - Chat inquiry count
   - Matched lesson count
   - Subscription upgrade prompts

4. **Payment Integration** (Toss Payments)
   - Pro subscription billing system

## Database Schema (Planned)

When implementing Supabase integration, use this schema:

```sql
-- Unified users table
users (
  id UUID PRIMARY KEY,
  role VARCHAR ('golfer' | 'pro'),
  name VARCHAR,
  phone VARCHAR,
  created_at TIMESTAMP
)

-- Pro profiles
pro_profiles (
  user_id UUID → users(id),
  bio TEXT,
  career JSONB,
  tags TEXT[],
  main_image_url VARCHAR,
  gallery_images TEXT[],
  location VARCHAR,
  subscription_tier VARCHAR DEFAULT 'basic',
  monthly_chat_count INT DEFAULT 0
)

-- Chat rooms
chat_rooms (
  id UUID PRIMARY KEY,
  pro_id UUID → users(id),
  golfer_id UUID → users(id),
  status VARCHAR ('active' | 'matched' | 'closed'),
  created_at TIMESTAMP
)

-- Messages
messages (
  id UUID PRIMARY KEY,
  room_id UUID → chat_rooms(id),
  sender_id UUID → users(id),
  content TEXT,
  read_at TIMESTAMP,
  created_at TIMESTAMP
)
```

## Business Logic Rules

1. **Pro Registration:** Free and open (reduces entry barrier)
2. **Lesson Payments:** Off-platform (cash/transfer at lesson location)
3. **Subscription Model:**
   - 3 free chat inquiries per month
   - Paid subscription required after limit
   - Count resets monthly
4. **Lead Definition:** A new chat room creation counts as 1 lead
5. **Match Definition:** Pro clicks confirm + golfer accepts = matched lesson

## Coding Guidelines

1. **TypeScript:** Use strict mode, avoid `any` types
2. **Components:**
   - Use functional components with hooks
   - Clearly mark client components with `"use client"`
   - Server components by default in Next.js 14
3. **Styling:**
   - Prefer Tailwind utility classes
   - Use CSS variables for theming (`var(--lux-gold)`)
   - Avoid custom CSS unless necessary
4. **State Management:** React hooks (useState, useMemo, useCallback)
5. **File Organization:** Colocate related components in feature folders

## Brand Positioning

**Differentiation:**
- vs. Soomgo (숨고): More luxurious UI/branding, premium positioning
- vs. Instagram DM: Systematic matching, faster response, professional platform
- Value for pros: Personal branding opportunity, curated clientele

**Tone:** Sophisticated, premium, trustworthy, elegant

**Visual References:** Catchtable (restaurant booking), Tesla (minimalism), luxury hotel apps

## Development Roadmap

**Phase 1: MVP (4 weeks)** - "Showcase"
- ✅ Pro profile pages
- 🔄 KakaoTalk link integration (temporary chat substitute)
- 🔄 Admin dashboard for pro management

**Phase 2: Beta (8 weeks)** - "Lock-in"
- In-app chat with Supabase Realtime
- User authentication system
- Pro dashboard with analytics
- Subscription model with Toss Payments integration
