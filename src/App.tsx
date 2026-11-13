import { HashRouter, Route, Routes } from 'react-router-dom'
import { StoreProvider, useStore } from './store'
import { Layout } from './components/Layout'
import Dashboard from './pages/Dashboard'
import Library from './pages/Library'
import IdeaDetail from './pages/IdeaDetail'
import IdeaEdit from './pages/IdeaEdit'
import Compare from './pages/Compare'
import FitPage from './pages/Fit'
import Money from './pages/Money'
import Validation from './pages/Validation'
import Settings from './pages/Settings'
import { UpdaterProvider } from './lib/updater'

function Routed() {
  const { ready } = useStore()
  if (!ready) return <div className="main muted">Loading…</div>
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="ideas" element={<Library />} />
        <Route path="idea/:id" element={<IdeaDetail />} />
        <Route path="idea/:id/edit" element={<IdeaEdit />} />
        <Route path="compare" element={<Compare />} />
        <Route path="fit" element={<FitPage />} />
        <Route path="money" element={<Money />} />
        <Route path="validation" element={<Validation />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<Dashboard />} />
      </Route>
    </Routes>
  )
}

export default function App() {
  return (
    <StoreProvider>
      <UpdaterProvider>
        <HashRouter>
          <Routed />
        </HashRouter>
      </UpdaterProvider>
    </StoreProvider>
  )
}
