import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#0a0e27]">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#0a0e27]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" className="font-display text-2xl font-bold text-white">
            TEE<span className="text-[#d4af37]">:</span>UP
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <Link href="/browse" className="text-sm font-medium text-white/80 transition-colors hover:text-[#d4af37]">
              전체 프로
            </Link>
            <Link href="/about" className="text-sm font-medium text-white/80 transition-colors hover:text-[#d4af37]">
              소개
            </Link>
            <Link href="/contact" className="text-sm font-medium text-white/80 transition-colors hover:text-[#d4af37]">
              문의
            </Link>
          </div>

          <Link
            href="/get-started"
            className="rounded-full bg-gradient-to-r from-[#d4af37] to-[#f4e5c2] px-6 py-2.5 text-sm font-semibold text-[#0a0e27] transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
          >
            시작하기
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-20">
        {/* Animated Background Orbs */}
        <div className="absolute inset-0">
          <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-[#d4af37]/10 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 h-96 w-96 animate-pulse rounded-full bg-[#d4af37]/10 blur-3xl" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-6 py-3 backdrop-blur-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#d4af37]" />
            <span className="text-sm font-medium text-[#d4af37]">AI 기반 맞춤 매칭</span>
          </div>

          <h1 className="mb-6 font-display text-6xl font-bold leading-tight text-white md:text-7xl lg:text-8xl">
            당신만을 위한
            <br />
            <span className="bg-gradient-to-r from-[#d4af37] to-[#f4e5c2] bg-clip-text text-transparent">
              골프 레슨
            </span>
          </h1>

          <p className="mx-auto mb-12 max-w-2xl text-xl leading-relaxed text-white/70">
            검증된 프로 골퍼들과 함께하는 프리미엄 레슨 경험.
            <br />
            AI가 추천하는 최적의 매칭으로 당신의 골프 실력을 한 단계 업그레이드하세요.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <button className="group relative overflow-hidden rounded-full bg-gradient-to-r from-[#d4af37] to-[#f4e5c2] px-10 py-4 text-lg font-bold text-[#0a0e27] shadow-2xl transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(212,175,55,0.5)]">
              <span className="relative z-10">AI 매칭 시작하기</span>
              <div className="absolute inset-0 -z-0 bg-gradient-to-r from-[#f4e5c2] to-[#d4af37] opacity-0 transition-opacity group-hover:opacity-100" />
            </button>
            <Link
              href="/profile"
              className="rounded-full border border-white/30 px-10 py-4 text-lg font-semibold text-white transition-all hover:border-[#d4af37] hover:bg-[#d4af37]/10"
            >
              전체 프로 보기
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center gap-2 text-white/40">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* AI Matching Section */}
      <section className="px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-display text-4xl font-bold text-white md:text-5xl">
              AI가 찾아주는
              <br />
              <span className="text-[#d4af37]">나만의 프로</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-white/60">
              몇 가지 질문만으로 당신의 골프 스타일과 목표에 완벽하게 맞는 프로를 추천합니다
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: '🎯',
                title: '목표 설정',
                description: '현재 실력과 개선하고 싶은 부분을 알려주세요',
              },
              {
                icon: '🤖',
                title: 'AI 분석',
                description: '수천 건의 데이터로 최적의 프로를 찾아드립니다',
              },
              {
                icon: '✨',
                title: '완벽한 매칭',
                description: '당신에게 딱 맞는 프로와 레슨을 시작하세요',
              },
            ].map((step, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-8 backdrop-blur-xl transition-all duration-500 hover:scale-105 hover:border-[#d4af37]/50"
              >
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-transparent blur-2xl transition-all duration-500 group-hover:scale-150" />
                <div className="relative">
                  <div className="mb-6 text-6xl">{step.icon}</div>
                  <h3 className="mb-3 text-2xl font-bold text-white">{step.title}</h3>
                  <p className="leading-relaxed text-white/70">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Pros Snippet */}
      <section className="px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-display text-4xl font-bold text-white md:text-5xl">
              검증된 프로 골퍼들
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-white/60">
              LPGA, PGA 투어 경험의 최고 수준 프로들과 함께하세요
            </p>
          </div>

          {/* Abstract Pro Cards */}
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { initial: 'H', title: 'LPGA Tour', tours: '8+ 투어' },
              { initial: 'J', title: 'PGA Master', tours: '10+ 투어' },
              { initial: 'S', title: 'KLPGA', tours: '5+ 투어' },
            ].map((pro, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8 backdrop-blur-xl transition-all duration-500 hover:scale-105 hover:border-[#d4af37]/50 hover:shadow-[0_0_30px_rgba(212,175,55,0.2)]"
              >
                <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-transparent blur-3xl" />
                <div className="relative flex items-center gap-6">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#d4af37] to-[#f4e5c2] text-3xl font-bold text-[#0a0e27]">
                    {pro.initial}
                  </div>
                  <div>
                    <p className="mb-1 text-sm font-medium text-[#d4af37]">{pro.title}</p>
                    <p className="text-2xl font-bold text-white">{pro.tours}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/profile"
              className="inline-flex items-center gap-2 text-lg font-semibold text-[#d4af37] transition-all hover:gap-4"
            >
              전체 프로 보기
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-16 backdrop-blur-xl">
            <div className="grid gap-12 md:grid-cols-4">
              {[
                { value: '50+', label: '검증된 프로' },
                { value: '1,200+', label: '성공 매칭' },
                { value: '4.9', label: '평균 평점' },
                { value: '95%', label: '재예약률' },
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="mb-3 font-display text-5xl font-bold text-[#d4af37]">
                    {stat.value}
                  </div>
                  <p className="text-sm font-medium uppercase tracking-wider text-white/70">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-32">
        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-3xl border border-[#d4af37] bg-gradient-to-br from-[#d4af37]/20 to-[#d4af37]/5 p-16 text-center backdrop-blur-xl">
            <div className="absolute -left-12 -top-12 h-64 w-64 rounded-full bg-gradient-to-br from-[#d4af37]/30 to-transparent blur-3xl" />
            <div className="absolute -bottom-12 -right-12 h-64 w-64 rounded-full bg-gradient-to-br from-[#d4af37]/30 to-transparent blur-3xl" />

            <div className="relative">
              <h2 className="mb-6 font-display text-5xl font-bold text-white">
                지금 시작하세요
              </h2>
              <p className="mx-auto mb-10 max-w-2xl text-xl text-white/80">
                AI 매칭으로 당신에게 완벽한 골프 프로를 찾아드립니다
              </p>
              <button className="rounded-full bg-gradient-to-r from-[#d4af37] to-[#f4e5c2] px-12 py-5 text-xl font-bold text-[#0a0e27] shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(212,175,55,0.6)]">
                무료로 시작하기
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#0a0e27]/50 px-6 py-16 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-4">
            {/* Company Info */}
            <div className="md:col-span-2">
              <Link href="/" className="mb-6 inline-block font-display text-3xl font-bold text-white">
                TEE<span className="text-[#d4af37]">:</span>UP
              </Link>
              <p className="mb-6 leading-relaxed text-white/60">
                프리미엄 골프 레슨 매칭 플랫폼.
                <br />
                검증된 프로 골퍼들과 함께 당신의 골프 실력을 한 단계 업그레이드하세요.
              </p>
              <div className="flex gap-4">
                <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/60 transition-all hover:border-[#d4af37] hover:text-[#d4af37]">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
                  </svg>
                </a>
                <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/60 transition-all hover:border-[#d4af37] hover:text-[#d4af37]">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="mb-6 text-lg font-semibold text-white">바로가기</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/profile" className="text-white/60 transition-colors hover:text-[#d4af37]">
                    전체 프로 보기
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-white/60 transition-colors hover:text-[#d4af37]">
                    회사 소개
                  </Link>
                </li>
                <li>
                  <Link href="/how-it-works" className="text-white/60 transition-colors hover:text-[#d4af37]">
                    이용 방법
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-white/60 transition-colors hover:text-[#d4af37]">
                    요금 안내
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="mb-6 text-lg font-semibold text-white">고객 지원</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/contact" className="text-white/60 transition-colors hover:text-[#d4af37]">
                    문의하기
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-white/60 transition-colors hover:text-[#d4af37]">
                    자주 묻는 질문
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-white/60 transition-colors hover:text-[#d4af37]">
                    이용약관
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-white/60 transition-colors hover:text-[#d4af37]">
                    개인정보처리방침
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-8 text-center">
            <p className="text-sm text-white/40">
              © 2025 TEE:UP. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
