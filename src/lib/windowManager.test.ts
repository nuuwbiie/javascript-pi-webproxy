import { describe, expect, it } from 'vitest'
import { initialWindowState, windowReducer } from './windowManager'

const geometry = { x: 40, y: 40, width: 500, height: 400 }

describe('windowReducer', () => {
  it('opens and focuses an application only once', () => {
    const opened = windowReducer(initialWindowState, { type: 'OPEN', appId: 'members', title: 'Members', geometry })
    const reopened = windowReducer(opened, { type: 'OPEN', appId: 'members', title: 'Members', geometry })
    expect(reopened.windows).toHaveLength(1)
    expect(reopened.windows[0].zIndex).toBeGreaterThan(opened.windows[0].zIndex)
  })

  it('minimizes and restores a window', () => {
    const opened = windowReducer(initialWindowState, { type: 'OPEN', appId: 'about', title: 'About', geometry })
    const minimized = windowReducer(opened, { type: 'MINIMIZE', id: 'about-main' })
    expect(minimized.windows[0].minimized).toBe(true)
    expect(windowReducer(minimized, { type: 'RESTORE', id: 'about-main' }).windows[0].minimized).toBe(false)
  })

  it('opens member profiles with distinct payload ids and closes one', () => {
    let state = windowReducer(initialWindowState, { type: 'OPEN', appId: 'profile', title: 'Member 01', geometry, payload: { memberId: '01' } })
    state = windowReducer(state, { type: 'OPEN', appId: 'profile', title: 'Member 02', geometry, payload: { memberId: '02' } })
    expect(state.windows).toHaveLength(2)
    state = windowReducer(state, { type: 'CLOSE', id: 'profile-01' })
    expect(state.windows.map((window) => window.id)).toEqual(['profile-02'])
  })

  it('maximizes and restores previous geometry', () => {
    const opened = windowReducer(initialWindowState, { type: 'OPEN', appId: 'cvs', title: 'CVs', geometry })
    const maxed = windowReducer(opened, { type: 'TOGGLE_MAXIMIZE', id: 'cvs-main' })
    const restored = windowReducer(maxed, { type: 'TOGGLE_MAXIMIZE', id: 'cvs-main' })
    expect(maxed.windows[0].maximized).toBe(true)
    expect(restored.windows[0]).toMatchObject({ ...geometry, maximized: false })
  })
})
