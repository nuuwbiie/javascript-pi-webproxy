import { BookOpen, ExternalLink, FileText, Folder, Images, Info, Trash2 } from 'lucide-react'
import type { AppId } from '../types'

export const appRegistry: Record<Exclude<AppId, 'profile' | 'cv-viewer'>, { label: string; shortLabel: string; icon: typeof Folder; tone: string }> = {
  welcome: { label: 'Welcome.txt', shortLabel: 'Welcome', icon: BookOpen, tone: 'cream' },
  members: { label: 'File Explorer', shortLabel: 'Explorer', icon: Folder, tone: 'yellow' },
  cvs: { label: 'CVs', shortLabel: 'CVs', icon: FileText, tone: 'blue' },
  memories: { label: 'Memories', shortLabel: 'Memories', icon: Images, tone: 'coral' },
  about: { label: 'About PROXY', shortLabel: 'About', icon: Info, tone: 'lime' },
  links: { label: 'Links', shortLabel: 'Links', icon: ExternalLink, tone: 'sky' },
  trash: { label: 'Recycle Bin', shortLabel: 'Recycle', icon: Trash2, tone: 'sky' },
}

export const desktopApps = ['members', 'cvs', 'memories', 'about', 'links', 'trash'] as const
