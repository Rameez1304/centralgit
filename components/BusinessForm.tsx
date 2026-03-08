'use client'

import { useState } from 'react'
import type { Tone, CreateBusinessResponse } from '@/types'
import QRResult from './QRResult'

const CATEGORIES = [
  'Restaurant', 'Café', 'Retail Store', 'Salon / Spa',
  'Gym / Fitness', 'Medical / Clinic', 'Hotel / Stay',
  'Automobile', 'Education', 'Legal / Finance', 'Other',
]

const TONES: { value: Tone; label: string; desc: string }[] = [
  { value: 'friendly', label: 'Friendly', desc: 'Warm & personal' },
  { value: 'professional', label: 'Professional', desc: 'Polished & credible' },
  { value: 'short', label: 'Short', desc: 'Brief & punchy' },
]

export default function BusinessForm() {
  const [form, setForm] = useState({
    business_name: '',
    category: '',
    google_review_link: '',
    tone: 'friendly' as Tone,
  })
  const [errors, setErrors] = useState<Partial<typeof form>>({})
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<CreateBusinessResponse | null>(null)

  function validate(): boolean {
    const newErrors: Partial<typeof form> = {}
    if (!form.business_name.trim()) newErrors.business_name = 'Business name is required'
    if (!form.category) newErrors.category = 'Please select a category'
    if (!form.google_review_link.trim()) {
      newErrors.google_review_link = 'Google review link is required'
    } else if (!form.google_review_link.startsWith('http')) {
      newErrors.google_review_link = 'Must be a valid URL starting with http'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    try {
      const res = await fetch('/api/generate-qr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error ?? 'Failed to generate QR')
      }

      const data: CreateBusinessResponse = await res.json()
      setResult(data)

      // Scroll to result
      setTimeout(() => {
        document.getElementById('qr-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  if (result) {
    return (
      <div id="qr-result">
        <QRResult result={result} onReset={() => setResult(null)} />
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#E8E8E8] p-8 shadow-lg shadow-black/4">
      {/* Business Name */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-[#0D0D0D] mb-2">
          Business Name <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          placeholder="e.g. Blue Door Café"
          value={form.business_name}
          onChange={e => setForm(f => ({ ...f, business_name: e.target.value }))}
          className={`w-full px-4 py-3 rounded-xl border text-sm transition-all outline-none focus:ring-2 focus:ring-[#1A56DB]/20 focus:border-[#1A56DB] placeholder:text-gray-300 ${
            errors.business_name ? 'border-red-300 bg-red-50' : 'border-[#E8E8E8] bg-white hover:border-gray-300'
          }`}
        />
        {errors.business_name && (
          <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><circle cx="6" cy="6" r="5"/><path d="M6 3.5V6.5M6 8.5V8" stroke="white" strokeWidth="1.2" strokeLinecap="round"/></svg>
            {errors.business_name}
          </p>
        )}
      </div>

      {/* Category */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-[#0D0D0D] mb-2">
          Category <span className="text-red-400">*</span>
        </label>
        <select
          value={form.category}
          onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
          className={`w-full px-4 py-3 rounded-xl border text-sm transition-all outline-none focus:ring-2 focus:ring-[#1A56DB]/20 focus:border-[#1A56DB] bg-white appearance-none cursor-pointer ${
            errors.category ? 'border-red-300 bg-red-50' : 'border-[#E8E8E8] hover:border-gray-300'
          } ${!form.category ? 'text-gray-300' : 'text-[#0D0D0D]'}`}
        >
          <option value="" disabled>Select your business category</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        {errors.category && <p className="mt-1.5 text-xs text-red-500">{errors.category}</p>}
      </div>

      {/* Google Review Link */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-[#0D0D0D] mb-2">
          Google Review Link <span className="text-red-400">*</span>
        </label>
        <input
          type="url"
          placeholder="https://g.page/r/your-business/review"
          value={form.google_review_link}
          onChange={e => setForm(f => ({ ...f, google_review_link: e.target.value }))}
          className={`w-full px-4 py-3 rounded-xl border text-sm transition-all outline-none focus:ring-2 focus:ring-[#1A56DB]/20 focus:border-[#1A56DB] placeholder:text-gray-300 ${
            errors.google_review_link ? 'border-red-300 bg-red-50' : 'border-[#E8E8E8] bg-white hover:border-gray-300'
          }`}
        />
        {errors.google_review_link ? (
          <p className="mt-1.5 text-xs text-red-500">{errors.google_review_link}</p>
        ) : (
          <p className="mt-1.5 text-xs text-[#888]">
            Find this in Google Maps → Share → Copy link, then add /review at the end
          </p>
        )}
      </div>

      {/* Tone */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-[#0D0D0D] mb-3">
          Review Tone
        </label>
        <div className="grid grid-cols-3 gap-3">
          {TONES.map(t => (
            <button
              key={t.value}
              type="button"
              onClick={() => setForm(f => ({ ...f, tone: t.value }))}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                form.tone === t.value
                  ? 'border-[#1A56DB] bg-[#EEF3FF]'
                  : 'border-[#E8E8E8] bg-white hover:border-gray-300'
              }`}
            >
              <p className={`text-sm font-semibold mb-0.5 ${form.tone === t.value ? 'text-[#1A56DB]' : 'text-[#0D0D0D]'}`}>
                {t.label}
              </p>
              <p className="text-xs text-[#888]">{t.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#0D0D0D] text-white py-4 rounded-full font-semibold text-sm hover:bg-[#333] transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 shadow-lg shadow-black/10"
      >
        {loading ? (
          <>
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            Generating QR Code...
          </>
        ) : (
          <>
            Create QR Code
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </>
        )}
      </button>
    </form>
  )
}
