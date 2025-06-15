# SEO Audit SaaS - Quick Reference Guide

## 🚀 Quick Start (5 minutes)

### 1. Backend Setup
```bash
cd seo-audit-backend
npm install
```

### 2. Configure Environment
Create `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://cehtwnfdqjehmztnnbch.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
CLAUDE_API_KEY=your-claude-api-key
```

### 3. Setup Database
- Go to Supabase SQL Editor
- Run `supabase-setup.sql`

### 4. Start Backend
```bash
npm run dev
```

### 5. Frontend (Lovable)
- Use the frontend prompt
- Set `NEXT_PUBLIC_API_URL=http://localhost:3000`

## 📋 API Quick Reference

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/auth/register` | POST | Create account |
| `/api/auth/login` | POST | Login |
| `/api/auth/me` | GET | Get user info |
| `/api/audits` | POST | Create audit |
| `/api/audits` | GET | List audits |
| `/api/audits/{id}` | GET | Get audit details |
| `/api/audits/{id}/progress` | GET | SSE progress |

## 🔑 Key Integration Points

### Frontend → Backend
```javascript
// Store token
localStorage.setItem('seo_token', response.token)

// API calls
fetch(`${API_URL}/api/audits`, {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
})
```

### Progress Tracking
```javascript
const eventSource = new EventSource(
  `${API_URL}/api/audits/${auditId}/progress`,
  { headers: { 'Authorization': `Bearer ${token}` } }
)

eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data)
  if (data.status === 'completed') {
    // Show results
  } else {
    // Update progress
  }
}
```

## 📊 Rate Limits

| Plan | Daily Limit | Cost |
|------|------------|------|
| Free | 5 audits | $0 |
| Pro | 100 audits | $29 |
| Agency | 1000 audits | $99 |

## 🧪 Quick Test

```bash
# PowerShell
./test-api.ps1

# Or manually test
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## 🚨 Common Issues

1. **401 Unauthorized**: Check token in Authorization header
2. **429 Rate Limit**: Upgrade plan or wait for reset
3. **CORS Error**: Verify API_URL matches backend
4. **SSE Not Working**: Check auth headers in EventSource

---

For complete documentation, see `PROJECT_INSTRUCTIONS.md`
