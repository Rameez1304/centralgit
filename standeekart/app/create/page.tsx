'use client'

import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { generateSlug, toneLabel } from '@/lib/utils'
import type { Tone, Business } from '@/types'
import QRResult from '@/components/QRResult'

type Step = 'form' | 'qr'

const CATEGORIES = [
  'Restaurant', 'Café', 'Retail Shop', 'Salon & Beauty', 'Gym & Fitness',
  'Hotel', 'Medical Clinic', 'Dental Clinic', 'Auto Service', 'Other',
]

const TONES: { value: Tone; label: string; desc: string }[] = [
  { value: 'friendly', label: 'Friendly', desc: 'Warm and personable' },
  { value: 'professional', label: 'Professional', desc: 'Polished and formal' },
  { value: 'short', label: 'Short', desc: 'Punchy and concise' },
]

export default function CreatePage() {
  const [step, setStep] = useState<Step>('form')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [business, setBusiness] = useState<Business | null>(null)

  const [form, setForm] = useState({
    business_name: '',
    category: '',
    google_review_link: '',
    tone: 'friendly' as Tone,
  })

  function set(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
    setError(null)
  }

  function validate(): string | null {
    if (!form.business_name.trim()) return 'Business name is required.'
    if (!form.category) return 'Please select a category.'
    if (!form.google_review_link.trim()) return 'Google review link is required.'
    try {
      new URL(form.google_review_link)
    } catch {
      return 'Please enter a valid URL (starting with https://).'
    }
    return null
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const err = validate()
    if (err) { setError(err); return }

    setLoading(true)
    setError(null)

    try {
      const slug = generateSlug(form.business_name)

      const { data, error: dbError } = await supabase
        .from('businesses')
        .insert({
          business_name: form.business_name.trim(),
          category: form.category,
          google_review_link: form.google_review_link.trim(),
          tone: form.tone,
          slug,
        })
        .select()
        .single()

      if (dbError) throw new Error(dbError.message)

      setBusiness(data as Business)
      setStep('qr')
    } catch (err: any) {
      setError(err.message ?? 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-paper">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-paper/80 backdrop-blur-md border-b border-mist">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-display text-lg">ReviewPilot</span>
            <span className="text-xs px-1.5 py-0.5 rounded bg-gold-light text-gold-dark font-semibold">AI</span>
          </Link>
        </div>
      </nav>

      <div className="pt-28 pb-20 px-6">
        <div className="max-w-xl mx-auto">

          {step === 'form' && (
            <>
              {/* Header */}
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-light text-gold-dark text-xs font-semibold tracking-widest uppercase mb-6">
                  ✦ Step 1 of 1
                </div>
                <h1 className="font-display text-4xl text-ink tracking-tight mb-3">
                  Create your QR code
                </h1>
                <p className="text-slate text-base">
                  Fill in your business details and we'll generate a custom AI review QR in seconds.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="card p-8 space-y-6">
                {/* Business Name */}
                <div>
                  <label className="block text-sm font-medium text-lead mb-2">
                    Business Name <span className="text-gold-dark">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.business_name}
                    onChange={e => set('business_name', e.target.value)}
                    placeholder="e.g. The Harbour Kitchen"
                    className="input-field"
                    maxLength={80}
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-lead mb-2">
                    Category <span className="text-gold-dark">*</span>
                  </label>
                  <select
                    value={form.category}
                    onChange={e => set('category', e.target.value)}
                    className="input-field appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select a category…</option>
                    {CATEGORIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Google Review Link */}
                <div>
                  <label className="block text-sm font-medium text-lead mb-2">
                    Google Review Link <span className="text-gold-dark">*</span>
                  </label>
                  <input
                    type="url"
                    value={form.google_review_link}
                    onChange={e => set('google_review_link', e.target.value)}
                    placeholder="https://g.page/r/your-business/review"
                    className="input-field"
                  />
                  <p className="text-xs text-slate mt-1.5">
                    Find this in Google Business Profile → Get more reviews → Share review form.
                  </p>
                </div>

                {/* Tone */}
                <div>
                  <label className="block text-sm font-medium text-lead mb-3">
                    Review Tone
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {TONES.map(t => (
                      <button
                        key={t.value}
                        type="button"
                        onClick={() => set('tone', t.value)}
                        className={`p-3 rounded-xl border text-left transition-all duration-150 ${
                          form.tone === t.value
                            ? 'border-ink bg-ink text-paper'
                            : 'border-mist bg-white text-lead hover:border-slate/50'
                        }`}
                      >
                        <div className="text-sm font-semibold">{t.label}</div>
                        <div className={`text-[11px] mt-0.5 ${form.tone === t.value ? 'text-paper/60' : 'text-slate'}`}>
                          {t.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200">
                    <span className="text-red-500 mt-0.5 flex-shrink-0">⚠</span>
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full justify-center py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <>
                      <Spinner />
                      Generating your QR…
                    </>
                  ) : (
                    <>
                      Create QR Code
                      <ArrowRight />
                    </>
                  )}
                </button>
              </form>
            </>
          )}

          {step === 'qr' && business && (
            <QRResult business={business} />
          )}
        </div>
      </div>
    </div>
  )
}

function Spinner() {
  return (
    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )
}

function ArrowRight() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
