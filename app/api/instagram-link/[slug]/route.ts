import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const { data } = await supabase
    .from('instagram_links')
    .select('*')
    .eq('slug', params.slug)
    .single()

  return NextResponse.json(data)
}
