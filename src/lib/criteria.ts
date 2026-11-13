import type { CriterionKey } from '../types'

export const CRITERIA: { key: CriterionKey; label: string; hint: string }[] = [
  { key: 'pain', label: 'Pain strength', hint: 'How much does the problem hurt the customer?' },
  { key: 'willingnessToPay', label: 'Willingness to pay', hint: 'Will they actually pay money for it?' },
  { key: 'lowCompetition', label: 'Low competition', hint: '10 = nobody does this well yet' },
  { key: 'easyToBuild', label: 'Easy to build', hint: '10 = MVP in days, not months' },
  { key: 'easyToSell', label: 'Easy to sell', hint: 'Can you reach and convince buyers?' },
  { key: 'skillFit', label: 'Fits my skills', hint: 'Matches what you already know' },
  { key: 'globalPotential', label: 'Global potential', hint: 'Can it be sold worldwide?' },
  { key: 'excitement', label: 'Excites me', hint: 'Would you enjoy working on it for 2 years?' },
]

export const STATUSES = [
  { key: 'idea', label: 'Idea', color: '#8b949e' },
  { key: 'researching', label: 'Researching', color: '#5b9dff' },
  { key: 'validating', label: 'Validating', color: '#e3b341' },
  { key: 'building', label: 'Building', color: '#a371f7' },
  { key: 'launched', label: 'Launched', color: '#3fb950' },
  { key: 'dropped', label: 'Dropped', color: '#f85149' },
] as const

export const SKILLS = [
  'coding', 'security', 'ai', 'integrations', 'design', 'marketing', 'b2b-sales', 'local-sales',
  'writing', 'accounting', 'logistics', 'e-commerce', 'construction', 'government', 'finance', 'healthcare',
]

export const IDEA_COLORS = ['#3987e5', '#d95926', '#199e70', '#c98500', '#d55181', '#0ca30c', '#9085e9', '#e66767']
