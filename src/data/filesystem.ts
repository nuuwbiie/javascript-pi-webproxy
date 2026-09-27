import type { AppId, MemoryItem, WindowPayload } from '../types'
import { members } from './members'
import { memories } from './memories'

// Sistem berkas virtual agar File Explorer bisa menelusuri folder di dalam folder.
export interface FsFolder {
  kind: 'folder'
  id: string
  name: string
  tone: 'yellow' | 'coral' | 'blue' | 'lime' | 'sky'
  children: FsNode[]
}

export interface FsAppFile {
  kind: 'app'
  id: string
  name: string
  badge?: 'PDF' | 'TXT' | 'URL' | 'CARD'
  appId: AppId
  payload?: WindowPayload
}

export interface FsImageFile {
  kind: 'image'
  id: string
  name: string
  src?: string
  alt: string
  position?: string
  caption: string
  memberId?: string
}

export type FsNode = FsFolder | FsAppFile | FsImageFile

const slug = (value: string) => value.toLowerCase().replaceAll(' ', '-')

const cvFile = (memberId: string, nickname: string): FsAppFile => ({
  kind: 'app',
  id: `cv-${memberId}`,
  name: `${slug(nickname)}_cv.pdf`,
  badge: 'PDF',
  appId: 'cv-viewer',
  payload: { memberId },
})

const memberPhoto = (memberId: string): FsImageFile => ({
  kind: 'image',
  id: `photo-${memberId}`,
  name: 'foto.png',
  memberId,
  alt: 'Placeholder foto anggota',
  caption: 'Foto profil belum diisi — ganti saat data asli sudah siap.',
})

const memoryFile = (memory: MemoryItem): FsImageFile => ({
  kind: 'image',
  id: `mem-${memory.id}`,
  name: `${slug(memory.title)}.png`,
  src: memory.src,
  alt: memory.alt,
  position: memory.position,
  caption: memory.caption,
})

const memberFolders: FsFolder[] = members.map((member) => ({
  kind: 'folder',
  id: `member-${member.id}`,
  name: member.nickname,
  tone: 'blue',
  children: [
    { kind: 'app', id: `profile-${member.id}`, name: 'profil.card', badge: 'CARD', appId: 'profile', payload: { memberId: member.id } },
    cvFile(member.id, member.nickname),
    memberPhoto(member.id),
  ],
}))

const memoryFolders: FsFolder[] = (['Pekan Ilkomerz', 'Behind the Scenes', 'Our Team'] as const).map((category) => ({
  kind: 'folder',
  id: `memcat-${slug(category)}`,
  name: category,
  tone: 'coral',
  children: memories.filter((memory) => memory.category === category).map(memoryFile),
}))

export const fileSystem: FsFolder = {
  kind: 'folder',
  id: 'home',
  name: 'Home',
  tone: 'sky',
  children: [
    { kind: 'folder', id: 'members', name: 'Members', tone: 'yellow', children: memberFolders },
    { kind: 'folder', id: 'memories', name: 'Memories', tone: 'coral', children: memoryFolders },
    { kind: 'folder', id: 'cvs', name: 'CVs', tone: 'blue', children: members.map((member) => cvFile(member.id, member.nickname)) },
    {
      kind: 'folder',
      id: 'documents',
      name: 'Documents',
      tone: 'lime',
      children: [
        { kind: 'app', id: 'doc-welcome', name: 'Welcome.txt', badge: 'TXT', appId: 'welcome' },
        { kind: 'app', id: 'doc-about', name: 'About PROXY.txt', badge: 'TXT', appId: 'about' },
        { kind: 'app', id: 'doc-links', name: 'Links.url', badge: 'URL', appId: 'links' },
      ],
    },
    {
      kind: 'folder',
      id: 'desktop-folder',
      name: 'Desktop',
      tone: 'sky',
      children: [
        { kind: 'image', id: 'img-wallpaper', name: 'proxy-campus.png', src: '/proxy-campus.png', alt: 'Wallpaper kampus PROXY OS', position: '50% 60%', caption: 'Wallpaper bawaan PROXY OS.' },
        { kind: 'image', id: 'img-proxy', name: 'proxy.jpg', src: '/proxy-campus.png', alt: 'Foto papan tahunan PROXY', position: '50% 40%', caption: 'Foto utama papan tahunan.' },
      ],
    },
  ],
}

export const quickLinks: { label: string; path: string[] }[] = [
  { label: 'Home', path: [] },
  { label: 'Members', path: ['members'] },
  { label: 'Memories', path: ['memories'] },
  { label: 'CVs', path: ['cvs'] },
  { label: 'Documents', path: ['documents'] },
  { label: 'Desktop', path: ['desktop-folder'] },
]

export function resolvePath(path: string[]): { folders: FsFolder[]; current: FsFolder } {
  const folders: FsFolder[] = []
  let current = fileSystem
  for (const id of path) {
    const next = current.children.find((child): child is FsFolder => child.kind === 'folder' && child.id === id)
    if (!next) break
    folders.push(next)
    current = next
  }
  return { folders, current }
}
