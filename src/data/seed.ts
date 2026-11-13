import type { AppState, Idea, Profile } from '../types'

const files = import.meta.glob<Idea>('./ideas/*.json', { eager: true, import: 'default' })

export const seedIdeas: Idea[] = Object.keys(files)
  .sort()
  .map((k) => structuredClone(files[k]))

export const defaultProfile: Profile = {
  name: 'Me',
  skills: ['coding', 'security', 'ai'],
  budget: 800,
  hoursPerWeek: 15,
  industries: ['Cybersecurity'],
  deadlineWeeks: 8,
  priorities: {
    pain: 5,
    willingnessToPay: 5,
    lowCompetition: 3,
    easyToBuild: 3,
    easyToSell: 4,
    skillFit: 4,
    globalPotential: 3,
    excitement: 3,
  },
}

export function freshState(): AppState {
  return { version: 1, ideas: structuredClone(seedIdeas), profile: structuredClone(defaultProfile), todos: [], seenSeeds: seedIdeas.map((i) => i.id) }
}

export function blankIdea(color: string): Idea {
  const now = new Date().toISOString()
  return {
    id: 'idea-' + Math.random().toString(36).slice(2, 8),
    title: 'New idea',
    color,
    industry: '',
    status: 'idea',
    tags: [],
    summary: '',
    priceLabel: '',
    hook: '',
    story: '',
    whyReal: [],
    whoPays: [{ label: 'Customer', text: '' }, { label: 'Buyer', text: '' }],
    solution: [],
    mvp: { must: [], later: [] },
    techStack: [],
    timeline: [],
    costs: [],
    pricing: [],
    calculator: {
      customers: { min: 1, max: 500, value: 20, label: 'Paying customers' },
      price: { min: 9, max: 499, value: 99, label: 'Average price per month ($)' },
      multiplier: null,
    },
    competitors: [],
    risks: [],
    questions: [],
    numbers: {
      cashMin: 300, cashMax: 700, mvpWeeksMin: 3, mvpWeeksMax: 6,
      priceLabel: '', competition: 'Unknown', competitionLevel: 'medium', whoSells: '',
    },
    skills: ['coding'],
    recurring: true,
    scores: {
      pain: 5, willingnessToPay: 5, lowCompetition: 5, easyToBuild: 5,
      easyToSell: 5, skillFit: 5, globalPotential: 5, excitement: 5,
    },
    notes: '',
    interviews: [],
    createdAt: now,
    updatedAt: now,
  }
}
