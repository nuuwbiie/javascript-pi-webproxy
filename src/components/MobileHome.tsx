import { useState, useEffect, useMemo } from 'react'
import { AppView, MobileHeader } from '../apps/AppViews'
import { appRegistry } from '../data/apps'
import { members } from '../data/members'
import { InitialPortrait } from './Portrait'
import type { AppId, WindowPayload, Member } from '../types'
import {
  WinFileExplorerIcon,
  WinCvIcon,
  WinPhotosIcon,
  WinEdgeIcon,
  MobileSignalIcon,
  MobileWifiIcon,
  MobileBatteryIcon,
  MobileBingIcon,
  MobileCameraIcon,
  MobileMicIcon,
  MobilePhoneIcon,
  MobileToDoIcon,
  MobileOneDriveIcon,
  WinMiniWordIcon,
  WinMiniExcelIcon,
  WinMiniPptIcon,
  WinMiniOneNoteIcon,
  MobileWeatherIcon,
} from './WindowsIcons'
import { X, ChevronRight, ExternalLink, FileText } from 'lucide-react'

function MonitorIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export function MobileHome({ onSwitchView }: { onSwitchView?: () => void }) {
  const [active, setActive] = useState<{ appId: AppId; payload?: WindowPayload } | null>(null)
  const [phoneModalOpen, setPhoneModalOpen] = useState(false)
  const [microsoftModalOpen, setMicrosoftModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Live time and date matching mockup style
  const [timeStr, setTimeStr] = useState(() => {
    const d = new Date()
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
  })
  const [dateStr, setDateStr] = useState(() => {
    const d = new Date()
    return d.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const d = new Date()
      setTimeStr(d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }))
      setDateStr(d.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' }))
    }, 10000)
    return () => clearInterval(timer)
  }, [])

  const open = (appId: AppId, payload?: WindowPayload) => {
    setPhoneModalOpen(false)
    setMicrosoftModalOpen(false)
    setSearchQuery('')
    setActive({ appId, payload })
  }

  // Filter members and apps for search
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return null

    const matchedMembers = members.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.nickname.toLowerCase().includes(q) ||
        (m.hometown && m.hometown.toLowerCase().includes(q)) ||
        (m.role && m.role.toLowerCase().includes(q)) ||
        (m.interests && m.interests.some((tag) => tag.toLowerCase().includes(q)))
    )

    const matchedApps = Object.entries(appRegistry).filter(
      ([, app]) =>
        app.label.toLowerCase().includes(q) ||
        app.shortLabel.toLowerCase().includes(q)
    )

    return { members: matchedMembers, apps: matchedApps }
  }, [searchQuery])

  if (active) {
    const title =
      active.appId === 'profile'
        ? 'Profile'
        : active.appId === 'cv-viewer'
        ? 'CV Viewer'
        : active.appId in appRegistry
        ? appRegistry[active.appId as keyof typeof appRegistry].label
        : 'PROXY OS'
    return (
      <main id="main" className="mobile-app win11-mobile-app">
        <MobileHeader title={title} onHome={() => setActive(null)} />
        <div className="mobile-app-content win11-mobile-content">
          <AppView
            appId={active.appId}
            payload={active.payload}
            onOpen={open}
          />
        </div>
      </main>
    )
  }

  return (
    <main id="main" className="win11-mobile-launcher-container" aria-label="PROXY OS Mobile Launcher">
      {/* 1. TOP STATUS BAR */}
      <header className="win11-mobile-os-statusbar">
        <div className="win11-mobile-status-time">{timeStr}</div>

        <div className="win11-mobile-status-right">
          {onSwitchView && (
            <button
              className="win11-mobile-switch-desktop-btn"
              onClick={onSwitchView}
              title="Ganti ke Mode Desktop Windows 11"
              aria-label="Mode Desktop"
            >
              <MonitorIcon />
              <span>Desktop</span>
            </button>
          )}

          <div className="win11-mobile-status-icons" aria-label="Status Sinyal, Wi-Fi, dan Baterai">
            <MobileSignalIcon color="#D4EDFF" />
            <MobileWifiIcon color="#D4EDFF" />
            <MobileBatteryIcon color="#D4EDFF" />
          </div>
        </div>
      </header>

      {/* 2. CLOCK, WEATHER & DATE WIDGET (Upper Center) */}
      <section className="win11-mobile-clock-section" aria-label="Jam dan Cuaca">
        <div className="win11-mobile-clock-row">
          <span className="win11-mobile-big-time">{timeStr}</span>
          <span className="win11-mobile-time-bullet" aria-hidden="true">•</span>
          <div className="win11-mobile-weather-pill" title="Cuaca Saat Ini 27°C">
            <MobileWeatherIcon size={28} />
            <span className="win11-mobile-temp">27°</span>
          </div>
        </div>
        <p className="win11-mobile-date-text">{dateStr}</p>
      </section>

      {/* BOTTOM CLUSTER: APP GRID, SEARCH BAR, DOCK, HOME BAR */}
      <div className="win11-mobile-bottom-section">
        {/* 3. MAIN APP GRID (Row of 4 Icons) */}
        <section className="win11-mobile-app-grid" aria-label="Aplikasi Utama">
        {/* Phone App */}
        <button
          className="win11-mobile-app-tile"
          onClick={() => setPhoneModalOpen(true)}
          title="Buka Kontak & Panggilan 12 Anggota PROXY"
          aria-label="Phone"
        >
          <div className="win11-mobile-tile-shadow">
            <MobilePhoneIcon size={52} />
          </div>
          <span className="win11-mobile-tile-name">Phone</span>
        </button>

        {/* To Do App */}
        <button
          className="win11-mobile-app-tile"
          onClick={() => open('welcome')}
          title="Buka To Do / Catatan Sambutan PROXY"
          aria-label="To Do"
        >
          <div className="win11-mobile-tile-shadow">
            <MobileToDoIcon size={52} />
          </div>
          <span className="win11-mobile-tile-name">To Do</span>
        </button>

        {/* OneDrive App */}
        <button
          className="win11-mobile-app-tile"
          onClick={() => open('members')}
          title="Buka OneDrive / File Explorer Berkas Tim"
          aria-label="OneDrive"
        >
          <div className="win11-mobile-tile-shadow">
            <MobileOneDriveIcon size={52} />
          </div>
          <span className="win11-mobile-tile-name">OneDrive</span>
        </button>

        {/* Microsoft Folder */}
        <button
          className="win11-mobile-app-tile"
          onClick={() => setMicrosoftModalOpen(true)}
          title="Buka Folder Microsoft 365 PROXY"
          aria-label="Microsoft Folder"
        >
          <div className="win11-mobile-folder-box">
            <WinMiniWordIcon />
            <WinMiniExcelIcon />
            <WinMiniPptIcon />
            <WinMiniOneNoteIcon />
          </div>
          <span className="win11-mobile-tile-name">Microsoft</span>
        </button>
      </section>

      {/* 4. SEARCH BAR WIDGET & INDICATOR */}
      <section className="win11-mobile-search-container" aria-label="Widget Pencarian">
        <div className="win11-mobile-search-pill">
          <div className="win11-mobile-search-icon" aria-hidden="true">
            <MobileBingIcon />
          </div>
          <input
            type="text"
            className="win11-mobile-search-input"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Pencarian OS"
          />
          {searchQuery && (
            <button
              className="win11-mobile-search-clear"
              onClick={() => setSearchQuery('')}
              aria-label="Hapus Pencarian"
            >
              <X size={14} />
            </button>
          )}
          <div className="win11-mobile-search-actions">
            <span className="win11-mobile-search-tool-btn" title="Visual Search / Kamera">
              <MobileCameraIcon />
            </span>
            <span className="win11-mobile-search-tool-btn" title="Voice Search / Mikrofon">
              <MobileMicIcon />
            </span>
          </div>
        </div>

        {/* Live Search Results Popover */}
        {searchResults && (
          <div className="win11-mobile-search-dropdown" role="region" aria-label="Hasil Pencarian">
            <div className="win11-mobile-search-dropdown-header">
              <span>Hasil Pencarian untuk &ldquo;{searchQuery}&rdquo;</span>
              <button onClick={() => setSearchQuery('')} aria-label="Tutup Hasil Pencarian">
                <X size={14} />
              </button>
            </div>

            <div className="win11-mobile-search-results-list">
              {/* Member Results */}
              {searchResults.members.length > 0 && (
                <div className="win11-mobile-search-group">
                  <div className="win11-mobile-search-group-title">Anggota Tim ({searchResults.members.length})</div>
                  {searchResults.members.map((m) => (
                    <button
                      key={m.id}
                      className="win11-mobile-search-item"
                      onClick={() => open('profile', { memberId: m.id })}
                    >
                      <div className="win11-mobile-search-avatar">
                        <InitialPortrait member={m} />
                      </div>
                      <div className="win11-mobile-search-info">
                        <strong>{m.name} ({m.nickname})</strong>
                        <small>{m.hometown ? `${m.hometown} · ` : ''}{m.role || 'Anggota Tim'}</small>
                      </div>
                      <ChevronRight size={14} className="win11-mobile-search-arrow" />
                    </button>
                  ))}
                </div>
              )}

              {/* App Results */}
              {searchResults.apps.length > 0 && (
                <div className="win11-mobile-search-group">
                  <div className="win11-mobile-search-group-title">Aplikasi ({searchResults.apps.length})</div>
                  {searchResults.apps.map(([id, app]) => (
                    <button
                      key={id}
                      className="win11-mobile-search-item"
                      onClick={() => open(id as AppId)}
                    >
                      <div className="win11-mobile-search-app-icon">
                        {id === 'members' && <WinFileExplorerIcon style={{ width: 22, height: 22 }} />}
                        {id === 'cvs' && <WinCvIcon style={{ width: 22, height: 22 }} />}
                        {id === 'memories' && <WinPhotosIcon style={{ width: 22, height: 22 }} />}
                        {id === 'welcome' && <WinMiniWordIcon />}
                        {id === 'links' && <WinEdgeIcon style={{ width: 22, height: 22 }} />}
                      </div>
                      <div className="win11-mobile-search-info">
                        <strong>{app.label}</strong>
                        <small>{app.shortLabel || 'Aplikasi PROXY OS'}</small>
                      </div>
                      <ChevronRight size={14} className="win11-mobile-search-arrow" />
                    </button>
                  ))}
                </div>
              )}

              {searchResults.members.length === 0 && searchResults.apps.length === 0 && (
                <div className="win11-mobile-search-empty">
                  Tidak ditemukan hasil untuk &ldquo;{searchQuery}&rdquo;.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Small horizontal swipe indicator below search bar */}
        <div className="win11-mobile-search-indicator" aria-hidden="true" />
      </section>

      {/* 5. BOTTOM DOCK (Row of 4 Favorite Apps) */}
      <footer className="win11-mobile-dock" aria-label="Aplikasi Favorit Dock">
        {/* Edge / Web Links */}
        <button
          className="win11-mobile-dock-icon"
          onClick={() => open('links')}
          title="Buka Microsoft Edge / Tautan Resmi & Repo"
          aria-label="Microsoft Edge"
        >
          <WinEdgeIcon style={{ width: 48, height: 48 }} />
        </button>

        {/* Photos / Memories */}
        <button
          className="win11-mobile-dock-icon"
          onClick={() => open('memories')}
          title="Buka Photos / Galeri Foto Kenangan"
          aria-label="Photos"
        >
          <WinPhotosIcon style={{ width: 48, height: 48 }} />
        </button>

        {/* File Explorer / Members */}
        <button
          className="win11-mobile-dock-icon"
          onClick={() => open('members')}
          title="Buka File Explorer / 12 Anggota Tim"
          aria-label="File Explorer"
        >
          <WinFileExplorerIcon style={{ width: 48, height: 48 }} />
        </button>

        {/* CV ATS */}
        <button
          className="win11-mobile-dock-icon"
          onClick={() => open('cvs')}
          title="Buka Dokumen CV ATS Tim"
          aria-label="CV Viewer"
        >
          <WinCvIcon style={{ width: 48, height: 48 }} />
        </button>
      </footer>

      {/* 6. BOTTOM HOME GESTURE BAR */}
        <div className="win11-mobile-home-indicator" aria-hidden="true" />
      </div>

      {/* =========================================================================
          MODAL 1: PHONE CONTACTS SHEET (12 ANGGOTA TIM)
          ========================================================================= */}
      {phoneModalOpen && (
        <div className="win11-mobile-modal-overlay" onClick={() => setPhoneModalOpen(false)}>
          <div
            className="win11-mobile-modal-sheet"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Kontak Tim PROXY"
          >
            <div className="win11-mobile-modal-header">
              <div className="win11-mobile-modal-title">
                <MobilePhoneIcon size={24} />
                <h3>Kontak &amp; Anggota Tim PROXY</h3>
              </div>
              <button
                className="win11-mobile-modal-close"
                onClick={() => setPhoneModalOpen(false)}
                aria-label="Tutup"
              >
                <X size={18} />
              </button>
            </div>

            <p className="win11-mobile-modal-subtitle">
              Pekan Ilkomerz 62 · 12 Mahasiswa Ilmu Komputer IPB University
            </p>

            <div className="win11-mobile-contact-list">
              {members.map((m: Member) => {
                const igSocial = m.socials?.find((s) => s.label.toLowerCase() === 'instagram')
                return (
                  <div key={m.id} className="win11-mobile-contact-card">
                    <div
                      className="win11-mobile-contact-avatar"
                      onClick={() => open('profile', { memberId: m.id })}
                    >
                      <InitialPortrait member={m} />
                    </div>

                    <div
                      className="win11-mobile-contact-details"
                      onClick={() => open('profile', { memberId: m.id })}
                    >
                      <div className="win11-mobile-contact-name-row">
                        <strong>{m.name}</strong>
                        {m.id === '01' && <span className="win11-mobile-pjk-badge">PJK</span>}
                      </div>
                      <small className="win11-mobile-contact-meta">
                        {m.hometown ? `${m.hometown}` : 'IPB University'} · {m.nickname}
                      </small>
                    </div>

                    <div className="win11-mobile-contact-actions">
                      {igSocial?.url && (
                        <a
                          href={igSocial.url}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="win11-mobile-contact-ig-btn"
                          title={`Kunjungi Instagram ${m.nickname}`}
                        >
                          <ExternalLink size={14} />
                          <span>IG</span>
                        </a>
                      )}
                      {m.cv && (
                        <button
                          className="win11-mobile-contact-cv-btn"
                          onClick={() => open('cv-viewer', { memberId: m.id })}
                          title="Lihat CV ATS"
                        >
                          <FileText size={14} />
                          <span>CV</span>
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 2: MICROSOFT FOLDER MODAL
          ========================================================================= */}
      {microsoftModalOpen && (
        <div className="win11-mobile-modal-overlay" onClick={() => setMicrosoftModalOpen(false)}>
          <div
            className="win11-mobile-folder-popup"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Microsoft Apps"
          >
            <div className="win11-mobile-folder-header">
              <h3>Microsoft Apps</h3>
              <button
                className="win11-mobile-modal-close"
                onClick={() => setMicrosoftModalOpen(false)}
                aria-label="Tutup"
              >
                <X size={18} />
              </button>
            </div>

            <div className="win11-mobile-folder-apps-grid">
              {/* Word -> Welcome Notepad */}
              <button className="win11-mobile-folder-app-btn" onClick={() => open('welcome')}>
                <div className="win11-folder-app-icon-wrap">
                  <WinMiniWordIcon />
                </div>
                <span>Word</span>
                <small>Sambutan &amp; Notulen</small>
              </button>

              {/* Excel -> Members Database */}
              <button className="win11-mobile-folder-app-btn" onClick={() => open('members')}>
                <div className="win11-folder-app-icon-wrap">
                  <WinMiniExcelIcon />
                </div>
                <span>Excel</span>
                <small>Database Anggota</small>
              </button>

              {/* PowerPoint -> Memories */}
              <button className="win11-mobile-folder-app-btn" onClick={() => open('memories')}>
                <div className="win11-folder-app-icon-wrap">
                  <WinMiniPptIcon />
                </div>
                <span>PowerPoint</span>
                <small>Galeri Foto</small>
              </button>

              {/* OneNote -> CV ATS */}
              <button className="win11-mobile-folder-app-btn" onClick={() => open('cvs')}>
                <div className="win11-folder-app-icon-wrap">
                  <WinMiniOneNoteIcon />
                </div>
                <span>OneNote</span>
                <small>Dokumen CV ATS</small>
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
