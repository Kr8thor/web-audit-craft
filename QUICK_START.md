# 🚀 Quick Start Guide

## SEO Audit Backend - Complete Setup

### ✅ What's Been Built

A complete Next.js 14 backend API with:
- **Supabase Authentication** (register, login, logout)
- **SEO Audit Processing** with AI recommendations
- **Rate Limiting** (5/100/1000 audits per day based on plan)
- **Real-time Progress Updates** via Server-Sent Events
- **Database Schema** with Row Level Security

### 📋 Setup Steps

1. **Get Supabase Credentials**
   - Go to https://supabase.com/dashboard/project/cehtwnfdqjehmztnnbch
   - Settings → API → Copy your keys

2. **Update Environment Variables**
   ```bash
   # Edit .env.local with your keys:
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   CLAUDE_API_KEY=your-claude-api-key
   ```

3. **Setup Database**
   - Go to Supabase SQL Editor
   - Copy contents of `supabase-setup.sql`
   - Run the SQL

4. **Start the Backend**
   ```bash
   npm run dev
   ```

### 🧪 Test the API

Use PowerShell:
```powershell
./test-api.ps1
```

Or test manually:
```bash
# Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### 🔗 Frontend Integration

The frontend (built in Lovable) expects:
- Base URL: `http://localhost:3000` (or your deployed URL)
- Token storage: `localStorage.setItem('seo_token', token)`
- Headers: `Authorization: Bearer {token}`

### 📦 Deployment

For Vercel:
```bash
npm run build
vercel deploy
```

### 🎯 Key Features

1. **Authentication**: Full Supabase auth flow
2. **Rate Limiting**: Automatic usage tracking
3. **Background Processing**: Async SEO analysis
4. **Real-time Updates**: SSE for progress tracking
5. **AI Integration**: Claude for recommendations

### 📝 Notes

- Frontend and backend are separate projects
- All auth is handled by Supabase
- SSE connections for real-time updates
- Automatic rate limiting by plan

Ready to integrate with your Lovable frontend! 🎉
