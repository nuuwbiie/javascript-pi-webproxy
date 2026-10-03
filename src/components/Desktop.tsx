import { useEffect } from 'react'
import { useWindows } from '../app/WindowContext'
import { AppView } from '../apps/AppViews'
import { DesktopIcon } from './DesktopIcon'
import { Taskbar } from './Taskbar'
import { WindowFrame } from './WindowFrame'
import {
  WinFileExplorerIcon,
  WinCvIcon,
  WinPhotosIcon,
  WinSettingsIcon,
  WinEdgeIcon,
  WinNotepadIcon,
  WinRecycleBinIcon,
} from './WindowsIcons'

function SmartphoneIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="5" y="2" width="14" height="20" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="18" r="1" fill="currentColor" />
    </svg>
  )
}

let hasAutoOpenedWelcome = false

export function Desktop({ onSwitchView }: { onSwitchView?: () => void }) {
  const { state, openApp } = useWindows()

  useEffect(() => {
    // Tampilkan Welcome.txt otomatis saat pertama kali membuka web
    if (!hasAutoOpenedWelcome) {
      hasAutoOpenedWelcome = true
      openApp('welcome')
    }
  }, [openApp])

  const desktopShortcuts = [
    { id: 'members' as const, label: 'This PC', icon: <WinFileExplorerIcon style={{ width: 44, height: 44 }} /> },
    { id: 'welcome' as const, label: 'Welcome.txt', icon: <WinNotepadIcon style={{ width: 44, height: 44 }} /> },
    { id: 'cvs' as const, label: 'CV ATS Tim', icon: <WinCvIcon style={{ width: 44, height: 44 }} /> },
    { id: 'memories' as const, label: 'Photos', icon: <WinPhotosIcon style={{ width: 44, height: 44 }} /> },
    { id: 'links' as const, label: 'Microsoft Edge', icon: <WinEdgeIcon style={{ width: 44, height: 44 }} /> },
    { id: 'about' as const, label: 'Settings', icon: <WinSettingsIcon style={{ width: 44, height: 44 }} /> },
    { id: 'trash' as const, label: 'Recycle Bin', icon: <WinRecycleBinIcon style={{ width: 44, height: 44 }} /> },
  ]

  return (
    <main id="main" className="win11-desktop desktop">
      {/* Desktop Shortcuts Grid on the Left */}
      <aside className="win11-desktop-icons" aria-label="Desktop Shortcuts">
        {desktopShortcuts.map((item) => (
          <DesktopIcon
            key={item.id}
            label={item.label}
            icon={item.icon}
            onOpen={() => openApp(item.id)}
          />
        ))}
      </aside>

      {/* Watermark in bottom right corner (Windows 11 Build watermark) */}
      <div className="win11-watermark" aria-hidden="true">
        <span>Windows 11 PROXY Edition</span>
        <span>Connect &amp; Deploy · 12 Anggota</span>
      </div>

      {/* Render open Windows */}
      {state.windows.map((item) => (
        <WindowFrame key={item.id} window={item}>
          <AppView
            appId={item.appId}
            payload={item.payload}
            onOpen={openApp}
          />
        </WindowFrame>
      ))}

      {/* Switch to mobile button if available */}
      {onSwitchView && (
        <button className="win11-view-switch" onClick={onSwitchView} aria-pressed="false">
          <SmartphoneIcon /> Mode HP
        </button>
      )}

      {/* Windows 11 Centered Taskbar */}
      <Taskbar />
    </main>
  )
}
