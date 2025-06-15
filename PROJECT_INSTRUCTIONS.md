# SEO Audit SaaS - Complete Project Documentation

## 📑 Table of Contents

1. [Project Overview](#-project-overview)
2. [Architecture](#-architecture)
3. [Frontend Specifications](#-frontend-specifications-lovable)
4. [Backend Specifications](#-backend-specifications)
5. [API Documentation](#-api-documentation)
6. [Setup Instructions](#-setup-instructions)
7. [Development Workflow](#-development-workflow)
8. [Rate Limiting & Plans](#-rate-limiting--plans)
9. [SEO Analysis Process](#-seo-analysis-process)
10. [Deployment](#-deployment)
11. [Integration Checklist](#-integration-checklist)
12. [Troubleshooting](#-troubleshooting)
13. [Security Best Practices](#-security-best-practices)
14. [Feature Roadmap](#-feature-roadmap)
15. [Additional Resources](#-additional-resources)

## 🎯 Project Overview

A modern SEO Audit SaaS application that analyzes websites for SEO issues with real-time progress tracking and AI-powered recommendations.

### Key Features
- 🔐 User authentication with plan-based access (Free/Pro/Agency)
- 🔍 Comprehensive SEO analysis (technical, on-page, recommendations)
- 📊 Real-time progress tracking via Server-Sent Events
- 🤖 AI-powered recommendations using Claude
- 📈 Usage tracking and rate limiting
- 📱 Responsive modern UI with Next.js and Tailwind CSS

## 🏗️ Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Frontend       │────▶│  Backend API    │────▶│  Supabase       │
│  (Lovable)      │     │  (Next.js)      │     │  (Auth + DB)    │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                │
                                ▼
                        ┌─────────────────┐
                        │                 │
                        │  Claude API     │
                        │  (AI Analysis)  │
                        │                 │
                        └─────────────────┘
```

## 📋 Project Structure

```
seo-audit-saas/
├── frontend/              # Built in Lovable
│   ├── app/              # Next.js App Router
│   ├── components/       # React components
│   └── lib/              # Utilities
│
└── backend/              # seo-audit-backend folder
    ├── app/api/          # API routes
    ├── lib/              # Business logic
    └── supabase-setup.sql # Database schema
```

## 🎨 Frontend Specifications (Lovable)

### Technology Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **UI Components**: Custom components with shadcn/ui patterns

### Pages and Routes

#### 1. Authentication Pages
- `/login` - Email/password login form
- `/register` - Registration with password strength indicator

#### 2. Main Dashboard (`/`)
- Protected route requiring authentication
- URL input for website analysis
- Real-time progress tracking during analysis
- Results display with score and recommendations

#### 3. Audit History (`/history`)
- Table view of all user's audits
- Sortable by date, score, status
- Pagination (10 per page)

#### 4. Audit Details (`/audits/[id]`)
- Full audit report
- Detailed metrics and recommendations
- Export functionality
- Re-analyze option

### Key Components

```typescript
// Components structure
components/
├── auth/
│   ├── AuthProvider.tsx      # Auth context wrapper
│   └── ProtectedRoute.tsx    # Route protection
├── audit/
│   ├── AuditForm.tsx         # URL input form
│   ├── ProgressTracker.tsx   # SSE progress display
│   ├── ScoreCircle.tsx       # Animated score
│   └── IssueCard.tsx         # Issue display
└── common/
    ├── Header.tsx            # App header with user info
    └── AuditTable.tsx        # History table
```

### State Management (Zustand)

```typescript
interface AppState {
  user: User | null
  token: string | null
  currentAudit: Audit | null
  audits: Audit[]
  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
  // ... other actions
}
```

## 💻 Backend Specifications

### Technology Stack
- **Framework**: Next.js 14 API Routes
- **Database**: PostgreSQL via Supabase
- **Authentication**: Supabase Auth
- **AI Integration**: Claude API (Anthropic)
- **Real-time**: Server-Sent Events (SSE)

### Database Schema

```sql
-- Users table (managed by Supabase Auth)
-- Additional user metadata stored in user_metadata.plan

-- Audits table
CREATE TABLE audits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url TEXT NOT NULL,
  status TEXT DEFAULT 'processing',
  score INTEGER,
  results JSONB,
  error TEXT,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Usage tracking table
CREATE TABLE usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  date DATE NOT NULL,
  count INTEGER DEFAULT 0,
  UNIQUE(user_id, date)
);
```

## 📡 API Documentation

### Base URL
```
Development: http://localhost:3000
Production: Set via NEXT_PUBLIC_API_URL
```

### Authentication Endpoints

#### POST `/api/auth/register`
Register a new user account.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "plan": "free"
  }
}
```

#### POST `/api/auth/login`
Authenticate existing user.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "plan": "free"
  }
}
```

#### GET `/api/auth/me`
Get current user information.

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "plan": "free",
  "usage": {
    "today": 2,
    "limit": 5
  }
}
```

#### POST `/api/auth/logout`
Log out current user.

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true
}
```

### Audit Endpoints

#### POST `/api/audits`
Create a new SEO audit.

**Headers:**
```
Authorization: Bearer {token}
```

**Request:**
```json
{
  "url": "https://example.com"
}
```

**Response:**
```json
{
  "auditId": "uuid",
  "status": "processing"
}
```

**Error Response (429 - Rate Limit):**
```json
{
  "error": "Rate limit exceeded. Upgrade to Pro for more audits",
  "usage": {
    "used": 5,
    "limit": 5
  }
}
```

#### GET `/api/audits`
List all audits for the authenticated user.

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
[
  {
    "id": "uuid",
    "url": "https://example.com",
    "status": "completed",
    "createdAt": "2024-01-01T12:00:00Z",
    "score": 85
  }
]
```

#### GET `/api/audits/{id}`
Get detailed audit results.

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "id": "uuid",
  "url": "https://example.com",
  "status": "completed",
  "createdAt": "2024-01-01T12:00:00Z",
  "completedAt": "2024-01-01T12:05:00Z",
  "score": 85,
  "results": {
    "technicalIssues": [
      "Missing robots.txt file",
      "No sitemap.xml found"
    ],
    "onPageIssues": [
      "Multiple H1 tags found",
      "Meta description too short"
    ],
    "recommendations": [
      "Add a robots.txt file",
      "Create and submit a sitemap"
    ],
    "metrics": {
      "title": "Example Site",
      "metaDescription": "Short description",
      "h1Count": 3,
      "imagesWithoutAlt": 5,
      "loadTime": 2.3
    }
  }
}
```

#### GET `/api/audits/{id}/progress`
Server-Sent Events stream for real-time progress updates.

**Headers:**
```
Authorization: Bearer {token}
```

**Response (SSE Stream):**
```
data: {"step": 1, "total": 5, "message": "Validating URL..."}
data: {"step": 2, "total": 5, "message": "Fetching webpage..."}
data: {"step": 3, "total": 5, "message": "Analyzing SEO factors..."}
data: {"step": 4, "total": 5, "message": "Getting AI recommendations..."}
data: {"step": 5, "total": 5, "message": "Calculating SEO score..."}
data: {"status": "completed", "results": {...}}
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js 18+ installed
- Supabase account and project
- Claude API key from Anthropic
- Git for version control

### Step 1: Clone/Create Projects

#### Backend Setup
```bash
# Create backend project
mkdir seo-audit-saas
cd seo-audit-saas
git clone [backend-repo] backend
# OR use the provided files

cd backend
npm install
```

#### Frontend Setup
```bash
# Frontend is built in Lovable
# 1. Go to Lovable.dev
# 2. Create new project
# 3. Paste the frontend prompt
```

### Step 2: Configure Supabase

1. **Go to Supabase Dashboard**
   ```
   https://supabase.com/dashboard/project/cehtwnfdqjehmztnnbch
   ```

2. **Run Database Setup**
   - Navigate to SQL Editor
   - Copy contents of `backend/supabase-setup.sql`
   - Execute the SQL

3. **Get API Keys**
   - Settings → API
   - Copy `anon` public key
   - Copy `service_role` secret key

### Step 3: Environment Configuration

#### Backend (.env.local)
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://cehtwnfdqjehmztnnbch.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Claude API
CLAUDE_API_KEY=sk-ant-api03-...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

#### Frontend Environment
In Lovable, add environment variables:
```bash
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://cehtwnfdqjehmztnnbch.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Step 4: Run Development Servers

#### Start Backend
```bash
cd backend
npm run dev
# Backend runs on http://localhost:3000
```

#### Start Frontend
```bash
# In Lovable, click "Run" or deploy to Vercel
# Frontend runs on provided URL
```

### Step 5: Test the Integration

#### Using PowerShell (Windows)
```powershell
cd backend
./test-api.ps1
```

#### Using Bash (Mac/Linux)
```bash
cd backend
chmod +x test-api.sh
./test-api.sh
```

#### Manual Testing
```bash
# 1. Register a user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# 2. Save the token from response
# 3. Create an audit
curl -X POST http://localhost:3000/api/audits \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com"}'
```

## 🔧 Development Workflow

### Frontend Development
1. Make changes in Lovable
2. Test with backend API
3. Deploy to production when ready

### Backend Development
1. API routes in `app/api/`
2. Business logic in `lib/`
3. Test with frontend integration
4. Deploy when stable

## 📊 Rate Limiting & Plans

### Plan Limits
| Plan | Daily Audits | Price |
|------|-------------|--------|
| Free | 5 | $0 |
| Pro | 100 | $29/mo |
| Agency | 1000 | $99/mo |

### Implementation
- Tracked in `usage` table
- Reset daily at midnight UTC
- Enforced in `/api/audits` POST endpoint

## 🔍 SEO Analysis Process

### Analysis Steps
1. **URL Validation** - Ensure valid HTTP(S) URL
2. **Page Fetch** - Download HTML content
3. **SEO Extraction** - Parse meta tags, headings, images
4. **AI Analysis** - Claude analyzes for issues
5. **Score Calculation** - 0-100 based on findings

### Scoring Algorithm
```typescript
Base Score: 100
Deductions:
- No title: -10
- No meta description: -10
- No H1: -15
- Multiple H1s: -5
- Images without alt: -2 per image (max -15)
- Technical issues: -5 each
- On-page issues: -3 each
```

## 🌐 Deployment

### Backend Deployment (Vercel)
```bash
cd backend
npm run build
vercel deploy --prod
```

### Environment Variables (Vercel)
Add all variables from `.env.local` in Vercel dashboard:
- Project Settings → Environment Variables
- Add each variable for Production

### Frontend Deployment
- Lovable handles automatic deployment
- OR export and deploy to Vercel/Netlify

## 🔌 Integration Checklist

### Authentication Flow
- [ ] Register creates user and returns token
- [ ] Login validates and returns same token format
- [ ] Frontend stores token in localStorage as 'seo_token'
- [ ] All API calls include Authorization header
- [ ] 401 errors redirect to login

### Audit Creation Flow
- [ ] POST /api/audits returns auditId immediately
- [ ] Frontend shows progress view
- [ ] SSE connection established to progress endpoint
- [ ] Progress updates appear in real-time
- [ ] Final results display correctly

### Error Handling
- [ ] 429 rate limit shows upgrade message
- [ ] Network errors show retry option
- [ ] Failed audits show error state
- [ ] Invalid tokens force re-login

## 🐛 Troubleshooting

### Common Issues

#### "Unauthorized" Error
```bash
# Check token is being sent
Authorization: Bearer {token}

# Verify token in localStorage
localStorage.getItem('seo_token')
```

#### CORS Issues
```javascript
// Backend should handle CORS automatically
// If issues, check NEXT_PUBLIC_API_URL matches
```

#### SSE Not Working
```javascript
// Ensure EventSource includes auth
const eventSource = new EventSource(url, {
  headers: { 'Authorization': `Bearer ${token}` }
})
```

#### Rate Limit Hit
```json
// Response will include usage info
{
  "error": "Rate limit exceeded",
  "usage": { "used": 5, "limit": 5 }
}
```

### Database Issues
```sql
-- Check if tables exist
SELECT * FROM audits LIMIT 1;
SELECT * FROM usage LIMIT 1;

-- Check RLS policies
SELECT * FROM pg_policies;
```

## 📈 Monitoring & Analytics

### Key Metrics to Track
- User registrations
- Daily active users
- Audits per user
- Average SEO scores
- Plan upgrades

### Supabase Dashboard
- Monitor API usage
- Database performance
- Authentication logs
- Real-time connections

## 🔐 Security Best Practices

### API Security
- All routes require authentication (except register/login)
- Rate limiting prevents abuse
- Input validation on all endpoints
- SQL injection prevention via Supabase

### Frontend Security
- Token stored in localStorage (consider httpOnly cookies for production)
- API calls over HTTPS in production
- Input sanitization
- XSS prevention

## 🎯 Feature Roadmap

### Phase 1 (Current)
- ✅ Basic authentication
- ✅ SEO analysis
- ✅ AI recommendations
- ✅ Usage tracking

### Phase 2 (Planned)
- [ ] Scheduled audits
- [ ] Email notifications
- [ ] PDF export
- [ ] Competitor analysis
- [ ] Historical tracking

### Phase 3 (Future)
- [ ] White-label options
- [ ] API access for agencies
- [ ] Bulk URL analysis
- [ ] Custom scoring rules

## 📚 Additional Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Claude API Docs](https://docs.anthropic.com)
- [Tailwind CSS](https://tailwindcss.com/docs)

### Support
- Frontend issues: Check Lovable support
- Backend issues: Review error logs
- Database issues: Supabase dashboard
- API issues: Check rate limits

## 🤝 Contributing

### Code Style
- TypeScript for type safety
- ESLint for code quality
- Prettier for formatting
- Conventional commits

### Testing
- API endpoint testing included
- Add unit tests for business logic
- Integration tests for critical flows

---

**Built with ❤️ using Next.js, Supabase, and Claude AI**
