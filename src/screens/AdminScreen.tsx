import { useState } from 'react'

type NavItem = 'dashboard' | 'innovations' | 'analytics' | 'settings'

const innovations = [
  {
    id: 1,
    tag: 'LIVE INNOVATION',
    title: 'Rail Energy Recovery System',
    subtitle: 'Kinetic energy harvesting for urban metro lines',
    rank: 'RANK #1',
    img: 'dark',
  },
  {
    id: 2,
    tag: 'LIVE INNOVATION',
    title: 'HubConnect Platform',
    subtitle: 'Digital passenger flow optimization',
    rank: 'RANK #2',
    img: 'mid',
  },
  {
    id: 3,
    tag: 'LIVE INNOVATION',
    title: 'SolarTrack Infrastructure',
    subtitle: 'Photovoltaic rail corridor integration',
    rank: 'RANK #3',
    img: 'light',
  },
]

function InnovCard({ item }: { item: typeof innovations[0] }) {
  const bgMap: Record<string, string> = {
    dark: '#001932',
    mid: '#002a52',
    light: '#1a3a5c',
  }
  return (
    <div
      className="rounded-lg overflow-hidden mb-4"
      style={{ background: '#ffffff', boxShadow: '0 2px 12px rgba(0,25,50,0.06)' }}
    >
      {/* Image placeholder */}
      <div
        className="w-full flex items-end p-3"
        style={{ height: 100, background: bgMap[item.img] }}
      >
        <span
          className="text-[9px] font-bold tracking-[0.14em] uppercase px-2 py-1 rounded"
          style={{ background: 'rgba(74,144,217,0.3)', color: '#a4c8e1' }}
        >
          {item.tag}
        </span>
      </div>
      <div className="p-3 flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-bold text-[#001932] leading-snug">{item.title}</p>
          <p className="text-xs text-[#415172] mt-0.5">{item.subtitle}</p>
        </div>
        <span
          className="text-[9px] font-bold tracking-[0.1em] uppercase flex-shrink-0 mt-0.5"
          style={{ color: '#b80068' }}
        >
          {item.rank}
        </span>
      </div>
    </div>
  )
}

function Sidebar({ active, onChange }: { active: NavItem; onChange: (n: NavItem) => void }) {
  const items: { id: NavItem; label: string; icon: React.ReactNode }[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
          <rect x="1" y="1" width="6" height="6" rx="1" />
          <rect x="9" y="1" width="6" height="6" rx="1" />
          <rect x="1" y="9" width="6" height="6" rx="1" />
          <rect x="9" y="9" width="6" height="6" rx="1" />
        </svg>
      ),
    },
    {
      id: 'innovations',
      label: 'Innovations',
      icon: (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
          <circle cx="8" cy="8" r="3" />
          <path d="M8 1v2M8 13v2M1 8h2M13 8h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
          <rect x="1" y="9" width="3" height="6" rx="1" />
          <rect x="6" y="5" width="3" height="10" rx="1" />
          <rect x="11" y="1" width="3" height="14" rx="1" />
        </svg>
      ),
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
          <circle cx="8" cy="8" r="2.5" />
          <path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3.05 3.05l1.06 1.06M11.89 11.89l1.06 1.06M3.05 12.95l1.06-1.06M11.89 4.11l1.06-1.06" strokeLinecap="round" />
        </svg>
      ),
    },
  ]

  return (
    <div
      className="flex flex-col w-[130px] flex-shrink-0 border-r"
      style={{ borderColor: 'rgba(191,200,224,0.3)', background: '#ffffff' }}
    >
      {/* Brand */}
      <div className="px-4 pt-5 pb-4 border-b" style={{ borderColor: 'rgba(191,200,224,0.3)' }}>
        <div className="text-[9px] font-black tracking-[0.14em] uppercase text-[#415172]">Admin</div>
        <div className="text-sm font-black text-[#001932]">Panel</div>
      </div>

      {/* Nav items */}
      <nav className="flex flex-col gap-1 px-2 pt-3 flex-1">
        {items.map(item => {
          const isActive = item.id === active
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className="flex items-center gap-2.5 px-2.5 py-2 rounded text-left transition-all w-full"
              style={{
                background: isActive ? '#eef4ff' : 'transparent',
                color: isActive ? '#001932' : '#415172',
              }}
            >
              <span style={{ color: isActive ? '#001932' : '#6b7a9a' }}>{item.icon}</span>
              <span className="text-[11px] font-semibold">{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t" style={{ borderColor: 'rgba(191,200,224,0.3)' }}>
        <div className="text-[8px] font-bold tracking-[0.1em] uppercase text-[#bfc8e0]">Vivatech 2024</div>
        <div className="text-[8px] text-[#bfc8e0]">Annex Lab 2</div>
      </div>
    </div>
  )
}

function MainContent({ section: _section }: { section: NavItem }) {
  return (
    <div className="flex-1 overflow-y-auto bg-[#f8f9ff]">
      {/* Section header */}
      <div className="px-5 pt-6 pb-4">
        <p className="text-[9px] font-bold tracking-[0.14em] uppercase text-[#415172] mb-1">
          Industry Pitch
        </p>
        <h2
          className="font-black text-[#001932] leading-tight"
          style={{ fontSize: 28, letterSpacing: '-0.02em' }}
        >
          USAGE
          <br />
          ANALYTICS
        </h2>
      </div>

      {/* Stats bar */}
      <div
        className="mx-4 mb-5 rounded-lg p-4"
        style={{ background: '#001932' }}
      >
        <div className="grid grid-cols-2 gap-3 mb-3 text-white">
          {[
            { label: 'COMPLIANCE', val: 92 },
            { label: 'TREND', val: 78 },
            { label: 'USAGE', val: 85 },
            { label: 'KNOWLEDGE', val: 71 },
            { label: 'ECOSYSTEM', val: 88 },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="h-1 flex-1 rounded-full bg-white/20 overflow-hidden">
                <div className="h-full rounded-full bg-white" style={{ width: `${s.val}%` }} />
              </div>
              <span className="text-[9px] font-bold tracking-wider uppercase text-white/60">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Innovation cards */}
      <div className="px-4">
        {innovations.map(item => (
          <InnovCard key={item.id} item={item} />
        ))}
      </div>

      {/* Stats summary */}
      <div className="px-4 py-4 grid grid-cols-1 gap-4">
        <div
          className="rounded-lg p-4"
          style={{ background: '#ffffff', boxShadow: '0 2px 12px rgba(0,25,50,0.04)' }}
        >
          <p className="text-[9px] font-bold tracking-[0.12em] uppercase text-[#415172] mb-1">
            Total Pitches
          </p>
          <p className="text-3xl font-black text-[#001932]">1,247</p>
          <p className="text-[10px] text-[#4a90d9] font-semibold mt-0.5">+12% vs last session</p>
        </div>

        <div
          className="rounded-lg p-4"
          style={{ background: '#ffffff', boxShadow: '0 2px 12px rgba(0,25,50,0.04)' }}
        >
          <p className="text-[9px] font-bold tracking-[0.12em] uppercase text-[#415172] mb-1">
            Highlight Rate
          </p>
          <p className="text-3xl font-black text-[#001932]">14%</p>
          <p className="text-[10px] text-[#415172] font-semibold mt-0.5">
            Flagged for follow-up
          </p>
        </div>

        <div
          className="rounded-lg p-4"
          style={{ background: '#ffffff', boxShadow: '0 2px 12px rgba(0,25,50,0.04)' }}
        >
          <p className="text-[9px] font-bold tracking-[0.12em] uppercase text-[#415172] mb-1">
            Average Score
          </p>
          <p className="text-3xl font-black text-[#001932]">78.4%</p>
          <div className="h-1.5 rounded-full bg-[#eef4ff] mt-2 overflow-hidden">
            <div className="h-full rounded-full bg-[#b80068]" style={{ width: '78.4%' }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AdminScreen() {
  const [activeNav, setActiveNav] = useState<NavItem>('innovations')

  return (
    <div className="flex flex-1 overflow-hidden" style={{ minHeight: 0 }}>
      <Sidebar active={activeNav} onChange={setActiveNav} />
      <MainContent section={activeNav} />
    </div>
  )
}
