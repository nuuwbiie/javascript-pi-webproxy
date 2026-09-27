export type AppId = 'welcome' | 'members' | 'profile' | 'cvs' | 'cv-viewer' | 'memories' | 'about' | 'links' | 'trash'

export interface SocialLink {
  label: string
  url?: string
}

export interface Member {
  id: string
  name: string
  nickname: string
  role: string
  birthDate?: string
  hometown?: string
  bio: string
  interests: string[]
  socials: SocialLink[]
  photo?: string
  cv?: string
  isPlaceholder: boolean
}

export type MemoryCategory = 'Pekan Ilkomerz' | 'Behind the Scenes' | 'Our Team'

export interface MemoryItem {
  id: string
  title: string
  caption: string
  date?: string
  category: MemoryCategory
  src: string
  alt: string
  position: string
  isPlaceholder: boolean
}

export interface WindowPayload {
  memberId?: string
}

export interface WindowGeometry {
  x: number
  y: number
  width: number
  height: number
}

export interface WindowState extends WindowGeometry {
  id: string
  appId: AppId
  title: string
  minimized: boolean
  maximized: boolean
  zIndex: number
  payload?: WindowPayload
  restoreGeometry?: WindowGeometry
}
