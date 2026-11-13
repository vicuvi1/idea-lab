import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip } from 'recharts'
import type { Idea } from '../types'
import { CRITERIA } from '../lib/criteria'
import { useStore } from '../store'
import { ChartTip } from './charts'

export function ScoreEditor({ idea }: { idea: Idea }) {
  const { state, updateIdea } = useStore()
  const avg = (k: keyof Idea['scores']) => state.ideas.reduce((s, i) => s + i.scores[k], 0) / state.ideas.length
  const data = CRITERIA.map((c) => ({ label: c.label, [idea.title]: idea.scores[c.key], 'Average of all ideas': +avg(c.key).toFixed(1) }))
  return (
    <div className="grid g2">
      <div className="card stack">
        <div className="card-title">Your scores (0–10)</div>
        {CRITERIA.map((c) => (
          <label key={c.key} className="field" title={c.hint}>
            <span className="row between"><span>{c.label} <span className="muted">· {c.hint}</span></span><b className="num">{idea.scores[c.key]}</b></span>
            <input type="range" min={0} max={10} value={idea.scores[c.key]} onChange={(e) => updateIdea(idea.id, (i) => ({ ...i, scores: { ...i.scores, [c.key]: +e.target.value } }))} />
          </label>
        ))}
      </div>
      <div className="card">
        <div className="card-title">Shape vs. all ideas</div>
        <div className="legend">
          <span><span className="swatch" style={{ background: idea.color }} />{idea.title}</span>
          <span><span className="swatch" style={{ background: 'var(--muted)' }} />Average of all ideas</span>
        </div>
        <div style={{ height: 360 }}>
          <ResponsiveContainer>
            <RadarChart data={data} outerRadius="72%">
              <PolarGrid stroke="var(--line)" />
              <PolarAngleAxis dataKey="label" tick={{ fill: 'var(--text-2)', fontSize: 12 }} />
              <PolarRadiusAxis domain={[0, 10]} tick={false} axisLine={false} />
              <Radar isAnimationActive={false} name="Average of all ideas" dataKey="Average of all ideas" stroke="var(--muted)" fill="var(--muted)" fillOpacity={0.08} strokeWidth={2} strokeDasharray="4 3" />
              <Radar isAnimationActive={false} name={idea.title} dataKey={idea.title} stroke={idea.color} fill={idea.color} fillOpacity={0.25} strokeWidth={2} dot={{ r: 4 }} />
              <Tooltip content={<ChartTip />} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
