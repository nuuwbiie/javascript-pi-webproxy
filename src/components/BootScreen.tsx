import { useEffect, useState } from 'react'

export function BootScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(12)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onComplete()
      return
    }
    const steps = [35, 61, 82, 100]
    let index = 0
    const timer = window.setInterval(() => {
      setProgress(steps[index] ?? 100)
      index += 1
      if (index === steps.length) {
        window.clearInterval(timer)
        window.setTimeout(onComplete, 280)
      }
    }, 260)
    return () => window.clearInterval(timer)
  }, [onComplete])

  return (
    <section className="boot-screen" aria-label="PROXY OS sedang dimulai">
      <button className="boot-skip" onClick={onComplete}>Lewati</button>
      <div className="boot-terminal">
        <div className="boot-dots" aria-hidden="true"><span /><span /><span /></div>
        <p className="boot-version">v1.0.0</p>
        <h1>PROXY OS</h1>
        <p>Initializing connections...</p>
        <div className="boot-progress" aria-label={`Proses ${progress}%`}><span style={{ width: `${progress}%` }} /></div>
        <ul aria-live="polite">
          <li>&gt; Loading members <b>[OK]</b></li>
          <li>&gt; Connecting files <b>{progress > 55 ? '[OK]' : '[··]'}</b></li>
          <li>&gt; Preparing memories <b>{progress > 80 ? '[OK]' : '[··]'}</b></li>
        </ul>
        <p className="boot-welcome">{progress === 100 ? 'Welcome to PROXY OS!' : `${progress}%`}</p>
      </div>
    </section>
  )
}
