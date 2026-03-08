'use client'

import { useState } from 'react'

export default function InstagramPage() {
  const [postUrl, setPostUrl] = useState('')
  const [qrUrl, setQrUrl] = useState('')
  const [comment, setComment] = useState('')

  const comments = [
    'Amazing post 🔥',
    'Looks premium 👏',
    'Loved this ❤️',
    'Very useful 🙌',
    'Great content 🚀'
  ]

  async function generateQR() {
    if (!postUrl) return

    const res = await fetch('/api/generate-qr', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url: postUrl })
    })

    const data = await res.json()
    setQrUrl(data.qrCodeUrl)
  }

  function generateComment() {
    const random =
      comments[Math.floor(Math.random() * comments.length)]
    setComment(random)
  }

  function copyComment() {
    navigator.clipboard.writeText(comment)
  }

  return (
    <div className="min-h-screen p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Instagram QR Comment Generator
      </h1>

      <input
        type="text"
        placeholder="Paste Instagram post URL"
        value={postUrl}
        onChange={(e) => setPostUrl(e.target.value)}
        className="w-full border p-3 rounded mb-4"
      />

      <button
        onClick={generateQR}
        className="bg-black text-white px-4 py-2 rounded mb-4"
      >
        Generate QR
      </button>

      {qrUrl && (
        <img
          src={qrUrl}
          alt="QR Code"
          className="w-56 h-56 mb-4"
        />
      )}

      <button
        onClick={generateComment}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        Generate Comment
      </button>

      {comment && (
        <div>
          <textarea
            value={comment}
            readOnly
            className="w-full border p-3 rounded mb-3"
          />

          <button
            onClick={copyComment}
            className="bg-green-600 text-white px-4 py-2 rounded mr-2"
          >
            Copy
          </button>

          <a
            href={postUrl}
            target="_blank"
            className="bg-purple-600 text-white px-4 py-2 rounded"
          >
            Open Instagram
          </a>
        </div>
      )}
    </div>
  )
}
