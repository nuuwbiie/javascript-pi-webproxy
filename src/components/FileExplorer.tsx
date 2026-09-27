import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { quickLinks, resolvePath, type FsNode, type FsImageFile } from '../data/filesystem'
import { getMember } from '../data/members'
import type { AppId, WindowPayload } from '../types'
import { InitialPortrait } from './Portrait'
import {
  WinFileExplorerIcon,
  WinCvIcon,
  WinPhotosIcon,
  WinNotepadIcon,
} from './WindowsIcons'

/* ── Inline Windows 11 SVG icons (no lucide dependency) ── */
function ArrowLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function ArrowUpIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function ChevronRightIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function FolderPlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 7a2 2 0 012-2h3.17a2 2 0 011.42.59L10.83 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 11v4M10 13h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}
function ScissorsIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="6" cy="6" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
function CopyIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}
function Share2Icon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8.59 13.51l6.83 3.98M15.41 6.51L8.59 10.49" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}
function TrashIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 6h18M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
function SlidersIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8" cy="6" r="2" fill="currentColor" />
      <circle cx="16" cy="12" r="2" fill="currentColor" />
      <circle cx="10" cy="18" r="2" fill="currentColor" />
    </svg>
  )
}
function HomeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 12L12 3l9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 21V12h6v9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 10.5V21h14V10.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function HardDriveIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="14" width="20" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 18h.01M12 18h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M2 14L6.58 4.68A2 2 0 018.38 3.5h7.24a2 2 0 011.8 1.18L22 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
function InfoIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 16v-4M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
function Link2Icon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
function UserIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}


function ItemIcon({ node }: { node: FsNode }) {
  if (node.kind === 'folder') {
    return <WinFileExplorerIcon style={{ width: 38, height: 38 }} />
  }
  if (node.kind === 'image') {
    return <WinPhotosIcon style={{ width: 38, height: 38 }} />
  }
  if (node.badge === 'PDF') {
    return <WinCvIcon style={{ width: 38, height: 38 }} />
  }
  if (node.badge === 'TXT') {
    return <WinNotepadIcon style={{ width: 38, height: 38 }} />
  }
  const GenericIcon = node.appId === 'profile' ? UserIcon : node.appId === 'links' ? Link2Icon : node.appId === 'about' ? InfoIcon : WinNotepadIcon
  return (
    <span className="win11-fx-generic-icon">
      <GenericIcon />
      {node.badge && <span className="win11-fx-badge">{node.badge}</span>}
    </span>
  )
}

export function FileExplorer({ onOpen }: { onOpen: (id: AppId, payload?: WindowPayload) => void }) {
  const [path, setPath] = useState<string[]>([])
  const [history, setHistory] = useState<string[][]>([])
  const [selected, setSelected] = useState<string | null>(null)
  const [preview, setPreview] = useState<FsImageFile | null>(null)
  const [searchFilter, setSearchFilter] = useState('')
  const closeRef = useRef<HTMLButtonElement>(null)
  const coarse = useMemo(() => window.matchMedia('(pointer: coarse)').matches, [])
  const { folders, current } = useMemo(() => resolvePath(path), [path])

  useEffect(() => {
    if (!preview) return
    closeRef.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setPreview(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [preview])

  const navigate = (next: string[]) => {
    setHistory((stack) => [...stack, path])
    setPath(next)
    setSelected(null)
    setSearchFilter('')
  }

  const goBack = () => {
    setHistory((stack) => {
      if (stack.length === 0) return stack
      setPath(stack[stack.length - 1] ?? [])
      return stack.slice(0, -1)
    })
  }

  const goUp = () => {
    if (path.length > 0) navigate(path.slice(0, -1))
  }

  const activate = (node: FsNode) => {
    if (node.kind === 'folder') {
      navigate([...path, node.id])
    } else if (node.kind === 'image') {
      setSelected(node.id)
      setPreview(node)
    } else {
      setSelected(node.id)
      onOpen(node.appId, node.payload)
    }
  }

  const select = (node: FsNode) => {
    setSelected(node.id)
    if (coarse) activate(node)
  }

  const displayedChildren = useMemo(() => {
    if (!searchFilter.trim()) return current.children
    const q = searchFilter.toLowerCase()
    return current.children.filter((child) => child.name.toLowerCase().includes(q))
  }, [current.children, searchFilter])

  return (
    <div className="win11-file-explorer">
      {/* Windows 11 Command Bar */}
      <div className="win11-fx-commandbar">
        <button className="win11-cmd-btn win11-cmd-primary">
          <FolderPlusIcon />
          <span>New</span>
        </button>
        <div className="win11-cmd-divider" />
        <button className="win11-cmd-btn" title="Cut" disabled>
          <ScissorsIcon />
        </button>
        <button className="win11-cmd-btn" title="Copy" disabled>
          <CopyIcon />
        </button>
        <button className="win11-cmd-btn" title="Share" disabled>
          <Share2Icon />
        </button>
        <button className="win11-cmd-btn" title="Delete" disabled>
          <TrashIcon />
        </button>
        <div className="win11-cmd-divider" />
        <button className="win11-cmd-btn" title="Sort">
          <SlidersIcon />
          <span>Sort</span>
        </button>
      </div>

      {/* Navigation & Address Bar */}
      <div className="win11-fx-nav-row">
        <div className="win11-fx-nav-buttons">
          <button className="win11-nav-btn" onClick={goBack} disabled={history.length === 0} title="Back">
            <ArrowLeftIcon />
          </button>
          <button className="win11-nav-btn" onClick={goUp} disabled={path.length === 0} title="Up">
            <ArrowUpIcon />
          </button>
        </div>

        {/* Breadcrumb Path Bar */}
        <div className="win11-fx-address-bar">
          <button className="win11-addr-crumb win11-addr-root" onClick={() => navigate([])}>
            <HardDriveIcon />
            <span>This PC</span>
          </button>
          <ChevronRightIcon />
          <button className="win11-addr-crumb" onClick={() => navigate([])}>
            <span>PROXY (C:)</span>
          </button>
          {folders.map((folder, index) => (
            <Fragment key={folder.id}>
              <ChevronRightIcon />
              <button
                className={`win11-addr-crumb ${index === folders.length - 1 ? 'is-current' : ''}`}
                onClick={() => navigate(path.slice(0, index + 1))}
              >
                {folder.name}
              </button>
            </Fragment>
          ))}
        </div>

        {/* Explorer Search Input */}
        <div className="win11-fx-search-bar">
          <SearchIcon />
          <input
            type="text"
            placeholder={`Search ${current.name}`}
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
          />
        </div>
      </div>

      {/* Explorer Body: Sidebar + Main Grid */}
      <div className="win11-fx-body">
        {/* Left Navigation Tree */}
        <aside className="win11-fx-sidebar" aria-label="Navigation pane">
          <div className="win11-sidebar-section">
            <span className="win11-sidebar-title">Quick access</span>
            {quickLinks.map((link) => {
              const active = path.slice(0, link.path.length).join('/') === link.path.join('/')
              return (
                <button
                  key={link.label}
                  className={`win11-sidebar-item ${active ? 'is-active' : ''}`}
                  onClick={() => navigate(link.path)}
                >
                  <HomeIcon />
                  <span>{link.label}</span>
                </button>
              )
            })}
          </div>

          <div className="win11-sidebar-section">
            <span className="win11-sidebar-title">This PC</span>
            <button className={`win11-sidebar-item ${path.length === 0 ? 'is-active' : ''}`} onClick={() => navigate([])}>
              <HardDriveIcon />
              <span>Local Disk (C:)</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="win11-fx-content">
          <div className="win11-fx-grid" role="listbox" aria-label={`Folder ${current.name}`}>
            {displayedChildren.length === 0 ? (
              <div className="win11-fx-empty">Folder ini kosong</div>
            ) : (
              displayedChildren.map((node) => (
                <button
                  key={node.id}
                  role="option"
                  aria-selected={selected === node.id}
                  className={`win11-fx-item ${selected === node.id ? 'is-selected' : ''}`}
                  onClick={() => select(node)}
                  onDoubleClick={() => activate(node)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      event.preventDefault()
                      activate(node)
                    }
                  }}
                >
                  <div className="win11-fx-item-icon">
                    <ItemIcon node={node} />
                  </div>
                  <span className="win11-fx-item-label">{node.name}</span>
                </button>
              ))
            )}
          </div>

          {/* Windows 11 Status Bar */}
          <div className="win11-fx-statusbar">
            <span>{displayedChildren.length} items</span>
            {selected && <span>1 item selected</span>}
          </div>
        </div>
      </div>

      {/* Preview Modal for Images */}
      {preview && (
        <div className="win11-preview-modal" role="dialog" aria-modal="true" aria-label={preview.name}>
          <div className="win11-preview-window">
            <div className="win11-titlebar">
              <div className="win11-titlebar-lead">
                <WinPhotosIcon style={{ width: 16, height: 16 }} />
                <span>{preview.name} - Photos</span>
              </div>
              <div className="win11-caption-buttons">
                <button ref={closeRef} className="win11-caption-btn win11-close" onClick={() => setPreview(null)} aria-label="Close">
                  ✕
                </button>
              </div>
            </div>
            <div className="win11-preview-body">
              {preview.memberId ? (
                <div className="win11-preview-portrait">
                  <InitialPortrait member={getMember(preview.memberId)} large />
                </div>
              ) : (
                <img src={preview.src} alt={preview.alt} style={preview.position ? { objectPosition: preview.position } : undefined} />
              )}
              <div className="win11-preview-caption">
                <h3>{preview.name}</h3>
                <p>{preview.caption}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
