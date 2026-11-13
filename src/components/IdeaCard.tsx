import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import type { Idea } from '../types'
import { StatusBadge } from './ui'

export function IdeaCard({ idea, fit, score }: { idea: Idea; fit: number; score: number }) {
  return (
    <Link to={`/idea/${idea.id}`} className="card idea-card" style={{ '--c': idea.color } as CSSProperties}>
      <div className="row between">
        <StatusBadge status={idea.status} />
        <span className="row" style={{ gap: 6 }}>
          {idea.favorite && <span title="Favourite">★</span>}
          {idea.rank && <span className="tag" title="Rank in the research report">Research #{idea.rank}</span>}
          <span className="score-pill" title="Fit for you (0–100)">Fit {fit}</span>
        </span>
      </div>
      <h3>{idea.title}</h3>
      <p className="summary">{idea.summary || <span className="muted">No summary yet</span>}</p>
      <div className="row small text-2" style={{ gap: 14 }}>
        <span>💰 {idea.priceLabel || '—'}</span>
        <span>⏱ {idea.numbers.mvpWeeksMin}–{idea.numbers.mvpWeeksMax} wk</span>
        <span title="Weighted score">★ {score}</span>
      </div>
      <div className="row" style={{ gap: 6 }}>
        {idea.industry && <span className="tag">{idea.industry}</span>}
        <span className="tag">Competition: {idea.numbers.competitionLevel}</span>
      </div>
    </Link>
  )
}
