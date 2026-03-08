'use client'

import { useState } from 'react'
import { QRCodeCanvas } from 'qrcode.react'

export default function InstagramPage() {
  const [postUrl, setPostUrl] = useState('')
  const [comment, setComment] = useState('')

  const comments = [
    'Amazing post 🔥',
    'Looks premium 👏',
    'Loved this ❤️',
    'Very useful 🙌',
    'Great content 🚀'
  ]

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

      {postUrl && (
        <div className="mb-6">
          <QRCodeCanvas value={postUrl} size={220} />
        </div>
      )}

      <button
        onClick={generateComment}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Generate Comment
      </button>

      {comment && (
        <div className="mt-4">
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
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Open Instagram
          </a>
        </div>
      )}
    </div>
  )
}
