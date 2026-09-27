import { useEffect, useState } from 'react'
import { WindowsStartIcon } from './WindowsIcons'

export function BootScreen({ onComplete }: { onComplete: () => void }) {
  const [bootText, setBootText] = useState('Starting Windows...')

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onComplete()
      return
    }

    const t1 = window.setTimeout(() => setBootText('Loading PROXY OS...'), 700)
    const t2 = window.setTimeout(() => setBootText('Connecting 12 Members & PJK...'), 1400)
    const t3 = window.setTimeout(() => setBootText('Welcome'), 2000)
    const t4 = window.setTimeout(onComplete, 2400)

    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
      window.clearTimeout(t3)
      window.clearTimeout(t4)
    }
  }, [onComplete])

  return (
    <section className="win11-boot-screen" aria-label="Windows 11 booting">
      <button className="win11-boot-skip" onClick={onComplete}>
        Skip
      </button>

      <div className="win11-boot-center">
        {/* Windows 11 Official Blue Logo */}
        <div className="win11-boot-logo">
          <WindowsStartIcon style={{ width: 84, height: 84 }} />
        </div>

        {/* Windows 11 Orbiting Dots Ring */}
        <div className="win11-spinner" aria-hidden="true">
          <div className="win11-spinner-dot" />
          <div className="win11-spinner-dot" />
          <div className="win11-spinner-dot" />
          <div className="win11-spinner-dot" />
          <div className="win11-spinner-dot" />
        </div>

        <p className="win11-boot-text">{bootText}</p>
      </div>
    </section>
  )
}
