import { useState } from 'react'
import { AppView, MobileHeader } from '../apps/AppViews'
import { appRegistry, desktopApps } from '../data/apps'
import type { AppId, WindowPayload } from '../types'
import {
  WindowsStartIcon,
  WinFileExplorerIcon,
  WinCvIcon,
  WinPhotosIcon,
  WinNotepadIcon,
  WinEdgeIcon,
  WinSettingsIcon,
  WinRecycleBinIcon,
} from './WindowsIcons'

function ChevronRightIcon({ size = 18, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function MonitorIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function UserIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}


const launcherHints: Partial<Record<AppId, string>> = {
  members: 'Berkas & 12 Anggota Tim',
  cvs: 'Dokumen CV ATS Tim',
  memories: 'Galeri Foto Kegiatan',
  welcome: 'Catatan Sambutan',
  links: 'Tautan Resmi & Repo',
  about: 'Tentang PROXY OS',
  trash: 'Recycle Bin',
}

const getAppIcon = (id: AppId) => {
  switch (id) {
    case 'members':
      return <WinFileExplorerIcon style={{ width: 34, height: 34 }} />
    case 'cvs':
      return <WinCvIcon style={{ width: 34, height: 34 }} />
    case 'memories':
      return <WinPhotosIcon style={{ width: 34, height: 34 }} />
    case 'welcome':
      return <WinNotepadIcon style={{ width: 34, height: 34 }} />
    case 'links':
      return <WinEdgeIcon style={{ width: 34, height: 34 }} />
    case 'about':
      return <WinSettingsIcon style={{ width: 34, height: 34 }} />
    case 'trash':
      return <WinRecycleBinIcon style={{ width: 34, height: 34 }} />
    default:
      return <WinFileExplorerIcon style={{ width: 34, height: 34 }} />
  }
}

export function MobileHome({ onSwitchView }: { onSwitchView?: () => void }) {
  const [active, setActive] = useState<{ appId: AppId; payload?: WindowPayload } | null>(null)
  const open = (appId: AppId, payload?: WindowPayload) => setActive({ appId, payload })

  if (active) {
    const title = active.appId === 'profile' ? 'Profile' : active.appId === 'cv-viewer' ? 'CV Viewer' : active.appId in appRegistry ? appRegistry[active.appId as keyof typeof appRegistry].label : 'PROXY OS'
    return (
      <main id="main" className="mobile-app win11-mobile-app">
        <MobileHeader title={title} onHome={() => setActive(null)} />
        <div className="mobile-app-content win11-mobile-content">
          <AppView appId={active.appId} payload={active.payload} onOpen={open} />
        </div>
      </main>
    )
  }

  return (
    <main id="main" className="mobile-home win11-mobile-home">
      <header className="win11-mobile-topbar">
        <div className="win11-mobile-brand">
          <WindowsStartIcon style={{ width: 22, height: 22 }} />
          <span>Windows 11 PROXY</span>
        </div>
        <div className="mobile-header-actions">
          {onSwitchView && (
            <button className="mobile-view-switch win11-view-switch-btn" onClick={onSwitchView} aria-pressed="false">
              <MonitorIcon /> Mode Desktop
            </button>
          )}
          <span className="mobile-status win11-status-pill">12 Anggota</span>
        </div>
      </header>

      <section className="mobile-hero win11-mobile-hero">
        <p>Pekan Ilkomerz 62 · Connect &amp; Deploy</p>
        <h1>12 Anggota.<br />Satu Koneksi.</h1>
        <span>Portofolio digital interaktif dalam balutan Windows 11 Fluent Design.</span>
      </section>

      <section className="mobile-launcher win11-mobile-launcher" aria-label="Aplikasi">
        {desktopApps.map((id) => {
          const app = appRegistry[id]
          return (
            <button key={id} onClick={() => open(id)} className="win11-mobile-tile">
              <div className="win11-mobile-tile-icon">{getAppIcon(id)}</div>
              <div className="win11-mobile-tile-text">
                <strong>{app.label}</strong>
                <small>{launcherHints[id] ?? 'Buka aplikasi'}</small>
              </div>
              <ChevronRightIcon size={18} className="win11-mobile-arrow" />
            </button>
          )
        })}
      </section>

      <footer className="win11-mobile-footer">
        <div className="win11-mobile-user">
          <div className="win11-user-avatar"><UserIcon /></div>
          <span>PROXY Group · Ilkomerz 62</span>
        </div>
        <p>Windows 11 Edition</p>
      </footer>
    </main>
  )
}
