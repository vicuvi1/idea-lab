import { NavLink, Outlet } from 'react-router-dom'
import { useStore } from '../store'
import { useEffect, useState } from 'react'

const NAV = [
  { to: '/', label: 'Dashboard', ico: '◧' },
  { to: '/ideas', label: 'Idea Library', ico: '❒' },
  { to: '/compare', label: 'Compare & Score', ico: '⚖' },
  { to: '/fit', label: 'Fit for Me', ico: '◎' },
  { to: '/money', label: 'Money Calculator', ico: '$' },
  { to: '/validation', label: 'Validation', ico: '✓' },
  { to: '/settings', label: 'Settings & Backup', ico: '⚙' },
]

export function Layout() {
  const { saved, state } = useStore()
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('idea-lab-theme') || 'dark' } catch { return 'dark' }
  })
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem('idea-lab-theme', theme) } catch { /* ignore */ }
  }, [theme])

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">◆</span> Idea Lab</div>
        {NAV.map((n) => (
          <NavLink key={n.to} to={n.to} end={n.to === '/'} className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>
            <span className="nav-ico">{n.ico}</span>{n.label}
          </NavLink>
        ))}
        <div className="sidebar-foot">
          <button className="btn sm" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? '☀ Light mode' : '☾ Dark mode'}
          </button>
          <span>{state.ideas.length} ideas</span>
          <span className="saved-dot" style={{ opacity: saved ? 1 : 0 }}>Saved</span>
        </div>
      </aside>
      <main className="main"><Outlet /></main>
    </div>
  )
}
