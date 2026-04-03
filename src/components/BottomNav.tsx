
type Tab = 'dash' | 'results' | 'innov' | 'config'

interface BottomNavProps {
  active: Tab
  onChange: (tab: Tab) => void
}

const DashIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="8" height="8" rx="1.5" fill={active ? '#001932' : '#6b7a9a'} />
    <rect x="13" y="3" width="8" height="8" rx="1.5" fill={active ? '#001932' : '#6b7a9a'} />
    <rect x="3" y="13" width="8" height="8" rx="1.5" fill={active ? '#001932' : '#6b7a9a'} />
    <rect x="13" y="13" width="8" height="8" rx="1.5" fill={active ? '#001932' : '#6b7a9a'} />
  </svg>
)

const BarChartIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="12" width="4" height="9" rx="1" fill={active ? '#b80068' : '#6b7a9a'} />
    <rect x="10" y="7" width="4" height="14" rx="1" fill={active ? '#b80068' : '#6b7a9a'} />
    <rect x="17" y="3" width="4" height="18" rx="1" fill={active ? '#b80068' : '#6b7a9a'} />
  </svg>
)

const InnovIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="3" fill={active ? '#001932' : '#6b7a9a'} />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5.636 5.636l2.121 2.121M16.243 16.243l2.121 2.121M5.636 18.364l2.121-2.121M16.243 7.757l2.121-2.121" stroke={active ? '#001932' : '#6b7a9a'} strokeWidth="2" strokeLinecap="round" />
  </svg>
)

const ConfigIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" stroke={active ? '#001932' : '#6b7a9a'} strokeWidth="2" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke={active ? '#001932' : '#6b7a9a'} strokeWidth="2" />
  </svg>
)

const tabs: { id: Tab; label: string }[] = [
  { id: 'dash', label: 'ACCUEIL' },
  { id: 'results', label: 'RÉSULTATS' },
  { id: 'innov', label: 'INNOV' },
  { id: 'config', label: 'CONFIG' },
]

export default function BottomNav({ active, onChange }: BottomNavProps) {
  return (
    <nav
      className="sticky bottom-0 z-40 flex items-center justify-around border-t border-[#bfc8e0]/30 bg-white/80 backdrop-blur-[20px] py-2"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === active
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className="flex flex-col items-center gap-0.5 px-4 py-1 focus:outline-none"
          >
            {tab.id === 'dash' && <DashIcon active={isActive} />}
            {tab.id === 'results' && <BarChartIcon active={isActive} />}
            {tab.id === 'innov' && <InnovIcon active={isActive} />}
            {tab.id === 'config' && <ConfigIcon active={isActive} />}
            <span
              className="text-[9px] font-bold tracking-[0.12em] uppercase"
              style={{ color: isActive ? (tab.id === 'results' ? '#b80068' : '#001932') : '#6b7a9a' }}
            >
              {tab.label}
            </span>
            {isActive && (
              <div
                className="h-0.5 w-6 rounded-full mt-0.5"
                style={{ background: tab.id === 'results' ? '#b80068' : '#001932' }}
              />
            )}
          </button>
        )
      })}
    </nav>
  )
}
