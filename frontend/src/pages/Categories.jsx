// src/pages/Categories.jsx
import { useState, useEffect } from 'react'
import axios from '../lib/axios'

export default function Categories() {
  const [categories, setCategories] = useState([])
  const [name, setName] = useState('')
  const [color, setColor] = useState('#8b5cf6')

  useEffect(() => { fetchCategories() }, [])

  const fetchCategories = () => axios.get('/categories').then(res => setCategories(res.data))

  const addCategory = async (e) => {
    e.preventDefault()
    await axios.post('/categories', { name, color })
    setName(''); fetchCategories()
  }

  const deleteCategory = async (id) => {
    await axios.delete(`/categories/${id}`)
    fetchCategories()
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-5xl font-black mb-12 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Categories</h1>
      
      <form onSubmit={addCategory} className="max-w-2xl mx-auto mb-16 flex gap-6">
        <input value={name} onChange={e => setName(e.target.value)} placeholder="New category" required className="flex-1 px-8 py-6 text-xl rounded-3xl border-2" />
        <input type="color" value={color} onChange={e => setColor(e.target.value)} className="w-24 h-16 rounded-3xl cursor-pointer" />
        <button className="px-12 py-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xl rounded-3xl hover:scale-105 transition">Add</button>
      </form>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {categories.map(cat => (
          <div key={cat._id} className="bg-white p-8 rounded-3xl shadow-2xl flex items-center justify-between hover:shadow-3xl transition">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-3xl" style={{backgroundColor: cat.color}}></div>
              <span className="text-2xl font-bold">{cat.name}</span>
            </div>
            <button onClick={() => deleteCategory(cat._id)} className="text-red-600 text-4xl hover:text-red-800">×</button>
          </div>
        ))}
      </div>
    </div>
  )
}