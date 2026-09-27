import { useState, useMemo } from 'react'
import { useWindows } from '../app/WindowContext'
import { useClock } from '../hooks/useClock'
import type { AppId } from '../types'
import { StartMenu } from './StartMenu'
import { QuickSettings } from './QuickSettings'
import {
  WindowsStartIcon,
  WinSearchIcon,
  WinTaskViewIcon,
  WinTeamsChatIcon,
  WinWeatherSunIcon,
  WinChevronTrayIcon,
  WinWifiTrayIcon,
  WinVolumeTrayIcon,
  WinBatteryTrayIcon,
  WinFileExplorerIcon,
  WinEdgeIcon,
  WinPhotosIcon,
  WinCvIcon,
  WinNotepadIcon,
  WinSettingsIcon,
  WinRecycleBinIcon,
} from './WindowsIcons'

export function Taskbar() {
  const { state, openApp, restore, minimize, focus } = useWindows()
  const [startOpen, setStartOpen] = useState(false)
  const [quickSettingsOpen, setQuickSettingsOpen] = useState(false)
  const now = useClock()

  const timeString = useMemo(() => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(now)
  }, [now])

  const dateString = useMemo(() => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
    }).format(now)
  }, [now])

  // Map app ID to corresponding Windows 11 icon
  const getAppIcon = (appId: AppId) => {
    switch (appId) {
      case 'members':
      case 'profile':
        return <WinFileExplorerIcon />
      case 'cvs':
      case 'cv-viewer':
        return <WinCvIcon />
      case 'memories':
        return <WinPhotosIcon />
      case 'welcome':
        return <WinNotepadIcon />
      case 'links':
        return <WinEdgeIcon />
      case 'about':
        return <WinSettingsIcon />
      case 'trash':
        return <WinRecycleBinIcon />
      default:
        return <WinFileExplorerIcon />
    }
  }

  // Pinned items on the Windows 11 taskbar
  const pinnedItems: { id: AppId; name: string; icon: JSX.Element }[] = [
    { id: 'members', name: 'File Explorer', icon: <WinFileExplorerIcon /> },
    { id: 'links', name: 'Microsoft Edge', icon: <WinEdgeIcon /> },
    { id: 'memories', name: 'Photos', icon: <WinPhotosIcon /> },
    { id: 'cvs', name: 'CV Viewer', icon: <WinCvIcon /> },
    { id: 'welcome', name: 'Notepad', icon: <WinNotepadIcon /> },
  ]

  // Running windows helper
  const maxZIndex = useMemo(() => {
    return state.windows.reduce((max, w) => (!w.minimized && w.zIndex > max ? w.zIndex : max), -1)
  }, [state.windows])

  return (
    <>
      <StartMenu
        isOpen={startOpen}
        onClose={() => setStartOpen(false)}
        onOpenApp={(appId, payload) => openApp(appId, payload)}
      />

      <QuickSettings
        isOpen={quickSettingsOpen}
        onClose={() => setQuickSettingsOpen(false)}
        onOpenApp={(appId, payload) => openApp(appId, payload)}
      />

      <footer className="win11-taskbar" aria-label="Taskbar Windows 11">
        {/* Left side: Weather widget capsule using official Windows 11 SVG sun */}
        <div className="win11-taskbar-left">
          <button
            className="win11-weather-widget"
            title="Cuaca: 24°C Cerah"
            aria-label="Informasi cuaca"
            onClick={() => openApp('about')}
          >
            <WinWeatherSunIcon />
            <div className="win11-weather-text">
              <span className="win11-weather-temp">24°C</span>
              <span className="win11-weather-desc">Sunny</span>
            </div>
          </button>
        </div>

        {/* Center: Windows 11 Centered App Icons */}
        <div className="win11-taskbar-center">
          {/* Windows Start Button with official gradient */}
          <button
            className={`win11-taskbar-icon win11-start-btn ${startOpen ? 'is-active' : ''}`}
            onClick={() => {
              setStartOpen((prev) => !prev)
              setQuickSettingsOpen(false)
            }}
            title="Start"
            aria-label="Start"
            aria-expanded={startOpen}
          >
            <WindowsStartIcon />
          </button>

          {/* Search Capsule Pill with official SVG search icon */}
          <button
            className="win11-search-pill"
            onClick={() => {
              setStartOpen(true)
              setQuickSettingsOpen(false)
            }}
            title="Search"
            aria-label="Search"
          >
            <WinSearchIcon />
            <span>Search</span>
          </button>

          {/* Task View */}
          <button
            className="win11-taskbar-icon"
            onClick={() => openApp('members')}
            title="Task View"
            aria-label="Task View"
          >
            <WinTaskViewIcon />
          </button>

          {/* Teams / Chat Icon from Windows 11 SVG */}
          <button
            className="win11-taskbar-icon"
            onClick={() => openApp('about')}
            title="Chat / Teams"
            aria-label="Chat"
          >
            <WinTeamsChatIcon />
          </button>

          {/* Pinned / Running Applications */}
          {pinnedItems.map((item) => {
            const runningWindows = state.windows.filter((w) => w.appId === item.id)
            const isRunning = runningWindows.length > 0
            const isFocused = runningWindows.some((w) => !w.minimized && w.zIndex === maxZIndex)
            const isMinimized = isRunning && runningWindows.every((w) => w.minimized)

            return (
              <button
                key={item.id}
                className={`win11-taskbar-icon ${isRunning ? 'is-running' : ''} ${isFocused ? 'is-focused' : ''}`}
                title={item.name}
                aria-label={item.name}
                onClick={() => {
                  if (!isRunning) {
                    openApp(item.id)
                  } else {
                    const topWin = runningWindows[0]
                    if (isFocused) {
                      minimize(topWin.id)
                    } else if (isMinimized) {
                      restore(topWin.id)
                      focus(topWin.id)
                    } else {
                      focus(topWin.id)
                    }
                  }
                }}
              >
                {item.icon}
                {isRunning && (
                  <span
                    className={`win11-taskbar-indicator ${isFocused ? 'is-active' : isMinimized ? 'is-min' : ''}`}
                  />
                )}
              </button>
            )
          })}

          {/* Any other open windows not among pinned items */}
          {state.windows
            .filter((w) => !pinnedItems.some((p) => p.id === w.appId))
            .map((win) => {
              const isFocused = !win.minimized && win.zIndex === maxZIndex
              return (
                <button
                  key={win.id}
                  className={`win11-taskbar-icon is-running ${isFocused ? 'is-focused' : ''}`}
                  title={win.title}
                  aria-label={win.title}
                  onClick={() => {
                    if (isFocused) {
                      minimize(win.id)
                    } else if (win.minimized) {
                      restore(win.id)
                      focus(win.id)
                    } else {
                      focus(win.id)
                    }
                  }}
                >
                  {getAppIcon(win.appId)}
                  <span
                    className={`win11-taskbar-indicator ${isFocused ? 'is-active' : win.minimized ? 'is-min' : ''}`}
                  />
                </button>
              )
            })}
        </div>

        {/* Right side: System Tray with official SVG icons */}
        <div className="win11-taskbar-right">
          <button className="win11-tray-btn" title="Show hidden icons" aria-label="Show hidden icons">
            <WinChevronTrayIcon />
          </button>

          {/* Quick Settings Action Cluster (Wi-Fi, Volume, Battery) */}
          <button
            className={`win11-status-cluster ${quickSettingsOpen ? 'is-active' : ''}`}
            title="Internet, Sound, Battery (Quick Settings)"
            aria-label="Quick Settings & Notifications"
            aria-expanded={quickSettingsOpen}
            onClick={() => {
              setQuickSettingsOpen((prev) => !prev)
              setStartOpen(false)
            }}
          >
            <WinWifiTrayIcon />
            <WinVolumeTrayIcon />
            <WinBatteryTrayIcon />
          </button>

          {/* Clock & Notification trigger */}
          <button
            className="win11-clock-btn"
            title={`${dateString} ${timeString} · Notifications`}
            aria-label="Clock and Notifications"
            onClick={() => {
              setQuickSettingsOpen((prev) => !prev)
              setStartOpen(false)
            }}
          >
            <span className="win11-clock-time">{timeString}</span>
            <span className="win11-clock-date">{dateString}</span>
          </button>

          {/* Show desktop vertical sliver */}
          <div
            className="win11-show-desktop"
            title="Show desktop"
            onClick={() => {
              state.windows.forEach((w) => {
                if (!w.minimized) minimize(w.id)
              })
            }}
          />
        </div>
      </footer>
    </>
  )
}

