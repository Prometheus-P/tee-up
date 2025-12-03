---
description: Create a reusable React component
---

# Component Creation Workflow

재사용 가능한 React 컴포넌트를 생성하는 워크플로우입니다.

## 1. 컴포넌트 위치 결정

### 공통 컴포넌트
여러 페이지에서 사용되는 컴포넌트
```
/web/src/app/components/
├── ui/              # UI 프리미티브 (Button, Input, Card)
└── features/        # 기능 컴포넌트 (ProCard, BookingModal)
```

### 페이지 전용 컴포넌트
특정 페이지에서만 사용되는 컴포넌트
```
/web/src/app/[page]/components/
```

## 2. Server Component vs Client Component 결정

### Server Component 사용 (기본)
- 데이터 페칭
- 정적 컨텐츠 렌더링
- SEO가 중요한 컨텐츠

```typescript
// Server Component (기본)
interface ProCardProps {
  profile: IProProfile;
}

export default function ProCard({ profile }: ProCardProps) {
  return (
    <div className="card">
      <h2>{profile.name}</h2>
      <p>{profile.bio}</p>
    </div>
  );
}
```

### Client Component 사용
- 상태 관리 (useState, useReducer)
- 이벤트 핸들러 (onClick, onChange)
- 브라우저 API 사용 (localStorage, window)
- useEffect 사용

```typescript
'use client';

import { useState } from 'react';

interface BookingModalProps {
  proId: string;
  onClose: () => void;
}

export default function BookingModal({ proId, onClose }: BookingModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  const handleSubmit = () => {
    // 예약 로직
  };
  
  return (
    <div className="modal">
      {/* 모달 컨텐츠 */}
      <button onClick={handleSubmit}>예약하기</button>
    </div>
  );
}
```

## 3. 컴포넌트 구조

### 기본 템플릿
```typescript
// 1. Imports
import { ReactNode } from 'react';
import { IProProfile } from '@/types';

// 2. Props 타입 정의
interface ComponentNameProps {
  title: string;
  description?: string;
  children?: ReactNode;
  onAction?: () => void;
}

// 3. 컴포넌트 함수
export default function ComponentName({
  title,
  description,
  children,
  onAction
}: ComponentNameProps) {
  // 3.1 Hooks (Client Component인 경우)
  // const [state, setState] = useState();
  
  // 3.2 Event handlers
  const handleClick = () => {
    onAction?.();
  };
  
  // 3.3 Render
  return (
    <div className="component-wrapper">
      <h2 className="text-2xl font-bold text-calm-obsidian">
        {title}
      </h2>
      {description && (
        <p className="text-calm-charcoal mt-2">
          {description}
        </p>
      )}
      {children}
      <button onClick={handleClick} className="btn-primary">
        액션
      </button>
    </div>
  );
}
```

## 4. 스타일링 가이드

### Tailwind CSS 클래스 사용
```typescript
<div className="
  flex items-center justify-between
  px-4 py-2
  bg-calm-cloud
  rounded-lg
  hover:bg-calm-stone
  transition-colors
">
```

### Design System 색상 변수
```typescript
// 배경색
bg-calm-white      // #FAFAF9 - 페이지 배경
bg-calm-cloud      // #F4F4F2 - 카드 배경
bg-calm-stone      // #E8E8E5 - 테두리

// 텍스트 색상
text-calm-obsidian // #1A1A17 - 제목
text-calm-charcoal // #52524E - 본문

// 액센트 색상
bg-accent          // #3B82F6 - Primary CTA
text-accent        // #3B82F6 - 링크
```

### 재사용 가능한 CSS 클래스
`global.css`에 정의된 클래스 사용:
```typescript
<button className="btn-primary">
  Primary Button
</button>

<div className="card">
  Card Content
</div>

<input className="input" />
```

## 5. Props 네이밍 컨벤션

| Props 타입 | 네이밍 | 예시 |
|------------|--------|------|
| 이벤트 핸들러 | `on[Event]` | `onClick`, `onSubmit`, `onChange` |
| Boolean | `is[State]`, `has[Feature]` | `isOpen`, `hasError`, `isLoading` |
| 렌더 함수 | `render[Element]` | `renderHeader`, `renderFooter` |
| 데이터 | 명사 | `profile`, `user`, `items` |

## 6. JSDoc 주석 추가

```typescript
/**
 * 프로 골퍼 카드 컴포넌트
 * 
 * @param profile - 프로 골퍼 프로필 데이터
 * @param onBook - 예약 버튼 클릭 시 호출되는 콜백
 * 
 * @example
 * ```tsx
 * <ProCard 
 *   profile={profileData} 
 *   onBook={() => console.log('Book clicked')}
 * />
 * ```
 */
export default function ProCard({ profile, onBook }: ProCardProps) {
  // ...
}
```

## 7. 컴포넌트 테스트 (선택사항)

**파일 위치:** `/web/src/app/components/__tests__/ComponentName.test.tsx`

```typescript
import { render, screen } from '@testing-library/react';
import ComponentName from '../ComponentName';

describe('ComponentName', () => {
  it('should render title', () => {
    render(<ComponentName title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });
});
```

## 체크리스트
- [ ] 컴포넌트 위치 결정 (공통 vs 페이지 전용)
- [ ] Server Component vs Client Component 선택
- [ ] Props 타입 정의 (TypeScript interface)
- [ ] Tailwind CSS + Design System 색상 사용
- [ ] JSDoc 주석 추가
- [ ] 재사용성 고려 (props 설계)
- [ ] 브라우저에서 확인
