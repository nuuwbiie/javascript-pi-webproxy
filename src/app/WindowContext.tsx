import { createContext, useContext, useMemo, useReducer, type ReactNode } from 'react'
import { getMember } from '../data/members'
import { initialWindowState, windowReducer } from '../lib/windowManager'
import type { AppId, WindowGeometry, WindowPayload } from '../types'

interface WindowContextValue {
  state: typeof initialWindowState
  openApp: (appId: AppId, payload?: WindowPayload) => void
  close: (id: string) => void
  focus: (id: string) => void
  minimize: (id: string) => void
  toggleMaximize: (id: string) => void
  restore: (id: string) => void
  move: (id: string, x: number, y: number) => void
  resize: (id: string, width: number, height: number) => void
}

const WindowContext = createContext<WindowContextValue | null>(null)

const defaults: Record<AppId, { title: string; geometry: WindowGeometry }> = {
  welcome: { title: 'Welcome.txt', geometry: { x: 126, y: 84, width: 405, height: 415 } },
  members: { title: 'File Explorer', geometry: { x: 170, y: 92, width: 700, height: 530 } },
  profile: { title: 'Profile', geometry: { x: 365, y: 105, width: 680, height: 500 } },
  cvs: { title: 'CVs', geometry: { x: 240, y: 105, width: 650, height: 480 } },
  'cv-viewer': { title: 'CV Viewer', geometry: { x: 425, y: 72, width: 700, height: 570 } },
  memories: { title: 'Memories', geometry: { x: 310, y: 72, width: 790, height: 570 } },
  about: { title: 'About PROXY', geometry: { x: 350, y: 115, width: 590, height: 450 } },
  links: { title: 'Links', geometry: { x: 420, y: 115, width: 540, height: 440 } },
  trash: { title: 'Recycle Bin', geometry: { x: 210, y: 150, width: 430, height: 330 } },
}

// Jaga agar setiap window selalu muat di viewport: taskbar (52px) tidak pernah tertutup
// dan di layar sempit window dibuka hampir layar penuh agar tetap terbaca.
const clampGeometry = (geometry: WindowGeometry): WindowGeometry => {
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight
  if (viewportWidth < 768) return { x: 6, y: 6, width: viewportWidth - 12, height: viewportHeight - 64 }
  const width = Math.min(geometry.width, viewportWidth - 24)
  const height = Math.min(geometry.height, viewportHeight - 84)
  return {
    width,
    height,
    x: Math.min(Math.max(8, geometry.x), Math.max(8, viewportWidth - width - 8)),
    y: Math.min(Math.max(8, geometry.y), Math.max(8, viewportHeight - height - 76)),
  }
}

export function WindowProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(windowReducer, initialWindowState)

  const value = useMemo<WindowContextValue>(() => ({
    state,
    openApp(appId, payload) {
      const config = defaults[appId]
      const member = payload?.memberId ? getMember(payload.memberId) : undefined
      const title = appId === 'profile' ? (member?.name ?? 'Profile') : appId === 'cv-viewer' ? `${member?.nickname ?? 'Member'}_cv.pdf` : config.title
      dispatch({ type: 'OPEN', appId, title, geometry: clampGeometry(config.geometry), payload })
    },
    close: (id) => dispatch({ type: 'CLOSE', id }),
    focus: (id) => dispatch({ type: 'FOCUS', id }),
    minimize: (id) => dispatch({ type: 'MINIMIZE', id }),
    toggleMaximize: (id) => dispatch({ type: 'TOGGLE_MAXIMIZE', id }),
    restore: (id) => dispatch({ type: 'RESTORE', id }),
    move: (id, x, y) => dispatch({ type: 'MOVE', id, x, y }),
    resize: (id, width, height) => dispatch({ type: 'RESIZE', id, width, height }),
  }), [state])

  return <WindowContext.Provider value={value}>{children}</WindowContext.Provider>
}

export function useWindows() {
  const context = useContext(WindowContext)
  if (!context) throw new Error('useWindows must be used inside WindowProvider')
  return context
}
