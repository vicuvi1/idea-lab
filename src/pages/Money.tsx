import { useMemo, useState } from 'react'
import { Area, CartesianGrid, ComposedChart, Line, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useStore } from '../store'
import { monthlyCost, monthlyRevenue } from '../lib/scoring'
import { ChartTip } from '../components/charts'
import { IdeaLink, money } from '../components/ui'

export default function Money() {
  const { state } = useStore()
  const ideas = state.ideas.filter((i) => i.status !== 'dropped')
  const [id, setId] = useState(ideas[0]?.id ?? '')
  const idea = state.ideas.find((i) => i.id === id) ?? ideas[0]
  const unitPrice = idea ? idea.calculator.price.value * (idea.calculator.multiplier?.value ?? 1) : 0
  const [price, setPrice] = useState<number | null>(null)
  const [newPerMonth, setNewPerMonth] = useState(3)
  const [churn, setChurn] = useState(3)
  const [months, setMonths] = useState(24)
  const [delay, setDelay] = useState<number | null>(null)
  const [cost, setCost] = useState<number | null>(null)
  const p = price ?? unitPrice
  const c = cost ?? Math.round(idea ? monthlyCost(idea) : 0)
  const d = delay ?? (idea ? Math.ceil(idea.numbers.mvpWeeksMax / 4) + 1 : 2)

  const data = useMemo(() => {
    let customers = 0
    let cum = 0
    const rows = []
    for (let m = 1; m <= months; m++) {
      customers = customers * (1 - churn / 100) + (m > d ? newPerMonth : 0)
      const revenue = Math.round(customers * p)
      cum += revenue - c
      rows.push({ month: `M${m}`, Revenue: revenue, Costs: c, 'Cumulative profit': Math.round(cum), customers: Math.round(customers) })
    }
    return rows
  }, [p, newPerMonth, churn, months, c, d])

  if (!idea) return <div className="empty">Add an idea first.</div>
  const breakEven = data.find((r) => r.Revenue > 0 && r.Revenue >= r.Costs)
  const payback = data.find((r) => r['Cumulative profit'] >= 0)
  const last = data[data.length - 1]

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Money Calculator</h1>
          <p className="sub">Simulate how revenue grows month by month, and when the idea pays for itself.</p>
        </div>
        <select className="select" style={{ width: 280 }} value={idea.id} onChange={(e) => { setId(e.target.value); setPrice(null); setCost(null); setDelay(null) }}>
          {ideas.map((i) => <option key={i.id} value={i.id}>{i.title}</option>)}
        </select>
      </div>

      <div className="grid g4">
        <div className="card"><div className="stat">{breakEven ? breakEven.month : '—'}</div><div className="stat-label">Monthly break-even (revenue ≥ costs)</div></div>
        <div className="card"><div className="stat">{payback ? payback.month : '—'}</div><div className="stat-label">All costs paid back</div></div>
        <div className="card"><div className="stat">{money(last.Revenue)}</div><div className="stat-label">Revenue in month {months} ({last.customers} customers)</div></div>
        <div className="card"><div className="stat">{money(last['Cumulative profit'])}</div><div className="stat-label">Total profit after {months} months</div></div>
      </div>

      <div className="grid g3 mt" style={{ alignItems: 'start' }}>
        <div className="card stack">
          <div className="card-title">Assumptions</div>
          <label className="field"><span className="row between">Revenue per customer / month<b>{money(p)}</b></span>
            <input type="range" min={5} max={Math.max(1500, unitPrice * 2)} value={p} onChange={(e) => setPrice(+e.target.value)} /></label>
          <label className="field"><span className="row between">Months of building before the first sale<b>{d}</b></span>
            <input type="range" min={0} max={12} value={d} onChange={(e) => setDelay(+e.target.value)} /></label>
          <label className="field"><span className="row between">New customers per month<b>{newPerMonth}</b></span>
            <input type="range" min={0} max={50} value={newPerMonth} onChange={(e) => setNewPerMonth(+e.target.value)} /></label>
          <label className="field"><span className="row between">Customers lost per month (churn)<b>{churn}%</b></span>
            <input type="range" min={0} max={20} value={churn} onChange={(e) => setChurn(+e.target.value)} /></label>
          <label className="field"><span className="row between">Running costs / month<b>{money(c)}</b></span>
            <input type="range" min={0} max={3000} step={10} value={c} onChange={(e) => setCost(+e.target.value)} /></label>
          <label className="field"><span className="row between">Months to simulate<b>{months}</b></span>
            <input type="range" min={6} max={60} value={months} onChange={(e) => setMonths(+e.target.value)} /></label>
          <p className="muted small">Your own time is not counted as a cost. € and $ are treated as roughly equal.</p>
        </div>
        <div className="card span2">
          <div className="card-title">Monthly revenue vs. costs</div>
          <div className="legend" style={{ marginBottom: 6 }}>
            <span><span className="swatch" style={{ background: idea.color }} />Revenue</span>
            <span><span className="swatch" style={{ background: 'var(--muted)' }} />Costs</span>
          </div>
          <div style={{ height: 300 }}>
            <ResponsiveContainer>
              <ComposedChart data={data} margin={{ top: 8, right: 12, bottom: 0, left: 0 }}>
                <CartesianGrid stroke="var(--line)" strokeDasharray="2 4" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: 'var(--muted)', fontSize: 12 }} stroke="var(--line)" interval="preserveStartEnd" />
                <YAxis tick={{ fill: 'var(--muted)', fontSize: 12 }} stroke="var(--line)" tickFormatter={(v) => money(v)} width={70} />
                <Tooltip content={<ChartTip fmt={(v) => money(v)} />} />
                <Area type="monotone" dataKey="Revenue" stroke={idea.color} fill={idea.color} fillOpacity={0.15} strokeWidth={2} isAnimationActive={false} />
                <Line type="monotone" dataKey="Costs" isAnimationActive={false} stroke="var(--muted)" strokeDasharray="5 4" strokeWidth={2} dot={false} />
                {breakEven && <ReferenceLine x={breakEven.month} stroke="var(--text-2)" strokeDasharray="3 3" label={{ value: 'break-even', fill: 'var(--text-2)', fontSize: 11, position: 'insideTopLeft' }} />}
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <div className="card-title mt">Cumulative profit</div>
          <div style={{ height: 200 }}>
            <ResponsiveContainer>
              <ComposedChart data={data} margin={{ top: 8, right: 12, bottom: 0, left: 0 }}>
                <CartesianGrid stroke="var(--line)" strokeDasharray="2 4" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: 'var(--muted)', fontSize: 12 }} stroke="var(--line)" interval="preserveStartEnd" />
                <YAxis tick={{ fill: 'var(--muted)', fontSize: 12 }} stroke="var(--line)" tickFormatter={(v) => money(v)} width={70} />
                <ReferenceLine y={0} stroke="var(--text-2)" />
                <Tooltip content={<ChartTip fmt={(v) => money(v)} />} />
                <Line type="monotone" dataKey="Cumulative profit" stroke={idea.color} strokeWidth={2} dot={false} activeDot={{ r: 5 }} isAnimationActive={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card mt">
        <div className="card-title">All ideas at their default calculator values</div>
        <div className="tbl-wrap">
          <table className="tbl">
            <thead><tr><th>Idea</th><th className="r">Customers</th><th className="r">Price</th><th className="r">Monthly revenue</th><th className="r">Yearly revenue</th><th className="r">Est. cost / month</th></tr></thead>
            <tbody>
              {ideas.map((i) => (
                <tr key={i.id}>
                  <td style={{ whiteSpace: 'nowrap' }}><IdeaLink idea={i} /></td>
                  <td className="r">{i.calculator.customers.value}{i.calculator.multiplier ? ` × ${i.calculator.multiplier.value}` : ''}</td>
                  <td className="r">{money(i.calculator.price.value)}</td>
                  <td className="r"><b>{money(monthlyRevenue(i))}</b></td>
                  <td className="r">{money(monthlyRevenue(i) * 12)}</td>
                  <td className="r">≈{money(monthlyCost(i), '€')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
