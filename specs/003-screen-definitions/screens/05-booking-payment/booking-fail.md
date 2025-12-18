# Screen: Booking Fail (예약 실패)

**Route**: `/booking/fail`
**Status**: Unimplemented
**Last Updated**: 2025-12-18
**Priority**: P1
**Dependencies**: Booking System

---

## 1. 화면 개요

### 목적
예약 과정에서 오류가 발생했을 때 사용자에게 명확한 피드백과 다음 행동을 안내한다.

### 사용자 흐름
```
/[slug] → 예약 시도 → /booking/fail → 재시도 또는 홈으로
```

### 접근 조건
- **인증 필요**: No
- **권한 수준**: guest
- **전제 조건**: 예약 실패 발생

---

## 2. 레이아웃 구조

### 와이어프레임

```
┌────────────────────────────────────────────────────────────┐
│ Header (minimal)                                           │
├────────────────────────────────────────────────────────────┤
│                                                            │
│                    ┌──────────────────┐                    │
│                    │                  │                    │
│                    │     ❌ 아이콘     │                    │
│                    │                  │                    │
│                    │  예약에 실패했습니다│                    │
│                    │                  │                    │
│                    │  오류 원인:        │                    │
│                    │  "{에러 메시지}"   │                    │
│                    │                  │                    │
│                    │  ┌────────────┐  │                    │
│                    │  │  다시 시도  │  │                    │
│                    │  └────────────┘  │                    │
│                    │                  │                    │
│                    │  또는            │                    │
│                    │                  │                    │
│                    │  [홈으로 돌아가기] │                    │
│                    │  [고객센터 문의]   │                    │
│                    │                  │                    │
│                    └──────────────────┘                    │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

## 3. 컴포넌트 목록

### 3.1 FailureState

**실패 상태 컴포넌트**

| Prop | Type | Description |
|------|------|-------------|
| icon | ReactNode | XCircleIcon (빨간색) |
| title | string | "예약에 실패했습니다" |
| message | string | 에러 원인 |
| retryUrl | string | 재시도 URL |
| homeUrl | string | 홈 URL |

### 3.2 에러 메시지 매핑

| Error Code | User Message |
|------------|--------------|
| SLOT_UNAVAILABLE | "선택한 시간대가 이미 예약되었습니다" |
| PRO_UNAVAILABLE | "현재 프로가 예약을 받지 않고 있습니다" |
| PAYMENT_REQUIRED | "예약금 결제가 필요합니다" |
| NETWORK_ERROR | "네트워크 연결을 확인해주세요" |
| SERVER_ERROR | "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요" |
| UNKNOWN | "알 수 없는 오류가 발생했습니다" |

---

## 4. 데이터 요구사항

### URL Query Parameters

| Param | Type | Description |
|-------|------|-------------|
| error | string | 에러 코드 |
| proSlug | string | 원래 예약하려던 프로 슬러그 |

### 예시 URL

```
/booking/fail?error=SLOT_UNAVAILABLE&proSlug=pro-kim
```

---

## 5. 인터랙션 정의

### 5.1 다시 시도

1. **Given** 사용자가 예약 실패 페이지에 있을 때
2. **When** 다시 시도 버튼을 클릭하면
3. **Then** 원래 프로의 포트폴리오 페이지로 돌아감 (`/[proSlug]`)

### 5.2 고객센터 문의

1. **Given** 사용자가 도움이 필요할 때
2. **When** 고객센터 문의를 클릭하면
3. **Then** 카카오톡 채널 또는 이메일 연락처로 이동

---

## 6. 접근성 요구사항

- [ ] 에러 아이콘: role="img", aria-label
- [ ] 에러 메시지: role="alert"
- [ ] 버튼 순서: 재시도 → 홈 → 고객센터

---

## 7. 관련 화면

- **이전 화면**: [Pro Portfolio](../03-portfolio/pro-portfolio.md)
- **다음 화면**: 재시도 → [Pro Portfolio](../03-portfolio/pro-portfolio.md)
- **연관 화면**: [Booking Success](./booking-success.md)

---

## 8. 구현 메모

### TODO

- [ ] FailureState 재사용 컴포넌트 구현 (Payment Fail과 공유)
- [ ] 에러 코드 → 메시지 매핑 유틸리티
- [ ] `/booking/fail/page.tsx` 구현
