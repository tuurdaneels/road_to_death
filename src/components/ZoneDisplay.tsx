import { useState, useEffect, type ChangeEvent } from 'react'
import { Zone } from '../data/zones'
import bgImage from '../data/images/bg.png'
import cardBgImage from '../data/images/card-bg.png'
import ossemarktImage from '../data/images/ossemarkt.png'
import trofbrugImage from '../data/images/rebus2.svg'

// Helper function to get image by name
function getZoneImage(imageName?: string): string | undefined {
  if (!imageName) return undefined
  const imageMap: Record<string, string> = {
    'ossemarkt.png': ossemarktImage,
    'rebus2.svg': trofbrugImage,
  }
  return imageMap[imageName]
}

interface ZoneDisplayProps {
  zone: Zone
  completedCafes: string[]
  onCafeToggle: (cafeId: string) => void
  onNextZone: () => void
  zoneComplete: boolean
  isFinalZone: boolean
  teamId: string
  zoneDisplayNumber: number
}

export default function ZoneDisplay({
  zone,
  completedCafes,
  onCafeToggle,
  onNextZone,
  zoneComplete,
  isFinalZone,
  teamId,
  zoneDisplayNumber,
}: ZoneDisplayProps) {
  const [localCompleted, setLocalCompleted] = useState<Set<string>>(
    new Set(completedCafes)
  )
  const [enteredCode, setEnteredCode] = useState<string>('')
  const [finalZoneCompleted, setFinalZoneCompleted] = useState<boolean>(false)

  useEffect(() => {
    setLocalCompleted(new Set(completedCafes))
  }, [completedCafes])

  useEffect(() => {
    // Reset code and final zone completed state when zone changes
    setEnteredCode('')
    setFinalZoneCompleted(false)
  }, [zone.id])

  const handleToggle = (cafeId: string) => {
    const newCompleted = new Set(localCompleted)
    if (newCompleted.has(cafeId)) {
      newCompleted.delete(cafeId)
    } else {
      newCompleted.add(cafeId)
    }
    setLocalCompleted(newCompleted)
    onCafeToggle(cafeId)
  }

  const isCodeCorrect = enteredCode.toLowerCase().trim() === zone.code.toLowerCase().trim()
  const hasImage = zone.image !== undefined
  const showImage = hasImage
  const showCodeInput = true

  const getTeamColor = () => {
    switch (teamId) {
      case 'A':
        return 'purple'
      case 'B':
        return 'purple'
      case 'C':
        return 'purple'
      default:
        return 'indigo'
    }
  }

  const color = getTeamColor()
  const colorClasses = {
    blue: {
      bg: 'bg-blue-500',
      hover: 'hover:bg-blue-600',
      border: 'border-blue-500',
      text: 'text-blue-600',
      bgLight: 'bg-blue-50',
    },
    green: {
      bg: 'bg-green-500',
      hover: 'hover:bg-green-600',
      border: 'border-green-500',
      text: 'text-green-600',
      bgLight: 'bg-green-50',
    },
    purple: {
      bg: 'bg-purple-500',
      hover: 'hover:bg-purple-600',
      border: 'border-purple-500',
      text: 'text-purple-600',
      bgLight: 'bg-purple-50',
    },
    indigo: {
      bg: 'bg-indigo-500',
      hover: 'hover:bg-indigo-600',
      border: 'border-indigo-500',
      text: 'text-indigo-600',
      bgLight: 'bg-indigo-50',
    },
  }

  const theme = colorClasses[color]

  return (
    <div 
      className="overflow-y-auto"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundColor: '#c49a6c',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        paddingTop: 'max(1rem, env(safe-area-inset-top))',
        paddingBottom: 'max(1rem, env(safe-area-inset-bottom))',
        minHeight: '100vh',
      }}
    >
      <div className="w-full px-3 py-4 mx-auto min-h-screen flex flex-col justify-center" style={{ maxWidth: '500px', paddingTop: 'max(1rem, env(safe-area-inset-top))' }}>
        <div className="mb-4">
          <h1 className="text-2xl font-bold mb-1 text-center text-white drop-shadow-lg">
            Zone {zoneDisplayNumber}: {zone.name}
          </h1>
          <p className="text-center text-white text-sm drop-shadow-md">
            Team {teamId}
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-1 mb-4">
          
            {zone.cafes.map((cafe) => {
              const isCompleted = localCompleted.has(cafe.id)
              return (
                <div
                  key={cafe.id}
                  className={`relative rounded-lg overflow-hidden transition-all aspect-square ${
                    isCompleted
                      ? `border-4 ${theme.border}`
                      : ''
                  }`}
                >
                  <img
                    src={cardBgImage}
                    alt="Card background"
                    className="w-full h-full object-contain"
                    style={{ objectFit: 'contain' }}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-3">
                    <label className="flex flex-col items-center cursor-pointer w-full h-full justify-center">
                      <input
                        type="checkbox"
                        checked={isCompleted}
                        onChange={() => handleToggle(cafe.id)}
                        className="mb-2 w-6 h-6 text-purple-600 rounded focus:ring-2 focus:ring-purple-500 z-10"
                      />
                      <div className="text-center px-2">
                        <div className={`font-bold text-base ${
                          isCompleted ? theme.text : 'text-gray-800'
                        }`}>
                          {cafe.name}
                        </div>
                        <div className={`mt-1 text-sm ${
                          isCompleted ? theme.text : 'text-gray-600'
                        }`}>
                          {cafe.task}
                        </div>
                      </div>
                      {isCompleted && (
                        <div className="mt-2 text-2xl">✓</div>
                      )}
                    </label>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-4 pt-4">
            {isFinalZone && zoneComplete && finalZoneCompleted && (zone.code.length === 0 || isCodeCorrect) ? (
              <div className="text-center">
                <div className="text-3xl mb-3">🎉</div>
                <h2 className="text-xl font-bold text-white mb-2 drop-shadow-lg">
                  Gefeliciteerd!
                </h2>
                <p className="text-white text-sm drop-shadow-md">
                  Jullie hebben alle zones voltooid! Maakt da ge in de zwaan zit.
                </p>
              </div>
            ) : (
              <>
                {showImage && (
                  <div className="mb-4">
                    <div className="rounded-lg p-4 shadow-lg">
                      {getZoneImage(zone.image) ? (
                        <img
                          src={getZoneImage(zone.image)}
                          alt={`${zone.name} hint`}
                          className="w-full h-auto rounded-lg max-h-96 object-contain"
                        />
                      ) : (
                        <p className="text-gray-500 text-center p-4">Afbeelding niet gevonden</p>
                      )}
                    </div>
                  </div>
                )}
                {zone.clue && (
                  <div className="mb-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-white/20">
                      <h3 className="text-white font-bold mb-3 text-center drop-shadow-md">
                        Opdracht
                      </h3>
                      <p className="text-white text-sm leading-relaxed whitespace-pre-line drop-shadow-md">
                        {zone.clue}
                      </p>
                    </div>
                  </div>
                )}
                {showCodeInput && zone.code.length !== 0 && (
                  <div className="mb-4">
                    <label className="block text-white text-sm font-semibold mb-2 drop-shadow-md">
                      Voer de zone code in:
                    </label>
                    <input
                      type="text"
                      value={enteredCode}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setEnteredCode(e.target.value)
                      }
                      placeholder="Code..."
                      className="w-full px-4 py-3 rounded-lg text-center text-lg font-bold focus:outline-none focus:ring-2 focus:ring-white shadow-lg"
                      autoComplete="off"
                    />
                    {enteredCode && !isCodeCorrect && (
                      <p className="text-red-300 text-sm mt-2 text-center drop-shadow-md">
                        Code is incorrect
                      </p>
                    )}
                    {isCodeCorrect && (
                      <p className="text-green-300 text-sm mt-2 text-center drop-shadow-md">
                        ✓ Code correct!
                      </p>
                    )}
                  </div>
                )}
                {zoneComplete && (
                  <button
                    onClick={() => {
                      if (isFinalZone) {
                        setFinalZoneCompleted(true)
                      } else {
                        onNextZone()
                      }
                    }}
                    disabled={zone.code.length > 0 && !isCodeCorrect}
                    className={`w-full ${
                      (zone.code.length === 0 || isCodeCorrect)
                        ? `${theme.bg} ${theme.hover} cursor-pointer`
                        : 'bg-gray-400 cursor-not-allowed'
                    } text-white font-bold py-4 px-6 rounded-lg text-base transition-colors shadow-lg`}
                  >
                    Volgende Zone →
                  </button>
                )}
                {!zoneComplete && (
                  <div className="text-center text-white/80 text-sm drop-shadow-md py-2">
                    Voltooi alle cafés om door te gaan
                  </div>
                )}
              </>
            )}
          </div>

        <div className="text-center text-sm text-white/90 mt-4 drop-shadow-md">
          {zone.cafes.filter((c) => localCompleted.has(c.id)).length} / {zone.cafes.length} voltooid
        </div>
      </div>
    </div>
  )
}
