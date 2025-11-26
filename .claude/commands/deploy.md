---
description: Prepare for production deployment
---

# Deployment Preparation Workflow

프로덕션 배포를 준비하는 워크플로우입니다.

## 1. 코드 품질 검사

### TypeScript 타입 체크
```bash
cd web
npx tsc --noEmit
```

**확인 사항:**
- 타입 에러 없음
- `any` 타입 최소화
- strict mode 준수

### ESLint 검사
```bash
cd web
npm run lint
```

**확인 사항:**
- Linting 에러 없음
- 경고 최소화
- 사용하지 않는 import 제거

## 2. 빌드 테스트

### Frontend 빌드
```bash
cd web
npm run build
```

**확인 사항:**
- 빌드 성공
- 번들 크기 확인 (< 200KB gzip 권장)
- 빌드 경고 확인

### Backend 빌드
```bash
cd api
npm run start
```

**확인 사항:**
- TypeScript 컴파일 성공
- 서버 정상 시작

## 3. 환경 변수 확인

### Frontend 환경 변수
**파일:** `/web/.env.local` (로컬) 또는 Vercel 환경 변수

필수 변수:
```bash
NEXT_PUBLIC_API_URL=https://api.teeup.kr/api
```

Phase 2 이후:
```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_TOSS_CLIENT_KEY=
```

### Backend 환경 변수
**파일:** `/api/.env` (로컬) 또는 배포 플랫폼 환경 변수

필수 변수:
```bash
PORT=5000
NODE_ENV=production
```

Phase 2 이후:
```bash
SUPABASE_URL=
SUPABASE_SERVICE_KEY=
TOSS_SECRET_KEY=
```

## 4. 성능 최적화 확인

### 이미지 최적화
- [ ] `next/image` 사용 (일반 `<img>` 태그 대신)
- [ ] 이미지 크기 최적화 (WebP 형식 권장)
- [ ] Lazy loading 적용

### 코드 스플리팅
- [ ] Dynamic imports 사용 (무거운 컴포넌트)
- [ ] Route-based code splitting (Next.js 자동)

### 번들 크기 분석
```bash
cd web
npm run build
# .next/analyze 폴더 확인
```

## 5. SEO 최적화

### 메타 태그 확인
각 페이지에 다음 메타데이터가 있는지 확인:

```typescript
export const metadata = {
  title: '페이지 제목 | TEE:UP',
  description: '페이지 설명 (150자 이내)',
  openGraph: {
    title: '페이지 제목',
    description: '페이지 설명',
    images: ['/og-image.jpg'],
  },
};
```

### Sitemap & Robots.txt
- [ ] `public/sitemap.xml` 생성
- [ ] `public/robots.txt` 생성

## 6. 보안 검사

### 민감 정보 확인
- [ ] API 키가 클라이언트 코드에 노출되지 않음
- [ ] `.env` 파일이 `.gitignore`에 포함됨
- [ ] 프로덕션 환경 변수 별도 관리

### CORS 설정
```typescript
// api/src/index.ts
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://teeup.kr' 
    : 'http://localhost:3000',
  credentials: true
}));
```

## 7. 성능 벤치마크

### Lighthouse 점수 확인
```bash
# Chrome DevTools > Lighthouse 실행
```

**목표 점수:**
- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90

**주요 지표:**
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

## 8. 배포 전 체크리스트

### Frontend (Vercel)
- [ ] 빌드 성공
- [ ] 환경 변수 설정
- [ ] 도메인 연결 (teeup.kr)
- [ ] HTTPS 활성화
- [ ] Preview 배포 테스트

### Backend (Railway/Fly.io)
- [ ] 빌드 성공
- [ ] 환경 변수 설정
- [ ] 데이터베이스 연결 확인
- [ ] Health check 엔드포인트 추가
- [ ] 로그 모니터링 설정

### Database (Supabase)
- [ ] RLS (Row Level Security) 정책 설정
- [ ] 백업 설정
- [ ] 인덱스 최적화

## 9. 배포 후 확인

### Smoke Test
- [ ] 홈페이지 로딩
- [ ] 프로 프로필 조회
- [ ] 검색 기능
- [ ] API 응답 확인

### 모니터링 설정
- [ ] Sentry (에러 트래킹)
- [ ] Google Analytics (사용자 분석)
- [ ] UptimeRobot (서버 상태 모니터링)

## 10. 롤백 계획

문제 발생 시:
1. Vercel: 이전 배포로 즉시 롤백
2. Railway/Fly.io: 이전 버전으로 재배포
3. 데이터베이스: 백업에서 복구

## 체크리스트 요약
- [ ] TypeScript 타입 체크 통과
- [ ] ESLint 검사 통과
- [ ] 빌드 성공 (Frontend + Backend)
- [ ] 환경 변수 설정 완료
- [ ] 이미지 최적화 확인
- [ ] SEO 메타 태그 추가
- [ ] 보안 검사 완료
- [ ] Lighthouse 점수 > 90
- [ ] Preview 배포 테스트
- [ ] 모니터링 설정 완료
