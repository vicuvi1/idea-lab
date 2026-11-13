import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import type { AppState, Idea, Profile, Todo } from './types'
import { freshState, seedIdeas } from './data/seed'
import { loadState, saveState } from './lib/storage'

interface Store {
  state: AppState
  ready: boolean
  saved: boolean
  updateIdea: (id: string, patch: Partial<Idea> | ((i: Idea) => Idea)) => void
  addIdea: (idea: Idea) => void
  deleteIdea: (id: string) => void
  setProfile: (p: Profile) => void
  setTodos: (t: Todo[]) => void
  replaceState: (s: AppState) => void
  resetAll: () => void
}

const Ctx = createContext<Store | null>(null)

/** Make sure older/partial data still has every field the app expects. */
function migrate(s: AppState): AppState {
  const base = freshState()
  const merged: AppState = { ...base, ...s, profile: { ...base.profile, ...s.profile } }
  merged.profile.priorities = { ...base.profile.priorities, ...s.profile?.priorities }
  merged.ideas = (s.ideas ?? base.ideas).map((i) => {
    const seed = seedIdeas.find((x) => x.id === i.id)
    return { ...(seed ?? {}), ...i, interviews: i.interviews ?? [], notes: i.notes ?? '' } as Idea
  })
  merged.todos = s.todos ?? []
  // Add built-in ideas shipped by an update that this install hasn't seen yet.
  const seen = new Set(s.seenSeeds ?? (s.ideas ?? []).map((i) => i.id))
  const have = new Set(merged.ideas.map((i) => i.id))
  for (const seed of seedIdeas) {
    if (!seen.has(seed.id) && !have.has(seed.id)) merged.ideas.push(structuredClone(seed))
  }
  merged.seenSeeds = seedIdeas.map((i) => i.id)
  return merged
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(freshState)
  const [ready, setReady] = useState(false)
  const [saved, setSaved] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => {
    loadState().then((s) => {
      if (s) setState(migrate(s))
      setReady(true)
    })
  }, [])

  useEffect(() => {
    if (!ready) return
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => {
      saveState(state).then(() => {
        setSaved(true)
        window.setTimeout(() => setSaved(false), 1200)
      })
    }, 300)
  }, [state, ready])

  const updateIdea = useCallback<Store['updateIdea']>((id, patch) => {
    setState((s) => ({
      ...s,
      ideas: s.ideas.map((i) => {
        if (i.id !== id) return i
        const next = typeof patch === 'function' ? patch(i) : { ...i, ...patch }
        return { ...next, updatedAt: new Date().toISOString() }
      }),
    }))
  }, [])

  const value: Store = {
    state,
    ready,
    saved,
    updateIdea,
    addIdea: (idea) => setState((s) => ({ ...s, ideas: [...s.ideas, idea] })),
    deleteIdea: (id) => setState((s) => ({ ...s, ideas: s.ideas.filter((i) => i.id !== id) })),
    setProfile: (profile) => setState((s) => ({ ...s, profile })),
    setTodos: (todos) => setState((s) => ({ ...s, todos })),
    replaceState: (s) => setState(migrate(s)),
    resetAll: () => setState(freshState()),
  }
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useStore() {
  const s = useContext(Ctx)
  if (!s) throw new Error('useStore outside provider')
  return s
}

export function useIdea(id: string | undefined) {
  const { state } = useStore()
  return state.ideas.find((i) => i.id === id)
}
