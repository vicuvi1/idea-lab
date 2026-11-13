import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import type { Idea } from '../types'

/** Horizontal ranked bars: one value per idea. Text in text colour, bar in the idea colour. */
export function RankBars({ rows, max = 100, unit = '' }: { rows: { idea: Idea; value: number; hint?: string }[]; max?: number; unit?: string }) {
  return (
    <div className="stack" style={{ gap: 8 }}>
      {rows.map(({ idea, value, hint }, i) => (
        <Link
          key={idea.id}
          to={`/idea/${idea.id}`}
          title={`${idea.title}: ${value}${unit}${hint ? ' — ' + hint : ''}`}
          style={{ display: 'grid', gridTemplateColumns: '24px minmax(120px, 230px) 1fr 48px', gap: 10, alignItems: 'center', padding: '4px 0' }}
        >
          <span className="muted small num">#{i + 1}</span>
          <span className="row" style={{ gap: 8, flexWrap: 'nowrap', overflow: 'hidden' }}>
            <span className="swatch" style={{ '--c': idea.color } as CSSProperties} />
            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 500 }}>{idea.title}</span>
          </span>
          <div className="meter" style={{ height: 10 }}>
            <span style={{ width: `${Math.max(2, (value / max) * 100)}%`, '--c': idea.color } as CSSProperties} />
          </div>
          <span className="num" style={{ textAlign: 'right', fontWeight: 700 }}>{value}{unit}</span>
        </Link>
      ))}
    </div>
  )
}

export function ChartTip({ active, payload, label, fmt }: { active?: boolean; payload?: { name: string; value: number; color?: string; stroke?: string; fill?: string }[]; label?: string | number; fmt?: (v: number) => string }) {
  if (!active || !payload?.length) return null
  return (
    <div className="chart-tip">
      {label !== undefined && <div style={{ fontWeight: 600, marginBottom: 4 }}>{label}</div>}
      {payload.map((p) => (
        <div key={p.name} className="row" style={{ gap: 6, flexWrap: 'nowrap' }}>
          <span className="swatch" style={{ '--c': p.stroke || p.color || p.fill } as CSSProperties} />
          <span className="k">{p.name}</span>
          <span style={{ marginLeft: 'auto', fontWeight: 600, paddingLeft: 10 }} className="num">{fmt ? fmt(p.value) : p.value}</span>
        </div>
      ))}
    </div>
  )
}
