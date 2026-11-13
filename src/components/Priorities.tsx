import { useStore } from '../store'
import { CRITERIA } from '../lib/criteria'

const LEVEL = ['Ignore', 'Low', 'Some', 'Medium', 'High', 'Critical']

export function Priorities() {
  const { state, setProfile } = useStore()
  const p = state.profile
  return (
    <div className="stack">
      {CRITERIA.map((c) => (
        <label key={c.key} className="field">
          <span className="row between">{c.label}<b>{LEVEL[p.priorities[c.key]]}</b></span>
          <input type="range" min={0} max={5} value={p.priorities[c.key]} onChange={(e) => setProfile({ ...p, priorities: { ...p.priorities, [c.key]: +e.target.value } })} />
        </label>
      ))}
    </div>
  )
}
