// src/App.jsx
import { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Header from './components/Header'

export default function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) setUser({ token })
    setLoading(false)
  }, [])

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin h-16 w-16 border-8 border-purple-600 rounded-full border-t-transparent"></div></div>

  return (
    <>
      {user && <Header setUser={setUser} />}
      <Routes>
        <Route path="/login" element={!user ? <Login setUser={setUser} /> : <Navigate to="/" />} />
        <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
      </Routes>
    </>
  )
}