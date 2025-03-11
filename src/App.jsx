import React from 'react'
import "./css/App.css"
// import Moviecard from "./component/moviecard"
import Homepage from './pages/homepage'
import Favourite from './pages/fav'
import Login from './login/Login'
import Recommend from './pages/recommend'
// import MovieDetail from './pages/MovieDetail'
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
          {/* <Route path="/movie/:id" element={<MovieDetail />} /> */}
        </Routes>
      </main>

    </div>
  )
}

export default App

