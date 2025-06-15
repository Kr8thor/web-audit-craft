import { createSupabaseServerClient } from './supabase'

export interface RateLimitResult {
  allowed: boolean
  used: number
  limit: number
}

const PLAN_LIMITS = {
  free: 5,
  pro: 100,
  agency: 1000,
}

export async function checkRateLimit(userId: string): Promise<RateLimitResult> {
  const supabase = createSupabaseServerClient()
  
  // Get user's plan from auth metadata
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  
  if (userError || !user) {
    throw new Error('User not authenticated')
  }
  
  const plan = user.user_metadata?.plan || 'free'
  const limit = PLAN_LIMITS[plan as keyof typeof PLAN_LIMITS] || PLAN_LIMITS.free
  
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0]
  
  // Get or create usage record for today
  const { data: usage, error: usageError } = await supabase
    .from('usage')
    .select('count')
    .eq('user_id', userId)
    .eq('date', today)
    .single()
  
  if (usageError && usageError.code !== 'PGRST116') { // PGRST116 = no rows returned
    throw new Error('Failed to check rate limit')
  }
  
  const currentCount = usage?.count || 0
  
  if (currentCount >= limit) {
    return {
      allowed: false,
      used: currentCount,
      limit,
    }
  }
  
  // Increment usage count
  if (usage) {
    const { error: updateError } = await supabase
      .from('usage')
      .update({ count: currentCount + 1 })
      .eq('user_id', userId)
      .eq('date', today)
    
    if (updateError) {
      throw new Error('Failed to update usage count')
    }
  } else {
    const { error: insertError } = await supabase
      .from('usage')
      .insert({
        user_id: userId,
        date: today,
        count: 1,
      })
    
    if (insertError) {
      throw new Error('Failed to create usage record')
    }
  }
  
  return {
    allowed: true,
    used: currentCount + 1,
    limit,
  }
}
