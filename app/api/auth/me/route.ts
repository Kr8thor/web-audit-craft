import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const supabase = createSupabaseServerClient()
    
    // Get the current user
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    // Get today's usage
    const today = new Date().toISOString().split('T')[0]
    const { data: usage } = await supabase
      .from('usage')
      .select('count')
      .eq('user_id', user.id)
      .eq('date', today)
      .single()
    
    const plan = user.user_metadata?.plan || 'free'
    const PLAN_LIMITS = {
      free: 5,
      pro: 100,
      agency: 1000,
    }
    
    return NextResponse.json({
      id: user.id,
      email: user.email!,
      plan,
      usage: {
        today: usage?.count || 0,
        limit: PLAN_LIMITS[plan as keyof typeof PLAN_LIMITS] || PLAN_LIMITS.free,
      },
    })
    
  } catch (error: any) {
    console.error('Auth check error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
