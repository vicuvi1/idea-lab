import { useState, type CSSProperties } from 'react'
import { CartesianGrid, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ReferenceLine, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis } from 'recharts'
import { useStore } from '../store'
import { CRITERIA } from '../lib/criteria'
import { rawScore, weightedScore } from '../lib/scoring'
import { RankBars } from '../components/charts'
import { Priorities } from '../components/Priorities'
import { IdeaLink } from '../components/ui'
import type { Idea } from '../types'

const MAX_RADAR = 3 // more overlapping shapes become unreadable

export default function Compare() {
  const { state, updateIdea } = useStore()
  const ideas = state.ideas.filter((i) => i.status !== 'dropped')
  const ranked = ideas.map((idea) => ({ idea, value: weightedScore(idea, state.profile) })).sort((a, b) => b.value - a.value)
  const [picked, setPicked] = useState<string[]>(() => ranked.slice(0, 2).map((r) => r.idea.id))
  const pickedIdeas = picked.map((id) => state.ideas.find((i) => i.id === id)).filter(Boolean) as Idea[]

  const toggle = (id: string) =>
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : p.length >= MAX_RADAR ? [...p.slice(1), id] : [...p, id]))

  const radarData = CRITERIA.map((c) => Object.fromEntries([['label', c.label], ...pickedIdeas.map((i) => [i.title, i.scores[c.key]])]))

  // Value = pain + willingness to pay + global potential; Ease = easy to build + easy to sell + low competition
  const matrix = ideas.map((i, n) => ({
    n: n + 1,
    title: i.title,
    color: i.color,
    value: +((i.scores.pain + i.scores.willingnessToPay + i.scores.globalPotential) / 3).toFixed(1),
    ease: +((i.scores.easyToBuild + i.scores.easyToSell + i.scores.lowCompetition) / 3).toFixed(1),
  }))

  const lo = (k: 'value' | 'ease') => Math.floor(Math.min(...matrix.map((m) => m[k])) - 0.5)
  const hi = (k: 'value' | 'ease') => Math.ceil(Math.max(...matrix.map((m) => m[k])) + 0.5)
  const ex = matrix.length ? [lo('ease'), hi('ease')] : [0, 10]
  const vy = matrix.length ? [lo('value'), hi('value')] : [0, 10]

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Compare & Score</h1>
          <p className="sub">Change the scores and your priorities. Rankings update live everywhere.</p>
        </div>
      </div>

      <div className="grid g2">
        <div className="card">
          <div className="card-title">Ranking: weighted score</div>
          <RankBars rows={ranked} />
          <p className="muted small mt">Weighted by your priorities on the right. Raw total ignores priorities.</p>
        </div>
        <div className="card">
          <div className="card-title">What matters to you (priorities)</div>
          <Priorities />
        </div>
      </div>

      <div className="grid g2 mt">
        <div className="card">
          <div className="card-title">Value vs. ease</div>
          <p className="muted small" style={{ marginTop: -6, marginBottom: 8 }}>Top-right = high value and easy. Value = pain + willingness to pay + global reach. Ease = build + sell + low competition.</p>
          <div style={{ height: 340 }}>
            <ResponsiveContainer>
              <ScatterChart margin={{ top: 16, right: 24, bottom: 24, left: 0 }}>
                <CartesianGrid stroke="var(--line)" strokeDasharray="2 4" />
                <XAxis type="number" dataKey="ease" name="Ease" domain={ex} tick={{ fill: 'var(--muted)', fontSize: 12 }} stroke="var(--line)" label={{ value: 'Ease →', position: 'insideBottomRight', offset: -10, fill: 'var(--text-2)', fontSize: 12 }} />
                <YAxis type="number" dataKey="value" name="Value" domain={vy} tick={{ fill: 'var(--muted)', fontSize: 12 }} stroke="var(--line)" label={{ value: 'Value →', angle: -90, position: 'insideLeft', offset: 18, fill: 'var(--text-2)', fontSize: 12 }} />
                <ZAxis range={[110, 110]} />
                <ReferenceLine x={(ex[0] + ex[1]) / 2} stroke="var(--text-2)" strokeOpacity={0.4} />
                <ReferenceLine y={(vy[0] + vy[1]) / 2} stroke="var(--text-2)" strokeOpacity={0.4} />
                <Tooltip cursor={false} content={({ active, payload }) => {
                  const p = payload?.[0]?.payload as (typeof matrix)[number] | undefined
                  return active && p ? <div className="chart-tip"><strong>{p.title}</strong><div className="k">Value {p.value} · Ease {p.ease}</div></div> : null
                }} />
                <Scatter data={matrix} isAnimationActive={false} shape={(props: { cx?: number; cy?: number; payload?: { color: string; n: number } }) => (
                  <g>
                    <circle cx={props.cx} cy={props.cy} r={10} fill={props.payload?.color} stroke="var(--surface)" strokeWidth={2} />
                    <text x={props.cx} y={(props.cy ?? 0) + 4} textAnchor="middle" fontSize={11} fontWeight={700} fill="#0b0b0b">{props.payload?.n}</text>
                  </g>
                )} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <div className="legend" style={{ gap: '4px 14px' }}>
            {matrix.map((m) => <span key={m.n}><span className="swatch" style={{ '--c': m.color } as CSSProperties} /><b className="num">{m.n}</b> {m.title}</span>)}
          </div>
        </div>

        <div className="card">
          <div className="card-title">Head-to-head (pick up to {MAX_RADAR})</div>
          <div className="row" style={{ gap: 6, marginBottom: 8 }}>
            {ideas.map((i) => (
              <span key={i.id} className={'tag chip' + (picked.includes(i.id) ? ' on' : '')} onClick={() => toggle(i.id)}
                style={picked.includes(i.id) ? { background: i.color, borderColor: i.color, color: '#0b0b0b' } : undefined}>{i.title}</span>
            ))}
          </div>
          <div style={{ height: 300 }}>
            <ResponsiveContainer>
              <RadarChart data={radarData} outerRadius="70%">
                <PolarGrid stroke="var(--line)" />
                <PolarAngleAxis dataKey="label" tick={{ fill: 'var(--text-2)', fontSize: 11 }} />
                <PolarRadiusAxis domain={[0, 10]} tick={false} axisLine={false} />
                {pickedIdeas.map((i) => <Radar isAnimationActive={false} key={i.id} name={i.title} dataKey={i.title} stroke={i.color} fill={i.color} fillOpacity={0.12} strokeWidth={2} dot={{ r: 4, stroke: 'var(--surface)', strokeWidth: 2, fill: i.color }} />)}
                <Tooltip content={({ active, payload, label }) => active && payload?.length ? (
                  <div className="chart-tip"><strong>{label}</strong>{payload.map((p) => <div key={String(p.name)} className="row" style={{ gap: 6 }}><span className="swatch" style={{ '--c': p.stroke } as CSSProperties} />{p.name}<b style={{ marginLeft: 'auto' }}>{p.value}</b></div>)}</div>
                ) : null} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="legend">{pickedIdeas.map((i) => <span key={i.id}><span className="swatch" style={{ '--c': i.color } as CSSProperties} />{i.title}</span>)}</div>
        </div>
      </div>

      <div className="card mt">
        <div className="card-title">Score table (click a number to change it)</div>
        <div className="tbl-wrap">
          <table className="tbl">
            <thead>
              <tr><th>Idea</th>{CRITERIA.map((c) => <th key={c.key} className="r" title={c.hint}>{c.label}</th>)}<th className="r">Raw /80</th><th className="r">Weighted</th></tr>
            </thead>
            <tbody>
              {ideas.map((i) => (
                <tr key={i.id}>
                  <td style={{ whiteSpace: 'nowrap' }}><IdeaLink idea={i} /></td>
                  {CRITERIA.map((c) => (
                    <td key={c.key} className="r">
                      <select className="select" style={{ width: 58, padding: '3px 6px' }} value={i.scores[c.key]} aria-label={`${i.title} ${c.label}`}
                        onChange={(e) => updateIdea(i.id, (x) => ({ ...x, scores: { ...x.scores, [c.key]: +e.target.value } }))}>
                        {Array.from({ length: 11 }, (_, n) => <option key={n}>{n}</option>)}
                      </select>
                    </td>
                  ))}
                  <td className="r">{rawScore(i)}</td>
                  <td className="r"><b>{weightedScore(i, state.profile)}</b></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card mt">
        <div className="card-title">Key numbers</div>
        <div className="tbl-wrap">
          <table className="tbl">
            <thead><tr><th>Idea</th><th className="r">Cash, 3 months</th><th className="r">Time to MVP</th><th>Price</th><th>Competition</th><th>Who sells</th></tr></thead>
            <tbody>
              {ideas.map((i) => (
                <tr key={i.id}>
                  <td style={{ whiteSpace: 'nowrap' }}><IdeaLink idea={i} /></td>
                  <td className="r">€{i.numbers.cashMin}–{i.numbers.cashMax}</td>
                  <td className="r">{i.numbers.mvpWeeksMin}–{i.numbers.mvpWeeksMax} wk</td>
                  <td>{i.numbers.priceLabel || i.priceLabel}</td>
                  <td><span style={{ color: { low: 'var(--good)', medium: 'var(--warn)', high: 'var(--bad)' }[i.numbers.competitionLevel], fontWeight: 600 }}>● {{ low: 'Low', medium: 'Medium', high: 'High' }[i.numbers.competitionLevel]}</span> <span className="muted small">{i.numbers.competition}</span></td>
                  <td className="text-2">{i.numbers.whoSells}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
