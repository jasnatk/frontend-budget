// src/pages/Budgets.jsx
import { useState, useEffect } from 'react'
import axios from '../lib/axios'
import { format } from 'date-fns'

export default function Budgets() {
  const [month, setMonth] = useState(format(new Date(), 'yyyy-MM'))
  const [budgets, setBudgets] = useState([])
  const [categories, setCategories] = useState([])

  useEffect(() => {
    axios.get('/categories').then(res => setCategories(res.data))
    axios.get(`/budgets/${month}`).then(res => setBudgets(res.data))
  }, [month])

  const updateBudget = async (categoryId, amount) => {
    await axios.post('/budgets', { categoryId, month, amount: parseFloat(amount) || 0 })
    axios.get(`/budgets/${month}`).then(res => setBudgets(res.data))
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-5xl font-black mb-12 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Set Budgets</h1>
      
      <input type="month" value={month} onChange={e => setMonth(e.target.value)} className="block mx-auto mb-16 px-8 py-6 text-xl rounded-3xl shadow-2xl" />

      <div className="space-y-8 max-w-4xl mx-auto">
        {categories.map(cat => {
          const budget = budgets.find(b => b.categoryId === cat._id)
          return (
            <div key={cat._id} className="bg-white p-8 rounded-3xl shadow-2xl flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-3xl" style={{backgroundColor: cat.color}}></div>
                <span className="text-2xl font-bold">{cat.name}</span>
              </div>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                defaultValue={budget?.amount || ''}
                onBlur={e => updateBudget(cat._id, e.target.value)}
                className="w-48 px-6 py-4 text-2xl font-bold text-right rounded-2xl border-2 focus:border-purple-600"
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}