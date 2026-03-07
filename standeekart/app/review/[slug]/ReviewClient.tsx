'use client'

import { useState } from 'react'
import type { Business } from '@/types'

interface Props {
  business: Business
}

type Stage = 'intro' | 'loading' | 'reviews' | 'done'

export default function ReviewClient({ business }: Props) {
  const [stage, setStage] = useState<Stage>('intro')
  const [reviews, setReviews] = useState<string[]>([])
  const [editedReviews, setEditedReviews] = useState<string[]>([])
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function generateReviews() {
    setStage('loading')
    setError(null)

    try {
      const res = await fetch('/api/generate-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName: business.business_name,
          category: business.category,
          tone: business.tone,
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error ?? 'Failed to generate reviews')
      }

      const data = await res.json()
      setReviews(data.reviews)
      setEditedReviews(data.reviews)
      setStage('reviews')
    } catch (err: any) {
      setError(err.message)
      setStage('intro')
    }
  }

  function updateReview(index: number, value: string) {
    setEditedReviews(prev => prev.map((r, i) => (i === index ? value : r)))
  }

  async function copyReview(index: number) {
    await navigator.clipboard.writeText(editedReviews[index])
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  function postToGoogle() {
    window.open(business.google_review_link, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="min-h-screen bg-paper">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-paper/80 backdrop-blur-md border-b border-mist">
        <div className="max-w-lg mx-auto px-6 h-14 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-stone border border-mist flex items-center justify-center text-sm">
            {business.business_name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-semibold text-ink leading-tight">{business.business_name}</p>
            <p className="text-[11px] text-slate">{business.category}</p>
          </div>
        </div>
      </div>

      <div className="pt-24 pb-16 px-6">
        <div className="max-w-lg mx-auto">

          {/* ── INTRO ─────────────────────────────────────── */}
          {stage === 'intro' && (
            <div className="text-center animate-fade-up">
              <div className="text-5xl mb-6">⭐</div>
              <h1 className="font-display text-[2rem] text-ink tracking-tight mb-3 leading-tight">
                Share your experience
              </h1>
              <p className="text-slate text-base mb-10 max-w-xs mx-auto leading-relaxed">
                We'll suggest a few review options — pick the one that feels right, edit it, and post to Google.
              </p>

              {error && (
                <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700 text-left">
                  <strong>Something went wrong:</strong> {error}
                </div>
              )}

              <button
                onClick={generateReviews}
                className="btn-primary text-base px-8 py-4 w-full justify-center max-w-xs mx-auto"
              >
                Generate Review Suggestions
                <SparkleIcon />
              </button>

              <p className="text-xs text-slate mt-4">Free · Takes about 5 seconds</p>
            </div>
          )}

          {/* ── LOADING ───────────────────────────────────── */}
          {stage === 'loading' && (
            <div className="text-center animate-fade-up">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-stone mb-6">
                <svg className="w-7 h-7 animate-spin text-lead" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                  <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              </div>
              <h2 className="font-display text-2xl text-ink mb-2">Crafting your reviews…</h2>
              <p className="text-slate text-sm">Our AI is writing 5 personalised suggestions for {business.business_name}.</p>

              {/* Loading shimmer cards */}
              <div className="mt-8 space-y-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="card p-5" style={{ animationDelay: `${i * 80}ms` }}>
                    <div
                      className="h-3 rounded-full mb-2"
                      style={{
                        background: 'linear-gradient(90deg, #F2F0EC 25%, #E8E5DF 50%, #F2F0EC 75%)',
                        backgroundSize: '200% 100%',
                        animation: 'shimmer 1.5s linear infinite',
                        width: `${70 + i * 8}%`,
                      }}
                    />
                    <div
                      className="h-3 rounded-full mb-2"
                      style={{
                        background: 'linear-gradient(90deg, #F2F0EC 25%, #E8E5DF 50%, #F2F0EC 75%)',
                        backgroundSize: '200% 100%',
                        animation: 'shimmer 1.5s linear infinite',
                        width: `${50 + i * 6}%`,
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── REVIEWS ───────────────────────────────────── */}
          {stage === 'reviews' && (
            <div className="animate-fade-up">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-signal-light text-signal text-xs font-semibold mb-4">
                  ✓ {reviews.length} suggestions ready
                </div>
                <h2 className="font-display text-2xl text-ink tracking-tight">
                  Pick your favourite
                </h2>
                <p className="text-slate text-sm mt-2">
                  Edit any review to make it your own, then post it to Google.
                </p>
              </div>

              <div className="space-y-4 stagger">
                {editedReviews.map((review, i) => (
                  <div key={i} className="card p-5 animate-fade-up opacity-0">
                    {/* Review number badge */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-slate tracking-widest uppercase">
                        Option {i + 1}
                      </span>
                      <div className="flex gap-1">
                        {'⭐'.repeat(5)}
                      </div>
                    </div>

                    {/* Editable textarea */}
                    <textarea
                      value={review}
                      onChange={e => updateReview(i, e.target.value)}
                      rows={4}
                      className="w-full text-sm text-lead leading-relaxed resize-none focus:outline-none bg-transparent mb-4"
                    />

                    {/* Actions */}
                    <div className="flex gap-2 pt-3 border-t border-mist">
                      <button
                        onClick={() => copyReview(i)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-mist text-sm text-lead hover:bg-stone transition-all duration-150"
                      >
                        {copiedIndex === i ? (
                          <><span className="text-signal text-xs">✓</span> Copied!</>
                        ) : (
                          <><CopyIcon /> Copy</>
                        )}
                      </button>
                      <button
                        onClick={postToGoogle}
                        className="flex-[2] flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-ink text-paper text-sm font-medium hover:bg-lead transition-all duration-150"
                      >
                        <GoogleIcon />
                        Post to Google
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Regenerate */}
              <button
                onClick={generateReviews}
                className="w-full mt-4 py-3 rounded-xl border border-mist text-sm text-slate hover:bg-stone hover:text-lead transition-all duration-200 flex items-center justify-center gap-2"
              >
                <RefreshIcon />
                Generate new suggestions
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Powered by footer */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-center py-3 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-mist text-[11px] text-slate shadow-card">
          Powered by
          <span className="font-semibold text-ink">ReviewPilot AI</span>
        </div>
      </div>
    </div>
  )
}

function SparkleIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
      <path d="M8 1l1.5 3.5L13 6l-3.5 1.5L8 11l-1.5-3.5L3 6l3.5-1.5L8 1z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  )
}

function CopyIcon() {
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
      <rect x="5" y="5" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3 11V3a2 2 0 012-2h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function GoogleIcon() {
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
      <path d="M14.4 8.16c0-.51-.05-1-.13-1.47H8v2.78h3.6a3.07 3.07 0 01-1.33 2.02v1.68h2.15c1.26-1.16 1.98-2.87 1.98-5z" fill="currentColor" opacity=".9" />
      <path d="M8 15c1.8 0 3.32-.6 4.42-1.63l-2.15-1.68c-.6.4-1.36.64-2.27.64-1.74 0-3.22-1.18-3.75-2.76H2.04v1.73A6.67 6.67 0 008 15z" fill="currentColor" opacity=".7" />
      <path d="M4.25 9.57A4.02 4.02 0 014.04 8c0-.55.1-1.09.21-1.57V4.7H2.04A6.67 6.67 0 001.33 8c0 1.07.26 2.09.71 3l2.21-1.43z" fill="currentColor" opacity=".5" />
      <path d="M8 3.67c.98 0 1.86.34 2.55 1l1.91-1.91A6.61 6.61 0 008 1 6.67 6.67 0 002.04 4.7L4.25 6.43C4.78 4.85 6.26 3.67 8 3.67z" fill="currentColor" opacity=".3" />
    </svg>
  )
}

function RefreshIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
      <path d="M13.6 2.4A7 7 0 102.4 13.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M13.6 2.4V6.4H9.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
