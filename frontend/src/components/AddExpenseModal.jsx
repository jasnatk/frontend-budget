// src/components/AddExpenseModal.jsx
import { useState, useEffect } from 'react'
import axios from 'axios'
import { format } from 'date-fns'

export default function AddExpenseModal({ isOpen, onClose, onSuccess }) {
  const [categories, setCategories] = useState([])
  const [form, setForm] = useState({
    categoryId: '',
    amount: '',
    date: format(new Date(), 'yyyy-MM-dd')
  })

  useEffect(() => {
    if (isOpen) {
      axios.get('/categories').then(res => setCategories(res.data))
    }
  }, [isOpen])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('/expenses', form)
      onSuccess(res.data.message, res.data.overBudget)
      onClose()
    } catch (err) {
      onSuccess('Error adding expense', true)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
        <h2 className="text-3xl font-bold mb-6">Add Expense</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <select
            value={form.categoryId}
            onChange={e => setForm({...form, categoryId: e.target.value})}
            className="w-full px-5 py-4 border rounded-xl"
            required
          >
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>

          <input
            type="number"
            step="0.01"
            placeholder="Amount"
            value={form.amount}
            onChange={e => setForm({...form, amount: e.target.value})}
            className="w-full px-5 py-4 border rounded-xl"
            required
          />

          <input
            type="date"
            value={form.date}
            onChange={e => setForm({...form, date: e.target.value})}
            className="w-full px-5 py-4 border rounded-xl"
            required
          />

          <div className="flex gap-4">
            <button type="submit" className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold hover:scale-105 transition">
              Save Expense
            </button>
            <button type="button" onClick={onClose} className="flex-1 bg-gray-200 py-4 rounded-xl font-bold">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}