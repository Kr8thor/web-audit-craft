import { createSupabaseAdminClient } from './supabase'
import { JSDOM } from 'jsdom'
import { getAIAnalysis } from './claude'

export interface SEOData {
  title: string
  metaDescription: string
  h1Tags: string[]
  imagesWithoutAlt: number
  loadTime: number
}

export interface AuditResults {
  technicalIssues: string[]
  onPageIssues: string[]
  recommendations: string[]
  metrics: {
    title: string
    metaDescription: string
    h1Count: number
    imagesWithoutAlt: number
    loadTime: number
  }
}

// SSE connections manager
const sseConnections = new Map<string, Response>()

export function addSSEConnection(auditId: string, response: Response) {
  sseConnections.set(auditId, response)
}

export function removeSSEConnection(auditId: string) {
  sseConnections.delete(auditId)
}

export async function sendSSEUpdate(auditId: string, data: any) {
  const response = sseConnections.get(auditId)
  if (response) {
    const encoder = new TextEncoder()
    const formattedData = `data: ${JSON.stringify(data)}\n\n`
    
    try {
      // @ts-ignore - WritableStream types
      await response.body?.getWriter().write(encoder.encode(formattedData))
    } catch (error) {
      console.error('Failed to send SSE update:', error)
      removeSSEConnection(auditId)
    }
  }
}

export async function fetchPage(url: string): Promise<string> {
  const startTime = Date.now()
  
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SEOAuditBot/1.0)',
      },
      signal: AbortSignal.timeout(30000), // 30 second timeout
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const html = await response.text()
    const loadTime = Date.now() - startTime
    
    return html
  } catch (error) {
    throw new Error(`Failed to fetch page: ${error}`)
  }
}

export function extractSEOData(html: string): SEOData {
  const dom = new JSDOM(html)
  const document = dom.window.document
  
  const title = document.querySelector('title')?.textContent || ''
  const metaDescription = document.querySelector('meta[name="description"]')?.getAttribute('content') || ''
  const h1Tags = Array.from(document.querySelectorAll('h1')).map(h1 => h1.textContent || '')
  
  const images = document.querySelectorAll('img')
  let imagesWithoutAlt = 0
  images.forEach(img => {
    if (!img.getAttribute('alt')) {
      imagesWithoutAlt++
    }
  })
  
  return {
    title,
    metaDescription,
    h1Tags,
    imagesWithoutAlt,
    loadTime: 0, // Will be set during fetch
  }
}

export function calculateScore(seoData: SEOData, aiResults: any): number {
  let score = 100
  
  // Deduct points for missing/poor SEO elements
  if (!seoData.title || seoData.title.length < 10) score -= 10
  if (!seoData.metaDescription || seoData.metaDescription.length < 50) score -= 10
  if (seoData.h1Tags.length === 0) score -= 15
  if (seoData.h1Tags.length > 1) score -= 5
  if (seoData.imagesWithoutAlt > 0) score -= Math.min(15, seoData.imagesWithoutAlt * 2)
  
  // Deduct points for AI-detected issues
  score -= aiResults.technicalIssues.length * 5
  score -= aiResults.onPageIssues.length * 3
  
  // Ensure score is between 0 and 100
  return Math.max(0, Math.min(100, score))
}

export async function processAudit(auditId: string, url: string, userId: string) {
  const supabase = createSupabaseAdminClient()
  
  const progressCallback = (step: number, message: string) => {
    sendSSEUpdate(auditId, { step, total: 5, message })
  }
  
  try {
    // Step 1: Validate URL
    progressCallback(1, "Validating URL...")
    new URL(url) // Throws if invalid
    
    // Step 2: Fetch page
    progressCallback(2, "Fetching webpage...")
    const html = await fetchPage(url)
    
    // Step 3: Extract SEO data
    progressCallback(3, "Analyzing SEO factors...")
    const seoData = extractSEOData(html)
    
    // Step 4: AI Analysis
    progressCallback(4, "Getting AI recommendations...")
    const aiResults = await getAIAnalysis(url, html)
    
    // Step 5: Calculate score
    progressCallback(5, "Calculating SEO score...")
    const score = calculateScore(seoData, aiResults)
    
    // Prepare results
    const results: AuditResults = {
      technicalIssues: aiResults.technicalIssues,
      onPageIssues: aiResults.onPageIssues,
      recommendations: aiResults.recommendations,
      metrics: {
        title: seoData.title,
        metaDescription: seoData.metaDescription,
        h1Count: seoData.h1Tags.length,
        imagesWithoutAlt: seoData.imagesWithoutAlt,
        loadTime: seoData.loadTime,
      },
    }
    
    // Update audit in database
    const { error } = await supabase
      .from('audits')
      .update({
        status: 'completed',
        score,
        results,
        completed_at: new Date().toISOString(),
      })
      .eq('id', auditId)
    
    if (error) {
      throw error
    }
    
    // Send completion via SSE
    sendSSEUpdate(auditId, { status: 'completed', results })
    
  } catch (error: any) {
    console.error('Audit processing error:', error)
    
    // Update audit with error status
    await supabase
      .from('audits')
      .update({
        status: 'failed',
        error: error.message || 'Unknown error occurred',
        completed_at: new Date().toISOString(),
      })
      .eq('id', auditId)
    
    // Send error via SSE
    sendSSEUpdate(auditId, { status: 'failed', error: error.message })
  } finally {
    // Clean up SSE connection
    removeSSEConnection(auditId)
  }
}
