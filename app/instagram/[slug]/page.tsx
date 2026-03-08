'use client'

import { useEffect, useState } from 'react'

export default function InstagramSlugPage({
  params,
}: {
  params: { slug: string }
}) {
  const [instagramUrl, setInstagramUrl] = useState('')
  const [comment, setComment] = useState('')

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/instagram-link/${params.slug}`)
      const data = await res.json()

      setInstagramUrl(data.instagram_url)

      const ai = await fetch('/api/generate-instagram-comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          businessName: data.business_name
        })
      })

      const aiData = await ai.json()
      setComment(aiData.comment)
    }

    load()
  }, [params.slug])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full border rounded-xl p-8">
        <h1 className="text-2xl font-bold mb-4">
          AI Suggested Comment
        </h1>

        <textarea
          value={comment}
          readOnly
          className="w-full border p-3 rounded mb-4"
        />

        <button
          onClick={() => navigator.clipboard.writeText(comment)}
          className="bg-green-600 text-white px-4 py-2 rounded mr-2"
        >
          Copy
        </button>

        <a
          href={instagramUrl}
          target="_blank"
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          Open Instagram
        </a>
      </div>
    </div>
  )
}
