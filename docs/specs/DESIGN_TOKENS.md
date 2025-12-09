# TEE:UP 디자인 토큰 v1.0

본 문서는 TEE:UP 웹 서비스의 UI/UX를 구성하는 핵심 디자인 토큰을 정의합니다. Apple Human Interface Guidelines (HIG) 원칙과 '프리미엄 골프 매거진' 스타일을 반영하여 일관되고 정제된 사용자 경험을 제공하기 위한 기반을 마련합니다.

이 토큰들은 `web/tailwind.config.ts`에 매핑되어 Tailwind CSS 클래스로 활용되며, `web/src/app/global.css`에서 CSS 변수로 선언됩니다.

## 1. Colors (색상)

| 토큰 이름          | 실제 값             | Tailwind 클래스 예시           | 설명                       |
| :-----------------| :-------------------| :-----------------------------| :-------------------------|
| `--color-tee-background` | `#F7F4F0`            | `bg-tee-background`          | 아주 연한 웜 화이트 (기본 배경) |
| `--color-tee-surface`    | `#FFFFFF`            | `bg-tee-surface`             | 순백 (카드, 모달 배경)        |
| `--color-tee-ink-strong` | `#1A1A1A`            | `text-tee-ink-strong`        | 거의 블랙에 가까운 딥 네이비/차콜 (주요 텍스트) |
| `--color-tee-ink-light`  | `#52524E`            | `text-tee-ink-light`         | on-surface-variant (서브 텍스트, 아이콘) |
| `--color-tee-accent-primary` | `#0A362B`            | `bg-tee-accent-primary`      | TEE:UP 그린 (주요 버튼, 링크, 강조) |
| `--color-tee-accent-secondary` | `#B39A68`            | `bg-tee-accent-secondary`    | 골드/샴페인 컬러 (프리미엄 포인트, 선택 상태) |
| `--color-tee-accent-primary-hover` | `#145C4B`            | `hover:bg-tee-accent-primary-hover` | TEE:UP 그린 호버 상태 |
| `--color-tee-accent-primary-active` | `#0A362B`            | `active:bg-tee-accent-primary-active` | TEE:UP 그린 활성화 상태 |
| `--color-tee-accent-primary-disabled` | `rgba(10, 54, 43, 0.4)` | `disabled:bg-tee-accent-primary-disabled` | TEE:UP 그린 비활성화 상태 |
| `--color-functional-success` | `#10B981`            | `text-functional-success`    | 성공 메시지 |
| `--color-functional-warning` | `#F59E0B`            | `text-functional-warning`    | 경고 메시지 |
| `--color-functional-error` | `#EF4444`            | `text-functional-error`      | 에러 메시지 |
| `--color-functional-info` | `#8B5CF6`            | `text-functional-info`       | 정보성 메시지 |
| `--color-brand-kakao` | `#FEE500`            | `bg-brand-kakao`             | 카카오톡 브랜드 컬러 |
| `--color-brand-kakao-text` | `#191919`            | `text-brand-kakao-text`      | 카카오톡 텍스트 컬러 |
| `--color-brand-kakao-hover` | `#FDD835`            | `hover:bg-brand-kakao-hover` | 카카오톡 호버 컬러 |

### Dark Mode Colors (다크 모드 색상)

| 토큰 이름 (Dark Mode) | 실제 값             | Tailwind 클래스 예시           | 설명 (다크 모드)                 |
| :----------------------| :-------------------| :-----------------------------| :-------------------------------|
| `--color-tee-background` (dark) | `#1A1A1A`            | `dark:bg-tee-background`     | 다크 모드 배경                  |
| `--color-tee-surface` (dark)    | `#000000`            | `dark:bg-tee-surface`        | 다크 모드 순백 (카드, 모달 배경) |
| `--color-tee-ink-strong` (dark) | `#FFFFFF`            | `dark:text-tee-ink-strong`   | 화이트 텍스트 (주요 텍스트)       |
| `--color-tee-ink-light` (dark)  | `#A0A0A0`            | `dark:text-tee-ink-light`    | 라이터 서브 텍스트, 아이콘      |
| `--color-tee-accent-primary` (dark) | `#3F7565`            | `dark:bg-tee-accent-primary` | 다크 모드 TEE:UP 그린           |
| `--color-tee-accent-secondary` (dark) | `#EAC98E`            | `dark:bg-tee-accent-secondary` | 다크 모드 골드/샴페인           |

## 2. Typography (타이포그래피)

| 토큰 이름          | 실제 값 (CSS Var)   | Tailwind 클래스 예시           | 설명                       |
| :-----------------| :-------------------| :-----------------------------| :-------------------------|
| `--font-pretendard` | `'Pretendard', -apple-system, system-ui, sans-serif` | `font-sans`                  | 기본 폰트 스택 (한국어, 시스템) |
| `--font-jetbrains-mono` | `'JetBrains Mono', Consolas, monospace` | `font-mono`                  | 모노스페이스 폰트 (데이터, 코드) |
| `--text-h1`        | `3rem` (48px)       | `text-h1`                    | 대형 제목                  |
| `--text-h2`        | `2.25rem` (36px)    | `text-h2`                    | 중형 제목                  |
| `--text-h3`        | `1.5rem` (24px)     | `text-h3`                    | 소형 제목                  |
| `--text-body`      | `1rem` (16px)       | `text-body`                  | 본문 텍스트                |
| `--text-caption`   | `0.875rem` (14px)   | `text-caption`               | 보조 텍스트, 캡션          |
| `line-height`      | `1.2` (tight)       | `leading-tight`              | 짧은 제목                  |
| `line-height`      | `1.25` (snug)       | `leading-snug`               | 중간 제목                  |
| `line-height`      | `1.5` (normal)      | `leading-normal`             | 본문                       |
| `line-height`      | `1.75` (relaxed)    | `leading-relaxed`            | 긴 본문, 가독성 향상       |
| `letter-spacing`   | `-0.02em` (tight)   | `tracking-tight`             | H1 등 큰 글자에 적용       |
| `letter-spacing`   | `normal`            | `tracking-normal`            | 기본 본문                  |
| `letter-spacing`   | `0.02em` (wide)     | `tracking-wide`              | 캡션, 강조                  |
| `letter-spacing`   | `0.04em` (wider)    | `tracking-wider`             | 더 넓은 간격                |

## 3. Spacing & Radius (간격 및 모서리)

### Spacing Scale (4px Grid 기반)

| 토큰 이름     | 실제 값 (CSS Var) | Tailwind 클래스 예시 | 설명             |
| :------------| :-----------------| :-------------------| :---------------|
| `--space-0`  | `0`               | `p-0`                | 0px              |
| `--space-1`  | `0.25rem` (4px)   | `p-1`                | 4px              |
| `--space-2`  | `0.5rem` (8px)    | `p-2`                | 8px (기본 간격)  |
| `--space-3`  | `0.75rem` (12px)  | `p-3`                | 12px             |
| `--space-4`  | `1rem` (16px)     | `p-4`                | 16px             |
| `--space-5`  | `1.25rem` (20px)  | `p-5`                | 20px             |
| `--space-6`  | `1.5rem` (24px)   | `p-6`                | 24px             |
| `--space-8`  | `2rem` (32px)     | `p-8`                | 32px             |
| `--space-10` | `2.5rem` (40px)   | `p-10`               | 40px             |
| `--space-12` | `3rem` (48px)     | `p-12`               | 48px             |
| `--space-16` | `4rem` (64px)     | `p-16`               | 64px             |
| `--space-px` | `1px`             | `p-px`               | 1px (미세 조정용) |

### Border Radius (소프트 라운드)

| 토큰 이름     | 실제 값 (CSS Var) | Tailwind 클래스 예시 | 설명                               |
| :------------| :-----------------| :-------------------| :---------------------------------|
| `--radius-sm` | `0.25rem` (4px)   | `rounded-sm`         | 아주 작은 요소 (태그, 작은 버튼) |
| `--radius-md` | `0.5rem` (8px)    | `rounded-md`         | 중간 크기 요소 (버튼, 인풋)      |
| `--radius-lg` | `0.75rem` (12px)  | `rounded-lg`         | 카드, 모달 등 일반적인 요소      |
| `--radius-xl` | `1rem` (16px)     | `rounded-xl`         | 큰 카드, 이미지                  |
| `--radius-full` | `9999px`          | `rounded-full`       | 완전한 원 (프로필 이미지, 필 버튼) |

## 4. Shadows (그림자)

| 토큰 이름      | 실제 값             | Tailwind 클래스 예시 | 설명                             |
| :-------------| :-------------------| :-------------------| :-------------------------------|
| `--shadow-card` | `0px 2px 8px rgba(0, 0, 0, 0.05)` | `shadow-card`        | 떠 있는 카드 요소에 적용되는 약한 그림자 (기본) |

### Dark Mode Shadow (다크 모드 그림자)

| 토큰 이름 (Dark Mode) | 실제 값             | Tailwind 클래스 예시 | 설명 (다크 모드)                 |
| :----------------------| :-------------------| :-------------------| :-------------------------------|
| `--shadow-card` (dark)  | `0px 4px 16px rgba(0, 0, 0, 0.5)` | `dark:shadow-card`   | 다크 모드 카드 요소에 적용되는 강한 그림자 |

## 5. Global Styles (글로벌 스타일)

`web/src/app/global.css` 에 적용되는 주요 전역 스타일 규칙:

- `body`:
  - `font-family: var(--font-pretendard);`
  - `background-color: var(--color-tee-background);`
  - `color: var(--color-tee-ink-strong);`
  - `font-size: var(--text-body);`
  - `line-height: 1.5;`
  - `antialiased` (Tailwind utility)
- 모든 폰트는 `-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;` 적용.
- 페이지 콘텐츠는 최대 너비 `max-w-screen-lg` 또는 `max-w-screen-xl` 컨테이너로 제한하여 가독성 확보. (Tailwind utility)
