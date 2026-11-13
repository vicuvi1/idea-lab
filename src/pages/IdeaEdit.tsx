import { useState, type ReactNode } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useIdea, useStore } from '../store'
import type { Idea } from '../types'
import { CRITERIA, IDEA_COLORS, SKILLS, STATUSES } from '../lib/criteria'

// Lists are edited as plain text: one item per line, "Title | text" for pairs.
const toLines = (xs: string[]) => xs.join('\n')
const fromLines = (s: string) => s.split('\n').map((x) => x.trim()).filter(Boolean)
function toPairs<T>(xs: T[], keys: (keyof T)[]) {
  return xs.map((x) => keys.map((k) => String(x[k] ?? '')).join(' | ')).join('\n')
}
function fromPairs<T>(s: string, keys: (keyof T)[]): T[] {
  return fromLines(s).map((line) => {
    const parts = line.split('|').map((p) => p.trim())
    const o: Record<string, string> = {}
    keys.forEach((k, i) => (o[k as string] = i === keys.length - 1 ? parts.slice(i).join(' | ') : parts[i] ?? ''))
    return o as T
  })
}

function Box({ title, hint, children }: { title: string; hint?: string; children: ReactNode }) {
  return (
    <div className="card">
      <div className="card-title" style={{ marginBottom: hint ? 4 : 12 }}>{title}</div>
      {hint && <p className="muted small" style={{ marginBottom: 12 }}>{hint}</p>}
      {children}
    </div>
  )
}

export default function IdeaEdit() {
  const { id } = useParams()
  const idea = useIdea(id)
  const { updateIdea } = useStore()
  const nav = useNavigate()
  const [d, setD] = useState<Idea | undefined>(() => (idea ? structuredClone(idea) : undefined))
  const [text, setText] = useState(() => idea ? {
    tags: idea.tags.join(', '),
    techStack: idea.techStack.join(', '),
    whyReal: toPairs(idea.whyReal, ['title', 'text']),
    whoPays: toPairs(idea.whoPays, ['label', 'text']),
    solution: toPairs(idea.solution, ['title', 'text']),
    must: toLines(idea.mvp.must),
    later: toLines(idea.mvp.later),
    timeline: toPairs(idea.timeline, ['when', 'what']),
    costs: toPairs(idea.costs, ['item', 'note', 'cost']),
    pricing: toPairs(idea.pricing, ['name', 'description']),
    competitors: toPairs(idea.competitors, ['name', 'what', 'gap']),
    risks: toPairs(idea.risks, ['risk', 'answer']),
    questions: toLines(idea.questions),
  } : null)
  if (!idea || !d || !text) return <div className="empty">Idea not found.</div>

  const set = (patch: Partial<Idea>) => setD({ ...d, ...patch })
  const setNum = (patch: Partial<Idea['numbers']>) => setD({ ...d, numbers: { ...d.numbers, ...patch } })
  const T = (k: keyof typeof text, rows = 5, ph = '') => (
    <textarea className="textarea" rows={rows} value={text[k]} placeholder={ph} onChange={(e) => setText({ ...text, [k]: e.target.value })} />
  )

  const save = () => {
    const out: Idea = {
      ...d,
      tags: text.tags.split(',').map((s) => s.trim()).filter(Boolean),
      techStack: text.techStack.split(',').map((s) => s.trim()).filter(Boolean),
      whyReal: fromPairs(text.whyReal, ['title', 'text']),
      whoPays: fromPairs(text.whoPays, ['label', 'text']),
      solution: fromPairs(text.solution, ['title', 'text']),
      mvp: { must: fromLines(text.must), later: fromLines(text.later) },
      timeline: fromPairs(text.timeline, ['when', 'what']),
      costs: fromPairs(text.costs, ['item', 'note', 'cost']),
      pricing: fromPairs(text.pricing, ['name', 'description']),
      competitors: fromPairs<Idea['competitors'][number]>(text.competitors, ['name', 'what', 'gap']).map((c) => ({ ...c, isUs: c.name.toLowerCase() === 'us' })),
      risks: fromPairs(text.risks, ['risk', 'answer']),
      questions: fromLines(text.questions),
    }
    out.numbers.priceLabel = out.numbers.priceLabel || out.priceLabel
    updateIdea(idea.id, () => out)
    nav(`/idea/${idea.id}`)
  }

  return (
    <>
      <div className="page-head">
        <div>
          <div className="small muted" style={{ marginBottom: 6 }}><Link to={`/idea/${idea.id}`}>← Back without saving</Link></div>
          <h1>Edit: {d.title || 'Untitled'}</h1>
          <p className="sub">For lists, write one item per line. Use <code>|</code> to separate parts, e.g. <code>Title | text</code>.</p>
        </div>
        <button className="btn primary" onClick={save}>Save changes</button>
      </div>

      <div className="grid g2">
        <Box title="Basics">
          <div className="stack">
            <label className="field">Title<input className="input" value={d.title} onChange={(e) => set({ title: e.target.value })} /></label>
            <label className="field">One-line summary<textarea className="textarea" rows={3} value={d.summary} onChange={(e) => set({ summary: e.target.value })} /></label>
            <label className="field">Hook (a quote that shows the pain)<input className="input" value={d.hook ?? ''} onChange={(e) => set({ hook: e.target.value })} /></label>
            <div className="grid g2" style={{ gap: 10 }}>
              <label className="field">Industry<input className="input" value={d.industry} onChange={(e) => set({ industry: e.target.value })} /></label>
              <label className="field">Status
                <select className="select" value={d.status} onChange={(e) => set({ status: e.target.value as Idea['status'] })}>
                  {STATUSES.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
                </select>
              </label>
              <label className="field">Price (label)<input className="input" value={d.priceLabel} placeholder="$99–249 / month" onChange={(e) => set({ priceLabel: e.target.value })} /></label>
              <label className="field">Tags (comma separated)<input className="input" value={text.tags} onChange={(e) => setText({ ...text, tags: e.target.value })} /></label>
            </div>
            <div className="field">Colour
              <div className="row" style={{ gap: 6 }}>
                {IDEA_COLORS.map((c) => (
                  <button key={c} aria-label={c} onClick={() => set({ color: c })} style={{ width: 26, height: 26, borderRadius: 6, background: c, border: d.color === c ? '2px solid var(--text)' : '2px solid transparent', cursor: 'pointer' }} />
                ))}
              </div>
            </div>
          </div>
        </Box>

        <Box title="Numbers" hint="Used by the Fit, Compare and Money pages.">
          <div className="grid g2" style={{ gap: 10 }}>
            <label className="field">Cash needed, min (€)<input className="input" type="number" value={d.numbers.cashMin} onChange={(e) => setNum({ cashMin: +e.target.value })} /></label>
            <label className="field">Cash needed, max (€)<input className="input" type="number" value={d.numbers.cashMax} onChange={(e) => setNum({ cashMax: +e.target.value })} /></label>
            <label className="field">MVP weeks, min<input className="input" type="number" value={d.numbers.mvpWeeksMin} onChange={(e) => setNum({ mvpWeeksMin: +e.target.value })} /></label>
            <label className="field">MVP weeks, max<input className="input" type="number" value={d.numbers.mvpWeeksMax} onChange={(e) => setNum({ mvpWeeksMax: +e.target.value })} /></label>
            <label className="field">Competition level
              <select className="select" value={d.numbers.competitionLevel} onChange={(e) => setNum({ competitionLevel: e.target.value as Idea['numbers']['competitionLevel'] })}>
                <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option>
              </select>
            </label>
            <label className="field">Competition (short note)<input className="input" value={d.numbers.competition} onChange={(e) => setNum({ competition: e.target.value })} /></label>
            <label className="field">Default customers (calculator)<input className="input" type="number" value={d.calculator.customers.value} onChange={(e) => set({ calculator: { ...d.calculator, customers: { ...d.calculator.customers, value: +e.target.value, max: Math.max(d.calculator.customers.max, +e.target.value) } } })} /></label>
            <label className="field">Default price / month ($)<input className="input" type="number" value={d.calculator.price.value} onChange={(e) => set({ calculator: { ...d.calculator, price: { ...d.calculator.price, value: +e.target.value, max: Math.max(d.calculator.price.max, +e.target.value) } } })} /></label>
            <label className="field" style={{ gridColumn: '1 / -1' }}>
              <span className="row"><input type="checkbox" checked={d.recurring} onChange={(e) => set({ recurring: e.target.checked })} /> Recurring revenue (subscription)</span>
            </label>
          </div>
          <div className="field mt">Skills needed
            <div className="row" style={{ gap: 6 }}>
              {SKILLS.map((s) => (
                <span key={s} className={'tag chip' + (d.skills.includes(s) ? ' on' : '')} onClick={() => set({ skills: d.skills.includes(s) ? d.skills.filter((x) => x !== s) : [...d.skills, s] })}>{s}</span>
              ))}
            </div>
          </div>
        </Box>

        <Box title="Scores (0–10)">
          <div className="stack">
            {CRITERIA.map((c) => (
              <label key={c.key} className="field">
                <span className="row between">{c.label}<b className="num">{d.scores[c.key]}</b></span>
                <input type="range" min={0} max={10} value={d.scores[c.key]} onChange={(e) => set({ scores: { ...d.scores, [c.key]: +e.target.value } })} />
              </label>
            ))}
          </div>
        </Box>

        <Box title="The problem story" hint="Use **double asterisks** for bold.">
          <textarea className="textarea" rows={14} value={d.story ?? ''} onChange={(e) => set({ story: e.target.value })} />
        </Box>

        <Box title="Why the problem is real" hint="Title | explanation">{T('whyReal', 6)}</Box>
        <Box title="Who pays" hint="Label | text, e.g. Customer | accounting firms with 2–30 staff">{T('whoPays', 6)}</Box>
        <Box title="How the product solves it" hint="Step | what happens">{T('solution', 7)}</Box>
        <Box title="Tech stack" hint="Comma separated">{T('techStack', 3)}</Box>
        <Box title="MVP: must-have" hint="One per line">{T('must', 6)}</Box>
        <Box title="MVP: later" hint="One per line">{T('later', 6)}</Box>
        <Box title="Timeline" hint="When | what">{T('timeline', 5)}</Box>
        <Box title="Costs" hint="Item | note | cost">{T('costs', 6)}</Box>
        <Box title="Pricing plans" hint="Name | description">{T('pricing', 4)}</Box>
        <Box title="Competitors" hint="Name | what they do | gap. Name a row 'Us' to highlight yours.">{T('competitors', 6)}</Box>
        <Box title="Risks" hint="Risk | answer">{T('risks', 6)}</Box>
        <Box title="Questions to ask customers" hint="One per line">{T('questions', 6)}</Box>
      </div>
      <div className="row mt-lg"><button className="btn primary" onClick={save}>Save changes</button><Link className="btn" to={`/idea/${idea.id}`}>Cancel</Link></div>
    </>
  )
}
