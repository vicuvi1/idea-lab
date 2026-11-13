export type Status = 'idea' | 'researching' | 'validating' | 'building' | 'launched' | 'dropped'

export type CriterionKey =
  | 'pain'
  | 'willingnessToPay'
  | 'lowCompetition'
  | 'easyToBuild'
  | 'easyToSell'
  | 'skillFit'
  | 'globalPotential'
  | 'excitement'

export interface Slider {
  min: number
  max: number
  value: number
  label: string
}

export interface Interview {
  id: string
  date: string
  who: string
  company?: string
  wouldPay: 'yes' | 'maybe' | 'no' | 'unknown'
  paidAmount?: number
  painLevel: number // 0-10
  quote?: string
  notes?: string
}

export interface Idea {
  id: string
  title: string
  color: string
  industry: string
  status: Status
  source?: string
  tags: string[]
  summary: string
  priceLabel: string
  hook?: string
  story?: string
  whyReal: { title: string; text: string }[]
  whoPays: { label: string; text: string }[]
  solution: { title: string; text: string }[]
  mvp: { must: string[]; later: string[] }
  techStack: string[]
  timeline: { when: string; what: string }[]
  costs: { item: string; note: string; cost: string }[]
  costTotal3Months?: string
  pricing: { name: string; description: string }[]
  calculator: { customers: Slider; price: Slider; multiplier: Slider | null }
  competitors: { name: string; what: string; gap: string; isUs?: boolean }[]
  risks: { risk: string; answer: string }[]
  questions: string[]
  numbers: {
    cashMin: number
    cashMax: number
    mvpWeeksMin: number
    mvpWeeksMax: number
    priceLabel: string
    competition: string
    competitionLevel: 'low' | 'medium' | 'high'
    whoSells: string
  }
  skills: string[]
  recurring: boolean
  scores: Record<CriterionKey, number>
  notes: string
  interviews: Interview[]
  favorite?: boolean
  createdAt?: string
  updatedAt?: string
}

export interface Profile {
  name: string
  skills: string[]
  budget: number // € available for first 3 months
  hoursPerWeek: number
  industries: string[] // industries I know or like
  priorities: Record<CriterionKey, number> // 0-5 importance
  deadlineWeeks: number // how fast I want an MVP
}

export interface Todo {
  id: string
  text: string
  done: boolean
  ideaId?: string
  createdAt: string
}

export interface AppState {
  version: 1
  ideas: Idea[]
  profile: Profile
  todos: Todo[]
}
