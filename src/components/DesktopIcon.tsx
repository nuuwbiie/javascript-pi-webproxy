import type { LucideIcon } from 'lucide-react'
import { useMemo, useRef, useState } from 'react'

interface Props {
  label: string
  icon: LucideIcon
  tone: string
  onOpen: () => void
}

export function DesktopIcon({ label, icon: Icon, tone, onOpen }: Props) {
  const [selected, setSelected] = useState(false)
  const clickTimer = useRef<number | undefined>(undefined)
  const coarse = useMemo(() => window.matchMedia('(pointer: coarse)').matches, [])

  return (
    <button
      className={`desktop-icon ${selected ? 'is-selected' : ''}`}
      onClick={() => {
        // Di layar sentuh satu ketukan langsung membuka; dengan mouse tetap klik-ganda seperti desktop sungguhan.
        if (coarse) {
          onOpen()
          return
        }
        window.clearTimeout(clickTimer.current)
        setSelected(true)
        clickTimer.current = window.setTimeout(() => setSelected(false), 1400)
      }}
      onDoubleClick={onOpen}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onOpen()
        }
      }}
      aria-label={`Buka ${label}`}
    >
      <span className={`app-object tone-${tone}`} aria-hidden="true"><Icon size={31} strokeWidth={1.8} /></span>
      <span className="desktop-icon-label">{label}</span>
    </button>
  )
}
