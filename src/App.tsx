import { useState } from 'react'
import './index.css'
import Header from './components/Header'
import BottomNav from './components/BottomNav'
import RecordingScreen from './screens/RecordingScreen'
import ResultsScreen from './screens/ResultsScreen'
import AdminScreen from './screens/AdminScreen'

type Tab = 'dash' | 'results' | 'innov' | 'config'

export default function App() {
  const [tab, setTab] = useState<Tab>('dash')

  function handleRecordingDone() {
    setTab('results')
  }

  // Admin panel uses its own split layout without BottomNav header
  if (tab === 'config') {
    return (
      <div className="flex flex-col h-svh" style={{ maxWidth: 480, margin: '0 auto' }}>
        <Header showMic={false} />
        <AdminScreen />
        <BottomNav active={tab} onChange={setTab} />
      </div>
    )
  }

  return (
    <div className="flex flex-col h-svh" style={{ maxWidth: 480, margin: '0 auto' }}>
      <Header showMic={tab === 'dash'} />

      <main className="flex flex-col flex-1 overflow-hidden">
        {tab === 'dash' && <RecordingScreen onDone={handleRecordingDone} />}
        {tab === 'results' && <ResultsScreen />}
        {tab === 'innov' && <InnovationPlaceholder />}
      </main>

      <BottomNav active={tab} onChange={setTab} />
    </div>
  )
}

function InnovationPlaceholder() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center gap-4 px-12 overflow-y-auto">
      <div
        className="w-16 h-16 rounded-xl flex items-center justify-center"
        style={{ background: '#eef4ff' }}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="3" fill="#001932" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5.636 5.636l2.121 2.121M16.243 16.243l2.121 2.121M5.636 18.364l2.121-2.121M16.243 7.757l2.121-2.121"
            stroke="#001932" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <div className="text-center">
        <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#b80068] mb-2">Innovations</p>
        <h2 className="text-2xl font-black text-[#001932] mb-2" style={{ letterSpacing: '-0.02em' }}>
          Explorer les<br />innovations SNCF
        </h2>
        <p className="text-sm text-[#415172]">
          Découvrez les projets innovants présentés à Vivatech 2024.
        </p>
      </div>
    </div>
  )
}
