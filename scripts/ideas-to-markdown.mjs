// Builds IDEAS.md: one readable document with every researched idea (those with a rank).
// Usage: node scripts/ideas-to-markdown.mjs
import fs from 'node:fs'
import path from 'node:path'

const dir = 'src/data/ideas'
const ideas = fs.readdirSync(dir).filter((f) => f.endsWith('.json'))
  .map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')))
  .filter((i) => i.rank).sort((a, b) => a.rank - b.rank)
const K = ['pain', 'willingnessToPay', 'lowCompetition', 'easyToBuild', 'easyToSell', 'skillFit', 'globalPotential']
const total = (i) => K.reduce((s, k) => s + (i.scores[k] ?? 0), 0)
const anchor = (i) => `${i.rank}-${i.title}`.toLowerCase().replace(/[^a-z0-9 -]/g, '').trim().replace(/\s+/g, '-')

const L = []
L.push(`# ${ideas.length} business ideas for Victor & Jonatan`, '')
L.push(`Researched November 2026. Each idea is also in the Idea Lab app (Library → "Top 50 research" filter), where you can score, compare and track it.`, '')
L.push(`Scores are 0–10 on 7 criteria (total out of 70): pain, willingness to pay, low competition, easy to build, easy to sell, fit with Victor's skills, global potential. They are research estimates, not customer-tested facts.`, '')
L.push('## Ranked list', '', '| # | Idea | Industry | Price | Cash (3 mo) | MVP | Competition | Score |', '|---|---|---|---|---|---|---|---|')
for (const i of ideas) L.push(`| ${i.rank} | [${i.title}](#${anchor(i)}) | ${i.industry} | ${i.priceLabel} | €${i.numbers.cashMin}–${i.numbers.cashMax} | ${i.numbers.mvpWeeksMin}–${i.numbers.mvpWeeksMax} wk | ${i.numbers.competitionLevel} | **${total(i)}** |`)
L.push('')
for (const i of ideas) {
  L.push('---', '', `## ${i.rank}. ${i.title}`, '')
  L.push(`**${i.industry}** · ${i.priceLabel} · score **${total(i)}/70** · competition: ${i.numbers.competitionLevel}`, '')
  if (i.hook) L.push(`> ${i.hook}`, '')
  L.push(i.summary, '')
  if (i.whyNow) L.push(`**Why now:** ${i.whyNow}`, '')
  if (i.story) L.push('### The problem', '', i.story, '')
  if (i.evidence?.length) L.push('### Evidence', '', ...i.evidence.map((e) => `- ${e}`), '')
  if (i.whoPays?.length) L.push('### Who pays', '', ...i.whoPays.map((w) => `- **${w.label}:** ${w.text}`), '')
  if (i.solution?.length) L.push('### How it works', '', ...i.solution.map((s, n) => `${n + 1}. ${s.title ? `**${s.title}:** ` : ''}${s.text}`), '')
  L.push('### MVP (first version)', '', ...i.mvp.must.map((m) => `- ${m}`), '', `*Later:* ${i.mvp.later.join(' · ')}`, '')
  if (i.pricing?.length) L.push('### Pricing', '', ...i.pricing.map((p) => `- **${p.name}:** ${p.description}`), '')
  if (i.costs?.length) L.push('### Costs', '', '| Item | Note | Cost |', '|---|---|---|', ...i.costs.map((c) => `| ${c.item} | ${c.note ?? ''} | ${c.cost} |`), ...(i.costTotal3Months ? [`| **First 3 months** | | **${i.costTotal3Months}** |`] : []), '')
  if (i.competitors?.length) L.push('### Competitors and the gap', '', '| Who | What they do | Gap |', '|---|---|---|', ...i.competitors.map((c) => `| ${c.isUs ? '**Us**' : c.name} | ${c.what} | ${c.gap} |`), '')
  if (i.timeline?.length) L.push('### Plan', '', ...i.timeline.map((t) => `- **${t.when}:** ${t.what}`), '')
  if (i.risks?.length) L.push('### Risks', '', ...i.risks.map((r) => `- **${r.risk}:** ${r.answer}`), '')
  if (i.questions?.length) L.push('### Questions to ask customers', '', ...i.questions.map((q, n) => `${n + 1}. ${q}`), '')
  L.push('### Scores', '', K.map((k) => `${k}: ${i.scores[k]}`).join(' · ') + ` · **total ${total(i)}/70**`, '')
  if (i.sources?.length) L.push('### Sources', '', ...i.sources.map((s) => `- [${s.title || s.url}](${s.url})`), '')
}
fs.writeFileSync('IDEAS.md', L.join('\n'))
console.log(`IDEAS.md written with ${ideas.length} ideas`)
