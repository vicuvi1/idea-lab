import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'

export const isDesktop = () => typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window

type Phase = 'idle' | 'checking' | 'none' | 'available' | 'downloading' | 'installing' | 'error' | 'web'

interface UpdaterState {
  phase: Phase
  current: string
  latest?: string
  notes?: string
  progress: number // 0-100
  error?: string
  check: () => Promise<void>
  install: () => Promise<void>
}

const Ctx = createContext<UpdaterState | null>(null)

// The Update object from the plugin; kept outside React state.
let pending: import('@tauri-apps/plugin-updater').Update | null = null

export function UpdaterProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<Phase>(isDesktop() ? 'idle' : 'web')
  const [current, setCurrent] = useState(__APP_VERSION__)
  const [latest, setLatest] = useState<string>()
  const [notes, setNotes] = useState<string>()
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string>()

  const check = useCallback(async () => {
    if (!isDesktop()) return
    setPhase('checking')
    setError(undefined)
    try {
      const { getVersion } = await import('@tauri-apps/api/app')
      setCurrent(await getVersion())
      const { check } = await import('@tauri-apps/plugin-updater')
      const update = await check()
      if (update) {
        pending = update
        setLatest(update.version)
        setNotes(update.body ?? undefined)
        setPhase('available')
      } else {
        setPhase('none')
      }
    } catch (e) {
      setError(String(e))
      setPhase('error')
    }
  }, [])

  const install = useCallback(async () => {
    if (!pending) return
    setPhase('downloading')
    setProgress(0)
    try {
      let total = 0
      let done = 0
      await pending.downloadAndInstall((ev) => {
        if (ev.event === 'Started') total = ev.data.contentLength ?? 0
        if (ev.event === 'Progress') {
          done += ev.data.chunkLength
          if (total) setProgress(Math.round((done / total) * 100))
        }
        if (ev.event === 'Finished') setPhase('installing')
      })
      const { relaunch } = await import('@tauri-apps/plugin-process')
      await relaunch()
    } catch (e) {
      setError(String(e))
      setPhase('error')
    }
  }, [])

  // Check quietly once at start-up.
  useEffect(() => {
    if (isDesktop()) {
      const t = setTimeout(() => void check(), 3000)
      return () => clearTimeout(t)
    }
  }, [check])

  return <Ctx.Provider value={{ phase, current, latest, notes, progress, error, check, install }}>{children}</Ctx.Provider>
}

export function useUpdater() {
  const u = useContext(Ctx)
  if (!u) throw new Error('useUpdater outside provider')
  return u
}
