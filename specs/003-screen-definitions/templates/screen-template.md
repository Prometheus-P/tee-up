# Screen: {화면명}

**Route**: `{라우트 경로}`
**Status**: Draft | Ready | Implemented
**Last Updated**: YYYY-MM-DD
**Priority**: P0 | P1 | P2 | P3
**Dependencies**: [다른 화면 참조]

---

## 1. 화면 개요

### 목적
{이 화면이 해결하는 사용자 니즈와 비즈니스 목표}

### 사용자 흐름
```
[이전 화면] → [현재 화면] → [다음 화면들]
```

### 접근 조건
- **인증 필요**: Yes | No
- **권한 수준**: guest | golfer | pro | admin
- **전제 조건**: {필요한 데이터나 상태}

---

## 2. 레이아웃 구조

### 와이어프레임

```
┌────────────────────────────────────────────────────────────┐
│ Header                                              [Nav]  │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  ┌──────────────────────────────────────────────────────┐ │
│  │                   Hero Section                        │ │
│  │                                                       │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                            │
│  ┌─────────────────────┐  ┌─────────────────────────────┐ │
│  │                     │  │                             │ │
│  │    Section A        │  │       Section B             │ │
│  │                     │  │                             │ │
│  └─────────────────────┘  └─────────────────────────────┘ │
│                                                            │
│  ┌──────────────────────────────────────────────────────┐ │
│  │                   Section C                           │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                            │
├────────────────────────────────────────────────────────────┤
│ Footer / CTA                                               │
└────────────────────────────────────────────────────────────┘
```

### 반응형 동작

| Breakpoint | 너비 | 레이아웃 변화 |
|------------|------|---------------|
| Mobile | < 640px | 단일 컬럼, 스택 레이아웃, 햄버거 메뉴 |
| Tablet (md) | 640-1024px | 2컬럼 그리드, 축소된 사이드바 |
| Desktop (lg+) | > 1024px | 전체 레이아웃, 확장된 네비게이션 |

---

## 3. 컴포넌트 목록

### 3.1 {컴포넌트명}

**위치**: {레이아웃 내 위치}
**컴포넌트 경로**: `@/components/{path}`
**타입**: Server Component | Client Component

#### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| title | string | Yes | - | 제목 텍스트 |
| variant | 'primary' \| 'secondary' | No | 'primary' | 스타일 변형 |
| disabled | boolean | No | false | 비활성화 여부 |
| onClick | () => void | No | - | 클릭 핸들러 |

#### 상태

| 상태 | 조건 | 시각적 변화 | 디자인 토큰 |
|------|------|-------------|-------------|
| default | 기본 상태 | - | bg-tee-accent-primary |
| hover | 마우스 오버 | 배경색 변화, scale(1.02) | bg-tee-accent-primary-hover |
| active | 클릭 중 | 배경색 어두워짐 | bg-tee-accent-primary-active |
| disabled | 비활성화 | opacity 50%, cursor not-allowed | bg-tee-accent-primary-disabled |
| loading | 로딩 중 | 스피너 표시, 텍스트 숨김 | - |
| focus | 키보드 포커스 | 링 표시 | ring-2 ring-tee-accent-primary |

#### 디자인 토큰 참조

- 배경: `var(--tee-surface)`
- 테두리: `var(--tee-stone)` / `1px solid`
- 텍스트: `var(--tee-ink-strong)`
- 액센트: `var(--tee-accent-primary)`
- 반경: `var(--radius-md)` / `0.5rem`
- 간격: `var(--space-4)` / `16px`

---

## 4. 데이터 요구사항

### Server Actions / API 호출

| Action | 파일 경로 | 호출 시점 | 반환 타입 |
|--------|----------|----------|----------|
| `getPageData` | `@/actions/{file}.ts` | 페이지 로드 | `ActionResult<PageData>` |
| `submitForm` | `@/actions/{file}.ts` | 폼 제출 | `ActionResult<void>` |

### 데이터 스키마

```typescript
interface PageData {
  id: string;
  title: string;
  // ... 필드 정의
}

interface FormInput {
  field1: string;
  field2: number;
}
```

### 로딩 상태

- **초기 로딩** (0-100ms): 아무것도 표시하지 않음
- **지연 로딩** (100ms+): Skeleton UI 표시
  - `<SkeletonCard />` for 카드 영역
  - `<SkeletonText />` for 텍스트 영역
- **완료**: fade-in 애니메이션으로 콘텐츠 표시

### 에러 상태

- **데이터 없음**: `<EmptyState icon={...} message="..." action={...} />`
- **네트워크 오류**: "연결을 확인해주세요" + 재시도 버튼
- **서버 오류**: "잠시 후 다시 시도해 주세요" + 재시도 버튼

---

## 5. 인터랙션 정의

### 5.1 {인터랙션명}

**트리거**: 클릭 | 호버 | 스크롤 | 폼 제출 | 키보드
**대상**: {컴포넌트 또는 요소}

#### 시나리오

1. **Given** {초기 상태}
2. **When** {사용자 액션}
3. **Then** {결과 상태}

#### 애니메이션

- **Duration**: `var(--duration-medium2)` / 250ms
- **Easing**: `var(--ease-standard)` / `cubic-bezier(0.2, 0, 0, 1)`
- **Properties**: transform, opacity, background-color

#### 예시

```css
.component {
  transition: all var(--duration-medium2) var(--ease-standard);
}

.component:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
```

---

## 6. 접근성 요구사항

### 키보드 내비게이션

- [ ] 모든 인터랙티브 요소 Tab으로 접근 가능
- [ ] 포커스 링 표시 (`focus-visible:ring-2 focus-visible:ring-tee-accent-primary`)
- [ ] 논리적 탭 순서 유지 (좌→우, 상→하)
- [ ] Escape로 모달/드롭다운 닫기
- [ ] Enter/Space로 버튼 활성화

### 스크린 리더

- [ ] 모든 이미지에 의미있는 alt 텍스트
- [ ] 아이콘 버튼에 aria-label 제공
- [ ] 동적 콘텐츠에 aria-live 적용
- [ ] 폼 필드에 연결된 label
- [ ] 에러 메시지에 aria-describedby 연결

### 색상 대비

- [ ] 텍스트 명암비 4.5:1 이상 (WCAG AA)
- [ ] 대형 텍스트 명암비 3:1 이상
- [ ] 포커스 상태 명암비 3:1 이상
- [ ] UI 컴포넌트 명암비 3:1 이상

### ARIA 속성

```tsx
// 예시
<button
  aria-label="프로필 메뉴 열기"
  aria-expanded={isOpen}
  aria-haspopup="menu"
>
  <UserIcon />
</button>

<div role="alert" aria-live="polite">
  {errorMessage}
</div>
```

---

## 7. 에러 케이스

| 에러 유형 | 조건 | HTTP 상태 | 사용자 피드백 |
|----------|------|----------|--------------|
| 인증 실패 | 미로그인 상태 | 401 | 로그인 페이지로 리디렉션 |
| 권한 없음 | 권한 레벨 부족 | 403 | "접근 권한이 없습니다" 메시지 |
| 데이터 없음 | resource === null | 404 | 404 페이지 또는 빈 상태 UI |
| 유효성 검사 | 입력 오류 | 400 | 필드별 인라인 에러 메시지 |
| 네트워크 오류 | fetch 실패 | - | "연결을 확인해주세요" + 재시도 |
| 서버 오류 | 5xx 응답 | 500 | "잠시 후 다시 시도해 주세요" |

### 에러 UI 패턴

```tsx
// 인라인 에러 (폼 필드)
<div className="text-tee-error text-sm mt-1">
  {errorMessage}
</div>

// 토스트 에러 (일시적)
<Toast variant="error">{errorMessage}</Toast>

// 페이지 레벨 에러
<ErrorState
  icon={<ExclamationCircleIcon />}
  title="오류가 발생했습니다"
  message={errorMessage}
  action={<Button onClick={retry}>다시 시도</Button>}
/>
```

---

## 8. 관련 화면

### 네비게이션 흐름

- **이전 화면**: [{화면명}](../카테고리/파일명.md)
- **다음 화면**: [{화면명}](../카테고리/파일명.md)

### 연관 화면

- [{화면명}](../카테고리/파일명.md) - 연관 이유
- [{화면명}](../카테고리/파일명.md) - 연관 이유

### 공유 컴포넌트

- `Header` - 모든 페이지에서 사용
- `Footer` - 마케팅 페이지에서 사용

---

## 9. 구현 메모

### TODO (미구현 페이지인 경우)

- [ ] 컴포넌트 구현 항목 1
- [ ] 컴포넌트 구현 항목 2
- [ ] Server Action 구현
- [ ] E2E 테스트 작성

### 기술적 고려사항

- {성능, 캐싱, 최적화 관련 메모}
- {특수 구현 사항}

### 변경 이력

| 날짜 | 변경 내용 | 작성자 |
|------|----------|--------|
| YYYY-MM-DD | 초안 작성 | - |
| YYYY-MM-DD | {변경 내용} | - |

---

## 참조

- [디자인 토큰](../contracts/design-tokens-reference.md)
- [컴포넌트 상태](../contracts/component-states.md)
- [반응형 브레이크포인트](../contracts/responsive-breakpoints.md)
