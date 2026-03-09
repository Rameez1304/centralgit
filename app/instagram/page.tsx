'use client'

import { useState } from 'react'
import InstagramQRResult from '@/components/InstagramQRResult'

export default function InstagramPage() {
  const [businessName, setBusinessName] = useState('')
  const [category, setCategory] = useState('')
  const [instagramUrl, setInstagramUrl] = useState('')
  const [qrUrl, setQrUrl] = useState('')
  const [landingUrl, setLandingUrl] = useState('')
  const [slug, setSlug] = useState('')

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
    setSlug(data.slug)

    setLandingUrl(
      `https://www.standeekart.com/instagram/${data.slug}`
    )
  }

  function copyLink() {
    navigator.clipboard.writeText(landingUrl)
  }

  return (
    <div className="min-h-screen p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Instagram QR Generator
      </h1>

      <input
        type="text"
        placeholder="Business name"
        value={businessName}
        onChange={(e) => setBusinessName(e.target.value)}
        className="w-full border p-3 rounded mb-4"
      />

      <input
        type="text"
        placeholder="Category (Cafe, Retail...)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full border p-3 rounded mb-4"
      />

      <input
        type="text"
        placeholder="Instagram post URL"
        value={instagramUrl}
        onChange={(e) => setInstagramUrl(e.target.value)}
        className="w-full border p-3 rounded mb-4"
      />

      <button
        onClick={generateQR}
        className="bg-black text-white px-4 py-2 rounded mb-4"
      >
        Generate QR
      </button>

      {qrUrl && (
        <>
          <img
            src={qrUrl}
            alt="QR"
            className="w-56 h-56 mb-4"
          />

          <div className="border p-3 rounded mb-3 break-all text-sm">
            {landingUrl}
          </div>

          <button
            onClick={copyLink}
            className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
          >
            Copy Link
          </button>

          <InstagramQRResult
            username={businessName}
            slug={slug}
          />
        </>
      )}
    </div>
  )
}
