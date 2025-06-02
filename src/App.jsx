import react from 'react'
import Home from './Components/Home'
import { useState } from 'react'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { MovieDetailsProvider } from './Components/MovieDetailsContext'

function App() {

  return (
    <div>
    <MovieDetailsProvider>
    <BrowserRouter>
    <Home />
    </BrowserRouter>
    </MovieDetailsProvider>
    </div>
  )
}

export default App
