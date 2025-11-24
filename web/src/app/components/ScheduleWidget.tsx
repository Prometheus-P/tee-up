"use client"

import { useMemo, useState } from 'react'

function addDays(d: Date, n: number) {
  const nd = new Date(d)
  nd.setDate(d.getDate() + n)
  return nd
}

function fmt(d: Date) {
  return d.toLocaleDateString('ko-KR', { month: 'numeric', day: 'numeric', weekday: 'short' })
}

const defaultSlots = ['09:00', '10:30', '13:00', '15:00', '19:30']

export default function ScheduleWidget({ onSelect }: { onSelect?: (iso: string) => void }) {
  const days = useMemo(() => Array.from({ length: 7 }).map((_, i) => addDays(new Date(), i)), [])
  const [dayIndex, setDayIndex] = useState(0)
  const [time, setTime] = useState('')

  const dateISO = useMemo(() => days[dayIndex].toISOString().slice(0, 10), [days, dayIndex])

  const handleSelect = (t: string) => {
    setTime(t)
    onSelect?.(`${dateISO}T${t}:00`)
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2 overflow-x-auto">
        {days.map((d, i) => (
          <button
            key={i}
            onClick={() => setDayIndex(i)}
            className={
              'min-w-[110px] rounded-2xl border px-3 py-2 text-sm ' +
              (i === dayIndex
                ? 'border-[var(--lux-gold)] bg-[var(--lux-gold)]/15 text-white'
                : 'border-white/10 bg-white/5 text-[var(--lux-rose)]')
            }
          >
            {fmt(d)}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {defaultSlots.map((t) => (
          <button
            key={t}
            onClick={() => handleSelect(t)}
            className={
              'rounded-full border px-3 py-1 text-sm ' +
              (time === t
                ? 'border-[var(--lux-gold)] bg-[var(--lux-gold)]/20 text-white'
                : 'border-white/15 bg-white/5 text-[var(--lux-rose)]/90 hover:border-white/25')
            }
          >
            {t}
          </button>
        ))}
      </div>

      <div className="pt-1 text-sm text-[var(--lux-rose)]/80">
        선택: {dateISO} {time || '—'}
      </div>
    </div>
  )
}

