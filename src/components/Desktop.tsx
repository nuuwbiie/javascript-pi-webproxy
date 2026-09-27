import { Smartphone, Sun } from 'lucide-react'
import { useEffect } from 'react'
import { useWindows } from '../app/WindowContext'
import { AppView, HeroView } from '../apps/AppViews'
import { appRegistry, desktopApps } from '../data/apps'
import { DesktopIcon } from './DesktopIcon'
import { Taskbar } from './Taskbar'
import { WindowFrame } from './WindowFrame'

export function Desktop({ onSwitchView }: { onSwitchView?: () => void }) {
  const { state, openApp } = useWindows()

  useEffect(() => {
    if (state.windows.length === 0) openApp('welcome')
  }, [openApp, state.windows.length])

  return (
    <main id="main" className="desktop">
      <aside className="desktop-icons" aria-label="Aplikasi">
        {desktopApps.map((id) => {
          const app = appRegistry[id]
          return <DesktopIcon key={id} label={app.shortLabel} icon={app.icon} tone={app.tone} onOpen={() => openApp(id)} />
        })}
      </aside>
      <p className="desktop-note top">Five people. One connection.</p>
      <p className="desktop-note bottom">good people<br />good progress.</p>
      <section className="hero-window os-window" aria-label="PROXY photo board">
        <span className="tape" aria-hidden="true" />
        <div className="window-titlebar"><div className="traffic-lights" aria-hidden="true"><span className="red" /><span className="yellow" /><span className="green" /></div><span className="window-title">proxy.jpg</span></div>
        <div className="window-content"><HeroView /></div>
      </section>
      <aside className="sticky-note" aria-label="To do">
        <span className="tape" aria-hidden="true" />
        <h2>To Do</h2><label><input type="checkbox" /> Kenalan sama anggota</label><label><input type="checkbox" /> Lihat CV mereka</label><label><input type="checkbox" /> Cek dokumentasi</label><label><input type="checkbox" /> Isi data asli</label><label className="done"><input type="checkbox" defaultChecked /> Be proud!</label>
      </aside>
      <aside className="music-widget" aria-label="Pemutar dekoratif, tidak memutar audio"><small>NOW PLAYING</small><strong>Good People</strong><span>PROXY · no autoplay</span><div><button aria-label="Sebelumnya">‹</button><button aria-label="Putar dekoratif" disabled>▶</button><button aria-label="Berikutnya">›</button></div></aside>
      <aside className="weather-widget" aria-label="Info cuaca dekoratif">
        <span className="weather-sun" aria-hidden="true"><Sun size={26} /></span>
        <div><strong>27°C · Cerah</strong><small>Kampus — good day to build</small></div>
      </aside>
      <span className="os-watermark" aria-hidden="true">PROXY OS · v1.0 · sample mode</span>
      {state.windows.map((item) => <WindowFrame key={item.id} window={item}><AppView appId={item.appId} payload={item.payload} onOpen={openApp} /></WindowFrame>)}
      {onSwitchView && (
        <button className="view-switch" onClick={onSwitchView} aria-pressed="false">
          <Smartphone size={16} aria-hidden="true" /> Mode HP
        </button>
      )}
      <Taskbar />
    </main>
  )
}
