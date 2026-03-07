'use client'

import { useState } from 'react'
import type { Tone, CreateBusinessResponse } from '@/types'
import QRResult from './QRResult'

const CATEGORIES = [
  'Restaurant',
  'Café',
  'Retail Store',
  'Salon / Spa',
  'Gym / Fitness',
  'Medical / Clinic',
  'Hotel / Stay',
  'Automobile',
  'Education',
  'Legal / Finance',
  'Other',
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

    if (!form.business_name.trim()) {
      newErrors.business_name = 'Business name is required'
    }

    if (!form.category) {
      newErrors.category = 'Please select a category'
    }

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

      const data: CreateBusinessResponse = await res.json()

      if (!res.ok) {
        throw new Error(data?.error ?? 'Failed to generate QR')
      }

      setResult(data)

      setTimeout(() => {
        document
          .getElementById('qr-result')
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
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
        <QRResult
          business={{
            ...result.business,
            qrDataUrl: result.qrDataUrl,
            reviewPageUrl: result.reviewPageUrl,
          }}
          onReset={() => setResult(null)}
        />
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl border border-[#E8E8E8] p-8 shadow-lg shadow-black/4"
    >
      <div className="mb-6">
        <label className="block text-sm font-semibold text-[#0D0D0D] mb-2">
          Business Name <span className="text-red-400">*</span>
        </label>

        <input
          type="text"
          placeholder="e.g. Blue Door Café"
          value={form.business_name}
          onChange={e =>
            setForm(f => ({ ...f, business_name: e.target.value }))
          }
          className="w-full px-4 py-3 rounded-xl border"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-[#0D0D0D] mb-2">
          Category <span className="text-red-400">*</span>
        </label>

        <select
          value={form.category}
          onChange={e =>
            setForm(f => ({ ...f, category: e.target.value }))
          }
          className="w-full px-4 py-3 rounded-xl border"
        >
          <option value="" disabled>
            Select your business category
          </option>

          {CATEGORIES.map(c => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-[#0D0D0D] mb-2">
          Google Review Link <span className="text-red-400">*</span>
        </label>

        <input
          type="url"
          placeholder="https://g.page/r/your-business/review"
          value={form.google_review_link}
          onChange={e =>
            setForm(f => ({ ...f, google_review_link: e.target.value }))
          }
          className="w-full px-4 py-3 rounded-xl border"
        />
      </div>

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
              className={`p-4 rounded-xl border-2 ${
                form.tone === t.value
                  ? 'border-[#1A56DB] bg-[#EEF3FF]'
                  : 'border-[#E8E8E8]'
              }`}
            >
              <p>{t.label}</p>
              <p>{t.desc}</p>
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-white py-4 rounded-full"
      >
        {loading ? 'Generating QR Code...' : 'Create QR Code'}
      </button>
    </form>
  )
}
