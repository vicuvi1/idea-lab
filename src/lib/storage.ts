import type { AppState } from '../types'

const KEY = 'idea-lab-state-v1'
const FILE = 'idea-lab-data.json'

const isTauri = () => typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window

/**
 * Where data lives:
 * - Desktop app (Tauri): a JSON file in the app's data folder
 *   (Windows: %APPDATA%\com.idealab.app\idea-lab-data.json)
 * - Website: the browser's localStorage
 * Both can be backed up / restored from the Settings page.
 */
export async function loadState(): Promise<AppState | null> {
  try {
    if (isTauri()) {
      const fs = await import('@tauri-apps/plugin-fs')
      const opts = { baseDir: fs.BaseDirectory.AppData }
      if (!(await fs.exists(FILE, opts))) return null
      return JSON.parse(await fs.readTextFile(FILE, opts))
    }
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : null
  } catch (e) {
    console.error('Could not load saved data', e)
    return null
  }
}

export async function saveState(state: AppState): Promise<void> {
  const text = JSON.stringify(state, null, 2)
  try {
    if (isTauri()) {
      const fs = await import('@tauri-apps/plugin-fs')
      const opts = { baseDir: fs.BaseDirectory.AppData }
      await fs.mkdir('', { ...opts, recursive: true }).catch(() => {})
      await fs.writeTextFile(FILE, text, opts)
      return
    }
    localStorage.setItem(KEY, text)
  } catch (e) {
    console.error('Could not save data', e)
  }
}

export function storageLocation() {
  return isTauri() ? `App data folder → ${FILE}` : 'This browser (localStorage)'
}

export function downloadFile(name: string, content: string, type = 'application/json') {
  const blob = new Blob([content], { type })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = name
  a.click()
  setTimeout(() => URL.revokeObjectURL(a.href), 1000)
}
