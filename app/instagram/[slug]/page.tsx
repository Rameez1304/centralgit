'use client'

import { useState } from 'react'

export default function InstagramPage() {
  const [postUrl, setPostUrl] = useState('')
  const [qrUrl, setQrUrl] = useState('')

  async function generateQR() {
    const res = await fetch('/api/create-instagram', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url: postUrl })
    })

    const data = await res.json()
    setQrUrl(data.qrDataUrl)
  }

  return (
    <div className="min-h-screen p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Instagram QR Generator
      </h1>

      <input
        type="text"
        value={postUrl}
        onChange={(e) => setPostUrl(e.target.value)}
        placeholder="Paste Instagram post URL"
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
          alt="QR"
          className="w-56 h-56"
        />
      )}
    </div>
  )
}
