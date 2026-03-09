import Link from 'next/link'
import BusinessForm from '@/components/BusinessForm'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#E8E8E8]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#1A56DB] rounded-lg flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1L8.5 5H13L9.5 7.5L11 11.5L7 9L3 11.5L4.5 7.5L1 5H5.5L7 1Z" fill="white"/>
              </svg>
            </div>
            <span className="font-semibold text-[15px] tracking-tight text-[#0D0D0D]">
              Standeekart
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/instagram" className="text-sm text-[#888] hover:text-[#0D0D0D]">
              Instagram QR
            </Link>

            <Link href="/whatsapp" className="text-sm text-[#888] hover:text-[#0D0D0D]">
              WhatsApp QR
            </Link>

            <a
              href="#create"
              className="text-sm bg-[#0D0D0D] text-white px-4 py-2 rounded-full"
            >
              Get started
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative pt-28 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">

          <h1 className="text-5xl md:text-6xl font-bold text-[#0D0D0D] leading-tight mb-5">
            Turn Customer Scans
            <br />
            Into Reviews & Engagement
          </h1>

          <p className="text-lg text-[#666] max-w-2xl mx-auto mb-8">
            Create QR posters for Google reviews, Instagram engagement, and WhatsApp chat.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">

            <a
              href="#create"
              className="inline-flex items-center justify-center bg-[#0D0D0D] text-white px-8 py-4 rounded-full text-sm font-semibold"
            >
              Google QR
            </a>

            <Link
              href="/instagram"
              className="inline-flex items-center justify-center bg-[#1A56DB] text-white px-8 py-4 rounded-full text-sm font-semibold"
            >
              Instagram QR
            </Link>

            <Link
              href="/whatsapp"
              className="inline-flex items-center justify-center bg-[#25D366] text-white px-8 py-4 rounded-full text-sm font-semibold"
            >
              WhatsApp QR
            </Link>

          </div>
        </div>
      </section>

      {/* QR OPTIONS */}
      <section id="create" className="py-16 px-6 bg-white">
        <div className="max-w-2xl mx-auto">

          <div className="grid md:grid-cols-3 gap-4 mb-8">

            <div className="border border-[#E8E8E8] rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-2">Google Review QR</h3>
              <p className="text-sm text-[#666]">
                Generate AI review QR for your business.
              </p>
            </div>

            <Link
              href="/instagram"
              className="border border-[#E8E8E8] rounded-2xl p-6 hover:shadow-lg transition-all"
            >
              <h3 className="text-lg font-semibold mb-2">Instagram QR</h3>
              <p className="text-sm text-[#666]">
                QR posters for Instagram engagement.
              </p>
            </Link>

            <Link
              href="/whatsapp"
              className="border border-[#E8E8E8] rounded-2xl p-6 hover:shadow-lg transition-all"
            >
              <h3 className="text-lg font-semibold mb-2">WhatsApp QR</h3>
              <p className="text-sm text-[#666]">
                Direct customers to WhatsApp instantly.
              </p>
            </Link>

          </div>

          <BusinessForm />
        </div>
      </section>
    </div>
  )
}
