import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-8 text-indigo-600">
          🍺 Road To Death
        </h1>
        <p className="text-center text-gray-600 mb-8">
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
      </div>
    </main>
  )
}

