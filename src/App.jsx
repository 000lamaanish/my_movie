import React from 'react'
import "./css/App.css"
import Homepage from './pages/Homepage'
import Favourite from './pages/fav'
import Login from './login/Login'
import Recommend from './pages/Recommend'
import Moviedetails from './component/Moviedetail'
import MovieStatsPage from './pages/Moviestat'
import { Routes, Route } from 'react-router-dom'
const App = () => {

  return (
    <div>
      <main className='main'>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/fav" element={<Favourite />} />
          <Route path="/login" element={<Login />} />
          <Route path="/recommend" element={<Recommend />} />
          <Route path="/movie/:id" element={<Moviedetails />} />
          <Route path="/stats" element={<MovieStatsPage />} />

        </Routes>
      </main>

    </div>
  )
}

export default App

