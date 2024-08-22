import React from 'react'
import { Button } from './components/ui/button'
import { BrowserRouter,Routes, Route, Navigate } from 'react-router-dom'
import Auth from './pages/Auth'
import Profile from './pages/Profile'
import Chat from './pages/Chat'

const App = () => {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/auth" element={<Auth />} />
    <Route path="/Chat" element={<Chat />} />
    <Route path="/Profile" element={<Profile />} />

    <Route path="*" element={<Navigate to="/auth"/>} />
    </Routes></BrowserRouter>
  )
}

export default App