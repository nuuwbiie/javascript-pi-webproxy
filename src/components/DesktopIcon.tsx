import { useMemo, useRef, useState, type ReactNode } from 'react'

interface Props {
  label: string
  icon: ReactNode
  onOpen: () => void
}

export function DesktopIcon({ label, icon, onOpen }: Props) {
  const [selected, setSelected] = useState(false)
  const clickTimer = useRef<number | undefined>(undefined)
  const coarse = useMemo(() => window.matchMedia('(pointer: coarse)').matches, [])

  return (
    <button
      className={`win11-desktop-icon ${selected ? 'is-selected' : ''}`}
      onClick={() => {
        if (coarse) {
          onOpen()
          return
        }
        window.clearTimeout(clickTimer.current)
        setSelected(true)
        clickTimer.current = window.setTimeout(() => setSelected(false), 2000)
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
      <div className="win11-desktop-icon-img" aria-hidden="true">
        {icon}
      </div>
      <span className="win11-desktop-icon-label">{label}</span>
    </button>
  )
}
