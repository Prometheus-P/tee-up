# Screen: Site Portfolio (사이트 포트폴리오)

**Route**: `/site/[handle]`
**Status**: Implemented
**Last Updated**: 2025-12-18
**Priority**: P1
**Dependencies**: Portfolio System

---

## 1. 화면 개요

### 목적
프로의 커스텀 사이트 URL로 접근하는 포트폴리오 페이지. 추가 테마 적용 가능.

### 사용자 흐름
```
커스텀 URL → /site/[handle] → 문의하기
```

### 접근 조건
- **인증 필요**: No
- **권한 수준**: guest

---

## 2. 레이아웃 구조

기본적으로 `/[slug]`와 동일하지만:
- 커스텀 도메인/핸들 지원
- 추가 테마 옵션 (Pro 요금제)

---

## 3. 데이터 요구사항

### Server Actions

| Action | 설명 |
|--------|------|
| `getProfileByHandle` | 핸들로 프로필 조회 |

---

## 4. 관련 화면

- **연관 화면**: [Pro Portfolio](./pro-portfolio.md)
- **미구현**: [Site Contact](./site-contact.md)
