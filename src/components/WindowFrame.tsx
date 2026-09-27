import { Maximize2, Minus, Square, X } from 'lucide-react'
import { useRef, type PointerEvent, type ReactNode } from 'react'
import { useWindows } from '../app/WindowContext'
import type { WindowState } from '../types'

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
    <section className={`os-window ${item.maximized ? 'is-maximized' : ''}`} style={style} onPointerDown={() => focus(item.id)} role="dialog" aria-label={item.title}>
      <div className="window-titlebar" onPointerDown={onDrag} onPointerMove={onDragMove} onPointerUp={() => { dragStart.current = null }} onDoubleClick={() => toggleMaximize(item.id)}>
        <div className="traffic-lights" aria-hidden="true"><span className="red" /><span className="yellow" /><span className="green" /></div>
        <span className="window-title">{item.title}</span>
        <div className="window-actions">
          <button aria-label={`Minimalkan ${item.title}`} onClick={() => minimize(item.id)}><Minus size={15} /></button>
          <button aria-label={item.maximized ? `Pulihkan ${item.title}` : `Maksimalkan ${item.title}`} onClick={() => toggleMaximize(item.id)}>{item.maximized ? <Square size={13} /> : <Maximize2 size={14} />}</button>
          <button aria-label={`Tutup ${item.title}`} onClick={() => close(item.id)}><X size={16} /></button>
        </div>
      </div>
      <div className="window-content">{children}</div>
      {!item.maximized && (
        <button
          className="resize-handle"
          aria-label={`Ubah ukuran ${item.title}`}
          onPointerDown={onResize}
          onPointerMove={(event) => {
            if (!resizeStart.current) return
            resize(item.id, Math.max(360, resizeStart.current.width + event.clientX - resizeStart.current.px), Math.max(280, resizeStart.current.height + event.clientY - resizeStart.current.py))
          }}
          onPointerUp={() => { resizeStart.current = null }}
        />
      )}
    </section>
  )
}
