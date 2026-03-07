'use client'

import { useState, useRef } from 'react'
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

      if (!res.ok) throw new Error('Failed to generate reviews')

      const data = await res.json()
      setReviews(data.reviews)
      setEditedReviews([...data.reviews])
      setStep('reviews')
    } catch (err) {
      setErrorMsg('Something went wrong. Please try again.')
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

  // LANDING STEP
  if (step === 'landing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F9F9F9] via-white to-[#EEF3FF] flex items-center justify-center px-4 py-12">
        <div className="max-w-sm w-full animate-fade-up">
          {/* Business card */}
          <div className="bg-white rounded-2xl shadow-xl shadow-black/8 border border-[#E8E8E8] p-8 mb-4">
            {/* Stars */}
            <div className="flex justify-center gap-1 mb-6">
              {[1,2,3,4,5].map(i => <StarIcon key={i} filled={true} />)}
            </div>

            <h1 className="text-2xl font-bold text-[#0D0D0D] text-center mb-1" style={{fontFamily: 'Playfair Display, serif'}}>
              {business.business_name}
            </h1>
            <p className="text-sm text-[#888] text-center mb-8">{business.category}</p>

            <div className="bg-[#F9F9F9] rounded-xl p-4 mb-8 border border-[#E8E8E8]">
              <p className="text-sm font-semibold text-[#0D0D0D] mb-1">Share your experience</p>
              <p className="text-xs text-[#888] leading-relaxed">
                We'll generate 5 personalised review suggestions based on your visit. Pick one, edit if you like, and post to Google in seconds.
              </p>
            </div>

            <button
              onClick={generateReviews}
              className="w-full bg-[#0D0D0D] text-white py-4 rounded-full font-semibold text-sm hover:bg-[#333] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-black/10 flex items-center justify-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1L10 6H15L11 9L13 14L8 11L3 14L5 9L1 6H6L8 1Z" fill="white" opacity="0.9"/>
              </svg>
              Generate Review Suggestions
            </button>
          </div>

          {/* Brand footer */}
          <p className="text-center text-xs text-[#AAA]">
            Powered by <span className="font-semibold text-[#888]">ReviewPilot AI</span>
          </p>
        </div>
      </div>
    )
  }

  // GENERATING STEP
  if (step === 'generating') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F9F9F9] via-white to-[#EEF3FF] flex items-center justify-center px-4">
        <div className="text-center animate-fade-in">
          <div className="w-16 h-16 bg-[#EEF3FF] rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="animate-spin w-7 h-7 text-[#1A56DB]" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
          </div>
          <h2 className="text-xl font-bold text-[#0D0D0D] mb-2" style={{fontFamily: 'Playfair Display, serif'}}>Crafting your reviews...</h2>
          <p className="text-sm text-[#888]">AI is writing personalised suggestions just for you</p>
        </div>
      </div>
    )
  }

  // ERROR STEP
  if (step === 'error') {
    return (
      <div className="min-h-screen bg-[#F9F9F9] flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path d="M12 9v4M12 16.5V17M6.34 17.66A8 8 0 1117.66 6.34 8 8 0 016.34 17.66z" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <h2 className="text-xl font-bold text-[#0D0D0D] mb-2">Oops, something went wrong</h2>
          <p className="text-sm text-[#888] mb-6">{errorMsg}</p>
          <button
            onClick={() => setStep('landing')}
            className="bg-[#0D0D0D] text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-[#333] transition-colors"
          >
            Try again
          </button>
        </div>
      </div>
    )
  }

  // REVIEWS STEP
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9F9F9] via-white to-[#EEF3FF] px-4 py-12">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-up">
          <div className="inline-flex items-center gap-2 bg-[#ECFDF5] text-[#059669] text-xs font-semibold px-4 py-2 rounded-full mb-4">
            <svg width="12" height="12" fill="none" viewBox="0 0 12 12">
              <path d="M2 6L4.5 8.5L10 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            5 reviews generated
          </div>
          <h2 className="text-2xl font-bold text-[#0D0D0D] mb-1" style={{fontFamily: 'Playfair Display, serif'}}>
            Pick your favourite
          </h2>
          <p className="text-sm text-[#888]">Edit any review, copy it, then post to Google</p>
        </div>

        {/* Review cards */}
        <div className="space-y-4 mb-6">
          {editedReviews.map((review, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-[#E8E8E8] p-5 shadow-sm hover:shadow-md hover:border-[#C7D7FF] transition-all animate-fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {[1,2,3,4,5].map(s => <StarIcon key={s} filled={true} />)}
              </div>

              {/* Editable review */}
              <textarea
                value={review}
                onChange={e => {
                  const updated = [...editedReviews]
                  updated[i] = e.target.value
                  setEditedReviews(updated)
                }}
                rows={3}
                className="w-full text-sm text-[#333] leading-relaxed resize-none outline-none bg-transparent placeholder:text-gray-300 mb-4"
                placeholder="Your review..."
              />

              {/* Actions */}
              <div className="flex gap-2 pt-3 border-t border-[#F0F0F0]">
                <button
                  onClick={() => copyReview(i)}
                  className={`flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold py-2.5 rounded-xl transition-all ${
                    copiedIndex === i
                      ? 'bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]'
                      : 'bg-[#F9F9F9] text-[#444] border border-[#E8E8E8] hover:bg-[#F0F0F0]'
                  }`}
                >
                  {copiedIndex === i ? (
                    <>
                      <svg width="11" height="11" fill="none" viewBox="0 0 11 11">
                        <path d="M1 5.5L3.5 8L10 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg width="11" height="11" fill="none" viewBox="0 0 11 11">
                        <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.2"/>
                        <path d="M2 7V2.5A1 1 0 013 1.5H7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                      </svg>
                      Copy review
                    </>
                  )}
                </button>
                <button
                  onClick={postToGoogle}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-[#1A56DB] text-white text-xs font-semibold py-2.5 rounded-xl hover:bg-[#1648C0] transition-colors"
                >
                  <svg width="11" height="11" fill="none" viewBox="0 0 11 11">
                    <path d="M5.5 1H9.5V5M9.5 1L4 6.5M4.5 2.5H1.5V9.5H8.5V6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Post to Google
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Sticky bottom post button */}
        <div className="sticky bottom-4">
          <button
            onClick={postToGoogle}
            className="w-full bg-[#0D0D0D] text-white py-4 rounded-full font-semibold text-sm shadow-2xl shadow-black/20 hover:bg-[#333] transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
          >
            Open Google Review Page
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <p className="text-center text-xs text-[#AAA] mt-3">Paste your copied review on the Google page</p>
        </div>

        <p className="text-center text-xs text-[#CCC] mt-6">
          Powered by <span className="text-[#AAA] font-medium">ReviewPilot AI</span>
        </p>
      </div>
    </div>
  )
}
