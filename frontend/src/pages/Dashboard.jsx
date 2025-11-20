// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react'
import axios from '../lib/axios'
import { format } from 'date-fns'
import AddExpenseModal from '../components/AddExpenseModal'

export default function Dashboard() {
  const [month, setMonth] = useState(format(new Date(), 'yyyy-MM'))
  const [report, setReport] = useState([])
  const [categories, setCategories] = useState([])
  const [budgets, setBudgets] = useState([])
  const [newCatName, setNewCatName] = useState('')
  const [newCatColor, setNewCatColor] = useState('#8b5cf6')
  const [showModal, setShowModal] = useState(false)

  // Load everything
  useEffect(() => {
    axios.get(`/reports/${month}`).then(r => setReport(r.data || []))
    axios.get('/categories').then(r => setCategories(r.data || []))
    axios.get(`/budgets/${month}`).then(r => setBudgets(r.data || []))
  }, [month])

  const addCategory = async (e) => {
    e.preventDefault()
    if (!newCatName.trim()) return
    await axios.post('/categories', { name: newCatName, color: newCatColor })
    setNewCatName('')
    axios.get('/categories').then(r => setCategories(r.data))
  }

  const deleteCategory = async (id) => {
    await axios.delete(`/categories/${id}`)
    setCategories(categories.filter(c => c._id !== id))
  }

  const updateBudget = async (catId, amount) => {
    await axios.post('/budgets', { categoryId: catId, month, amount: parseFloat(amount) || 0 })
    axios.get(`/budgets/${month}`).then(r => setBudgets(r.data))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-6 py-12 max-w-7xl">

        {/* Month Selector */}
        <div className="text-center mb-12">
          <input
            type="month"
            value={month}
            onChange={e => setMonth(e.target.value)}
            className="px-10 py-5 text-2xl font-bold rounded-3xl shadow-2xl bg-white/90 backdrop-blur"
          />
        </div>

        {/* Categories Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-black mb-8 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Categories
          </h2>
          <form onSubmit={addCategory} className="flex gap-4 max-w-2xl mx-auto mb-8">
            <input value={newCatName} onChange={e => setNewCatName(e.target.value)} placeholder="New category" required className="flex-1 px-6 py-5 rounded-2xl text-xl" />
            <input type="color" value={newCatColor} onChange={e => setNewCatColor(e.target.value)} className="w-20 h-14 rounded-2xl" />
            <button className="px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xl rounded-2xl hover:scale-105 transition">Add</button>
          </form>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map(cat => (
              <div key={cat._id} className="bg-white p-6 rounded-3xl shadow-xl flex items-center justify-between hover:shadow-2xl transition">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl" style={{backgroundColor: cat.color}}></div>
                  <span className="text-2xl font-bold">{cat.name}</span>
                </div>
                <button onClick={() => deleteCategory(cat._id)} className="text-red-600 text-3xl hover:text-red-800">×</button>
              </div>
            ))}
          </div>
        </section>

        {/* Budgets */}
        <section className="mb-16">
          <h2 className="text-4xl font-black mb-8 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Monthly Budgets
          </h2>
          <div className="space-y-6 max-w-4xl mx-auto">
            {categories.map(cat => {
              const budget = budgets.find(b => b.categoryId === cat._id)
              return (
                <div key={cat._id} className="bg-white p-8 rounded-3xl shadow-xl flex items-center justify-between">
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
                    className="w-40 px-6 py-4 text-2xl font-bold text-right rounded-2xl border-2 focus:border-purple-600"
                  />
                </div>
              )
            })}
          </div>
        </section>

        {/* Report Cards */}
        <section>
          <h2 className="text-4xl font-black mb-12 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Spending Report
          </h2>
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {report.map(cat => (
              <div key={cat.categoryId} className="bg-white p-10 rounded-3xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-3 transition">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-3xl font-bold">{cat.category}</h3>
                  <div className="w-16 h-16 rounded-3xl" style={{backgroundColor: cat.color}}></div>
                </div>
                <p className="text-5xl font-black">${cat.spent.toFixed(2)}</p>
                <p className="text-xl text-gray-600">of ${cat.budget.toFixed(2)}</p>
                <div className="mt-6 w-full bg-gray-200 rounded-full h-8">
                  <div
                    className={`h-full rounded-full transition-all ${cat.spent > cat.budget ? 'bg-red-600' : 'bg-emerald-600'}`}
                    style={{width: `${Math.min((cat.spent / (cat.budget || 1)) * 100, 100)}%`}}
                  ></div>
                </div>
                <p className={`text-2xl font-bold mt-6 ${cat.spent > cat.budget ? 'text-red-600' : 'text-emerald-600'}`}>
                  {cat.spent > cat.budget ? 'Over Budget!' : 'Under Budget'}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FAB */}
        <button
          onClick={() => setShowModal(true)}
          className="fixed bottom-10 right-10 w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-2xl text-5xl font-black hover:scale-110 transition z-50"
        >
          +
        </button>
        <AddExpenseModal isOpen={showModal} onClose={() => setShowModal(false)} onSuccess={(msg) => alert(msg)} />
      </div>
    </div>
  )
}