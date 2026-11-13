import { useState } from 'react'
import type { Idea, Interview } from '../types'
import { useStore } from '../store'
import { uid } from './ui'

const PAY = { yes: 'Would pay', maybe: 'Maybe', no: 'Would not pay', unknown: 'Not asked' } as const
const PAY_COLOR = { yes: 'var(--good)', maybe: 'var(--warn)', no: 'var(--bad)', unknown: 'var(--muted)' } as const

const empty = (): Interview => ({ id: uid(), date: new Date().toISOString().slice(0, 10), who: '', company: '', wouldPay: 'unknown', painLevel: 5, quote: '', notes: '' })

export function InterviewLog({ idea }: { idea: Idea }) {
  const { updateIdea } = useStore()
  const [draft, setDraft] = useState<Interview | null>(null)
  const save = () => {
    if (!draft || !draft.who.trim()) return
    updateIdea(idea.id, (i) => {
      const exists = i.interviews.some((x) => x.id === draft.id)
      return { ...i, interviews: exists ? i.interviews.map((x) => (x.id === draft.id ? draft : x)) : [draft, ...i.interviews] }
    })
    setDraft(null)
  }
  const del = (id: string) => updateIdea(idea.id, (i) => ({ ...i, interviews: i.interviews.filter((x) => x.id !== id) }))

  return (
    <div className="stack">
      {!draft && <div><button className="btn primary" onClick={() => setDraft(empty())}>+ Log a conversation</button></div>}
      {draft && (
        <div className="card">
          <div className="grid g3" style={{ gap: 12 }}>
            <label className="field">Person / role *<input className="input" value={draft.who} placeholder="e.g. CTO, 20-person agency" onChange={(e) => setDraft({ ...draft, who: e.target.value })} /></label>
            <label className="field">Company<input className="input" value={draft.company} onChange={(e) => setDraft({ ...draft, company: e.target.value })} /></label>
            <label className="field">Date<input className="input" type="date" value={draft.date} onChange={(e) => setDraft({ ...draft, date: e.target.value })} /></label>
            <label className="field">Would they pay?
              <select className="select" value={draft.wouldPay} onChange={(e) => setDraft({ ...draft, wouldPay: e.target.value as Interview['wouldPay'] })}>
                {Object.entries(PAY).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </label>
            <label className="field">Actually paid / pre-ordered (€)<input className="input" type="number" min={0} value={draft.paidAmount ?? ''} onChange={(e) => setDraft({ ...draft, paidAmount: e.target.value ? +e.target.value : undefined })} /></label>
            <label className="field"><span className="row between">Pain level<b>{draft.painLevel}/10</b></span><input type="range" min={0} max={10} value={draft.painLevel} onChange={(e) => setDraft({ ...draft, painLevel: +e.target.value })} /></label>
          </div>
          <label className="field mt">Exact quote (their words)<input className="input" value={draft.quote} placeholder='"We lost a deal last month because…"' onChange={(e) => setDraft({ ...draft, quote: e.target.value })} /></label>
          <label className="field mt">Notes<textarea className="textarea" value={draft.notes} onChange={(e) => setDraft({ ...draft, notes: e.target.value })} /></label>
          <div className="row mt">
            <button className="btn primary" onClick={save} disabled={!draft.who.trim()}>Save</button>
            <button className="btn" onClick={() => setDraft(null)}>Cancel</button>
          </div>
        </div>
      )}
      {idea.interviews.length === 0 && !draft && (
        <div className="empty">No conversations yet. Use the questions on the "Risks & Questions" tab and write down what people really say.</div>
      )}
      {idea.interviews.map((iv) => (
        <div key={iv.id} className="card" style={{ borderLeft: `3px solid ${PAY_COLOR[iv.wouldPay]}` }}>
          <div className="row between">
            <div><strong>{iv.who}</strong>{iv.company && <span className="muted"> · {iv.company}</span>} <span className="muted small">· {iv.date}</span></div>
            <div className="row">
              <span className="tag">{PAY[iv.wouldPay]}{iv.paidAmount ? ` · €${iv.paidAmount} paid` : ''}</span>
              <span className="tag">Pain {iv.painLevel}/10</span>
              <button className="btn ghost sm" onClick={() => setDraft(iv)}>Edit</button>
              <button className="btn ghost sm danger" onClick={() => confirm('Delete this conversation?') && del(iv.id)}>✕</button>
            </div>
          </div>
          {iv.quote && <p className="mt" style={{ fontStyle: 'italic' }}>“{iv.quote}”</p>}
          {iv.notes && <p className="text-2 small mt" style={{ whiteSpace: 'pre-line' }}>{iv.notes}</p>}
        </div>
      ))}
    </div>
  )
}
