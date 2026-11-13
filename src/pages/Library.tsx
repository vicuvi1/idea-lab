import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useStore } from '../store'
import { fitFor, weightedScore } from '../lib/scoring'
import { IDEA_COLORS, STATUSES } from '../lib/criteria'
import { IdeaCard } from '../components/IdeaCard'
import { blankIdea } from '../data/seed'

type Sort = 'rank' | 'fit' | 'score' | 'cost' | 'mvp' | 'title' | 'updated'

export default function Library() {
  const { state, addIdea } = useStore()
  const nav = useNavigate()
  const [params, setParams] = useSearchParams()
  const [q, setQ] = useState('')
  const [industry, setIndustry] = useState('')
  const [comp, setComp] = useState('')
  const [batch, setBatch] = useState('')
  const [sort, setSort] = useState<Sort>('fit')
  const status = params.get('status') ?? ''

  const createIdea = () => {
    const idea = blankIdea(IDEA_COLORS[state.ideas.length % IDEA_COLORS.length])
    addIdea(idea)
    nav(`/idea/${idea.id}/edit`)
  }
  const created = useRef(false)
  useEffect(() => {
    if (params.get('new') && !created.current) { created.current = true; createIdea() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const batches = [...new Set(state.ideas.map((i) => i.batch ?? 'Original 8 ideas'))]
  const industries = [...new Set(state.ideas.map((i) => i.industry).filter(Boolean))].sort()
  const list = useMemo(() => {
    const s = q.toLowerCase()
    return state.ideas
      .filter((i) => !status || i.status === status)
      .filter((i) => !industry || i.industry === industry)
      .filter((i) => !comp || i.numbers.competitionLevel === comp)
      .filter((i) => !batch || (i.batch ?? 'Original 8 ideas') === batch)
      .filter((i) => !s || [i.title, i.summary, i.industry, ...i.tags, i.story ?? ''].join(' ').toLowerCase().includes(s))
      .map((idea) => ({ idea, fit: fitFor(idea, state.profile).total, score: weightedScore(idea, state.profile) }))
      .sort((a, b) => {
        switch (sort) {
          case 'rank': return (a.idea.rank ?? 999) - (b.idea.rank ?? 999)
          case 'fit': return b.fit - a.fit
          case 'score': return b.score - a.score
          case 'cost': return a.idea.numbers.cashMax - b.idea.numbers.cashMax
          case 'mvp': return a.idea.numbers.mvpWeeksMax - b.idea.numbers.mvpWeeksMax
          case 'title': return a.idea.title.localeCompare(b.idea.title)
          case 'updated': return (b.idea.updatedAt ?? '').localeCompare(a.idea.updatedAt ?? '')
        }
      })
  }, [state, q, status, industry, comp, sort, batch])

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Idea Library</h1>
          <p className="sub">{state.ideas.length} ideas. Click one to see the full analysis.</p>
        </div>
        <button className="btn primary" onClick={createIdea}>+ New idea</button>
      </div>

      <div className="card" style={{ padding: 14 }}>
        <div className="grid g4" style={{ gap: 10 }}>
          <input className="input" placeholder="Search ideas…" value={q} onChange={(e) => setQ(e.target.value)} />
          <select className="select" value={status} onChange={(e) => setParams(e.target.value ? { status: e.target.value } : {})}>
            <option value="">All statuses</option>
            {STATUSES.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
          </select>
          <select className="select" value={industry} onChange={(e) => setIndustry(e.target.value)}>
            <option value="">All industries</option>
            {industries.map((i) => <option key={i}>{i}</option>)}
          </select>
          <div className="row" style={{ flexWrap: 'nowrap' }}>
            <select className="select" value={comp} onChange={(e) => setComp(e.target.value)}>
              <option value="">Any competition</option>
              <option value="low">Low competition</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <select className="select" value={sort} onChange={(e) => setSort(e.target.value as Sort)} aria-label="Sort">
              <option value="fit">Sort: fit for me</option>
              <option value="rank">Sort: research rank</option>
              <option value="score">Sort: weighted score</option>
              <option value="cost">Sort: cheapest</option>
              <option value="mvp">Sort: fastest MVP</option>
              <option value="updated">Sort: recently edited</option>
              <option value="title">Sort: A–Z</option>
            </select>
          </div>
        </div>
      </div>

      {batches.length > 1 && (
        <div className="row mt" style={{ gap: 6 }}>
          {['', ...batches].map((b) => (
            <span key={b || 'all'} className={'tag chip' + (batch === b ? ' on' : '')} onClick={() => setBatch(b)}>{b || `All (${state.ideas.length})`}</span>
          ))}
        </div>
      )}

      {list.length === 0 ? (
        <div className="empty mt">No ideas match these filters.</div>
      ) : (
        <div className="grid g3 mt">
          {list.map(({ idea, fit, score }) => <IdeaCard key={idea.id} idea={idea} fit={fit} score={score} />)}
        </div>
      )}
    </>
  )
}
