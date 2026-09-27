import type { AppId, WindowGeometry, WindowPayload, WindowState } from '../types'

export interface WindowManagerState {
  windows: WindowState[]
  nextZ: number
}

export type WindowAction =
  | { type: 'OPEN'; appId: AppId; title: string; geometry: WindowGeometry; payload?: WindowPayload; id?: string }
  | { type: 'CLOSE'; id: string }
  | { type: 'FOCUS'; id: string }
  | { type: 'MINIMIZE'; id: string }
  | { type: 'TOGGLE_MAXIMIZE'; id: string }
  | { type: 'RESTORE'; id: string }
  | { type: 'MOVE'; id: string; x: number; y: number }
  | { type: 'RESIZE'; id: string; width: number; height: number }

export const initialWindowState: WindowManagerState = { windows: [], nextZ: 10 }

const focusWindow = (state: WindowManagerState, id: string): WindowManagerState => ({
  nextZ: state.nextZ + 1,
  windows: state.windows.map((window) => window.id === id ? { ...window, zIndex: state.nextZ, minimized: false } : window),
})

export function windowReducer(state: WindowManagerState, action: WindowAction): WindowManagerState {
  switch (action.type) {
    case 'OPEN': {
      const id = action.id ?? `${action.appId}-${action.payload?.memberId ?? 'main'}`
      const existing = state.windows.find((window) => window.id === id)
      if (existing) return focusWindow(state, id)
      return {
        nextZ: state.nextZ + 1,
        windows: [...state.windows, { id, appId: action.appId, title: action.title, ...action.geometry, minimized: false, maximized: false, zIndex: state.nextZ, payload: action.payload }],
      }
    }
    case 'CLOSE': return { ...state, windows: state.windows.filter((window) => window.id !== action.id) }
    case 'FOCUS': return focusWindow(state, action.id)
    case 'MINIMIZE': return { ...state, windows: state.windows.map((window) => window.id === action.id ? { ...window, minimized: true } : window) }
    case 'RESTORE': return focusWindow(state, action.id)
    case 'MOVE': return { ...state, windows: state.windows.map((window) => window.id === action.id ? { ...window, x: action.x, y: action.y } : window) }
    case 'RESIZE': return { ...state, windows: state.windows.map((window) => window.id === action.id ? { ...window, width: action.width, height: action.height } : window) }
    case 'TOGGLE_MAXIMIZE': return {
      ...state,
      windows: state.windows.map((window) => {
        if (window.id !== action.id) return window
        if (window.maximized && window.restoreGeometry) return { ...window, ...window.restoreGeometry, maximized: false, restoreGeometry: undefined }
        return { ...window, maximized: true, restoreGeometry: { x: window.x, y: window.y, width: window.width, height: window.height } }
      }),
    }
  }
}
