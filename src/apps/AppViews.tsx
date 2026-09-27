import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  FileText,
  Github,
  Home,
  Instagram,
  Linkedin,
  MapPin,
  Trash2,
  X,
  Laptop,
  CheckCircle2,
} from 'lucide-react'
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { FileExplorer } from '../components/FileExplorer'
import { InitialPortrait, PlaceholderBadge } from '../components/Portrait'
import { members, getMember } from '../data/members'
import { memories } from '../data/memories'
import { siteContent } from '../data/site'
import type { AppId, MemoryItem, WindowPayload } from '../types'
import { WinCvIcon } from '../components/WindowsIcons'

export function WelcomeView() {
  return (
    <article className="win11-notepad">
      {/* Notepad Menu Bar */}
      <div className="win11-notepad-menu">
        <span>File</span>
        <span>Edit</span>
        <span>View</span>
      </div>
      <div className="win11-notepad-body">
        <p>Halo semuanya!</p>
        <h2>Selamat datang di PROXY OS (Windows 11 Edition)</h2>
        <p>{siteContent.intro}</p>
        <p>
          Portofolio ini dirancang untuk memperkenalkan tim kami yang beranggotakan 12 orang termasuk PJK (Penanggung Jawab Kelompok).
        </p>
        <p>
          Anda dapat membuka <strong>File Explorer</strong> untuk melihat folder seluruh anggota, memeriksa CV ATS di <strong>CV Viewer</strong>, melihat dokumentasi foto di <strong>Photos / Memories</strong>, atau membuka <strong>Settings</strong> untuk melihat detail tim.
        </p>
        <p className="signature">— PROXY Team (Connect &amp; Deploy 62)</p>
      </div>
      <div className="win11-notepad-status">
        <span>Ln 12, Col 1</span>
        <span>100%</span>
        <span>Windows (CRLF)</span>
        <span>UTF-8</span>
      </div>
    </article>
  )
}

export function HeroView() {
  return (
    <article className="win11-photos-hero">
      <img src="/proxy-campus.png" alt="Visual kampus PROXY OS" />
      <div className="win11-hero-overlay">
        <h2>PROXY</h2>
        <p>CONNECT &amp; DEPLOY ✦ ILKOMERZ 62</p>
        <small>12 People · One Unified System</small>
      </div>
    </article>
  )
}

const socialIcons = { Instagram, LinkedIn: Linkedin, GitHub: Github }

export function ProfileView({ memberId, open }: { memberId?: string; open: (id: AppId, payload?: WindowPayload) => void }) {
  const member = getMember(memberId)
  return (
    <article className="win11-profile-view">
      <div className="win11-profile-left">
        <div className="win11-profile-portrait">
          <InitialPortrait member={member} large />
          {member.isPlaceholder && <PlaceholderBadge />}
        </div>
      </div>

      <div className="win11-profile-right">
        <header className="win11-profile-header">
          <div>
            <h2>{member.name}</h2>
            <p className="win11-profile-role">{member.role}</p>
          </div>
          {member.isPlaceholder && <PlaceholderBadge />}
        </header>

        <div className="win11-profile-meta-grid">
          <div className="win11-meta-item">
            <span className="win11-meta-label"><CalendarDays size={15} /> Tanggal Lahir</span>
            <span className="win11-meta-val">{member.birthDate ?? 'Belum diisi'}</span>
          </div>
          <div className="win11-meta-item">
            <span className="win11-meta-label"><MapPin size={15} /> Kota Asal</span>
            <span className="win11-meta-val">{member.hometown ?? 'Belum diisi'}</span>
          </div>
        </div>

        <div className="win11-profile-section">
          <h3>Tentang</h3>
          <p>{member.bio}</p>
        </div>

        <div className="win11-profile-section">
          <h3>Keahlian &amp; Minat</h3>
          <div className="win11-tag-pills">
            {member.interests.map((interest) => (
              <span key={interest} className="win11-pill">{interest}</span>
            ))}
          </div>
        </div>

        <div className="win11-profile-section">
          <h3>Kontak &amp; Sosial</h3>
          <div className="win11-social-links">
            {member.socials.map((social) => {
              const Icon = socialIcons[social.label as keyof typeof socialIcons]
              return social.url ? (
                <a key={social.label} href={social.url} target="_blank" rel="noopener noreferrer" className="win11-social-btn">
                  <Icon size={15} />
                  <span>{social.label}</span>
                </a>
              ) : (
                <span key={social.label} className="win11-social-btn is-disabled">
                  <Icon size={15} />
                  <span>{social.label}</span>
                </span>
              )
            })}
          </div>
        </div>

        <div className="win11-profile-actions">
          <button className="win11-btn-primary" onClick={() => open('cv-viewer', { memberId: member.id })}>
            <WinCvIcon style={{ width: 18, height: 18 }} />
            <span>Buka CV ATS</span>
          </button>
          <button className="win11-btn-secondary" disabled>
            <Download size={15} />
            <span>Unduh PDF</span>
          </button>
        </div>
      </div>
    </article>
  )
}

export function CvsView({ open }: { open: (id: AppId, payload?: WindowPayload) => void }) {
  return (
    <div className="win11-cv-list">
      <header className="win11-cv-header">
        <FileText size={22} className="win11-accent-icon" />
        <div>
          <h2>Dokumen CV ATS Tim ({members.length} Anggota)</h2>
          <p>Curriculum Vitae terstandar ATS untuk setiap anggota kelompok termasuk PJK.</p>
        </div>
      </header>

      <div className="win11-cv-grid">
        {members.map((member) => (
          <button
            key={member.id}
            className="win11-cv-card"
            onClick={() => open('cv-viewer', { memberId: member.id })}
          >
            <div className="win11-cv-card-icon">
              <WinCvIcon style={{ width: 34, height: 34 }} />
            </div>
            <div className="win11-cv-card-info">
              <strong>{member.nickname.toLowerCase().replaceAll(' ', '-')}_cv.pdf</strong>
              <small>{member.role}</small>
            </div>
            <ChevronRight size={16} className="win11-cv-arrow" />
          </button>
        ))}
      </div>
    </div>
  )
}

export function CvViewer({ memberId }: { memberId?: string }) {
  const member = getMember(memberId)
  return (
    <div className="win11-cv-viewer">
      <div className="win11-cv-viewer-toolbar">
        <div className="win11-cv-doc-name">
          <WinCvIcon style={{ width: 16, height: 16 }} />
          <span>{member.nickname}_cv.pdf</span>
        </div>
        <div className="win11-cv-tools">
          <span>Halaman 1 / 1</span>
          <span>100%</span>
          <button className="win11-btn-secondary" disabled>
            <Download size={14} /> Download
          </button>
        </div>
      </div>

      <div className="win11-cv-canvas">
        {member.cv ? (
          <iframe src={member.cv} title={`CV ${member.name}`} />
        ) : (
          <article className="win11-cv-sheet">
            <header className="win11-cv-sheet-header">
              <h1>{member.name.toUpperCase()}</h1>
              <p className="win11-cv-sheet-role">{member.role}</p>
            </header>

            <div className="win11-cv-sheet-content">
              <section className="win11-cv-sheet-left">
                <h3>RINGKASAN PROFIL</h3>
                <p>{member.bio}</p>

                <h3>KEAHLIAN &amp; KOMPETENSI</h3>
                <p>{member.interests.join(' • ')}</p>

                <h3>PENDIDIKAN</h3>
                <p>Mahasiswa S1 Ilmu Komputer — Angkatan 62</p>
              </section>

              <aside className="win11-cv-sheet-right">
                <h3>INFORMASI KONTAK</h3>
                <p>Email: mahasiswa62@ilkom.ipb.ac.id</p>
                <p>Status: Mahasiswa Aktif</p>

                <h3>PROYEK &amp; PENUGASAN</h3>
                <p>Connect &amp; Deploy — Pekan Ilkomerz 62 (PROXY OS)</p>
              </aside>
            </div>
          </article>
        )}
      </div>
    </div>
  )
}

export function MemoriesView() {
  const [filter, setFilter] = useState<'All' | MemoryItem['category']>('All')
  const [active, setActive] = useState<number | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const filtered = useMemo(() => memories.filter((memory) => filter === 'All' || memory.category === filter), [filter])

  useEffect(() => {
    if (active === null) return
    closeRef.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActive(null)
      if (event.key === 'ArrowRight') setActive((value) => (value === null ? null : (value + 1) % filtered.length))
      if (event.key === 'ArrowLeft') setActive((value) => (value === null ? null : (value - 1 + filtered.length) % filtered.length))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, filtered.length])

  const selected = active === null ? undefined : filtered[active]
  const activeIndex = active ?? 0

  return (
    <div className="win11-photos-app">
      {/* Photos App Navigation Tabs */}
      <div className="win11-photos-tabs" role="tablist" aria-label="Kategori Foto">
        {(['All', 'Pekan Ilkomerz', 'Behind the Scenes', 'Our Team'] as const).map((category) => (
          <button
            key={category}
            role="tab"
            aria-selected={filter === category}
            className={`win11-tab-btn ${filter === category ? 'is-active' : ''}`}
            onClick={() => {
              setFilter(category)
              setActive(null)
            }}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="win11-photos-grid">
        {filtered.map((memory, index) => (
          <button key={memory.id} onClick={() => setActive(index)} className="win11-photo-tile">
            <img src={memory.src} alt={memory.alt} style={{ objectPosition: memory.position }} loading="lazy" />
            <div className="win11-photo-caption">
              <span>{memory.title}</span>
              {memory.isPlaceholder && <small>Contoh</small>}
            </div>
          </button>
        ))}
      </div>

      {selected && (
        <div className="win11-lightbox" role="dialog" aria-modal="true" aria-label={selected.title}>
          <button ref={closeRef} className="win11-lightbox-close" onClick={() => setActive(null)} aria-label="Close">
            <X size={20} />
          </button>
          <button
            className="win11-lightbox-nav win11-lightbox-prev"
            onClick={() => setActive((activeIndex - 1 + filtered.length) % filtered.length)}
            aria-label="Previous photo"
          >
            <ChevronLeft size={24} />
          </button>
          <figure className="win11-lightbox-figure">
            <img src={selected.src} alt={selected.alt} style={{ objectPosition: selected.position }} />
            <figcaption className="win11-lightbox-info">
              <h3>{selected.title}</h3>
              <p>{selected.caption}</p>
            </figcaption>
          </figure>
          <button
            className="win11-lightbox-nav win11-lightbox-next"
            onClick={() => setActive((activeIndex + 1) % filtered.length)}
            aria-label="Next photo"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </div>
  )
}

export function AboutView() {
  return (
    <article className="win11-settings-view">
      <header className="win11-settings-header">
        <div className="win11-settings-device-icon">
          <Laptop size={36} />
        </div>
        <div>
          <h2>PROXY-DESKTOP-12</h2>
          <p>Pekan Ilkomerz 62 · Connect &amp; Deploy</p>
        </div>
      </header>

      <section className="win11-settings-card">
        <h3>Spesifikasi Sistem</h3>
        <div className="win11-spec-row">
          <span>Edisi</span>
          <strong>Windows 11 PROXY Edition</strong>
        </div>
        <div className="win11-spec-row">
          <span>Versi</span>
          <strong>24H2 (Pekan Ilkomerz 62)</strong>
        </div>
        <div className="win11-spec-row">
          <span>Kapasitas Kelompok</span>
          <strong>12 Anggota Termasuk PJK</strong>
        </div>
        <div className="win11-spec-row">
          <span>Arsitektur</span>
          <strong>React 18 + Vite + TypeScript (Client-side SPA)</strong>
        </div>
        <div className="win11-spec-row">
          <span>Status</span>
          <strong className="win11-status-ok"><CheckCircle2 size={15} /> Aktif &amp; Terverifikasi</strong>
        </div>
      </section>

      <section className="win11-settings-card">
        <h3>Tentang Proyek</h3>
        <p>
          PROXY OS Windows 11 Edition dirancang sebagai yearbook digital interaktif yang menyajikan profil lengkap 12 anggota kelompok, kurasi dokumen CV format ATS, galeri foto dokumentasi kegiatan, dan tautan resmi kelompok.
        </p>
      </section>
    </article>
  )
}

export function LinksView() {
  return (
    <article className="win11-edge-view">
      <header className="win11-edge-header">
        <h2>Bookmarks &amp; Tautan Resmi</h2>
        <p>Tautan eksternal kelompok dan repositori proyek Pekan Ilkomerz 62.</p>
      </header>
      <div className="win11-links-list">
        {siteContent.links.map((link) => (
          <div key={link.label} className="win11-link-card">
            <div className="win11-link-info">
              <strong>{link.label}</strong>
              <small>{link.description}</small>
            </div>
            {link.url ? (
              <a href={link.url} target="_blank" rel="noopener noreferrer" className="win11-btn-primary">
                <ExternalLink size={15} />
                <span>Buka</span>
              </a>
            ) : (
              <button className="win11-btn-secondary" disabled>
                Belum diisi
              </button>
            )}
          </div>
        ))}
      </div>
    </article>
  )
}

export function TrashView() {
  return (
    <div className="win11-trash-view">
      <Trash2 size={54} strokeWidth={1.3} className="win11-trash-icon" />
      <h2>Recycle Bin ini kosong</h2>
      <p>Tidak ada berkas yang dihapus. Semua kenangan dan data kelompok tetap terjaga rapi.</p>
      <div className="win11-trash-footer">
        <span>0 items</span>
        <span>PROXY OS (C:)</span>
      </div>
    </div>
  )
}

export function AppView({ appId, payload, onOpen }: { appId: AppId; payload?: WindowPayload; onOpen: (id: AppId, payload?: WindowPayload) => void }) {
  const views: Record<AppId, ReactNode> = {
    welcome: <WelcomeView />,
    members: <FileExplorer onOpen={onOpen} />,
    profile: <ProfileView memberId={payload?.memberId} open={onOpen} />,
    cvs: <CvsView open={onOpen} />,
    'cv-viewer': <CvViewer memberId={payload?.memberId} />,
    memories: <MemoriesView />,
    about: <AboutView />,
    links: <LinksView />,
    trash: <TrashView />,
  }
  return views[appId]
}

export function MobileHeader({ title, onHome }: { title: string; onHome: () => void }) {
  return (
    <header className="mobile-app-header win11-mobile-header">
      <button onClick={onHome} className="win11-mobile-back">
        <Home size={18} />
        <span>Home</span>
      </button>
      <strong>{title}</strong>
      <span />
    </header>
  )
}
