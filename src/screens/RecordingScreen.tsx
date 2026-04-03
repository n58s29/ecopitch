import { useState, useEffect, useRef } from 'react'

const BAR_COUNT = 28

function Waveform({ recording }: { recording: boolean }) {
  const bars = Array.from({ length: BAR_COUNT }, (_, i) => {
    const mid = BAR_COUNT / 2
    const dist = Math.abs(i - mid)
    const maxH = 120
    const minH = 24
    // Gaussian-ish envelope
    const envelope = Math.exp(-(dist * dist) / (2 * (mid * 0.55) ** 2))
    const h = minH + (maxH - minH) * envelope
    const delay = (i * 0.06).toFixed(2)
    return { h, delay }
  })

  return (
    <div className="relative flex items-center justify-center gap-[5px] h-[160px] w-full">
      {bars.map(({ h, delay }, i) => (
        <div
          key={i}
          className={`rounded-full origin-center transition-all duration-300 ${recording ? 'wave-bar' : ''}`}
          style={{
            width: 5,
            height: h,
            background: '#001932',
            animationDelay: recording ? `${delay}s` : '0s',
            animationDuration: recording ? `${0.9 + (i % 5) * 0.12}s` : '0s',
            opacity: recording ? 1 : 0.5,
          }}
        />
      ))}
    </div>
  )
}

function Timer({ seconds }: { seconds: number }) {
  const mm = String(Math.floor(seconds / 60)).padStart(2, '0')
  const ss = String(seconds % 60).padStart(2, '0')
  return (
    <div
      className="text-[#001932] font-black tabular-nums select-none"
      style={{ fontSize: 80, lineHeight: 1, letterSpacing: '-0.02em' }}
    >
      {mm}:{ss}
    </div>
  )
}

function ProgressBar({ value, color = '#705d00' }: { value: number; color?: string }) {
  return (
    <div className="h-1.5 rounded-full bg-[#dbe9ff] overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-300"
        style={{ width: `${value}%`, background: color }}
      />
    </div>
  )
}

export default function RecordingScreen({ onDone }: { onDone: () => void }) {
  const [recording, setRecording] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (recording) {
      timerRef.current = setInterval(() => setSeconds(s => s + 1), 1000)
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [recording])

  function handleStart() {
    setSeconds(0)
    setRecording(true)
  }

  function handleStop() {
    setRecording(false)
    onDone()
  }

  // Vertical rail progress (scroll depth simulation)
  const railH = Math.min(100, (seconds / 180) * 100)

  return (
    <div className="flex flex-col flex-1 overflow-y-auto pb-4">
      {/* Vertical progress rail */}
      <div
        className="fixed left-0 top-0 w-1 z-50 rounded-r transition-all duration-700"
        style={{ height: `${railH}%`, background: '#4a90d9' }}
      />

      <div className="px-12 pt-8 pb-2">
        {/* Category label */}
        <p
          className="text-[11px] font-bold tracking-[0.18em] uppercase mb-4"
          style={{ color: '#b80068' }}
        >
          Innovation Lab 2024
        </p>

        {/* Hero headline */}
        <h1
          className="font-black text-[#001932] leading-[0.95] mb-3"
          style={{ fontSize: 52, letterSpacing: '-0.02em' }}
        >
          PITCH
          <br />
          AUDIO
        </h1>

        <p className="italic text-[#415172] text-base mb-8">
          {recording ? 'Parlez dans le micro / casque' : 'Prêt à enregistrer votre pitch'}
        </p>
      </div>

      {/* Waveform zone */}
      <div
        className="mx-6 rounded-lg flex items-center justify-center px-4 py-6 mb-8"
        style={{ background: '#eef4ff' }}
      >
        <Waveform recording={recording} />
      </div>

      {/* Timer */}
      <div className="flex flex-col items-center gap-4 px-12 mb-8">
        <Timer seconds={seconds} />

        {/* Status badge */}
        {recording && (
          <div
            className="flex items-center gap-2 px-5 py-2 rounded-full"
            style={{ background: 'rgba(184,0,104,0.08)' }}
          >
            <span
              className="rec-dot w-2.5 h-2.5 rounded-full inline-block"
              style={{ background: '#b80068' }}
            />
            <span
              className="text-[11px] font-bold tracking-[0.14em] uppercase"
              style={{ color: '#b80068' }}
            >
              Enregistrement en cours
            </span>
          </div>
        )}
      </div>

      {/* CTA Button */}
      <div className="px-6 mb-8">
        {!recording ? (
          <button
            onClick={handleStart}
            className="w-full flex items-center justify-center gap-4 py-5 rounded-lg transition-all duration-200 active:scale-[0.98]"
            style={{
              background: 'linear-gradient(135deg, #b80068 0%, #8c004f 100%)',
              color: '#ffffff',
            }}
          >
            <span className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center">
              <span className="w-3 h-3 rounded-full bg-white inline-block" />
            </span>
            <span
              className="font-black tracking-[0.08em] text-lg uppercase"
              style={{ letterSpacing: '0.1em' }}
            >
              Démarrer
              <br />
              l'enregistrement
            </span>
          </button>
        ) : (
          <button
            onClick={handleStop}
            className="w-full flex items-center justify-center gap-4 py-5 rounded-lg transition-all duration-200 active:scale-[0.98]"
            style={{
              background: 'linear-gradient(135deg, #001932 0%, #002a52 100%)',
              color: '#ffffff',
            }}
          >
            <span className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center">
              <span className="w-3 h-3 rounded-sm bg-white inline-block" />
            </span>
            <span
              className="font-black tracking-[0.08em] text-lg uppercase"
              style={{ letterSpacing: '0.1em' }}
            >
              Arrêter et
              <br />
              Analyser
            </span>
          </button>
        )}
      </div>

      {/* Signal quality cards */}
      <div className="px-6 grid grid-cols-2 gap-4 mb-8">
        <div
          className="rounded-lg p-4"
          style={{ background: '#ffffff', boxShadow: '0 2px 12px rgba(0,25,50,0.04)' }}
        >
          <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#415172] mb-2">
            Qualité<br />signal
          </p>
          <ProgressBar value={88} color="#705d00" />
          <p className="text-sm font-semibold text-[#001932] mt-2">Excellent</p>
        </div>

        <div
          className="rounded-lg p-4"
          style={{ background: '#ffffff', boxShadow: '0 2px 12px rgba(0,25,50,0.04)' }}
        >
          <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#415172] mb-2">
            Niveau bruit
          </p>
          <ProgressBar value={12} color="#001932" />
          <p className="text-sm font-semibold text-[#001932] mt-2">Minimal</p>
        </div>
      </div>

      {/* Vertical rail label */}
      <div className="px-6 flex items-center gap-3 mt-2">
        <div className="h-px flex-1 bg-[#bfc8e0]/40" />
        <p className="text-[10px] font-bold tracking-[0.16em] uppercase text-[#415172]">
          Progression
        </p>
        <div className="w-12 h-6 rounded bg-[#dbe9ff]" />
      </div>
    </div>
  )
}
