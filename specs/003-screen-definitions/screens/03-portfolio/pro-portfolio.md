# Screen: Pro Portfolio (프로 포트폴리오)

**Route**: `/[slug]`
**Status**: Implemented
**Last Updated**: 2025-12-18
**Priority**: P0
**Dependencies**: Portfolio Templates, Server Actions

---

## 1. 화면 개요

### 목적
프로의 공개 포트폴리오 페이지로, 잠재 수강생에게 프로를 소개하고 리드를 생성하는 핵심 화면이다.

### 사용자 흐름
```
검색/SNS/공유 → /[slug] → 문의하기 (리드 생성) → 카카오톡/결제/예약
```

### 접근 조건
- **인증 필요**: No (공개 페이지)
- **권한 수준**: guest
- **전제 조건**: 프로 승인 완료 (`is_approved = true`)

---

## 2. 레이아웃 구조

### 템플릿별 레이아웃

세 가지 템플릿이 존재하며, 각각 다른 레이아웃을 제공:

#### Visual Template
```
┌────────────────────────────────────────────────────────────┐
│                   Hero Section (Full Screen)               │
│         [배경 이미지 + 이름 + 타이틀 + 위치]                 │
├────────────────────────────────────────────────────────────┤
│  Stats Section (오버랩)                                     │
│  [경력 15년] [수강생 500+] [평점 4.9] [조회수 1,234]        │
├────────────────────────────────────────────────────────────┤
│  Bio Section                                               │
│  "레슨 철학 및 소개 텍스트..."                              │
├────────────────────────────────────────────────────────────┤
│  Gallery Section (Bento Grid)                              │
│  [이미지] [이미지] [이미지]                                 │
│  [이미지] [이미지]                                         │
├────────────────────────────────────────────────────────────┤
│  Testimonials Section (Marquee)                            │
│  ← [후기1] [후기2] [후기3] [후기4] →                        │
├────────────────────────────────────────────────────────────┤
│  Contact Section                                           │
│  [카카오톡 문의] [결제하기] [예약하기]                       │
└────────────────────────────────────────────────────────────┘
```

#### Curriculum Template
```
┌────────────────────────────────────────────────────────────┐
│  Hero + Stats + Bio                                        │
├────────────────────────────────────────────────────────────┤
│  Curriculum Section                                        │
│  [기초반 카드] [중급반 카드] [상급반 카드]                   │
├────────────────────────────────────────────────────────────┤
│  Pricing Section                                           │
│  [1회 체험] [10회권 ★] [20회권]                            │
├────────────────────────────────────────────────────────────┤
│  FAQ Section (Accordion)                                   │
│  ▶ 질문 1                                                  │
│  ▶ 질문 2                                                  │
├────────────────────────────────────────────────────────────┤
│  Contact Section                                           │
└────────────────────────────────────────────────────────────┘
```

#### Social Template
```
┌────────────────────────────────────────────────────────────┐
│  Hero + Stats + Bio                                        │
├────────────────────────────────────────────────────────────┤
│  Social Links                                              │
│  [Instagram] [YouTube] [KakaoTalk]                         │
├────────────────────────────────────────────────────────────┤
│  Instagram Feed (Grid)                                     │
│  [포스트] [포스트] [포스트]                                 │
│  [포스트] [포스트] [포스트]                                 │
├────────────────────────────────────────────────────────────┤
│  YouTube Videos (Embed)                                    │
│  [비디오] [비디오]                                         │
│  [비디오] [비디오]                                         │
├────────────────────────────────────────────────────────────┤
│  Testimonials + Contact                                    │
└────────────────────────────────────────────────────────────┘
```

---

## 3. 컴포넌트 목록

### 3.1 HeroSection

**경로**: `@/components/portfolio/sections/HeroSection.tsx`

| Prop | Type | Description |
|------|------|-------------|
| name | string | 프로 이름 |
| title | string | 직함 (예: "KPGA 프로") |
| subtitle | string | 자격증 등 |
| heroImage | string | 배경 이미지 URL |
| location | string | 위치 |

### 3.2 StatsSection

**경로**: `@/components/portfolio/sections/StatsSection.tsx`

| Stat | Label | Example |
|------|-------|---------|
| experience | 경력 | "15년" |
| students | 수강생 | "500+" |
| rating | 평점 | "4.9" |
| views | 조회수 | "1,234" |

### 3.3 ContactSection

**경로**: `@/components/portfolio/sections/ContactSection.tsx`

| Button | URL Source | Style | Action |
|--------|-----------|-------|--------|
| 카카오톡 문의 | open_chat_url | Kakao (#FEE500) | 새 탭에서 오픈채팅 |
| 결제하기 | payment_link | Primary | 결제 페이지로 이동 |
| 예약하기 | booking_url | Secondary | 예약 페이지로 이동 |

---

## 4. 데이터 요구사항

### Server Actions

| Action | 설명 |
|--------|------|
| `getPublicProfile` | slug로 프로필 조회 |
| `getPortfolioSections` | 포트폴리오 섹션 조회 |
| `incrementViewCount` | 조회수 증가 |
| `createLead` | 리드 생성 (CTA 클릭 시) |

### SEO Metadata

```typescript
export async function generateMetadata({ params }) {
  const profile = await getPublicProfile(params.slug);
  return {
    title: `${profile.title} - ${profile.name} | TEE:UP`,
    description: profile.bio,
    openGraph: {
      images: [profile.hero_image_url],
    },
  };
}
```

---

## 5. 인터랙션 정의

### 5.1 CTA 클릭 (리드 생성)

1. **Given** 방문자가 포트폴리오를 보고 있을 때
2. **When** 카카오톡/결제/예약 버튼을 클릭하면
3. **Then** 리드가 자동으로 생성되고 (백그라운드)
4. **Then** 해당 URL로 이동 또는 새 탭 열기

### 5.2 FAQ 아코디언 (Curriculum)

1. **Given** 방문자가 FAQ 섹션을 보고 있을 때
2. **When** 질문을 클릭하면
3. **Then** 부드럽게 답변이 펼쳐진다 (accordion-down)

### 5.3 Testimonials Marquee (Visual)

- 자동 스크롤 (40초 주기)
- 호버 시 일시정지
- 무한 루프

---

## 6. 접근성 요구사항

- [ ] Hero 이미지: 장식적이므로 alt="" 또는 의미있는 alt
- [ ] CTA 버튼: 명확한 aria-label
- [ ] FAQ 아코디언: aria-expanded, aria-controls
- [ ] 자동 스크롤: prefers-reduced-motion 존중

---

## 7. 에러 케이스

| 에러 유형 | 처리 |
|----------|------|
| 존재하지 않는 slug | 404 페이지 |
| 미승인 프로 | 404 페이지 (비공개 처리) |
| 데이터 로드 실패 | 에러 페이지 |

---

## 8. 관련 화면

- **이전 화면**: 검색, SNS, 공유 링크
- **다음 화면**: 카카오톡, 결제 페이지, 예약 페이지
- **연관 화면**: [Portfolio Editor](../04-dashboard/portfolio-editor.md) (편집)
