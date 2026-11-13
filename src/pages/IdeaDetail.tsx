import { useState, type CSSProperties } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useIdea, useStore } from '../store'
import { fitFor, validationStats, weightedScore } from '../lib/scoring'
import { STATUSES } from '../lib/criteria'
import type { Status } from '../types'
import { ExtLink, Meter, Rich } from '../components/ui'
import { RevenueCalc } from '../components/RevenueCalc'
import { InterviewLog } from '../components/InterviewLog'
import { ScoreEditor } from '../components/ScoreEditor'

const TABS = ['Overview', 'Business', 'Risks & Questions', 'Scores', 'Validation', 'Notes'] as const
type Tab = (typeof TABS)[number]

export default function IdeaDetail() {
  const { id } = useParams()
  const idea = useIdea(id)
  const { state, updateIdea, deleteIdea } = useStore()
  const nav = useNavigate()
  const [tab, setTab] = useState<Tab>('Overview')
  if (!idea) return <div className="empty">Idea not found. <Link to="/ideas">Back to library</Link></div>

  const fit = fitFor(idea, state.profile)
  const v = validationStats(idea)
  const style = { '--c': idea.color } as CSSProperties

  return (
    <div style={style}>
      <div className="row small muted" style={{ marginBottom: 10 }}><Link to="/ideas">← Idea Library</Link></div>
      <div className="card hero">
        <div className="row between" style={{ alignItems: 'flex-start' }}>
          <div style={{ flex: 1, minWidth: 280 }}>
            <div className="row" style={{ gap: 6 }}>{idea.tags.map((t) => <span key={t} className="tag">{t}</span>)}</div>
            <h1 style={{ marginTop: 10 }}>{idea.title}</h1>
            {idea.hook && <p className="hook"><Rich text={idea.hook} /></p>}
            <p className="text-2 mt">{idea.summary}</p>
          </div>
          <div className="stack" style={{ minWidth: 200 }}>
            <div className="row" style={{ justifyContent: 'flex-end' }}>
              <button className="btn" title="Favourite" onClick={() => updateIdea(idea.id, { favorite: !idea.favorite })}>{idea.favorite ? '★' : '☆'}</button>
              <Link to={`/idea/${idea.id}/edit`} className="btn">✎ Edit</Link>
              <button className="btn danger" onClick={() => { if (confirm(`Delete "${idea.title}"?`)) { deleteIdea(idea.id); nav('/ideas') } }}>Delete</button>
            </div>
            <select className="select" value={idea.status} onChange={(e) => updateIdea(idea.id, { status: e.target.value as Status })} aria-label="Status">
              {STATUSES.map((s) => <option key={s.key} value={s.key}>Status: {s.label}</option>)}
            </select>
          </div>
        </div>
        <div className="grid g4 mt">
          <div><div className="stat">{fit.total}</div><div className="stat-label">Fit for you / 100</div><Meter value={fit.total} color={idea.color} /></div>
          <div><div className="stat">{weightedScore(idea, state.profile)}</div><div className="stat-label">Weighted score / 100</div><Meter value={weightedScore(idea, state.profile)} color={idea.color} /></div>
          <div><div className="stat">€{idea.numbers.cashMin}–{idea.numbers.cashMax}</div><div className="stat-label">Cash, first 3 months</div></div>
          <div><div className="stat">{idea.numbers.mvpWeeksMin}–{idea.numbers.mvpWeeksMax} wk</div><div className="stat-label">Time to MVP</div></div>
        </div>
      </div>

      <div className="tabs mt">
        {TABS.map((t) => (
          <button key={t} className={'tab' + (t === tab ? ' on' : '')} onClick={() => setTab(t)}>
            {t}{t === 'Validation' && v.n ? ` (${v.n})` : ''}
          </button>
        ))}
      </div>

      {tab === 'Overview' && (
        <div className="stack" style={{ gap: 24 }}>
          {idea.whyNow && (<div className="card" style={{ borderLeft: '3px solid var(--accent)' }}><div className="card-title">Why now</div><p><Rich text={idea.whyNow} /></p></div>)}
          {idea.story && (<div><h2 style={{ marginBottom: 10 }}>The problem, in a real story</h2><div className="story"><Rich text={idea.story} /></div></div>)}
          {idea.whyReal.length > 0 && (
            <div><h2 style={{ marginBottom: 10 }}>Why this problem is real</h2>
              <div className="grid g2">{idea.whyReal.map((w) => <div key={w.title} className="card why"><h3>{w.title}</h3><p className="text-2 small mt"><Rich text={w.text} /></p></div>)}</div>
            </div>
          )}
          {idea.evidence && idea.evidence.length > 0 && (
            <div><h2 style={{ marginBottom: 10 }}>Evidence from research</h2>
              <div className="card"><ul className="clean">{idea.evidence.map((e, i) => <li key={i}><Rich text={e} /></li>)}</ul></div>
            </div>
          )}
          {idea.whoPays.length > 0 && (
            <div><h2 style={{ marginBottom: 10 }}>Who pays</h2>
              <div className="card"><ul className="clean">{idea.whoPays.map((w) => <li key={w.label}><strong>{w.label}:</strong> {w.text}</li>)}</ul></div>
            </div>
          )}
          {idea.solution.length > 0 && (
            <div><h2 style={{ marginBottom: 10 }}>How the product solves it</h2>
              <ol className="flow">{idea.solution.map((s, i) => <li key={i}>{s.title && <strong>{s.title}: </strong>}<Rich text={s.text} /></li>)}</ol>
            </div>
          )}
          <div className="grid g2">
            <div className="card"><div className="card-title">MVP: must-have</div><ul className="clean">{idea.mvp.must.map((m) => <li key={m}>{m}</li>)}</ul></div>
            <div className="card"><div className="card-title">Later</div><ul className="clean">{idea.mvp.later.map((m) => <li key={m}>{m}</li>)}</ul></div>
          </div>
          {idea.techStack.length > 0 && (
            <div><h2 style={{ marginBottom: 10 }}>Tech stack</h2><div className="row" style={{ gap: 6 }}>{idea.techStack.map((t) => <span key={t} className="tag">{t}</span>)}</div></div>
          )}
          {idea.timeline.length > 0 && (
            <div><h2 style={{ marginBottom: 10 }}>Timeline</h2>
              <div className="timeline">{idea.timeline.map((t) => <div key={t.when} className="tl"><div className="wk">{t.when}</div><div className="card" style={{ padding: '8px 14px', boxShadow: 'none' }}><Rich text={t.what} /></div></div>)}</div>
            </div>
          )}
        </div>
      )}

      {tab === 'Business' && (
        <div className="stack" style={{ gap: 24 }}>
          <div><h2 style={{ marginBottom: 10 }}>Revenue calculator</h2><RevenueCalc idea={idea} /></div>
          {idea.pricing.length > 0 && (
            <div><h2 style={{ marginBottom: 10 }}>Pricing</h2>
              <div className="grid g3">{idea.pricing.map((p) => <div key={p.name} className="card"><h3>{p.name}</h3><p className="text-2 small mt">{p.description}</p></div>)}</div>
            </div>
          )}
          {idea.costs.length > 0 && (
            <div><h2 style={{ marginBottom: 10 }}>Investment (cash, excluding your time)</h2>
              <div className="card tbl-wrap"><table className="tbl">
                <thead><tr><th>Item</th><th>Note</th><th className="r">Cost</th></tr></thead>
                <tbody>
                  {idea.costs.map((c) => <tr key={c.item}><td>{c.item}</td><td className="text-2">{c.note}</td><td className="r">{c.cost}</td></tr>)}
                  {idea.costTotal3Months && <tr className="us"><td>First 3 months total</td><td /><td className="r">{idea.costTotal3Months}</td></tr>}
                </tbody>
              </table></div>
            </div>
          )}
          <div><h2 style={{ marginBottom: 10 }}>Competitors and the gap</h2>
            {idea.competitors.length === 0 ? <div className="empty">No competitor analysis yet. Add it via Edit.</div> : (
              <div className="card tbl-wrap"><table className="tbl">
                <thead><tr><th>Competitor</th><th>What they do</th><th>Gap</th></tr></thead>
                <tbody>{idea.competitors.map((c) => <tr key={c.name} className={c.isUs ? 'us' : ''}><td>{c.name}</td><td>{c.what}</td><td className="text-2">{c.gap}</td></tr>)}</tbody>
              </table></div>
            )}
            <p className="muted small mt">Competition: <strong>{idea.numbers.competition}</strong> · Who sells: {idea.numbers.whoSells || '—'}</p>
          </div>
          {idea.sources && idea.sources.length > 0 && (
            <div><h2 style={{ marginBottom: 10 }}>Sources</h2>
              <div className="card"><ol style={{ margin: 0, paddingLeft: 20, display: 'grid', gap: 4 }}>{idea.sources.map((s) => <li key={s.url} className="small"><ExtLink href={s.url}>{s.title || s.url}</ExtLink></li>)}</ol></div>
            </div>
          )}
        </div>
      )}

      {tab === 'Risks & Questions' && (
        <div className="stack" style={{ gap: 24 }}>
          <div><h2 style={{ marginBottom: 10 }}>Risks and answers</h2>
            <div className="grid g2">{idea.risks.map((r) => <div key={r.risk} className="card risk"><h3>{r.risk}</h3><p className="text-2 small mt"><Rich text={r.answer} /></p></div>)}</div>
          </div>
          <div><h2 style={{ marginBottom: 10 }}>Questions to ask potential customers</h2>
            <div className="stack" style={{ gap: 8 }}>{idea.questions.map((q, i) => <div key={i} className="q"><strong style={{ color: idea.color }}>{i + 1}.</strong> {q}</div>)}</div>
          </div>
          <div className="card"><div className="card-title">Fit for you: pros & cons</div>
            <div className="grid g2">
              <ul className="clean" style={{ listStyle: 'none', paddingLeft: 0 }}>{fit.pros.map((p) => <li key={p} className="pro">{p}</li>)}</ul>
              <ul className="clean" style={{ listStyle: 'none', paddingLeft: 0 }}>{fit.cons.map((p) => <li key={p} className="con">{p}</li>)}</ul>
            </div>
          </div>
        </div>
      )}

      {tab === 'Scores' && <ScoreEditor idea={idea} />}

      {tab === 'Validation' && (
        <div className="stack" style={{ gap: 16 }}>
          <div className="grid g4">
            <div className="card"><div className="stat">{v.n}</div><div className="stat-label">Conversations</div></div>
            <div className="card"><div className="stat">{v.yes}</div><div className="stat-label">Would pay</div></div>
            <div className="card"><div className="stat">{v.avgPain.toFixed(1)}</div><div className="stat-label">Average pain /10</div></div>
            <div className="card"><div className="stat">€{v.paid}</div><div className="stat-label">Real money received</div></div>
          </div>
          <InterviewLog idea={idea} />
        </div>
      )}

      {tab === 'Notes' && (
        <div className="card">
          <div className="card-title">Your notes (saved automatically)</div>
          <textarea className="textarea" rows={16} value={idea.notes} placeholder="Thoughts, links, people to contact, niche ideas…" onChange={(e) => updateIdea(idea.id, { notes: e.target.value })} />
        </div>
      )}
    </div>
  )
}
