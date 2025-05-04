import react from 'react'
import Home from './Components/Home'
import { useState } from 'react'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

function App() {

  return (
    <div>
    <BrowserRouter>
    <Home />
    </BrowserRouter>
    </div>
  )
}

export default App
