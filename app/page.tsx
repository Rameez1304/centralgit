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
            <span className="font-semibold text-[15px] tracking-tight text-[#0D0D0D]">Standeekart</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-sm text-[#888] hover:text-[#0D0D0D] transition-colors">How it works</a>
            <a href="#pricing" className="text-sm text-[#888] hover:text-[#0D0D0D] transition-colors">Pricing</a>
            <a href="#create" className="text-sm bg-[#0D0D0D] text-white px-4 py-2 rounded-full hover:bg-[#333] transition-colors">Get started</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        {/* Background gradient blobs */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-[#EEF3FF] via-[#f8f9ff] to-transparent rounded-full blur-3xl opacity-70 pointer-events-none" />
        <div className="absolute top-40 right-0 w-96 h-96 bg-[#e8f5ff] rounded-full blur-3xl opacity-40 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#EEF3FF] text-[#1A56DB] text-xs font-medium px-4 py-2 rounded-full mb-8 animate-fade-in">
            <span className="w-1.5 h-1.5 bg-[#1A56DB] rounded-full animate-pulse" />
            AI-powered · Takes 60 seconds
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-[#0D0D0D] mb-6 animate-fade-up" style={{fontFamily: 'Playfair Display, serif', lineHeight: '1.1'}}>
            Turn Customer Scans<br />
            <span className="relative inline-block">
              Into Google Reviews
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 400 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 8.5C80 3 180 1.5 398 9.5" stroke="#1A56DB" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </span>
          </h1>

          <p className="text-lg md:text-xl text-[#666] max-w-2xl mx-auto mb-10 animate-fade-up delay-100" style={{fontFamily: 'DM Sans, sans-serif', fontWeight: 300}}>
            Generate AI-powered QR codes that help customers leave genuine reviews in seconds. No app download. No friction. Just scans and stars.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-up delay-200">
            <a
              href="#create"
              className="inline-flex items-center justify-center gap-2 bg-[#0D0D0D] text-white px-8 py-4 rounded-full text-sm font-semibold hover:bg-[#333] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-black/10"
            >
              Generate My QR Code
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#0D0D0D] border border-[#E8E8E8] px-8 py-4 rounded-full text-sm font-semibold hover:bg-[#F9F9F9] transition-all"
            >
              See how it works
            </a>
          </div>

          {/* Social proof */}
          <div className="flex items-center justify-center gap-6 mt-12 animate-fade-up delay-300">
            <div className="flex -space-x-2">
              {['#FFB347', '#87CEEB', '#98D8C8', '#DDA0DD'].map((c, i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white" style={{background: c}} />
              ))}
            </div>
            <p className="text-sm text-[#888]">
              <span className="font-semibold text-[#0D0D0D]">1,200+</span> businesses generating reviews
            </p>
          </div>
        </div>

        {/* Hero mockup card */}
        <div className="relative max-w-sm mx-auto mt-16 animate-fade-up delay-400">
          <div className="bg-white rounded-2xl shadow-2xl shadow-black/8 border border-[#E8E8E8] p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#EEF3FF] rounded-xl flex items-center justify-center">
                <span className="text-lg">☕</span>
              </div>
              <div>
                <p className="font-semibold text-sm text-[#0D0D0D]">Blue Door Café</p>
                <p className="text-xs text-[#888]">Coffee Shop · Mumbai</p>
              </div>
            </div>
            <div className="bg-[#F9F9F9] rounded-xl p-3 mb-4">
              <p className="text-xs text-[#888] mb-1">AI-suggested review</p>
              <p className="text-sm text-[#444] leading-relaxed">"Honestly one of the best cappuccinos I've had in the city. The corner seating is perfect for work..."</p>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 bg-[#EEF3FF] text-[#1A56DB] text-xs font-medium py-2 rounded-lg">Copy review</button>
              <button className="flex-1 bg-[#1A56DB] text-white text-xs font-medium py-2 rounded-lg">Post to Google</button>
            </div>
          </div>
          {/* floating badge */}
          <div className="absolute -top-3 -right-3 bg-[#059669] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
            ★ 5 stars generated
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24 px-6 bg-[#F9F9F9]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-widest text-[#1A56DB] uppercase mb-3">Simple process</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0D0D0D]" style={{fontFamily: 'Playfair Display, serif'}}>
              Three steps to more reviews
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                icon: '🏢',
                title: 'Create your QR',
                desc: 'Enter your business name, category, and Google review link. We generate a unique QR code instantly.',
                color: '#EEF3FF',
                accent: '#1A56DB',
              },
              {
                step: '02',
                icon: '📱',
                title: 'Customer scans',
                desc: 'Print and display your QR at checkout, tables, receipts, or packaging. Any camera app scans it.',
                color: '#ECFDF5',
                accent: '#059669',
              },
              {
                step: '03',
                icon: '✨',
                title: 'AI suggests reviews',
                desc: 'Customers get 5 personalised review options. They pick one, copy it, and post to Google in seconds.',
                color: '#FFFBEB',
                accent: '#D97706',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-white rounded-2xl p-8 border border-[#E8E8E8] hover:shadow-lg hover:shadow-black/5 transition-all hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{background: item.color}}>
                    {item.icon}
                  </div>
                  <span className="text-3xl font-bold" style={{color: item.color.replace('FF', 'CC'), fontFamily: 'Playfair Display, serif'}}>
                    {item.step}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-[#0D0D0D] mb-2" style={{fontFamily: 'Playfair Display, serif'}}>{item.title}</h3>
                <p className="text-sm text-[#666] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUSINESS FORM */}
      <section id="create" className="py-24 px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-widest text-[#1A56DB] uppercase mb-3">Ready in 60 seconds</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0D0D0D] mb-4" style={{fontFamily: 'Playfair Display, serif'}}>
              Generate My QR Code
            </h2>
            <p className="text-[#666]">Fill in your details and we'll generate a unique QR code instantly.</p>
          </div>
          <BusinessForm />
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 px-6 bg-[#F9F9F9]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-widest text-[#1A56DB] uppercase mb-3">Pricing</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0D0D0D]" style={{fontFamily: 'Playfair Display, serif'}}>
              Simple, transparent pricing
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Starter',
                price: 'Free',
                period: 'forever',
                desc: 'Perfect for testing the waters',
                features: ['1 business QR code', '50 AI review generations/mo', 'PNG download', 'Basic analytics'],
                cta: 'Get started free',
                highlight: false,
              },
              {
                name: 'Growth',
                price: '₹999',
                period: '/ month',
                desc: 'For serious local businesses',
                features: ['5 business QR codes', 'Unlimited AI generations', 'PNG + SVG download', 'Analytics dashboard', 'Priority support'],
                cta: 'Start free trial',
                highlight: true,
              },
              {
                name: 'Agency',
                price: '₹2,999',
                period: '/ month',
                desc: 'Manage multiple clients',
                features: ['Unlimited QR codes', 'Unlimited AI generations', 'White-label option', 'Team access', 'Dedicated support'],
                cta: 'Contact us',
                highlight: false,
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-8 border transition-all ${
                  plan.highlight
                    ? 'bg-[#0D0D0D] border-[#0D0D0D] text-white shadow-2xl shadow-black/20 scale-[1.02]'
                    : 'bg-white border-[#E8E8E8] hover:shadow-lg hover:shadow-black/5'
                }`}
              >
                {plan.highlight && (
                  <div className="inline-block bg-[#1A56DB] text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                    Most popular
                  </div>
                )}
                <p className={`text-sm font-medium mb-1 ${plan.highlight ? 'text-gray-400' : 'text-[#888]'}`}>{plan.name}</p>
                <div className="flex items-end gap-1 mb-2">
                  <span className={`text-4xl font-bold ${plan.highlight ? 'text-white' : 'text-[#0D0D0D]'}`} style={{fontFamily: 'Playfair Display, serif'}}>{plan.price}</span>
                  <span className={`text-sm mb-1.5 ${plan.highlight ? 'text-gray-400' : 'text-[#888]'}`}>{plan.period}</span>
                </div>
                <p className={`text-sm mb-6 ${plan.highlight ? 'text-gray-400' : 'text-[#666]'}`}>{plan.desc}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2 7L5.5 10.5L12 4" stroke={plan.highlight ? '#34D399' : '#059669'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className={plan.highlight ? 'text-gray-300' : 'text-[#444]'}>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-full text-sm font-semibold transition-all ${
                    plan.highlight
                      ? 'bg-white text-[#0D0D0D] hover:bg-gray-100'
                      : 'bg-[#0D0D0D] text-white hover:bg-[#333]'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 border-t border-[#E8E8E8]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#1A56DB] rounded-md flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path d="M7 1L8.5 5H13L9.5 7.5L11 11.5L7 9L3 11.5L4.5 7.5L1 5H5.5L7 1Z" fill="white"/>
              </svg>
            </div>
            <span className="font-semibold text-sm text-[#0D0D0D]">Standeekart</span>
          </div>
          <p className="text-sm text-[#888]">© {new Date().getFullYear()} Standeekart. Built to grow your reputation.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-[#888] hover:text-[#0D0D0D] transition-colors">Privacy</a>
            <a href="#" className="text-sm text-[#888] hover:text-[#0D0D0D] transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
