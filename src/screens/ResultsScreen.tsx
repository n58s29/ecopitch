import type { ReactNode } from 'react'

// ─── Radar Chart ────────────────────────────────────────────────────────────

const RADAR_SIZE = 180
const CENTER = RADAR_SIZE / 2
const RADIUS = 72

const axes = [
  { label: 'CONFORMITÉ', angle: -90 },
  { label: 'INNOVATION', angle: 0 },
  { label: 'FAISABILITÉ', angle: 90 },
  { label: 'ALIGNEMENT', angle: 180 },
]

function polarToXY(angle: number, r: number) {
  const rad = (angle * Math.PI) / 180
  return {
    x: CENTER + r * Math.cos(rad),
    y: CENTER + r * Math.sin(rad),
  }
}

function radarPoints(values: number[]) {
  return axes.map(({ angle }, i) => {
    const r = (values[i] / 100) * RADIUS
    return polarToXY(angle, r)
  })
}

function pointsStr(pts: { x: number; y: number }[]) {
  return pts.map(p => `${p.x},${p.y}`).join(' ')
}

function RadarChart({ values }: { values: number[] }) {
  const gridLevels = [0.25, 0.5, 0.75, 1]
  const dataPoints = radarPoints(values)

  return (
    <svg width={RADAR_SIZE} height={RADAR_SIZE} viewBox={`0 0 ${RADAR_SIZE} ${RADAR_SIZE}`}>
      {/* Grid polygons */}
      {gridLevels.map((lvl, i) => {
        const pts = axes.map(({ angle }) => polarToXY(angle, RADIUS * lvl))
        return (
          <polygon
            key={i}
            points={pointsStr(pts)}
            className="radar-grid"
          />
        )
      })}
      {/* Axis lines */}
      {axes.map(({ angle, label }, i) => {
        const end = polarToXY(angle, RADIUS)
        return (
          <g key={i}>
            <line
              x1={CENTER} y1={CENTER}
              x2={end.x} y2={end.y}
              stroke="#bfc8e0" strokeWidth="0.8"
            />
            {/* Axis label */}
            {(() => {
              const lp = polarToXY(angle, RADIUS + 16)
              return (
                <text
                  x={lp.x} y={lp.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="7"
                  fontFamily="Public Sans, sans-serif"
                  fontWeight="700"
                  letterSpacing="0.08em"
                  fill="#415172"
                >
                  {label}
                </text>
              )
            })()}
          </g>
        )
      })}
      {/* Data polygon */}
      <polygon
        points={pointsStr(dataPoints)}
        className="radar-line"
      />
      {/* Data points */}
      {dataPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3" fill="#b80068" />
      ))}
    </svg>
  )
}

// ─── Metric Bar ─────────────────────────────────────────────────────────────

function MetricBar({ value, color = '#001932' }: { value: number; color?: string }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="rounded-sm h-2 flex-1"
        style={{ background: '#dbe9ff', position: 'relative', overflow: 'hidden' }}
      >
        <div
          style={{
            width: `${value}%`,
            height: '100%',
            background: color,
            borderRadius: 2,
          }}
        />
      </div>
      <span className="text-xs font-bold text-[#001932] w-6 text-right">{value}</span>
    </div>
  )
}

// ─── Strength Item ───────────────────────────────────────────────────────────

function StrengthItem({
  icon,
  title,
  desc,
}: {
  icon: ReactNode
  title: string
  desc: string
}) {
  return (
    <div className="flex gap-3 items-start">
      <div className="mt-0.5 flex-shrink-0">{icon}</div>
      <div>
        <p className="text-sm font-bold text-[#001932]">{title}</p>
        <p className="text-xs text-[#415172] leading-relaxed mt-0.5">{desc}</p>
      </div>
    </div>
  )
}

// Icons
const CheckIcon = () => (
  <div className="w-6 h-6 rounded-full bg-[#001932] flex items-center justify-center">
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
)
const BoltIcon = () => (
  <div className="w-6 h-6 rounded-full bg-[#b80068] flex items-center justify-center">
    <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
      <path d="M6 1L1 7h4l-1 4 5-6H5l1-4z" fill="white" />
    </svg>
  </div>
)
const PeopleIcon = () => (
  <div className="w-6 h-6 rounded-full bg-[#415172] flex items-center justify-center">
    <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
      <circle cx="4" cy="3" r="2" fill="white" />
      <circle cx="8" cy="3" r="2" fill="white" />
      <path d="M0 9c0-2 1.8-3 4-3s4 1 4 3" fill="white" />
      <path d="M8 6c1.8 0 4 1 4 3" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  </div>
)

// ─── Main Screen ─────────────────────────────────────────────────────────────

export default function ResultsScreen() {
  const radarValues = [92, 85, 78, 73] // compliance, innovation, feasibility, alignment

  return (
    <div className="flex flex-col flex-1 overflow-y-auto pb-4">
      {/* Hero block */}
      <div className="px-12 pt-8 pb-6">
        <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#b80068] mb-3">
          Rapport d'évaluation startup
        </p>
        <h1
          className="font-black text-[#001932] leading-[0.92] mb-4"
          style={{ fontSize: 46, letterSpacing: '-0.02em' }}
        >
          SNCF
          <br />
          CONFORMITÉ
          <br />
          SCORE: 82%
        </h1>
        <div className="text-xs text-[#415172] leading-relaxed">
          <div>Session ID: VV-2024-882</div>
          <div>Date: 22 May 2024</div>
        </div>
      </div>

      {/* Radar card */}
      <div className="mx-6 mb-6 rounded-lg p-5" style={{ background: '#ffffff', boxShadow: '0 2px 12px rgba(0,25,50,0.04)' }}>
        <div className="flex items-start justify-between mb-4">
          <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#001932]">
            Analyse radar<br />stratégique
          </p>
          <div className="w-6 h-6 rounded-full border border-[#bfc8e0] flex items-center justify-center">
            <span className="text-[10px] text-[#415172] font-bold">i</span>
          </div>
        </div>

        <div className="flex justify-center mb-5">
          <RadarChart values={radarValues} />
        </div>

        {/* Metric grid */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          {[
            { label: 'CONFORMITÉ', value: 92 },
            { label: 'INNOVATION', value: 85 },
            { label: 'FAISABILITÉ', value: 78 },
            { label: 'ALIGNEMENT STRATÉGIQUE', value: 73 },
          ].map(m => (
            <div key={m.label}>
              <p className="text-[9px] font-bold tracking-[0.1em] uppercase text-[#415172] mb-1">{m.label}</p>
              <p className="text-2xl font-black text-[#001932]">{m.value}%</p>
            </div>
          ))}
        </div>
      </div>

      {/* Key Strengths */}
      <div className="mx-6 mb-6 rounded-lg p-5" style={{ background: '#eef4ff' }}>
        <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#001932] mb-5">
          Points forts
        </p>
        <div className="flex flex-col gap-5">
          <StrengthItem
            icon={<CheckIcon />}
            title="Conformité réglementaire élevée"
            desc="Pleine adhérence aux normes de sécurité SNCF et aux directives européennes d'interopérabilité ferroviaire."
          />
          <StrengthItem
            icon={<BoltIcon />}
            title="Logique énergétique disruptive"
            desc="Approche innovante de la récupération d'énergie cinétique dans les écosystèmes ferroviaires urbains."
          />
          <StrengthItem
            icon={<PeopleIcon />}
            title="Prêt pour l'exploitation"
            desc="Les prototypes matériels démontrent une maturité TRL 6, adaptés pour des tests immédiats."
          />
        </div>
      </div>

      {/* Next steps CTA */}
      <div className="mx-6 mb-6 rounded-lg p-5" style={{ background: '#001932' }}>
        <p className="text-[10px] font-bold tracking-[0.16em] uppercase text-[#4a90d9] mb-3">
          Prochaines étapes
        </p>
        <p className="text-white font-bold text-lg leading-snug mb-5">
          Discutez des opportunités de partenariat industriel avec nos directeurs techniques.
        </p>
        <button
          className="w-full flex items-center justify-between px-5 py-3.5 rounded font-black text-sm tracking-[0.1em] uppercase transition-all active:scale-[0.98]"
          style={{ background: '#b80068', color: '#ffffff' }}
        >
          <span>Contactez un expert SNCF</span>
          <span className="text-lg">→</span>
        </button>
      </div>

      {/* Expert card */}
      <div className="mx-6 mb-6 rounded-lg p-4 flex items-center gap-4" style={{ background: '#ffffff', boxShadow: '0 2px 12px rgba(0,25,50,0.04)' }}>
        <div
          className="w-12 h-12 rounded-lg flex-shrink-0 overflow-hidden"
          style={{ background: '#dbe9ff' }}
        >
          {/* Avatar placeholder */}
          <div className="w-full h-full flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#415172">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
          </div>
        </div>
        <div>
          <p className="text-sm font-bold text-[#001932]">Marie-Claire Lefebvre</p>
          <p className="text-[10px] font-bold tracking-[0.1em] uppercase text-[#415172]">Head of Innovation Hub</p>
        </div>
      </div>

      {/* Comparative performance */}
      <div className="mx-6 mb-4">
        <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#001932] text-center mb-5">
          Indice de performance comparatif
        </p>
        <div className="flex flex-col gap-4">
          {[
            { label: 'INFRASTRUCTURE', value: 88, color: '#001932' },
            { label: 'JUMEAU NUMÉRIQUE', value: 64, color: '#001932' },
            { label: 'DURABILITÉ', value: 95, color: '#b80068' },
          ].map(m => (
            <div key={m.label}>
              <div className="flex justify-between mb-1.5">
                <span className="text-[10px] font-bold tracking-[0.1em] uppercase text-[#415172]">{m.label}</span>
                <span className="text-[10px] font-bold text-[#001932]">{m.value}</span>
              </div>
              <MetricBar value={m.value} color={m.color} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
