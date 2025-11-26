---
description: Add a new RESTful API endpoint
---

# API Endpoint Creation Workflow

Express.js 백엔드에 새로운 RESTful API 엔드포인트를 추가하는 워크플로우입니다.

## 1. 엔드포인트 설계
RESTful 규칙을 따라 엔드포인트를 설계합니다.

### HTTP 메서드 선택
- `GET` - 리소스 조회
- `POST` - 리소스 생성
- `PUT` - 리소스 전체 수정
- `PATCH` - 리소스 부분 수정
- `DELETE` - 리소스 삭제

### URL 구조
```
/api/[resource]           # 컬렉션
/api/[resource]/:id       # 단일 리소스
/api/[resource]/:id/[sub] # 중첩 리소스
```

**예시:**
```
GET    /api/profiles           # 모든 프로필 조회
GET    /api/profiles/:slug     # 특정 프로필 조회
POST   /api/profiles           # 새 프로필 생성
PUT    /api/profiles/:id       # 프로필 수정
DELETE /api/profiles/:id       # 프로필 삭제
```

## 2. 타입 정의
TypeScript 인터페이스를 정의합니다.

**파일 위치:** `/api/src/types.ts` (또는 새 파일 생성)

```typescript
export interface IProProfile {
  id: string;
  slug: string;
  name: string;
  bio: string;
  specialty: string[];
  location: string;
  // ... 기타 필드
}

export interface ICreateProfileRequest {
  name: string;
  bio: string;
  specialty: string[];
  location: string;
}
```

## 3. Express 라우터에 추가
엔드포인트를 구현합니다.

**파일 위치:** `/api/src/index.ts`

```typescript
import express, { Request, Response, NextFunction } from 'express';
import { IProProfile, ICreateProfileRequest } from './types';

const app = express();

// GET 예시
app.get('/api/profiles', (req: Request, res: Response) => {
  try {
    // 데이터 조회 로직
    const profiles: IProProfile[] = getAllProfiles();
    
    res.json({
      success: true,
      data: profiles
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '프로필을 불러오는데 실패했습니다.'
    });
  }
});

// POST 예시
app.post('/api/profiles', (req: Request, res: Response) => {
  try {
    const body: ICreateProfileRequest = req.body;
    
    // 유효성 검사
    if (!body.name || !body.bio) {
      return res.status(400).json({
        success: false,
        message: '필수 필드가 누락되었습니다.'
      });
    }
    
    // 데이터 생성 로직
    const newProfile = createProfile(body);
    
    res.status(201).json({
      success: true,
      data: newProfile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '프로필 생성에 실패했습니다.'
    });
  }
});

// Dynamic route 예시
app.get('/api/profiles/:slug', (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const profile = findProfileBySlug(slug);
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: '프로필을 찾을 수 없습니다.'
      });
    }
    
    res.json({
      success: true,
      data: profile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '서버 오류가 발생했습니다.'
    });
  }
});
```

## 4. 에러 핸들링
표준 HTTP 상태 코드를 사용합니다.

| 상태 코드 | 의미 | 사용 시점 |
|-----------|------|-----------|
| 200 | OK | 성공적인 GET, PUT, PATCH |
| 201 | Created | 성공적인 POST |
| 204 | No Content | 성공적인 DELETE |
| 400 | Bad Request | 잘못된 요청 데이터 |
| 401 | Unauthorized | 인증 필요 |
| 403 | Forbidden | 권한 없음 |
| 404 | Not Found | 리소스 없음 |
| 500 | Internal Server Error | 서버 오류 |

**에러 응답 형식:**
```typescript
{
  success: false,
  message: "사용자 친화적인 에러 메시지",
  error?: "개발용 상세 에러 (production에서는 제외)"
}
```

## 5. CORS 설정 확인
프론트엔드에서 접근 가능하도록 CORS가 설정되어 있는지 확인합니다.

**파일 위치:** `/api/src/index.ts`

```typescript
import cors from 'cors';

app.use(cors({
  origin: 'http://localhost:3000', // 프론트엔드 URL
  credentials: true
}));
```

## 6. 테스트
API 엔드포인트를 테스트합니다.

### cURL 사용
```bash
# GET 요청
curl http://localhost:5000/api/profiles

# POST 요청
curl -X POST http://localhost:5000/api/profiles \
  -H "Content-Type: application/json" \
  -d '{"name":"테스트","bio":"테스트 프로필"}'
```

### 브라우저에서 확인
```
http://localhost:5000/api/profiles
```

## 체크리스트
- [ ] RESTful URL 구조 설계
- [ ] TypeScript 타입 정의
- [ ] Express 라우터에 엔드포인트 추가
- [ ] 에러 핸들링 구현
- [ ] CORS 설정 확인
- [ ] API 테스트 (cURL 또는 브라우저)
- [ ] API_SPEC.md 문서 업데이트
