---
description: Create a new Next.js page with proper structure
---

# New Page Creation Workflow

Next.js App Router를 사용하여 새 페이지를 생성하는 워크플로우입니다.

## 1. 페이지 디렉토리 생성
페이지 이름을 결정하고 디렉토리를 생성합니다.

```bash
# 예시: /admin 페이지 생성
mkdir -p web/src/app/admin
```

## 2. 페이지 컴포넌트 작성
`page.tsx` 파일을 생성합니다.

**파일 위치:** `/web/src/app/[page-name]/page.tsx`

**기본 템플릿:**
```typescript
// Server Component (기본)
export default function PageName() {
  return (
    <div className="min-h-screen bg-calm-white">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-calm-obsidian mb-6">
          페이지 제목
        </h1>
        {/* 페이지 컨텐츠 */}
      </main>
    </div>
  );
}

// 메타데이터 (SEO)
export const metadata = {
  title: '페이지 제목 | TEE:UP',
  description: '페이지 설명',
};
```

**Client Component가 필요한 경우:**
```typescript
'use client';

import { useState } from 'react';

export default function PageName() {
  const [state, setState] = useState(false);
  
  return (
    <div className="min-h-screen bg-calm-white">
      {/* 인터랙티브 컨텐츠 */}
    </div>
  );
}
```

## 3. 레이아웃 추가 (선택사항)
페이지별 레이아웃이 필요한 경우 `layout.tsx`를 생성합니다.

**파일 위치:** `/web/src/app/[page-name]/layout.tsx`

```typescript
export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="page-layout">
      {/* 페이지별 헤더, 사이드바 등 */}
      {children}
    </div>
  );
}
```

## 4. 동적 라우트 (선택사항)
동적 파라미터가 필요한 경우 `[slug]` 패턴을 사용합니다.

**디렉토리 구조:** `/web/src/app/profile/[slug]/page.tsx`

```typescript
interface PageProps {
  params: {
    slug: string;
  };
}

export default function DynamicPage({ params }: PageProps) {
  return (
    <div>
      <h1>Profile: {params.slug}</h1>
    </div>
  );
}
```

## 5. 스타일링 가이드
- Tailwind CSS 유틸리티 클래스 사용
- Design System 색상 변수 활용:
  - `bg-calm-white`, `bg-calm-cloud`, `bg-calm-stone`
  - `text-calm-obsidian`, `text-calm-charcoal`
  - `bg-accent`, `text-accent`

## 6. 라우팅 확인
브라우저에서 새 페이지를 확인합니다:
```
http://localhost:3000/[page-name]
```

## 체크리스트
- [ ] 페이지 디렉토리 생성
- [ ] `page.tsx` 작성
- [ ] Server Component vs Client Component 결정
- [ ] 메타데이터 추가 (SEO)
- [ ] Design System 색상 사용
- [ ] 브라우저에서 확인
