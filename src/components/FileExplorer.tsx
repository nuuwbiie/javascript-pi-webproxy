import { ArrowLeft, ArrowUp, FileText, Folder, Home as HomeIcon, Image as ImageIcon, Info, Link2, User, X } from 'lucide-react'
import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { quickLinks, resolvePath, type FsNode } from '../data/filesystem'
import { getMember } from '../data/members'
import type { AppId, WindowPayload } from '../types'
import type { FsImageFile } from '../data/filesystem'
import { InitialPortrait } from './Portrait'

const folderColors: Record<string, string> = { yellow: '#e39c22', coral: '#e2604f', blue: '#2f79bb', lime: '#7ba32a', sky: '#3a9bd5' }

function ItemIcon({ node }: { node: FsNode }) {
  if (node.kind === 'folder') {
    return <span className="fx-icon is-folder" style={{ color: folderColors[node.tone] }} aria-hidden="true"><Folder /></span>
  }
  if (node.kind === 'image') {
    return <span className="fx-icon is-image" aria-hidden="true"><ImageIcon /></span>
  }
  const Icon = node.appId === 'profile' ? User : node.appId === 'links' ? Link2 : node.appId === 'about' ? Info : FileText
  const variant = node.badge === 'PDF' ? ' is-pdf' : node.badge === 'CARD' ? ' is-card' : node.badge === 'URL' ? ' is-url' : ''
  return <span className={`fx-icon${variant}`} data-badge={node.badge} aria-hidden="true"><Icon /></span>
}

export function FileExplorer({ onOpen }: { onOpen: (id: AppId, payload?: WindowPayload) => void }) {
  const [path, setPath] = useState<string[]>([])
  const [history, setHistory] = useState<string[][]>([])
  const [selected, setSelected] = useState<string | null>(null)
  const [preview, setPreview] = useState<FsImageFile | null>(null)
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
    if (node.kind === 'folder') navigate([...path, node.id])
    else if (node.kind === 'image') {
      setSelected(node.id)
      setPreview(node)
    } else {
      setSelected(node.id)
      onOpen(node.appId, node.payload)
    }
  }

  const select = (node: FsNode) => {
    setSelected(node.id)
    // Di layar sentuh satu ketukan langsung membuka; dengan mouse klik memilih, klik ganda membuka.
    if (coarse) activate(node)
  }

  return (
    <div className="file-explorer">
      <aside aria-label="Akses cepat">
        <span className="fx-side-label">Quick access</span>
        {quickLinks.map((link) => (
          <button
            key={link.label}
            className={path.slice(0, link.path.length).join('/') === link.path.join('/') ? 'is-active' : ''}
            onClick={() => navigate(link.path)}
          >
            <HomeIcon size={15} aria-hidden="true" />
            {link.label}
          </button>
        ))}
      </aside>
      <div className="fx-main">
        <div className="fx-toolbar">
          <button className="fx-nav" onClick={goBack} disabled={history.length === 0} aria-label="Mundur"><ArrowLeft size={17} /></button>
          <button className="fx-nav" onClick={goUp} disabled={path.length === 0} aria-label="Naik satu folder"><ArrowUp size={17} /></button>
          <nav className="fx-crumbs" aria-label="Lokasi folder">
            <button onClick={() => navigate([])}>Home</button>
            {folders.map((folder, index) => (
              <Fragment key={folder.id}>
                <span aria-hidden="true">›</span>
                <button onClick={() => navigate(path.slice(0, index + 1))}>{folder.name}</button>
              </Fragment>
            ))}
          </nav>
        </div>
        <div className="fx-grid" role="listbox" aria-label={`Isi folder ${current.name}`}>
          {current.children.map((node) => (
            <button
              key={node.id}
              role="option"
              aria-selected={selected === node.id}
              className={`fx-item ${selected === node.id ? 'is-selected' : ''}`}
              onClick={() => select(node)}
              onDoubleClick={() => activate(node)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault()
                  activate(node)
                }
              }}
            >
              <ItemIcon node={node} />
              <span className="fx-name">{node.name}</span>
            </button>
          ))}
        </div>
        <div className="fx-statusbar">
          <span>{current.children.length} item</span>
          <span>PROXY OS · sample drive</span>
        </div>
      </div>
      {preview && (
        <div className="fx-preview" role="dialog" aria-modal="true" aria-label={preview.name}>
          <button ref={closeRef} className="fx-preview-close" onClick={() => setPreview(null)} aria-label="Tutup pratinjau"><X /></button>
          <figure>
            {preview.memberId
              ? <div className="fx-preview-portrait"><InitialPortrait member={getMember(preview.memberId)} large /></div>
              : <img src={preview.src} alt={preview.alt} style={preview.position ? { objectPosition: preview.position } : undefined} />}
            <figcaption><h2>{preview.name}</h2><p>{preview.caption}</p></figcaption>
          </figure>
        </div>
      )}
    </div>
  )
}
