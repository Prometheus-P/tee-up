# Screen: Studio Join Invalid (스튜디오 가입 실패)

**Route**: `/studio/join/invalid`
**Status**: Not Implemented
**Last Updated**: 2025-12-18
**Priority**: P2
**Dependencies**: Studios System

---

## 1. 화면 개요

### 목적
잘못된 초대 코드로 스튜디오 가입을 시도했을 때 에러를 안내한다.

### 사용자 흐름
```
잘못된 초대 링크 클릭 → /studio/join/invalid
```

### 접근 조건
- **인증 필요**: No
- **권한 수준**: guest

---

## 2. 레이아웃 구조

```
┌────────────────────────────────────────────────────────────────┐
│                                                                 │
│                          ❌                                     │
│                                                                 │
│                 초대 링크가 유효하지 않습니다                       │
│                                                                 │
│         이 초대 링크는 만료되었거나 잘못된 링크입니다.                │
│                                                                 │
│                                                                 │
│                      [홈으로 돌아가기]                            │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  다음을 확인해보세요:                                             │
│  • 링크가 올바르게 복사되었는지 확인해주세요                         │
│  • 스튜디오 관리자에게 새 초대 링크를 요청해주세요                    │
│  • 이미 다른 스튜디오에 가입되어 있지 않은지 확인해주세요             │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

---

## 3. 주요 컴포넌트

### 3.1 ErrorIcon

**에러 아이콘**

| Property | Value |
|----------|-------|
| 아이콘 | ❌ 또는 링크 깨진 아이콘 |
| 크기 | 64px |
| 색상 | `--tee-error` (#D32F2F) |

### 3.2 ErrorMessage

**에러 메시지**

| Element | Description |
|---------|-------------|
| 제목 | "초대 링크가 유효하지 않습니다" |
| 설명 | 에러 원인 설명 |

### 3.3 HelpSection

**도움말**

| Element | Description |
|---------|-------------|
| 제목 | "다음을 확인해보세요:" |
| 항목 | 문제 해결 방법 목록 |

---

## 4. 에러 유형

| 에러 코드 | 메시지 | 설명 |
|----------|--------|------|
| `INVALID_CODE` | 잘못된 초대 코드 | 존재하지 않는 코드 |
| `EXPIRED` | 초대 링크 만료 | 기한이 지난 링크 |
| `STUDIO_DELETED` | 스튜디오 삭제됨 | 더 이상 존재하지 않는 스튜디오 |
| `ALREADY_MEMBER` | 이미 가입됨 | 이미 해당 스튜디오 멤버 |

---

## 5. 구현 가이드

### 5.1 컴포넌트 구조

```tsx
// app/studio/join/invalid/page.tsx
export default function StudioJoinInvalidPage({
  searchParams,
}: {
  searchParams: { reason?: string };
}) {
  const errorMessages = {
    INVALID_CODE: '잘못된 초대 코드입니다.',
    EXPIRED: '초대 링크가 만료되었습니다.',
    STUDIO_DELETED: '해당 스튜디오가 더 이상 존재하지 않습니다.',
    ALREADY_MEMBER: '이미 가입된 스튜디오입니다.',
  };

  const reason = searchParams.reason as keyof typeof errorMessages;
  const message = errorMessages[reason] || '초대 링크가 유효하지 않습니다.';

  return (
    <ErrorPage
      icon="link-broken"
      title="초대 링크가 유효하지 않습니다"
      description={message}
      actions={[
        { label: '홈으로 돌아가기', href: '/' }
      ]}
    />
  );
}
```

---

## 6. 접근성 요구사항

- [ ] 에러 메시지: `role="alert"`
- [ ] 도움말: 구조화된 리스트

---

## 7. 관련 화면

- **이전 화면**: [Studio Join](./studio-join.md)
- **연관 화면**: [Error Pages](./error-pages.md)
