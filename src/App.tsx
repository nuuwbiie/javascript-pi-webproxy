/*
IMPECCABLE DIRECTION CONTRACT
WORLD: A sunlit campus yearbook transformed into an original friendly operating system.
MODE: Experience — visitors discover people and memories by using the artifact itself.
FIRST VIEWPORT: full-screen authored desktop, blue-sky campus wallpaper, real application chrome, open welcome and photo-board windows, tactile file objects, no marketing hero.
SIGNATURE: windows become a composable yearbook on desktop; on phones the same content offers two deliberate shells — a desktop OS look-alike and a readable home screen — switchable at any time.
MOTION: one brief boot, crisp window state changes, restrained overlay fades; reduced-motion bypasses timing.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
*/
import { useCallback, useEffect, useState } from 'react'
import { WindowProvider } from './app/WindowContext'
import { BootScreen } from './components/BootScreen'
import { Desktop } from './components/Desktop'
import { MobileHome } from './components/MobileHome'

type ViewPreference = 'mobile' | 'desktop'

const VIEW_KEY = 'proxy-os-view'

const readViewPreference = (): ViewPreference => {
  try {
    return localStorage.getItem(VIEW_KEY) === 'desktop' ? 'desktop' : 'mobile'
  } catch {
    return 'mobile'
  }
}

const writeViewPreference = (preference: ViewPreference) => {
  try {
    localStorage.setItem(VIEW_KEY, preference)
  } catch {
    // Penyimpanan tidak tersedia (mis. mode privat) — pilihan hanya berlaku untuk sesi ini.
  }
}

function useIsMobile() {
  // Layar sempit ATAU pendek (ponsel landscape, jendela kecil) dianggap mobile sehingga
  // pengguna selalu bisa memilih antara tampilan HP dan tampilan desktop.
  const query = '(max-width: 767px), (max-height: 540px)'
  const [mobile, setMobile] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const media = window.matchMedia(query)
    const update = () => setMobile(media.matches)
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])
  return mobile
}

export function App() {
  const mobile = useIsMobile()
  const [viewPreference, setViewPreference] = useState<ViewPreference>(readViewPreference)
  const [booting, setBooting] = useState(() => sessionStorage.getItem('proxy-os-booted') !== 'yes')
  const switchView = useCallback((preference: ViewPreference) => {
    writeViewPreference(preference)
    setViewPreference(preference)
  }, [])
  const finishBoot = useCallback(() => {
    sessionStorage.setItem('proxy-os-booted', 'yes')
    setBooting(false)
  }, [])

  if (booting) return <BootScreen onComplete={finishBoot} />
  // Di layar lebar selalu tampilan desktop; di layar kecil ikuti pilihan pengguna (default: mode HP yang mudah dibaca).
  if (!mobile || viewPreference === 'desktop') {
    return <WindowProvider><Desktop onSwitchView={mobile ? () => switchView('mobile') : undefined} /></WindowProvider>
  }
  return <MobileHome onSwitchView={() => switchView('desktop')} />
}
