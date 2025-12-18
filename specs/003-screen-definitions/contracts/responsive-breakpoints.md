# Responsive Breakpoints Contract

**Feature**: 003-screen-definitions
**Date**: 2025-12-18

---

## Overview

TEE:UP 프로젝트의 반응형 브레이크포인트 정의이다.
Tailwind CSS 기본 브레이크포인트를 사용하며, 모바일 우선(Mobile-First) 접근법을 따른다.

---

## Breakpoint Definitions

| Name | Tailwind Prefix | Min Width | Target Devices |
|------|-----------------|-----------|----------------|
| **Mobile** | (default) | 0px | 스마트폰 |
| **sm** | `sm:` | 640px | 큰 스마트폰, 작은 태블릿 |
| **md** | `md:` | 768px | 태블릿 (세로) |
| **lg** | `lg:` | 1024px | 태블릿 (가로), 작은 데스크톱 |
| **xl** | `xl:` | 1280px | 데스크톱 |
| **2xl** | `2xl:` | 1536px | 큰 데스크톱 |

---

## Mobile-First Approach

모든 스타일은 모바일부터 시작하여 점진적으로 확장:

```tsx
// 올바른 사용 (Mobile-First)
<div className="
  flex flex-col          // 모바일: 세로 스택
  md:flex-row            // 태블릿+: 가로 배열
  gap-4                  // 모바일: 16px 간격
  md:gap-6               // 태블릿+: 24px 간격
  lg:gap-8               // 데스크톱+: 32px 간격
">

// 잘못된 사용 (Desktop-First)
<div className="
  flex-row               // 데스크톱 먼저
  max-md:flex-col        // 모바일에서 덮어쓰기 (비권장)
">
```

---

## Layout Patterns by Breakpoint

### Navigation

| Breakpoint | Pattern | Components |
|------------|---------|------------|
| Mobile | 햄버거 메뉴 + 모바일 드로어 | `<MobileNav />` |
| md+ | 수평 네비게이션 바 | `<DesktopNav />` |
| lg+ | 확장된 네비게이션 + 액션 버튼 | `<DesktopNav />` + CTA |

```tsx
<nav>
  {/* 모바일: 햄버거 메뉴 */}
  <div className="md:hidden">
    <MobileNav />
  </div>

  {/* 태블릿+: 데스크톱 네비게이션 */}
  <div className="hidden md:flex">
    <DesktopNav />
  </div>
</nav>
```

### Grid System

| Breakpoint | Columns | Gap | Container Max Width |
|------------|---------|-----|---------------------|
| Mobile | 1 | 16px | 100% - 32px padding |
| sm | 2 | 16px | 640px |
| md | 2-3 | 24px | 768px |
| lg | 3-4 | 24px | 1024px |
| xl | 4-6 | 32px | 1280px |

```tsx
<div className="
  grid
  grid-cols-1
  sm:grid-cols-2
  lg:grid-cols-3
  xl:grid-cols-4
  gap-4
  md:gap-6
  lg:gap-8
">
  {items.map(item => <Card key={item.id} />)}
</div>
```

### Container

```tsx
<div className="
  container mx-auto
  px-4           // 모바일: 16px 패딩
  sm:px-6        // sm: 24px 패딩
  lg:px-8        // lg: 32px 패딩
">
  {children}
</div>
```

---

## Component Adaptations

### Card

| Breakpoint | Layout | Image | Content |
|------------|--------|-------|---------|
| Mobile | 세로 스택 | 상단, aspect-video | 하단, 전체 너비 |
| md+ | 가로 배열 | 좌측, 1/3 너비 | 우측, 2/3 너비 |

```tsx
<div className="
  flex flex-col
  md:flex-row
  overflow-hidden rounded-lg
">
  <div className="
    w-full md:w-1/3
    aspect-video md:aspect-square
  ">
    <Image />
  </div>
  <div className="p-4 md:p-6 flex-1">
    <Content />
  </div>
</div>
```

### Modal/Dialog

| Breakpoint | Style | Width | Position |
|------------|-------|-------|----------|
| Mobile | Bottom Sheet | 100% | 하단 고정, rounded-t-xl |
| md+ | Centered Modal | max-w-md | 중앙 |

```tsx
<Dialog>
  <DialogContent className="
    fixed inset-x-0 bottom-0
    md:inset-auto md:top-1/2 md:left-1/2
    md:-translate-x-1/2 md:-translate-y-1/2
    w-full md:max-w-md
    rounded-t-xl md:rounded-xl
    max-h-[85vh] md:max-h-[80vh]
  ">
    {content}
  </DialogContent>
</Dialog>
```

### Form

| Breakpoint | Layout | Fields |
|------------|--------|--------|
| Mobile | 단일 컬럼 | 전체 너비 |
| md+ | 2컬럼 그리드 | 50% 너비 (관련 필드 그룹) |

```tsx
<form className="space-y-4">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <Input label="이름" />
    <Input label="연락처" />
  </div>
  <Textarea label="메시지" className="col-span-full" />
</form>
```

### Table

| Breakpoint | Style |
|------------|-------|
| Mobile | 카드 레이아웃 또는 수평 스크롤 |
| md+ | 전통적인 테이블 |

```tsx
{/* 모바일: 카드 레이아웃 */}
<div className="md:hidden space-y-4">
  {data.map(row => (
    <Card key={row.id}>
      <CardHeader>{row.title}</CardHeader>
      <CardContent>
        <dl className="grid grid-cols-2 gap-2 text-sm">
          <dt className="text-tee-ink-muted">상태</dt>
          <dd>{row.status}</dd>
          {/* ... */}
        </dl>
      </CardContent>
    </Card>
  ))}
</div>

{/* 태블릿+: 테이블 */}
<div className="hidden md:block overflow-x-auto">
  <Table>{/* ... */}</Table>
</div>
```

---

## Typography Scaling

| Element | Mobile | md | lg |
|---------|--------|----|----|
| h1 | 2rem (32px) | 2.5rem (40px) | 3rem (48px) |
| h2 | 1.5rem (24px) | 1.875rem (30px) | 2.25rem (36px) |
| h3 | 1.25rem (20px) | 1.5rem (24px) | 1.5rem (24px) |
| body | 1rem (16px) | 1rem (16px) | 1rem (16px) |
| caption | 0.875rem (14px) | 0.875rem (14px) | 0.875rem (14px) |

```tsx
<h1 className="
  text-2xl        // 32px
  md:text-3xl     // 40px 근사
  lg:text-h1      // 48px
  font-semibold
">
  페이지 제목
</h1>
```

---

## Spacing Scaling

| Context | Mobile | md | lg |
|---------|--------|----|----|
| 페이지 여백 | 16px | 24px | 32px |
| 섹션 간격 | 32px | 48px | 64px |
| 카드 패딩 | 16px | 20px | 24px |
| 버튼 패딩 | 12px 16px | 12px 20px | 12px 24px |

```tsx
<section className="
  py-8            // 32px
  md:py-12        // 48px
  lg:py-16        // 64px
  px-4
  md:px-6
  lg:px-8
">
```

---

## Hide/Show Utilities

```tsx
// 특정 브레이크포인트에서만 표시
<div className="hidden md:block">     {/* md 이상에서만 표시 */}
<div className="md:hidden">           {/* md 미만에서만 표시 */}
<div className="hidden lg:block">     {/* lg 이상에서만 표시 */}
<div className="lg:hidden">           {/* lg 미만에서만 표시 */}

// 범위 지정
<div className="hidden md:block lg:hidden">  {/* md~lg 사이에서만 */}
```

---

## Touch Targets

모바일에서 터치 타겟은 최소 44x44px:

```tsx
<button className="
  min-h-[44px] min-w-[44px]
  md:min-h-0 md:min-w-0
  p-3 md:p-2
">
  <Icon />
</button>
```

---

## Debugging

개발 중 현재 브레이크포인트 확인:

```tsx
{process.env.NODE_ENV === 'development' && (
  <div className="fixed bottom-4 right-4 z-50 px-2 py-1 bg-black text-white text-xs rounded">
    <span className="sm:hidden">Mobile</span>
    <span className="hidden sm:inline md:hidden">sm</span>
    <span className="hidden md:inline lg:hidden">md</span>
    <span className="hidden lg:inline xl:hidden">lg</span>
    <span className="hidden xl:inline 2xl:hidden">xl</span>
    <span className="hidden 2xl:inline">2xl</span>
  </div>
)}
```

---

## Testing Checklist

각 화면 구현 후 확인:

- [ ] 320px (iPhone SE)
- [ ] 375px (iPhone 12/13)
- [ ] 390px (iPhone 14)
- [ ] 768px (iPad)
- [ ] 1024px (iPad Pro / 작은 데스크톱)
- [ ] 1280px (데스크톱)
- [ ] 1440px+ (큰 데스크톱)

---

## References

- [Tailwind CSS Responsive Design](https://tailwindcss.com/docs/responsive-design)
- [design-tokens-reference.md](./design-tokens-reference.md)
