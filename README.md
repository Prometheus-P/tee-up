# TEE:UP (티업)
## Premium Golf Lesson Matching Platform

> **Status:** Phase 1 MVP (Active Development)
> **Target Launch:** Q1 2025
> **Version:** 1.0.0-beta

---

## 🎯 Overview

TEE:UP connects VIP golfers with verified professional golfers through a **magazine-style, data-driven platform**. We showcase elite coaches, enable instant chat inquiries, and facilitate seamless lesson bookings.

### Key Features
- ✅ **Visual-First Pro Profiles** — Stunning images, videos, verified credentials
- ✅ **Instant Matching** — Real-time chat for quick connection
- ✅ **Trust-Building** — LPGA/PGA verification badges, statistics, reviews
- ✅ **Flexible Pricing** — Transparent rates, off-platform payments
- ✅ **Pro Dashboard** — Analytics, lead management, subscription control

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/tee_up.git
cd tee_up

# Install frontend dependencies
cd web
npm install

# Install backend dependencies
cd ../api
npm install
```

### Development

```bash
# Run frontend (http://localhost:3000)
cd web
npm run dev

# Run backend (http://localhost:5000)
cd api
npm start
```

### Build for Production

```bash
# Frontend
cd web
npm run build
npm run start

# Backend
cd api
npm run build
npm start
```

---

## 📂 Project Structure

```
tee_up/
├── web/                  # Next.js frontend
│   ├── src/app/          # App Router pages
│   ├── components/       # React components
│   └── global.css        # Design system styles
│
├── api/                  # Express.js backend
│   ├── src/              # Source files
│   └── package.json
│
├── business/             # Business documents
│   ├── BUSINESS_PLAN.md
│   └── PRD.md
│
├── specs/                # Technical specs
│   └── DESIGN_SYSTEM.md
│
├── guides/               # Development guides
│   ├── UX_STRATEGY.md
│   └── CLAUDE_GUIDE.md
│
└── CONTEXT.md            # System source of truth
```

---

## 🎨 Design System

TEE:UP follows **Korean Luxury Minimalism** design principles:

### Color Palette
- **Neutrals (90%):** Calm White, Cloud, Stone, Charcoal, Obsidian
- **Accent (10%):** Blue (#3B82F6)
- **Functional:** Success, Warning, Error, Info

### Typography
- **Display:** Pretendard (Korean excellence)
- **Body:** Inter (global standard)
- **Mono:** JetBrains Mono (metrics/data)

### Key Principles
1. **Show, Don't Tell** — Visual storytelling over text
2. **Calm Control** — Reduce cognitive load, maintain transparency
3. **Data Clarity** — Metrics scannable at a glance

For full design specs, see [DESIGN_SYSTEM.md](specs/DESIGN_SYSTEM.md).

---

## 🛠 Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS
- **Fonts:** Pretendard, Inter

### Backend
- **Framework:** Express.js
- **Language:** TypeScript
- **Architecture:** RESTful API

### Planned
- **Database:** Supabase (PostgreSQL + Realtime + Auth)
- **Media Storage:** Cloudinary or AWS S3
- **Payments:** Toss Payments (subscription billing)
- **Hosting:** Vercel (frontend), Railway/Fly.io (backend)

---

## 📋 Development Roadmap

### Phase 1: MVP (4 weeks) — "Showcase"
- [x] Pro profile pages
- [x] Pro directory with search/filter
- [x] Korean Luxury Minimalism design system
- [ ] KakaoTalk link integration (temporary chat)
- [ ] Admin dashboard for pro management

### Phase 2: Beta (8 weeks) — "Lock-in"
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

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guide](guides/CONTRIBUTING.md) before submitting PRs.

### Development Workflow
1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Standards
- **TypeScript** strict mode
- **ESLint** + Prettier for formatting
- **Conventional Commits** for commit messages
- **WCAG AA** compliance for accessibility

---

## 📖 Documentation

### Core Documents
- [CONTEXT.md](CONTEXT.md) — System source of truth
- [PRD.md](business/PRD.md) — Product requirements
- [DESIGN_SYSTEM.md](specs/DESIGN_SYSTEM.md) — Visual design specs
- [UX_STRATEGY.md](guides/UX_STRATEGY.md) — UX philosophy

### Guides
- [CLAUDE_GUIDE.md](guides/CLAUDE_GUIDE.md) — Claude Code integration
- [CONTRIBUTING.md](guides/CONTRIBUTING.md) — How to contribute

### API
- API documentation: `http://localhost:5000/api/docs` (when running)

---

## 🎯 Business Model

### For Golfers (Free)
- Browse pro profiles
- Send unlimited inquiries
- Book lessons directly with pros

### For Pros
- **Free Tier:** 3 free inquiries/month
- **Pro Tier (₩49,000/month):** Unlimited inquiries + analytics
- **Payment:** Lesson fees paid off-platform (flexibility)

### Revenue Model
- Lead-based subscriptions for pros
- No commission on lesson payments

---

## 📊 Key Metrics

### Business KPIs
- **Pro Sign-Ups:** Target 50+ by Month 3
- **Golfer Sign-Ups:** Target 200+ by Month 6
- **Lead Conversion:** 40% inquiry → confirmed lesson
- **Subscription Rate:** 25% of pros upgrade within 3 months
- **MRR:** ₩5M+ by Month 6

### Technical SLIs
- **Page Load:** < 2.5s (LCP)
- **API Response:** < 200ms (p95)
- **Uptime:** 99.5% (Phase 1), 99.9% (Phase 2)

---

## 🔒 Security & Privacy

- **Phone Privacy:** Hidden until chat initiated
- **PII Encryption:** All sensitive data encrypted
- **GDPR/PIPA Compliant:** User consent flows, data deletion rights
- **Content Moderation:** Pro profile review, automated spam detection

---

## 📞 Contact

- **Email:** hello@teeup.kr
- **Support:** support@teeup.kr
- **Instagram:** @teeup.official (planned)

---

## 📄 License

Proprietary — All rights reserved.

---

## 🙏 Acknowledgments

- Design inspiration: Catchtable, Tesla, Gentle Monster
- UI components: Shadcn/ui, Magic UI, uiverse.io
- Fonts: Pretendard (Kil Hyung-jin), Inter (Rasmus Andersson)

---

**Built with ❤️ for the golf community in Seoul.**
