export type StorySection = {
  title: string
  heading: string
  body: string
  image: string
  align: 'left' | 'right'
}

export type SpecGroup = {
  title: string
  specs: { label: string; value: string }[]
}

export type ProfileData = {
  profile: {
    name: string
    title: string
    subtitle: string
    summary: string
    heroImage: string
  }
  highlights: { label: string; value: string; detail: string }[]
  storySections: StorySection[]
  specGroups: SpecGroup[]
  testimonials: { quote: string; name: string }[]
}

export const profileLibrary: Record<string, ProfileData> = {
  'elliot-kim': {
    profile: {
      name: 'Elliot Kim',
      title: 'Signature Performance Architect',
      subtitle: 'Private Member Profile',
      summary:
        '투어 현장과 럭셔리 라이프스타일 사이를 유연하게 오가며, 집중력과 미니멀 스윙을 디자인하는 엘리트 코치. Apple Store 제품 페이지처럼 정제된 경험을 위해 모든 세션은 하나의 작품처럼 큐레이션됩니다.',
      heroImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1400&q=80',
    },
    highlights: [
      { label: 'Invitational 우승', value: '8', detail: '아시아 투어 & 유럽 서킷' },
      { label: '전담 VIP', value: '24', detail: 'CEO / 아트디렉터 / 아티스트' },
      { label: '평균 스코어 감소', value: '-4.8', detail: '4주 시그니처 프로그램' },
      { label: '거점 도시', value: 'Seoul · Tokyo · LA', detail: '글로벌 투어 동행' },
    ],
    storySections: [
      {
        title: 'SILHOUETTE',
        heading: '정적인 라인과 리듬으로 완성되는 시그니처 스윙.',
        body: '애플 스토어가 제품을 하나씩 전시하듯, 엘리엇의 레슨은 동작을 최소화한 채 꼭 필요한 감각만 남깁니다. 초고속 카메라와 ProMotion 수준의 모션 캡처가 균형 잡힌 실루엣을 즉시 보여줍니다.',
        image: 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=1200&q=80',
        align: 'left',
      },
      {
        title: 'AURA',
        heading: '명품 부티크처럼 고요한 톤온톤 스튜디오.',
        body: '오뜨 꾸뛰르 하우스의 샴페인 골드 팔레트를 레퍼런스로 조명과 퍼포먼스 데이터를 배치했습니다. 입장부터 종료까지 전담 큐레이터가 동선과 음악, 향을 맞춤 설계합니다.',
        image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80',
        align: 'right',
      },
      {
        title: 'PRECISION',
        heading: '애플 프로덕트 페이지 같은 디테일의 피드백.',
        body: '피드백 리포트는 디바이스 언박싱 경험처럼 한눈에 흐름이 읽히도록 디자인되었습니다. 모션 그래프, 샤프트 텐션, 퍼팅 스트로크 파형을 인터랙티브 캔버스로 제공하여 언제든 복기할 수 있습니다.',
        image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
        align: 'left',
      },
    ],
    specGroups: [
      {
        title: '코어 데이터',
        specs: [
          { label: '핸디캡', value: '+2.1' },
          { label: '드라이버 캐리', value: '287m' },
          { label: '그린 적중률', value: '82%' },
          { label: '퍼팅 게인', value: '+1.6' },
        ],
      },
      {
        title: '세션 구성',
        specs: [
          { label: '러닝타임', value: '120분 / 1:1' },
          { label: '스팟 로케이션', value: '청담 · 한남 · 한남하우스' },
          { label: '장비', value: '3D 모션 플레이트 · LiDAR 스캐너' },
          { label: '컨시어지', value: '전담 드라이버 & 스타일링 파트너' },
        ],
      },
    ],
    testimonials: [
      {
        quote:
          '“매 세션마다 새로운 애플 기기를 언박싱하는 기분. 디자인과 분석이 결합된 보고서를 통해 브랜드 런칭 프레젠테이션 같은 몰입감을 느꼈다.”',
        name: 'Luxury Fashion Director · Seoul',
      },
      {
        quote:
          '“엘리엇의 리듬은 명품 브랜드 뮤직디렉터처럼 정교하다. 해외 일정이 많아도 원격 피드백으로 흐름이 끊기지 않는다.”',
        name: 'Media Tech Founder · Los Angeles',
      },
    ],
  },
  'hannah-park': {
    profile: {
      name: 'Hannah Park',
      title: 'LPGA International Lead',
      subtitle: 'Private Member Profile',
      summary:
        '국가대표 단체전 전략을 다년간 총괄해온 한나는 감성적인 스토리텔링과 강한 멘탈 플로우를 결합하여 라운드를 설계합니다. 파인주얼리 쇼룸처럼 고요한 공간에서 집중력을 디자인합니다.',
      heroImage: 'https://images.unsplash.com/photo-1521579987242-334c248be0dc?auto=format&fit=crop&w=1400&q=80',
    },
    highlights: [
      { label: '국가대표 코칭', value: '6 yrs', detail: '아시아 단체전 연속 메달' },
      { label: '라이브 퍼포먼스', value: '210+', detail: 'VIP 플레이 동행' },
      { label: '멘탈 프로토콜', value: '4-step', detail: 'Studio Tempo Ritual' },
      { label: '전담 도시', value: 'Seoul · Busan', detail: '해안 레인지' },
    ],
    storySections: [
      {
        title: 'POISE',
        heading: '하우 쿠튀르 피팅 룸 같은 루틴.',
        body: '라운지 조명, 향, 음악을 직접 큐레이션하여 선수들이 긴장을 풀고 집중하도록 돕습니다. 사전 브리핑 문서는 패션 컬렉션 룩북 형식으로 제공됩니다.',
        image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
        align: 'left',
      },
      {
        title: 'TACTILITY',
        heading: '프리미엄 소재 샤프트 + 커스텀 그립.',
        body: '럭셔리 레더 공방과 협업한 커스텀 그립, 미세한 질감을 체감할 수 있는 트레이닝 도구로 감각을 깨웁니다.',
        image: 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=1200&q=80',
        align: 'right',
      },
      {
        title: 'MENTAL FLOW',
        heading: '파인 아트 갤러리처럼 정돈된 피드백.',
        body: '감성적인 문장과 데이터 노트를 조합해 세션 결과를 전달합니다. 디지털 캔버스에서 바로 리뷰할 수 있어 투어 이동 중에도 루틴을 유지합니다.',
        image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80',
        align: 'left',
      },
    ],
    specGroups: [
      {
        title: '코어 데이터',
        specs: [
          { label: '핸디캡', value: '+1.4' },
          { label: '드라이버 캐리', value: '272m' },
          { label: '페어웨이 적중', value: '79%' },
          { label: '클러치 퍼팅', value: '91%' },
        ],
      },
      {
        title: '세션 구성',
        specs: [
          { label: '러닝타임', value: '100분 / 1:2' },
          { label: '스팟 로케이션', value: '청담 · 해운대' },
          { label: '장비', value: 'AR 퍼팅 랩 · 8K 카메라' },
          { label: '컨시어지', value: '웰니스 티 + 셰프 페어링' },
        ],
      },
    ],
    testimonials: [
      {
        quote: '“하우스 콘서트처럼 조용하고 집중되는 환경. 감정선까지 관리해줘서 프리젠테이션 전 멘탈까지 정비됩니다.”',
        name: 'Brand Experience VP · Seoul',
      },
      {
        quote: '“데이터보다 먼저 감각을 깨우는 방식이 인상적이었습니다. 팀워크 워크숍에도 초대하고 싶어요.”',
        name: 'Creative Studio Founder · Busan',
      },
    ],
  },
  'mina-jang': {
    profile: {
      name: 'Mina Jang',
      title: 'Short Game Director',
      subtitle: 'Private Member Profile',
      summary:
        '투어급 쇼트게임과 퍼팅 실험실을 이끄는 미나는 카본 파이버 소재와 고급 사운드 디자인으로 감각을 정교하게 조율합니다. 명품 워치처럼 치밀한 타이밍을 구현합니다.',
      heroImage: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1400&q=80',
    },
    highlights: [
      { label: '투어 동행', value: '14', detail: '메이저 퍼팅 코치' },
      { label: '랩 디바이스', value: '11', detail: 'ARMJ Lab Signature' },
      { label: '거리 오차', value: '±0.3m', detail: '칩샷 오토메이션' },
      { label: '세션 타입', value: 'Soirée · Atelier', detail: 'Night Range & Studio' },
    ],
    storySections: [
      {
        title: 'SCULPT',
        heading: '조명과 그림자로 리듬을 깎아낸다.',
        body: '고급 시네마 조명과 음영을 이용해 그린 컨투어를 시각화합니다. 손끝 감각이 살아나도록 천천히 움직이는 그림자를 연출합니다.',
        image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
        align: 'left',
      },
      {
        title: 'SOUND',
        heading: '워치메이킹에서 착안한 사운드 큐.',
        body: '초고해상도 마이크로 임팩트 사운드를 녹음하고 스테레오로 플레이백하여 거리 감각을 교정합니다.',
        image: 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=1200&q=80',
        align: 'right',
      },
      {
        title: 'CRAFT',
        heading: '미세 조정이 가능한 퍼터 앰플리파이어.',
        body: '장인의 손길로 제작된 퍼터 웨이트와 인터체인저블 소프트 굿즈로 스윙웨이트를 즉시 조절합니다.',
        image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80',
        align: 'left',
      },
    ],
    specGroups: [
      {
        title: '코어 데이터',
        specs: [
          { label: '핸디캡', value: '+0.8' },
          { label: '어프로치 게인', value: '+2.3' },
          { label: '퍼팅 게인', value: '+2.8' },
          { label: '샷 크리에이티브', value: '36 set' },
        ],
      },
      {
        title: '세션 구성',
        specs: [
          { label: '러닝타임', value: '90분 / 1:1' },
          { label: '스팟 로케이션', value: '성수 · 도산' },
          { label: '장비', value: 'Carbon putting rail · LiDAR green map' },
          { label: '컨시어지', value: 'Night chauffeured ride' },
        ],
      },
    ],
    testimonials: [
      {
        quote: '“퍼팅 사운드를 이렇게 정교하게 다루는 코치는 처음입니다. 하이엔드 워치 브랜드 PT 같은 집중감을 느꼈습니다.”',
        name: 'Luxury Watch PR · Tokyo',
      },
      {
        quote: '“칩샷 실험실에서 얻은 감각이 바로 대회에서 재현됐어요. 감각 튜닝에 진심인 분들에게 추천합니다.”',
        name: 'Pro-Am Champion · Seoul',
      },
    ],
  },
}

export const defaultProfileSlug = 'elliot-kim'
