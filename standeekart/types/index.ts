export type Tone = 'friendly' | 'professional' | 'short'

export interface Business {
  id: string
  business_name: string
  category: string
  google_review_link: string
  tone: Tone
  slug: string
  created_at: string
}

export interface GenerateReviewRequest {
  businessName: string
  category: string
  tone: Tone
}

export interface GenerateReviewResponse {
  reviews: string[]
}

export interface CreateBusinessRequest {
  business_name: string
  category: string
  google_review_link: string
  tone: Tone
}

export interface CreateBusinessResponse {
  business: Business
  qrDataUrl: string
}
