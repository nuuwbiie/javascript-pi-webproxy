import { useRef, type PointerEvent, type ReactNode } from 'react'
import { useWindows } from '../app/WindowContext'
import type { WindowState, AppId } from '../types'
import {
  WinFileExplorerIcon,
  WinCvIcon,
  WinPhotosIcon,
  WinNotepadIcon,
  WinEdgeIcon,
  WinSettingsIcon,
  WinRecycleBinIcon,
} from './WindowsIcons'

// Helper to render mini icon in titlebar
function getTitleIcon(appId: AppId) {
  switch (appId) {
    case 'members':
    case 'profile':
      return <WinFileExplorerIcon style={{ width: 16, height: 16 }} />
    case 'cvs':
    case 'cv-viewer':
      return <WinCvIcon style={{ width: 16, height: 16 }} />
    case 'memories':
      return <WinPhotosIcon style={{ width: 16, height: 16 }} />
    case 'welcome':
      return <WinNotepadIcon style={{ width: 16, height: 16 }} />
    case 'links':
      return <WinEdgeIcon style={{ width: 16, height: 16 }} />
    case 'about':
      return <WinSettingsIcon style={{ width: 16, height: 16 }} />
    case 'trash':
      return <WinRecycleBinIcon style={{ width: 16, height: 16 }} />
    default:
      return <WinFileExplorerIcon style={{ width: 16, height: 16 }} />
  }
}

export function WindowFrame({ window: item, children }: { window: WindowState; children: ReactNode }) {
  const { close, focus, minimize, move, resize, toggleMaximize } = useWindows()
  const dragStart = useRef<{ px: number; py: number; x: number; y: number } | null>(null)
  const resizeStart = useRef<{ px: number; py: number; width: number; height: number } | null>(null)

  const onDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (item.maximized || (event.target as HTMLElement).closest('button')) return
    dragStart.current = { px: event.clientX, py: event.clientY, x: item.x, y: item.y }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const onDragMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragStart.current) return
    const workspaceWidth = event.currentTarget.closest('.desktop')?.clientWidth ?? globalThis.window.innerWidth
    const x = Math.max(0, Math.min(workspaceWidth - 180, dragStart.current.x + event.clientX - dragStart.current.px))
    const y = Math.max(0, dragStart.current.y + event.clientY - dragStart.current.py)
    move(item.id, x, y)
  }

  const onResize = (event: PointerEvent<HTMLButtonElement>) => {
    resizeStart.current = { px: event.clientX, py: event.clientY, width: item.width, height: item.height }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const style = item.maximized
    ? { zIndex: item.zIndex }
    : { left: item.x, top: item.y, width: item.width, height: item.height, zIndex: item.zIndex }

  if (item.minimized) return null

  return (
    <section
      className={`win11-window os-window ${item.maximized ? 'is-maximized' : ''}`}
      style={style}
      onPointerDown={() => focus(item.id)}
      role="dialog"
      aria-label={item.title}
    >
      {/* Windows 11 Titlebar */}
      <div
        className="win11-titlebar"
        onPointerDown={onDrag}
        onPointerMove={onDragMove}
        onPointerUp={() => { dragStart.current = null }}
        onDoubleClick={() => toggleMaximize(item.id)}
      >
        <div className="win11-titlebar-lead">
          <span className="win11-titlebar-icon" aria-hidden="true">
            {getTitleIcon(item.appId)}
          </span>
          <span className="win11-titlebar-title">{item.title}</span>
        </div>

        <div className="win11-caption-buttons">
          <button
            className="win11-caption-btn win11-minimize"
            aria-label={`Minimalkan ${item.title}`}
            onClick={(e) => {
              e.stopPropagation()
              minimize(item.id)
            }}
          >
            <svg width="10" height="1" viewBox="0 0 10 1"><path fill="currentColor" d="M0 0h10v1H0z" /></svg>
          </button>

          <button
            className="win11-caption-btn win11-maximize"
            aria-label={item.maximized ? `Pulihkan ${item.title}` : `Maksimalkan ${item.title}`}
            onClick={(e) => {
              e.stopPropagation()
              toggleMaximize(item.id)
            }}
          >
            {item.maximized ? (
              /* Restore symbol: two overlapping squares */
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2.5 1.5h6v6h-1.5v-4.5H2.5v-1.5z" fill="currentColor" />
                <rect x="1.5" y="3.5" width="5.5" height="5.5" stroke="currentColor" strokeWidth="1" />
              </svg>
            ) : (
              /* Maximize symbol: single square */
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <rect x="1.5" y="1.5" width="7" height="7" stroke="currentColor" strokeWidth="1" />
              </svg>
            )}
          </button>

          <button
            className="win11-caption-btn win11-close"
            aria-label={`Tutup ${item.title}`}
            onClick={(e) => {
              e.stopPropagation()
              close(item.id)
            }}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      <div className="win11-window-content window-content">{children}</div>

      {!item.maximized && (
        <button
          className="resize-handle win11-resize-handle"
          aria-label={`Ubah ukuran ${item.title}`}
          onPointerDown={onResize}
          onPointerMove={(event) => {
            if (!resizeStart.current) return
            resize(
              item.id,
              Math.max(380, resizeStart.current.width + event.clientX - resizeStart.current.px),
              Math.max(280, resizeStart.current.height + event.clientY - resizeStart.current.py)
            )
          }}
          onPointerUp={() => { resizeStart.current = null }}
        />
      )}
    </section>
  )
}
