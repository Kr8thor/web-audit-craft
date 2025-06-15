import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase'
import { addSSEConnection, removeSSEConnection } from '@/lib/audit-processor'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const encoder = new TextEncoder()
  
  // Create a readable stream for SSE
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const supabase = createSupabaseServerClient()
        
        // Check authentication
        const { data: { user }, error: authError } = await supabase.auth.getUser()
        
        if (authError || !user) {
          controller.enqueue(encoder.encode('data: {"error": "Unauthorized"}\n\n'))
          controller.close()
          return
        }
        
        // Verify audit belongs to user
        const { data: audit, error: fetchError } = await supabase
          .from('audits')
          .select('status, results')
          .eq('id', params.id)
          .eq('user_id', user.id)
          .single()
        
        if (fetchError || !audit) {
          controller.enqueue(encoder.encode('data: {"error": "Audit not found"}\n\n'))
          controller.close()
          return
        }
        
        // If audit is already completed, send the results immediately
        if (audit.status === 'completed' || audit.status === 'failed') {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ 
              status: audit.status, 
              results: audit.results 
            })}\n\n`)
          )
          controller.close()
          return
        }
        
        // Set up SSE connection for ongoing audit
        const response = new Response(stream, {
          headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
          },
        })
        
        // Register this connection
        addSSEConnection(params.id, response)
        
        // Keep connection alive with periodic pings
        const pingInterval = setInterval(() => {
          try {
            controller.enqueue(encoder.encode(':ping\n\n'))
          } catch {
            clearInterval(pingInterval)
            removeSSEConnection(params.id)
          }
        }, 30000) // Every 30 seconds
        
        // Clean up on disconnect
        request.signal.addEventListener('abort', () => {
          clearInterval(pingInterval)
          removeSSEConnection(params.id)
          controller.close()
        })
        
      } catch (error: any) {
        console.error('SSE error:', error)
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ error: 'Internal server error' })}\n\n`)
        )
        controller.close()
      }
    },
  })
  
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  })
}
