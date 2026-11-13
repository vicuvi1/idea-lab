import type { CSSProperties, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { Idea, Status } from '../types'
import { STATUSES } from '../lib/criteria'

/** Render text with **bold** segments. */
export function Rich({ text }: { text?: string }) {
  if (!text) return null
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return (
    <>
      {parts.map((p, i) => (p.startsWith('**') && p.endsWith('**') ? <strong key={i}>{p.slice(2, -2)}</strong> : <span key={i}>{p}</span>))}
    </>
  )
}

export function StatusBadge({ status }: { status: Status }) {
  const s = STATUSES.find((x) => x.key === status) ?? STATUSES[0]
  return <span className="status" style={{ '--c': s.color } as CSSProperties}>{s.label}</span>
}

export function Meter({ value, max = 100, color }: { value: number; max?: number; color?: string }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100))
  return (
    <div className="meter" role="meter" aria-valuenow={value} aria-valuemax={max} aria-valuemin={0}>
      <span style={{ width: `${pct}%`, ...(color ? ({ '--c': color } as CSSProperties) : {}) }} />
    </div>
  )
}

export function Stat({ value, label }: { value: ReactNode; label: string }) {
  return (
    <div className="card">
      <div className="stat">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  )
}

export function IdeaLink({ idea }: { idea: Idea }) {
  return (
    <Link to={`/idea/${idea.id}`} className="row" style={{ gap: 8, flexWrap: 'nowrap' }}>
      <span className="swatch" style={{ '--c': idea.color } as CSSProperties} />
      <span style={{ fontWeight: 600 }}>{idea.title}</span>
    </Link>
  )
}

export function Section({ title, children, right }: { title: string; children: ReactNode; right?: ReactNode }) {
  return (
    <section className="mt-lg">
      <div className="row between" style={{ marginBottom: 12 }}>
        <h2>{title}</h2>
        {right}
      </div>
      {children}
    </section>
  )
}

export const money = (n: number, cur = '$') => (n < 0 ? '−' : '') + cur + Math.abs(Math.round(n)).toLocaleString('en-US')
export const uid = () => Math.random().toString(36).slice(2, 10)
