// Checks every idea JSON in src/data/ideas has the fields the app needs.
// Usage: node scripts/validate-ideas.mjs [file ...]
import fs from 'node:fs'
import path from 'node:path'

const dir = 'src/data/ideas'
const files = process.argv.slice(2).length ? process.argv.slice(2) : fs.readdirSync(dir).filter((f) => f.endsWith('.json')).map((f) => path.join(dir, f))
const SCORE_KEYS = ['pain', 'willingnessToPay', 'lowCompetition', 'easyToBuild', 'easyToSell', 'skillFit', 'globalPotential', 'excitement']
let bad = 0
const ids = new Map()
for (const f of files) {
  const errs = []
  let d
  try { d = JSON.parse(fs.readFileSync(f, 'utf8')) } catch (e) { console.log(`✗ ${f}: invalid JSON (${e.message})`); bad++; continue }
  const str = (k) => typeof d[k] === 'string' && d[k].trim() || errs.push(`${k} must be a non-empty string`)
  const arr = (k, min = 1) => Array.isArray(d[k]) && d[k].length >= min || errs.push(`${k} must be an array with ≥${min} items`)
  ;['id', 'title', 'color', 'industry', 'status', 'summary', 'priceLabel', 'hook', 'story'].forEach(str)
  ;['tags', 'whyReal', 'whoPays', 'solution', 'techStack', 'timeline', 'costs', 'pricing', 'risks', 'questions', 'skills'].forEach((k) => arr(k))
  arr('competitors', 0)
  if (!d.mvp || !Array.isArray(d.mvp.must) || !Array.isArray(d.mvp.later)) errs.push('mvp.must / mvp.later arrays required')
  const c = d.calculator
  if (!c || !c.customers || !c.price || !('multiplier' in c)) errs.push('calculator.customers/price/multiplier required')
  else for (const s of [c.customers, c.price, c.multiplier].filter(Boolean)) if (!(s.min <= s.value && s.value <= s.max) || !s.label) errs.push('calculator slider needs min ≤ value ≤ max and a label')
  const n = d.numbers || {}
  for (const k of ['cashMin', 'cashMax', 'mvpWeeksMin', 'mvpWeeksMax']) if (typeof n[k] !== 'number') errs.push(`numbers.${k} must be a number`)
  if (!['low', 'medium', 'high'].includes(n.competitionLevel)) errs.push('numbers.competitionLevel must be low|medium|high')
  for (const k of ['priceLabel', 'competition', 'whoSells']) if (typeof n[k] !== 'string') errs.push(`numbers.${k} must be a string`)
  for (const k of SCORE_KEYS) if (!(Number.isInteger(d.scores?.[k]) && d.scores[k] >= 0 && d.scores[k] <= 10)) errs.push(`scores.${k} must be an integer 0–10`)
  if (typeof d.recurring !== 'boolean') errs.push('recurring must be boolean')
  if (typeof d.notes !== 'string' || !Array.isArray(d.interviews)) errs.push('notes "" and interviews [] required')
  if (d.whyReal?.some((x) => !x.title || !x.text)) errs.push('whyReal items need title + text')
  if (d.whoPays?.some((x) => !x.label || !x.text)) errs.push('whoPays items need label + text')
  if (d.solution?.some((x) => !x.text)) errs.push('solution items need text')
  if (d.timeline?.some((x) => !x.when || !x.what)) errs.push('timeline items need when + what')
  if (d.costs?.some((x) => !x.item || x.cost === undefined)) errs.push('costs items need item + note + cost')
  if (d.pricing?.some((x) => !x.name)) errs.push('pricing items need name + description')
  if (d.competitors?.some((x) => !x.name)) errs.push('competitors items need name + what + gap')
  if (d.risks?.some((x) => !x.risk || !x.answer)) errs.push('risks items need risk + answer')
  if (d.sources && d.sources.some((s) => !/^https?:\/\//.test(s.url || ''))) errs.push('sources need http(s) url')
  if (ids.has(d.id)) errs.push(`duplicate id with ${ids.get(d.id)}`)
  ids.set(d.id, f)
  if (errs.length) { bad++; console.log(`✗ ${f}\n   - ${errs.join('\n   - ')}`) }
}
console.log(bad ? `\n${bad} file(s) with problems` : `✓ ${files.length} idea file(s) OK`)
process.exit(bad ? 1 : 0)
