'use client'

import React, { useEffect, useState } from 'react'

type Business = {
  id?: string
  business_name: string
  category?: string
  google_review_link?: string
  tone?: string
  slug: string
  instagram_username?: string
}

type CreateBusinessResponse = {
  business: Business
  qrCode?: string
}

type Props = {
  business?: Business
  result?: CreateBusinessResponse
  onReset?: () => void
}

export default function QRResult({ business, result, onReset }: Props) {
  const finalBusiness = business || result?.business
  const [posterUrl, setPosterUrl] = useState('')
  const [template, setTemplate] = useState<'google' | 'instagram'>('google')

  if (!finalBusiness) return null

  const qrUrl =
    template === 'google'
      ? `https://www.standeekart.com/review/${finalBusiness.slug}`
      : `https://www.instagram.com/${finalBusiness.instagram_username || finalBusiness.slug}`

  const qrImage = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(qrUrl)}`

  useEffect(() => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx) return

    canvas.width = 800
    canvas.height = 1200

    const bg = new Image()
    const qr = new Image()

    bg.crossOrigin = 'anonymous'
    qr.crossOrigin = 'anonymous'

    bg.src =
      template === 'google'
        ? '/templates/google-review-template.png'
        : '/templates/instagram-template.png'

    bg.onload = () => {
      ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

      qr.src = qrImage

      qr.onload = () => {
        ctx.textAlign = 'center'

        if (template === 'google') {
          ctx.font = 'bold 28px serif'
          ctx.fillStyle = 'black'

          ctx.fillText(
            finalBusiness.business_name.toUpperCase(),
            400,
            430
          )

          ctx.drawImage(qr, 210, 460, 380, 380)
        }

        if (template === 'instagram') {
          ctx.font = 'bold 30px Arial'
          ctx.fillStyle = 'white'

          ctx.drawImage(qr, 220, 360, 360, 360)

          ctx.fillText(
            `@${finalBusiness.instagram_username || finalBusiness.slug}`,
            400,
            980
          )
        }

        const finalImage = canvas.toDataURL('image/png')
        setPosterUrl(finalImage)
      }
    }
  }, [
    finalBusiness.business_name,
    finalBusiness.slug,
    finalBusiness.instagram_username,
    qrImage,
    template,
  ])

  return (
    <div className="rounded-xl border p-6 shadow-sm bg-white">
      <h2 className="text-xl font-semibold mb-4">QR Generated Successfully</h2>

      <div className="flex gap-3 mb-4">
        <button
          onClick={() => setTemplate('google')}
          className={`px-4 py-2 rounded ${
            template === 'google' ? 'bg-black text-white' : 'border'
          }`}
        >
          Google Poster
        </button>

        <button
          onClick={() => setTemplate('instagram')}
          className={`px-4 py-2 rounded ${
            template === 'instagram' ? 'bg-black text-white' : 'border'
          }`}
        >
          Instagram Poster
        </button>
      </div>

      {template === 'google' && (
        <p className="mb-2">
          <strong>Business:</strong> {finalBusiness.business_name}
        </p>
      )}

      {template === 'instagram' && (
        <p className="mb-2">
          <strong>Instagram:</strong> @{finalBusiness.instagram_username || finalBusiness.slug}
        </p>
      )}

      {posterUrl && (
        <div className="mt-6">
          <p className="text-sm text-gray-500 mb-2">Poster Preview</p>

          <img
            src={posterUrl}
            alt="QR Poster"
            className="rounded-lg border"
          />

          <a
            href={posterUrl}
            download={`${finalBusiness.slug}-${template}.png`}
            className="block mt-3 w-full bg-black text-white py-2 rounded text-center"
          >
            Download Poster
          </a>
        </div>
      )}

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500 mb-2">Shareable Link</p>

        <div className="border rounded-lg p-3 bg-gray-50 break-all text-sm">
          {qrUrl}
        </div>

        <button
          onClick={() => navigator.clipboard.writeText(qrUrl)}
          className="mt-3 w-full bg-black text-white py-2 rounded"
        >
          Copy Link
        </button>

        <a
          href={qrUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-3 text-blue-600 underline"
        >
          Open Link
        </a>
      </div>

      <a
        href={qrImage}
        download
        className="inline-block rounded-lg px-4 py-2 border mr-3 mt-4"
      >
        Download QR
      </a>

      {onReset && (
        <button
          onClick={onReset}
          className="inline-block rounded-lg px-4 py-2 border mt-4"
        >
          Create Another
        </button>
      )}
    </div>
  )
}
