import { useState } from 'react'
import { ExtLink } from './ui'

export const DOWNLOAD_URL = 'https://github.com/vicuvi1/idea-lab-releases/releases/latest/download/IdeaLab-Setup.exe'
export const PORTABLE_URL = 'https://github.com/vicuvi1/idea-lab-releases/releases/latest/download/IdeaLab-Portable-Windows.zip'
export const RELEASES_URL = 'https://github.com/vicuvi1/idea-lab-releases/releases/latest'

/** Settings card: how to put Idea Lab on another PC and move your data there. */
export function SharePanel() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(DOWNLOAD_URL)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      window.prompt('Copy this link:', DOWNLOAD_URL)
    }
  }
  return (
    <div className="card stack span2">
      <div className="card-title">Install on another PC</div>
      <p className="small text-2">Send this link to anyone (or open it on your other PC). It always downloads the newest version:</p>
      <div className="row" style={{ flexWrap: 'nowrap' }}>
        <input className="input" readOnly value={DOWNLOAD_URL} onFocus={(e) => e.currentTarget.select()} aria-label="Download link" />
        <button className="btn primary" onClick={copy}>{copied ? '✓ Copied' : 'Copy link'}</button>
      </div>
      <div className="grid g3" style={{ gap: 10 }}>
        <div className="card" style={{ boxShadow: 'none', background: 'var(--surface-2)' }}>
          <strong>1. Installer</strong>
          <p className="small text-2 mt">Run <ExtLink href={DOWNLOAD_URL}>IdeaLab-Setup.exe</ExtLink>. It adds a desktop icon and updates itself.</p>
        </div>
        <div className="card" style={{ boxShadow: 'none', background: 'var(--surface-2)' }}>
          <strong>2. No install (portable)</strong>
          <p className="small text-2 mt">Download <ExtLink href={PORTABLE_URL}>the portable zip</ExtLink>, unzip it (even onto a USB stick) and double-click <code>Idea Lab.exe</code>.</p>
        </div>
        <div className="card" style={{ boxShadow: 'none', background: 'var(--surface-2)' }}>
          <strong>3. Bring your data</strong>
          <p className="small text-2 mt">Here: <em>Download backup</em>. On the other PC: <em>Settings → Load backup</em>. Your scores, notes and conversations come with it.</p>
        </div>
      </div>
      <p className="muted small">If Windows says "Windows protected your PC": click <strong>More info → Run anyway</strong> (the app isn't code-signed yet). All versions: <ExtLink href={RELEASES_URL}>release page</ExtLink>.</p>
    </div>
  )
}
