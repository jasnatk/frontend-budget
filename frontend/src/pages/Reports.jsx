// src/pages/Reports.jsx
import { useState, useEffect } from 'react'
import axios from '../lib/axios'
import { format } from 'date-fns'
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function Reports() {
  const [month, setMonth] = useState(format(new Date(), 'yyyy-MM'))
  const [report, setReport] = useState([])

  useEffect(() => {
    axios.get(`/reports/${month}`)
      .then(res => setReport(res.data || []))
      .catch(() => setReport([]))
  }, [month])

  const totalSpent = report.reduce((s, c) => s + c.spent, 0)
  const totalBudget = report.reduce((s, c) => s + c.budget, 0)

  // Data for Charts
  const barData = report.map(cat => ({
    name: cat.category,
    spent: cat.spent,
    budget: cat.budget,
    remaining: cat.budget - cat.spent
  }))

  const pieData = report.map(cat => ({
    name: cat.category,
    value: cat.spent,
    color: cat.color || '#8b5cf6'
  }))

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-6 py-12 max-w-7xl">

        {/* Header */}
        <div