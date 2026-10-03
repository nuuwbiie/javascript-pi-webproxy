import type { Member } from '../types'

export function PlaceholderBadge() {
  return <span className="sample-badge">CONTOH · GANTI DATA</span>
}

export function InitialPortrait({ member, large = false }: { member: Member; large?: boolean }) {
  if (member.photo) {
    return (
      <img
        src={member.photo}
        alt={`Foto ${member.name}`}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block'
        }}
      />
    )
  }

  const initials = member.nickname.split(' ').map((part) => part[0]).join('').slice(0, 2)
  return (
    <div
      className={`initial-portrait ${large ? 'is-large' : ''}`}
      aria-label={`Placeholder foto ${member.nickname}`}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)',
        color: '#475569',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: '8px',
        boxSizing: 'border-box',
        minHeight: large ? '180px' : '60px'
      }}
    >
      <span style={{ fontSize: large ? '2rem' : '1.1rem', lineHeight: 1 }}>{initials}</span>
      <small style={{ fontSize: '0.65rem', marginTop: 4, opacity: 0.8, lineHeight: 1.2 }}>FOTO<br />BELUM<br />DIISI</small>
    </div>
  )
}
