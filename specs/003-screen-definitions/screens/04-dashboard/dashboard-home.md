# Screen: Dashboard Home (대시보드 홈)

**Route**: `/dashboard`
**Status**: Implemented
**Last Updated**: 2025-12-18
**Priority**: P0
**Dependencies**: Auth, Dashboard Layout

---

## 1. 화면 개요

### 목적
프로가 로그인 후 가장 먼저 보는 화면으로, 핵심 지표와 빠른 액션을 제공한다.

### 사용자 흐름
```
/auth/login → /dashboard → /dashboard/portfolio 또는 /dashboard/leads
```

### 접근 조건
- **인증 필요**: Yes
- **권한 수준**: pro
- **전제 조건**: 프로 프로필 존재

---

## 2. 레이아웃 구조

### 와이어프레임

```
┌────────────────────────────────────────────────────────────────────────────┐
│ Header                                              [프로필] [로그아웃]    │
├─────────────────┬──────────────────────────────────────────────────────────┤
│                 │                                                          │
│  Sidebar        │  안녕하세요, {이름}님!                                    │
│  ────────       │                                                          │
│  ■ 대시보드     │  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐ │
│  □ 포트폴리오   │  │ 조회수    │ │ 월간 리드 │ │ 전체 리드 │ │ 구독 상태 │ │
│  □ 리드         │  │  1,234    │ │     12    │ │     89    │ │   Free    │ │
│  □ 컨시어지     │  │ +15%      │ │  +3 이번주│ │           │ │ 업그레이드│ │
│  □ 설정         │  └───────────┘ └───────────┘ └───────────┘ └───────────┘ │
│                 │                                                          │
│                 │  ⚠️ 승인 대기 중 (승인 완료 전에는 포트폴리오 비공개)     │
│                 │                                                          │
│                 │  빠른 작업                                                │
│                 │  ┌─────────────────┐ ┌─────────────────┐                 │
│                 │  │ 📝 포트폴리오   │ │ 👥 리드 확인    │                 │
│                 │  │     편집        │ │                 │                 │
│                 │  └─────────────────┘ └─────────────────┘                 │
│                 │  ┌─────────────────┐                                     │
│                 │  │ 👁 프로필 미리보기│                                     │
│                 │  └─────────────────┘                                     │
│                 │                                                          │
└─────────────────┴──────────────────────────────────────────────────────────┘
```

### 반응형 동작

| Breakpoint | 레이아웃 변화 |
|------------|---------------|
| Mobile | 사이드바 숨김, 통계 카드 2x2 그리드 |
| md | 축소된 사이드바, 통계 카드 4열 |
| lg+ | 전체 사이드바 + 메인 콘텐츠 |

---

## 3. 컴포넌트 목록

### 3.1 StatCard

**통계 카드 컴포넌트**

| Stat | Value Source | Icon | Trend |
|------|--------------|------|-------|
| 조회수 | pro_profiles.view_count | EyeIcon | 주간 대비 % |
| 월간 리드 | leads (this month) | UserPlusIcon | 이번 주 신규 |
| 전체 리드 | leads (total) | UsersIcon | - |
| 구독 상태 | subscriptions | CreditCardIcon | 업그레이드 링크 |

### 3.2 ApprovalBanner

**승인 상태 배너**

| 상태 | 스타일 | 메시지 |
|------|--------|--------|
| pending | Warning (노란색) | "프로 승인 대기 중입니다. 승인 후 포트폴리오가 공개됩니다." |
| approved | Success (녹색, 일시적) | "축하합니다! 프로 승인이 완료되었습니다." |
| rejected | Error (빨간색) | "승인이 거부되었습니다. 프로필을 수정해주세요." |

### 3.3 QuickActions

**빠른 작업 카드**

| Action | Icon | Route | Description |
|--------|------|-------|-------------|
| 포트폴리오 편집 | PencilSquareIcon | /dashboard/portfolio | 포트폴리오 에디터로 이동 |
| 리드 확인 | UserGroupIcon | /dashboard/leads | 리드 관리 페이지로 이동 |
| 프로필 미리보기 | EyeIcon | /[slug] (새 탭) | 공개 포트폴리오 미리보기 |

---

## 4. 데이터 요구사항

### Server Actions

| Action | 설명 |
|--------|------|
| `getDashboardStats` | 통계 데이터 조회 |
| `getProProfile` | 프로 프로필 및 승인 상태 |

### 데이터 스키마

```typescript
interface DashboardData {
  profile: ProProfile;
  stats: {
    viewCount: number;
    viewCountTrend: number; // %
    monthlyLeads: number;
    weeklyLeads: number;
    totalLeads: number;
    subscription: 'free' | 'basic' | 'pro';
  };
}
```

---

## 5. 접근성 요구사항

- [ ] 통계 카드: role="status", aria-label로 전체 값 읽기
- [ ] 승인 배너: role="alert"
- [ ] 빠른 작업 카드: 카드 전체 클릭 가능

---

## 6. 에러 케이스

| 에러 유형 | 처리 |
|----------|------|
| 프로 프로필 없음 | 프로필 생성 페이지로 리디렉션 |
| 데이터 로드 실패 | 스켈레톤 + 재시도 버튼 |

---

## 7. 관련 화면

- **이전 화면**: [Login](../02-auth/login.md)
- **다음 화면**: [Portfolio Editor](./portfolio-editor.md), [Leads](./leads.md)
