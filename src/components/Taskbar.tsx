import { Volume2, Wifi } from 'lucide-react'
import { useState } from 'react'
import { useWindows } from '../app/WindowContext'
import { useClock } from '../hooks/useClock'

export function Taskbar() {
  const { state, restore, minimize } = useWindows()
  const [menuOpen, setMenuOpen] = useState(false)
  const now = useClock()

  return (
    <>
      {menuOpen && (
        <div className="start-menu">
          <strong>PROXY OS</strong>
          <p>A digital space for a real connection.</p>
          <small>5 members connected · sample mode</small>
        </div>
      )}
      <footer className="taskbar" aria-label="Taskbar">
        <button className="start-button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen}>
          <span className="proxy-mark">P</span><strong>PROXY OS</strong>
        </button>
        <div className="running-apps" aria-label="Aplikasi berjalan">
          {state.windows.map((item) => (
            <button key={item.id} className={item.minimized ? '' : 'is-running'} onClick={() => item.minimized ? restore(item.id) : minimize(item.id)}>
              {item.title}
            </button>
          ))}
        </div>
        <div className="system-tray">
          <Wifi size={18} aria-label="Terhubung" />
          <Volume2 size={18} aria-label="Audio tidak diputar otomatis" />
          <time dateTime={now.toISOString()}>{new Intl.DateTimeFormat('id-ID', { weekday: 'short', hour: '2-digit', minute: '2-digit' }).format(now)}</time>
        </div>
      </footer>
    </>
  )
}
