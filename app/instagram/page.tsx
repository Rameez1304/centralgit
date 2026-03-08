'use client'

import { useState } from 'react'

export default function InstagramPage() {
  const [businessName, setBusinessName] = useState('')
  const [category, setCategory] = useState('')
  const [instagramUrl, setInstagramUrl] = useState('')
  const [qrUrl, setQrUrl] = useState('')

  async function generateQR() {
    const res = await fetch('/api/create-instagram', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        business_name: businessName,
        category,
        instagram_url: instagramUrl
      })
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
        placeholder="Business name"
        value={businessName}
        onChange={(e) => setBusinessName(e.target.value)}
        className="w-full border p-3 rounded mb-3"
      />

      <input
        placeholder="Category (Cafe, Retail...)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full border p-3 rounded mb-3"
      />

      <input
        placeholder="Instagram post URL"
        value={instagramUrl}
        onChange={(e) => setInstagramUrl(e.target.value)}
        className="w-full border p-3 rounded mb-4"
      />

      <button
        onClick={generateQR}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Generate QR
      </button>

      {qrUrl && (
        <img src={qrUrl} className="w-56 h-56 mt-4" />
      )}
    </div>
  )
}
