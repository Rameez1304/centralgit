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
  const [loading, setLoading] = useState(false)

  const generateAIReview = async (selectedRating: number) => {
    setLoading(true)

    try {
      const res = await fetch('/api/generate-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName: business.business_name,
          category: business.category,
          tone: business.tone,
          rating: selectedRating,
        }),
      })

      const data = await res.json()

      if (data.reviews && data.reviews.length > 0) {
        setReview(data.reviews[0])
      } else {
        setReview('Excellent experience! Highly recommended.')
      }
    } catch (error) {
      console.error(error)
      setReview('Excellent experience! Highly recommended.')
    }

    setLoading(false)
  }

  const submitFeedback = async () => {
    await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        rating,
        feedback,
        business: business?.business_name,
      }),
    })

    alert('Thanks for your feedback')
  }

  const handleCopyAndRedirect = async () => {
    await navigator.clipboard.writeText(review)

    console.log('Google URL:', business?.google_review_url)

    if (business?.google_review_url) {
      window.location.href = business.google_review_url
    } else {
      alert('Google review link missing')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-xl shadow">

      {!rating && (
        <>
          <h2 className="text-2xl font-bold text-center mb-2">
            {business?.business_name}
          </h2>

          <p className="text-center text-gray-500 mb-6">
            {business?.category}
          </p>

          <div className="flex justify-center gap-3 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={async () => {
                  setRating(star)

                  if (star >= 4) {
                    await generateAIReview(star)
                  }
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
          <h3 className="text-lg font-semibold text-center mb-2">
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
          <h3 className="text-lg font-semibold text-center mb-2">
            Suggested Review
          </h3>

          {loading ? (
            <div className="text-center py-6">
              <div className="animate-spin inline-block text-3xl">⭐</div>
              <p className="text-gray-500 mt-2">Generating AI review...</p>
            </div>
          ) : (
            <>
              <textarea
                className="w-full border rounded p-2"
                rows={4}
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />

              <button
                onClick={handleCopyAndRedirect}
                className="mt-4 w-full bg-black text-white py-2 rounded"
              >
                Copy Review & Post on Google
              </button>

              {business?.google_review_url && (
                <a
                  href={business.google_review_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-4 text-center text-blue-600 underline"
                >
                  Open Google Review Page
                </a>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}
