import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import ReviewPageClient from './ReviewPageClient'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data: business } = await supabase
    .from('businesses')
    .select('business_name, category')
    .eq('slug', params.slug)
    .single()

  if (!business) return { title: 'Review' }

  return {
    title: `Share Your Experience — ${business.business_name}`,
    description: `Leave a review for ${business.business_name}`,
  }
}

export default async function ReviewPage({ params }: Props) {
  const { data: business } = await supabase
    .from('businesses')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (!business) notFound()

  return <ReviewPageClient business={business} />
}
