import React, { useEffect, useState } from 'react'
import { validateScore, isNumeric, parsePoints } from '../utils/validation'
import PreviewPanel from './PreviewPanel'

const STORAGE_KEY = 'match-report-form'

export default function MatchReportForm() {
  const [form, setForm] = useState({
    playerA: '',
    playerB: '',
    format: 'No-Ad',
    score: '',
    tiebreak: false,
    pointsPlayed: '',
    errorsA: '',
    errorsB: '',
    winnersA: '',
    winnersB: '',
    notes: '',
    sendEmail: false,
    previewOnly: false
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      setForm(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form))
  }, [form])

  const update = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm({ ...form, [field]: value })
  }

  const validate = () => {
    const errs = {}
    if (form.score && !validateScore(form.score)) {
      errs.score = 'Invalid score format'
    }
    if (form.errorsA && !isNumeric(form.errorsA)) errs.errorsA = 'Must be numeric'
    if (form.errorsB && !isNumeric(form.errorsB)) errs.errorsB = 'Must be numeric'
    if (form.winnersA && !isNumeric(form.winnersA)) errs.winnersA = 'Must be numeric'
    if (form.winnersB && !isNumeric(form.winnersB)) errs.winnersB = 'Must be numeric'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    if (form.sendEmail) {
      try {
        await fetch('https://formspree.io/f/placeholder', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })
      } catch (err) {
        console.error('Email failed', err)
      }
    }
    alert('Form submitted!')
  }

  const data = {
    ...form,
    pointsPlayed: parsePoints(form.pointsPlayed)
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        <h1 className="text-xl font-bold mb-4">Tennis Match Report</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <input value={form.playerA} onChange={update('playerA')} id="playerA" className="peer form-input w-full border rounded p-2" />
            <label htmlFor="playerA" className="absolute text-sm text-gray-500 left-2 top-1 peer-focus:-top-3 peer-focus:text-xs transition-all">Player A</label>
          </div>
          <div className="relative">
            <input value={form.playerB} onChange={update('playerB')} id="playerB" className="peer form-input w-full border rounded p-2" />
            <label htmlFor="playerB" className="absolute text-sm text-gray-500 left-2 top-1 peer-focus:-top-3 peer-focus:text-xs transition-all">Player B</label>
          </div>
          <div>
            <label className="block text-sm">Match Format</label>
            <select value={form.format} onChange={update('format')} className="mt-1 w-full border rounded p-2">
              <option>No-Ad</option>
              <option>Advantage</option>
            </select>
          </div>
          <div>
            <label className="block text-sm">Score</label>
            <input value={form.score} onChange={update('score')} className="w-full border rounded p-2" />
            {errors.score && <p className="text-red-500 text-xs">{errors.score}</p>}
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="tiebreak" checked={form.tiebreak} onChange={update('tiebreak')} className="mr-2" />
            <label htmlFor="tiebreak" className="text-sm">Tiebreak Present</label>
          </div>
        </div>
        <div>
          <label className="block text-sm">Points Played (score & player line followed by points)</label>
          <textarea
            value={form.pointsPlayed}
            onChange={update('pointsPlayed')}
            rows="6"
            className="w-full border rounded p-2"
            placeholder={`0-0 Giacomo\n7,1,1,1\n0-1 Mattia\n@3,4,4,5`}
          ></textarea>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm">Errors A</label>
            <input value={form.errorsA} onChange={update('errorsA')} className="w-full border rounded p-2" />
            {errors.errorsA && <p className="text-red-500 text-xs">{errors.errorsA}</p>}
          </div>
          <div>
            <label className="block text-sm">Errors B</label>
            <input value={form.errorsB} onChange={update('errorsB')} className="w-full border rounded p-2" />
            {errors.errorsB && <p className="text-red-500 text-xs">{errors.errorsB}</p>}
          </div>
          <div>
            <label className="block text-sm">Winners A</label>
            <input value={form.winnersA} onChange={update('winnersA')} className="w-full border rounded p-2" />
            {errors.winnersA && <p className="text-red-500 text-xs">{errors.winnersA}</p>}
          </div>
          <div>
            <label className="block text-sm">Winners B</label>
            <input value={form.winnersB} onChange={update('winnersB')} className="w-full border rounded p-2" />
            {errors.winnersB && <p className="text-red-500 text-xs">{errors.winnersB}</p>}
          </div>
        </div>
        <div>
          <label className="block text-sm">Notes</label>
          <textarea value={form.notes} onChange={update('notes')} rows="3" className="w-full border rounded p-2"></textarea>
        </div>
        <div className="flex space-x-4">
          <label className="flex items-center text-sm"><input type="checkbox" checked={form.sendEmail} onChange={update('sendEmail')} className="mr-2" />Send via email</label>
          <label className="flex items-center text-sm"><input type="checkbox" checked={form.previewOnly} onChange={update('previewOnly')} className="mr-2" />Preview only</label>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded" type="submit">Submit</button>
      </form>
      <PreviewPanel data={data} />
      <footer className="text-center text-xs text-gray-500 mt-6">Created with React + Tailwind + Vite on Replit</footer>
    </div>
  )
}
