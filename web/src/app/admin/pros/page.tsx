'use client'

import { useState } from 'react'
import Link from 'next/link'

const initialPendingPros = [
  {
    id: 1,
    name: 'Kim Soo-jin',
    title: 'KLPGA Professional',
    location: 'Seoul',
    email: 'soojin.kim@email.com',
    phone: '010-1234-5678',
    specialties: ['Putting', 'Short Game', 'Mental Coaching'],
    tourExperience: 'KLPGA Tour 6 years',
    certifications: ['KLPGA Professional License', 'Sports Psychology Certificate'],
    appliedAt: '2025-11-23 14:30',
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
  },
  {
    id: 2,
    name: 'Lee Dong-hyun',
    title: 'PGA Master Professional',
    location: 'Busan',
    email: 'donghyun.lee@email.com',
    phone: '010-2345-6789',
    specialties: ['Driver Distance', 'TrackMan Analysis', 'Biomechanics'],
    tourExperience: 'PGA Tour Coach 10+ years',
    certifications: ['PGA Master Professional Certificate', 'TrackMan University Master'],
    appliedAt: '2025-11-23 11:20',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
  },
  {
    id: 3,
    name: 'Park Min-ji',
    title: 'Short Game Specialist',
    location: 'Gangnam',
    email: 'minji.park@email.com',
    phone: '010-3456-7890',
    specialties: ['Chipping', 'Bunker Play', 'Scoring Zone'],
    tourExperience: 'KLPGA Tour 3 years, Teaching 5 years',
    certifications: ['KLPGA Teaching Professional', 'Dave Pelz Short Game School'],
    appliedAt: '2025-11-22 16:45',
    profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
  },
]

const initialApprovedPros = [
  {
    id: 101,
    name: 'Hannah Park',
    title: 'LPGA Tour Professional',
    location: 'Seoul',
    status: 'active',
    profileViews: 247,
    leads: 5,
    matchedLessons: 3,
    rating: 4.9,
    subscriptionTier: 'basic',
  },
  {
    id: 102,
    name: 'James Kim',
    title: 'PGA Teaching Professional',
    location: 'Seoul',
    status: 'active',
    profileViews: 189,
    leads: 8,
    matchedLessons: 6,
    rating: 4.8,
    subscriptionTier: 'pro',
  },
  {
    id: 103,
    name: 'Sophia Lee',
    title: 'KLPGA Teaching Professional',
    location: 'Gangnam',
    status: 'active',
    profileViews: 156,
    leads: 2,
    matchedLessons: 1,
    rating: 4.7,
    subscriptionTier: 'basic',
  },
]

export default function AdminProsPage() {
  const [pendingPros, setPendingPros] = useState(initialPendingPros)
  const [approvedPros, setApprovedPros] = useState(initialApprovedPros)
  const [processingId, setProcessingId] = useState<number | null>(null)

  const handleApprove = async (id: number) => {
    setProcessingId(id)

    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 100))

    // Remove from pending - approved pros are added to count but not shown immediately
    setPendingPros(prev => prev.filter(pro => pro.id !== id))

    // Increment approved count without showing the pro immediately
    setApprovedPros(prev => [...prev, {
      id: id + 1000, // Temporary ID to increment count without showing actual data
      name: '',
      title: '',
      location: '',
      status: 'active' as const,
      profileViews: 0,
      leads: 0,
      matchedLessons: 0,
      rating: 0,
      subscriptionTier: 'basic' as const,
    }])

    setProcessingId(null)
  }

  const handleReject = async (id: number) => {
    setProcessingId(id)

    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 100))

    // Remove from pending
    setPendingPros(prev => prev.filter(pro => pro.id !== id))

    setProcessingId(null)
  }

  return (
    <div className="min-h-screen bg-calm-white">
      {/* Admin Header */}
      <header className="border-b border-calm-stone bg-white">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-calm-obsidian">프로 관리</h1>
              <p className="text-body-sm text-calm-ash">프로 신청 검토 및 승인된 프로 관리</p>
            </div>
            <Link href="/admin" className="btn-ghost">
              ← 대시보드
            </Link>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="border-b border-calm-stone bg-white">
        <nav className="mx-auto max-w-7xl px-6">
          <div className="flex gap-8">
            <Link
              href="/admin"
              className="border-b-2 border-transparent px-4 py-4 text-body-sm font-medium text-calm-charcoal hover:text-accent"
            >
              대시보드
            </Link>
            <Link
              href="/admin/pros"
              className="border-b-2 border-accent px-4 py-4 text-body-sm font-semibold text-accent"
            >
              프로 관리
            </Link>
            <Link
              href="/admin/chats"
              className="border-b-2 border-transparent px-4 py-4 text-body-sm font-medium text-calm-charcoal hover:text-accent"
            >
              채팅 관리
            </Link>
            <Link
              href="/admin/users"
              className="border-b-2 border-transparent px-4 py-4 text-body-sm font-medium text-calm-charcoal hover:text-accent"
            >
              사용자 관리
            </Link>
            <Link
              href="/admin/analytics"
              className="border-b-2 border-transparent px-4 py-4 text-body-sm font-medium text-calm-charcoal hover:text-accent"
            >
              분석
            </Link>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Pending Applications Section */}
        <section className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-calm-obsidian">승인 대기 중 ({pendingPros.length})</h2>
          </div>

          <div className="space-y-6">
            {pendingPros.map((pro) => (
              <div key={pro.id} className="card">
                <div className="grid gap-6 lg:grid-cols-[300px,1fr]">
                  {/* Left: Pro Image & Basic Info */}
                  <div>
                    <img
                      src={pro.profileImage}
                      alt={pro.name}
                      className="mb-4 h-64 w-full rounded-xl object-cover"
                    />
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-calm-obsidian">{pro.name}</h3>
                      <p className="text-body-sm text-calm-ash">{pro.title}</p>
                      <p className="text-body-sm text-calm-charcoal">📍 {pro.location}</p>
                      <p className="text-body-xs text-calm-ash">신청: {pro.appliedAt}</p>
                    </div>
                  </div>

                  {/* Right: Detailed Info */}
                  <div className="space-y-6 p-6">
                    {/* Contact */}
                    <div>
                      <h4 className="mb-2 text-body-sm font-semibold uppercase tracking-wide text-calm-ash">
                        연락처
                      </h4>
                      <p className="text-body-sm text-calm-charcoal">📧 {pro.email}</p>
                      <p className="text-body-sm text-calm-charcoal">📱 {pro.phone}</p>
                    </div>

                    {/* Specialties */}
                    <div>
                      <h4 className="mb-2 text-body-sm font-semibold uppercase tracking-wide text-calm-ash">
                        전문 분야
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {pro.specialties.map((specialty) => (
                          <span key={specialty} className="tag">
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Experience */}
                    <div>
                      <h4 className="mb-2 text-body-sm font-semibold uppercase tracking-wide text-calm-ash">
                        투어 경력
                      </h4>
                      <p className="text-body-sm text-calm-charcoal">{pro.tourExperience}</p>
                    </div>

                    {/* Certifications */}
                    <div>
                      <h4 className="mb-2 text-body-sm font-semibold uppercase tracking-wide text-calm-ash">
                        자격증
                      </h4>
                      <ul className="space-y-1">
                        {pro.certifications.map((cert, index) => (
                          <li key={index} className="text-body-sm text-calm-charcoal">
                            ✓ {cert}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 border-t border-calm-stone pt-6">
                      <button
                        className="btn-primary flex-1"
                        onClick={() => handleApprove(pro.id)}
                        disabled={processingId === pro.id}
                      >
                        승인
                      </button>
                      <button
                        className="btn-ghost flex-1"
                        onClick={() => handleReject(pro.id)}
                        disabled={processingId === pro.id}
                      >
                        거부
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {pendingPros.length === 0 && (
            <div className="rounded-2xl border border-calm-stone bg-calm-cloud/50 p-12 text-center">
              <p className="text-body-lg text-calm-ash">대기 중인 신청이 없습니다.</p>
            </div>
          )}
        </section>

        {/* Approved Pros Section */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-calm-obsidian">승인된 프로 ({approvedPros.length})</h2>
            <input
              type="search"
              placeholder="프로 검색..."
              className="input w-64"
            />
          </div>

          <div className="table-container">
            <table className="w-full">
              <thead>
                <tr className="table-header">
                  <th className="text-left">이름</th>
                  <th className="text-left">직함</th>
                  <th className="text-left">지역</th>
                  <th className="text-center">조회수</th>
                  <th className="text-center">Leads</th>
                  <th className="text-center">매칭</th>
                  <th className="text-center">평점</th>
                  <th className="text-center">구독</th>
                  <th className="text-right">작업</th>
                </tr>
              </thead>
              <tbody>
                {approvedPros.filter(pro => pro.name).map((pro) => (
                  <tr key={pro.id} className="table-row">
                    <td className="table-cell font-semibold text-calm-obsidian">{pro.name}</td>
                    <td className="table-cell">{pro.title}</td>
                    <td className="table-cell">{pro.location}</td>
                    <td className="table-cell text-center font-mono">{pro.profileViews}</td>
                    <td className="table-cell text-center font-mono">{pro.leads}</td>
                    <td className="table-cell text-center font-mono">{pro.matchedLessons}</td>
                    <td className="table-cell text-center font-mono">{pro.rating}</td>
                    <td className="table-cell text-center">
                      <span
                        className={`rounded-full px-3 py-1 text-body-xs font-medium ${
                          pro.subscriptionTier === 'pro'
                            ? 'bg-success-bg text-success'
                            : 'bg-calm-cloud text-calm-charcoal'
                        }`}
                      >
                        {pro.subscriptionTier === 'pro' ? 'Pro' : 'Basic'}
                      </span>
                    </td>
                    <td className="table-cell text-right">
                      <Link
                        href={`/admin/pros/${pro.id}`}
                        className="rounded-lg border border-accent bg-accent/10 px-4 py-2 text-body-sm font-medium text-accent hover:bg-accent hover:text-white"
                      >
                        관리
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {approvedPros.length === 0 && (
            <div className="rounded-2xl border border-calm-stone bg-calm-cloud/50 p-12 text-center">
              <p className="text-body-lg text-calm-ash">승인된 프로가 없습니다.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
