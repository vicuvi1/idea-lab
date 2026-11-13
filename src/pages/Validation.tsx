import { useState } from 'react'
import { useStore } from '../store'
import { validationStats } from '../lib/scoring'
import { InterviewLog } from '../components/InterviewLog'
import { IdeaLink } from '../components/ui'

export default function Validation() {
  const { state } = useStore()
  const ideas = state.ideas.filter((i) => i.status !== 'dropped')
  const [id, setId] = useState(() => ideas.find((i) => i.status === 'validating')?.id ?? ideas[0]?.id)
  const idea = state.ideas.find((i) => i.id === id)

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Validation</h1>
          <p className="sub">Real conversations beat opinions. Log every talk with a potential customer.</p>
        </div>
      </div>

      <div className="card">
        <div className="card-title">Evidence per idea</div>
        <div className="tbl-wrap">
          <table className="tbl">
            <thead><tr><th>Idea</th><th className="r">Conversations</th><th className="r">Would pay</th><th className="r">Maybe</th><th className="r">Avg. pain</th><th className="r">€ received</th><th>Verdict</th><th /></tr></thead>
            <tbody>
              {ideas.map((i) => {
                const v = validationStats(i)
                const verdict = v.paid > 0 ? ['✓ Someone paid: strong signal', 'var(--good)']
                  : v.n >= 10 && v.yes / v.n >= 0.3 ? ['◐ Promising: ask for a pre-order', 'var(--warn)']
                  : v.n >= 10 ? ['○ Weak signal: rethink or pivot', 'var(--bad)']
                  : [`Talk to ${10 - v.n} more people`, 'var(--muted)']
                return (
                  <tr key={i.id}>
                    <td style={{ whiteSpace: 'nowrap' }}><IdeaLink idea={i} /></td>
                    <td className="r">{v.n}</td><td className="r">{v.yes}</td><td className="r">{v.maybe}</td>
                    <td className="r">{v.n ? v.avgPain.toFixed(1) : '—'}</td><td className="r">€{v.paid}</td>
                    <td style={{ color: verdict[1], fontWeight: 600 }}>{verdict[0]}</td>
                    <td><button className="btn sm" onClick={() => setId(i.id)}>{i.id === id ? 'Selected' : 'Log'}</button></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {idea && (
        <div className="mt-lg">
          <div className="row between" style={{ marginBottom: 12 }}>
            <h2>Conversations: {idea.title}</h2>
          </div>
          {idea.questions.length > 0 && (
            <details className="card" style={{ marginBottom: 12 }}>
              <summary style={{ cursor: 'pointer', fontWeight: 600 }}>Questions to ask ({idea.questions.length})</summary>
              <ol className="mt" style={{ margin: '10px 0 0', paddingLeft: 20, display: 'grid', gap: 4 }}>{idea.questions.map((q) => <li key={q}>{q}</li>)}</ol>
            </details>
          )}
          <InterviewLog idea={idea} />
        </div>
      )}
    </>
  )
}
