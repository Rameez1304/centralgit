'use client'

import { useState } from 'react'
import type { Business } from '@/types'

interface Props {
  business: Business
}

type Step = 'landing' | 'generating' | 'reviews' | 'error'

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill={filled ? '#F59E0B' : 'none'} stroke={filled ? '#F59E0B' : '#D1D5DB'} strokeWidth="1.5">
      <path d="M9 1.5L10.8 6.3H16L11.7 9.3L13.5 14.1L9 11.1L4.5 14.1L6.3 9.3L2 6.3H7.2L9 1.5Z"/>
    </svg>
  )
}

export default function ReviewPageClient({ business }: Props) {
  const [step, setStep] = useState<Step>('landing')
  const [reviews, setReviews] = useState<string[]>([])
  const [editedReviews, setEditedReviews] = useState<string[]>([])
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [errorMsg, setErrorMsg] = useState('')

  async function generateReviews() {
    setStep('generating')

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

      const data = await res.json()

      if (!data.reviews || !Array.isArray(data.reviews)) {
        throw new Error('Invalid response')
      }

      setReviews(data.reviews)
      setEditedReviews([...data.reviews])
      setStep('reviews')
    } catch (err) {
      console.error(err)
      setErrorMsg('API response failed')
      setStep('error')
    }
  }

  function copyReview(index: number) {
    navigator.clipboard.writeText(editedReviews[index])
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  function postToGoogle() {
    window.open(business.google_review_link, '_blank', 'noopener,noreferrer')
  }

  if (step === 'landing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F9F9F9] via-white to-[#EEF3FF] flex items-center justify-center px-4 py-12">
        <div className="max-w-sm w-full">
          <div className="bg-white rounded-2xl shadow-xl border border-[#E8E8E8] p-8 mb-4">
            <div className="flex justify-center gap-1 mb-6">
              {[1,2,3,4,5].map(i => <StarIcon key={i} filled={true} />)}
            </div>

            <h1 className="text-2xl font-bold text-center mb-1">
              {business.business_name}
            </h1>

            <p className="text-sm text-center mb-8">{business.category}</p>

            <button
              onClick={generateReviews}
              className="w-full bg-black text-white py-4 rounded-full font-semibold"
            >
              Generate Review Suggestions
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (step === 'generating') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Generating reviews...</p>
      </div>
    )
  }

  if (step === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2>Oops, something went wrong</h2>
          <p>{errorMsg}</p>
          <button onClick={() => setStep('landing')}>
            Try again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-lg mx-auto space-y-4">
        {editedReviews.map((review, i) => (
          <div key={i} className="bg-white rounded-xl border p-4">
            <textarea
              value={review}
              onChange={e => {
                const updated = [...editedReviews]
                updated[i] = e.target.value
                setEditedReviews(updated)
              }}
              rows={3}
              className="w-full mb-3"
            />

            <div className="flex gap-2">
              <button onClick={() => copyReview(i)}>
                {copiedIndex === i ? 'Copied!' : 'Copy review'}
              </button>

              <button onClick={postToGoogle}>
                Post to Google
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
