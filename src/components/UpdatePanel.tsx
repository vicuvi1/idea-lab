import { useUpdater } from '../lib/updater'
import { Meter } from './ui'

/** Compact widget for the sidebar. */
export function UpdateBadge() {
  const u = useUpdater()
  if (u.phase === 'web') return <span>v{u.current} · website</span>
  return (
    <div className="stack" style={{ gap: 6 }}>
      {u.phase === 'available' && (
        <button className="btn primary sm" onClick={u.install}>⬇ Update to v{u.latest}</button>
      )}
      {(u.phase === 'downloading' || u.phase === 'installing') && (
        <div className="stack" style={{ gap: 4 }}>
          <span>{u.phase === 'installing' ? 'Installing…' : `Downloading… ${u.progress}%`}</span>
          <Meter value={u.progress} />
        </div>
      )}
      {!['available', 'downloading', 'installing'].includes(u.phase) && (
        <button className="btn sm" onClick={u.check} disabled={u.phase === 'checking'}>
          {u.phase === 'checking' ? 'Checking…' : '↻ Check for updates'}
        </button>
      )}
      <span>v{u.current}{u.phase === 'none' ? ' · up to date' : u.phase === 'error' ? ' · update check failed' : ''}</span>
    </div>
  )
}

/** Full panel for the Settings page. */
export function UpdatePanel() {
  const u = useUpdater()
  return (
    <div className="card stack">
      <div className="card-title">App updates</div>
      <p>Installed version: <strong>v{u.current}</strong></p>
      {u.phase === 'web' && (
        <p className="muted small">You're using the website version. To update it, run <code>git pull</code> in the project folder and restart <code>start-website.bat</code>. The desktop app updates itself.</p>
      )}
      {u.phase === 'none' && <p className="small" style={{ color: 'var(--good)' }}>✓ You have the latest version.</p>}
      {u.phase === 'available' && (
        <>
          <p className="small"><strong>New version v{u.latest} is available.</strong></p>
          {u.notes && <p className="muted small" style={{ whiteSpace: 'pre-line' }}>{u.notes}</p>}
        </>
      )}
      {(u.phase === 'downloading' || u.phase === 'installing') && (
        <div className="stack" style={{ gap: 6 }}>
          <span className="small">{u.phase === 'installing' ? 'Installing… the app will restart by itself.' : `Downloading update… ${u.progress}%`}</span>
          <Meter value={u.progress} />
        </div>
      )}
      {u.phase === 'error' && <p className="small" style={{ color: 'var(--bad)' }}>Could not update: {u.error}</p>}
      {u.phase !== 'web' && (
        <div className="row">
          {u.phase === 'available'
            ? <button className="btn primary" onClick={u.install}>⬇ Update & restart</button>
            : <button className="btn" onClick={u.check} disabled={u.phase === 'checking' || u.phase === 'downloading' || u.phase === 'installing'}>{u.phase === 'checking' ? 'Checking…' : '↻ Check for updates'}</button>}
        </div>
      )}
      <p className="muted small">Your ideas and notes are kept when updating. A backup before updating never hurts.</p>
    </div>
  )
}
