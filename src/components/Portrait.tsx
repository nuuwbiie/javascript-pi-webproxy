import type { Member } from '../types'

export function PlaceholderBadge() {
  return <span className="sample-badge">CONTOH · GANTI DATA</span>
}

export function InitialPortrait({ member, large = false }: { member: Member; large?: boolean }) {
  const initials = member.nickname.split(' ').map((part) => part[0]).join('').slice(0, 2)
  return (
    <div className={`initial-portrait ${large ? 'is-large' : ''}`} aria-label={`Placeholder foto ${member.nickname}`}>
      <span>{initials}</span><small>FOTO<br />BELUM<br />DIISI</small>
    </div>
  )
}
