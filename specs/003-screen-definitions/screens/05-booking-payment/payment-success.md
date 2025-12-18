# Screen: Payment Success (결제 완료)

**Route**: `/payment/success`
**Status**: Implemented
**Last Updated**: 2025-12-18
**Priority**: P1
**Dependencies**: Payment System (Stripe/Toss)

---

## 1. 화면 개요

### 목적
결제가 성공적으로 완료되었음을 알리고, 결제 상세 내역을 제공한다.

### 사용자 흐름
```
프로 포트폴리오 → 결제하기 → PG 결제 → /payment/success
```

### 접근 조건
- **인증 필요**: No
- **권한 수준**: guest
- **전제 조건**: PG 결제 완료 콜백

---

## 2. 레이아웃 구조

```
┌────────────────────────────────────────────────────────────────┐
│                                                                 │
│                         ✓                                       │
│                                                                 │
│                    결제가 완료되었습니다                          │
│                                                                 │
│  ┌────────────────────────────────────────────────────────┐    │
│  │                                                        │    │
│  │  결제 정보                                              │    │
│  │                                                        │    │
│  │  상품명       김프로 레슨 (1회)                         │    │
│  │  결제 금액    ₩150,000                                 │    │
│  │  결제 수단    신용카드 (****1234)                       │    │
│  │  결제일       2024년 1월 15일 14:32                    │    │
│  │  주문 번호    ORD-2024011501                           │    │
│  │                                                        │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                 │
│  📧 영수증이 이메일로 발송되었습니다                              │
│  user@example.com                                              │
│                                                                 │
│  ┌────────────────────────────────────────────────────────┐    │
│  │                                                        │    │
│  │  📌 안내사항                                            │    │
│  │                                                        │    │
│  │  • 레슨 일정은 프로와 직접 조율해주세요                   │    │
│  │  • 환불은 레슨 24시간 전까지 가능합니다                   │    │
│  │  • 문의: help@teeup.kr                                 │    │
│  │                                                        │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                 │
│            [영수증 다운로드]  [프로에게 연락]  [홈으로]            │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

---

## 3. 주요 컴포넌트

### 3.1 SuccessIcon

**성공 아이콘**

| Property | Value |
|----------|-------|
| 아이콘 | 체크마크 (✓) 원형 |
| 크기 | 64px |
| 색상 | `--tee-success` (#388E3C) |
| 애니메이션 | Scale-in + 체크 드로잉 |

### 3.2 PaymentInfoCard

**결제 정보 카드**

| Field | Description |
|-------|-------------|
| 상품명 | 결제 상품명 |
| 결제 금액 | 총 결제 금액 (원화) |
| 결제 수단 | 카드/계좌이체 + 마스킹 번호 |
| 결제일 | 결제 완료 일시 |
| 주문 번호 | 고유 주문 ID |

### 3.3 EmailNotice

**이메일 발송 안내**

| Element | Description |
|---------|-------------|
| 아이콘 | 📧 이메일 아이콘 |
| 텍스트 | "영수증이 이메일로 발송되었습니다" |
| 이메일 | 사용자 이메일 주소 |

### 3.4 ActionButtons

**액션 버튼**

| Button | Style | Action |
|--------|-------|--------|
| 영수증 다운로드 | Secondary | PDF 영수증 다운로드 |
| 프로에게 연락 | Secondary | 프로 연락처/채팅 |
| 홈으로 | Primary | `/` 이동 |

---

## 4. 데이터 요구사항

### URL Parameters

| Param | Description |
|-------|-------------|
| `orderId` | 주문 ID |
| `paymentKey` | PG 결제 키 (Toss) |

### Server Actions

| Action | 설명 |
|--------|------|
| `getPaymentDetails` | 결제 상세 정보 조회 |
| `downloadReceipt` | 영수증 PDF 생성 |

### 데이터 스키마

```typescript
interface PaymentDetails {
  id: string;
  order_number: string;
  product_name: string;
  amount: number;
  currency: 'KRW';
  payment_method: 'card' | 'transfer' | 'kakao';
  card_last4: string | null;
  paid_at: string;
  receipt_url: string;
  pro_id: string;
  pro_name: string;
  customer_email: string;
}
```

---

## 5. 인터랙션 정의

### 5.1 영수증 다운로드

1. **Given** 결제 완료 화면이 표시될 때
2. **When** "영수증 다운로드" 버튼을 클릭하면
3. **Then** PDF 영수증이 다운로드된다

### 5.2 프로 연락

1. **Given** 결제 완료 화면이 표시될 때
2. **When** "프로에게 연락" 버튼을 클릭하면
3. **Then** 프로의 카카오톡 오픈채팅 또는 연락처로 이동

---

## 6. 접근성 요구사항

- [ ] 성공 메시지: `role="alert"` 또는 `aria-live="polite"`
- [ ] 결제 정보: 구조화된 `<dl>` 사용
- [ ] 금액: 명확한 통화 표시

---

## 7. 에러 케이스

| 에러 유형 | 처리 |
|----------|------|
| 잘못된 주문 ID | 에러 페이지로 리디렉션 |
| 결제 미완료 | "결제가 완료되지 않았습니다" 메시지 |

---

## 8. 관련 화면

- **이전 화면**: [Pro Portfolio](../03-portfolio/pro-portfolio.md)
- **실패 화면**: [Payment Fail](./payment-fail.md)
- **연관 화면**: [Booking Success](./booking-success.md)
