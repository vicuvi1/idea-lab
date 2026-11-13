import { useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../store'
import { fitFor } from '../lib/scoring'
import { SKILLS } from '../lib/criteria'
import { Meter } from '../components/ui'
import { Priorities } from '../components/Priorities'

export default function FitPage() {
  const { state, setProfile } = useStore()
  const p = state.profile
  const [newSkill, setNewSkill] = useState('')
  const [industryText, setIndustryText] = useState(p.industries.join(', '))
  const allSkills = [...new Set([...SKILLS, ...p.skills, ...state.ideas.flatMap((i) => i.skills)])]
  const ranked = state.ideas.filter((i) => i.status !== 'dropped').map((idea) => ({ idea, fit: fitFor(idea, p) })).sort((a, b) => b.fit.total - a.fit.total)

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Fit for Me</h1>
          <p className="sub">Tell Idea Lab about yourself. Every idea gets a personal fit score with reasons.</p>
        </div>
      </div>

      <div className="grid g2" style={{ alignItems: 'start' }}>
        <div className="stack" style={{ gap: 16 }}>
          <div className="card stack">
            <div className="card-title">My profile</div>
            <div className="field">My skills
              <div className="row" style={{ gap: 6 }}>
                {allSkills.map((s) => (
                  <span key={s} className={'tag chip' + (p.skills.includes(s) ? ' on' : '')}
                    onClick={() => setProfile({ ...p, skills: p.skills.includes(s) ? p.skills.filter((x) => x !== s) : [...p.skills, s] })}>{s}</span>
                ))}
              </div>
              <div className="row" style={{ flexWrap: 'nowrap', marginTop: 6 }}>
                <input className="input" placeholder="Add another skill…" value={newSkill} onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter' && newSkill.trim()) { setProfile({ ...p, skills: [...p.skills, newSkill.trim().toLowerCase()] }); setNewSkill('') } }} />
              </div>
            </div>
            <label className="field"><span className="row between">Cash I can invest (first 3 months)<b>€{p.budget}</b></span>
              <input type="range" min={0} max={5000} step={50} value={p.budget} onChange={(e) => setProfile({ ...p, budget: +e.target.value })} />
            </label>
            <label className="field"><span className="row between">Hours per week I can work on it<b>{p.hoursPerWeek} h</b></span>
              <input type="range" min={2} max={60} value={p.hoursPerWeek} onChange={(e) => setProfile({ ...p, hoursPerWeek: +e.target.value })} />
            </label>
            <label className="field"><span className="row between">I want a first version within<b>{p.deadlineWeeks} weeks</b></span>
              <input type="range" min={2} max={26} value={p.deadlineWeeks} onChange={(e) => setProfile({ ...p, deadlineWeeks: +e.target.value })} />
            </label>
            <label className="field">Industries I know or like (comma separated)
              <input className="input" value={industryText} placeholder="Cybersecurity, Logistics" onChange={(e) => { setIndustryText(e.target.value); setProfile({ ...p, industries: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) }) }} />
            </label>
          </div>
          <div className="card">
            <div className="card-title">What matters to me</div>
            <Priorities />
          </div>
        </div>

        <div className="stack" style={{ gap: 12 }}>
          {ranked.map(({ idea, fit }, i) => (
            <div key={idea.id} className="card" style={{ borderLeft: `4px solid ${idea.color}`, '--c': idea.color } as CSSProperties}>
              <div className="row between" style={{ alignItems: 'flex-start' }}>
                <div>
                  <div className="muted small">#{i + 1}</div>
                  <Link to={`/idea/${idea.id}`}><h3>{idea.title}</h3></Link>
                </div>
                <div style={{ textAlign: 'right' }}><div className="stat">{fit.total}</div><div className="stat-label">fit / 100</div></div>
              </div>
              <div className="stack mt" style={{ gap: 6 }}>
                {fit.parts.map((part) => (
                  <div key={part.label} style={{ display: 'grid', gridTemplateColumns: '110px 1fr 36px', gap: 10, alignItems: 'center' }} title={part.detail}>
                    <span className="small text-2">{part.label}</span>
                    <Meter value={part.score} color={idea.color} />
                    <span className="small num" style={{ textAlign: 'right' }}>{part.score}</span>
                  </div>
                ))}
              </div>
              <ul className="clean small mt" style={{ listStyle: 'none', paddingLeft: 0 }}>
                {fit.pros.slice(0, 3).map((x) => <li key={x} className="pro">{x}</li>)}
                {fit.cons.map((x) => <li key={x} className="con">{x}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
