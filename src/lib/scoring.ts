import type { Idea, Profile } from '../types'
import { CRITERIA } from './criteria'

/** Plain total of all criteria, 0–80. */
export function rawScore(idea: Idea) {
  return CRITERIA.reduce((s, c) => s + (idea.scores[c.key] ?? 0), 0)
}

/** Weighted score using the profile's priorities, normalised to 0–100. */
export function weightedScore(idea: Idea, profile: Profile) {
  let sum = 0
  let max = 0
  for (const c of CRITERIA) {
    const w = profile.priorities[c.key] ?? 1
    sum += (idea.scores[c.key] ?? 0) * w
    max += 10 * w
  }
  return max ? Math.round((sum / max) * 100) : 0
}

export interface FitPart {
  label: string
  score: number // 0-100
  weight: number
  detail: string
}

export interface Fit {
  total: number
  parts: FitPart[]
  pros: string[]
  cons: string[]
}

/** How well an idea fits *me*: scores, skills, budget, time and industry. */
export function fitFor(idea: Idea, p: Profile): Fit {
  const pros: string[] = []
  const cons: string[] = []

  const q = weightedScore(idea, p)

  const need = idea.skills.length ? idea.skills : ['coding']
  const have = need.filter((s) => p.skills.includes(s))
  const skill = Math.round((have.length / need.length) * 100)
  const missing = need.filter((s) => !p.skills.includes(s))
  if (skill >= 75) pros.push(`You already have the key skills (${have.join(', ')})`)
  if (missing.length) cons.push(`Skills to learn or find a partner for: ${missing.join(', ')}`)

  const cash = idea.numbers.cashMax
  let budget = 100
  if (p.budget < idea.numbers.cashMin) budget = Math.max(0, Math.round((p.budget / idea.numbers.cashMin) * 60))
  else if (p.budget < cash) budget = 80
  if (budget === 100) pros.push(`Fits your budget (€${idea.numbers.cashMin}–${cash} for 3 months)`)
  else cons.push(`Needs €${idea.numbers.cashMin}–${cash}; your budget is €${p.budget}`)

  // Weeks scale with available hours: estimates assume ~20 h/week.
  const realWeeks = idea.numbers.mvpWeeksMax * (20 / Math.max(2, p.hoursPerWeek))
  let time = 100
  if (realWeeks > p.deadlineWeeks) time = Math.max(0, Math.round(100 - (realWeeks - p.deadlineWeeks) * 8))
  if (time >= 80) pros.push(`MVP in ~${Math.ceil(realWeeks)} weeks at ${p.hoursPerWeek} h/week`)
  else cons.push(`MVP would take ~${Math.ceil(realWeeks)} weeks at ${p.hoursPerWeek} h/week (goal: ${p.deadlineWeeks})`)

  const ind = p.industries.some((i) => idea.industry.toLowerCase().includes(i.toLowerCase())) ? 100 : 40
  if (ind === 100) pros.push(`You know the ${idea.industry} industry`)

  if (idea.numbers.competitionLevel === 'high') cons.push('Crowded market: you need a sharp niche')
  if (idea.numbers.competitionLevel === 'low') pros.push('Gap in the market')
  if (idea.recurring) pros.push('Recurring monthly revenue')

  const parts: FitPart[] = [
    { label: 'Idea quality', score: q, weight: 0.4, detail: 'Your criteria scores × your priorities' },
    { label: 'Skills match', score: skill, weight: 0.25, detail: `${have.length}/${need.length} required skills` },
    { label: 'Budget', score: budget, weight: 0.12, detail: `€${idea.numbers.cashMin}–${cash} needed` },
    { label: 'Time to MVP', score: time, weight: 0.13, detail: `~${Math.ceil(realWeeks)} wk at your pace` },
    { label: 'Industry', score: ind, weight: 0.1, detail: idea.industry },
  ]
  const total = Math.round(parts.reduce((s, x) => s + x.score * x.weight, 0))
  return { total, parts, pros, cons }
}

export function validationStats(idea: Idea) {
  const n = idea.interviews.length
  const yes = idea.interviews.filter((i) => i.wouldPay === 'yes').length
  const maybe = idea.interviews.filter((i) => i.wouldPay === 'maybe').length
  const paid = idea.interviews.reduce((s, i) => s + (i.paidAmount ?? 0), 0)
  const avgPain = n ? idea.interviews.reduce((s, i) => s + i.painLevel, 0) / n : 0
  return { n, yes, maybe, paid, avgPain }
}

export function monthlyRevenue(idea: Idea, customers?: number, price?: number, mult?: number) {
  const c = customers ?? idea.calculator.customers.value
  const p = price ?? idea.calculator.price.value
  const k = mult ?? idea.calculator.multiplier?.value ?? 1
  return c * p * k
}

/** Rough monthly running cost: middle of the 3-month cash estimate divided by 3. */
export function monthlyCost(idea: Idea) {
  return (idea.numbers.cashMin + idea.numbers.cashMax) / 2 / 3
}
