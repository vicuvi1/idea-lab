import { useRef, useState } from 'react'
import { useStore } from '../store'
import { downloadFile, storageLocation } from '../lib/storage'
import type { AppState, Idea } from '../types'
import { CRITERIA } from '../lib/criteria'

function ideaToMarkdown(i: Idea) {
  const L: string[] = [`## ${i.title}`, '', `*${i.industry} · ${i.status} · ${i.priceLabel}*`, '', i.summary, '']
  if (i.story) L.push('### Problem story', '', i.story, '')
  if (i.solution.length) L.push('### Solution', '', ...i.solution.map((s, n) => `${n + 1}. **${s.title}:** ${s.text}`), '')
  L.push('### Scores', '', ...CRITERIA.map((c) => `- ${c.label}: ${i.scores[c.key]}/10`), '')
  if (i.interviews.length) L.push('### Conversations', '', ...i.interviews.map((v) => `- ${v.date} · ${v.who} · ${v.wouldPay}${v.quote ? ` · "${v.quote}"` : ''}`), '')
  if (i.notes) L.push('### Notes', '', i.notes, '')
  return L.join('\n')
}

export default function Settings() {
  const { state, replaceState, resetAll } = useStore()
  const file = useRef<HTMLInputElement>(null)
  const [msg, setMsg] = useState('')
  const stamp = new Date().toISOString().slice(0, 10)

  const onImport = async (f: File) => {
    try {
      const data = JSON.parse(await f.text()) as AppState
      if (!Array.isArray(data.ideas)) throw new Error('No ideas found in this file')
      if (!confirm(`Replace your current data with ${data.ideas.length} ideas from "${f.name}"?`)) return
      replaceState(data)
      setMsg(`Loaded ${data.ideas.length} ideas from ${f.name}.`)
    } catch (e) {
      setMsg('Could not read that file: ' + (e as Error).message)
    }
  }

  return (
    <>
      <div className="page-head"><div><h1>Settings & Backup</h1><p className="sub">Your data is stored only on this computer.</p></div></div>
      <div className="grid g2">
        <div className="card stack">
          <div className="card-title">Where your data lives</div>
          <p><strong>{storageLocation()}</strong></p>
          <p className="muted small">Make a backup now and then, especially before resetting or switching between the website and the desktop app (they store data separately).</p>
        </div>
        <div className="card stack">
          <div className="card-title">Backup & restore</div>
          <div className="row">
            <button className="btn primary" onClick={() => downloadFile(`idea-lab-backup-${stamp}.json`, JSON.stringify(state, null, 2))}>⬇ Download backup (.json)</button>
            <button className="btn" onClick={() => file.current?.click()}>⬆ Load backup</button>
            <input ref={file} type="file" accept=".json,application/json" hidden onChange={(e) => e.target.files?.[0] && onImport(e.target.files[0])} />
          </div>
          <button className="btn" style={{ width: 'fit-content' }} onClick={() => downloadFile(`idea-lab-notes-${stamp}.md`, `# Idea Lab export (${stamp})\n\n` + state.ideas.map(ideaToMarkdown).join('\n---\n\n'), 'text/markdown')}>⬇ Export all ideas as Markdown</button>
          {msg && <p className="small">{msg}</p>}
        </div>
        <div className="card stack">
          <div className="card-title">Danger zone</div>
          <p className="muted small">Reset brings back the original 8 ideas and deletes your edits, conversations and notes.</p>
          <button className="btn danger" style={{ width: 'fit-content' }} onClick={() => confirm('Delete all your changes and start over?') && resetAll()}>Reset everything</button>
        </div>
        <div className="card stack">
          <div className="card-title">Coming later</div>
          <p className="muted small">AI analysis (find weak spots, generate new ideas from your profile, draft interview questions) using your own Claude API key.</p>
        </div>
      </div>
    </>
  )
}
