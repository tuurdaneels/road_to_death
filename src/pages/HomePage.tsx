import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logoImage from '../data/images/logo_without_background.png'
import waitBgImage from '../data/images/wacht bg.png'

export default function HomePage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    // Target date: 10 december 17:00 (huidig jaar)
    const targetDate = new Date()
    targetDate.setMonth(11) // December (0-indexed, so 11 = December)
    targetDate.setDate(10)
    targetDate.setHours(17, 0, 0, 0)

    // If the date has passed this year, set it for next year
    if (targetDate < new Date()) {
      targetDate.setFullYear(targetDate.getFullYear() + 1)
    }

    const updateCountdown = () => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      if (distance < 0) {
        setIsExpired(true)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      })
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{
        paddingTop: 'max(1rem, env(safe-area-inset-top))',
        paddingBottom: 'max(1rem, env(safe-area-inset-bottom))',
        backgroundImage: `url(${waitBgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className=" rounded-2xl  p-8 max-w-md w-full">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img 
            src={logoImage} 
            alt="Road To Death Logo" 
            className="h-32 w-auto max-w-full"
          />
        </div>

        <h1 className="text-3xl font-bold text-center mb-4 text-indigo-600">
          🍺 Road To Death
        </h1>

        {/* Countdown Timer */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">
            {isExpired ? 'Het is tijd!' : ''}
          </h2>
          {!isExpired && (
            <div className="grid grid-cols-4 gap-2">
              <div className=" rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-white">
                  {timeLeft.days}
                </div>
                <div className="text-xs text-gray-300 mt-1">Dagen</div>
              </div>
              <div className=" rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-white">
                  {timeLeft.hours}
                </div>
                <div className="text-xs text-gray-300 mt-1">Uren</div>
              </div>
              <div className=" rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-white">
                  {timeLeft.minutes}
                </div>
                <div className="text-xs text-gray-300 mt-1">Min</div>
              </div>
              <div className=" rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-white">
                  {timeLeft.seconds}
                </div>
                <div className="text-xs text-gray-300 mt-1">Sec</div>
              </div>
            </div>
          )}
        </div>

        {isExpired && (
          <>
            <p className="text-center text-gray-300 mb-8">
              Kies je team om te beginnen:
            </p>
            <div className="space-y-4">
              <Link
                to="/teamA"
                className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-6 rounded-lg text-center transition-colors shadow-md"
              >
                Team A
              </Link>
              <Link
                to="/teamB"
                className="block w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-lg text-center transition-colors shadow-md"
              >
                Team B
              </Link>
              <Link
                to="/teamC"
                className="block w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-4 px-6 rounded-lg text-center transition-colors shadow-md"
              >
                Team C
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  )
}
