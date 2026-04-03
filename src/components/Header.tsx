
interface HeaderProps {
  onMenuClick?: () => void
  showMic?: boolean
}

// Inline SVG for the SNCF/Numérique logo (simplified)
const SncfLogo = () => (
  <div className="flex items-center gap-1.5">
    <div className="w-8 h-8 bg-[#00205B] rounded-sm flex items-center justify-center">
      <div className="w-4 h-3 bg-white rounded-[2px]" />
    </div>
    <div>
      <div className="text-[10px] font-bold tracking-widest text-[#001932] leading-none">SNCF</div>
      <div className="text-[9px] text-[#0084D4] font-semibold tracking-wider">Numérique</div>
    </div>
  </div>
)

const HamburgerIcon = () => (
  <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
    <rect width="22" height="2" rx="1" fill="#001932" />
    <rect y="7" width="16" height="2" rx="1" fill="#001932" />
    <rect y="14" width="22" height="2" rx="1" fill="#001932" />
  </svg>
)

const MicIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="#001932">
    <path d="M12 1a4 4 0 0 0-4 4v7a4 4 0 0 0 8 0V5a4 4 0 0 0-4-4zm-2 4a2 2 0 0 1 4 0v7a2 2 0 0 1-4 0V5zM6.5 12.5a.75.75 0 0 0-1.5 0A7 7 0 0 0 11.25 19v2.25H9a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5h-2.25V19A7 7 0 0 0 19 12.5a.75.75 0 0 0-1.5 0 5.5 5.5 0 0 1-11 0z" />
  </svg>
)

export default function Header({ onMenuClick, showMic = true }: HeaderProps) {
  return (
    <header
      className="sticky top-0 z-40 flex items-center justify-between px-6 py-3 bg-white/70 backdrop-blur-[20px]"
      style={{ boxShadow: '0 2px 32px 0 rgba(0,25,50,0.04)' }}
    >
      <button
        onClick={onMenuClick}
        className="p-1 -ml-1 rounded focus:outline-none"
        aria-label="Menu"
      >
        <HamburgerIcon />
      </button>

      <SncfLogo />

      {/* Separator + VIVATECH */}
      <div className="flex items-center gap-3">
        <div className="w-px h-6 bg-[#bfc8e0]" />
        <span className="text-[12px] font-semibold tracking-[0.08em] text-[#415172] uppercase">
          Vivatech
        </span>
        {showMic && (
          <button className="p-1 rounded focus:outline-none" aria-label="Microphone">
            <MicIcon />
          </button>
        )}
      </div>
    </header>
  )
}
