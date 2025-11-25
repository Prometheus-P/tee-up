"use client"

import { useEffect, useMemo, useState } from 'react'

type Service = { name: string; duration: string; price: string }

export default function BookingModal({
  open,
  onClose,
  proName,
  services,
  selectedDateTime,
  type = 'reservation',
}: {
  open: boolean
  onClose: () => void
  proName: string
  services?: Service[]
  selectedDateTime?: string
  type?: 'reservation' | 'waitlist'
}) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [people, setPeople] = useState(1)
  const [location, setLocation] = useState('청담 Studio')
  const [service, setService] = useState(services?.[0]?.name ?? '')
  const [note, setNote] = useState('')
  const [agree, setAgree] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (open) setSubmitted(false)
  }, [open])

  const disabled = useMemo(() => !name || !phone || !agree, [name, phone, agree])

  if (!open) return null

  const handleSubmit = () => {
    // For MVP: just log and show confirmation
    console.log({ type, proName, selectedDateTime, name, phone, people, location, service, note })
    setSubmitted(true)
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm">
      <div className="mx-auto mt-16 max-w-lg rounded-3xl border border-white/10 bg-[var(--lux-carbon)]/95 p-6 text-[var(--lux-rose)] shadow-2xl">
        {!submitted ? (
          <>
            <div className="mb-4 flex items-center justify-between">
              <h4 className="font-display text-xl text-white">
                {type === 'reservation' ? '레슨 예약 정보' : '대기 신청'}
              </h4>
              <button onClick={onClose} className="rounded-full border border-white/20 px-3 py-1 text-sm text-white/80">
                닫기
              </button>
            </div>
            <p className="mb-4 text-sm text-[var(--lux-rose)]/80">
              담당 프로: <span className="text-white">{proName}</span>
              {selectedDateTime ? (
                <>
                  {' '}
                  · 예약 일시 <span className="text-white">{selectedDateTime.replace('T', ' ')}</span>
                </>
              ) : null}
            </p>

            <div className="grid gap-3">
              <input
                className="rounded-2xl border border-white/15 bg-white/5 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--lux-gold)]/40"
                placeholder="성함"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="rounded-2xl border border-white/15 bg-white/5 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--lux-gold)]/40"
                placeholder="연락처 (- 없이 입력)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <div className="grid grid-cols-2 gap-3">
                <select
                  className="rounded-2xl border border-white/15 bg-white/5 px-3 py-2"
                  value={people}
                  onChange={(e) => setPeople(parseInt(e.target.value || '1', 10))}
                >
                  {[1, 2, 3].map((n) => (
                    <option key={n} value={n}>
                      레슨 인원 {n}
                    </option>
                  ))}
                </select>
                <select
                  className="rounded-2xl border border-white/15 bg-white/5 px-3 py-2"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                >
                  {(services?.length ? services : [{ name: 'Signature Lesson', duration: '90m', price: '₩180,000' }]).map(
                    (s) => (
                      <option key={s.name} value={s.name}>
                        {s.name} · {s.duration} · {s.price}
                      </option>
                    ),
                  )}
                </select>
              </div>
              <input
                className="rounded-2xl border border-white/15 bg-white/5 px-3 py-2"
                placeholder="레슨 장소 (예: 청담 Studio)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <textarea
                className="min-h-[80px] rounded-2xl border border-white/15 bg-white/5 px-3 py-2"
                placeholder="특별 요청사항"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
              <label className="mt-1 flex items-center gap-2 text-xs text-[var(--lux-rose)]/75">
                <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                예약 및 취소 규정에 동의합니다.
              </label>
            </div>

            <button
              onClick={handleSubmit}
              disabled={disabled}
              className="mt-4 w-full rounded-full bg-gradient-to-r from-[#f4d9b0] to-[#c0a36b] px-6 py-3 text-sm font-semibold text-[#20190f] shadow-[0_15px_40px_rgba(192,163,107,0.3)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {type === 'reservation' ? '예약 신청하기' : '대기 신청하기'}
            </button>
          </>
        ) : (
          <div className="text-center">
            <h4 className="font-display text-xl text-white">요청이 접수되었습니다</h4>
            <p className="mt-2 text-sm text-[var(--lux-rose)]/80">
              담당 컨시어지가 확인 후 신속히 안내해 드리겠습니다.
            </p>
            <button onClick={onClose} className="mt-4 rounded-full border border-white/20 px-6 py-2 text-sm text-white">
              닫기
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

