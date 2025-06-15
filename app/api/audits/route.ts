import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase'
import { checkRateLimit } from '@/lib/rate-limit'
import { processAudit } from '@/lib/audit-processor'

export async function POST(request: NextRequest) {
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
    
    // Parse request body
    const body = await request.json()
    const { url } = body
    
    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      )
    }
    
    // Validate URL
    try {
      new URL(url)
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      )
    }
    
    // Check rate limit
    const rateLimit = await checkRateLimit(user.id)
    
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded. Upgrade to Pro for more audits',
          usage: {
            used: rateLimit.used,
            limit: rateLimit.limit,
          },
        },
        { status: 429 }
      )
    }
    
    // Create audit record
    const { data: audit, error: createError } = await supabase
      .from('audits')
      .insert({
        url,
        user_id: user.id,
        status: 'processing',
      })
      .select()
      .single()
    
    if (createError || !audit) {
      return NextResponse.json(
        { error: 'Failed to create audit' },
        { status: 500 }
      )
    }
    
    // Start background processing
    processAudit(audit.id, url, user.id).catch(console.error)
    
    return NextResponse.json({
      auditId: audit.id,
      status: 'processing',
    })
    
  } catch (error: any) {
    console.error('Audit creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
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
    
    // Get user's audits
    const { data: audits, error: fetchError } = await supabase
      .from('audits')
      .select('id, url, status, created_at, score')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(50)
    
    if (fetchError) {
      return NextResponse.json(
        { error: 'Failed to fetch audits' },
        { status: 500 }
      )
    }
    
    // Format the response
    const formattedAudits = audits.map(audit => ({
      id: audit.id,
      url: audit.url,
      status: audit.status,
      createdAt: audit.created_at,
      score: audit.score,
    }))
    
    return NextResponse.json(formattedAudits)
    
  } catch (error: any) {
    console.error('Audit fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
