import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import TeamPage from './pages/TeamPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/teamA" element={<TeamPage />} />
        <Route path="/teamB" element={<TeamPage />} />
        <Route path="/teamC" element={<TeamPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

