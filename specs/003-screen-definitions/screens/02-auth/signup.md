# Screen: Signup (회원가입)

**Route**: `/auth/signup`
**Status**: Implemented
**Last Updated**: 2025-12-18
**Priority**: P0
**Dependencies**: Supabase Auth

---

## 1. 화면 개요

### 목적
새로운 사용자가 골퍼 또는 프로로 플랫폼에 가입한다.

### 사용자 흐름
```
/auth/login → /auth/signup → 이메일 인증 → /dashboard (프로) 또는 /onboarding/mood (골퍼)
```

### 접근 조건
- **인증 필요**: No
- **권한 수준**: guest

---

## 2. 레이아웃 구조

### 와이어프레임

```
┌────────────────────────────────────────────────────────────┐
│                                                            │
│                    ┌──────────────────┐                    │
│                    │   TEE:UP Logo    │                    │
│                    │   "회원가입"      │                    │
│                    │                  │                    │
│                    │  [골퍼] [프로]    │  ← 역할 선택       │
│                    │                  │                    │
│                    │  ┌────────────┐  │                    │
│                    │  │ 이름        │  │                    │
│                    │  └────────────┘  │                    │
│                    │  ┌────────────┐  │                    │
│                    │  │ 이메일      │  │                    │
│                    │  └────────────┘  │                    │
│                    │  ┌────────────┐  │                    │
│                    │  │ 비밀번호    │  │                    │
│                    │  └────────────┘  │                    │
│                    │  ┌────────────┐  │                    │
│                    │  │ 비밀번호 확인│  │                    │
│                    │  └────────────┘  │                    │
│                    │                  │                    │
│                    │  □ 이용약관 동의 │                    │
│                    │  □ 개인정보 동의 │                    │
│                    │                  │                    │
│                    │  [  가입하기  ]  │                    │
│                    │                  │                    │
│                    │  ─── 또는 ───    │                    │
│                    │  [카카오로 가입]  │                    │
│                    │                  │                    │
│                    │  이미 계정이 있나요?│                   │
│                    │  [로그인]        │                    │
│                    └──────────────────┘                    │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

## 3. 컴포넌트 목록

### 3.1 RoleSelector

**역할 선택 탭**

| Role | Label | Description |
|------|-------|-------------|
| golfer | 골퍼 | "레슨을 받고 싶어요" |
| pro | 프로 | "레슨을 제공해요" |

### 3.2 SignupForm

#### 폼 필드

| Field | Type | Validation | Error Message |
|-------|------|------------|---------------|
| name | text | required | "이름을 입력해주세요" |
| email | email | required, email, unique | "유효한 이메일을 입력해주세요" |
| password | password | required, min 8, complexity | "비밀번호는 8자 이상, 영문/숫자 포함" |
| confirmPassword | password | match password | "비밀번호가 일치하지 않습니다" |
| termsAgreed | checkbox | required | "이용약관에 동의해주세요" |
| privacyAgreed | checkbox | required | "개인정보처리방침에 동의해주세요" |

---

## 4. 데이터 요구사항

### Server Actions

| Action | 설명 |
|--------|------|
| `signUpWithEmail` | 이메일 회원가입 |
| `signUpWithKakao` | 카카오 회원가입 |

### 가입 후 Flow

- **골퍼**: 이메일 인증 → `/onboarding/mood`
- **프로**: 이메일 인증 → `/dashboard` (승인 대기 상태)

---

## 5. 접근성 요구사항

- [ ] 역할 선택 탭: role="tablist", aria-selected
- [ ] 비밀번호 강도 표시: aria-describedby
- [ ] 체크박스: 법적 문서 링크 제공

---

## 6. 에러 케이스

| 에러 유형 | 메시지 |
|----------|--------|
| 이메일 중복 | "이미 가입된 이메일입니다" |
| 비밀번호 불일치 | "비밀번호가 일치하지 않습니다" |
| 약관 미동의 | "필수 약관에 동의해주세요" |

---

## 7. 관련 화면

- **이전 화면**: [Login](./login.md)
- **다음 화면**: [Dashboard Home](../04-dashboard/dashboard-home.md), [Onboarding Mood](../01-marketing/onboarding-mood.md)
