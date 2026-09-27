import { Trash2 } from 'lucide-react'
import { CalendarDays, ChevronLeft, ChevronRight, Download, ExternalLink, FileText, Github, Home, Instagram, Linkedin, MapPin, Maximize2, X } from 'lucide-react'
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { FileExplorer } from '../components/FileExplorer'
import { InitialPortrait, PlaceholderBadge } from '../components/Portrait'
import { members, getMember } from '../data/members'
import { memories } from '../data/memories'
import { siteContent } from '../data/site'
import type { AppId, MemoryItem, WindowPayload } from '../types'

export function WelcomeView() {
  return (
    <article className="welcome-view reading-pane">
      <p>Halo!</p>
      <h2>Selamat datang di PROXY OS.</h2>
      <p>{siteContent.intro}</p>
      <p>Jelajahi foldernya, kenali kami lebih dekat, dan semoga kamu menemukan hal menarik di sini.</p>
      <p className="signature">— PROXY</p>
      <footer>Ln 1, Col 1 <span>100%</span> UTF-8</footer>
    </article>
  )
}

export function HeroView() {
  return (
    <article className="hero-view">
      <img src="/proxy-campus.png" alt="Visual konseptual kampus yang cerah, digunakan sebagai wallpaper demo" />
      <div className="hero-brand"><h2>PROXY</h2><p>CONNECT &amp; DEPLOY <span>✦</span></p></div>
      <p className="hero-script">same ideas<br />brighter tomorrows</p>
      <span className="hero-sticker">ILKOMERZ 62<br />2026</span>
      <footer><ChevronLeft size={18} /><ChevronRight size={18} /><span /><Maximize2 size={17} /> 72%</footer>
    </article>
  )
}

const socialIcons = { Instagram, LinkedIn: Linkedin, GitHub: Github }

export function ProfileView({ memberId, open }: { memberId?: string; open: (id: AppId, payload?: WindowPayload) => void }) {
  const member = getMember(memberId)
  return (
    <article className="profile-view">
      <div className="profile-portrait"><InitialPortrait member={member} large /><PlaceholderBadge /></div>
      <div className="profile-copy">
        <header><div><h2>{member.name}</h2><p>{member.role}</p></div>{member.isPlaceholder && <PlaceholderBadge />}</header>
        <dl>
          <div><dt><CalendarDays size={16} />Tanggal lahir</dt><dd>{member.birthDate ?? 'Belum diisi'}</dd></div>
          <div><dt><MapPin size={16} />Kota asal</dt><dd>{member.hometown ?? 'Belum diisi'}</dd></div>
        </dl>
        <p>{member.bio}</p>
        <div className="tag-list">{member.interests.map((interest) => <span key={interest}>{interest}</span>)}</div>
        <div className="social-list">
          {member.socials.map((social) => {
            const Icon = socialIcons[social.label as keyof typeof socialIcons]
            return social.url ? <a key={social.label} href={social.url} target="_blank" rel="noopener noreferrer"><Icon size={16} />{social.label}</a> : <span key={social.label} aria-disabled="true"><Icon size={16} />{social.label} · belum diisi</span>
          })}
        </div>
        <div className="profile-actions">
          <button className="primary-button" onClick={() => open('cv-viewer', { memberId: member.id })}>Lihat CV</button>
          <button disabled><Download size={16} /> PDF belum tersedia</button>
        </div>
      </div>
    </article>
  )
}

export function CvsView({ open }: { open: (id: AppId, payload?: WindowPayload) => void }) {
  return (
    <div className="file-list-view">
      <header><FileText size={20} /><div><h2>CVs /</h2><p>Dokumen ATS setiap anggota</p></div></header>
      <ul>
        {members.map((member) => (
          <li key={member.id}>
            <button onClick={() => open('cv-viewer', { memberId: member.id })}><span className="pdf-icon">PDF</span><span><strong>{member.nickname.toLowerCase().replaceAll(' ', '-')}_cv.pdf</strong><small>Belum ada file · buka status</small></span><ChevronRight /></button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function CvViewer({ memberId }: { memberId?: string }) {
  const member = getMember(memberId)
  return (
    <div className="cv-viewer">
      <div className="cv-toolbar"><span>1 / 1</span><span>78%</span><button disabled><Download size={16} /> Download</button></div>
      <div className="cv-stage">
        {member.cv ? <iframe src={member.cv} title={`CV ${member.name}`} /> : (
          <article className="cv-paper">
            <PlaceholderBadge />
            <h2>{member.name.toUpperCase()}</h2><p>{member.role}</p>
            <div className="cv-columns"><section><h3>TENTANG SAYA</h3><p>{member.bio}</p><h3>PENDIDIKAN</h3><p>Tambahkan riwayat pendidikan yang sudah diverifikasi.</p><h3>SKILLS</h3><p>{member.interests.join(' · ')}</p></section><aside><h3>KONTAK</h3><p>Gunakan hanya data publik yang disetujui.</p><h3>PENGALAMAN</h3><p>Ganti dengan pengalaman nyata.</p></aside></div>
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
      if (event.key === 'ArrowRight') setActive((value) => value === null ? null : (value + 1) % filtered.length)
      if (event.key === 'ArrowLeft') setActive((value) => value === null ? null : (value - 1 + filtered.length) % filtered.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, filtered.length])

  const selected = active === null ? undefined : filtered[active]
  const activeIndex = active ?? 0
  return (
    <div className="memories-view">
      <div className="filter-tabs" role="tablist" aria-label="Kategori memori">
        {(['All', 'Pekan Ilkomerz', 'Behind the Scenes', 'Our Team'] as const).map((category) => <button role="tab" aria-selected={filter === category} key={category} onClick={() => { setFilter(category); setActive(null) }}>{category}</button>)}
      </div>
      <div className="memory-grid">
        {filtered.map((memory, index) => (
          <button key={memory.id} onClick={() => setActive(index)} className="memory-tile">
            <img src={memory.src} alt={memory.alt} style={{ objectPosition: memory.position }} loading="lazy" />
            <span>{memory.title}</span>{memory.isPlaceholder && <small>CONTOH</small>}
          </button>
        ))}
      </div>
      {selected && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={selected.title}>
          <button ref={closeRef} className="lightbox-close" onClick={() => setActive(null)} aria-label="Tutup pratinjau"><X /></button>
          <button className="lightbox-prev" onClick={() => setActive((activeIndex - 1 + filtered.length) % filtered.length)} aria-label="Foto sebelumnya"><ChevronLeft /></button>
          <figure><img src={selected.src} alt={selected.alt} style={{ objectPosition: selected.position }} /><figcaption><PlaceholderBadge /><h2>{selected.title}</h2><p>{selected.caption}</p></figcaption></figure>
          <button className="lightbox-next" onClick={() => setActive((activeIndex + 1) % filtered.length)} aria-label="Foto berikutnya"><ChevronRight /></button>
        </div>
      )}
    </div>
  )
}

export function AboutView() {
  return (
    <article className="about-view reading-pane">
      <span className="about-mark">P</span><h2>Five people.<br />One connection.</h2>
      <p>PROXY OS adalah ruang digital untuk memperkenalkan tim, menyimpan dokumentasi, dan merayakan proses belajar bersama selama Pekan Ilkomerz 62.</p>
      <blockquote>“A digital space for a real connection.”</blockquote>
      <dl><div><dt>Project</dt><dd>Connect &amp; Deploy</dd></div><div><dt>Format</dt><dd>Interactive digital yearbook</dd></div><div><dt>Status</dt><dd>Sample content — menunggu data tim</dd></div></dl>
    </article>
  )
}

export function LinksView() {
  return (
    <article className="links-view">
      <header><h2>Bookmarks</h2><p>Tautan yang menghubungkan PROXY ke luar desktop.</p></header>
      <ul>{siteContent.links.map((link) => <li key={link.label}><span><strong>{link.label}</strong><small>{link.description}</small></span>{link.url ? <a href={link.url} target="_blank" rel="noopener noreferrer"><ExternalLink size={18} /><span className="sr-only">Buka {link.label}</span></a> : <button disabled>Belum diisi</button>}</li>)}</ul>
    </article>
  )
}

export function TrashView() {
  return (
    <div className="trash-view">
      <Trash2 size={46} strokeWidth={1.4} aria-hidden="true" />
      <h2>Recycle Bin kosong</h2>
      <p>Tidak ada berkas yang dibuang. Semua kenangan PROXY dirawat, bukan dihapus.</p>
      <footer><span>0 item</span><span>PROXY OS · sample drive</span></footer>
    </div>
  )
}

export function AppView({ appId, payload, onOpen }: { appId: AppId; payload?: WindowPayload; onOpen: (id: AppId, payload?: WindowPayload) => void }) {
  const views: Record<AppId, ReactNode> = {
    welcome: <WelcomeView />, members: <FileExplorer onOpen={onOpen} />, profile: <ProfileView memberId={payload?.memberId} open={onOpen} />, cvs: <CvsView open={onOpen} />, 'cv-viewer': <CvViewer memberId={payload?.memberId} />, memories: <MemoriesView />, about: <AboutView />, links: <LinksView />, trash: <TrashView />,
  }
  return views[appId]
}

export function MobileHeader({ title, onHome }: { title: string; onHome: () => void }) {
  return <header className="mobile-app-header"><button onClick={onHome}><Home size={19} /> Home</button><strong>{title}</strong><span /></header>
}
