'use client'

import { useState } from 'react'
import WhatsAppQRResult from '@/components/WhatsAppQRResult'

export default function WhatsAppPage() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [showPoster, setShowPoster] = useState(false)

  return (
    <div className="min-h-screen p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        WhatsApp QR Generator
      </h1>

      <input
        type="text"
        placeholder="Business Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border p-3 rounded mb-4"
      />

      <input
        type="text"
        placeholder="WhatsApp Number (919876543210)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full border p-3 rounded mb-4"
      />

      <button
        onClick={() => setShowPoster(true)}
        className="bg-black text-white px-4 py-2 rounded mb-4"
      >
        Generate QR
      </button>

      {showPoster && (
        <WhatsAppQRResult phone={phone} name={name} />
      )}
    </div>
  )
}
