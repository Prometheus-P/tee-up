# Component States Contract

**Feature**: 003-screen-definitions
**Date**: 2025-12-18

---

## Overview

모든 인터랙티브 컴포넌트가 구현해야 하는 상태를 정의한다.
일관된 사용자 경험을 위해 모든 컴포넌트는 이 계약을 따라야 한다.

---

## Standard States

모든 인터랙티브 컴포넌트는 다음 6가지 상태를 구현해야 한다:

| 상태 | 트리거 | 필수 여부 | 설명 |
|------|--------|----------|------|
| default | 기본 | 필수 | 기본 상태 |
| hover | 마우스 오버 | 필수 | 마우스가 요소 위에 있을 때 |
| focus | 키보드 포커스 | 필수 | Tab으로 포커스되었을 때 |
| active | 클릭/탭 중 | 필수 | 클릭하는 동안 |
| disabled | 비활성화 | 조건부 | 사용 불가능할 때 |
| loading | 로딩 중 | 조건부 | 액션 처리 중일 때 |

---

## Button States

### Primary Button

| 상태 | 배경색 | 텍스트색 | 기타 효과 |
|------|--------|---------|----------|
| default | `tee-accent-primary` | white | - |
| hover | `tee-accent-primary-hover` | white | scale(1.02), shadow-md |
| focus | `tee-accent-primary` | white | ring-2 ring-tee-accent-primary ring-offset-2 |
| active | `tee-accent-primary-active` | white | scale(0.98) |
| disabled | `tee-accent-primary-disabled` | white/70 | opacity-50, cursor-not-allowed |
| loading | `tee-accent-primary` | transparent | 스피너 표시 |

```tsx
<Button
  className={cn(
    "bg-tee-accent-primary text-white",
    "hover:bg-tee-accent-primary-hover hover:scale-[1.02] hover:shadow-md",
    "focus-visible:ring-2 focus-visible:ring-tee-accent-primary focus-visible:ring-offset-2",
    "active:bg-tee-accent-primary-active active:scale-[0.98]",
    "disabled:bg-tee-accent-primary-disabled disabled:opacity-50 disabled:cursor-not-allowed",
    "transition-all duration-[150ms] ease-standard"
  )}
  disabled={isDisabled}
>
  {isLoading ? <Spinner /> : children}
</Button>
```

### Secondary Button (Outline)

| 상태 | 배경색 | 테두리 | 텍스트색 |
|------|--------|--------|---------|
| default | transparent | `tee-stone` | `tee-ink-strong` |
| hover | `tee-background` | `tee-accent-primary` | `tee-accent-primary` |
| focus | transparent | `tee-accent-primary` | `tee-ink-strong` |
| active | `tee-stone` | `tee-accent-primary` | `tee-accent-primary` |
| disabled | transparent | `tee-stone` | `tee-ink-muted` |

### Ghost Button

| 상태 | 배경색 | 텍스트색 |
|------|--------|---------|
| default | transparent | `tee-ink-light` |
| hover | `tee-background` | `tee-ink-strong` |
| focus | transparent | `tee-ink-strong` |
| active | `tee-stone` | `tee-ink-strong` |
| disabled | transparent | `tee-ink-muted` |

### Destructive Button

| 상태 | 배경색 | 텍스트색 |
|------|--------|---------|
| default | `tee-error` | white |
| hover | `tee-error` darker | white |
| focus | `tee-error` | white |
| active | `tee-error` darkest | white |
| disabled | `tee-error` | white/50 |

---

## Input States

### Text Input

| 상태 | 테두리 | 배경 | 기타 |
|------|--------|------|------|
| default | `tee-stone` | `tee-surface` | - |
| hover | `tee-ink-muted` | `tee-surface` | - |
| focus | `tee-accent-primary` | `tee-surface` | ring-2 |
| filled | `tee-stone` | `tee-surface` | - |
| error | `tee-error` | `tee-surface` | 에러 메시지 표시 |
| disabled | `tee-stone` | `tee-background` | opacity-50 |

```tsx
<input
  className={cn(
    "w-full px-4 py-2 rounded-md border",
    "bg-tee-surface border-tee-stone text-tee-ink-strong",
    "placeholder:text-tee-ink-muted",
    "hover:border-tee-ink-muted",
    "focus:border-tee-accent-primary focus:ring-2 focus:ring-tee-accent-primary/20",
    "disabled:bg-tee-background disabled:opacity-50 disabled:cursor-not-allowed",
    error && "border-tee-error focus:ring-tee-error/20",
    "transition-colors duration-[150ms]"
  )}
/>
```

---

## Card States

### Interactive Card (Clickable)

| 상태 | 배경 | 그림자 | 기타 |
|------|------|--------|------|
| default | `tee-surface` | shadow-sm | - |
| hover | `tee-surface` | shadow-lg | translateY(-2px) |
| focus | `tee-surface` | shadow-md | ring-2 |
| active | `tee-surface` | shadow-sm | - |
| selected | `tee-accent-primary/5` | shadow-md | border-tee-accent-primary |

```tsx
<div
  className={cn(
    "p-6 rounded-lg border bg-tee-surface border-tee-stone shadow-sm",
    "cursor-pointer",
    "hover:shadow-lg hover:-translate-y-0.5",
    "focus-visible:ring-2 focus-visible:ring-tee-accent-primary",
    "active:shadow-sm active:translate-y-0",
    isSelected && "border-tee-accent-primary bg-tee-accent-primary/5",
    "transition-all duration-[200ms] ease-standard"
  )}
  tabIndex={0}
  role="button"
/>
```

### Static Card (Non-interactive)

| 상태 | 배경 | 테두리 |
|------|------|--------|
| default | `tee-surface` | `tee-stone` |

---

## Link States

| 상태 | 색상 | 기타 |
|------|------|------|
| default | `tee-accent-primary` | - |
| hover | `tee-accent-primary-hover` | underline |
| focus | `tee-accent-primary` | ring-2, ring-offset-2 |
| active | `tee-accent-primary-active` | - |
| visited | `tee-ink-light` | (선택적) |

```tsx
<a
  className={cn(
    "text-tee-accent-primary",
    "hover:text-tee-accent-primary-hover hover:underline",
    "focus-visible:ring-2 focus-visible:ring-tee-accent-primary focus-visible:ring-offset-2",
    "active:text-tee-accent-primary-active",
    "transition-colors duration-[150ms]"
  )}
/>
```

---

## Checkbox / Radio States

| 상태 | 배경 | 테두리 | 체크 색상 |
|------|------|--------|----------|
| unchecked | transparent | `tee-stone` | - |
| unchecked + hover | `tee-background` | `tee-ink-muted` | - |
| checked | `tee-accent-primary` | `tee-accent-primary` | white |
| checked + hover | `tee-accent-primary-hover` | `tee-accent-primary-hover` | white |
| focus | - | - | ring-2 |
| disabled | `tee-background` | `tee-stone` | `tee-ink-muted` |

---

## Switch/Toggle States

| 상태 | 트랙 배경 | 썸 위치 |
|------|----------|---------|
| off | `tee-stone` | 왼쪽 |
| off + hover | `tee-ink-muted` | 왼쪽 |
| on | `tee-accent-primary` | 오른쪽 |
| on + hover | `tee-accent-primary-hover` | 오른쪽 |
| disabled | `tee-background` | - |

---

## Tab States

| 상태 | 배경 | 텍스트 | 기타 |
|------|------|--------|------|
| default | transparent | `tee-ink-light` | - |
| hover | `tee-background` | `tee-ink-strong` | - |
| selected | transparent | `tee-accent-primary` | 하단 보더 표시 |
| focus | transparent | `tee-ink-strong` | ring-2 inset |
| disabled | transparent | `tee-ink-muted` | - |

---

## Modal/Dialog States

| 상태 | 오버레이 | 콘텐츠 |
|------|----------|--------|
| opening | fade-in (200ms) | scale(0.95) → scale(1), fade-in |
| open | bg-black/50 | 정상 표시 |
| closing | fade-out (150ms) | scale(1) → scale(0.95), fade-out |

---

## Loading States

### Skeleton

```tsx
<div className="animate-pulse">
  <div className="h-4 bg-tee-stone rounded w-3/4 mb-2" />
  <div className="h-4 bg-tee-stone rounded w-1/2" />
</div>
```

### Spinner

```tsx
<div className="animate-spin h-5 w-5 border-2 border-tee-accent-primary border-t-transparent rounded-full" />
```

### Button Loading

```tsx
<Button disabled className="relative">
  <span className="opacity-0">{children}</span>
  <Spinner className="absolute inset-0 m-auto" />
</Button>
```

---

## Empty States

```tsx
<EmptyState
  icon={<SearchIcon className="h-12 w-12 text-tee-ink-muted" />}
  title="검색 결과가 없습니다"
  description="다른 검색어로 다시 시도해 보세요."
  action={<Button variant="secondary">필터 초기화</Button>}
/>
```

---

## Error States

### Inline Error (Form Field)

```tsx
<div className="flex items-center gap-2 mt-1 text-sm text-tee-error">
  <ExclamationCircleIcon className="h-4 w-4" />
  <span>필수 입력 항목입니다</span>
</div>
```

### Page Error

```tsx
<ErrorState
  icon={<ExclamationTriangleIcon className="h-16 w-16 text-tee-error" />}
  title="오류가 발생했습니다"
  message="잠시 후 다시 시도해 주세요."
  action={<Button onClick={retry}>다시 시도</Button>}
/>
```

---

## Transition Standards

모든 상태 전환에는 다음 기준을 적용:

| 전환 유형 | Duration | Easing |
|----------|----------|--------|
| 색상 변화 | 150ms | ease-standard |
| transform | 200ms | ease-standard |
| 모달 열기/닫기 | 200ms | ease-standard-decelerate (열기), ease-standard-accelerate (닫기) |
| 페이지 전환 | 300ms | ease-standard |

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Accessibility Requirements

### Focus Visible

모든 인터랙티브 요소는 키보드 포커스 시 명확한 포커스 링을 표시:

```css
.element:focus-visible {
  outline: none;
  ring: 2px solid var(--tee-accent-primary);
  ring-offset: 2px;
}
```

### Disabled State

비활성화된 요소는:
- `aria-disabled="true"` 또는 `disabled` 속성
- 시각적으로 구분 (opacity-50)
- 커서 변경 (cursor-not-allowed)
- 클릭 이벤트 차단

### Loading State

로딩 중인 요소는:
- `aria-busy="true"` 속성
- 시각적 피드백 (스피너)
- 추가 클릭 차단

---

## References

- [design-tokens-reference.md](./design-tokens-reference.md)
- [002-ui-ux-color/spec.md](../../002-ui-ux-color/spec.md)
