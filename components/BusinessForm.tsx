'use client'

import { useState } from 'react'

export default function ReviewFlow({
  googleReviewUrl,
}: {
  googleReviewUrl: string
}) {
  const [rating, setRating] = useState<number | null>(null)
  const [feedback, setFeedback] = useState('')
  const [review, setReview] = useState('')

  const generateAIReview = () => {
    if (rating === 4) {
      setReview('Very good experience, staff was polite and service was smooth.')
    } else if (rating === 5) {
      setReview('Excellent experience! Highly recommended, great service and friendly staff.')
    }
  }

  const submitFeedback = async () => {
    await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        rating,
        feedback,
      }),
    })

    alert('Thanks for your feedback.')
  }

  return (
    <div className="max-w-md mx-auto p-6">

      {!rating && (
        <>
          <h2 className="text-xl font-bold mb-4">How was your experience?</h2>

          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => {
                  setRating(star)
                  if (star >= 4) generateAIReview()
                }}
                className="text-3xl"
              >
                ⭐
              </button>
            ))}
          </div>
        </>
      )}

      {rating && rating <= 3 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Tell us what went wrong</h3>

          <textarea
            className="w-full border p-2 rounded"
            rows={4}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />

          <button
            onClick={submitFeedback}
            className="mt-4 px-4 py-2 bg-black text-white rounded"
          >
            Submit Feedback
          </button>
        </div>
      )}

      {rating && rating >= 4 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Suggested Review</h3>

          <textarea
            className="w-full border p-2 rounded"
            rows={4}
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />

          <button
            onClick={() => navigator.clipboard.writeText(review)}
            className="mt-4 px-4 py-2 bg-black text-white rounded"
          >
            Copy Review
          </button>

          <a
            href={googleReviewUrl}
            target="_blank"
            className="block mt-4 text-blue-600 underline"
          >
            Post on Google
          </a>
        </div>
      )}
    </div>
  )
}
