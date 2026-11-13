import { useState } from 'react'
import type { Idea } from '../types'
import { monthlyCost } from '../lib/scoring'
import { money as fmt } from './ui'

export function useCalc(idea: Idea) {
  const [c, setC] = useState(idea.calculator.customers.value)
  const [p, setP] = useState(idea.calculator.price.value)
  const [k, setK] = useState(idea.calculator.multiplier?.value ?? 1)
  return { c, p, k, setC, setP, setK, monthly: c * p * (idea.calculator.multiplier ? k : 1) }
}

export function RevenueCalc({ idea }: { idea: Idea }) {
  const calc = useCalc(idea)
  const { customers, price, multiplier } = idea.calculator
  const cost = monthlyCost(idea)
  return (
    <div className="card">
      <div className="grid g2">
        <div className="stack">
          <label className="field">
            <span className="row between">{customers.label}<b className="num">{calc.c}</b></span>
            <input type="range" min={customers.min} max={customers.max} value={calc.c} onChange={(e) => calc.setC(+e.target.value)} />
          </label>
          {multiplier && (
            <label className="field">
              <span className="row between">{multiplier.label}<b className="num">{calc.k}</b></span>
              <input type="range" min={multiplier.min} max={multiplier.max} value={calc.k} onChange={(e) => calc.setK(+e.target.value)} />
            </label>
          )}
          <label className="field">
            <span className="row between">{price.label}<b className="num">${calc.p}</b></span>
            <input type="range" min={price.min} max={price.max} value={calc.p} onChange={(e) => calc.setP(+e.target.value)} />
          </label>
        </div>
        <div className="grid g2" style={{ gap: 10 }}>
          <div className="card" style={{ boxShadow: 'none', background: 'var(--surface-2)' }}><div className="stat">{fmt(calc.monthly)}</div><div className="stat-label">Monthly revenue</div></div>
          <div className="card" style={{ boxShadow: 'none', background: 'var(--surface-2)' }}><div className="stat">{fmt(calc.monthly * 12)}</div><div className="stat-label">Yearly revenue</div></div>
          <div className="card" style={{ boxShadow: 'none', background: 'var(--surface-2)' }}><div className="stat">≈{fmt(cost, '€')}</div><div className="stat-label">Running cost / month (est.)</div></div>
          <div className="card" style={{ boxShadow: 'none', background: 'var(--surface-2)' }}><div className="stat">{fmt(Math.max(0, calc.monthly - cost))}</div><div className="stat-label">Profit / month (rough)</div></div>
        </div>
      </div>
      <p className="muted small mt">Estimates for discussion. Default values come from the original analysis.</p>
    </div>
  )
}
