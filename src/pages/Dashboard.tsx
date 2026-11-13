import { useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../store'
import { fitFor, validationStats } from '../lib/scoring'
import { STATUSES } from '../lib/criteria'
import { RankBars } from '../components/charts'
import { Stat, StatusBadge, uid } from '../components/ui'

export default function Dashboard() {
  const { state, setTodos } = useStore()
  const { ideas, profile, todos } = state
  const active = ideas.filter((i) => i.status !== 'dropped')
  const ranked = active.map((idea) => ({ idea, fit: fitFor(idea, profile) })).sort((a, b) => b.fit.total - a.fit.total)
  const top = ranked[0]
  const interviews = ideas.reduce((s, i) => s + i.interviews.length, 0)
  const yes = ideas.reduce((s, i) => s + validationStats(i).yes, 0)
  const [text, setText] = useState('')

  const addTodo = () => {
    if (!text.trim()) return
    setTodos([...todos, { id: uid(), text: text.trim(), done: false, createdAt: new Date().toISOString() }])
    setText('')
  }

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Dashboard</h1>
          <p className="sub">Find the idea that fits you, then prove someone will pay for it.</p>
        </div>
        <div className="row">
          <Link to="/fit" className="btn">◎ Edit my profile</Link>
          <Link to="/ideas?new=1" className="btn primary">+ New idea</Link>
        </div>
      </div>

      <div className="grid g4">
        <Stat value={active.length} label="Active ideas" />
        <Stat value={ideas.filter((i) => i.status === 'validating').length} label="Being validated" />
        <Stat value={interviews} label="Customer conversations logged" />
        <Stat value={yes} label='People who said "I would pay"' />
      </div>

      {top && (
        <div className="card hero mt" style={{ '--c': top.idea.color } as CSSProperties}>
          <div className="row between">
            <div className="card-title" style={{ margin: 0 }}>Best fit for you right now</div>
            <StatusBadge status={top.idea.status} />
          </div>
          <div className="row between mt" style={{ alignItems: 'flex-start' }}>
            <div style={{ flex: 1, minWidth: 260 }}>
              <h2 style={{ fontSize: 22 }}>{top.idea.title}</h2>
              <p className="text-2" style={{ marginTop: 6 }}>{top.idea.summary}</p>
              <ul className="clean small mt">
                {top.fit.pros.slice(0, 3).map((p) => <li key={p} className="pro" style={{ listStyle: 'none', marginLeft: -18 }}>{p}</li>)}
                {top.fit.cons.slice(0, 2).map((p) => <li key={p} className="con" style={{ listStyle: 'none', marginLeft: -18 }}>{p}</li>)}
              </ul>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="fit-big">{top.fit.total}</div>
              <div className="stat-label">fit score / 100</div>
              <Link to={`/idea/${top.idea.id}`} className="btn primary mt">Open idea →</Link>
            </div>
          </div>
        </div>
      )}

      <div className="grid g2 mt">
        <div className="card">
          <div className="row between"><div className="card-title">Ranking: fit for you</div><Link to="/fit" className="small muted">Why? →</Link></div>
          <RankBars rows={ranked.map((r) => ({ idea: r.idea, value: r.fit.total }))} />
        </div>
        <div className="stack" style={{ gap: 16 }}>
          <div className="card">
            <div className="card-title">Pipeline</div>
            <div className="grid g3" style={{ gap: 10 }}>
              {STATUSES.map((s) => {
                const n = ideas.filter((i) => i.status === s.key).length
                return (
                  <Link key={s.key} to={`/ideas?status=${s.key}`} className="card" style={{ padding: 12, boxShadow: 'none' }}>
                    <div className="stat" style={{ fontSize: 22 }}>{n}</div>
                    <span className="status" style={{ '--c': s.color } as CSSProperties}>{s.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>
          <div className="card">
            <div className="card-title">Next actions</div>
            <div className="row" style={{ flexWrap: 'nowrap' }}>
              <input className="input" value={text} placeholder="e.g. Interview 3 accountants this week" onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addTodo()} />
              <button className="btn primary" onClick={addTodo}>Add</button>
            </div>
            <div className="mt">
              {todos.length === 0 && <p className="muted small">No actions yet. Rule of thumb: talk to 10 potential customers before writing code.</p>}
              {todos.map((t) => (
                <div key={t.id} className={'todo' + (t.done ? ' done' : '')}>
                  <input type="checkbox" checked={t.done} onChange={() => setTodos(todos.map((x) => (x.id === t.id ? { ...x, done: !x.done } : x)))} />
                  <span style={{ flex: 1 }}>{t.text}</span>
                  <button className="btn ghost sm" aria-label="Delete" onClick={() => setTodos(todos.filter((x) => x.id !== t.id))}>✕</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="card mt">
        <div className="card-title">How to pick</div>
        <p className="text-2">An idea wins when <strong>a real customer pays</strong>, even €100, not when you like it most. Score ideas in <Link to="/compare" style={{ color: 'var(--accent)' }}>Compare</Link>, pick your top 2, then log real conversations in <Link to="/validation" style={{ color: 'var(--accent)' }}>Validation</Link> for 2 weeks.</p>
      </div>
    </>
  )
}
