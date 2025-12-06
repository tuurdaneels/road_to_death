import { useLocation, useNavigate } from 'react-router-dom'
import { useTeamProgress } from '../hooks/useTeamProgress'
import ZoneDisplay from '../components/ZoneDisplay'

export default function TeamPage() {
  const location = useLocation()
  const navigate = useNavigate()
  // Extract teamId from pathname (/teamA -> A, /teamB -> B, etc.)
  const teamId = location.pathname.replace('/team', '').toUpperCase() || ''

  const {
    progress,
    loading,
    currentZone,
    zoneComplete,
    isComplete,
    markCafeComplete,
    moveToNextZone,
  } = useTeamProgress(teamId)

  if (!teamId || !['A', 'B', 'C'].includes(teamId)) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Fout</h1>
          <p className="text-gray-600 mb-6">Ongeldig team ID</p>
          <button
            onClick={() => navigate('/')}
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-6 rounded-lg"
          >
            Terug naar start
          </button>
        </div>
      </div>
    )
  }

  if (loading || !progress || !currentZone) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Laden...</div>
      </div>
    )
  }

  return (
    <ZoneDisplay
      zone={currentZone}
      completedCafes={progress.completedCafes}
      onCafeToggle={markCafeComplete}
      onNextZone={moveToNextZone}
      zoneComplete={zoneComplete}
      isFinalZone={isComplete}
      teamId={teamId}
      zoneDisplayNumber={progress.currentZoneIndex + 1}
    />
  )
}

