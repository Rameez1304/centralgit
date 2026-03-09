'use client'

import React, { useEffect, useState } from 'react'

type Props = {
  username: string
  slug: string
}

export default function InstagramQRResult({ username, slug }: Props) {
  const [posterUrl, setPosterUrl] = useState('')

  const qrUrl = `https://www.standeekart.com/instagram/${slug}`
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

    bg.src = '/templates/instagram-template.png'

    bg.onload = () => {
      ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

      qr.src = qrImage

      qr.onload = () => {
        ctx.textAlign = 'center'
        ctx.fillStyle = 'white'
        ctx.font = 'bold 28px Arial'

        // username above white box
        ctx.fillText(
          `@${username}`,
          400,
          300
        )

        // QR smaller and centered
        ctx.drawImage(qr, 250, 360, 300, 300)

        const finalImage = canvas.toDataURL('image/png')
        setPosterUrl(finalImage)
      }
    }
  }, [username, qrImage])

  return (
    <div className="mt-6">
      {posterUrl && (
        <>
          <img
            src={posterUrl}
            alt="Instagram Poster"
            className="rounded-lg border"
          />

          <a
            href={posterUrl}
            download={`${slug}-instagram.png`}
            className="block mt-3 w-full bg-black text-white py-2 rounded text-center"
          >
            Download Poster
          </a>
        </>
      )}
    </div>
  )
}
