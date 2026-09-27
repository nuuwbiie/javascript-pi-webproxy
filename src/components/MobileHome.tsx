import { ChevronRight, Monitor } from 'lucide-react'
import { useState } from 'react'
import { AppView, MobileHeader } from '../apps/AppViews'
import { appRegistry, desktopApps } from '../data/apps'
import type { AppId, WindowPayload } from '../types'

const launcherHints: Partial<Record<AppId, string>> = {
  members: 'Jelajahi semua folder',
  memories: '6 sample slots',
  trash: 'Masih kosong',
}

export function MobileHome({ onSwitchView }: { onSwitchView?: () => void }) {
  const [active, setActive] = useState<{ appId: AppId; payload?: WindowPayload } | null>(null)
  const open = (appId: AppId, payload?: WindowPayload) => setActive({ appId, payload })

  if (active) {
    const title = active.appId === 'profile' ? 'Profile' : active.appId === 'cv-viewer' ? 'CV Viewer' : active.appId in appRegistry ? appRegistry[active.appId as keyof typeof appRegistry].label : 'PROXY OS'
    return <main id="main" className="mobile-app"><MobileHeader title={title} onHome={() => setActive(null)} /><div className="mobile-app-content"><AppView appId={active.appId} payload={active.payload} onOpen={open} /></div></main>
  }

  return (
    <main id="main" className="mobile-home">
      <header>
        <span>PROXY OS</span>
        <span className="mobile-header-actions">
          {onSwitchView && <button className="mobile-view-switch" onClick={onSwitchView} aria-pressed="false"><Monitor size={15} aria-hidden="true" /> Desktop</button>}
          <span className="mobile-status">5 connected</span>
        </span>
      </header>
      <section className="mobile-hero"><p>Connect &amp; Deploy</p><h1>Five people.<br />One connection.</h1><span>A digital yearbook for Pekan Ilkomerz 62.</span></section>
      <section className="mobile-launcher" aria-label="Aplikasi">
        {desktopApps.map((id) => {
          const app = appRegistry[id]
          const Icon = app.icon
          return <button key={id} onClick={() => open(id)}><span className={`app-object tone-${app.tone}`}><Icon size={28} /></span><span><strong>{app.shortLabel}</strong><small>{launcherHints[id] ?? 'Open app'}</small></span><ChevronRight size={18} /></button>
        })}
      </section>
      <footer><span>PROXY</span><p>Designed for people who build together.</p></footer>
    </main>
  )
}
