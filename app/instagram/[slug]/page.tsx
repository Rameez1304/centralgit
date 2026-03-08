'use client'

import { useEffect, useState } from 'react'

export default function InstagramSlugPage({
  params,
}: {
  params: { slug: string }
}) {
  const [instagramUrl, setInstagramUrl] = useState('')
  const [comments, setComments] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/instagram-link/${params.slug}`)
        const data = await res.json()

        if (!data?.instagram_url) {
          setComments([
            'Loved this ❤️',
            'Looks amazing 🔥',
            'Very nice 👏'
          ])
          setLoading(false)
          return
        }

        setInstagramUrl(data.instagram_url)

        const ai = await fetch('/api/generate-instagram-comment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            businessName: data.business_name,
            category: data.category
          })
        })

        const aiData = await ai.json()

        setComments(
          aiData.comments || [
            'Loved this ❤️',
            'Looks amazing 🔥',
            'Very nice 👏',
            'Need to visit soon',
            'Great vibe ❤️'
          ]
        )
      } catch {
        setComments([
          'Loved this ❤️',
          'Looks amazing 🔥',
          'Very nice 👏',
          'Need to visit soon',
          'Great vibe ❤️'
        ])
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [params.slug])

  function copyComment(text: string) {
    navigator.clipboard.writeText(text)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading...
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="max-w-md w-full border rounded-2xl p-8 shadow-lg">
        <h1 className="text-2xl font-bold mb-4">
          AI Suggested Comments
        </h1>

        <div className="space-y-3">
          {comments.map((comment, i) => (
            <div key={i} className="border p-3 rounded">
              <p className="mb-3">{comment}</p>

              <button
                onClick={() => copyComment(comment)}
                className="bg-green-600 text-white px-3 py-1 rounded mr-2"
              >
                Copy
              </button>

              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-purple-600 text-white px-3 py-1 rounded"
              >
                Open Instagram
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
