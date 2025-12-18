# Screen: Home (홈)

**Route**: `/`
**Status**: Implemented
**Last Updated**: 2025-12-18
**Priority**: P1
**Dependencies**: -

---

## 1. 화면 개요

### 목적
TEE:UP 랜딩 페이지로, 서비스 소개와 AI 매칭 온보딩으로 유도한다.

### 사용자 흐름
```
직접 방문/검색 → / → /onboarding/mood (AI 매칭) 또는 /auth/login
```

### 접근 조건
- **인증 필요**: No
- **권한 수준**: guest

---

## 2. 레이아웃 구조

### 섹션 구성

1. **Hero Section**: "당신에게 딱 맞는 골프 프로를 찾아드립니다" + CTA
2. **AI 추천 설명**: 3단계 프로세스 (무드 선택 → AI 매칭 → 프로 만남)
3. **프로 소개 카드**: 투어 경험 프로 하이라이트
4. **통계 섹션**: 50+ 프로, 1,200+ 매칭, 4.9 평점
5. **최종 CTA**: "지금 시작하기"

---

## 3. 주요 컴포넌트

- `HeroSection` - 풀스크린 히어로
- `ProcessSteps` - 3단계 안내
- `ProHighlightCards` - 프로 미리보기 카드
- `StatsSection` - 숫자 통계
- `FinalCTA` - 하단 CTA

---

## 4. 관련 화면

- **다음 화면**: [Onboarding Mood](./onboarding-mood.md), [Login](../02-auth/login.md)
