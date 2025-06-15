import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY!,
})

export interface AIAnalysisResult {
  technicalIssues: string[]
  onPageIssues: string[]
  recommendations: string[]
}

export async function getAIAnalysis(url: string, html: string): Promise<AIAnalysisResult> {
  try {
    const prompt = `Analyze this webpage for SEO issues. Return your analysis in valid JSON format only, with no additional text or explanation.

The JSON should have this exact structure:
{
  "technicalIssues": ["issue1", "issue2", ...],
  "onPageIssues": ["issue1", "issue2", ...],
  "recommendations": ["recommendation1", "recommendation2", ...]
}

Focus on:
- Technical SEO issues (site speed, mobile-friendliness, crawlability)
- On-page SEO issues (title tags, meta descriptions, heading structure, content quality)
- Actionable recommendations for improvement

URL: ${url}
HTML (truncated): ${html.substring(0, 10000)}

Return only valid JSON:`

    const response = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 2000,
      temperature: 0,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    })

    // Extract the text content from the response
    const content = response.content[0]
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from Claude')
    }

    // Parse the JSON response
    const result = JSON.parse(content.text)
    
    // Validate the response structure
    if (!result.technicalIssues || !result.onPageIssues || !result.recommendations) {
      throw new Error('Invalid response structure from Claude')
    }
    
    return result as AIAnalysisResult
    
  } catch (error: any) {
    console.error('Claude API error:', error)
    
    // Return a fallback analysis if Claude fails
    return {
      technicalIssues: ['Unable to perform AI analysis'],
      onPageIssues: ['Manual review recommended'],
      recommendations: ['Please try again later or contact support'],
    }
  }
}
