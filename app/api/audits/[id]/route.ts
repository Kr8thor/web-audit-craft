import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createSupabaseServerClient()
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    // Get the audit
    const { data: audit, error: fetchError } = await supabase
      .from('audits')
      .select('*')
      .eq('id', params.id)
      .eq('user_id', user.id)
      .single()
    
    if (fetchError || !audit) {
      return NextResponse.json(
        { error: 'Audit not found' },
        { status: 404 }
      )
    }
    
    // Format the response
    const response = {
      id: audit.id,
      url: audit.url,
      status: audit.status,
      createdAt: audit.created_at,
      completedAt: audit.completed_at,
      score: audit.score,
      results: audit.results,
    }
    
    return NextResponse.json(response)
    
  } catch (error: any) {
    console.error('Audit fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
