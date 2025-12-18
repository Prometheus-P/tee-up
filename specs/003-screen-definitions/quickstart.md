# Screen Definitions - Quick Start Guide

**Feature**: 003-screen-definitions
**Date**: 2025-12-18

---

## 화면정의서 활용 가이드

### 1. 새 페이지 구현 시

1. `screens/` 폴더에서 해당 카테고리의 화면정의서 찾기
2. 레이아웃 구조 섹션의 와이어프레임 확인
3. 컴포넌트 목록에서 필요한 컴포넌트와 Props 확인
4. 데이터 요구사항에서 필요한 Server Action 확인
5. 접근성 요구사항 체크리스트 확인

### 2. 디자인 토큰 사용

```tsx
// 올바른 사용 - 토큰 참조
<div className="bg-tee-surface border-tee-stone text-tee-ink-strong">
  <h1 className="text-h1">제목</h1>
  <p className="text-tee-ink-light">본문</p>
</div>

// 잘못된 사용 - 하드코딩
<div className="bg-white border-gray-200 text-gray-900">
```

### 3. 컴포넌트 상태 구현

모든 인터랙티브 요소는 5가지 상태를 구현:

| 상태 | 조건 | 스타일 변화 |
|------|------|------------|
| default | 기본 | 기본 스타일 |
| hover | 마우스 오버 | 색상 변화, scale(1.02) |
| active | 클릭 중 | 색상 어두워짐 |
| disabled | 비활성화 | opacity 50% |
| loading | 로딩 중 | 스피너 표시 |

### 4. 반응형 구현

| Breakpoint | Tailwind | 너비 | 용도 |
|------------|----------|------|------|
| Mobile | default | < 640px | 모바일 |
| sm | `sm:` | ≥ 640px | 큰 모바일 |
| md | `md:` | ≥ 768px | 태블릿 |
| lg | `lg:` | ≥ 1024px | 데스크톱 |
| xl | `xl:` | ≥ 1280px | 큰 데스크톱 |

### 5. 접근성 체크

- [ ] 모든 인터랙티브 요소 Tab 접근 가능
- [ ] 포커스 링 표시 (`focus-visible:ring-2`)
- [ ] 이미지에 alt 텍스트
- [ ] 아이콘 버튼에 aria-label
- [ ] 색상 대비 4.5:1 이상

---

## 화면정의서 구조 요약

```markdown
# Screen: {화면명}

## 1. 화면 개요
- 목적, 사용자 흐름, 접근 조건

## 2. 레이아웃 구조
- 텍스트 와이어프레임
- 반응형 동작

## 3. 컴포넌트 목록
- Props, 상태, 디자인 토큰

## 4. 데이터 요구사항
- Server Actions, 스키마, 로딩/에러

## 5. 인터랙션 정의
- Given-When-Then 시나리오

## 6. 접근성 요구사항
- 키보드, 스크린 리더, 색상 대비

## 7. 에러 케이스
- 에러 유형별 피드백

## 8. 관련 화면
- 이전/다음/연관 화면
```

---

## 검증 체크리스트

### 구현 전 확인

- [ ] 화면정의서 전체 읽기 완료
- [ ] 필요한 컴포넌트 목록 확인
- [ ] 데이터 요구사항 확인
- [ ] 디자인 토큰 참조 문서 확인

### 구현 후 확인

- [ ] 모든 컴포넌트 상태 구현 완료
- [ ] 반응형 레이아웃 테스트 완료
- [ ] 접근성 요구사항 충족
- [ ] 에러 케이스 처리 완료

---

## 관련 문서

- [화면 정의 템플릿](./templates/screen-template.md)
- [디자인 토큰 참조](./contracts/design-tokens-reference.md)
- [컴포넌트 상태 정의](./contracts/component-states.md)
- [반응형 브레이크포인트](./contracts/responsive-breakpoints.md)
