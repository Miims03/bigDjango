import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Indic from './components/Indic'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import ProtectRoute from './components/ProtectRoute'

const Logout = () => {
  localStorage.clear()
  return <Navigate to='/login' />
}
const RegisterAndLogout = () => {
  localStorage.clear()
  return <Register />
}


function App() {

  return (
    <BrowserRouter>
      <div className='min-h-screen bg-zinc-50 w-full flex flex-col justify-start items-center'>
        <Indic />
        <Routes>
          
          <Route 
          path="/" 
          element={
            <ProtectRoute>
              <Home />
            </ProtectRoute>} 
          />

          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<RegisterAndLogout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
