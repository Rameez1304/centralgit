'use client'

import { useState } from 'react'

export default function ReviewPageClient({
  business,
}: {
  business: any
}) {
  const [rating, setRating] = useState<number | null>(null)
  const [feedback, setFeedback] = useState('')
  const [review, setReview] = useState('')

  const generateAIReview = (selectedRating: number) => {
    if (selectedRating === 4) {
      setReview('Very good experience, staff was polite and service was smooth.')
    } else if (selectedRating === 5) {
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
        business: business?.name,
      }),
    })

    alert('Thanks for your feedback')
  }

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-xl shadow">

      {!rating && (
        <>
          <h2 className="text-2xl font-bold mb-2 text-center">
            {business?.name}
          </h2>

          <p className="text-center text-gray-500 mb-6">
            {business?.category || 'How was your experience?'}
          </p>

          <div className="flex justify-center gap-3 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => {
                  setRating(star)
                  if (star >= 4) generateAIReview(star)
                }}
                className="text-4xl hover:scale-110 transition"
              >
                ⭐
              </button>
            ))}
          </div>

          <p className="text-center text-sm text-gray-400">
            Tap a star to continue
          </p>
        </>
      )}

      {rating && rating <= 3 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 text-center">
            Tell us what went wrong
          </h3>

          <textarea
            className="w-full border rounded p-2"
            rows={4}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />

          <button
            onClick={submitFeedback}
            className="mt-4 w-full bg-black text-white py-2 rounded"
          >
            Submit Feedback
          </button>
        </div>
      )}

      {rating && rating >= 4 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 text-center">
            Suggested Review
          </h3>

          <textarea
            className="w-full border rounded p-2"
            rows={4}
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />

          <button
            onClick={() => navigator.clipboard.writeText(review)}
            className="mt-4 w-full bg-black text-white py-2 rounded"
          >
            Copy Review
          </button>

          {business?.googleReviewUrl && (
            <a
              href={business.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-4 text-center text-blue-600 underline"
            >
              Post on Google
            </a>
          )}
        </div>
      )}
    </div>
  )
}
