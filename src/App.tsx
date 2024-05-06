import { useState } from 'react'
import "@/reset.css"
import './App.css'
import Header from './components/Header/Header'
import HomePage from './pages/HomePage'

function App() {
  return (
    <>
      <Header />
      <HomePage />
    </>
  )
}

export default App
