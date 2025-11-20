// src/pages/Login.jsx
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

axios.defaults.baseURL = 'http://localhost:3000'

export default function Login({ setUser }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignup, setIsSignup] = useState(false)
  const [msg, setMsg] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMsg('')
    try {
      const endpoint = isSignup ? '/auth/signup' : '/auth/login'
      const res = await axios.post(endpoint, { email, password })
      
      if (isSignup) {
        setMsg('Account created! Now login')
        setIsSignup(false)
      } else {
        localStorage.setItem('token', res.data.token)
        setUser({ token: res.data.token })
        navigate('/')
      }
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-600 to-blue-700 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-7xl font-black text-white mb-2">BudgetWise</h1>
          <p className="text-xl text-white/80">Track every penny in style</p>
        </div>

        <div className="bg-white/20 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 border border-white/30">
          <div className="flex mb-8 bg-white/30 rounded-2xl p-2">
            <button onClick={() => setIsSignup(false)} className={`flex-1 py-4 rounded-2xl font-bold text-lg transition ${!isSignup ? 'bg-white text-purple-700 shadow-lg' : 'text-white/80'}`}>Login</button>
            <button onClick={() => setIsSignup(true)} className={`flex-1 py-4 rounded-2xl font-bold text-lg transition ${isSignup ? 'bg-white text-purple-700 shadow-lg' : 'text-white/80'}`}>Sign Up</button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required
              className="w-full px-6 py-5 bg-white/30 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-4 focus:ring-pink-400" />
            <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required
              className="w-full px-6 py-5 bg-white/30 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-4 focus:ring-pink-400" />
            <button type="submit" className="w-full py-6 bg-gradient-to-r from-pink-600 to-purple-700 text-white font-bold text-xl rounded-2xl hover:from-pink-700 hover:to-purple-800 transform hover:scale-105 transition shadow-2xl">
              {isSignup ? 'Create Account' : 'Welcome Back'}
            </button>
          </form>
          {msg && <p className={`text-center mt-6 text-lg font-bold ${msg.includes('created') ? 'text-green-300' : 'text-red-300'}`}>{msg}</p>}
        </div>
      </div>
    </div>
  )
}