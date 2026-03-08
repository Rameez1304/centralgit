'use client'

import { useEffect, useState } from 'react'

export default function InstagramSlugPage({
  params,
}: {
  params: { slug: string }
}) {
  const [comment, setComment] = useState('')
  const [instagramUrl, setInstagramUrl] = useState('')

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
          businessName: 'Cafe'
        })
      })

      const aiData = await ai.json()
      setComment(aiData.comment)
    }

    load()
  }, [params.slug])

  function copyComment() {
    navigator.clipboard.writeText(comment)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="max-w-md w-full border rounded-2xl p-8 shadow-lg">
        <h1 className="text-2xl font-bold mb-4">
          AI Suggested Comment
        </h1>

        <textarea
          readOnly
          value={comment}
          className="w-full border p-3 rounded mb-4"
        />

        <button
          onClick={copyComment}
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
