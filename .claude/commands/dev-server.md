---
description: Start development servers (frontend + backend)
---

# Development Server Workflow

개발 서버를 시작하는 워크플로우입니다.

## 1. Frontend 개발 서버 시작
프론트엔드 개발 서버를 시작합니다 (http://localhost:3000)

// turbo
```bash
cd web && npm run dev
```

## 2. Backend 개발 서버 시작 (별도 터미널)
백엔드 API 서버를 시작합니다 (http://localhost:5000)

```bash
cd api && npm start
```

## 3. 확인
브라우저에서 다음 URL을 확인하세요:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api/profiles

## 문제 해결

### 포트가 이미 사용 중인 경우
```bash
# 포트 3000 프로세스 종료
lsof -ti:3000 | xargs kill -9

# 포트 5000 프로세스 종료
lsof -ti:5000 | xargs kill -9
```

### 모듈을 찾을 수 없는 경우
```bash
# 캐시 삭제 및 재설치
rm -rf node_modules package-lock.json
npm install
```
