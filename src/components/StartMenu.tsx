import { useState, useMemo, useRef, useEffect } from 'react'
import { members } from '../data/members'
import type { AppId, WindowPayload } from '../types'
import {
  WinFileExplorerIcon,
  WinTeamIcon,
  WinCvIcon,
  WinPhotosIcon,
  WinNotepadIcon,
  WinEdgeIcon,
  WinSettingsIcon,
  WinRecycleBinIcon,
} from './WindowsIcons'

/* Inline SVG: Search icon (Windows 11 style) */
function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

/* Inline SVG: Power icon */
function PowerIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3v9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M6.3 5.7A8 8 0 1 0 17.7 5.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

/* Inline SVG: ChevronRight */
function ChevronRightIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* Inline SVG: User avatar */
function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

interface StartMenuProps {
  isOpen: boolean
  onClose: () => void
  onOpenApp: (appId: AppId, payload?: WindowPayload) => void
}

interface AppTile {
  id: string
  name: string
  icon: JSX.Element
  appId: AppId
  payload?: WindowPayload
}

export function StartMenu({ isOpen, onClose, onOpenApp }: StartMenuProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const menuRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80)
    } else {
      setSearchQuery('')
    }
  }, [isOpen])

  // Click outside to close
  useEffect(() => {
    if (!isOpen) return
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (menuRef.current && !menuRef.current.contains(target) && !target.closest('.start-button') && !target.closest('.search-box-pill')) {
        onClose()
      }
    }
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [isOpen, onClose])

  const pinnedApps: AppTile[] = useMemo(() => [
    { id: 'members', name: 'File Explorer', icon: <WinFileExplorerIcon />, appId: 'members' },
    { id: 'links', name: 'Microsoft Edge', icon: <WinEdgeIcon />, appId: 'links' },
    { id: 'cvs', name: 'CV ATS Tim', icon: <WinCvIcon />, appId: 'cvs' },
    { id: 'memories', name: 'Photos', icon: <WinPhotosIcon />, appId: 'memories' },
    { id: 'welcome', name: 'Notepad', icon: <WinNotepadIcon />, appId: 'welcome' },
    { id: 'about', name: 'Settings', icon: <WinSettingsIcon />, appId: 'about' },
    { id: 'team', name: 'Anggota Tim (12)', icon: <WinTeamIcon />, appId: 'members' },
    { id: 'pjk', name: 'Apta (PJK)', icon: <WinTeamIcon />, appId: 'profile', payload: { memberId: '01' } },
    { id: 'm02', name: 'Alarick (Anggota 02)', icon: <WinTeamIcon />, appId: 'profile', payload: { memberId: '02' } },
    { id: 'm03', name: 'Pasha (Anggota 03)', icon: <WinTeamIcon />, appId: 'profile', payload: { memberId: '03' } },
    { id: 'm04', name: 'Rafi (Anggota 04)', icon: <WinTeamIcon />, appId: 'profile', payload: { memberId: '04' } },
    { id: 'm05', name: 'Anggota 05', icon: <WinTeamIcon />, appId: 'profile', payload: { memberId: '05' } },
    { id: 'm06', name: 'Athena (Anggota 06)', icon: <WinTeamIcon />, appId: 'profile', payload: { memberId: '06' } },
    { id: 'm07', name: 'Rafha (Anggota 07)', icon: <WinTeamIcon />, appId: 'profile', payload: { memberId: '07' } },
    { id: 'm08', name: 'Anggito (Anggota 08)', icon: <WinTeamIcon />, appId: 'profile', payload: { memberId: '08' } },
    { id: 'm09', name: 'Naura (Anggota 09)', icon: <WinTeamIcon />, appId: 'profile', payload: { memberId: '09' } },
    { id: 'm10', name: 'Anggota 10', icon: <WinTeamIcon />, appId: 'profile', payload: { memberId: '10' } },
    { id: 'm11', name: 'Ibnu (Anggota 11)', icon: <WinTeamIcon />, appId: 'profile', payload: { memberId: '11' } },
    { id: 'm12', name: 'Irsya (Anggota 12)', icon: <WinTeamIcon />, appId: 'profile', payload: { memberId: '12' } },
    { id: 'trash', name: 'Recycle Bin', icon: <WinRecycleBinIcon />, appId: 'trash' },
  ], [])

  // Filter apps or members if user searches
  const filteredApps = useMemo(() => {
    if (!searchQuery.trim()) return []
    const q = searchQuery.toLowerCase()
    const appMatches = pinnedApps.filter((app) => app.name.toLowerCase().includes(q))
    const memberMatches = members
      .filter((m) => m.name.toLowerCase().includes(q) || m.nickname.toLowerCase().includes(q) || m.role.toLowerCase().includes(q))
      .map((m) => ({
        id: `member-${m.id}`,
        name: `${m.nickname} (${m.role})`,
        icon: <WinTeamIcon />,
        appId: 'profile' as AppId,
        payload: { memberId: m.id },
      }))
    return [...appMatches, ...memberMatches]
  }, [searchQuery, pinnedApps])

  if (!isOpen) return null

  return (
    <div className="win11-start-menu" ref={menuRef} role="dialog" aria-label="Start Menu">
      {/* Search Bar at Top */}
      <div className="win11-search-container">
        <SearchIcon />
        <input
          ref={inputRef}
          type="text"
          className="win11-search-input"
          placeholder="Type here to search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Cari aplikasi atau anggota"
        />
        {searchQuery && (
          <button className="win11-search-clear" onClick={() => setSearchQuery('')} aria-label="Hapus pencarian">
            ✕
          </button>
        )}
      </div>

      {searchQuery.trim() ? (
        /* Search Results */
        <div className="win11-search-results">
          <div className="win11-section-header">
            <span>Hasil Pencarian ({filteredApps.length})</span>
          </div>
          <div className="win11-results-list">
            {filteredApps.length === 0 ? (
              <div className="win11-empty-results">Tidak ada aplikasi atau anggota yang cocok dengan "{searchQuery}"</div>
            ) : (
              filteredApps.map((item) => (
                <button
                  key={item.id}
                  className="win11-result-item"
                  onClick={() => {
                    onOpenApp(item.appId, item.payload)
                    onClose()
                  }}
                >
                  <span className="win11-result-icon">{item.icon}</span>
                  <span className="win11-result-name">{item.name}</span>
                </button>
              ))
            )}
          </div>
        </div>
      ) : (
        /* Standard Windows 11 Start Menu Content */
        <div className="win11-start-content">
          {/* Pinned Section */}
          <div className="win11-section-header">
            <strong>Pinned</strong>
            <button className="win11-all-apps-btn" onClick={() => onOpenApp('members')}>
              All apps <ChevronRightIcon size={12} />
            </button>
          </div>

          <div className="win11-pinned-wrapper">
            <div className="win11-apps-grid">
              {pinnedApps.map((app) => (
                <button
                  key={app.id}
                  className="win11-app-tile"
                  onClick={() => {
                    onOpenApp(app.appId, app.payload)
                    onClose()
                  }}
                >
                  <div className="win11-app-tile-icon">{app.icon}</div>
                  <span className="win11-app-tile-label">{app.name}</span>
                </button>
              ))}
            </div>

            {/* Scroll indicator dots on the right (from user SVG) */}
            <div className="win11-pinned-dots" aria-hidden="true">
              <span className="win11-dot is-active" />
              <span className="win11-dot" />
              <span className="win11-dot" />
              <span className="win11-dot" />
            </div>
          </div>

          {/* Recommended Section */}
          <div className="win11-section-header win11-recommended-header">
            <strong>Recommended</strong>
            <button className="win11-all-apps-btn" onClick={() => onOpenApp('members')}>
              More <ChevronRightIcon size={12} />
            </button>
          </div>

          <div className="win11-recommended-grid">
            <button
              className="win11-rec-item"
              onClick={() => {
                onOpenApp('profile', { memberId: '02' })
                onClose()
              }}
            >
              <div className="win11-rec-icon"><WinTeamIcon /></div>
              <div className="win11-rec-info">
                <strong>Muhammad Alarick Irham</strong>
                <small>Profil Anggota 02 · 2h ago</small>
              </div>
            </button>

            <button
              className="win11-rec-item"
              onClick={() => {
                onOpenApp('cv-viewer', { memberId: '02' })
                onClose()
              }}
            >
              <div className="win11-rec-icon"><WinCvIcon /></div>
              <div className="win11-rec-info">
                <strong>alarick_cv.pdf</strong>
                <small>Dokumen ATS · Yesterday at 4:24 PM</small>
              </div>
            </button>

            <button
              className="win11-rec-item"
              onClick={() => {
                onOpenApp('memories')
                onClose()
              }}
            >
              <div className="win11-rec-icon"><WinPhotosIcon /></div>
              <div className="win11-rec-info">
                <strong>Foto Kenangan Ilkomerz</strong>
                <small>Galeri foto kelompok · Yesterday at 1:15 PM</small>
              </div>
            </button>

            <button
              className="win11-rec-item"
              onClick={() => {
                onOpenApp('welcome')
                onClose()
              }}
            >
              <div className="win11-rec-icon"><WinNotepadIcon /></div>
              <div className="win11-rec-info">
                <strong>welcome.txt</strong>
                <small>Catatan sambutan PROXY · 2d ago</small>
              </div>
            </button>

            <button
              className="win11-rec-item"
              onClick={() => {
                onOpenApp('about')
                onClose()
              }}
            >
              <div className="win11-rec-icon"><WinSettingsIcon /></div>
              <div className="win11-rec-info">
                <strong>Struktur Kelompok.txt</strong>
                <small>12 Mahasiswa Ilmu Komputer 62 · 3d ago</small>
              </div>
            </button>

            <button
              className="win11-rec-item"
              onClick={() => {
                onOpenApp('links')
                onClose()
              }}
            >
              <div className="win11-rec-icon"><WinEdgeIcon /></div>
              <div className="win11-rec-info">
                <strong>Panduan Connect &amp; Deploy</strong>
                <small>Pekan Ilkomerz 62 · 4d ago</small>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Profile & Power Footer */}
      <footer className="win11-start-footer">
        <div className="win11-user-profile">
          <div className="win11-user-avatar">
            <UserIcon />
          </div>
          <div className="win11-user-meta">
            <strong>PROXY Group</strong>
            <small>12 Anggota Termasuk PJK</small>
          </div>
        </div>

        <button
          className="win11-power-button"
          title="Power options"
          aria-label="Power options"
          onClick={() => {
            sessionStorage.removeItem('proxy-os-booted')
            window.location.reload()
          }}
        >
          <PowerIcon />
        </button>
      </footer>
    </div>
  )
}
