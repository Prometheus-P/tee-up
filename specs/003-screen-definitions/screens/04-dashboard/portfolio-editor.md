# Screen: Portfolio Editor (포트폴리오 에디터)

**Route**: `/dashboard/portfolio`
**Status**: Unimplemented
**Last Updated**: 2025-12-18
**Priority**: P0 (핵심 비즈니스 기능)
**Dependencies**: Dashboard Layout, Portfolio Templates, Server Actions

---

## 1. 화면 개요

### 목적
프로가 자신의 포트폴리오 페이지를 커스터마이징하는 핵심 에디터 화면이다.
템플릿 선택, 섹션 편집, 실시간 미리보기를 통해 개인 브랜드를 구축할 수 있다.

### 사용자 흐름
```
/dashboard → /dashboard/portfolio → 편집 → 저장 → /[slug] (미리보기)
```

### 접근 조건
- **인증 필요**: Yes
- **권한 수준**: pro (프로 전용)
- **전제 조건**:
  - 프로 승인 완료 (`pro_profiles.is_approved = true`)
  - 프로필 기본 정보 입력 완료

---

## 2. 레이아웃 구조

### 와이어프레임

```
┌────────────────────────────────────────────────────────────────────────────┐
│ Dashboard Header                                    [프로필] [로그아웃]    │
├─────────────────┬──────────────────────────────────────────────────────────┤
│                 │                                                          │
│  Sidebar        │  ┌────────────────────────────────────────────────────┐ │
│  ────────       │  │  Editor Toolbar                    [미리보기] [저장] │ │
│  □ 대시보드     │  ├────────────────────────────────────────────────────┤ │
│  ■ 포트폴리오   │  │                                                    │ │
│  □ 리드         │  │  ┌─────────────────┐  ┌─────────────────────────┐ │ │
│  □ 컨시어지     │  │  │  Template       │  │                         │ │
│  □ 설정         │  │  │  Selector       │  │     Live Preview        │ │
│                 │  │  │                 │  │     (iframe or          │ │
│                 │  │  │  [Visual]       │  │      split view)        │ │
│                 │  │  │  [Curriculum]   │  │                         │ │
│                 │  │  │  [Social]       │  │                         │ │
│                 │  │  └─────────────────┘  │                         │ │
│                 │  │                        │                         │ │
│                 │  │  ┌─────────────────┐  │                         │ │
│                 │  │  │  Section Editor │  │                         │ │
│                 │  │  │                 │  │                         │ │
│                 │  │  │  ☰ Hero         │  │                         │ │
│                 │  │  │  ☰ Stats        │  │                         │ │
│                 │  │  │  ☰ Gallery      │  │                         │ │
│                 │  │  │  ☰ Testimonials │  │                         │ │
│                 │  │  │  ☰ Contact      │  │                         │ │
│                 │  │  │                 │  │                         │ │
│                 │  │  │  [+ 섹션 추가]  │  │                         │ │
│                 │  │  └─────────────────┘  └─────────────────────────┘ │ │
│                 │  │                                                    │ │
│                 │  └────────────────────────────────────────────────────┘ │
│                 │                                                          │
└─────────────────┴──────────────────────────────────────────────────────────┘
```

### 반응형 동작

| Breakpoint | 너비 | 레이아웃 변화 |
|------------|------|---------------|
| Mobile | < 768px | 단일 컬럼, 탭으로 Editor/Preview 전환, 사이드바 숨김 |
| Tablet (md) | 768-1024px | 2컬럼 (Editor 40% / Preview 60%), 축소된 사이드바 |
| Desktop (lg+) | > 1024px | 전체 레이아웃, 사이드바 + Editor + Preview |

---

## 3. 컴포넌트 목록

### 3.1 TemplateSelector

**위치**: Editor Panel 상단
**컴포넌트 경로**: `@/components/portfolio/editor/TemplateSelector.tsx`
**타입**: Client Component

#### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| currentTemplate | 'visual' \| 'curriculum' \| 'social' | Yes | - | 현재 선택된 템플릿 |
| onSelect | (template: string) => void | Yes | - | 템플릿 선택 핸들러 |
| disabled | boolean | No | false | 저장 중 비활성화 |

#### 상태

| 상태 | 조건 | 시각적 변화 |
|------|------|-------------|
| default | 기본 상태 | 3개 템플릿 카드 표시 |
| selected | 현재 템플릿 | 선택된 카드에 border-tee-accent-primary, 체크 아이콘 |
| hover | 마우스 오버 | scale(1.02), shadow-md |
| loading | 템플릿 변경 중 | 선택된 카드에 스피너 |

#### 템플릿 옵션

| Template | Name | Description | Icon |
|----------|------|-------------|------|
| visual | 비주얼 | 이미지 중심 매거진 스타일 | ImageIcon |
| curriculum | 커리큘럼 | 교육 프로그램, 가격표, FAQ | BookOpenIcon |
| social | 소셜 | SNS 통합, 피드 임베드 | ShareIcon |

---

### 3.2 SectionList (Draggable)

**위치**: Editor Panel 중앙
**컴포넌트 경로**: `@/components/portfolio/editor/SectionList.tsx`
**타입**: Client Component

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| sections | PortfolioSection[] | Yes | 현재 섹션 목록 |
| onReorder | (newOrder: string[]) => void | Yes | 순서 변경 핸들러 |
| onEdit | (sectionId: string) => void | Yes | 섹션 편집 핸들러 |
| onDelete | (sectionId: string) => void | Yes | 섹션 삭제 핸들러 |
| onToggleVisibility | (sectionId: string) => void | Yes | 표시/숨김 토글 |

#### 섹션 항목 UI

```
┌─────────────────────────────────────────────────────┐
│ ☰  [Hero Section]                      [👁] [✎] [🗑] │
│     히어로 이미지 및 제목 영역                        │
└─────────────────────────────────────────────────────┘
```

- ☰: 드래그 핸들
- 👁: 표시/숨김 토글
- ✎: 편집 버튼
- 🗑: 삭제 버튼 (Danger Zone)

#### 드래그 앤 드롭

- 라이브러리: `@dnd-kit/core` 또는 `react-beautiful-dnd`
- 드래그 중: opacity-50, 드래그 위치 표시
- 드롭 시: 즉시 순서 업데이트 + 서버 저장

---

### 3.3 SectionEditor (Modal)

**위치**: 모달 오버레이
**컴포넌트 경로**: `@/components/portfolio/editor/SectionEditor.tsx`
**타입**: Client Component

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| section | PortfolioSection | Yes | 편집할 섹션 |
| isOpen | boolean | Yes | 모달 열림 상태 |
| onClose | () => void | Yes | 닫기 핸들러 |
| onSave | (content: SectionContent) => void | Yes | 저장 핸들러 |

#### 섹션별 에디터 폼

| Section Type | 편집 가능 필드 |
|--------------|----------------|
| hero | heroImage (업로드), title, subtitle, location |
| stats | stats[] (label, value, detail) |
| gallery | images[] (업로드, 최대 8개) |
| testimonials | testimonials[] (name, quote, rating) |
| curriculum | programs[] (name, description, duration) |
| pricing | tiers[] (name, price, features[]) |
| faq | faqs[] (question, answer) |
| contact | openChatUrl, paymentLink, bookingUrl |

---

### 3.4 ImageUploader

**위치**: SectionEditor 내부
**컴포넌트 경로**: `@/components/portfolio/editor/ImageUploader.tsx`
**타입**: Client Component

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| value | string \| string[] | No | 현재 이미지 URL(s) |
| onChange | (urls: string[]) => void | Yes | 업로드 완료 핸들러 |
| multiple | boolean | No | 다중 업로드 허용 |
| maxFiles | number | No | 최대 파일 수 (default: 1) |
| accept | string | No | 허용 파일 타입 (default: 'image/*') |

#### 업로드 Flow

1. 파일 선택 (드래그 앤 드롭 또는 클릭)
2. 클라이언트 측 유효성 검사 (크기, 타입)
3. Supabase Storage 업로드
4. Public URL 반환
5. 미리보기 표시

#### 상태

| 상태 | 시각적 표시 |
|------|------------|
| empty | 점선 테두리 + 업로드 아이콘 + "이미지 업로드" 텍스트 |
| dragover | border-tee-accent-primary, 배경색 변경 |
| uploading | 프로그레스 바 + 취소 버튼 |
| uploaded | 이미지 미리보기 + 삭제 버튼 |
| error | 에러 메시지 + 재시도 버튼 |

---

### 3.5 LivePreview

**위치**: Editor Panel 우측 (데스크톱) / 탭 전환 (모바일)
**컴포넌트 경로**: `@/components/portfolio/editor/LivePreview.tsx`
**타입**: Client Component

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| profileData | ProProfile | Yes | 프로필 데이터 |
| sections | PortfolioSection[] | Yes | 섹션 목록 |
| template | string | Yes | 템플릿 타입 |

#### 구현 방식

**Option A: Inline Rendering (권장)**
- 동일한 템플릿 컴포넌트를 스케일 다운하여 표시
- 실시간 업데이트 가능
- 스크롤 가능한 컨테이너

**Option B: iframe**
- `/[slug]/preview` 경로를 iframe으로 로드
- 완전한 격리
- 약간의 지연 존재

#### 상태

| 상태 | 시각적 표시 |
|------|------------|
| loading | 스켈레톤 UI |
| ready | 실제 포트폴리오 미리보기 |
| updating | 미세한 opacity 변화 (0.8) |

---

### 3.6 EditorToolbar

**위치**: Editor Panel 상단
**컴포넌트 경로**: `@/components/portfolio/editor/EditorToolbar.tsx`
**타입**: Client Component

#### 버튼

| Button | Icon | Action | 조건 |
|--------|------|--------|------|
| 미리보기 | ExternalLinkIcon | 새 탭에서 `/[slug]` 열기 | 항상 |
| 저장 | CheckIcon | 변경사항 저장 | hasChanges |
| 실행 취소 | ArrowUturnLeftIcon | 마지막 변경 취소 | canUndo |
| 다시 실행 | ArrowUturnRightIcon | 취소 복원 | canRedo |

---

## 4. 데이터 요구사항

### Server Actions

| Action | 파일 경로 | 호출 시점 | 반환 타입 |
|--------|----------|----------|----------|
| `getProProfile` | `@/actions/profiles.ts` | 페이지 로드 | `ActionResult<ProProfile>` |
| `getPortfolioSections` | `@/actions/portfolios.ts` | 페이지 로드 | `ActionResult<PortfolioSection[]>` |
| `updatePortfolioTheme` | `@/actions/portfolios.ts` | 템플릿 변경 | `ActionResult<void>` |
| `updatePortfolioSection` | `@/actions/portfolios.ts` | 섹션 저장 | `ActionResult<PortfolioSection>` |
| `createPortfolioSection` | `@/actions/portfolios.ts` | 섹션 추가 | `ActionResult<PortfolioSection>` |
| `deletePortfolioSection` | `@/actions/portfolios.ts` | 섹션 삭제 | `ActionResult<void>` |
| `reorderPortfolioSections` | `@/actions/portfolios.ts` | 순서 변경 | `ActionResult<void>` |

### 데이터 스키마

```typescript
interface ProProfile {
  id: string;
  user_id: string;
  slug: string;
  title: string;
  bio: string | null;
  theme_type: 'visual' | 'curriculum' | 'social';
  hero_image_url: string | null;
  payment_link: string | null;
  open_chat_url: string | null;
  is_approved: boolean;
  // ... 기타 필드
}

interface PortfolioSection {
  id: string;
  pro_profile_id: string;
  section_type: string;
  title: string | null;
  content: Record<string, unknown>;
  display_order: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}

interface EditorState {
  profile: ProProfile;
  sections: PortfolioSection[];
  selectedTemplate: string;
  editingSection: PortfolioSection | null;
  hasChanges: boolean;
  isSaving: boolean;
}
```

### 로딩 상태

- **초기 로딩**: 전체 페이지 스켈레톤 (TemplateSelector + SectionList + Preview)
- **섹션 로딩**: 개별 섹션 카드 스켈레톤
- **저장 중**: 저장 버튼 스피너 + 전체 UI disabled

### 에러 상태

- **데이터 로드 실패**: ErrorState + 재시도 버튼
- **저장 실패**: Toast 에러 메시지 + 재시도 옵션
- **이미지 업로드 실패**: 인라인 에러 + 재시도 버튼

---

## 5. 인터랙션 정의

### 5.1 템플릿 변경

**트리거**: TemplateSelector 카드 클릭
**대상**: 전체 포트폴리오

#### 시나리오

1. **Given** 프로가 포트폴리오 에디터에 있을 때
2. **When** 다른 템플릿 카드를 클릭하면
3. **Then** 확인 모달이 표시된다 ("템플릿을 변경하면 일부 섹션이 변경됩니다. 계속하시겠습니까?")
4. **When** 확인을 클릭하면
5. **Then** 템플릿이 변경되고, 기본 섹션이 초기화되며, LivePreview가 업데이트된다

#### 애니메이션

- 템플릿 카드 전환: fade (200ms)
- LivePreview 업데이트: fade-in (300ms)

---

### 5.2 섹션 순서 변경

**트리거**: 드래그 핸들 드래그
**대상**: SectionList

#### 시나리오

1. **Given** 프로가 섹션 목록을 보고 있을 때
2. **When** 드래그 핸들을 클릭하고 드래그하면
3. **Then** 해당 섹션이 반투명해지고, 드롭 위치가 표시된다
4. **When** 새 위치에 드롭하면
5. **Then** 섹션 순서가 즉시 업데이트되고, 서버에 자동 저장된다

#### 애니메이션

- 드래그 시작: opacity 0.5, scale(1.02)
- 드롭 위치 표시: 파란색 라인
- 드롭 완료: 위치 이동 애니메이션 (200ms)

---

### 5.3 섹션 편집

**트리거**: 섹션 카드의 편집 버튼 클릭
**대상**: SectionEditor 모달

#### 시나리오

1. **Given** 프로가 섹션 목록을 보고 있을 때
2. **When** 편집 버튼을 클릭하면
3. **Then** SectionEditor 모달이 열리고, 해당 섹션 데이터가 폼에 채워진다
4. **When** 폼을 수정하고 저장을 클릭하면
5. **Then** 섹션이 업데이트되고, 모달이 닫히며, LivePreview가 즉시 반영된다

---

### 5.4 이미지 업로드

**트리거**: ImageUploader 클릭 또는 드래그
**대상**: ImageUploader 컴포넌트

#### 시나리오

1. **Given** 프로가 SectionEditor에서 이미지를 업로드하려 할 때
2. **When** 이미지를 드래그하거나 클릭해서 선택하면
3. **Then** 업로드 진행 상태가 표시된다 (프로그레스 바)
4. **When** 업로드가 완료되면
5. **Then** 미리보기가 표시되고, URL이 폼에 저장된다

#### 제한사항

- 최대 파일 크기: 5MB
- 허용 형식: JPEG, PNG, WebP
- 권장 크기: Hero 1920x1080, Gallery 800x800

---

### 5.5 자동 저장 (선택적)

**트리거**: 변경 후 2초 경과
**대상**: 전체 에디터 상태

#### 시나리오

1. **Given** 프로가 에디터에서 변경을 했을 때
2. **When** 2초 동안 추가 변경이 없으면
3. **Then** 변경사항이 자동으로 서버에 저장된다
4. **Then** "저장됨" 표시가 잠시 나타난다

---

## 6. 접근성 요구사항

### 키보드 내비게이션

- [ ] Tab으로 모든 버튼, 카드, 폼 필드 접근 가능
- [ ] Enter로 템플릿 카드 선택
- [ ] Arrow keys로 섹션 목록 내비게이션
- [ ] Escape로 모달 닫기
- [ ] Ctrl/Cmd + S로 저장 단축키

### 스크린 리더

- [ ] 템플릿 카드: role="radio", aria-checked
- [ ] 섹션 목록: role="listbox", aria-label="포트폴리오 섹션 목록"
- [ ] 드래그 핸들: aria-label="드래그하여 순서 변경"
- [ ] 저장 상태: aria-live="polite"로 "저장 중...", "저장 완료" 알림

### 색상 대비

- [ ] 모든 텍스트 4.5:1 이상
- [ ] 선택된 템플릿 border 3:1 이상
- [ ] 포커스 링 3:1 이상

---

## 7. 에러 케이스

| 에러 유형 | 조건 | 사용자 피드백 |
|----------|------|--------------|
| 프로 미승인 | is_approved = false | "프로 승인 후 포트폴리오를 편집할 수 있습니다" + 대시보드 링크 |
| 데이터 로드 실패 | 서버 오류 | ErrorState + 재시도 버튼 |
| 이미지 업로드 실패 | 크기 초과/타입 오류 | 인라인 에러 메시지 |
| 저장 실패 | 네트워크/서버 오류 | Toast 에러 + "다시 시도" |
| 섹션 삭제 실패 | 서버 오류 | Toast 에러 + 상태 복원 |
| 동시 편집 충돌 | 다른 세션에서 수정 | "최신 버전으로 새로고침하세요" 모달 |

---

## 8. 관련 화면

### 네비게이션 흐름

- **이전 화면**: [Dashboard Home](./dashboard-home.md)
- **다음 화면**: [Pro Portfolio](../03-portfolio/pro-portfolio.md) (미리보기)

### 연관 화면

- [Settings](./settings.md) - 프로필 기본 정보 관리
- [Leads](./leads.md) - 포트폴리오에서 생성된 리드 확인

### 공유 컴포넌트

- Dashboard Layout, Sidebar, Header
- Dialog, Button, Input from `@/components/ui/`
- PortfolioRenderer from `@/components/portfolio/`

---

## 9. 구현 메모

### TODO

- [ ] `@/components/portfolio/editor/` 디렉토리 생성
- [ ] TemplateSelector 컴포넌트 구현
- [ ] SectionList (with drag & drop) 구현
- [ ] SectionEditor 모달 구현
- [ ] ImageUploader 컴포넌트 구현
- [ ] LivePreview 컴포넌트 구현
- [ ] EditorToolbar 구현
- [ ] `/dashboard/portfolio/page.tsx` 페이지 구현
- [ ] E2E 테스트 작성 (`e2e/portfolio-editor.spec.ts`)

### 기술적 고려사항

- **드래그 앤 드롭**: `@dnd-kit/core` 권장 (더 가볍고 접근성 지원)
- **이미지 최적화**: 업로드 시 리사이즈 고려 (sharp 또는 클라이언트)
- **상태 관리**: React state + Server Actions (별도 상태 라이브러리 불필요)
- **실시간 미리보기**: 디바운스 적용 (300ms)

### 변경 이력

| 날짜 | 변경 내용 | 작성자 |
|------|----------|--------|
| 2025-12-18 | 초안 작성 | - |

---

## 참조

- [디자인 토큰](../../contracts/design-tokens-reference.md)
- [컴포넌트 상태](../../contracts/component-states.md)
- [포트폴리오 Server Actions](../../../../web/src/actions/portfolios.ts)
- [포트폴리오 템플릿](../../../../web/src/components/portfolio/templates/)
